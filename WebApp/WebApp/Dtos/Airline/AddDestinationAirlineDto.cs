using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Dtos.Airline
{
    public class AddDestinationAirlineDto
    {
        public Destination Destination { get; set; }
        public Models.Airline Airline { get; set; }
    }
}
