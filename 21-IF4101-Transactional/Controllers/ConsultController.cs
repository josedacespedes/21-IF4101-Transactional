using _21_IF4101_Transactional.Models.Data;
using _21_IF4101_Transactional.Models.Domain;
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

        ConsultDAO consultDAO;

        public IActionResult Insert([FromBody] Consult consult)
        {
            //llamada al modelo para insertar el estudiante aplicante
            consultDAO = new ConsultDAO(_configuration);
           
                int resultToReturn = consultDAO.Insert(consult);
                return Ok(resultToReturn); //retornamos el 1 o el 0 a la vista
            
        }
    }
}
