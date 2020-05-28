using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Dtos.Friendship;
using WebApp.Models;

namespace WebApp.Services.FriendshipService
{
    public interface IFriendshipService
    {
        //Task<ServiceResponse<List<User>>> GetAllFriends();
        //Task<ServiceResponse<List<User>>> SendFriendRequest(User sendingTo);
        //Task<ServiceResponse<List<User>>> AcceptFriendRequest();

        Task<ServiceResponse<User>> AddFriend(AddFriendshipDto newFriend);
    }
}
