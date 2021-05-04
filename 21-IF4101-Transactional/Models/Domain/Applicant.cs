using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Domain
{
    public class Applicant
    {
        private int id;
        private string firstNameApplicant;
        private string lastNameApplicant;
        private string studentIdApplicant;
        private string emailApplicant;
        private string passwordApplicant;

        public Applicant()
        {
        }

        public Applicant(int id, string firstNameApplicant, string lastNameApplicant, string studentIdApplicant, string emailApplicant, string passwordApplicant)
        {
            this.Id = id;
            this.FirstNameApplicant = firstNameApplicant;
            this.LastNameApplicant = lastNameApplicant;
            this.StudentIdApplicant = studentIdApplicant;
            this.EmailApplicant = emailApplicant;
            this.PasswordApplicant = passwordApplicant;
        }

        public int Id { get => id; set => id = value; }
        public string FirstNameApplicant { get => firstNameApplicant; set => firstNameApplicant = value; }
        public string LastNameApplicant { get => lastNameApplicant; set => lastNameApplicant = value; }
        public string StudentIdApplicant { get => studentIdApplicant; set => studentIdApplicant = value; }
        public string EmailApplicant { get => emailApplicant; set => emailApplicant = value; }
        public string PasswordApplicant { get => passwordApplicant; set => passwordApplicant = value; }
    }
}
