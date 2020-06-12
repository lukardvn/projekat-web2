using AutoMapper;
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
        private readonly IMapper _mapper;

        public AirlineService(DataContext context, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;

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

        public Task<ServiceResponse<Airline>> AddFlightToAirline(Flight flight)
        {
            throw new NotImplementedException();   //VALJDA NE TREBA?
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

        public async Task<ServiceResponse<Airline>> AddDestinationToAirline(AddDestinationAirlineDto destination)
        {
            ServiceResponse<Airline> serviceResponse = new ServiceResponse<Airline>();  //moram dodati proveru da li je ova destinacija vec sadrzana u aviokompaniji

            try
            {
                Airline airlineDb = await _context.Airlines.Include(a => a.AirlineDestinations).ThenInclude(ad => ad.Destination)
                    .FirstOrDefaultAsync(a => a.Id == destination.AirlineId);

                foreach (AirlineDestination ads in airlineDb.AirlineDestinations)
                {
                    if (ads.DestinationId == destination.DestinationId)
                    {
                        serviceResponse.Message = "Destination already defined in this airline.";
                        serviceResponse.Success = false;
                        return serviceResponse;
                    }
                }

                AirlineDestination ad = new AirlineDestination
                {
                    AirlineId = destination.AirlineId,
                    DestinationId = destination.DestinationId
                };

                await _context.AirlineDestinations.AddAsync(ad);
                await _context.SaveChangesAsync();

               /* Destination dbDestination = await _context.Destinations.FirstOrDefaultAsync(d => d.City == destinationAir.Destination.City && d.State == destinationAir.Destination.State);
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
                }*/
               //serviceResponse.Data = 
            }
            catch (Exception ex)
            {
                serviceResponse.Message = ex.Message;
                serviceResponse.Success = false;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<UpdateAirlineDto>> UpdateAirline(UpdateAirlineDto updatedAirline)
        {
            ServiceResponse<UpdateAirlineDto> serviceResponse = new ServiceResponse<UpdateAirlineDto>();
            try
            {
                Airline airline = await _context.Airlines.FirstOrDefaultAsync(a => a.Id == updatedAirline.Id);
                airline.Name = updatedAirline.Name;
                airline.Address = updatedAirline.Address;
                airline.Description = updatedAirline.Description;

                _context.Airlines.Update(airline);
                await _context.SaveChangesAsync();

                serviceResponse.Data = _mapper.Map<UpdateAirlineDto>(airline);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<Airline>>> GetAllAirlines()
        {
            ServiceResponse<List<Airline>> serviceResponse = new ServiceResponse<List<Airline>>();
            List<Airline> dbAirlines = await _context.Airlines.ToListAsync();
            serviceResponse.Data = dbAirlines.ToList();   //kao kod metode AddUser
            return serviceResponse;
        }

        public async Task<ServiceResponse<Airline>> GetSingle(int id)
        {
            ServiceResponse<Airline> serviceResponse = new ServiceResponse<Airline>();
            Airline dbAirline = await _context.Airlines.Include(a => a.AirlineDestinations).ThenInclude(ad => ad.Destination)
                                                        .Include(a => a.Flights)
                                              .FirstOrDefaultAsync(u => u.Id == id);

            if (dbAirline == null)
            {
                serviceResponse.Message = "Airline not found.";
                serviceResponse.Success = false;
                return serviceResponse;
            }
            serviceResponse.Data = dbAirline;
            return serviceResponse;
        }
    }
}
