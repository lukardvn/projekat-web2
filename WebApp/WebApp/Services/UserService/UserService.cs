using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;
using WebApp.Data;
using WebApp.Dtos.User;
using WebApp.Models;

namespace WebApp.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly DataContext _context; 
        private readonly IMapper _mapper;
        private readonly IAuthRepository _authRepository;

        public UserService(DataContext context, IMapper mapper, IAuthRepository authRepository)
        {
            _context = context;
            _mapper = mapper;
            _authRepository = authRepository;
        }

        public async Task<ServiceResponse<List<GetUserDto>>> AddUser(AddUserDto newUser)
        {
            ServiceResponse<List<GetUserDto>> serviceResponse = new ServiceResponse<List<GetUserDto>>();
            User user = _mapper.Map<User>(newUser); //AddUserDto => User

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            //mapiranje svakog User-a iz liste na GetUserDto
            serviceResponse.Data = (_context.Users.Select(u => _mapper.Map<GetUserDto>(u))).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetUserDto>>> DeleteUser(int id)
        {
            ServiceResponse<List<GetUserDto>> serviceResponse = new ServiceResponse<List<GetUserDto>>();
            try
            {
                User user = await _context.Users.FirstAsync(u => u.Id == id);
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                serviceResponse.Data = (_context.Users.Select(u => _mapper.Map<GetUserDto>(u))).ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetUserDto>>> GetAllUsers()
        {
            ServiceResponse<List<GetUserDto>> serviceResponse = new ServiceResponse<List<GetUserDto>>();
            List<User> dbUsers = await _context.Users.ToListAsync();      
            serviceResponse.Data = dbUsers.Select(u => _mapper.Map<GetUserDto>(u)).ToList();   //kao kod metode AddUser
            return serviceResponse;
        }

        public async Task<ServiceResponse<FriendUserDto>> GetUser(int id)   //neciji profil
        {
            ServiceResponse<FriendUserDto> serviceResponse = new ServiceResponse<FriendUserDto>();
            User dbUser = await _context.Users.Include(u => u.Friendships).ThenInclude(fs => fs.User1)
                                              .Include(u => u.Friendships).ThenInclude(fs => fs.User2)
                                              .Include(u => u.Reservations).ThenInclude(r => r.DepartingFlight)
                                              .Include(u => u.Reservations).ThenInclude(r => r.ReturningFlight)
                                              .FirstOrDefaultAsync(u => u.Id == id);
            serviceResponse.Data = _mapper.Map<FriendUserDto>(dbUser); //mapiranje User na GetUserDto
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetUserDto>> GetUserById(int id)  //izmena svog profila
        {
            ServiceResponse<GetUserDto> serviceResponse = new ServiceResponse<GetUserDto>();
            User dbUser = await _context.Users.Include(u => u.Friendships).ThenInclude(fs => fs.User1)
                                              .Include(u => u.Friendships).ThenInclude(fs => fs.User2)
                                              .Include(u => u.Reservations).ThenInclude(r => r.DepartingFlight)
                                              .Include(u => u.Reservations).ThenInclude(r => r.ReturningFlight)
                                              .Include(u => u.Airline)
                                              .FirstOrDefaultAsync(u => u.Id == id);
            serviceResponse.Data = _mapper.Map<GetUserDto>(dbUser); //mapiranje User na GetUserDto
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetUserDto>> UpdateUser(UpdateUserDto updatedUser)
        {
            ServiceResponse<GetUserDto> serviceResponse = new ServiceResponse<GetUserDto>();
            try
            {
                User user = await _context.Users.FirstOrDefaultAsync(u => u.Id == updatedUser.Id);
                user.Email = updatedUser.Email;
                user.Name = updatedUser.Name;
                user.Surname = updatedUser.Surname;
                user.PhoneNumber = updatedUser.PhoneNumber;
                user.City = updatedUser.City;

                if (updatedUser.Password != null)
                {
                    _authRepository.CreatePasswordHash(updatedUser.Password, out byte[] updatedPassHash, out byte[] updatedPassSalt);
                    user.PasswordHash = updatedPassHash;
                    user.PasswordSalt = updatedPassSalt;
                }
             
                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                serviceResponse.Data = _mapper.Map<GetUserDto>(user);
                serviceResponse.Message = "Your changes have been saved.";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<GetUserDto>> ChangePassword(string newPassword)
        {
            ServiceResponse<GetUserDto> serviceResponse = new ServiceResponse<GetUserDto>();

            try
            {
                _authRepository.CreatePasswordHash(newPassword, out byte[] updatedPassHash, out byte[] updatedPassSalt);

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
