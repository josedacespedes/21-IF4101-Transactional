using _21_IF4101_Transactional.Models.Domain;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models.Data
{
    public class PresidentDAO
    {

        private readonly IConfiguration _configuration;
        string connectionString;

        public PresidentDAO(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public int Insert(President president)
        {
            int resultToReturn;

            SqlConnection connection = null;
            try
            {
                using (connection = new SqlConnection(connectionString))
                {
                    connection.Open(); //abrimos conexión
                    SqlCommand command = new SqlCommand("InsertPresident", connection);

                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@id", president.Id);

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

        public int Get()
        {
            int idPresident = 0;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("SelectPresident", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;

                SqlDataReader sqlDataReader = command.ExecuteReader();
                if (sqlDataReader.Read())
                {
                    idPresident = Convert.ToInt32(sqlDataReader["idStudent"]);
                }

                connection.Close();
            }

            return idPresident;
        }

    }
}
