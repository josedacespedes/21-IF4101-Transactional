using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Models
{

    public class StudentDAO
    {
        private readonly IConfiguration _configuration;
        string connectionString;

        public StudentDAO(IConfiguration configuration)
        {
            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");
            //esta es la llamada al string de conexión con la base de datos definido en el punto 3.
        }

        public StudentDAO()
        {

        }

        public int Insert(Student student)
        {
            int resultToReturn; //declaramos variable que guardará un 1 o un 0 de acuerdo a si se insertó o no el student

            SqlConnection connection = null;
            try
            {
                using (connection = new SqlConnection(connectionString))
                {
                    connection.Open(); //abrimos conexión
                    SqlCommand command = new SqlCommand("InsertStudent", connection);
                    
                    command.CommandType = System.Data.CommandType.StoredProcedure; 

                    command.Parameters.AddWithValue("@Name", student.Name);
                    command.Parameters.AddWithValue("@Lastname", student.Lastname);
                    command.Parameters.AddWithValue("@StudentID", student.StudentID);
                    command.Parameters.AddWithValue("@Email", student.Email);
                    command.Parameters.AddWithValue("@Password", student.Password);

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

        public int VerifyStudentID(string studentID)
        {
            SqlConnection connection = null;
            try
            {
                using (connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("VerifyStudentID", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@StudentID", studentID);

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
