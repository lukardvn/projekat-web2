using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Review
    {
        public int Id { get; set; }
        [Required]
        public User User { get; set; }
        [Required]
        public Flight Flight { get; set; }
        [Range(1, 5)]
        public int Rating { get; set; }
    }
}
