"use strict";

//VARIABLES
var registerNewsForm = document.getElementById("registerNewsForm");
var formEditNews = document.getElementById("formEditNews");
var messageNews = document.getElementById("alertMessageAddNews");
var tableNewsNoUser;
var tableNewsProfessorStudent;
var tableNewsPresidentAdmin;
var idNewsEdit;

$(document).ready(function () {
    loadNewsNoUserList();
    loadNewsProfessorStudentList();
    loadNewsPresidentAdminList();
});

/*--------------------------------------------- ADD NEWS-----------------------------------------------------------*/
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

/*--------------------------------------------- LIST NEWS-----------------------------------------------------------*/
function loadNewsNoUserList() {
    tableNewsNoUser = $("#newsNoUserTable").DataTable({
        //"destroy": true,
        //"autoWidth": false,
        //"columnDefs": [
        //    { "width": "20%", "targets": [0, 4] }
        //],
        //"ajax": {
        //    "url": "/NewsAPI/Get",
        //    "tpye": 'GET',
        //    "datatype": "json"
        //},
        //lengthMenu: [7, 20, 50, 100],
        //"columns": [
        //    { "data": "title" },
        //    { "data": "publication_Date" },
        //    { "data": "author" },
        //    { defaultContent: "<button id='btnModalDetailsNews' name='btnModalDetailsNews' type='button' data-toggle='modal' class='btn btn-primary' data-target='#newsModal' title='Detalles'><i class='fa fa-file-text'></i></button>  <button id='btnModalCommentsNews' name='btnModalCommentsNews' type='button' data-toggle='modal' data-target='#newsModalComments' class='btn btn-info' title='Comentarios'><i class='fa fa-comments'></i></button>" }
        //]
    });
}

function loadNewsProfessorStudentList() {
    tableNewsProfessorStudent = $("#newsProfessorStudentTable").DataTable({
        //"destroy": true,
        //"autoWidth": false,
        //"columnDefs": [
        //    { "width": "20%", "targets": [0, 4] }
        //],
        //"ajax": {
        //    "url": "/NewsAPI/Get",
        //    "tpye": 'GET',
        //    "datatype": "json"
        //},
        //lengthMenu: [7, 20, 50, 100],
        //"columns": [
        //    { "data": "title" },
        //    { "data": "publication_Date" },
        //    { "data": "author" },
        //    { defaultContent: "<button id='btnModalDetailsNews' name='btnModalDetailsNews' type='button' data-toggle='modal' class='btn btn-primary' data-target='#newsModal' title='Detalles'><i class='fa fa-file-text'></i></button>  <button id='btnModalCommentsNews' name='btnModalCommentsNews' type='button' data-toggle='modal' data-target='#newsModalComments' class='btn btn-info' title='Comentarios'><i class='fa fa-comments'></i></button>" }
        //]
    });
}

function loadNewsPresidentAdminList() {
    tableNewsPresidentAdmin = $("#newsListPresidentAdminTable").DataTable({
        //"destroy": true,
        //"autoWidth": false,
        //"columnDefs": [
        //    { "width": "20%", "targets": [0, 4] }
        //],
        //"ajax": {
        //    "url": "/NewsAPI/Get",
        //    "tpye": 'GET',
        //    "datatype": "json"
        //},
        //lengthMenu: [7, 20, 50, 100],
        //"columns": [
        //    { "data": "title" },
        //    { "data": "publication_Date" },
        //    { "data": "author" },
        //    { defaultContent: "<button id='btnModalDetailsNews' name='btnModalDetailsNews' type='button' data-toggle='modal' class='btn btn-primary' data-target='#newsModal' title='Detalles'><i class='fa fa-file-text'></i></button> <button id='btnModalCommentsNews' name='btnModalCommentsNews' type='button' data-toggle='modal' data-target='#newsModalComments' class='btn btn-info' title='Comentarios'><i class='fa fa-comments'></i></button>" },
        //    { defaultContent: "<button type = 'button' id = 'buttonModalNewsEdit' name = 'buttonModalNewsEdit' class= 'btn btn-warning' data - toggle='modal' data - target='#modalNewsEdit' title = 'Modificar' > <i class='fa fa-pencil'></i></button > <button id='deleteNews' name='deleteNews' type='button' class='btn btn-danger' title='Delete'><i class='fa fa-trash'></i></button>" }
        //]
    });
}

/*--------------------------------------------- DELETE NEWS-----------------------------------------------------------*/
$("#newsListPresidentAdminTable tbody").on("click", "#deleteNews", function () {

    var data = tableNewsPresidentAdmin.row($(this).parents("tr")).data();
    var rowToRemove = $(this).parents('tr');

    Swal.fire({
        title: "Esta seguro de eliminar esta noticia (incluido comentarios)?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Confirmar`,
        denyButtonText: `Cancelar`,
    }).then((result) => {

        if (result.isConfirmed) {
            //$.ajax({
            //    url: "/NewsAPIController/Delete",
            //    data: { Id: data.id },
            //    type: "GET",
            //    contentType: "application/json;charset=utf-8",
            //    dataType: "json",
            //    success: function (result) {
            //        tableNewsPresidentAdmin.row(rowToRemove).remove().draw(); //Remove of list
            //    },
            //    error: function (errorMessage) {
            //        alert("Failed to delete Applicant");
            //    }
            //});

        }
    });
});

/*--------------------------------------------- MODYFY NEWS-----------------------------------------------------------*/
//ACTION WHEN  OPEN MODAL
$("#newsListPresidentAdminTable tbody").on("click", "#buttonModalNewsEdit", function () {
    //var dataInfoNews = tableNewsPresidentAdmin.row($(this).parents("tr")).data();
    //idNewsEdit = dataInfoNews.id;

    //$('#newsTitleEdit').val(dataInfoNews.title);
    //$('#newsEditDescription').val(dataInfoNews.description);
    //$('#imgFileNewsEdit').val(dataInfoNews.imagen);
    //$('#fileNewsEdit').val(dataInfoNews.file_New);
});

//ACTION UPDATE
formEditNews.addEventListener("submit", function (e) {
    e.preventDefault();

    var news = {
        id: idNewsEdit,
        title: $('#newsTitleEdit').val(),
        description: $('#newsEditDescription').val(),
        file_New: $('#fileNewsEdit').val(),
        imagen: $('#imgFileNewsEdit').val(),
    };

    Swal.fire({
        title: "Esta seguro que desea modificar esta noticia?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Confirmar`,
        denyButtonText: `Cancelar`,
    }).then((result) => {

        if (result.isConfirmed) {
            //$.ajax({
            //    url: "/NewsAPI/Put",
            //    data: { id: news.id, news: news },
            //    type: "PUT",
            //    contentType: "application/json;charset=utf-8",
            //    dataType: "json",
            //    success: function (result) {

            //        $('#modalNewsEdit').modal('hide');
            //        $('#newsListPresidentAdminTable').DataTable().ajax.reload();
            //        Swal.fire({
            //            icon: 'success',
            //            title: 'Modificado Exitoso',
            //            showConfirmButton: false,
            //            timer: 1500
            //        })

            //    },
            //    error: function (errorMessage) {
            //        alert("Error");
            //        alert(errorMessage.responseText);
            //    }
            //});

        }
    });

});