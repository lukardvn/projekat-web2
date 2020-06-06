using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using WebApp.Data;
using WebApp.Dtos.Airline;
using WebApp.Models;
using WebApp.Models.Enums;

namespace WebApp.Services.AirlineService
{
    public class AirlineService : IAirlineService
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AirlineService(DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }
        private int GetUserId() => int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
        private string GetUserPrivilege() => _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role);

        public async Task<ServiceResponse<Airline>> GetMyAirline()
        {
            ServiceResponse<Airline> serviceResponse = new ServiceResponse<Airline>();
            try
            {
                var priv = GetUserPrivilege();  //"admin" ili "regular"     MORA DA MOZE NA NIVOU KONTROLERA

                if (priv != UserType.admin.ToString())
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "You do not have privileges needed.";
                }

                User user = await _context.Users.Include(u => u.Airline).ThenInclude(a => a.AirlineDestinations)
                                                .Include(u => u.Airline).ThenInclude(a => a.Flights)
                                                .Include(u => u.Airline).ThenInclude(a => a.AirlineDestinations).ThenInclude(ad => ad.Destination)
                                                .FirstOrDefaultAsync(u => u.Id == GetUserId());

                if (user == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Could not find the current user.";
                }                    
                if (user.Airline == null)
                    serviceResponse.Message = "This user isn't admin in any of the airlines.";         

                serviceResponse.Data = user.Airline;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            
            return serviceResponse;
        }
        //NIJE ISKORISCENO 
        public async Task<ServiceResponse<Airline>> AddDestinationToAirline(AirlineDestination destinationAir)
        {
            ServiceResponse<Airline> serviceResponse = new ServiceResponse<Airline>();

            try
            {
                AirlineDestination ad = new AirlineDestination
                {
                    Airline = destinationAir.Airline,
                    Destination = destinationAir.Destination
                };

                Destination dbDestination = await _context.Destinations.FirstOrDefaultAsync(d => d.City == destinationAir.Destination.City && d.State == destinationAir.Destination.State);
                Airline dbAirline = await _context.Airlines.FirstOrDefaultAsync(a => a.Id == destinationAir.Airline.Id);    

                if (dbDestination == null)   //destinacija ne postoji, dodaj u listu destinacija
                {
                    await _context.Destinations.AddAsync(destinationAir.Destination);
                    dbAirline.AirlineDestinations.Add(ad);
                    await _context.SaveChangesAsync();
                }   //destinacija vec postoji
                else
                {
                    dbAirline.AirlineDestinations.Add(ad);
                    await _context.SaveChangesAsync();
                }  
            }
            catch (Exception ex)
            {
                serviceResponse.Message = ex.Message;
                serviceResponse.Success = false;
            }

            return serviceResponse;
        }

        public Task<ServiceResponse<Airline>> AddFlightToAirline(Flight flight)
        {
            throw new NotImplementedException();   
        }
    }
}
