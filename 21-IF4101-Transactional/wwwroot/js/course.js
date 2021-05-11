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

    var checkStatus = $("input[name='courseStatus']").is(':checked') ? 1 : 0; //Validate if th input is checked or not

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
            {
                defaultContent: "<button type='button' id='modalCourseGroup' name='modalCourseGroup' class='btn btn-primary' data-toggle='modal' data-target='#myModal'><i class='fa fa-link'></i></button>"
            }
        ]

    });
}

function calculateGroupsAmount() {

    var groupsAmount = document.getElementById("groupsAmount").value;
    var associateGroupCourse = document.getElementById("associateGroupCourse").value;

    /* Solo deja ingresar numeros */
    jQuery('#associateGroupCourse').keypress(function (tecla) {
        if (tecla.charCode < 48 || tecla.charCode > 57) return false;
    });

    var groups = [];
    var i;

    for (i = 0; i < groupsAmount; i++) {
        groups += [associateGroupCourse++ + ","];
    }
    //console.log(acumula);

    if (associateGroupCourse == "") {
        document.getElementById("showAssociation").innerHTML = `<textarea class="form-control" rows="5" id="showAssociation" placeholder="Cursos agregados: " disabled></textarea>`;
    } else {
        document.getElementById("showAssociation").innerHTML = `Cursos agregados: ${groups}`;
    }
    return groups;
}

function cleanFieldsModalCourseGroup() {
    document.getElementById("groupsAmount").value = "";
    document.getElementById("associateGroupCourse").value = "";
    document.getElementById("showAssociation").value = "Cursos agregados: ";
}


registerCourseGroup.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log(calculateGroupsAmount());


    //var list = [parseInt($('#groupsAmount').val()), parseInt($('#associateGroupCourse').val())];
    //var course = {
    //    id: parseInt($('#id').val()),
    //    numGroup: list
    //};

    //$.ajax({
    //    url: "/Course/InsertGroup",
    //    data: JSON.stringify(course),
    //    type: "POST",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        alert("NICE!");
    //    },
    //    error: function (errorMessage) {
    //        alert("Error");
    //        alert(errorMessage.responseText);
    //    }
    //});

});




//function LoadDataCourse() {
//    $.ajax({
//        url: "/Course/Get", //MVC NORMAL
//        type: "GET",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {

//            console.log(result);
///*            document.getElementById("courseTitleModal").innerHTML = `<h3>Curso:` + result.code + '-' + result.name + `</h3>`;*/


//            var html = 'Curso: ';
//            $.each(result, function (key, item) {

//                //document.getElementById("courseTitleModal").innerHTML = `<h3>Curso:`+ item.code+ '-'+ item.name +`</h3>`;

//                console.log(item);
//                html += '<h3>' + item.code + '-' + item.name +'</h3>';
//            });
//            $('#courseTitleModal').html(html);

//        },
//        error: function (errorMessage) {
//            alert(errorMessage.responseText);
//        }
//    })

//}