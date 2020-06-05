using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Services.AirlineService
{
    public interface IAirlineService
    {
        Task<ServiceResponse<Airline>> GetMyAirline();
    }
}
