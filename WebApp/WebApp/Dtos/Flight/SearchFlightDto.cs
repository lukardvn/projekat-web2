using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Dtos.Flight
{
    public class SearchFlightDto
    {
        public string TripType { get; set; }
        public string Origin { get; set; }
        public string Destination { get; set; }
        public DateTime Depart { get; set; }
        public DateTime Return { get; set; }
        public string NumberOfAdults { get; set; }
        public string NumberOfChildren { get; set; }
        public string Class { get; set; }
    }
}
