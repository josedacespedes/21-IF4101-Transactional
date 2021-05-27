"use strict";

//VARIABLES
var registerNewsForm = document.getElementById("registerNewsForm");
var formEditNews = document.getElementById("formEditNews");
var messageNews = document.getElementById("alertMessageAddNews");
var saveNewsPAComment = document.getElementById("formPAComment");
var modalPADetails = document.getElementById("newsModal");
var modalPAComments = document.getElementById("newsPAModalComments");
var alertComment = document.getElementById("alertAddNewComment");

var tableNewsNoUser;
var tableNewsProfessorStudent;
var tableNewsPresidentAdmin;
var idNewsEdit;
var tableNewsComments;

var fileName;
var imageName;

$(document).ready(function () {
    loadNewsNoUserList();
    loadNewsProfessorStudentList();
    loadNewsPresidentAdminList();
});


function cleanFieldsAddNews() {
    registerNewsForm.reset();
}


/*--------------------------------------------- ADD NEWS-----------------------------------------------------------*/
registerNewsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    $.ajax({
        url: "/Login/GetName",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var authorNews;
            if (result.name == " ") {
                authorNews = "Administrador";
            } else {
                authorNews = result.name;
            }
            var news = {
                title: $('#newsTittle').val(),
                description: $('#newsDescription').val(),
                author: authorNews,
                publicationDate: result.date,
                modificationDate: result.date,
                fileNews: 'files/' + document.getElementById("FileNews").files[0].name,
                imagen: 'images/' + document.getElementById("imgFileNews").files[0].name
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
                        SaveFileToInsert();
                        SaveImageToInsert();
                        messageNews.innerHTML = "<label class='text-success'>Noticia agregada exitosamente</label>";
                        $('#newsListPresidentAdminTable').DataTable().ajax.reload();
                        cleanFieldsAddNews();

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


$("#newsTittle").click(function () {
    messageNews.innerHTML = " ";
});

/*--------------------------------------------- LIST NEWS-----------------------------------------------------------*/
function loadNewsNoUserList() {
    tableNewsNoUser = $("#newsNoUserTable").DataTable({
        "destroy": true,
        "autoWidth": false,
        "ajax": {
            "url": "/NewsAPI/Get",
            "tpye": 'GET',
            "datatype": "json"
        },
        lengthMenu: [7, 20, 50, 100],
        "columns": [
            { "data": "title" },
            { "data": "publicationDate" },
            { "data": "author" },
            { defaultContent: "<button id='btnModalDetailsNews' name='btnModalDetailsNews' type='button' data-toggle='modal' class='btn btn-primary' data-target='#newsModal' title='Detalles'><i class='fa fa-file-text'></i></button>  <button id='btnModalCommentsNews' name='btnModalCommentsNews' type='button' data-toggle='modal' data-target='#newsModalComments' class='btn btn-info' title='Comentarios'><i class='fa fa-comments'></i></button>" }
        ]
    });
}

function loadNewsProfessorStudentList() {
    tableNewsProfessorStudent = $("#newsProfessorStudentTable").DataTable({
        "destroy": true,
        "autoWidth": false,
        "ajax": {
            "url": "/NewsAPI/Get",
            "tpye": 'GET',
            "datatype": "json"
        },
        lengthMenu: [7, 20, 50, 100],
        "columns": [
            { "data": "title" },
            { "data": "publicationDate" },
            { "data": "author" },
            { defaultContent: "<button id='btnModalDetailsNews' name='btnModalDetailsNews' type='button' data-toggle='modal' class='btn btn-primary' data-target='#newsModal' title='Detalles'><i class='fa fa-file-text'></i></button>  <button id='btnModalCommentsNews' name='btnModalCommentsNews' type='button' data-toggle='modal' data-target='#newsModalComments' class='btn btn-info' title='Comentarios'><i class='fa fa-comments'></i></button>" }
        ]
    });
}

function loadNewsPresidentAdminList() {
    tableNewsPresidentAdmin = $("#newsListPresidentAdminTable").DataTable({
        "destroy": true,
        "autoWidth": false,
        "ajax": {
            "url": "/NewsAPI/Get",
            "tpye": 'GET',
            "datatype": "json"
        },
        lengthMenu: [7, 20, 50, 100],
        "columns": [
            { "data": "title" },
            { "data": "publicationDate" },
            { "data": "author" },
            { defaultContent: "<button id='btnModalDetailsNews' name='btnModalDetailsNews' type='button' data-toggle='modal' class='btn btn-primary' data-target='#newsModal' title='Detalles'><i class='fa fa-file-text'></i></button> <button id='btnModalPACommentsNews' name='btnModalPACommentsNews' type='button' data-toggle='modal' data-target='#newsPAModalComments' class='btn btn-info' title='Comentarios'><i class='fa fa-comments'></i></button>" },
            { defaultContent: "<button type='button' id='buttonModalNewsEdit' name='buttonModalNewsEdit' class='btn btn-warning' data-toggle='modal' data-target='#modalNewsEdit' title='Modificar'><i class='fa fa-pencil'></i></button> <button id='deleteNews' name='deleteNews' type='button' class='btn btn-danger' title='Delete'><i class='fa fa-trash'></i></button>" }
        ]
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
            $.ajax({
                url: "/NewsAPI/Delete",
                data: { id: data.id },
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    tableNewsPresidentAdmin.row(rowToRemove).remove().draw(); //Remove of list
                },
                error: function (errorMessage) {
                    alert("Failed to delete Applicant");
                }
            });
        }
    });
});

