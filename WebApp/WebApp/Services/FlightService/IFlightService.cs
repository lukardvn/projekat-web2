using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Dtos.Flight;
using WebApp.Models;

namespace WebApp.Services.FlightService
{
    public interface IFlightService
    {
        Task<ServiceResponse<List<Flight>>> GetAllFlights();
        Task<ServiceResponse<Flight>> GetFlightById(int id);
        Task<ServiceResponse<List<Flight>>> AddFlight(AddFlightDto newFlight);
        Task<ServiceResponse<DepartReturnFlightDto>> GetFilteredFlights(SearchFlightDto filter);
    }
}
