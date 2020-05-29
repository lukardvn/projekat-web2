using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Friendship
    {
        public User User1 { get; set; } //SENDING REQUEST
        public int UserId1 { get; set; }
        public User User2 { get; set; } //RECEIVING REQUEST
        public int UserId2 { get; set; }
        public int Status { get; set; } //1 IF CONFIRMED, O OTHERWIZE
    }
}
