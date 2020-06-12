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

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllAirlines()
        {
            return Ok(await _airlineService.GetAllAirlines());
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

        [HttpPut] // PUT localhost/Airline
        public async Task<IActionResult> UpdateAirline(UpdateAirlineDto updatedAirline)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            ServiceResponse<UpdateAirlineDto> response = await _airlineService.UpdateAirline(updatedAirline);

            if (response.Data == null)
                return NotFound(response);
            return Ok(response);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetSingle(int id)
        {
            return Ok(await _airlineService.GetSingle(id));
        }
    }
}