/*--------------------------------------------- MODYFY NEWS-----------------------------------------------------------*/

//ACTION WHEN  OPEN MODAL
var dataInfoNews;
$("#newsListPresidentAdminTable tbody").on("click", "#buttonModalNewsEdit", function () {
    dataInfoNews = tableNewsPresidentAdmin.row($(this).parents("tr")).data();
    idNewsEdit = dataInfoNews.id;

    $('#newsTitleEdit').val(dataInfoNews.title);
    $('#newsEditDescription').val(dataInfoNews.description);
});

//ACTION UPDATE
formEditNews.addEventListener("submit", function (e) {
    e.preventDefault();

    Swal.fire({
        title: "Esta seguro que desea modificar esta noticia?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Confirmar`,
        denyButtonText: `Cancelar`,
    }).then((result) => {

        if (result.isConfirmed) {
            if ($('#fileNewsEdit').get(0).files.length != 0) {
                SaveFile();
            }
            if ($('#imgFileNewsEdit').get(0).files.length != 0) {
                SaveImage();
            }

            var news;
            if ($('#fileNewsEdit').get(0).files.length === 0 && $('#imgFileNewsEdit').get(0).files.length != 0) {
                news = {
                    id: idNewsEdit,
                    title: $('#newsTitleEdit').val(),
                    description: $('#newsEditDescription').val(),
                    author: dataInfoNews.author,
                    publicationDate: dataInfoNews.publicationDate,
                    modificationDate: dataInfoNews.modificationDate,
                    fileNews: dataInfoNews.fileNews,
                    imagen: 'images/' + document.getElementById("imgFileNewsEdit").files[0].name
                };
            } else if ($('#imgFileNewsEdit').get(0).files.length === 0 && $('#fileNewsEdit').get(0).files.length != 0) {
                news = {
                    id: idNewsEdit,
                    title: $('#newsTitleEdit').val(),
                    description: $('#newsEditDescription').val(),
                    author: dataInfoNews.author,
                    publicationDate: dataInfoNews.publicationDate,
                    modificationDate: dataInfoNews.modificationDate,
                    fileNews: 'files/' + document.getElementById("fileNewsEdit").files[0].name,
                    imagen: dataInfoNews.imagen,
                };
            } else if ($('#fileNewsEdit').get(0).files.length === 0 && $('#imgFileNewsEdit').get(0).files.length === 0) {
                news = {
                    id: idNewsEdit,
                    title: $('#newsTitleEdit').val(),
                    description: $('#newsEditDescription').val(),
                    author: dataInfoNews.author,
                    publicationDate: dataInfoNews.publicationDate,
                    modificationDate: dataInfoNews.modificationDate,
                    fileNews: dataInfoNews.fileNews,
                    imagen: dataInfoNews.imagen
                };
            } else {
                news = {
                    id: idNewsEdit,
                    title: $('#newsTitleEdit').val(),
                    description: $('#newsEditDescription').val(),
                    author: dataInfoNews.author,
                    publicationDate: dataInfoNews.publicationDate,
                    modificationDate: dataInfoNews.modificationDate,
                    fileNews: 'files/' + document.getElementById("fileNewsEdit").files[0].name,
                    imagen: 'images/' + document.getElementById("imgFileNewsEdit").files[0].name
                };
            }

            $.ajax({
                url: "/NewsAPI/" + news.id,
                data: JSON.stringify(news),
                type: "PUT",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {

                    $('#modalNewsEdit').modal('hide');
                    cleanFieldsModalNewsEdit();
                    $('#newsListPresidentAdminTable').DataTable().ajax.reload();
                    Swal.fire({
                        icon: 'success',
                        title: 'Modificado Exitoso',
                        showConfirmButton: false,
                        timer: 1500
                    })

                },
                error: function (errorMessage) {
                    alert("Error");
                    alert(errorMessage.responseText);
                }
            });

        }
    });

});

