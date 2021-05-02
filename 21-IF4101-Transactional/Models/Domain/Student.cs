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
        private string studentID;
        private string email;
        private string password;
        private int state;

        public Student()
        {
        }

        public Student(int id, string name, string lastname, string studentID, string email, string password, int state)
        {
            this.Id = id;
            this.Name = name;
            this.Lastname = lastname;
            this.StudentID = studentID;
            this.Email = email;
            this.Password = password;
            this.State = state;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Lastname { get => lastname; set => lastname = value; }
        public string StudentID { get => studentID; set => studentID = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public int State { get => state; set => state = value; }
    }
}
