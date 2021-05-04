using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
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

        public List<String> GetMails()
        {
            List<String> mails = new List<String>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("ViewMail", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP
                                                                               //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD
                while (sqlDataReader.Read())
                {
                    mails.Add(sqlDataReader["Email"].ToString());
                }
                connection.Close(); //cerramos conexión.
            }
            return mails; //retornamos resultado al Controller.
        }

        public List<String> GetPaswords()
        {
            List<String> passwords = new List<String>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("ViewPassword", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP
                                                                               //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD
                while (sqlDataReader.Read())
                {
                    passwords.Add(sqlDataReader["Password"].ToString());
                }
                connection.Close(); //cerramos conexión.
            }
            return passwords; //retornamos resultado al Controller.
        }
<<<<<<< HEAD
=======

>>>>>>> 6796b8b64f5e4e04e69d25f7a28744fa2cd4820b

        
        public String CheckPasswordEmail(string Email, string Password)
        {
            String name = "";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("CheckPasswordEmail", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP
                command.Parameters.AddWithValue("@Email", Email);
                command.Parameters.AddWithValue("@Password", Password);                        //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD

                name += sqlDataReader["FirstName"].ToString();
                //while (sqlDataReader.Read())
                //{
                //    mails.Add(sqlDataReader["Email"].ToString());
                //}
                connection.Close(); //cerramos conexión.
            }
            return name; //retornamos resultado al Controller.
        }

    }
}
