using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Services.DestinationService
{
    public class DestinationService : IDestinationService
    {
        private readonly DataContext _context;

        public DestinationService(DataContext context)
        {
            _context = context;
        }

        public async Task<ServiceResponse<List<Destination>>> GetAllDestinations()
        {
            ServiceResponse<List<Destination>> serviceResponse = new ServiceResponse<List<Destination>>();

            try
            {
                List<Destination> dbList = await _context.Destinations.ToListAsync();
                serviceResponse.Data = dbList;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<Destination>>> GetDestinationsOfAirline(int airlineId)
        {
            ServiceResponse<List<Destination>> serviceResponse = new ServiceResponse<List<Destination>>();

            List<AirlineDestination> dbAds = await _context.AirlineDestinations.Where(ad => ad.AirlineId == airlineId)
                                                .Include(ad => ad.Destination).ToListAsync();
            var destinations = new List<Destination>();

            foreach (AirlineDestination ad in dbAds)
                destinations.Add(ad.Destination);

            serviceResponse.Data = destinations.ToList();

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<Destination>>> GetMoreDestinations(int airlineId)
        {
            ServiceResponse<List<Destination>> serviceResponse = new ServiceResponse<List<Destination>>();
                //NE ZNAMAMAMAMAMAMAMAMMAM
            try
            {
                List<AirlineDestination> dbAds = await _context.AirlineDestinations.Where(ad => ad.AirlineId != airlineId)
                                                .Include(ad => ad.Destination).ToListAsync();

                var dests = _context.Destinations.Include(d => d.AirlineDestinations).ThenInclude(ad => ad.Destination)
                    .Include(d => d.AirlineDestinations).ThenInclude(ad => ad.Airline)
                    .ToList();

                List<Destination> destinations = new List<Destination>();


                serviceResponse.Data = destinations;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }
    }
}
