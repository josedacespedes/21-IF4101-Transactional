using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Domain
{
    public class Appointment
    {
        private int id;
        private string student_fullname;
        private int type; //tipo 0=virtual 1=presencial
        private DateTime date;
        private DateTime hour;

        public Appointment()
        {
        }

        public Appointment(int id, string student_fullname, int type, DateTime date, DateTime hour)
        {
            this.Id = id;
            this.Student_FullName = student_fullname;
            this.Type = type;
            this.Date = date;
            this.Hour = hour;
        }

        public int Id { get => id; set => id = value; }
        public string Student_FullName { get => student_fullname; set => student_fullname = value; }
        public int Type { get => type; set => type = value; }
        public DateTime Date { get => date; set => date = value; }
        public DateTime Hour { get => hour; set => hour = value; }
        
    }
}
