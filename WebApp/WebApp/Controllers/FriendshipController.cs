using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
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

        [HttpGet("GetMyFriends/{id?}")]
        public async Task<IActionResult> GetConfirmedFriends([Optional] int id) //samo potvrdjena prijateljstva
        {
            return Ok(await _friendshipService.GetConfirmedFriends(id));
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

        [HttpDelete("CancelRequest/{id1}/{id2}")]
        public async Task<IActionResult> CancelRequest(int id1, int id2)
        {
            return Ok(await _friendshipService.CancelRequest(id1, id2));
        }

    }
}