using _21_IF4101_Transactional.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.IO;
using System.Net.Http.Headers;

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
            return Json(new { data = studentDAO.Get() });
        }


        public IActionResult GetProfile()
        {
            string email = HttpContext.Session.GetString("sEmail");
            //llamada al modelo para obtener el perfil de estudiante
            studentDAO = new StudentDAO(_configuration);
            return Ok(studentDAO.GetProfile(email));
        }

        public IActionResult UpdateProfile([FromBody] Student student)
        {
            //llamada al modelo para actualizar al perfil
            studentDAO = new StudentDAO(_configuration);
            return Ok(studentDAO.UpdateProfile(student));
        }

        public IActionResult GetSessionVariables() //Obtener variables de sesion
        {
            string sNombre = HttpContext.Session.GetString("sNombre");
            return Ok(sNombre);
        }


        [HttpPost]
        public IActionResult SaveImageProfile(IFormFile files)
        {
            //Set Key Name
            string ImageName = ContentDispositionHeaderValue.Parse(files.ContentDisposition).FileName.Trim('"');

            //Get url To Save
            string SavePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", ImageName);

            using (var stream = new FileStream(SavePath, FileMode.Create))
            {
                files.CopyTo(stream);
            }

            return Ok();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
