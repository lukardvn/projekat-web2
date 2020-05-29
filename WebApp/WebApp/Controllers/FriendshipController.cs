using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Dtos.Friendship;
using WebApp.Models;
using WebApp.Services.FriendshipService;

namespace WebApp.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class FriendshipController : ControllerBase
    {
        private readonly IFriendshipService _friendshipService;
        public FriendshipController(IFriendshipService friendshipService)
        {
            _friendshipService = friendshipService;
        }
        [HttpPost]
        public async Task<IActionResult> AddFriend(AddFriendshipDto newFriendship)
        {
            return Ok(await _friendshipService.AddFriend(newFriendship));
        }

        [HttpGet("GetMyFriends")]
        public async Task<IActionResult> GetConfirmedFriendships() //samo potvrdjena prijateljstva
        {
            return Ok(await _friendshipService.GetConfirmedFriendships());
        }

        [HttpGet("RequestsReceived")]
        public async Task<IActionResult> GetRequestsReceived() //nepotvrdjena
        {
            return Ok(await _friendshipService.GetRequestsReceived());
        }

        [HttpGet("RequestsSent")]
        public async Task<IActionResult> GetRequestsSent() //nepotvrdjena
        {
            return Ok(await _friendshipService.GetRequestsSent());
        }

        /*[HttpPut("AcceptRequest")]
        public async Task<IActionResult> AcceptRequest(Friendship accepting) //nepotvrdjena
        {
            return Ok(await _friendshipService.AcceptRequest(accepting));
        }*/
        [HttpPut("RespondToRequest")]
        public async Task<IActionResult> RespondToRequest(ResponseFriendshipDto response) //nepotvrdjena
        {
            return Ok(await _friendshipService.RespondToRequest(response));
        }

    }
}