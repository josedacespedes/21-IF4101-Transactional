using _21_IF4101_Transactional.Controllers;
using _21_IF4101_Transactional.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Data
{
    public class ConsultDAO
    {

        private readonly IConfiguration _configuration;
        String connectionString;
        

        public ConsultDAO(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");

        }

        public ConsultDAO()
        {
        }

        public int Insert(Consult consult, String name)
        {
            int resultToReturn; 
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("InsertConsult", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP
                                                                               //acá abajo le pasamos los parámetros al SP. En @ van los nombres de los parámetros en SP y a la par los valores. No pasamos el Id porque es autoincremental en la tabla, entonces no lo necesitamos:
                command.Parameters.AddWithValue("@Title", consult.Title);
                command.Parameters.AddWithValue("@Author", name );//AQUÍ IRÍA EL NOMBRE COMPLETO
                command.Parameters.AddWithValue("@Description", consult.Description);
                command.Parameters.AddWithValue("@idCourse", consult.Course);
                command.Parameters.AddWithValue("@Type", consult.Type);
                resultToReturn = command.ExecuteNonQuery(); //esta es la sentencia que ejecuta la inserción en BD y saca un 1 o un 0 dependiendo de si se modificó la tupla o no. Es decir, si se insertó en BD o no.
                connection.Close(); //cerramos conexión.
            }
            return resultToReturn; //retornamos resultado al Controller.
        }

        //public List<Course> GetCoursesByProfessor(int idProfessor)
        //{
        //    List<Course> courses = new List<Course>();

        //    using (SqlConnection connection = new SqlConnection(connectionString))
        //    {
        //        connection.Open(); //abrimos conexión
        //        SqlCommand command = new SqlCommand("SelectCourseByProfessor", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
        //        command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP                                                             //logica del get/select
        //        SqlDataReader sqlDataReader = command.ExecuteReader();
        //        //leemos todas las filas provenientes de BD
        //        while (sqlDataReader.Read())
        //        {
        //            courses.Add(new Course
        //            {
        //                Id = Convert.ToInt32(sqlDataReader["Id"]),
        //                Code = sqlDataReader["Code"].ToString(),
        //                Name = sqlDataReader["Name"].ToString(),
        //                Credits = 0,
        //                State = 0
        //            });
        //        }
        //        connection.Close(); //cerramos conexión.
        //    }
        //    return courses; //retornamos resultado al Controller.
        //}

        public List<Consult> Get()
        {
            List<Consult> consults = new List<Consult>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("SelectConsult", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP                                                                               //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD

                while (sqlDataReader.Read())
                {
                    consults.Add(new Consult
                    {
                        Id = Convert.ToInt32(sqlDataReader["id"]),
                        Title = sqlDataReader["title"].ToString(),
                        Author = sqlDataReader["author"].ToString(),
                        Description = sqlDataReader["description"].ToString(),
                        Date = Convert.ToDateTime(sqlDataReader["date"]),
                        Course = Convert.ToInt32(sqlDataReader["idCourse"]),
                        Type = Convert.ToInt32(sqlDataReader["type"])
                });
                }
                connection.Close(); //cerramos conexión.
            }
            return consults; //retornamos resultado al Controller.
        }

        public Consult Get(int idConsult)
        {
            Consult consult = null;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("SelectConsultById", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP
                command.Parameters.AddWithValue("@id", idConsult);                                                                               //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD
                consult = new Consult();
                if (sqlDataReader.Read())
                {
                    consult.Id = Convert.ToInt32(sqlDataReader["id"]);
                    consult.Title = sqlDataReader["title"].ToString();
                    consult.Author = sqlDataReader["idAuthor"].ToString();
                    consult.Description = sqlDataReader["description"].ToString();
                    consult.Date = Convert.ToDateTime(sqlDataReader["date"]);
                    consult.Course = Convert.ToInt32(sqlDataReader["idCourse"]);
                    consult.Type = Convert.ToInt32(sqlDataReader["type"]);
                }
                connection.Close(); //cerramos conexión.
            }
            return consult; //retornamos resultado al Controller.
        }

    }
}
