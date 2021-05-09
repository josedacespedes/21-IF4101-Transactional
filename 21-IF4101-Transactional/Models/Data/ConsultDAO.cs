using _21_IF4101_Transactional.Models.Domain;
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

        public int Insert(Consult consult)
        {
            int resultToReturn; 
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("InsertConsult", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo.
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP
                                                                               //acá abajo le pasamos los parámetros al SP. En @ van los nombres de los parámetros en SP y a la par los valores. No pasamos el Id porque es autoincremental en la tabla, entonces no lo necesitamos:
                command.Parameters.AddWithValue("@Title", consult.Title);
                command.Parameters.AddWithValue("@IdAuthor", consult.IdAuthor);
                command.Parameters.AddWithValue("@Description", consult.Description);
                command.Parameters.AddWithValue("@idCourse", consult.IdCourse);
                command.Parameters.AddWithValue("@Type", consult.Type);
                resultToReturn = command.ExecuteNonQuery(); //esta es la sentencia que ejecuta la inserción en BD y saca un 1 o un 0 dependiendo de si se modificó la tupla o no. Es decir, si se insertó en BD o no.
                connection.Close(); //cerramos conexión.
            }
            return resultToReturn; //retornamos resultado al Controller.
        }
    }
}
