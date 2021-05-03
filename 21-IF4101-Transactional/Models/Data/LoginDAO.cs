﻿using Microsoft.Extensions.Configuration;
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
        String connectionString;

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
            List<String> mails = new List<String>();

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
                    mails.Add(sqlDataReader["Password"].ToString());
                }
                connection.Close(); //cerramos conexión.
            }
            return mails; //retornamos resultado al Controller.
        }

        public String GetNameEmail(string Email)
        {
            String nameE = "";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("NameByEmail", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP
                command.Parameters.AddWithValue("@Email", Email);                        //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD

                nameE += sqlDataReader["Name"].ToString();
                //while (sqlDataReader.Read())
                //{
                //    mails.Add(sqlDataReader["Email"].ToString());
                //}
                connection.Close(); //cerramos conexión.
            }
            return nameE; //retornamos resultado al Controller.
        }

        public String GetNamePassword(string Password)
        {
            String nameP = "";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("NameByPassword", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP
                command.Parameters.AddWithValue("@Password", Password);                        //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD

                nameP += sqlDataReader["Name"].ToString();
                //while (sqlDataReader.Read())
                //{
                //    mails.Add(sqlDataReader["Email"].ToString());
                //}
                connection.Close(); //cerramos conexión.
            }
            return nameP; //retornamos resultado al Controller.
        }

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

                name += sqlDataReader["Name"].ToString();
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