using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Dtos.Flight
{
    public class DepartReturnFlightDto
    {
        public List<Models.Flight> DepartingFlights { get; set; } = new List<Models.Flight>();
        public List<Models.Flight> ReturningFlights { get; set; } = new List<Models.Flight>();
    }
}
