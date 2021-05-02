"use strict";

var formStudent = document.getElementById("registerStudentForm");

/*--------------------------------------------- ADD STUDENT-----------------------------------------------------------*/

//SHOW/HID PASSWORD
$('#showPasswordSudent').hover(function () {
    $('.password').attr('type', 'text');
}, function () {
    $('.password').attr('type', 'password');
});

//VALIDATIONS
var firstName = $('#formFirstNameStudent').val();
var lastName = $('#formLastNameStudent').val();
var studentId = $('#formIdStudent').val();
var email = $('#formEmailStudent').val();
var password = $('#formPasswordStudent').val();

function checkFirstName() {
    if ((firstName.length < 3 || firstName.length > 50) || !(isNaN(firstName)) || typeof firstName === 'symbol' || !firstName) {
        return false;
    } else {
        return true;
    }
}

function checkLastName() {
    if ((lastName.length < 10 || lastName.length > 100) || !(isNaN(lastName)) || typeof lastName === 'symbol' || lastName.indexOf(' ') >= 0 || !lastName) {
        return false;
    } else {
        return true;
    }
}

function checkStudentId() {
    var initialLetter = studentId.charAt(0);
    var restNumeric = studentId.substring(1, studentId.length);

    if ((studentId.length != 6) || !(initialLetter == initialLetter.toUpperCase()) || !(isNaN(restNumeric)) || !studentId) {
        return false;
    } else {
        return true;
    }
}

function checkEmail() {

    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@ucr\.ac\.cr/.test(email)) || !email) {
        return false;
    } else {
        return true;
    }
}

function checkPassword() {

    if (!(password.length != 8) || !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.* [!.#$ %^&*_=+-]).{ 8, 8 } $/.test(password)) || !password) {
        return false;
    } else {
        return true;
    }
}


function cleanErrorInput() {
    $('#formFirstNameStudent').removeClass("formInput-error");
    $('#formLastNameStudent').removeClass("formInput-error");
    $('#formIdStudent').removeClass("formInput-error");
    $('#formEmailStudent').removeClass("formInput-error");
    $('#formPasswordStudent').removeClass("formInput-error");
}

function putErrorInput() {
    cleanErrorInput();
    var validate = true;

    if (!checkFirstName()) {
        $('#formFirstNameStudent').addClass("formInput-error");
        validate = false;
    }
    if (!checkLastName()) {
        $('#formLastNameStudent').addClass("formInput-error");
        validate = false;
    }
    if (!checkStudentId()) {
        $('#formIdStudent').addClass("formInput-error");
        validate = false;
    }
    if (!checkEmail()) {
        $('#formEmailStudent').addClass("formInput-error");
        validate = false;
    }
    if (!checkPassword()) {
        $('#formPasswordStudent').addClass("formInput-error");
        validate = false;
    }
    return validate;
}

//ACTION ADD
formStudent.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!putErrorInput()) {
        //AJAX
    }

});
