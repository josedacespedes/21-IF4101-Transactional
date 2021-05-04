using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Domain
{
    public class Professor
    {
        private int id;
        private string firstNameProfessor;
        private string lastNameProfessor;
        private string idProfessor;
        private string emailProfessor;
        private string passwordProfessor;
        private int stateProfessor;

        public Professor()
        {
        }

        public Professor(int id, string firstNameProfessor, string lastNameProfessor, string idProfessor, string emailProfessor, string passwordProfessor, int stateProfessor)
        {
            this.Id = id;
            this.FirstNameProfessor = firstNameProfessor;
            this.LastNameProfessor = lastNameProfessor;
            IdProfessor = idProfessor;
            this.EmailProfessor = emailProfessor;
            this.PasswordProfessor = passwordProfessor;
            this.StateProfessor = stateProfessor;
        }

        public int Id { get => id; set => id = value; }
        public string FirstNameProfessor { get => firstNameProfessor; set => firstNameProfessor = value; }
        public string LastNameProfessor { get => lastNameProfessor; set => lastNameProfessor = value; }
        public string IdProfessor { get => idProfessor; set => IdProfessor = value; }
        public string EmailProfessor { get => emailProfessor; set => emailProfessor = value; }
        public string PasswordProfessor { get => passwordProfessor; set => passwordProfessor = value; }
        public int StateProfessor { get => stateProfessor; set => stateProfessor = value; }
    }
}
