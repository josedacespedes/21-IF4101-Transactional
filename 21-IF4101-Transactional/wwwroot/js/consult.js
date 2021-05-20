"use strict";

var registerConsultForm = document.getElementById("registerConsultForm");
var messageToSendConsult = document.getElementById("alertMessageAddConsult");
var message = document.getElementById("alertAddComment");
var tableConsult;
var tableComments;
$(document).ready(function () {
    GetProfessorConsult();
    loadConsultListComments(0);
});

//ACTION ADD
registerConsultForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var checkStatus = $("input[name='consultTypeCheck']").is(':checked') ? 1 : 0; //Validate if th input is checked or not

    var consult = {
        title: $('#consultTitle').val(),
        description: $('#consultDescription').val(),
        professor: ($('#professorConsult').val()),
        type: parseInt(checkStatus)
    };
    console.log(consult);
    if (consult.title == "" && consult.description == "" && consult.professor == "") {
        $('#consultTitle').addClass("formInput-error");
        $('#consultDescription').addClass("formInput-error");
        $('#professorConsult').addClass("formInput-error");
        $('#consultTypeCheck').addClass("formInput-error");
        return false;
    } else if (consult.title == "") {
        $('#consultTitle').addClass("formInput-error");
        return false;
    } else if (consult.description == "") {
        $('#consultDescription').addClass("formInput-error");
        return false;
    } else if (consult.professor == "") {
        $('#professorConsult').addClass("formInput-error");
        return false;
    } else {
        $.ajax({
            url: "/Consult/Insert",
            data: JSON.stringify(consult),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result == 1) {
                    messageToSendConsult.innerHTML = "<label class='text-success'>Consulta agregada exitosamente</label>";

                    $('#consultTable').DataTable().ajax.reload();
                    $('#consultTitle').val("");
                    $('#consultDescription').val("");
                    $('#professorConsult').val(0);
                } else if (result == 3) {
                    $('#idCourse').addClass("formInput-error");
                    messageToSendConsult.innerHTML = "<label class='text-danger'>Esta consulta ya existe</label>";
                }
                else {
                    messageToSendConsult.innerHTML = "<label class='text-danger'>Error al ingresar consulta</label>";
                }
            },
            error: function (errorMessage) {
                alert("Error");
                alert(errorMessage.responseText);
            }
        });
    }
});

function addComment(id) {
    var consultComment = {
        idConsult: parseInt(id),
        comment: $('#dConsultComment').val()
    };
    if (consultComment.comment != "") {
        $.ajax({
            url: "/ConsultComment/Insert",
            data: JSON.stringify(consultComment),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('#dConsultComment').val("");
                message.innerHTML = "<label class='text-success'>Comentario agregado exitosamente</label>";
            },
            error: function (errorMessage) {
        //        alert("Error");
                //alert(errorMessage.responseText);
                message.innerHTML = "<label class='text-danger'>Error, por favor llene el comentario primero</label>";
            }
        });
    } else {
        message.innerHTML = "<label class='text-danger'>Error, por favor llene el comentario primero</label>";
    }
}

function loadConsultList() {
    tableConsult = $("#consultTable").DataTable({
        "destroy": true,
        "autoWidth": false,
        "columnDefs": [
            { "width": "20%", "targets": [0, 4] }
        ],
        "ajax": {
            "url": "/Consult/Get",
            "tpye": 'GET',
            "datatype": "json"
        },
        lengthMenu: [7, 20, 50, 100],
        "columns": [
            { "data": "title" },
            { "data": "date" },
            { "data": "professor" },
            {
                render: function (data, type, row) {
                    return row.type == 1 ? 'Pública' : 'Privada';
                },

            },
            { defaultContent: "<button id='btnModalDetails' name='btnModalDetails' type='button' data-toggle='modal' class='btn btn-primary' data-target='#consultModal' title='Detalles'><i class='fa fa-file-text'></i></button>  <button id='btnModalComments' name='btnModalComments' type='button' data-toggle='modal' data-target='#consultModalComments' class='btn btn-info' title='Comentarios'><i class='fa fa-comments'></i></button>" }
        ]
    });
    
}


function loadConsultListComments(id) {
    tableComments = $("#commentTable").DataTable({
        "destroy": true,
        "autoWidth": false,
        "columnDefs": [
            { "width": "20%", "targets": [0, 2] }
        ],
        "ajax": {
            "url": "/ConsultComment/GetComments/",
            "tpye": 'GET',
            "datatype": "json",
            "data": { "idConsult" : id }
        },
        lengthMenu: [7, 20, 50, 100],
        "columns": [
            { "data": "author" },
            { "data": "comment" },
            { "data": "date" }
        ]
        
    });
    
}


