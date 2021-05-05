"use strict";

var formProfessor = document.getElementById("registerProfessorForm");
var professor;
var alertMessageAddProfessor = document.getElementById("alertMessageAddProfessor");
var tableProfessor;

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
        passwordProfessor: $('#passwordProfessor').val()
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
                    alertMessageAddProfessor.innerHTML = `<label class="text-danger">Professor is already exist</label>`;//Msg  existence
                } else if (result == -2) {
                    $('#emailProfessor').addClass("formInput-error");
                    alertMessageAddProfessor.innerHTML = `<label class="text-danger">Email is already exist</label>`;//Msg  existence
                } else {
                    alertMessageAddProfessor.innerHTML = `<label class="text-success">Register successfully</label>`;//Msg enter success
                    formProfessor.reset(); //Clean form fields
                    sendEmailProfessor(professor.firstNameProfessor, professor.emailProfessor, professor.passwordProfessor); //Send email
                    tableProfessor.ajax.reload();
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
            { defaultContent: "<button id='' name='' type='button' data-bs-toggle='' data-bs-target='' class='btn btn-primary' title='Grupos'><i class='fa fa-link'></i></button>" }
        ]
    });
}

