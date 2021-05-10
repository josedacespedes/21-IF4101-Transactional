"use strict";

var registerConsultForm = document.getElementById("registerConsultForm");
var messageToSend = document.getElementById("alertMessageAddConsult");
var tableCourse;
$(document).ready(function () {
    GetCourse();
});

//ACTION ADD
registerConsultForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var checkStatus = $("input[name='consultTypeCheck']").is(':checked') ? 1 : 0; //Validate if th input is checked or not
    
    var Course = {
        id: parseInt($('#courseConsult').val()),
        code: null,
        name: null,
        credits: null,
        state: null
    };
    var consult = {
        title: $('#consultTitle').val(),
        idAuthor: parseInt($('#consultIdAuthor').val()),
        description: $('#consultDescription').val(),
        course: Course,
        type: parseInt(checkStatus)
    };
    console.log(consult);
    if (consult.title == "" && consult.idAuthor == "" && consult.description == "" && consult.course.id == 0) {
        $('#consultTitle').addClass("formInput-error");
        $('#consultDescription').addClass("formInput-error");
        $('#courseConsult').addClass("formInput-error");
        $('#consultTypeCheck').addClass("formInput-error");
        return false;
    } else if (consult.title == "") {
        $('#consultTitle').addClass("formInput-error");
        return false;
    } else if (consult.idAuthor == "") {
        $('#consultIdAuthor').addClass("formInput-error");
        return false;
    } else if (consult.description == "") {
        $('#consultDescription').addClass("formInput-error");
        return false;
    } else if (consult.course.id == 0) {
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
                    //registerCourseForm.reset();
                    $('#consultTable').DataTable().ajax.reload();
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

//function loadCourseList() {
//    tableCourse = $("#courseTable").DataTable({
//        "destroy": true,
//        "autoWidth": false,
//        "ajax": {
//            "url": "/Consult/Get",
//            "tpye": 'GET',
//            "datatype": "json"
//        },
//        lengthMenu: [7, 20, 50, 100],
//        "columns": [
//            { "data": "id" },
//            { "data": "name" },
//            { "data": "credits" },
//            {
//                render: function (data, type, row) {
//                    return row.state == 1 ? 'Disponible' : 'No disponible';
//                }
//            },
//            { defaultContent: "<button id='' name='' type='button' data-bs-toggle='' data-bs-target='' class='btn btn-primary' title='Grupos'><i class='fa fa-link'></i></button>" }
//        ]
//    });
//}


//function GetCourse() {

//    $.ajax({
//        url: "/Consult/GetCourses",
//        type: "GET",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            //llenar el dropdowns (select)
//            var html = '';
//            $.each(result, function (key, item) {
//                html += '<option value="' + item.id + '">' + item.name + '</option>';
//            });
//            $('#courseConsult').append(html);
//        },
//        error: function (errorMessage) {
//            alert("Error");
//            alert(errorMessage.responseText);
//        }
//    });
//}

//VALIDATIONS

function checkConsultStatus(checkStatus) {
    if ((checkStatus < 0 || checkStatus > 1)) {
        return false;
    } else {
        return true;
    }
}

function cleanErrorInputConsult() {
    $('#consultTitle').removeClass("formInput-error");
    $('#consultDescription').removeClass("formInput-error");
    $('#consultIdAuthor').removeClass("formInput-error");
    $('#consultTypeCheck').removeClass("formInput-error");
}

function putErrorInputConsult(Consult) {
    cleanErrorInputCourse();
    var validate = false;
    if (!checkConsultName(Consult.title)) {
        $('#consultTitle').addClass("formInput-error");
        validate = true;
    }
    if (!checkConsultDescription(Consult.description)) {
        $('#consultDescription').addClass("formInput-error");
        validate = true;
    }
    if (!checkConsultCourse(Consult.Course.id)) {
        $('#courseConsult').addClass("formInput-error");
        validate = true;
    }
    if (!checkConsultStatus(Consult.checkStatus)) {
        $('#consultTypeCheck').addClass("formInput-error");
        validate = true;
    }
    return validate;
}

//HIDE MSG FORM
//$("#idCourse").click(function () {
//    messageToSend.innerHTML = "";
/*});*/