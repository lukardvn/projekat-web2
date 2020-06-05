using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Airline
    {
        public int Id { get; set; }
        public List<User> Admins { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public List<Flight> Flights { get; set; }
        public List<AirlineDestination> AirlineDestinations { get; set; }
    }
}
