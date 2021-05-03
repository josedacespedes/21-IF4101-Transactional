"use strict";

var formApplicant = document.getElementById("registerApplicantForm");

/*--------------------------------------------- ADD STUDENT-----------------------------------------------------------*/

//SHOW/HID PASSWORD
$('#showPasswordApplicant').hover(function () {
    $('#passwordApplicant').attr('type', 'text');
}, function () {
    $('#passwordApplicant').attr('type', 'password');
});

//VALIDATIONS
function checkFirstNameApplicant(firstName) {
    if ((firstName.length < 3 || firstName.length > 50) || !(/^[a-zA-Z \u00E0-\u00FC\u00f1\u00d1]+$/.test(firstName)) || !firstName) {
        return false;
    } else {
        return true;
    }
}

function checkLastNameApplicant(lastName) {
    if ((lastName.length < 10 || lastName.length > 100) || !(/^[a-zA-Z \u00E0-\u00FC\u00f1\u00d1]+$/.test(lastName)) || lastName.indexOf(' ') < 0 || !lastName) {
        return false;
    } else {
        return true;
    }
}

function checkStudentIdApplicant(studentId) {
    var initialLetter = studentId.charAt(0);
    var restNumeric = studentId.substring(1, studentId.length);

    if ((studentId.length != 6) || (initialLetter != initialLetter.toUpperCase()) || (isNaN(restNumeric)) || !studentId) {
        return false;
    } else {
        return true;
    }
}

function checkEmailApplicant(email) {

    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@ucr\.ac\.cr/.test(email)) || !email) {
        return false;
    } else {
        return true;
    }
}

function checkPasswordApplicant(password) {
    if ((password.length != 8) || !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!.#$%^&*_=+-]).*$/.test(password)) || !password) {
        return false;
    } else {
        return true;
    }
}

function cleanErrorInput() {
    $('#firstNameApplicant').removeClass("formInput-error");
    $('#lastNameApplicant').removeClass("formInput-error");
    $('#studentIdApplicant').removeClass("formInput-error");
    $('#emailApplicant').removeClass("formInput-error");
    $('#passwordApplicant').removeClass("formInput-error");
}

function putErrorInput() {
    cleanErrorInput();
    var validate = true;
    var Applicant = {
        firstNameApplicant: $('#firstNameApplicant').val(),
        lastNameApplicant: $('#lastNameApplicant').val(),
        studentIdApplicant: $('#studentIdApplicant').val(),
        emailApplicant: $('#emailApplicant').val(),
        passwordApplicant: $('#passwordApplicant').val()
    };

    if (!checkFirstNameApplicant(Applicant.firstNameApplicant)) {
        $('#firstNameApplicant').addClass("formInput-error");
        validate = false;
    }
    if (!checkLastNameApplicant(Applicant.lastNameApplicant)) {
        $('#lastNameApplicant').addClass("formInput-error");
        validate = false;
    }
    if (!checkStudentIdApplicant(Applicant.studentIdApplicant)) {
        $('#studentIdApplicant').addClass("formInput-error");
        validate = false;
    }
    if (!checkEmailApplicant(Applicant.emailApplicant)) {
        $('#emailApplicant').addClass("formInput-error");
        validate = false;
    }
    if (!checkPasswordApplicant(Applicant.passwordApplicant)) {
        $('#passwordApplicant').addClass("formInput-error");
        validate = false;
    }
    return validate;
}

//ACTION ADD
formApplicant.addEventListener("submit", function (e) {
    e.preventDefault();

    if (putErrorInput()) {
        //AJAX
    }

});
