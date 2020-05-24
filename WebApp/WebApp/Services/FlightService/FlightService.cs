using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Data;
using WebApp.Dtos.Flight;
using WebApp.Models;
using WebApp.Models.Enums;

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

        public async Task<ServiceResponse<DepartReturnFlightDto>> GetFilteredFlights(SearchFlightDto filter)
        {
            
            ServiceResponse<DepartReturnFlightDto> serviceResponse = new ServiceResponse<DepartReturnFlightDto>()
            {
                Data = new DepartReturnFlightDto()
            };

            try
            {
                List<Flight> dbFlights = await _context.Flights.ToListAsync();
                //kod odlaznih letova poredi se datum depart-a iz forme sa takeoffTime atributom svakog leta
                List<Flight> departingFlights = dbFlights.Where(x => x.Origin.ToLower().Equals(filter.Origin.ToLower())
                                                             && x.Destination.ToLower().Equals(filter.Destination.ToLower())
                                                             && x.SeatsLeft > (int.Parse(filter.NumberOfAdults) + int.Parse(filter.NumberOfChildren))
                                                             && x.TakeoffTime.Date.Equals(filter.Depart.Date)).ToList();
                serviceResponse.Data.DepartingFlights = departingFlights;

                //provera da li trazimo samo departing letove ili trazimo i departing i returning letove
                if (filter.TripType == TripType.roundtrip.ToString())    //trebaju nam i returning flights
                {
                    //kod povratnih letova poredi se datum return-a iz forme sa takeoffTime atributom svakog leta i obrcu se polaziste i odrediste
                    List<Flight> returningFlights = dbFlights.Where(x => x.Origin.ToLower().Equals(filter.Destination.ToLower())
                                                                 && x.Destination.ToLower().Equals(filter.Origin.ToLower())
                                                                 && x.SeatsLeft > (int.Parse(filter.NumberOfAdults) + int.Parse(filter.NumberOfChildren))
                                                                 && x.TakeoffTime.Date.Equals(filter.Return?.Date)).ToList();
                    serviceResponse.Data.ReturningFlights = returningFlights;
                }
                
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
