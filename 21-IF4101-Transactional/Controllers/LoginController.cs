using _21_IF4101_Transactional.Models;
using _21_IF4101_Transactional.Models.Data;
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

        public LoginController(ILogger<LoginController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Login(string Email, string Password)
        {
            loginDAO = new LoginDAO(_configuration);
            List<String> mails = new List<String>();
            List<String> pass = new List<String>();
            mails = loginDAO.GetMails();
            pass = loginDAO.GetPaswords();
            string name = "";
            if (mails.Contains(Email))
            {
                if (pass.Contains(Password))
                {
                    //string nameE = loginDAO.GetNameEmail(Email);
                    //string nameP = loginDAO.GetNamePassword(Password);
                    name += loginDAO.CheckPasswordEmail(Email, Password);
                    if (!name.Equals(""))
                    {
                        //success
                        return Ok();
                        
                        //int resultToReturn = loginDAO.Insert(student); //acá guardamos un 1 o un 0, dependiendo de si se insertó el estudiante o no
                        //return Ok(resultToReturn); //retornamos el 1 o el 0 a la vista
                    }
                    else
                    {
                        return Error(); //Error (contraseña o correo invalido)
                    }
                }
                else
                {
                    return Error(); //Error (contraseña o correo invalido)
                }
            }
            else
            {
                return Error(); //Error (Correo no valido)


            }
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

