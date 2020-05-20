using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Dtos.User;
using WebApp.Models;
using WebApp.Services.UserService;

namespace WebApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("GetAll")] // localhost/User/GetAll
        public async Task<IActionResult> Get()
        {
            return Ok(await _userService.GetAllUsers());
        }

        [HttpGet("{id}")] // localhost/User/x
        public async Task<IActionResult> GetSingle(int id)
        {
            return Ok(await _userService.GetUserById(id));
        }

        [HttpPost]  // POST localhost/User
        public async Task<IActionResult> AddUser(AddUserDto newUser)
        {
            return Ok(await _userService.AddUser(newUser));
        }

        [HttpPut] // PUT localhost/User
        public async Task<IActionResult> Updateuser(UpdateUserDto updatedUser)
        {
            ServiceResponse<GetUserDto> response = await _userService.UpdateUser(updatedUser);

            if (response.Data == null)
                return NotFound(response);
            return Ok(response);
        }

        [HttpDelete("{id}")] //DELETE localhost/User/x
        public async Task<IActionResult> Delete(int id)
        {
            ServiceResponse<List<GetUserDto>> response = await _userService.DeleteUser(id);
            if (response.Data == null)
                return NotFound(response);
            return Ok(response);
        }

        /*
        // GET: /User
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: /User/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: /User
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: /User/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: /ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }*/
    }
}
