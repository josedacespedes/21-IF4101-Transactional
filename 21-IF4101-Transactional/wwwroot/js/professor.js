"use strict";

var formProfessor = document.getElementById("registerProfessorForm");

/*--------------------------------------------- ADD PROFESSOR-----------------------------------------------------------*/

//SHOW/HID PASSWORD
$('#showPasswordProfessor').hover(function () {
    $('#passwordProfessor').attr('type', 'text');
}, function () {
    $('#passwordProfessor').attr('type', 'password');
});

//MASK
$(document).ready(function () {
    $('#idProfessor').mask('P-00000');
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

function putErrorInputProfessor() {
    cleanErrorInputProfessor();
    var validate = true;
    var Professor = {
        firstNameProfessor: $('#firstNameProfessor').val(),
        lastNameProfessor: $('#lastNameProfessor').val(),
        idProfessor: $('#idProfessor').val(),
        emailProfessor: $('#emailProfessor').val(),
        passwordProfessor: $('#passwordProfessor').val()
    };

    if (!checkFirstNameProfessor(Professor.firstNameProfessor)) {
        $('#firstNameProfessor').addClass("formInput-error");
        validate = false;
    }
    if (!checkLastNameProfessor(Professor.lastNameProfessor)) {
        $('#lastNameProfessor').addClass("formInput-error");
        validate = false;
    }
    if (!checkIdProfessor(Professor.idProfessor)) {
        $('#idProfessor').addClass("formInput-error");
        validate = false;
    }
    if (!checkEmailProfessor(Professor.emailProfessor)) {
        $('#emailProfessor').addClass("formInput-error");
        validate = false;
    }
    if (!checkPasswordProfessor(Professor.passwordProfessor)) {
        $('#passwordProfessor').addClass("formInput-error");
        validate = false;
    }
    return validate;
}

//ACTION ADD
formProfessor.addEventListener("submit", function (e) {
    e.preventDefault();

    if (putErrorInputProfessor()) {
        //AJAX
    }

});
