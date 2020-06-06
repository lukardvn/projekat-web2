using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Dtos.Flight
{
    public class AddFlightDto
    {
        public string Origin { get; set; }
        public string Destination { get; set; }
        public string TakeoffTime { get; set; }
        public string LandingTime { get; set; }
        public string Distance { get; set; }
        public string Stops { get; set; }
        public string Price { get; set; }
        public int SeatsLeft { get; set; }
        public Models.Airline Airline { get; set; }
    }
}
