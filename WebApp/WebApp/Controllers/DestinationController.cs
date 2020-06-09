using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Services.DestinationService;

namespace WebApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DestinationController : ControllerBase
    {
        private readonly IDestinationService _destinationService;

        public DestinationController(IDestinationService destinationService)
        {
            _destinationService = destinationService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllDestinations()
        {
            return Ok(await _destinationService.GetAllDestinations());
        }

        [HttpGet("{id}/GetMore")]
        public async Task<IActionResult> GetMoreDestinations(int id)
        {
            return Ok(await _destinationService.GetMoreDestinations(id));
        }
    }
}
