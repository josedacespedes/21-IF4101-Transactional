using _21_IF4101_Transactional.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace _21_IF4101_Transactional.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsCommentController : ControllerBase
    {
        // GET: api/<NewsCommentController>
        [Route("[action]")]
        [HttpGet]
        public IEnumerable<NewsComment> Get()
        {
            IEnumerable<NewsComment> newsComment = null;

            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://localhost:44397/api/NewsComments/");
                    var responseTask = client.GetAsync("GetNewsComments");
                    responseTask.Wait();

                    var result = responseTask.Result;

                    if (result.IsSuccessStatusCode)
                    {
                        var readTask = result.Content.ReadAsAsync<IList<NewsComment>>();
                        readTask.Wait();
                        //lee las noticias provenientes de la API
                        newsComment = readTask.Result;
                    }
                    else
                    {
                        newsComment = Enumerable.Empty<NewsComment>();
                    }
                }
            }
            catch
            {

                ModelState.AddModelError(string.Empty, "Server error. Please contact an administrator");

            }

            return newsComment;
        }

        // GET api/<NewsCommentController>/5
        public NewsComment GetById(int id)
        {
            NewsComment news = null;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44397/api/NewsComments/" + id);
                var responseTask = client.GetAsync(client.BaseAddress);
                responseTask.Wait();
                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<NewsComment>();
                    readTask.Wait();
                    //lee los comentarios de noticia provenientes de la API
                    news = readTask.Result;
                }
            }
            return news;
        }

        // POST api/<NewsCommentController>
        [HttpPost]
        public JsonResult Post([FromBody] NewsComment newsComment)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri("https://localhost:44397/api/NewsComments/");
                    var postTask = client.PostAsJsonAsync("newsComment", newsComment);
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

        // DELETE api/<NewsCommentController>/5
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:44397/api/");

                //HTTP DELETE
                var deleteTask = client.DeleteAsync("NewsComments/" + id.ToString());
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
