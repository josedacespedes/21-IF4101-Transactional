"use strict";

//VARIABLES
var registerNewsForm = document.getElementById("registerNewsForm");
var messageNews = document.getElementById("alertMessageAddNews");
var tableNewsNoUser;
var tableNewsProfessorStudent;
var tableNewsPresidentAdmin;

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


/*--------------------------------------------- NEWS DETAILS-----------------------------------------------------------*/

$("#newsNoUserTable tbody").on("click", "#btnModalDetailsNews", function () {
    var dataNewsPA = tableNewsNoUser.row($(this).parents("tr")).data();

    message.innerHTML = "";
    var html = '';

    html += '<div class="modal-header">';
    html += '<button type="button" id="buttonCloseModal" class="btn btn-danger" data-dismiss="modal" aria-label="Close"><b>X</b></button>';
    html += '<h2 class="modal-title">Detalles de Noticia</h2>';
    html += '</div>';
    html += '<div class="modal-body">';
    html += '<form autocomplete="off">';
    html += `<div class="table-responsive">
            <table class="table text-center">
            <tr>
                <th scope="col">Título</th>
                <th scope="col">ID</th>
                <th scope="col">Autor</th>
                <th scope="col">Fecha de publicación</th>
            </tr>
            <tbody>
                <tr>
                    <th scope="row">` + dataNewsPA.title + `</th>
                    <td>` + dataNewsPA.id + `</td>
                    <td>`+ dataNewsPA.author + `</td>
                    <td>`+ dataNewsPA.publication_Date + `</td>
                </tr>
            </tbody>
            </table >
            </div>`;
    html += '<label>Descripción:</label>';
    html += '<div>';
    html += '<textarea rows="4" cols="50" type="text" name="dNewtDescription" id="dNewtDescription" class="form-control" placeholder="Descripción" disabled>' + dataNewsPA.description + '</textarea>';
    html += '</div>';
    html += '</div>';
    html += '<div class="modal-footer mt-4">';
    html += '<div class="col-12">';
    html += '<button id="downloadNewFiles" type="button" class="btn btn-info" onclick="">Descargar Archivos</button>';
    html += '</div>';
    html += '</div>';
    html += '</form>';
    html += '</div>';

    $('.modal-contentNew').html(html);

});

$("#newsProfessorStudentTable tbody").on("click", "#btnModalDetailsNews", function () {
    var dataNewsPA = tableNewsProfessorStudent.row($(this).parents("tr")).data();

    message.innerHTML = "";
    var html = '';

    html += '<div class="modal-header">';
    html += '<button type="button" id="buttonCloseModal" class="btn btn-danger" data-dismiss="modal" aria-label="Close"><b>X</b></button>';
    html += '<h2 class="modal-title">Detalles de Noticia</h2>';
    html += '</div>';
    html += '<div class="modal-body">';
    html += '<form autocomplete="off">';
    html += `<div class="table-responsive">
            <table class="table text-center">
            <tr>
                <th scope="col">Título</th>
                <th scope="col">ID</th>
                <th scope="col">Autor</th>
                <th scope="col">Fecha de publicación</th>
            </tr>
            <tbody>
                <tr>
                    <th scope="row">` + dataNewsPA.title + `</th>
                    <td>` + dataNewsPA.id + `</td>
                    <td>`+ dataNewsPA.author + `</td>
                    <td>`+ dataNewsPA.publication_Date + `</td>
                </tr>
            </tbody>
            </table >
            </div>`;
    html += '<label>Descripción:</label>';
    html += '<div>';
    html += '<textarea rows="4" cols="50" type="text" name="dNewtDescription" id="dNewtDescription" class="form-control" placeholder="Descripción" disabled>' + dataNewsPA.description + '</textarea>';
    html += '</div>';
    html += '</div>';
    html += '<div class="modal-footer mt-4">';
    html += '<div class="col-12">';
    html += '<textarea rows="4" cols="50" type="text" name="dNewComment" id="dNewComment" required="" class="form-control" placeholder="Comentario"></textarea>';
    html += '</div>';
    html += '</div>';
    html += '<div class="modal-footer mt-4">';
    html += '<div class="col-12">';
    html += '<button id="downloadNewFiles" type="button" class="btn btn-info" onclick="">Descargar Archivos</button>';
    html += '<button type="button" class="btn btn-success" onclick="return addNewComment(' + dataNewsPA.id + ')">Comentar</button>';
    html += '</div>';
    html += '</div>';
    html += '</form>';
    html += '</div>';

    $('.modal-contentNew').html(html);

});

