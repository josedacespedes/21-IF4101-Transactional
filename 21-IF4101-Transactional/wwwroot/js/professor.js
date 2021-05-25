"use strict";

var formProfessor = document.getElementById("registerProfessorForm");
var professor;
var alertMessageAddProfessor = document.getElementById("alertMessageAddProfessor");
var tableProfessor;
var tableGroup = $("#professorGroupTable").DataTable;
var formConsultTime = document.getElementById("formConsultTime");
var dataInfoGroup;
var dataInfoProfessor;
//MASK
$(document).ready(function () {
    $('#idProfessor').mask('P-00000');
    loadListProfessor();
});

/*--------------------------------------------- ADD PROFESSOR-----------------------------------------------------------*/
//SHOW/HID PASSWORD
$('#showPasswordProfessor').hover(function () {
    $('#passwordProfessor').attr('type', 'text');
}, function () {
    $('#passwordProfessor').attr('type', 'password');
});

//VALIDATIONS
function checkFirstNameProfessor(firstName) {
    if ((firstName.length < 3 || firstName.length > 50) || !(/^[a-zA-Z \u00E0-\u00FC\u00f1\u00d1]+$/.test(firstName)) || !firstName) {
        return false;
    } else {
        return true;
    }
}

function checkLastNameProfessor(lastName) {
    if ((lastName.length < 10 || lastName.length > 100) || !(/^[a-zA-Z \u00E0-\u00FC\u00f1\u00d1]+$/.test(lastName)) || lastName.indexOf(' ') < 0 || !lastName) {
        return false;
    } else {
        return true;
    }
}

function checkIdProfessor(professorId) {
    var initialLetters = professorId.substring(0, 2);
    var restNumeric = professorId.substring(2, professorId.length);

    if ((professorId.length != 7) || (initialLetters != "P-") || (isNaN(restNumeric)) || !professorId) {
        return false;
    } else {
        return true;
    }
}

function checkEmailProfessor(email) {

    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@ucr\.ac\.cr/.test(email)) || !email) {
        return false;
    } else {
        return true;
    }
}

function checkPasswordProfessor(password) {
    if ((password.length != 8) || !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!.#$%^&*_=+-]).*$/.test(password)) || !password) {
        return false;
    } else {
        return true;
    }
}

function cleanErrorInputProfessor() {
    $('#firstNameProfessor').removeClass("formInput-error");
    $('#lastNameProfessor').removeClass("formInput-error");
    $('#idProfessor').removeClass("formInput-error");
    $('#emailProfessor').removeClass("formInput-error");
    $('#passwordProfessor').removeClass("formInput-error");
}

function putErrorInputProfessor(professor) {
    cleanErrorInputProfessor();
    var validate = false;

    if (!checkFirstNameProfessor(professor.firstNameProfessor)) {
        $('#firstNameProfessor').addClass("formInput-error");
        validate = true;
    }
    if (!checkLastNameProfessor(professor.lastNameProfessor)) {
        $('#lastNameProfessor').addClass("formInput-error");
        validate = true;
    }
    if (!checkIdProfessor(professor.idProfessor)) {
        $('#idProfessor').addClass("formInput-error");
        validate = true;
    }
    if (!checkEmailProfessor(professor.emailProfessor)) {
        $('#emailProfessor').addClass("formInput-error");
        validate = true;
    }
    if (!checkPasswordProfessor(professor.passwordProfessor)) {
        $('#passwordProfessor').addClass("formInput-error");
        validate = true;
    }
    return validate;
}

function randomPassword() {
    var lower = "abcdefghijklmnopqrstuvwxyz";
    var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numbers = "0123456789";
    var symbols = "!@#$%&*.-+=";
    var pass = "";
    pass += upper[Math.floor(Math.random() * 26)];
    for (var i = 0; i < 5; i++) {
        pass += lower[Math.floor(Math.random() * 26)];
    }
    pass += numbers[Math.floor(Math.random() * 10)];
    pass += symbols[Math.floor(Math.random() * 11)];
}

