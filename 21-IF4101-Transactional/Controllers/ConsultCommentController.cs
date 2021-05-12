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
    public class ConsultCommentController : Controller
    {
        private readonly ILogger<ConsultCommentController> _logger;
        private readonly IConfiguration _configuration;
        ConsultCommentDAO consultCommentDAO;
        //  int idUser = HttpContext.Session.GetInt32("sId");

        public ConsultCommentController(ILogger<ConsultCommentController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Insert([FromBody] ConsultComment consultComment)
        {
            //llamada al modelo para insertar el estudiante aplicante
            consultCommentDAO = new ConsultCommentDAO(_configuration);

            int resultToReturn = consultCommentDAO.Insert(consultComment);
            return Ok(resultToReturn); //retornamos el 1 o el 0 a la vista

        }


    }
}
