"use strict";

var registerConsultForm = document.getElementById("registerConsultForm");
var messageToSend = document.getElementById("alertMessageAddConsult");
var tableCourse;
$(document).ready(function () {
    GetCourseConsult();
    loadConsultList();
});

//ACTION ADD
registerConsultForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var checkStatus = $("input[name='consultTypeCheck']").is(':checked') ? 1 : 0; //Validate if th input is checked or not

    var consult = {
        title: $('#consultTitle').val(),
        description: $('#consultDescription').val(),
        course: parseInt($('#courseConsult').val()),
        type: parseInt(checkStatus)
    };
    console.log(consult);
    if (consult.title == "" && consult.description == "" && consult.course == 0) {
        $('#consultTitle').addClass("formInput-error");
        $('#consultDescription').addClass("formInput-error");
        $('#courseConsult').addClass("formInput-error");
        $('#consultTypeCheck').addClass("formInput-error");
        return false;
    } else if (consult.title == "") {
        $('#consultTitle').addClass("formInput-error");
        return false;
    } else if (consult.description == "") {
        $('#consultDescription').addClass("formInput-error");
        return false;
    } else if (consult.course == 0) {
        $('#consultTypeCheck').addClass("formInput-error");
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
                    messageToSend.innerHTML = "<label class='text-success'>Consulta agregada exitosamente</label>";
                    
                    $('#consultTable').DataTable().ajax.reload();
                    $('#consultTitle').val("");
                    $('#consultDescription').val("");
                    $('#courseConsult').val(0);
                } else if (result == 3) {
                    $('#idCourse').addClass("formInput-error");
                    messageToSend.innerHTML = "<label class='text-danger'>Esta consulta ya existe</label>";
                }
                else {
                    messageToSend.innerHTML = "<label class='text-danger'>Error al ingresar consulta</label>";
                }
            },
            error: function (errorMessage) {
                alert("Error");
                alert(errorMessage.responseText);
            }
        });
    }
});

function loadConsultList() {
    tableConsult = $("#consultTable").DataTable({
        "destroy": true,
        "autoWidth": false,
        "ajax": {
            "url": "/Consult/Get",
            "tpye": 'GET',
            "datatype": "json"
        },
        lengthMenu: [7, 20, 50, 100],
        "columns": [
            { "data": "title" },
            { "data": "date" },
            { "data": "course" },
            {
                render: function (data, type, row) {
                    return row.type == 1 ? 'Pública' : 'Privada';
                },

            },
            { defaultContent: "<button id='btnModalDetails' name='btnModalDetails' type='button' data-toggle='modal' class='btn btn-primary' data-target='#consultModal' title='Detalles'><i class='fa fa-file-text'></i></button><button id='' name='' type='button' data-bs-toggle='' data-bs-target='' class='btn btn-info' title='Comentarios'><i class='fa fa-comments'></i></button>" }
        ]
    });
}


function GetCourseConsult() {

    $.ajax({
        url: "/Consult/GetCourses",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //llenar el dropdowns (select)
            var html = '';
            $.each(result, function (key, item) {
                html += '<option value="' + item.id + '">' + item.name + '</option>';
            });
            $('#courseConsult').append(html);
        },
        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });
}

// Get the modal
var modalConsult = document.getElementById("consultModal");



// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modalConsult.style.display = "none";
}
function closeDetails() {
    modalConsult.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modalConsult) {
        modalConsult.style.display = "none";
    }
}

$("#consultTable tbody").on("click", "#btnModalDetails", function () {
    modalConsult.style.display = "block";
    var dataInfoCourse = tableConsult.row($(this).parents("tr")).data();
    $.ajax({
        url: "/Consult/GetById", //MVC NORMAL
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: { "id": idConsult },
        success: function (result) {

            var html = '';

            //console.log(result);

            html += '<br/>';
            html += '<label id="lstudentIdUpdate">ID</label>';
            html += '<input  id="studentIdUpdate" type="text" disabled value="' + result.studentId + '">';
            html += '<br/>';
            html += '<label id="lnameUpdate">Name</label>';
            html += '<input id="nameUpdate" type="text" value="' + result.name + '">';
            html += '<br/>';
            html += '<label id="lemailUpdate">Email</label>';
            html += '<input id="emailUpdate" type="text" value="' + result.email + '">';
            html += '<br/>';
            html += '<label id="lmajorUpdate">Major</label>';
            html += '<select class="form-control without-margin" name="majorUpdate" id="majorUpdate"><option value="0" >Select your major</option></select > ';
            html += '<br/>';
            html += '<label id="lnationalityUpdate">Nationality</label>';
            html += '<select class="form-control without-margin" required name="nationalityUpdate" id="nationalityUpdate"><option value="0" selected>Select your nationality</option></select>';
            //html += '<input id="nationalityUpdate" type="text" value="' + result.nationality.name + '">';
            html += '<br/>';
            html += '<label id="lpasswordUpdate">Password</label>';
            html += '<input id="passwordUpdate" type="text" value="' + result.password + '">';
            html += '<br/>';
            html += '<br/>';
            html += '<button id="AcceptUpdate" onclick="return closeDetails()">Aceptar</button>';
            html += '<button id="CancelUpdate" onclick="return closeDetails()">Cancelar</button>';


            $('.modal-contentConsult').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })

});