//HIDE MSG FORM
$("#firstNameProfessor").click(function () {
    alertMessageAddProfessor.innerHTML = "";
});
$("#idProfessor").click(function () {
    alertMessageAddProfessor.innerHTML = "";
});

//ACTION ADD
formProfessor.addEventListener("submit", function (e) {
    e.preventDefault();

    var professor = {
        firstNameProfessor: $('#firstNameProfessor').val(),
        lastNameProfessor: $('#lastNameProfessor').val(),
        idProfessor: $('#idProfessor').val(),
        emailProfessor: $('#emailProfessor').val(),
        passwordProfessor: randomPassword()//$('#passwordProfessor').val()
    };

    if (!putErrorInputProfessor(professor)) {
        //AJAX
        $.ajax({
            url: "/Professor/Insert",
            data: JSON.stringify(professor),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result == -1) {
                    $('#idProfessor').addClass("formInput-error");
                    alertMessageAddProfessor.innerHTML = `<label class="text-danger">Profesor ya existe</label>`;//Msg  existence
                } else if (result == -2) {
                    $('#emailProfessor').addClass("formInput-error");
                    alertMessageAddProfessor.innerHTML = `<label class="text-danger">El Correo Institucional ya existe</label>`;//Msg  existence
                } else {
                    alertMessageAddProfessor.innerHTML = `<label class="text-success">Registro exitoso</label>`;//Msg enter success
                    formProfessor.reset(); //Clean form fields
                    sendEmailProfessor(professor.firstNameProfessor, professor.emailProfessor, professor.passwordProfessor); //Send email
                    $('#professorTable').DataTable().ajax.reload();
                }
            },
            error: function (errorMessage) {
                alert("Error");
                alert(errorMessage.responseText);
            }
        });
    }

});


function sendEmailProfessor(nameProfessor, emailProfessor, passwordProfessor) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "ucrtransactionaladm1n@gmail.com",
        Password: "usuarioadmin",
        To: emailProfessor,
        From: "ucrtransactionaladm1n@gmail.com",
        Subject: `Administrator 21-IF4101-Transactional`,
        Body: `Welcome to the system ${nameProfessor}, you have been registered as a Professor.<br/>
        Log in with the following:<br/>
        Email: ${emailProfessor} <br/> 
        Password: ${passwordProfessor}`,
    });
}


/*--------------------------------------------- LIST PROFESSOR-----------------------------------------------------------*/
function loadListProfessor() {
    tableProfessor = $("#professorTable").DataTable({
        "destroy": true,
        "autoWidth": false,
        "ajax": {
            "url": "/Professor/Get",
            "tpye": 'GET',
            "datatype": "json"
        },
        lengthMenu: [7, 20, 50, 100],
        "columns": [
            { "data": "idProfessor" },
            {
                render: function (data, type, row) {
                    return row.firstNameProfessor + " " + row.lastNameProfessor;
                }
            },
            { "data": "emailProfessor" },
            { defaultContent: "<button id='professorGroupModal' name='professorGroupModal' type='button' data-toggle='modal' data-target='#modalProfessorGroup' class='btn btn-primary' title='Asociar'><i class='fa fa-users'></i></button>" }
        ]
    });
}

/*--------------------------------------------- LIST GROUP-----------------------------------------------------------*/
function loadListGroup(id) {
    tableGroup = $("#professorGroupTable").DataTable({
        "destroy": true,
        "autoWidth": false,
        "ajax": {
            "url": "/Course/GetGroupByIdCourse/" + id,
            "tpye": 'GET',
            "datatype": "json",

        },
        lengthMenu: [7, 20, 50, 100],
        "columns": [
            { "data": "idGroup" },
            { "data": "numGroup" },
            { defaultContent: "<button id='groupModal' name='groupModal' type='button' data-toggle='modal' data-target='#modalProfessorConsultTime' class='btn btn-primary' title='Horas consulta'><i class='fa fa-calendar'></i></button>" }
        ]
    });
}

