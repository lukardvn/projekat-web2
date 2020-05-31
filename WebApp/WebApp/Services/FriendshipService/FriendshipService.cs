using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Xml.Serialization;
using WebApp.Data;
using WebApp.Dtos.Friendship;
using WebApp.Dtos.User;
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
                #region dvapristupa_contextu
                //User userSendingRequest = await _context.Users
                //      .Include(u => u.Friendships).ThenInclude(fs => fs.User2)
                //      .FirstOrDefaultAsync(u => u.Id == newFriendship.UserId1 && u.Id == GetUserId());
                //User userReceivingRequest = await _context.Users.FirstOrDefaultAsync(u => u.Id == newFriendship.UserId2);
                #endregion dvapristupa_contextu
                var usersDb = await _context.Users.ToListAsync();
                //isti korisnik je ulogovan i pokusava da posalje zahtev
                User userSendingRequest = usersDb.FirstOrDefault(u => u.Id == GetUserId() && u.Id == newFriendship.UserId1);
                if (userSendingRequest == null)
                {
                    response.Success = false;
                    response.Message = "User not found";
                    return response;
                }
                User userReceivingRequest = usersDb.FirstOrDefault(u => u.Id == newFriendship.UserId2);
                if (userReceivingRequest == null)
                {
                    response.Success = false;
                    response.Message = "Cannot find user you're trying to add.";
                    return response;
                }

                //TREBA DA PRETRAZIM DA LI VEC POSTOJI PRIJATELJSTVO ILI NEKAKO DA ZABRANIM REQ AKO POSTOJI

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
        public async Task<ServiceResponse<List<FriendUserDto>>> GetConfirmedFriends([Optional] int id)
        {
            ServiceResponse<List<FriendUserDto>> serviceResponse = new ServiceResponse<List<FriendUserDto>>();
            try
            {
                int currentId;
                if (id == 0)
                    currentId = GetUserId();
                else
                    currentId = id;

                //pretraga svih prijateljstava gde je current user jedan od 'cinioca' veze
                List<Friendship> dbFriendships = await _context.Friendships
                                                    .Include(fs => fs.User1).ThenInclude(u => u.Reservations).ThenInclude(r => r.DepartingFlight)
                                                    .Include(fs => fs.User1).ThenInclude(u => u.Reservations).ThenInclude(r => r.ReturningFlight)
                                                    .Include(fs => fs.User2).ThenInclude(u => u.Reservations).ThenInclude(r => r.DepartingFlight)
                                                    .Include(fs => fs.User2).ThenInclude(u => u.Reservations).ThenInclude(r => r.ReturningFlight)//ako treba da pristupimo objektima
                                                    .Where(fs => fs.Status == 1)    //samo potvrdjena prijateljstva
                                                    .Where(fs => fs.UserId1 == currentId || fs.UserId2 == currentId).ToListAsync();

                var friends = new List<User>();
                foreach (Friendship fs in dbFriendships)
                {
                    if (fs.UserId1 != currentId)
                        friends.Add(fs.User1);
                    else
                        friends.Add(fs.User2);
                }   
                //mapiranje liste User-a na listu FriendUserDto-va
                serviceResponse.Data = friends.Select(u => _mapper.Map<FriendUserDto>(u)).ToList();

                #region druginacin
                /*//da bih vratio listu prijatelja ovog korisnika
                var users1 = dbFriendships.Select(fs => fs.User1).ToList();
                var users2 = dbFriendships.Select(fs => fs.User2).ToList();
                List<User> friends2 = new List<User>();
                foreach (User u in users1)
                {
                    if (u.Id != GetUserId())
                        friends2.Add(u);
                }
                foreach (User u in users2)
                {
                    if (u.Id != GetUserId())
                        friends2.Add(u);
                }*/
                #endregion druginacin     
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
                                                    .Include(fs => fs.User1).Include(fs => fs.User2)    //ako treba da pristupimo objektima
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
                                                    .Include(fs => fs.User1).Include(fs => fs.User2)    //ako treba da pristupimo objektimaa
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
                    int newStatus = response.Decision ? 1 : 0;
                    if (newStatus == 0)
                    {
                        _context.Friendships.Remove(dbFriendship);
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        dbFriendship.Status = newStatus;
                        _context.Friendships.Update(dbFriendship);
                        await _context.SaveChangesAsync();
                    }   

                    serviceResponse.Data = true;    //samo da je uspesno izvrseno, posle mogu da dodam listu prijatelja npr.. ili prijateljstvo sklopljeno
                    serviceResponse.Message = "Your response: " + newStatus.ToString();
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

        public async Task<ServiceResponse<bool>> CancelRequest(int id1, int id2)
        {
            ServiceResponse<bool> serviceResponse = new ServiceResponse<bool>();

            try
            {
                Friendship fs = await _context.Friendships.FirstOrDefaultAsync(fs => fs.UserId1 == id1 && fs.UserId2 == id2);

                _context.Friendships.Remove(fs);
                await _context.SaveChangesAsync();

                serviceResponse.Data = true;
            }
            catch (Exception ex)
            {
                serviceResponse.Message = ex.Message;
                serviceResponse.Success = false;
            }

            return serviceResponse;
        }

        #region AcceptReqDRUGINACIN
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
        #endregion AcceptReq
    }
}
