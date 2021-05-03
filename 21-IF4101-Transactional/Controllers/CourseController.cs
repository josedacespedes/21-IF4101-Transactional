using _21_IF4101_Transactional.Models;
using _21_IF4101_Transactional.Models.Data;
using _21_IF4101_Transactional.Models.Domain;
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
    public class CourseController : Controller
    {
        private readonly ILogger<CourseController> _logger;
        private readonly IConfiguration _configuration;
        CourseDAO courseDAO;

        public CourseController(ILogger<CourseController> logger)
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


        public IActionResult Insert([FromBody] Course course)
        {
            //llamada al modelo para insertar el estudiante 
            courseDAO = new CourseDAO(_configuration);
            List<string> codes = new List<string>();
            codes = courseDAO.GetCodes();

            if (codes.Contains(course.Code.ToString()))
            {
                return Error();
            }
            else 
            {

                int resultToReturn = courseDAO.Insert(course); //acá guardamos un 1 o un 0, dependiendo de si se insertó el estudiante o no
                return Ok(resultToReturn); //retornamos el 1 o el 0 a la vista
            }
        }

        public IActionResult Get()
        {
            //llamada al modelo para obtener los estudiantes
            courseDAO = new CourseDAO(_configuration);
            return Ok(courseDAO.Get());
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
