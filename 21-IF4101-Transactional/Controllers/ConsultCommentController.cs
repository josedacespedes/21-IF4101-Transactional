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

            int resultToReturn = consultCommentDAO.Insert(consultComment, HttpContext.Session.GetString("sNombre"));
            return Ok(resultToReturn); //retornamos el 1 o el 0 a la vista

        }

        public IActionResult GetComments(int idConsult)
        {
            //llamada al modelo para obtener las carreras
            consultCommentDAO = new ConsultCommentDAO(_configuration);
            //List<ConsultComment> comments = new List<ConsultComment>();
            //comments = consultCommentDAO.GetComments(idConsult);
            return Json(new { data = consultCommentDAO.GetComments(idConsult) });
        }


    }
}
