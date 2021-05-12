using _21_IF4101_Transactional.Models;
using Microsoft.AspNetCore.Http;
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
        private readonly ILogger<StudentController> _logger;
        private readonly IConfiguration _configuration;
        StudentDAO studentDAO;

        public StudentController(ILogger<StudentController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }


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


        public IActionResult GetProfile(string email)
        {
            //llamada al modelo para obtener el perfil de estudiante
            studentDAO = new StudentDAO(_configuration);
            return Ok(studentDAO.GetProfile(email));
        }

        public IActionResult GetSessionVariables() //Obtener variables de sesion
        {
            List<string> Sessionvaribles = new List<string>();
            var sEmail = HttpContext.Session.GetString("sEmail");
            Sessionvaribles.Add(sEmail);
            return Ok(Sessionvaribles);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
