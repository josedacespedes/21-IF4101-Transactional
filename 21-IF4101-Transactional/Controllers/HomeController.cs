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
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        StudentDAO studentDAO;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
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
            //llamada al modelo para insertar el estudiante (ahora pasándole parámetro al constructor): 
            studentDAO = new StudentDAO(_configuration);
            int existToReturn = studentDAO.VerifyStudentID(student.StudentID);

            if (existToReturn == 1)
            {
                return Ok(2);
            }
            else if (existToReturn == 0)
            {
                int resultToReturn = studentDAO.Insert(student); //acá guardamos un 1 o un 0, dependiendo de si se insertó el estudiante o no
                return Ok(resultToReturn); //retornamos el 1 o el 0 a la vista
            }
            else
            {
                return Ok(existToReturn);
            }

        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
