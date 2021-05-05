using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Domain
{
    public class Login
    {
        private int id;
        private string email;
        private string password;
        private string rol;

        public Login()
        {
        }

        public Login(int id, string email, string password, string rol)
        {
            this.Id = id;
            this.Email = email;
            this.Password = password;
            this.Rol = rol;
        }

        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public string Rol { get => rol; set => rol = value; }
        public int Id { get => id; set => id = value; }
    }
}
