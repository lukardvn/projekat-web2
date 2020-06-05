using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApp.Data;
using WebApp.Models;

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
        private int GetUserPrivilegs() => int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Role));

        public async Task<ServiceResponse<Airline>> GetMyAirline()
        {
            var priv = GetUserPrivilegs();

            ServiceResponse<Airline> serviceResponse = new ServiceResponse<Airline>();

            User user = await _context.Users.Include(u => u.Airline).FirstOrDefaultAsync(u => u.Id == GetUserId());
            serviceResponse.Data = user.Airline;
            return serviceResponse;
        }
    }
}
