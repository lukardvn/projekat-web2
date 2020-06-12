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
        Task<ServiceResponse<Airline>> AddDestinationToAirline(AddDestinationAirlineDto destination);
        Task<ServiceResponse<Airline>> AddFlightToAirline(Flight flight);
        Task<ServiceResponse<List<Destination>>> GetDestinationsOfAirline(int airlineId);
        Task<ServiceResponse<UpdateAirlineDto>> UpdateAirline(UpdateAirlineDto updatedAirline);
        Task<ServiceResponse<List<Airline>>> GetAllAirlines();
        Task<ServiceResponse<Airline>> GetSingle(int id);
    }
}
