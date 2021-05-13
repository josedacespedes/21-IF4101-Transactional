using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Domain
{
    public class ConsultComment
    {
        private int id;
        private string author;
        private DateTime date;
        private string comment;
        private int idConsult;

        public ConsultComment()
        {
        }

        public ConsultComment(int id, string author, DateTime date, string comment, int idConsult)
        {
            this.Id = id;
            this.Author = author;
            this.Date = date;
            this.Comment = comment;
            this.IdConsult = idConsult;
        }

        public int Id { get => id; set => id = value; }
        public string Author { get => author; set => author = value; }
        public DateTime Date { get => date; set => date = value; }
        public string Comment { get => comment; set => comment = value; }
        public int IdConsult { get => idConsult; set => idConsult = value; }
    }
}
