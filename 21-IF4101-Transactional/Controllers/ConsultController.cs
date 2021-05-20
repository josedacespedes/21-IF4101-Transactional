using _21_IF4101_Transactional.Models.Data;
using _21_IF4101_Transactional.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Controllers
{
    public class ConsultController : Controller
    {
        private readonly ILogger<ConsultController> _logger;
        private readonly IConfiguration _configuration;
        ConsultDAO consultDAO;
        CourseDAO courseDAO;
      //  int idUser = HttpContext.Session.GetInt32("sId");

        public ConsultController(ILogger<ConsultController> logger, IConfiguration configuration)
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

        

        public IActionResult Insert([FromBody] Consult consult)
        {
            //llamada al modelo para insertar el estudiante aplicante
            consultDAO = new ConsultDAO(_configuration);
           
                int resultToReturn = consultDAO.Insert(consult, HttpContext.Session.GetString("sNombre"));
                return Ok(resultToReturn); //retornamos el 1 o el 0 a la vista
            
        }

        //lista de cursos completa
        public IActionResult GetCourses()
        {
            //llamada al modelo para obtener las carreras
            courseDAO = new CourseDAO(_configuration);
            List<Course> courses = new List<Course>();
            courses = courseDAO.GetToConsult();
            return Json(courses);
        }


        public IActionResult Get()
        {
            
            //call model to get the courses
            consultDAO = new ConsultDAO(_configuration);
            return Json(new { data = consultDAO.Get(HttpContext.Session.GetString("sEmail")) });
            
        }

        public IActionResult GetById(int id)
        {

            //llamada al modelo para obtener el estudiante
            consultDAO = new ConsultDAO(_configuration);
            return Ok(consultDAO.Get(id));

        }
    }
}
