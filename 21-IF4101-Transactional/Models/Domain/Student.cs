using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models
{
    public class Student
    {
        private int id;
        private string firstName;
        private string lastName;
        private string studentId;
        private string email;
        private string password;
        private int state;

        public Student()
        {
        }

        public Student(int id, string firstName, string lastName, string studentId, string email, string password, int state)
        {
            this.Id = id;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.StudentId = studentId;
            this.Email = email;
            this.Password = password;
            this.State = state;
        }

        public int Id { get => id; set => id = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string StudentId { get => studentId; set => studentId = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public int State { get => state; set => state = value; }
    }
}
