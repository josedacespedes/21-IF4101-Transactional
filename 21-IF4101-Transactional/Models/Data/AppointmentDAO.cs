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

        public int Insert(Appointment appointment,String name)
        {
            int resultToReturn;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("InsertAppointment", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP
                                                                               //acá abajo le pasamos los parámetros al SP. En @ van los nombres de los parámetros en SP y a la par los valores. No pasamos el Id porque es autoincremental en la tabla, entonces no lo necesitamos:
                command.Parameters.AddWithValue("@Student_FullName", name);//AQUÍ IRÍA EL NOMBRE COMPLETO
                command.Parameters.AddWithValue("@Type", appointment.Type);
                command.Parameters.AddWithValue("@Date", appointment.Date);
                command.Parameters.AddWithValue("@Hour", appointment.Hour);
                resultToReturn = command.ExecuteNonQuery(); //esta es la sentencia que ejecuta la inserción en BD y saca un 1 o un 0 dependiendo de si se modificó la tupla o no. Es decir, si se insertó en BD o no.
                connection.Close(); //cerramos conexión.
            }
            return resultToReturn; //retornamos resultado al Controller.
        }



        public List<Appointment> Get(string id)
        {
            List<Appointment> appointment = new List<Appointment>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("SelectAppointment", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP      
                command.Parameters.AddWithValue("@Id", id);
                //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD

                while (sqlDataReader.Read())
                {
                    appointment.Add(new Appointment
                    {
                        Id =   Convert.ToInt32(sqlDataReader["id"]),
                        Student_FullName = sqlDataReader["student_fullname"].ToString(),
                        Type = Convert.ToInt32(sqlDataReader["type"]),
                        Date = Convert.ToDateTime(sqlDataReader["date"]),
                        Hour = Convert.ToDateTime(sqlDataReader["hour"])
                    });
                }
                connection.Close(); //cerramos conexión.
            }
            return appointment; //retornamos resultado al Controller.
        }
    }
}
