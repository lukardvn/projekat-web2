using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Data;
using WebApp.Dtos.Flight;
using WebApp.Models;

namespace WebApp.Services.FlightService
{
    public class FlightService : IFlightService
    {
        private readonly DataContext _context;

        public FlightService(DataContext context)
        {
            _context = context;
        }

        public async Task<ServiceResponse<List<Flight>>> AddFlight(Flight newFlight)
        {
            ServiceResponse<List<Flight>> serviceResponse = new ServiceResponse<List<Flight>>();
            try
            {
                Flight flight = newFlight;
                await _context.Flights.AddAsync(flight);
                await _context.SaveChangesAsync();
                serviceResponse.Data = _context.Flights.ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<Flight>>> GetAllFlights()
        {
            ServiceResponse<List<Flight>> serviceResponse = new ServiceResponse<List<Flight>>();
            try
            {
                List<Flight> dbFlights = await _context.Flights.ToListAsync();
                serviceResponse.Data = dbFlights;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        /// <summary>
        /// s klijentske strane dobijamo objekat koji koristimo za pretragu letova, njime filtriramo postojece letove u bazi i vracamo klijentu
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<List<Flight>>> GetFilteredFlights(SearchFlightDto filter)
        {
            ServiceResponse<List<Flight>> serviceResponse = new ServiceResponse<List<Flight>>();
            try
            {
                List<Flight> dbFlights = await _context.Flights.ToListAsync();
                List<Flight> letovi = dbFlights.Where(x => x.Origin.Equals("Belgrade")).ToList();
                serviceResponse.Data = letovi;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<Flight>> GetFlightById(int id)
        {
            ServiceResponse<Flight> serviceResponse = new ServiceResponse<Flight>();
            try
            {
                Flight dbFlight = await _context.Flights.FirstOrDefaultAsync(f => f.Id == id);
                if (dbFlight != null)
                {
                    serviceResponse.Data = dbFlight;
                }
                else
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Flight not found.";
                }
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
