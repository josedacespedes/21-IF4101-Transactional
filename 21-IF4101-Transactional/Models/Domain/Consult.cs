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
        private int idAuthor;
        private string description;
        private DateTime date;
        private Course course;
        private int type; //tipo 0=privadan1=pública

        public Consult()
        {
        }

        public Consult(int id, string title, int idAuthor, string description, DateTime date, Course course, int type)
        {
            this.Id = id;
            this.Title = title;
            this.IdAuthor = idAuthor;
            this.Description = description;
            this.Date = date;
            this.Course = course;
            this.Type = type;
        }

        public int Id { get => id; set => id = value; }
        public string Title { get => title; set => title = value; }
        public int IdAuthor { get => idAuthor; set => idAuthor = value; }
        public string Description { get => description; set => description = value; }
        public DateTime Date { get => date; set => date = value; }
        public Course Course { get => course; set => course = value; }
        public int Type { get => type; set => type = value; }
    }
}
