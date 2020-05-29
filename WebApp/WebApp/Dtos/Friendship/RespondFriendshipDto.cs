using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Dtos.Friendship
{
    public class ResponseFriendshipDto
    {
        public int UserId1 { get; set; }    //onaj ko je poslao zahtev, njemu odgovaram
        public bool Decision { get; set; }  // DA / NE
    }
}
