using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Domain
{
    public class NewsComment
    {
        private int id;
        private string author;
        private DateTime date;
        private string comment;
        private int idNews;

        public NewsComment()
        {
        }

        public NewsComment(int id, string author, DateTime date, string comment, int idNews)
        {
            this.Id = id;
            this.Author = author;
            this.Date = date;
            this.Comment = comment;
            this.IdNews = idNews;
        }

        public int Id { get => id; set => id = value; }
        public string Author { get => author; set => author = value; }
        public DateTime Date { get => date; set => date = value; }
        public string Comment { get => comment; set => comment = value; }
        public int IdNews { get => idNews; set => idNews = value; }
    }
}
