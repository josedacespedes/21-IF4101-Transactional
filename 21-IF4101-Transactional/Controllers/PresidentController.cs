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
    public class PresidentController : Controller
    {
        private readonly ILogger<PresidentController> _logger;
        private readonly IConfiguration _configuration;

        public PresidentController(ILogger<PresidentController> logger, IConfiguration configuration)
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

        PresidentDAO presidentDAO;

        public IActionResult Insert([FromBody] President president)
        {
            //llamada al modelo para insertar el estudiante aplicante
            presidentDAO = new PresidentDAO(_configuration);
            return Ok(presidentDAO.Insert(president));
        }

        public IActionResult Get()
        {
            //llamada al modelo para obtener los estudiantes aplicantes
            presidentDAO = new PresidentDAO(_configuration);
            return Ok(presidentDAO.Get());
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}