function cleanFieldsModalNewsEdit() {
    formEditNews.reset();
}

//--------------------------------------------- NEWS DETAILS-----------------------------------------------------------
function addPAComment(id) {
    var comment = $('#dNewComment').val();
    var authorComment;

    $.ajax({
        url: "/Login/GetName",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            if (result.name == " ") {
                authorComment = "Administrador";
            } else {
                authorComment = result.name;
            }
            var newsComment = {
                author: authorComment,
                date: result.date,
                comment: $('#dNewComment').val(),
                idNews: parseInt(id)
            };
            if (comment != "") {
                $.ajax({
                    url: "/NewsCommentAPI/",
                    data: JSON.stringify(newsComment),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",

                    success: function (result) {
                        console.log(result);
                        $('#dNewComment').val("");
                    },
                    error: function (errorMessage) {
                        alert("Error");
                    }
                });
            } else {
                alert("Error");
            }
        },
        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });
}

$("#newsListPresidentAdminTable tbody").on("click", "#btnModalDetailsNews", function () {
    var dataNewsPA = tableNewsPresidentAdmin.row($(this).parents("tr")).data();
    fileName = dataNewsPA.fileNews;
    imageName = dataNewsPA.imagen;

    modalPADetails.style.display = "block";

    alertComment.innerHTML = "";
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
                <th scope="col">Fecha de modificación</th>
            </tr>
            <tbody>
                <tr>
                    <th scope="row">` + dataNewsPA.title + `</th>
                    <td>` + dataNewsPA.id + `</td>
                    <td>`+ dataNewsPA.author + `</td>
                    <td>`+ dataNewsPA.publicationDate + `</td>
                    <td>`+ dataNewsPA.modificationDate + `</td>
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
    html += '<button id="downloadNewFiles" type="button" class="btn btn-info">Descargar Archivos</button>';
    html += '<button type="button" class="btn btn-success" onclick="return addPAComment(' + dataNewsPA.id + ')">Comentar</button>';
    html += '</div>';
    html += '</div>';
    html += '</form>';
    html += '</div>';

    $('.modal-contentNew').html(html);
    $("#downloadNewFiles").click(function () {
        window.open(fileName, '_blank');
        window.open(imageName, '_blank');
    });
});

$("#newsNoUserTable tbody").on("click", "#btnModalDetailsNews", function () {
    var dataNewsPA = tableNewsNoUser.row($(this).parents("tr")).data();
    fileName = dataNewsPA.fileNews;
    imageName = dataNewsPA.imagen;

    alertComment.innerHTML = "";
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
                <th scope="col">Fecha de modificación</th>
            </tr>
            <tbody>
                <tr>
                    <th scope="row">` + dataNewsPA.title + `</th>
                    <td>` + dataNewsPA.id + `</td>
                    <td>`+ dataNewsPA.author + `</td>
                    <td>`+ dataNewsPA.publicationDate + `</td>
                    <td>`+ dataNewsPA.modificationDate + `</td>

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
    html += '<button id="downloadNewFiles" type="button" class="btn btn-info">Descargar Archivos</button>';
    html += '</div>';
    html += '</div>';
    html += '</form>';
    html += '</div>';

    $('.modal-contentNew').html(html);
    $("#downloadNewFiles").click(function () {
        window.open(fileName, '_blank');
        window.open(imageName, '_blank');
    });
});

$("#newsProfessorStudentTable tbody").on("click", "#btnModalDetailsNews", function () {
    var dataNewsPA = tableNewsProfessorStudent.row($(this).parents("tr")).data();
    fileName = dataNewsPA.fileNews;
    imageName = dataNewsPA.imagen;

    alertComment.innerHTML = "";
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
                <th scope="col">Fecha de modificación</th>
            </tr>
            <tbody>
                <tr>
                    <th scope="row">` + dataNewsPA.title + `</th>
                    <td>` + dataNewsPA.id + `</td>
                    <td>`+ dataNewsPA.author + `</td>
                    <td>`+ dataNewsPA.publicationDate + `</td>
                    <td>`+ dataNewsPA.modificationDate + `</td>

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
    html += '<button id="downloadNewFiles" type="button" class="btn btn-info">Descargar Archivos</button>';
    html += '<button type="button" class="btn btn-success" onclick="return addPAComment(' + dataNewsPA.id + ')">Comentar</button>';
    html += '</div>';
    html += '</div>';
    html += '</form>';
    html += '</div>';

    $('.modal-contentNew').html(html);
    $("#downloadNewFiles").click(function () {
        window.open(fileName, '_blank');
        window.open(imageName, '_blank');
    });
});




