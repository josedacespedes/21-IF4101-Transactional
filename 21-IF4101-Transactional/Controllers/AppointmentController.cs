using _21_IF4101_Transactional.Models.Data;
using _21_IF4101_Transactional.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace _21_IF4101_Transactional.Controllers
{
    public class AppointmentController : Controller
    {
        private readonly ILogger<AppointmentController> _logger;
        private readonly IConfiguration _configuration;
        AppointmentDAO appointmentDAO;
        ProfessorDAO professorDAO;

        public AppointmentController(ILogger<AppointmentController> logger, IConfiguration configuration)
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

        public IActionResult InsertRequest([FromBody] Appointment appointment)
        {
            appointmentDAO = new AppointmentDAO(_configuration);
            var StudentId = appointmentDAO.GetStudentId(HttpContext.Session.GetString("sEmail"));
            int resultToReturn = appointmentDAO.InsertRequest(appointment, HttpContext.Session.GetString("sNombre"), StudentId);
            return Ok(resultToReturn); //retornamos el 1 o el 0 a la vista
        }

        public IActionResult Get()
        {
            //call model to get the appointments
            appointmentDAO = new AppointmentDAO(_configuration);
            return Json(new { data = appointmentDAO.Get(HttpContext.Session.GetString("sNombre")) });
        }

        public IActionResult GetDates(string ProfessorName)
        {
            //call model to get the appointments
            appointmentDAO = new AppointmentDAO(_configuration);
            return Json(appointmentDAO.GetDates(ProfessorName));
        }

        public IActionResult GetProfessors()
        {
            //llamada al modelo para obtener los profesores
            professorDAO = new ProfessorDAO(_configuration);
            return Json(professorDAO.Get());
        }

        public IActionResult Delete(int id)
        {
            //llamada al modelo para eliminar el estudiante
            appointmentDAO = new AppointmentDAO(_configuration);
            return Ok(appointmentDAO.Delete(id));
        }

        public IActionResult GetRequest()
        {
            //call model to get the appointments
            appointmentDAO = new AppointmentDAO(_configuration);
            return Json(new { data = appointmentDAO.GetRequest(HttpContext.Session.GetString("sNombre")) });
        }

        public IActionResult Insert([FromBody] Appointment appointment)
        {
            appointmentDAO = new AppointmentDAO(_configuration);
            return Ok(appointmentDAO.Insert(appointment));
        }

        public IActionResult GetEmailStudent(string studentId)
        {
            appointmentDAO = new AppointmentDAO(_configuration);
            return Ok(appointmentDAO.GetEmailStudent(studentId));
        }

        public IActionResult GetInformation(string professorname)
        {
            appointmentDAO = new AppointmentDAO(_configuration);
            return Json(new { emailProfessor = appointmentDAO.GetInformation(professorname), name = HttpContext.Session.GetString("sNombre") });
        }

    }
}
