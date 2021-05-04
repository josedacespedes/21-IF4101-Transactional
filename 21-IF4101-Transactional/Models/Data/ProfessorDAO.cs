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

    public class ProfessorDAO
    {
        private readonly IConfiguration _configuration;
        string connectionString;

        public ProfessorDAO(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public ProfessorDAO()
        {
        }

        public int Insert(Professor professor)
        {
            int resultToReturn; //declaramos variable que guardará un 1 o un 0 de acuerdo a si se insertó o no el student

            SqlConnection connection = null;
            try
            {
                using (connection = new SqlConnection(connectionString))
                {
                    connection.Open(); //abrimos conexión
                    SqlCommand command = new SqlCommand("InsertProfessor", connection);

                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@FirstNameProfessor", professor.FirstNameProfessor);
                    command.Parameters.AddWithValue("@LastNameProfessor", professor.LastNameProfessor);
                    command.Parameters.AddWithValue("@IdProfessor", professor.IdProfessor);
                    command.Parameters.AddWithValue("@EmaiLProfessor", professor.EmailProfessor);
                    command.Parameters.AddWithValue("@PasswordProfessor", professor.PasswordProfessor);

                    resultToReturn = command.ExecuteNonQuery();
                    connection.Close(); //cerramos conexión. 
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


        public int VerifyProfessorId(string idProfessor)
        {
            SqlConnection connection = null;
            try
            {
                using (connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("VerifyProfessorId", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@IdProfessor", idProfessor);

                    var returnParameter = command.Parameters.Add("@Exists", SqlDbType.Int);
                    returnParameter.Direction = ParameterDirection.ReturnValue;
                    command.ExecuteNonQuery();

                    int result = (int)returnParameter.Value;
                    connection.Close();

                    return result;
                }
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
