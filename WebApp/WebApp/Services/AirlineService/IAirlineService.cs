using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Dtos.Airline;
using WebApp.Models;

namespace WebApp.Services.AirlineService
{
    public interface IAirlineService
    {
        Task<ServiceResponse<Airline>> GetMyAirline();
        Task<ServiceResponse<Airline>> AddDestinationToAirline(AirlineDestination destination);
        Task<ServiceResponse<Airline>> AddFlightToAirline(Flight flight);
    }
}
