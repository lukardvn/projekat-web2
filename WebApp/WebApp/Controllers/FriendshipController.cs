using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Dtos.Friendship;
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
    }
}