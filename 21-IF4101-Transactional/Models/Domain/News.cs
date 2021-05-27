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
        private string publicationDate;
        private string modificationDate;
        private string fileNews;
        private string imagen;

        public News()
        {
        }

        public News(int id, string title, string description, string author, string file_New, string imagen, string publicationDate, string modificationDate)
        {
            this.Id = id;
            this.Title = title;
            this.Description = description;
            this.Author = author;
            this.FileNews = fileNews;
            this.Imagen = imagen;
            this.publicationDate = publicationDate;
            this.modificationDate = modificationDate;
        }

        public int Id { get => id; set => id = value; }
        public string Title { get => title; set => title = value; }
        public string Description { get => description; set => description = value; }
        public string Author { get => author; set => author = value; }
        public string FileNews { get => fileNews; set => fileNews = value; }
        public string Imagen { get => imagen; set => imagen = value; }
        public string PublicationDate { get => publicationDate; set => publicationDate = value; }
        public string ModificationDate { get => modificationDate; set => modificationDate = value; }
    }
}
