using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Services.DestinationService
{
    public interface IDestinationService
    {
        Task<ServiceResponse<List<Destination>>> GetDestinationsOfAirline(int airlineId);   //implementirano u AirlineService
        Task<ServiceResponse<List<Destination>>> GetAllDestinations();
        Task<ServiceResponse<List<Destination>>> GetMoreDestinations(int airlineId);

    }
}