function GetProfessorConsult() {

    $.ajax({
        url: "/Appointment/GetProfessors",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            var html = '';
            $.each(result, function (key, item) {
                html += '<option>' + item.firstNameProfessor + ' ' + item.lastNameProfessor + '</option>';
            });
            $('#professorConsult').append(html);
        },
        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });
}

// Get the modal
var modalConsult = document.getElementById("consultModal");
var modalConsultComments = document.getElementById("consultModalComments");

function closeDetails() {
    modalConsult.style.display = "none";
}
function closeComments() {
    modalConsultComments.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modalConsult) {
        modalConsult.style.display = "none";
    }
}
window.onclick = function (event) {
    if (event.target == modalConsultComments) {
        modalConsultComments.style.display = "none";
    }
}

$("#consultTable tbody").on("click", "#btnModalDetails", function () {
    modalConsult.style.display = "block";
    var dataInfoConsult = tableConsult.row($(this).parents("tr")).data();
    //console.log(dataInfoConsult);
    message.innerHTML = "";
    var html = '';
    
    html += '<div class="modal-header">';
    html += '<button type="button" id="buttonCloseModal" class="btn btn-danger" data-dismiss="modal" aria-label="Close"><b>X</b></button>';
    html += '<h2 class="modal-title">Detalles de Consulta</h2>';
    html += '</div>';
    html += '<div class="modal-body">';
    html += '<div ></div>';
    html += '<form autocomplete="off">';
    html += '<div class="form-group">';
    html += '<label>Titulo:</label>';
    html += '<div>';
    html += '<label id="dConsultTitle" type="text"> ' + dataInfoConsult.title + '</label>';
    html += '</div>';
    html += '</div>';
    html += '<div id="DetailsId" class="form-group">';
    html += '<label>ID:</label>';
    html += '<div>';
    html += '<label id="dConsultId" type="text">' + dataInfoConsult.id + '</label>';
    html += '</div>';
    html += '</div>';
    html += '<div class="form-group">';
    html += '<label>Autor:</label>';
    html += '<div>';
    html += '<label id="dConsultAuthor" type="text">' + dataInfoConsult.author + '</label>';
    html += '</div>';
    html += '</div>';
    html += '<div class="form-group">';
    html += '<label>Curso:</label>';
    html += '<div>';
    html += '<label id="dConsultCourse" type="text">' + dataInfoConsult.course + '</label>';
    html += '</div>';
    html += '</div>';
    html += '<div id="DetailsDate" class="form-group">';
    html += '<label>Fecha:</label>';
    html += '<div>';
    html += '<label id="dConsultDate" type="text">' + dataInfoConsult.date + '</label>';
    html += '</div>';
    html += '</div>';
    html += '<div class="form-group">';
    html += '<label>Descripción:</label>';
    html += '<div>';
    html += '<textarea rows="4" cols="50" type="text" name="dConsultDescription" id="dConsultDescription" class="form-control" placeholder="Descripción" disabled>' + dataInfoConsult.description + '</textarea>';
    html += '</div>';
    html += '</div>';
    html += '<div class="modal-footer mt-4">';
    html += '<div class="col-12">';
    html += '<textarea rows="4" cols="50" type="text" name="dConsultComment" id="dConsultComment" required="" class="form-control" placeholder="Comentario"></textarea>';
    html += '</div>';
    html += '</div>';
    html += '<div class="modal-footer mt-4">';
    html += '<div class="col-12">';
    html += '<button type="button" class="btn btn-success" onclick="return addComment(' + dataInfoConsult.id+ ')">Comentar</button>';
    html += '</div>';
    html += '</div>';
    html += '</form>';
    html += '</div>';
   
    $('.modal-contentConsult').html(html);
    document.getElementById("dConsultId").disabled = true;
    document.getElementById("dConsultCourse").disabled = true;
    document.getElementById("dConsultDate").disabled = true;

});

$("#consultTable tbody").on("click", "#btnModalComments", function () {
    modalConsultComments.style.display = "block";

    var dataInfoConsult = tableConsult.row($(this).parents("tr")).data();
    
    loadConsultListComments(dataInfoConsult.id);
    

});