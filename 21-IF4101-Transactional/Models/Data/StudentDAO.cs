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

                    command.Parameters.AddWithValue("@FirstName", student.FirstName);
                    command.Parameters.AddWithValue("@LastName", student.LastName);
                    command.Parameters.AddWithValue("@StudentId", student.StudentId);
                    command.Parameters.AddWithValue("@Email", student.Email);
                    command.Parameters.AddWithValue("@Password", student.Password);

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


        public List<Student> Get()
        {

            List<Student> students = new List<Student>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("SelectStudent", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;

                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD
                while (sqlDataReader.Read())
                {
                    students.Add(new Student
                    {
                        Id = Convert.ToInt32(sqlDataReader["Id"]),
                        FirstName = sqlDataReader["FirstName"].ToString(),
                        LastName = sqlDataReader["LastName"].ToString(),
                        StudentId = sqlDataReader["StudentId"].ToString(),
                        Email = sqlDataReader["Email"].ToString()
                    });

                }

                connection.Close();
            }


            return students;

        }

        public Student GetProfile(string email)
        {
            SqlConnection connection = null;
            Student student = null;
            try
            {
                using (connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("SelectStudentPerfilByEmail", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Email", email);

                    SqlDataReader sqlDataReader = command.ExecuteReader();
                    student = new Student();
                    if (sqlDataReader.Read())
                    {
                        student.Id = Convert.ToInt32(sqlDataReader["Id"]);
                        student.FirstName = sqlDataReader["FirstName"].ToString();
                        student.LastName = sqlDataReader["LastName"].ToString();
                        student.StudentId = sqlDataReader["StudentId"].ToString();
                        student.Email = sqlDataReader["Email"].ToString();
                        student.Image = sqlDataReader["Image"].ToString();
                        student.Likes = sqlDataReader["Likes"].ToString();
                    }
                    connection.Close();
                }
                return student;
            }
            catch (SqlException)
            {
                return null;
            }
            finally
            {
                if (connection != null)
                    connection.Close();
            }

        }



        public int UpdateProfile(Student student)
        {
            int resultToReturn;
            SqlConnection connection = null;
            try
            {
                using (connection = new SqlConnection(connectionString))
                {
                    connection.Open(); //abrimos conexión
                    SqlCommand command = new SqlCommand("UpdateStudentPerfilByEmail", connection);

                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Email", student.Email);
                    command.Parameters.AddWithValue("@Image", student.Image);
                    command.Parameters.AddWithValue("@Likes", student.Likes);

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

    }
}
