using _21_IF4101_Transactional.Models;
using _21_IF4101_Transactional.Models.Data;
using _21_IF4101_Transactional.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace _21_IF4101_Transactional.Controllers
{
    public class ApplicantController : Controller
    {
        //private readonly ILogger<StudentController> _logger;
        private readonly IConfiguration _configuration;
        ApplicantDAO applicantDAO;

        public IActionResult Insert([FromBody] Applicant applicant)
        {
            //llamada al modelo para insertar el estudiante aplicante
            applicantDAO = new ApplicantDAO(_configuration);
            int existToReturn = applicantDAO.VerifyApplicantID(applicant.ApplicantId);

            if (existToReturn == 1)
            {
                return Ok(2);
            }
            else if (existToReturn == 0)
            {
                int resultToReturn = applicantDAO.Insert(applicant); //acá guardamos un 1 o un 0, dependiendo de si se insertó el aplicante o no
                return Ok(resultToReturn); //retornamos el 1 o el 0 a la vista
            }
            else
            {
                return Ok(existToReturn);
            }

        }

        public IActionResult Get()
        {
            //llamada al modelo para obtener los estudiantes aplicantes
            applicantDAO = new ApplicantDAO(_configuration);
            return Ok(applicantDAO.Get());

        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}
