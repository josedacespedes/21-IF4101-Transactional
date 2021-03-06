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
        private string imageProfessor;
        private string likesProfessor;
        private string vocationalTrainingProfessor;
        private string linksProfessor;

        public Professor()
        {
        }

        public Professor(int id, string firstNameProfessor, string lastNameProfessor, string idProfessor, string emailProfessor, string passwordProfessor, int stateProfessor, string imageProfessor, string likesProfessor, string vocationalTrainingProfessor, string linksProfessor)
        {
            this.Id = id;
            this.FirstNameProfessor = firstNameProfessor;
            this.LastNameProfessor = lastNameProfessor;
            IdProfessor = idProfessor;
            this.EmailProfessor = emailProfessor;
            this.PasswordProfessor = passwordProfessor;
            this.StateProfessor = stateProfessor;
            this.imageProfessor = imageProfessor;
            this.likesProfessor = likesProfessor;
            this.vocationalTrainingProfessor = vocationalTrainingProfessor;
            this.linksProfessor = linksProfessor;
        }

        public int Id { get => id; set => id = value; }
        public string FirstNameProfessor { get => firstNameProfessor; set => firstNameProfessor = value; }
        public string LastNameProfessor { get => lastNameProfessor; set => lastNameProfessor = value; }
        public string IdProfessor { get => idProfessor; set => idProfessor = value; }
        public string EmailProfessor { get => emailProfessor; set => emailProfessor = value; }
        public string PasswordProfessor { get => passwordProfessor; set => passwordProfessor = value; }
        public int StateProfessor { get => stateProfessor; set => stateProfessor = value; }
        public string ImageProfessor { get => imageProfessor; set => imageProfessor = value; }
        public string LikesProfessor { get => likesProfessor; set => likesProfessor = value; }
        public string VocationalTrainingProfessor { get => vocationalTrainingProfessor; set => vocationalTrainingProfessor = value; }
        public string LinksProfessor { get => linksProfessor; set => linksProfessor = value; }
    }
}
