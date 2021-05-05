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
    public class ApplicantDAO
    {

        private readonly IConfiguration _configuration;
        string connectionString;

        public ApplicantDAO(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public int Insert(Applicant applicant)
        {
            int resultToReturn; //declaramos variable que guardará un 1 o un 0 de acuerdo a si se insertó o no el applicant

            SqlConnection connection = null;
            try
            {
                using (connection = new SqlConnection(connectionString))
                {
                    connection.Open(); //abrimos conexión
                    SqlCommand command = new SqlCommand("InsertApplicant", connection);

                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@FirstNameApplicant", applicant.FirstNameApplicant);
                    command.Parameters.AddWithValue("@LastNameApplicant", applicant.LastNameApplicant);
                    command.Parameters.AddWithValue("@StudentIdApplicant", applicant.StudentIdApplicant);
                    command.Parameters.AddWithValue("@EmailApplicant", applicant.EmailApplicant);
                    command.Parameters.AddWithValue("@PasswordApplicant", applicant.PasswordApplicant);

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

        internal int InsertStudent(Applicant applicant)
        {
            int resultToReturn; //declaramos variable que guardará un 1 o un 0 de acuerdo a si se insertó o no el applicant

            SqlConnection connection = null;
            try
            {
                using (connection = new SqlConnection(connectionString))
                {
                    connection.Open(); //abrimos conexión
                    SqlCommand command = new SqlCommand("InsertStudent", connection);

                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@FirstNameApplicant", applicant.FirstNameApplicant);
                    command.Parameters.AddWithValue("@LastNameApplicant", applicant.LastNameApplicant);
                    command.Parameters.AddWithValue("@StudentIdApplicant", applicant.StudentIdApplicant);
                    command.Parameters.AddWithValue("@EmailApplicant", applicant.EmailApplicant);
                    command.Parameters.AddWithValue("@PasswordApplicant", applicant.PasswordApplicant);

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

        public List<Applicant> Get()
        {

            List<Applicant> applicants = new List<Applicant>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("SelectApplicant", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP

                //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD
                while (sqlDataReader.Read())
                {
                    applicants.Add(new Applicant
                    {
                        Id = Convert.ToInt32(sqlDataReader["Id"]),
                        FirstNameApplicant = sqlDataReader["FirstNameApplicant"].ToString(),
                        LastNameApplicant = sqlDataReader["LastNameApplicant"].ToString(),
                        StudentIdApplicant = sqlDataReader["StudentIdApplicant"].ToString(),
                        EmailApplicant = sqlDataReader["EmailApplicant"].ToString(),
                        PasswordApplicant = sqlDataReader["PasswordApplicant"].ToString()
                    });

                }

                connection.Close(); //cerramos conexión. 
            }


            return applicants; //retornamos resultado al Controller.  

        }

        public int VerifyApplicantID(string studentIdApplicant)
        {
            SqlConnection connection = null;
            try
            {
                using (connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("VerifyApplicantID", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@StudentIdApplicant", studentIdApplicant);

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

        public int Delete(int Id)
        {
            int resultToReturn; //declaramos variable que guardará un 1 o un 0 de acuerdo a si se eliminó o no el APPLICANT

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("DeleteApplicant", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Id", Id);
                resultToReturn = command.ExecuteNonQuery();
                connection.Close(); //cerramos conexión. 
            }

            return resultToReturn; //retornamos resultado al Controller.  


        }


    }
}
