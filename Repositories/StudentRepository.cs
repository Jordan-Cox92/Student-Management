using System.Collections.Generic;
using System.Numerics;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

using Student_Management.Models;

using Student_Management.Utils;

namespace Student_Management.Repositories
{
    public class StudentRepository : BaseRepository, IStudentRepository

    {
        public StudentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Student> GetAllStudents()
        {
            var students = new List<Student>();
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, Age, Email, SchoolName
                                    From Student ORDER BY Name;";

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        students.Add(new Student
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            Age = DbUtils.GetInt(reader, "age"),
                            Email = DbUtils.GetString(reader, "email"),
                            SchoolName = DbUtils.GetString(reader, "schoolName"),



                        });
                    }
                    reader.Close();
                    return students;
                }
            }
        }


        public bool CheckIfExists(string name)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Name FROM Student WHERE Name= @name";

                    cmd.Parameters.AddWithValue("name", name);

                    var reader = cmd.ExecuteReader();
                    return reader.HasRows;

                }
            }
        }

        public void AddStudent(Student student)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Student (Name, Age, Email, SchoolName )
                    OUTPUT INSERTED.Id
                    Values(@name, @age, @email, @schoolName)";

                    cmd.Parameters.AddWithValue("name", student.Name);
                    cmd.Parameters.AddWithValue("age", student.Age);
                    cmd.Parameters.AddWithValue("email", student.Email);
                    cmd.Parameters.AddWithValue("schoolName", student.SchoolName);






                    student.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public Student GetStudentById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT s.id, s.name, s.age, s.email, s.schoolName
                                        FROM Student s
                                        WHERE id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    Student student = null;

                    if (reader.Read())
                    {
                        student = (new Student()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Name = DbUtils.GetString(reader, "name"),
                            Age = DbUtils.GetInt(reader, "age"),
                            Email = DbUtils.GetString(reader, "email"),
                            SchoolName = DbUtils.GetString(reader, "schoolName"),

                        });
                    }
                    reader.Close();
                    return student;
                }
            }
        }

        public void DeleteStudent(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM Student
                    WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();

                }
            }
        }

        public void EditStudent(Student student)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Student 
                                        SET 
                                        [Name] = @name,
                                        [Age] = @age,
                                        [Email] = @email,
                                        [SchoolName] = @schoolName
                                        
                                        
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", student.Id);
                    cmd.Parameters.AddWithValue("@name", student.Name);
                    cmd.Parameters.AddWithValue("@age", student.Age);
                    cmd.Parameters.AddWithValue("@email", student.Email);
                    cmd.Parameters.AddWithValue("@schoolName", student.SchoolName);

                    cmd.ExecuteNonQuery();
                }
            }
        }




    }
};





