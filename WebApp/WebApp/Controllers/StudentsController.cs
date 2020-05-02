using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Model;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        // GET: api/Students
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

        // GET: api/Students/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Students
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Students/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
