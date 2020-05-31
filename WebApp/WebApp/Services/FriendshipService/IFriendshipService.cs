using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using WebApp.Dtos.Friendship;
using WebApp.Dtos.User;
using WebApp.Models;

namespace WebApp.Services.FriendshipService
{
    public interface IFriendshipService
    {
        Task<ServiceResponse<User>> AddFriend(AddFriendshipDto newFriend);
        Task<ServiceResponse<List<FriendUserDto>>> GetConfirmedFriends([Optional] int id);
        Task<ServiceResponse<List<Friendship>>> GetRequestsReceived();  // da li vratiti listu korisnika...
        Task<ServiceResponse<List<Friendship>>> GetRequestsSent();  // da li vratiti listu korisnika...
        Task<ServiceResponse<bool>> RespondToRequest(ResponseFriendshipDto response);
        Task<ServiceResponse<bool>> CancelRequest(int id1, int id2);
    }
}
