using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Dtos.Flight;

namespace WebApp.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public User User { get; set; }
        public Flight DepartingFlight { get; set; }
        public Flight ReturningFlight { get; set; }
    }
}
