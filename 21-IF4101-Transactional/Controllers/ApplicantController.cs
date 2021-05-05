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
    public class ApplicantController : Controller
    {
        private readonly ILogger<ApplicantController> _logger;
        private readonly IConfiguration _configuration;

        public ApplicantController(ILogger<ApplicantController> logger, IConfiguration configuration)
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


        ApplicantDAO applicantDAO;

        public IActionResult Insert([FromBody] Applicant applicant)
        {
            //llamada al modelo para insertar el estudiante aplicante
            applicantDAO = new ApplicantDAO(_configuration);
            int existToReturn = applicantDAO.VerifyApplicantID(applicant.StudentIdApplicant);

            if (existToReturn == 1)
            {
                return Ok(-1);
            }
            else
            {
                int resultToReturn = applicantDAO.Insert(applicant); //acá guardamos un 1 o un 0, dependiendo de si se insertó el aplicante o no
                return Ok(resultToReturn); //retornamos el 1 o el 0 a la vista
            }

        }

        public IActionResult InsertStudent([FromBody] Applicant applicant)
        {
            //llamada al modelo para insertar el estudiante aplicante
            applicantDAO = new ApplicantDAO(_configuration);
            int resultToReturn = applicantDAO.InsertStudent(applicant); //acá guardamos un 1 o un 0, dependiendo de si se insertó el aplicante o no
            return Ok(resultToReturn); //retornamos el 1 o el 0 a la vista
        }

        public IActionResult Get()
        {
            //llamada al modelo para obtener los estudiantes aplicantes
            applicantDAO = new ApplicantDAO(_configuration);
            return Json(new { data = applicantDAO.Get() });
        }

        public IActionResult Delete(int Id)
        {
            //llamada al modelo para eliminar el estudiante
            applicantDAO = new ApplicantDAO(_configuration);
            return Ok(applicantDAO.Delete(Id));
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}
