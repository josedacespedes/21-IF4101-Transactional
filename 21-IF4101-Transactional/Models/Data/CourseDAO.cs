using _21_IF4101_Transactional.Models.Domain;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Data
{
    public class CourseDAO
    {

        private readonly IConfiguration _configuration;
        String connectionString;

        public CourseDAO(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");

        }

        public CourseDAO()
        {

        }

        public int Insert(Course course)
        {
            int resultToReturn; //declaramos variable que guardará un 1 o un 0 de acuerdo a si se insertó o no el student
                                //usaremos using para englobar todo lo que tiene que ver con una misma cosa u objeto. En este caso, todo lo envuelto acá tiene que ver con connection, la cual sacamos con la clase SqlConnection y con el string de conexión que tenemos en nuestro appsetting.json
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("InsertCourse", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP
                                                                               //acá abajo le pasamos los parámetros al SP. En @ van los nombres de los parámetros en SP y a la par los valores. No pasamos el Id porque es autoincremental en la tabla, entonces no lo necesitamos:
                command.Parameters.AddWithValue("@Code", course.Code);
                command.Parameters.AddWithValue("@Name", course.Name);
                command.Parameters.AddWithValue("@Credits", course.Credits);
                command.Parameters.AddWithValue("@State", course.State);
                resultToReturn = command.ExecuteNonQuery(); //esta es la sentencia que ejecuta la inserción en BD y saca un 1 o un 0 dependiendo de si se modificó la tupla o no. Es decir, si se insertó en BD o no.
                connection.Close(); //cerramos conexión.
            }
            return resultToReturn; //retornamos resultado al Controller.
        }

        public List<String> GetCodes()
        {
            List<String> codes = new List<String>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("ViewCodes", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP
                                                                               //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD
                while (sqlDataReader.Read())
                {
                    codes.Add(sqlDataReader["Code"].ToString());
                }
                connection.Close(); //cerramos conexión.
            }
            return codes; //retornamos resultado al Controller.
        }

        public List<Course> Get()
        {
            List<Course> courses = new List<Course>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("SelectCourse", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP                                                             //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD
                while (sqlDataReader.Read())
                {
                    courses.Add(new Course
                    {
                        Id = Convert.ToInt32(sqlDataReader["Id"]),
                        Code = sqlDataReader["Code"].ToString(),
                        Name = sqlDataReader["Name"].ToString(),
                        Credits = Convert.ToInt32(sqlDataReader["Credits"]),
                        State = Convert.ToInt32(sqlDataReader["State"])

                    });
                }
                connection.Close(); //cerramos conexión.
            }
            return courses; //retornamos resultado al Controller.
        }


        public List<Course> GetToConsult()
        {
            List<Course> courses = new List<Course>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("SelectCourse", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP                                                             //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD
                while (sqlDataReader.Read())
                {
                    courses.Add(new Course
                    {
                        Id = Convert.ToInt32(sqlDataReader["Id"]),
                        Code = sqlDataReader["Code"].ToString(),
                        Name = sqlDataReader["Name"].ToString(),
                        Credits = Convert.ToInt32(sqlDataReader["Credits"]),
                        State = Convert.ToInt32(sqlDataReader["State"])

                    });
                }
                connection.Close(); //cerramos conexión.
            }
            return courses; //retornamos resultado al Controller.
        }


        public int Update(Course course)
        {
            int resultToReturn;
            SqlConnection connection = null;

            try
            {
                using (connection = new SqlConnection(connectionString))
                {
                    connection.Open(); //abrimos conexión
                    SqlCommand command = new SqlCommand("UpdateCourse", connection);

                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id", course.Id);
                    command.Parameters.AddWithValue("@Name", course.Name);
                    command.Parameters.AddWithValue("@Credits", course.Credits);
                    command.Parameters.AddWithValue("@State", course.State);

                    resultToReturn = command.ExecuteNonQuery();
                    connection.Close();
                }
                return resultToReturn;
            }
            catch (SqlException ex)
            {
                return ex.Number;
            }
            finally
            {
                if (connection != null)
                    connection.Close();
            }
        }


        public int InsertGroup(Course course)
        {
            int resultToReturn = 0;
            int resultToReturnReference = course.NumGroup.Count;

            SqlConnection connection = null;
            try
            {
                foreach (int group in course.NumGroup)
                {
                    using (connection = new SqlConnection(connectionString))
                    {
                        connection.Open();
                        SqlCommand command = new SqlCommand("InsertCourseGroup", connection);
                        command.CommandType = System.Data.CommandType.StoredProcedure;

                        command.Parameters.AddWithValue("@IdCourse", course.Id);
                        command.Parameters.AddWithValue("@NumGroup", group);
                        resultToReturn = command.ExecuteNonQuery();
                        connection.Close();
                    }
                    resultToReturn++;
                }

                return resultToReturn == resultToReturnReference ? 1 : -1;
            }
            catch (SqlException ex)
            {
                return ex.Number;
            }
            finally
            {
                if (connection != null)
                    connection.Close();
            }
        }

    }
}
