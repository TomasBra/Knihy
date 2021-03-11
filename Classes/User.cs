using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EknihyReact.Classes
{
    public class User
    {   
        public int id { get; set; }
        public string username {get; set;}
        public string password { get; set; }
        public bool authenticated { get; set; }

        public User(int Id, string Username, string Password, bool Authenticated)
        {
            id = Id;
            username = Username;
            password = Password;
            authenticated = Authenticated;
        }
    }
}
