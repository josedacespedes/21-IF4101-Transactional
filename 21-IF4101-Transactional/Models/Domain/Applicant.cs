using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Domain
{
    public class Applicant
    {
        private int id;
        private string firstName;
        private string lastName;
        private string applicantId;
        private string email;
        private string password;
        private int state;

        public Applicant()
        {
        }

        public Applicant(int id, string firstName, string lastName, string applicantId, string email, string password, int state)
        {
            this.Id = id;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.ApplicantId = applicantId;
            this.Email = email;
            this.Password = password;
            this.State = state;
        }

        public int Id { get => id; set => id = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string ApplicantId { get => applicantId; set => applicantId = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public int State { get => state; set => state = value; }
    }
}
