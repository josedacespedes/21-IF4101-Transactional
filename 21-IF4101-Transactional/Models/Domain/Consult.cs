using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Domain
{
    public class Consult
    {
        private int id;
        private string title;
        private string author;
        private string description;
        private DateTime date;
        private string professor;
        private int type; //tipo 0=privadan1=pública

        public Consult()
        {
        }

        public Consult(int id, string title, string author, string description, DateTime date, string professor, int type)
        {
            this.Id = id;
            this.Title = title;
            this.Author = author;
            this.Description = description;
            this.Date = date;
            this.Professor = professor;
            this.Type = type;
        }

        public int Id { get => id; set => id = value; }
        public string Title { get => title; set => title = value; }
        public string Author { get => author; set => author = value; }
        public string Description { get => description; set => description = value; }
        public DateTime Date { get => date; set => date = value; }
        public string Professor { get => professor; set => professor = value; }
        public int Type { get => type; set => type = value; }
    }
}
