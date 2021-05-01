using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models
{
    public class Student
    {
        private int id;
        private string name;
        private string lastname;
        private string license;
        private string email;
        private string password;
        private int state;

        public Student(int id, string name, string lastname, string license, string email, string password, int state)
        {
            this.id = id;
            this.name = name;
            this.lastname = lastname;
            this.license = license;
            this.email = email;
            this.password = password;
            this.state = state;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Lastname { get => lastname; set => lastname = value; }
        public string License { get => license; set => license = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public int State { get => state; set => state = value; }
    }
}
