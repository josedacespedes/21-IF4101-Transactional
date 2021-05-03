using _21_IF4101_Transactional.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Controllers
{
    public class StudentController : Controller
    {
        //private readonly ILogger<StudentController> _logger;
        private readonly IConfiguration _configuration;
        StudentDAO studentDAO;

        public IActionResult Insert([FromBody] Student student)
        {
            //llamada al modelo para insertar el estudiante           
                int resultToReturn = studentDAO.Insert(student); 
                return Ok(resultToReturn);        
        }

        public IActionResult Get()
        {
            //llamada al modelo para obtener los estudiantes
            studentDAO = new StudentDAO(_configuration);
            return Ok(studentDAO.Get());
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