/*--------------------------------------------- LIST NEWS COMMENTS-----------------------------------------------------------*/
$("#newsNoUserTable tbody").on("click", "#btnModalCommentsNews", function () {
    var dataInfoComments = tableNewsNoUser.row($(this).parents("tr")).data();
    loadNewsListComments(dataInfoComments.id);

});
$("#newsProfessorStudentTable tbody").on("click", "#btnModalCommentsNews", function () {
    var dataInfoComments = tableNewsProfessorStudent.row($(this).parents("tr")).data();
    loadNewsListComments(dataInfoComments.id);

});
$("#newsListPresidentAdminTable tbody").on("click", "#btnModalPACommentsNews", function () {
    modalPAComments.style.display = "block";
    var data = tableNewsPresidentAdmin.row($(this).parents("tr")).data();
    loadPANewsListComments(data.id);
});

function loadPANewsListComments(id) {

    tableNewsComments = $("#newsPACommentsTable").DataTable({
        "destroy": true,
        "autoWidth": false,
        "ajax": {
            "url": "/NewsCommentAPI/GetById/",
            "data": { id: id },
            "type": 'GET',
            "datatype": "json",
        },
        lengthMenu: [7, 20, 50, 100],
        "columns": [
            { "data": "author" },
            { "data": "date" },
            { "data": "comment" },
            { defaultContent: "<button id='buttonNewCommentDelete' name='buttonNewCommentDelete' type='button' class='btn btn-danger' title='Delete'><i class='fa fa-trash'></i></button>" }
        ]
    });

}

function loadNewsListComments(id) {
    tableComments = $("#newsCommentsTable").DataTable({
        "destroy": true,
        "autoWidth": false,
        "ajax": {
            "url": "/NewsCommentAPI/GetById/",
            "data": { id: id },
            "type": 'GET',
            "datatype": "json",
        },
        lengthMenu: [7, 20, 50, 100],
        "columns": [
            { "data": "author" },
            { "data": "comment" },
            { "data": "date" }
        ]
    });
}
/*--------------------------------------------- DELETE COMMENTS-----------------------------------------------------------*/

$("#newsPACommentsTable tbody").on("click", "#buttonNewCommentDelete", function () {
    var data = tableNewsComments.row($(this).parents("tr")).data();
    var rowToRemove = $(this).parents('tr');
    Swal.fire({
        title: "¿Está seguro que desea eliminar este comentario?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Confirmar`,
        denyButtonText: `Cancelar`,
    }).then((result) => {

        if (result.isConfirmed) {
            $.ajax({
                url: "/NewsCommentAPI/Delete",
                data: { id: data.id },
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    tableNewsComments.row(rowToRemove).remove().draw(); //Remove of list
                },
                error: function (errorMessage) {
                    alert("Failed to delete Comment");
                }
            });
        }
    });
});


function SaveFile() {
    var fileNewNews = document.getElementById("fileNewsEdit").files[0];
    var formData = new FormData();
    formData.append("file", fileNewNews);

    $.ajax({
        url: "/Student/SaveFile",
        data: formData,
        type: "POST",
        contentType: false,
        processData: false,
        success: function (result) {
        },
        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });
}

function SaveImage() {

    var imgNewNews = document.getElementById("imgFileNewsEdit").files[0];
    var formData = new FormData();
    formData.append("image", imgNewNews);

    $.ajax({
        url: "/Student/SaveImage",
        data: formData,
        type: "POST",
        contentType: false,
        processData: false,

        success: function (result) {
        },

        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });
}


function SaveFileToInsert() {
    var fileNewNews = document.getElementById("FileNews").files[0];
    var formData = new FormData();
    formData.append("file", fileNewNews);

    $.ajax({
        url: "/Student/SaveFile",
        data: formData,
        type: "POST",
        contentType: false,
        processData: false,
        success: function (result) {
        },
        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });
}

function SaveImageToInsert() {

    var imgNewNews = document.getElementById("imgFileNews").files[0];
    var formData = new FormData();
    formData.append("image", imgNewNews);

    $.ajax({
        url: "/Student/SaveImage",
        data: formData,
        type: "POST",
        contentType: false,
        processData: false,

        success: function (result) {
        },

        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });
}
