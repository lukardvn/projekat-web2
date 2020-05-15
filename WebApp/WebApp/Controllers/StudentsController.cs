using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Models;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Student> Get()
        {
            List<Student> oStudents = new List<Student>()
            {
                new Student(){ Id = 0, Name = "Ime1", Roll = 1001 },
                new Student(){ Id = 1, Name = "Ime2", Roll = 1002 },
                new Student(){ Id = 2, Name = "Ime3", Roll = 1003 },
                new Student(){ Id = 3, Name = "Ime4", Roll = 1004 },
                new Student(){ Id = 4, Name = "Ime5", Roll = 1005 },
            };

            return oStudents;
        }
    }
}