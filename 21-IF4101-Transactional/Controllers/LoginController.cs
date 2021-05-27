using _21_IF4101_Transactional.Models;
using _21_IF4101_Transactional.Models.Data;
using _21_IF4101_Transactional.Models.Domain;
using Microsoft.AspNetCore.Http;
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
    public class LoginController : Controller
    {
        private readonly ILogger<LoginController> _logger;
        private readonly IConfiguration _configuration;
        LoginDAO loginDAO;

        public LoginController(ILogger<LoginController> logger, IConfiguration configuration)
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

        [HttpPost]
        public void SaveSessionVariable(String email)
        {
            HttpContext.Session.SetString("sEmail", email);
            HttpContext.Session.SetString("sNombre", loginDAO.GetNameUserByEmail(email)); //(AGREGAR ACA NOMBRE COMPLETO DE PERSONA)
            HttpContext.Session.SetInt32("sId", loginDAO.GetIdUserByEmail(email));

            //var a = HttpContext.Session.GetString("nombreVariable"); //ASI SE OBTIENE
        }

        public IActionResult Login([FromBody] Login login)
        {
            loginDAO = new LoginDAO(_configuration);
            if (login.Email.Equals("admin@ucr.ac.cr") && login.Password.Equals("Admin12."))
            {
                SaveSessionVariable(login.Email);
                return Ok(1);
            }
            else if (loginDAO.CheckPasswordEmail(login.Email, login.Password) != 0)
            {
                SaveSessionVariable(login.Email);

                //success
                return Ok(loginDAO.CheckPasswordEmail(login.Email, login.Password));
                //int resultToReturn = loginDAO.Insert(student); //acá guardamos un 1 o un 0, dependiendo de si se insertó el estudiante o no
                //return Ok(resultToReturn); //retornamos el 1 o el 0 a la vista

            }
            else
            {
                return Ok(0); //Error (contraseña o correo invalido)
            }

        }

        public IActionResult GetName()
        {
            return Json(new { name = HttpContext.Session.GetString("sNombre"), date = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss.fff") });
        }

        public IActionResult Delete()
        {
            var email = HttpContext.Session.GetString("sEmail"); //ASI SE OBTIENE
            //llamada al modelo para eliminar el estudiante
            loginDAO = new LoginDAO(_configuration);
            return Ok(loginDAO.Delete(email));
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}