/*--------------------------------------------- OPEN MODAL PROFESSOR-GROUP-----------------------------------------------------------*/

$("#professorTable tbody").on("click", "#professorGroupModal", function () {
    dataInfoProfessor = tableProfessor.row($(this).parents("tr")).data();
    document.getElementById("professorTitleModal").innerHTML = `<h4>Profesor: ${dataInfoProfessor.firstNameProfessor}  ${dataInfoProfessor.lastNameProfessor} </h4>`;
    GetCourseGroup();
    //tableGroup.clear().draw();
});

/*--------------------------------------------- GET COURSES-----------------------------------------------------------*/

function GetCourseGroup() {
    $("#professorgroup").empty();
    $("#professorgroup").html('<option value="0" selected="">seleccione el curso</option>');


    $.ajax({
        url: "/Consult/GetCourses",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //llenar el dropdowns (select)
            var html = '';
            $.each(result, function (key, item) {
                html += '<option id="courseOptionGroup" value="' + item.id + '">' + item.code + ' ' + item.name + '</option>';
            });
            $('#professorgroup').append(html);

        },
        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });
}

$('#professorgroup').on('change', function () {

    loadListGroup(this.value);
});

function GetWeekdays() {
    $("#dayConsultProfessor").empty();
    $("#dayConsultProfessor").html('<option value="" selected=""> Seleccione el día de consulta</option>');

    $.ajax({
        url: "/Professor/GetWeekDays",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var i = 1;
            //llenar el dropdowns (select)
            var html = '';
            $.each(result, function (key, item) {
                html += '<option id="dayOptionId" value="' + i + '">' + item + '</option>';
                i++;
            });
            $('#dayConsultProfessor').append(html);
        },
        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });
}

$("#professorGroupTable tbody").on("click", "#groupModal", function () {
    $("#showConsultTime").val("");
    dataInfoGroup = tableGroup.row($(this).parents("tr")).data();
    document.getElementById("consultTimeTitleModal").innerHTML = `<h4>Grupo: ${dataInfoGroup.numGroup}</h4>`;
    GetWeekdays();
    getConsultTime();
});

var timeConsult = "";

formConsultTime.addEventListener("submit", function (e) {
    e.preventDefault();
    var day = $('#dayConsultProfessor option:selected').text();
    var startTime = $('#startHourConsult').val();
    var endTime = $('#endHourConsult').val();

    if (startTime < endTime) {
        timeConsult += day + ':' + startTime + '-' + endTime + ',';
        var details = timeConsult.replaceAll(",", "\n");
        $('#showConsultTime').val(details);

        formConsultTime.reset();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La hora de final no puede ser mayor a la hora de inicio!'
        })
    }
});

function cleanFieldsModalConsultTime() {
    timeConsult = "";
    formConsultTime.reset();
}

$("#buttonSaveConsultTime").on("click", function () {

    var idGroupP = parseInt(dataInfoGroup.idGroup);
    var idProfessorP = parseInt(dataInfoProfessor.id);
    var consultationHoursP = timeConsult;

    if (timeConsult != "") {
        $.ajax({
            url: "/Professor/InsertProfessorGroup",
            data: { idGroup: idGroupP, idProfessor: idProfessorP, consultationHours: consultationHoursP },
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('#modalProfessorConsultTime').modal('hide');

                Swal.fire({
                    icon: 'success',
                    title: 'Guardado exitoso',
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

/*--------------------------------------------- GET CONSULT TIME -----------------------------------------------------------*/

function getConsultTime() {
    $.ajax({
        url: "/Professor/GetConsultTime",
        data: { idGroup: parseInt(dataInfoGroup.idGroup), idProfessor: parseInt(dataInfoProfessor.id) },
        type: "GET",
        contentType: "application/json;charset=utf-8",

        success: function (result) {
            if (result != "0") {
                var consultTime = result.replaceAll(",", "\n");
                $('#showConsultTime').val(consultTime);
            }
        },
        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });
}

