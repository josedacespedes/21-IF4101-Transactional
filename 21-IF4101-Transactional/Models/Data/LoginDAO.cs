using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Data
{
    public class LoginDAO
    {

        private readonly IConfiguration _configuration;
        string connectionString;

        public LoginDAO(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");

        }

        public LoginDAO()
        {

        }

        public int CheckPasswordEmail(string Email, string Password)
        {


            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("CheckPasswordEmail", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP
                command.Parameters.AddWithValue("@Email", Email);
                command.Parameters.AddWithValue("@Password", Password);                        //logica del get/select
                var returnParameter = command.Parameters.Add("@Exists", SqlDbType.Int);
                returnParameter.Direction = ParameterDirection.ReturnValue;
                command.ExecuteNonQuery();

                int result = (int)returnParameter.Value;
                connection.Close();

                return result;
            }



        }

        //método para obtener el nombre completo del usuario
        public string GetNameUserByEmail(string email)
        {
            string name = "", lastName = "";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("SelectNameUserByEmail", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP                                                             //logica del get/select

                command.Parameters.AddWithValue("@Email", email);
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD
                if (sqlDataReader.Read())
                {
                    name = sqlDataReader["FirstName"].ToString();
                    lastName = sqlDataReader["LastName"].ToString();
                }
                connection.Close(); //cerramos conexión.
            }
            return name + " " + lastName; //retornamos resultado al Controller.
        }

        public int GetIdUserByEmail(string email)
        {
            int id = 0; 

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("SelectIdUserByEmail", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP                                                             //logica del get/select

                command.Parameters.AddWithValue("@Email", email);
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD
                while (sqlDataReader.Read())
                {
                    id = Convert.ToInt32(sqlDataReader["Id"]);
                }
                connection.Close(); //cerramos conexión.
            }
            return id; //retornamos resultado al Controller.
        }
        
        public string GetRoleUserByEmail(string email)
        {
            string role = "";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("SelectRoleUserByEmail", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP                                                             //logica del get/select
                command.Parameters.AddWithValue("@Email", email);
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD
                while (sqlDataReader.Read())
                {
                    role = sqlDataReader["Rol"].ToString();
                }
                connection.Close(); //cerramos conexión.
            }
            return role; //retornamos resultado al Controller.
        }

        public int Delete(string email)
        {
            int resultToReturn; //declaramos variable que guardará un 1 o un 0 de acuerdo a si se eliminó o no el APPLICANT

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("DeleteUser", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Email", email);
                resultToReturn = command.ExecuteNonQuery();
                connection.Close(); //cerramos conexión. 
            }
            return resultToReturn; //retornamos resultado al Controller.  
        }

    }
}
