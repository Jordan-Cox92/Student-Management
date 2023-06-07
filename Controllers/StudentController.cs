using Student_Management.Models;
using Student_Management.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Numerics;

namespace Student_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentRepository _studentRepository;
        public StudentController(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        [HttpGet]
        public IActionResult GetAllStudents()
        {
            var students = _studentRepository.GetAllStudents();
            { return Ok(students); }
        }


        [HttpPost]
        public IActionResult Create(Student student)
        {
            try
            {
                if (!_studentRepository.CheckIfExists(student.Name))
                {
                    _studentRepository.AddStudent(student);
                    return Ok(student);

                }
                return Conflict("This student already exists");

            }
            catch (Exception ex)
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }

        }

        [HttpGet("student/{id}")]
        public IActionResult GetStudent(int id)
        {
            var student = _studentRepository.GetStudentById(id);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);

        }

        [HttpDelete("student/delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _studentRepository.DeleteStudent(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return Conflict("This did not work");
            }
        }

        [HttpPut("student/Edit/{id}")]
        public IActionResult Edit(Student student)
        {

            _studentRepository.EditStudent(student);

            return Ok(student);


        }

    }
}
