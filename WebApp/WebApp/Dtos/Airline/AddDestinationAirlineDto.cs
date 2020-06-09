using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Dtos.Airline
{
    public class AddDestinationAirlineDto
    {
        public int AirlineId { get; set; }
        public int DestinationId { get; set; }
    }
}
