"use strict";

var registerCourseForm = document.getElementById("registerCourseForm");
var messageToSend = document.getElementById("alertMessageAddCourse");
var tableCourse;

/*--------------------------------------------- ADD COURSE-----------------------------------------------------------*/

//MASK
$(document).ready(function () {
    $('#idCourse').mask('IF-0000');
    loadCourseList();
});

//VALIDATIONS
function checkCourseName(course) {
    if ((course.length < 10 || course.length > 150) || !(/^[a-zA-Z \u00E0-\u00FC\u00f1\u00d1]+$/.test(course)) || !course) {
        return false;
    } else {
        return true;
    }
}

function checkCourseCode(courseCode) {
    var initialLetters = courseCode.substring(0, 3);
    var restNumeric = courseCode.substring(3, courseCode.length);

    if ((courseCode.length != 7) || (initialLetters != "IF-") || (isNaN(restNumeric)) || !courseCode) {
        return false;
    } else {
        return true;
    }
}

function checkCourseCreditsNumber(courseCreditsNumber) {

    if ((courseCreditsNumber < 1 || courseCreditsNumber > 6)) {
        return false;
    } else {
        return true;
    }
}

function checkCourseStatus(courseStatus) {
    if ((courseStatus < 0 || courseStatus > 1)) {
        return false;
    } else {
        return true;
    }
}

function cleanErrorInputCourse() {
    $('#courseName').removeClass("formInput-error");
    $('#idCourse').removeClass("formInput-error");
    $('#creditsNumber').removeClass("formInput-error");
    $('#courseStatus').removeClass("formInput-error");
}

function putErrorInputCourse(Course) {
    cleanErrorInputCourse();
    var validate = false;

    if (!checkCourseName(Course.name)) {
        $('#courseName').addClass("formInput-error");
        validate = true;
    }
    if (!checkCourseCode(Course.code)) {
        $('#idCourse').addClass("formInput-error");
        validate = true;
    }
    if (!checkCourseCreditsNumber(Course.credits)) {
        $('#creditsNumber').addClass("formInput-error");
        validate = true;
    }
    if (!checkCourseStatus(Course.state)) {
        $('#courseStatus').addClass("formInput-error");
        validate = true;
    }
    return validate;
}

//HIDE MSG FORM
$("#idCourse").click(function () {
    messageToSend.innerHTML = "";
});


//ACTION ADD
registerCourseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var checkStatus =  $("input[name='courseStatus']").is(':checked') ? 1 : 0; //Validate if th input is checked or not

    var course = {
        name: $('#courseName').val(),
        code: $('#idCourse').val(),
        credits: parseInt($('#creditsNumber').val()),
        state: checkStatus
    };

    if (!putErrorInputCourse(course)) {
        $.ajax({
            url: "/Course/Insert",
            data: JSON.stringify(course),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result == 1) {
                    messageToSend.innerHTML = "<label class='text-success'>Curso agregado exitosamente</label>";
                    registerCourseForm.reset();
                    $('#courseTable').DataTable().ajax.reload();
                } else if (result == 3) {
                    $('#idCourse').addClass("formInput-error");
                    messageToSend.innerHTML = "<label class='text-danger'>Este curso ya existe</label>";
                }
                else {
                    messageToSend.innerHTML = "<label class='text-danger'>Error al ingresar credenciales</label>";
                }
            },
            error: function (errorMessage) {
                alert("Error");
                alert(errorMessage.responseText);
            }
        });
    }
});

function loadCourseList() {
    tableCourse = $("#courseTable").DataTable({
        "destroy": true,
        "autoWidth": false,
        "ajax": {
            "url": "/Course/Get",
            "tpye": 'GET',
            "datatype": "json"
        },
        lengthMenu: [7, 20, 50, 100],
        "columns": [
            { "data": "code" },
            { "data": "name" },
            { "data": "credits" },
            {
                render: function (data, type, row) {
                    return row.state == 1 ? 'Disponible' : 'No disponible';
                }
            },
            { defaultContent: "<button id='' name='' type='button' data-bs-toggle='' data-bs-target='' class='btn btn-primary' title='Grupos'><i class='fa fa-link'></i></button>" }
        ]
    });
}

