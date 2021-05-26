using _21_IF4101_Transactional.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;

namespace _21_IF4101_Transactional.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class NewsAPIController : Controller
    {
        // GET: api/News/GetNews
        [Route("[action]")]
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<News> news = null;

            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://localhost:44397/api/News/");
                    var responseTask = client.GetAsync("GetNews");
                    responseTask.Wait();

                    var result = responseTask.Result;

                    if (result.IsSuccessStatusCode)
                    {
                        var readTask = result.Content.ReadAsAsync<IList<News>>();
                        readTask.Wait();

                        news = readTask.Result;//lee las noticias provenientes de la API
                    }
                    else
                    {
                        news = Enumerable.Empty<News>();
                    }
                }
            }
            catch
            {

                ModelState.AddModelError(string.Empty, "Server error. Please contact an administrator");

            }

            return Json(new { data = news });
        }

        // GET api/NewsAPIController/5
        //[HttpGet("{id}")]
        public News GetById(int id)
        {
            News news = null;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44397/api/News/" + id);
                var responseTask = client.GetAsync(client.BaseAddress);
                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<News>();
                    readTask.Wait();
                    //lee las noticia provenientes de la API
                    news = readTask.Result;
                }
            }

            return news;
        }

        // POST api/News/Post
        [HttpPost]
        public JsonResult Post([FromBody] News news)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://localhost:44397/api/News");
                    var postTask = client.PostAsJsonAsync("news", news);
                    postTask.Wait();

                    var result = postTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        return new JsonResult(result);
                    }
                    else
                    {
                        return new JsonResult(result);
                    }
                }

            }
            catch (DbUpdateException exception)
            {
                return new JsonResult(exception);
            }
        }

        // PUT: api/News/1
        [HttpPut("{id}")]
        public JsonResult Put(int id, [FromBody] News news)
        {
            try
            {
                using (var client = new HttpClient())
                {

                    client.BaseAddress = new Uri("https://localhost:44397/api/student/" + id);

                    //HTTP POST
                    var putTask = client.PutAsJsonAsync("news", news);
                    putTask.Wait();

                    var result = putTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        return new JsonResult(result);
                    }
                    else
                    {
                        return new JsonResult(result);
                    }
                }
            }
            catch (DbUpdateConcurrencyException exception)
            {
                return new JsonResult(exception);
            }

        }

        // DELETE: api/News/1
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:44397/api/");

                //HTTP DELETE
                var deleteTask = client.DeleteAsync("News/" + id.ToString());
                deleteTask.Wait();

                var result = deleteTask.Result;
                if (result.IsSuccessStatusCode)
                {

                    return new JsonResult(result);
                }
                else
                {
                    //camino del error
                    return new JsonResult(result);

                }
            }
        }
    }
}
