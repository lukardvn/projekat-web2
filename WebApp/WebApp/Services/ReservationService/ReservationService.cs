using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApp.Data;
using WebApp.Dtos.Reservation;
using WebApp.Models;

namespace WebApp.Services.ReservationService
{
    public class ReservationService : IReservationService
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;

        public ReservationService(DataContext context, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _mapper = mapper;
        }

        //da bismo dobavili trenutnog korisnika
        private int GetUserId() => int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

        public async Task<ServiceResponse<List<Reservation>>> GetAllReservations()
        {   //dobavlja sve rezervacije TRENUTNOG korisnika
            ServiceResponse<List<Reservation>> serviceResponse = new ServiceResponse<List<Reservation>>();
            try
            {
                List<Reservation> dbReservations = await _context.Reservations
                            .Include(r => r.User).Include(r => r.DepartingFlight).Include(r => r.ReturningFlight)
                            .Where(r => r.User.Id == GetUserId()).ToListAsync();
                serviceResponse.Data = dbReservations;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<Reservation>>> AddReservation(AddReservationDto newReservation)
        {
            ServiceResponse<List<Reservation>> serviceResponse = new ServiceResponse<List<Reservation>>();
            try
            {
                User user = await _context.Users.Include(u => u.Reservations).FirstOrDefaultAsync(u => u.Id == GetUserId());
                newReservation.User = user;
                Reservation reservation = _mapper.Map<Reservation>(newReservation);  
                user.Reservations.Add(reservation);

                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                serviceResponse.Data = user.Reservations.ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Message = ex.Message;
                serviceResponse.Success = false;
            }
            return serviceResponse;

            /*
            ServiceResponse<List<Reservation>> serviceResponse = new ServiceResponse<List<Reservation>>();
            try
            {
                User user = await _context.Users.Include(u => u.Reservations).FirstOrDefaultAsync(u => u.Id == GetUserId());
                newReservation.User = user;
                Reservation reservation = _mapper.Map<Reservation>(newReservation);
                await _context.Reservations.AddAsync(reservation);
                //await _context.SaveChangesAsync();
                
                serviceResponse.Data = user.Reservations.ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Message = ex.Message;
                serviceResponse.Success = false;
            }
            return serviceResponse;
            */
        }
    }
}
