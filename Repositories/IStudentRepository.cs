using Student_Management.Models;
using System.Collections.Generic;

namespace Student_Management.Repositories
{
    public interface IStudentRepository
    {
        void AddStudent(Student student);
        bool CheckIfExists(string name);
        void DeleteStudent(int id);
        void EditStudent(Student student);
        List<Student> GetAllStudents();
        Student GetStudentById(int id);
    }
}