using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Xml.Serialization;
using WebApp.Data;
using WebApp.Dtos.Friendship;
using WebApp.Models;

namespace WebApp.Services.FriendshipService
{
    public class FriendshipService : IFriendshipService
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;

        public FriendshipService(DataContext context, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }
        private int GetUserId() => int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
        public async Task<ServiceResponse<User>> AddFriend(AddFriendshipDto newFriendship)  //User1 is trying to add User2
        {
            ServiceResponse<User> response = new ServiceResponse<User>();

            try
            {
                User userSendingRequest = await _context.Users
                    .Include(u => u.Friendships).ThenInclude(fs => fs.User2)
                    .FirstOrDefaultAsync(u => u.Id == newFriendship.UserId1 &&
                        u.Id == GetUserId());

                if (userSendingRequest == null)
                {
                    response.Success = false;
                    response.Message = "User not found";
                    return response;
                }

                User userReceivingRequest = await _context.Users.FirstOrDefaultAsync(u => u.Id == newFriendship.UserId2);

                if (userReceivingRequest == null)
                {
                    response.Success = false;
                    response.Message = "Cannot find your friend";
                    return response;
                }

                Friendship friendship = new Friendship
                {
                    User1 = userSendingRequest,
                    User2 = userReceivingRequest,
                    Status = 0
                };

                await _context.Friendships.AddAsync(friendship);
                await _context.SaveChangesAsync();

                response.Data = userSendingRequest;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }
        public async Task<ServiceResponse<List<Friendship>>> GetConfirmedFriendships()
        {
            ServiceResponse<List<Friendship>> serviceResponse = new ServiceResponse<List<Friendship>>();
            try
            {
                //pretraga svih prijateljstava gde je current user jedan od 'cinioca' veze
                List<Friendship> dbFriendships = await _context.Friendships
                                                    .Where(fs => fs.Status == 1)    //samo potvrdjena prijateljstva
                                                    .Include(fs => fs.User1).Include(fs => fs.User2)    //ako treba da pristupimo objektima, moze i bez ovoga vrv
                                                    .Where(fs => fs.UserId1 == GetUserId() || fs.UserId2 == GetUserId()).ToListAsync();
                serviceResponse.Data = dbFriendships.ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }
        public async Task<ServiceResponse<List<Friendship>>> GetRequestsReceived()
        {
            ServiceResponse<List<Friendship>> serviceResponse = new ServiceResponse<List<Friendship>>();
            try 
            { 
                List<Friendship> dbFriendships = await _context.Friendships
                                                    .Where(fs => fs.Status == 0)    //samo nepotvrdjena prijateljstva
                                                    .Include(fs => fs.User1).Include(fs => fs.User2)    //ako treba da pristupimo objektima, moze i bez ovoga vrv
                                                    .Where(fs => fs.UserId2 == GetUserId()).ToListAsync(); //tamo gde je currentUser user2=> primljeni zahtevi za prijateljstvo
                serviceResponse.Data = dbFriendships.ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            
            return serviceResponse;
        }
        public async Task<ServiceResponse<List<Friendship>>> GetRequestsSent()
        {
            ServiceResponse<List<Friendship>> serviceResponse = new ServiceResponse<List<Friendship>>();
            try
            {
                List<Friendship> dbFriendships = await _context.Friendships
                                                    .Where(fs => fs.Status == 0)    //samo nepotvrdjena prijateljstva
                                                    .Include(fs => fs.User1).Include(fs => fs.User2)    //ako treba da pristupimo objektima, moze i bez ovoga vrv
                                                    .Where(fs => fs.UserId1 == GetUserId()).ToListAsync(); //tamo gde je currentUser user1=> poslati zahtevi za prijateljstvo
                serviceResponse.Data = dbFriendships.ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            
            return serviceResponse;
        }
        public async Task<ServiceResponse<bool>> RespondToRequest(ResponseFriendshipDto response)
        {
            ServiceResponse<bool> serviceResponse = new ServiceResponse<bool>();            
            try
            {    
                Friendship dbFriendship = await _context.Friendships
                                                        .FirstOrDefaultAsync(fs => fs.UserId2 == GetUserId() && fs.UserId1 == response.UserId1 && fs.Status == 0);
                if (dbFriendship != null)
                {
                    dbFriendship.Status = 1;
                    _context.Friendships.Update(dbFriendship);
                    await _context.SaveChangesAsync();

                    serviceResponse.Data = true;    //samo da je uspesno izvrseno, posle mogu da dodam listu prijatelja npr.. ili prijateljstvo sklopljeno
                    serviceResponse.Message = "Your response: " + dbFriendship.Status;
                    serviceResponse.Success = true;
                }
                else
                {
                    serviceResponse.Message = "Friend request not found.";
                    serviceResponse.Success = false;
                }                       
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        /*
        public async Task<ServiceResponse<bool>> AcceptRequest(Friendship request)   //mozda mogu da posaljem samo UserId1???
        {
            ServiceResponse<bool> serviceResponse = new ServiceResponse<bool>();
            try
            {            
                //nadjem to prijateljstvo na koje korisnik zeli da odgovori
                Friendship dbFriendship = await _context.Friendships.FirstOrDefaultAsync(fs => fs.UserId2 == GetUserId() && fs.UserId1 == request.UserId1);  
                dbFriendship.Status = 1;
                _context.Friendships.Update(dbFriendship);
                _context.SaveChangesAsync();
                serviceResponse.Data = true;
                serviceResponse.Message = "You have accepted this request.";
                serviceResponse.Success = true;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }*/

    }
}
