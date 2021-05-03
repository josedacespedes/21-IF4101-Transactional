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
            //esta es la llamada al string de conexión con la base de datos definido en el punto 3.
        }

        public int Insert(Applicant applicant)
        {
            int resultToReturn; //declaramos variable que guardará un 1 o un 0 de acuerdo a si se insertó o no el student

            SqlConnection connection = null;
            try
            {
                using (connection = new SqlConnection(connectionString))
                {
                    connection.Open(); //abrimos conexión
                    SqlCommand command = new SqlCommand("InsertApplicant", connection);

                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@FirstName", applicant.FirstName);
                    command.Parameters.AddWithValue("@LastName", applicant.LastName);
                    command.Parameters.AddWithValue("@ApplicantId", applicant.ApplicantId);
                    command.Parameters.AddWithValue("@Email", applicant.Email);
                    command.Parameters.AddWithValue("@Password", applicant.Password);

                    resultToReturn = command.ExecuteNonQuery(); //esta es la sentencia que ejecuta la inserción en BD y saca un 1 o un 0 dependiendo de si se modificó la tupla o no.Es decir, si se insertó en BD o no. 
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

            //usaremos using para englobar todo lo que tiene que ver con una misma cosa u objeto. En este caso, todo lo envuelto acá tiene que ver con connection, la cual sacamos con la clase SqlConnection y con el string de conexión que tenemos en nuestro appsetting.json
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("SelectApplicant", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo. 
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP

                //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD
                while (sqlDataReader.Read())
                {
                    applicants.Add(new Applicant
                    {
                        Id = Convert.ToInt32(sqlDataReader["Id"]),
                        FirstName = sqlDataReader["FirstName"].ToString(),
                        LastName = sqlDataReader["LastName"].ToString(),
                        ApplicantId = sqlDataReader["ApplicantId"].ToString(),
                        Email = sqlDataReader["Email"].ToString(),
                        Password = sqlDataReader["Password"].ToString(),
                        State = Convert.ToInt32(sqlDataReader["State"])
                    });

                }

                connection.Close(); //cerramos conexión. 
            }


            return applicants; //retornamos resultado al Controller.  

        }

        public int VerifyApplicantID(string applicantId)
        {
            SqlConnection connection = null;
            try
            {
                using (connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("VerifyApplicantID", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@ApplicantId", applicantId);

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
