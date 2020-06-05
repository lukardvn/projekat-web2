using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApp.Data;
using WebApp.Dtos.User;
using WebApp.Models;

namespace WebApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        
        public AuthController(IAuthRepository authRepository)
        {
            _authRepo = authRepository;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserRegisterDto request)
        {
            if (!ModelState.IsValid) //ModelState ne treba
                return BadRequest();

            ServiceResponse<int> response = await _authRepo.Register(
                new User { Email = request.Email, Name = request.Name,
                    Surname = request.Surname, City = request.City, PhoneNumber = request.PhoneNumber}
                , request.Password);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("AlreadyExists/{email}")]
        public async Task<IActionResult> AlreadyExists(string usernameToCheck)
        {
            bool response = await _authRepo.UserExists(usernameToCheck);
            return Ok(response);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserLoginDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            ServiceResponse<string> response = await _authRepo.Login(request.Email, request.Password);

            if (!response.Success)
                return BadRequest(response);
            return Ok(response);
        }
    }
}
