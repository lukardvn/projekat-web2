using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Dtos.Flight
{
    public class AddReviewDto
    {
        public int UserId { get; set; }
        public int FlightId { get; set; }
        public int Rating { get; set; }
    }
}
