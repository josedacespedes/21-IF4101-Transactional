﻿using _21_IF4101_Transactional.Models;
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
    public class ProfessorController : Controller
    {
        private readonly ILogger<ProfessorController> _logger;
        private readonly IConfiguration _configuration;
        ProfessorDAO professorDAO;

        public ProfessorController(ILogger<ProfessorController> logger, IConfiguration configuration)
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


        public IActionResult Insert([FromBody] Professor professor)
        {
            //llamada al modelo para insertar el profesor
            professorDAO = new ProfessorDAO(_configuration);
            int existToReturn = professorDAO.VerifyProfessorId(professor.IdProfessor);

            if (existToReturn == 1)
            {
                return Ok(-1);
            }
            else
            {
                int resultToReturn = professorDAO.Insert(professor); //acá guardamos un 1 o un 0, dependiendo de si se insertó el profesor o no
                return Ok(resultToReturn); //retornamos el 1 o el 0 a la vista
            }

        }

        public IActionResult Get()
        {
            //llamada al modelo para obtener los profesores
            professorDAO = new ProfessorDAO(_configuration);
            return Ok(professorDAO.Get());
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}
