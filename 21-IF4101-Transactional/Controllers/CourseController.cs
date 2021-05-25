using _21_IF4101_Transactional.Models;
using _21_IF4101_Transactional.Models.Data;
using _21_IF4101_Transactional.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Diagnostics;

namespace _21_IF4101_Transactional.Controllers
{
    public class CourseController : Controller
    {
        private readonly ILogger<CourseController> _logger;
        private readonly IConfiguration _configuration;
        CourseDAO courseDAO;

        public CourseController(ILogger<CourseController> logger, IConfiguration configuration)
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


        public IActionResult Insert([FromBody] Course course)
        {
            //llamada al modelo para insertar el estudiante 
            courseDAO = new CourseDAO(_configuration);
            List<string> codes = new List<string>();
            codes = courseDAO.GetCodes();

            if (codes.Contains(course.Code.ToString()))
            {
                return Ok(3);
            }
            else
            {
                int resultToReturn = courseDAO.Insert(course); //acá guardamos un 1 o un 0, dependiendo de si se insertó el estudiante o no
                return Ok(resultToReturn); //retornamos el 1 o el 0 a la vista
            }
        }

        public IActionResult Get()
        {
            //call model to get the courses
            courseDAO = new CourseDAO(_configuration);
            return Json(new { data = courseDAO.Get() });
        }

        public IActionResult Update([FromBody] Course course)
        {
            //llamada al modelo para actualizar al curso
            courseDAO = new CourseDAO(_configuration);
            return Ok(courseDAO.Update(course));
        }

        public IActionResult InsertGroup([FromBody] Course course) //Recibe id curso y lista de grupos
        {
            //llamada al modelo para actualizar al curso
            courseDAO = new CourseDAO(_configuration);
            return Ok(courseDAO.InsertGroup(course));
        }

        public IActionResult GetGroupByIdCourse(int id)
        {
            //call model to get the courses
            courseDAO = new CourseDAO(_configuration);
            return Json(new { data = courseDAO.GetGroupByIdCourse(id) });
        }

        public IActionResult GetNumGroupsById(int id)
        {
            //call model to get the courses
            courseDAO = new CourseDAO(_configuration);
            return Json(courseDAO.GetNumGroupsById(id));
        }
        public IActionResult Delete(int id)
        {
            //call model to get the courses
            courseDAO = new CourseDAO(_configuration);
            return Json(new { data = courseDAO.Delete(id) });
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