$("#newsListPresidentAdminTable tbody").on("click", "#btnModalDetailsNews", function () {
    var dataNewsPA = tableNewsPresidentAdmin.row($(this).parents("tr")).data();

    message.innerHTML = "";
    var html = '';

    html += '<div class="modal-header">';
    html += '<button type="button" id="buttonCloseModal" class="btn btn-danger" data-dismiss="modal" aria-label="Close"><b>X</b></button>';
    html += '<h2 class="modal-title">Detalles de Noticia</h2>';
    html += '</div>';
    html += '<div class="modal-body">';
    html += '<form autocomplete="off">';
    html += `<div class="table-responsive">
            <table class="table text-center">
            <tr>
                <th scope="col">Título</th>
                <th scope="col">ID</th>
                <th scope="col">Autor</th>
                <th scope="col">Fecha de publicación</th>
            </tr>
            <tbody>
                <tr>
                    <th scope="row">` + dataNewsPA.title + `</th>
                    <td>` + dataNewsPA.id + `</td>
                    <td>`+ dataNewsPA.author + `</td>
                    <td>`+ dataNewsPA.publication_Date + `</td>
                </tr>
            </tbody>
            </table >
            </div>`;
    html += '<label>Descripción:</label>';
    html += '<div>';
    html += '<textarea rows="4" cols="50" type="text" name="dNewtDescription" id="dNewtDescription" class="form-control" placeholder="Descripción" disabled>' + dataNewsPA.description + '</textarea>';
    html += '</div>';
    html += '</div>';
    html += '<div class="modal-footer mt-4">';
    html += '<div class="col-12">';
    html += '<textarea rows="4" cols="50" type="text" name="dNewComment" id="dNewComment" required="" class="form-control" placeholder="Comentario"></textarea>';
    html += '</div>';
    html += '</div>';
    html += '<div class="modal-footer mt-4">';
    html += '<div class="col-12">';
    html += '<button id="downloadNewFiles" type="button" class="btn btn-info" onclick="">Descargar Archivos</button>';
    html += '<button type="button" class="btn btn-success" onclick="return addNewComment(' + dataNewsPA.id + ')">Comentar</button>';
    html += '</div>';
    html += '</div>';
    html += '</form>';
    html += '</div>';

    $('.modal-contentNew').html(html);

});
/*--------------------------------------------- ADD NEWS COMMENTS-----------------------------------------------------------*/

function addNewComment(id) {
    //var dateTime = new Date();
    //var comment = $('#dNewComment').val();

    //if (comment != "") {
    //    $.ajax({
    //        url: "/Login/GetName",
    //        type: "GET",
    //        contentType: "application/json;charset=utf-8",
    //        dataType: "json",
    //        success: function (result) {

    //            var newComment = {
    //                author: result.name,
    //                date: dateTime,
    //                comment: $('#dNewComment').val(),
    //                idNews: parseInt(id)
    //            };

    //            $.ajax({
    //                url: "/api/<NewsCommentController>",
    //                data: JSON.stringify(newComment),
    //                type: "POST",
    //                contentType: "application/json;charset=utf-8",
    //                dataType: "json",
    //                success: function (result) {
    //                    $('#dNewComment').val("");
    //                    message.innerHTML = "<label class='text-success'>Comentario agregado exitosamente</label>";
    //                },
    //                error: function (errorMessage) {
    //                    message.innerHTML = "<label class='text-danger'>Error, por favor llene el comentario primero</label>";
    //                }
    //            });
    //        },
    //        error: function (errorMessage) {
    //            alert("Error");
    //            alert(errorMessage.responseText);
    //        }
    //    });

    //} else {
    //    message.innerHTML = "<label class='text-danger'>Error, por favor llene el comentario primero</label>";
    //}
}

/*--------------------------------------------- LIST NEWS COMMENTS-----------------------------------------------------------*/

//function loadConsultListComments(id) {
//    tableComments = $("#commentTable").DataTable({
//        "destroy": true,
//        "autoWidth": false,
//        "columnDefs": [
//            { "width": "20%", "targets": [0, 2] }
//        ],
//        "ajax": {
//            "url": "/ConsultComment/GetComments/",
//            "tpye": 'GET',
//            "datatype": "json",
//            "data": { "idConsult": id }
//        },
//        lengthMenu: [7, 20, 50, 100],
//        "columns": [
//            { "data": "author" },
//            { "data": "comment" },
//            { "data": "date" }
//        ]
//    });
//}

/*--------------------------------------------- DELETE NEWS COMMENTS-----------------------------------------------------------*/
//function loadConsultListComments(id) {
//    tableComments = $("#commentTable").DataTable({
//        "destroy": true,
//        "autoWidth": false,
//        "columnDefs": [
//            { "width": "20%", "targets": [0, 2] }
//        ],
//        "ajax": {
//            "url": "/ConsultComment/GetComments/",
//            "tpye": 'GET',
//            "datatype": "json",
//            "data": { "idConsult": id }
//        },
//        lengthMenu: [7, 20, 50, 100],
//        "columns": [
//            { "data": "author" },
//            { "data": "comment" },
//            { "data": "date" }
//        ]
//    });
//}
