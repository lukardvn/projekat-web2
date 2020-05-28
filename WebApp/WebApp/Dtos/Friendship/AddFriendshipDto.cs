using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Dtos.Friendship
{
    public class AddFriendshipDto
    {
        public int UserId1 { get; set; }
        public int UserId2 { get; set; }
    }
}
