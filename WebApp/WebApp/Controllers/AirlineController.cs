using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApp.Services.AirlineService;

namespace WebApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AirlineController : Controller
    {
        private readonly IAirlineService _airlineService;
        public AirlineController(IAirlineService airlineService)
        {
            _airlineService = airlineService;
        }

        [HttpGet("MyAirline")] //GET localhost/Airline/MyAirline
        public async Task<IActionResult> GetMyAirline()
        { 
            return Ok(await _airlineService.GetMyAirline());
        }
    }
}
