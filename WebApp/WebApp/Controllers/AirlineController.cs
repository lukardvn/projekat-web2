using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Dtos.Airline;
using WebApp.Models;
using WebApp.Services.AirlineService;

namespace WebApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    [Authorize(Roles = "admin")]
    public class AirlineController : ControllerBase
    {
        private readonly IAirlineService _airlineService;

        public AirlineController(IAirlineService airlineService)
        {
            _airlineService = airlineService;
        }

        [HttpGet("MyAirline")]
        public async Task<IActionResult> GetMyAirline() 
        {
            return Ok(await _airlineService.GetMyAirline());
        }

        [HttpPost("AddDestination")]
        public async Task<IActionResult> AddDestination(AddDestinationAirlineDto ad) 
        {
            return Ok(await _airlineService.AddDestinationToAirline(ad));
        }

        [HttpGet("/{id}/Destinations")] //Airline/x/Destinations
        public async Task<IActionResult> GetDestinationsOfAirline(int id) 
        {
            return Ok(await _airlineService.GetDestinationsOfAirline(id));
        }
    }
}
