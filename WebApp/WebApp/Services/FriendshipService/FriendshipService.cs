using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
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

        public async Task<ServiceResponse<User>> AddFriend(AddFriendshipDto newFriendship)  //User1 is trying to add User2
        {
            ServiceResponse<User> response = new ServiceResponse<User>();

            try
            {
                User userSendingRequest = await _context.Users
                    .Include(u => u.Friendships).ThenInclude(fs => fs.User2)
                    .FirstOrDefaultAsync(u => u.Id == newFriendship.UserId1 &&
                        u.Id == int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)));

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
    }
}
