"use strict";

//VARIABLES
var registerNewsForm = document.getElementById("registerNewsForm");
var messageNews = document.getElementById("alertMessageAddNews");
$(document).ready(function () {

});

registerNewsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    $.ajax({
        url: "/Login/GetName",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var news = {
                title: $('#newsTittle').val(),
                description: $('#newsDescription').val(),
                author: result.name,
                publication_date: result.date,
                modification_date: result.date,
                file_new: $('#FileNews').val(),
                imagen: $('#imgFileNews').val()
            };
            console.log(news);
            if (news.title == "" && news.description == "" && news.author == "") {
                $('#newsTittle').addClass("formInput-error");
                $('#newsDescription').addClass("formInput-error");
                return false;
            } else if (news.title == "") {
                $('#newsTittle').addClass("formInput-error");
                return false;
            } else if (news.description == "") {
                $('#newsDescription').addClass("formInput-error");
                return false;
            } else {
                $.ajax({
                    url: "/NewsAPI/",
                    data: JSON.stringify(news),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        
                        messageNews.innerHTML = "<label class='text-success'>Noticia agregada exitosamente</label>";
                        $('#newsTittle').val();
                        $('#newsDescription').val();
                        $('#FileNews').val();
                        $('#imgFileNews').val();
                           
                    },
                    error: function (errorMessage) {
                        alert("Error");
                        alert(errorMessage.responseText);
                    }
                });
            }
        },
        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });
    
});