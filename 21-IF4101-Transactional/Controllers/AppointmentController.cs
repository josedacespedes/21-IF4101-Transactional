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



        public IActionResult Insert([FromBody] Appointment appointment)
        {
            appointmentDAO = new AppointmentDAO(_configuration);
            int resultToReturn = appointmentDAO.Insert(appointment, HttpContext.Session.GetString("sNombre"));
            return Ok(resultToReturn); //retornamos el 1 o el 0 a la vista
        }

        public IActionResult Get()
        {
            //call model to get the appointments
            appointmentDAO = new AppointmentDAO(_configuration);
            return Json(new { data = appointmentDAO.Get(HttpContext.Session.GetString("sId")) });
        }

        public IActionResult GetProfessors()
        {
            //llamada al modelo para obtener los profesores
            professorDAO = new ProfessorDAO(_configuration);
            return Json(professorDAO.Get());
        }

    }
}
