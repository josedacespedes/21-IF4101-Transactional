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
        private string professor_fullname;
        private string appointment_date;
        private string studentId;

        public Appointment()
        {
        }

        public Appointment(int id, string student_fullname, int type, string professor_fullname, string appointment_date, string studentId)
        {
            this.Id = id;
            this.Student_FullName = student_fullname;
            this.Type = type;
            this.Professor_fullname = professor_fullname;
            this.Appointment_date = appointment_date;
            this.StudentId = studentId;
        }

        public int Id { get => id; set => id = value; }
        public string Student_FullName { get => student_fullname; set => student_fullname = value; }
        public int Type { get => type; set => type = value; }
        public string Professor_fullname { get => professor_fullname; set => professor_fullname = value; }
        public string Appointment_date { get => appointment_date; set => appointment_date = value; }
        public string StudentId { get => studentId; set => studentId = value; }
    }
}
