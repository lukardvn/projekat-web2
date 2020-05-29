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
        Task<ServiceResponse<List<Friendship>>> GetConfirmedFriendships();  //ovde mozda da vratim dto koji vraca samo ove sa kojima je prijatelj?
        Task<ServiceResponse<List<Friendship>>> GetRequestsReceived();  //isto?
        Task<ServiceResponse<List<Friendship>>> GetRequestsSent();  //isto?
        //Task<ServiceResponse<bool>> AcceptRequest(Friendship request);
        Task<ServiceResponse<bool>> RespondToRequest(ResponseFriendshipDto response);
    }
}
