using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Flight
    {
        public int Id { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public DateTime TakeoffTime { get; set; }
        public DateTime LandingTime { get; set; }
        public string Duration { get; set; }
        public string Distance { get; set; }
        public string Stops { get; set; }
        public string Price { get; set; }
        public int SeatsLeft { get; set; }
    }
}
