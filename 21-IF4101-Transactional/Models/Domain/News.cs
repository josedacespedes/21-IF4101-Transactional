using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Domain
{
    public class News
    {
        private int id;
        private string title;
        private string description;
        private string author;
        private DateTime publication_Date;
        private DateTime modification_Date;
        private string fileNews;
        private string imagen;

        public News()
        {
        }

        public News(int id, string title, string description, string author, DateTime publication_Date, DateTime modification_Date, string file_New, string imagen)
        {
            this.Id = id;
            this.Title = title;
            this.Description = description;
            this.Author = author;
            this.Publication_Date = publication_Date;
            this.Modification_Date = modification_Date;
            this.FileNews = fileNews;
            this.Imagen = imagen;
        }

        public int Id { get => id; set => id = value; }
        public string Title { get => title; set => title = value; }
        public string Description { get => description; set => description = value; }
        public string Author { get => author; set => author = value; }
        public DateTime Publication_Date { get => publication_Date; set => publication_Date = value; }
        public DateTime Modification_Date { get => modification_Date; set => modification_Date = value; }
        public string FileNews { get => fileNews; set => fileNews = value; }
        public string Imagen { get => imagen; set => imagen = value; }
    }
}
