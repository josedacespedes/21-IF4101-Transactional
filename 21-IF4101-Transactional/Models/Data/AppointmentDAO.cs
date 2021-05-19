using _21_IF4101_Transactional.Models.Domain;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Data
{
    public class AppointmentDAO
    {
        private readonly IConfiguration _configuration;
        String connectionString;


        public AppointmentDAO(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");

        }

        public AppointmentDAO()
        {
        }

        public int InsertRequest(Appointment appointment, String name, String StudentId)
        {
            int resultToReturn;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("InsertAppointmentRequest", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP
                                                                               //acá abajo le pasamos los parámetros al SP. En @ van los nombres de los parámetros en SP y a la par los valores. No pasamos el Id porque es autoincremental en la tabla, entonces no lo necesitamos:
                command.Parameters.AddWithValue("@Student_FullName", name);//AQUÍ IRÍA EL NOMBRE COMPLETO
                command.Parameters.AddWithValue("@Type", appointment.Type);
                command.Parameters.AddWithValue("@ProfessorName", appointment.Professor_fullname);
                command.Parameters.AddWithValue("@AppointmentDate", appointment.Appointment_date);
                command.Parameters.AddWithValue("@StudentId", StudentId);
                resultToReturn = command.ExecuteNonQuery(); //esta es la sentencia que ejecuta la inserción en BD y saca un 1 o un 0 dependiendo de si se modificó la tupla o no. Es decir, si se insertó en BD o no.
                connection.Close();
            }
            return resultToReturn;
        }



        public List<Appointment> Get(String name)
        {
            List<Appointment> appointment = new List<Appointment>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("SelectAppointments", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP      
                command.Parameters.AddWithValue("@ProfessorFullName", name);
                //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD

                while (sqlDataReader.Read())
                {
                    appointment.Add(new Appointment
                    {
                        Id = Convert.ToInt32(sqlDataReader["Id"]),
                        Student_FullName = sqlDataReader["Student_FullName"].ToString(),
                        Type = Convert.ToInt32(sqlDataReader["Type"]),
                        Professor_fullname = sqlDataReader["ProfessorName"].ToString(),
                        Appointment_date = sqlDataReader["AppointmentDate"].ToString(),
                        StudentId = sqlDataReader["StudentId"].ToString()
                    });
                }
                connection.Close(); //cerramos conexión.
            }
            return appointment; //retornamos resultado al Controller.
        }

        public List<String> GetDates(String ProfessorName)
        {
            List<String> appointments = new List<String>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("SelectAppointmentDate", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP      
                command.Parameters.AddWithValue("@ProfessorFullName", ProfessorName);
                //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD

                while (sqlDataReader.Read())
                {
                    appointments.Add(sqlDataReader["DateHourAppointment"].ToString());
                }
                connection.Close(); //cerramos conexión.
            }
            return appointments; //retornamos resultado al Controller.
        }

        public String GetStudentId(String Email)
        {
            String StudentId = "";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("SelectStudentId", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP      
                command.Parameters.AddWithValue("@Email", Email);
                //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD

                while (sqlDataReader.Read())
                {
                    StudentId = sqlDataReader["StudentId"].ToString();
                }
                connection.Close(); //cerramos conexión.
            }
            return StudentId; //retornamos resultado al Controller.
        }

        public int Delete(int id)
        {
            int resultToReturn;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                SqlCommand command = new SqlCommand("DeleteAppointmentRequest", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@id", id);
                resultToReturn = command.ExecuteNonQuery();
                connection.Close();
            }

            return resultToReturn;

        }

        public List<Appointment> GetRequest(String name)
        {
            List<Appointment> appointmentRequest = new List<Appointment>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("SelectAppointmentsRequest", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@ProfessorFullName", name);
                SqlDataReader sqlDataReader = command.ExecuteReader();

                while (sqlDataReader.Read())
                {
                    appointmentRequest.Add(new Appointment
                    {
                        Id = Convert.ToInt32(sqlDataReader["Id"]),
                        Student_FullName = sqlDataReader["Student_FullName"].ToString(),
                        Type = Convert.ToInt32(sqlDataReader["Type"]),
                        Professor_fullname = sqlDataReader["ProfessorName"].ToString(),
                        Appointment_date = sqlDataReader["AppointmentDate"].ToString(),
                        StudentId = sqlDataReader["StudentId"].ToString()
                    });
                }
                connection.Close();
            }
            return appointmentRequest;
        }

    }
}