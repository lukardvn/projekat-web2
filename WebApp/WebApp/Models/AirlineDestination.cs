using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class AirlineDestination
    {
        public int AirlineId { get; set; }
        public Airline Airline { get; set; }
        public int DestinationId { get; set; }
        public Destination Destination { get; set; }
    }
}
