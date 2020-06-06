using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Dtos.Flight;
using WebApp.Models;
using WebApp.Services.FlightService;

namespace WebApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly IFlightService _flightService;

        public FlightsController(IFlightService flightService)
        {
            _flightService = flightService;
        }

        [HttpGet("GetAll")] //GET localhost/Flights/GetAll
        public async Task<IActionResult> Get()
        {
            return Ok(await _flightService.GetAllFlights());
        }

        [HttpPost] //POST localhost/Flights
        public async Task<IActionResult> AddFlight(AddFlightDto newFlight)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(await _flightService.AddFlight(newFlight));
        }

        [HttpGet("{id}")] //GET localhost/Flights//x
        public async Task<IActionResult> GetSingle(int id)
        {
            return Ok(await _flightService.GetFlightById(id));
        }

        [HttpPost("GetFiltered")] //POST localhost/Flights/GetFiltered
        public async Task<IActionResult> GetFiltered(SearchFlightDto filter)
        {
            return Ok(await _flightService.GetFilteredFlights(filter));
        }
    }
}