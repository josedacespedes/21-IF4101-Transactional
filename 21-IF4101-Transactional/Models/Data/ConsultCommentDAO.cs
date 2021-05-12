using _21_IF4101_Transactional.Models.Domain;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Data
{
    public class ConsultCommentDAO
    {

        private readonly IConfiguration _configuration;
        string connectionString;

        public ConsultCommentDAO(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");
        }


        public int Insert(ConsultComment consultComment)
        {
            int resultToReturn;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("InsertConsultComment", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP

                command.Parameters.AddWithValue("@Author", consultComment.Author);//AQUÍ IRÍA EL NOMBRE COMPLETO
                command.Parameters.AddWithValue("@Comment", consultComment.Comment);
                command.Parameters.AddWithValue("@IdConsult", consultComment.IdConsult);
                resultToReturn = command.ExecuteNonQuery(); //esta es la sentencia que ejecuta la inserción en BD y saca un 1 o un 0 dependiendo de si se modificó la tupla o no. Es decir, si se insertó en BD o no.
                connection.Close(); //cerramos conexión.
            }
            return resultToReturn; //retornamos resultado al Controller.
        }
    }
}
