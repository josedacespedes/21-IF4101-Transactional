using _21_IF4101_Transactional.Models;
using _21_IF4101_Transactional.Models.Data;
using _21_IF4101_Transactional.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.IO;
using System.Net.Http.Headers;

namespace _21_IF4101_Transactional.Controllers
{
    public class ProfessorController : Controller
    {
        private readonly ILogger<ProfessorController> _logger;
        private readonly IConfiguration _configuration;
        ProfessorDAO professorDAO;

        public ProfessorController(ILogger<ProfessorController> logger, IConfiguration configuration)
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


        public IActionResult Insert([FromBody] Professor professor)
        {
            //llamada al modelo para insertar el profesor
            professorDAO = new ProfessorDAO(_configuration);
            int existToReturn = professorDAO.VerifyProfessorId(professor.IdProfessor);
            int existToReturnEmail = professorDAO.VerifyEmailApplicant(professor.EmailProfessor);
            if (existToReturn == 1)
            {
                return Ok(-1);
            }
            else if (existToReturnEmail == 1)
            {
                return Ok(-2);
            }
            else
            {
                int resultToReturn = professorDAO.Insert(professor); //acá guardamos un 1 o un 0, dependiendo de si se insertó el profesor o no
                return Ok(resultToReturn); //retornamos el 1 o el 0 a la vista
            }

        }

        public IActionResult Get()
        {
            //llamada al modelo para obtener los profesores
            professorDAO = new ProfessorDAO(_configuration);
            return Json(new { data = professorDAO.Get() });
        }

        public IActionResult GetProfile()
        {
            string email = HttpContext.Session.GetString("sEmail");
            //llamada al modelo para obtener el perfil de estudiante
            professorDAO = new ProfessorDAO(_configuration);
            return Ok(professorDAO.GetProfile(email));
        }

        public IActionResult UpdateProfile([FromBody] Professor professor)
        {
            //llamada al modelo para actualizar al perfil
            professorDAO = new ProfessorDAO(_configuration);
            return Ok(professorDAO.UpdateProfile(professor));
        }

        public IActionResult InsertProfessorGroup(int idGroup, int idProfessor, string consultationHours)
        {
            //llamada al modelo para agregar al profesor-grupo
            professorDAO = new ProfessorDAO(_configuration);
            return Ok(professorDAO.InsertProfessorGroup(idGroup, idProfessor, consultationHours));
        }

        public IActionResult GetWeekDays()
        {
            //llamada al modelo para obtener dias de semana
            professorDAO = new ProfessorDAO(_configuration);
            return Ok(professorDAO.GetWeekDays());
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

        public IActionResult GetConsultTime(int idGroup, int idProfessor)
        {
            //llamada al modelo para obtener horarios de consulta
            professorDAO = new ProfessorDAO(_configuration);
            return Ok(professorDAO.GetConsultTime(idGroup, idProfessor));
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}
