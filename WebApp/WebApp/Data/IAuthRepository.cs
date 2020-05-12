using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Data
{
    public interface IAuthRepository
    {
        //returns userId as a ServiceResponse
        Task<ServiceResponse<int>> Register(User user, string password);
        //returns token as a ServiceResponse
        Task<ServiceResponse<string>> Login(string username, string password);
        //returns just true or false
        Task<bool> UserExists(string username);
    }
}
