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
function checkFirstName(firstName) {
    if ((firstName.length < 3 || firstName.length > 50) || !(/^[a-zA-Z \u00E0-\u00FC\u00f1\u00d1]+$/.test(firstName)) || !firstName) {
        return false;
    } else {
        return true;
    }
}

function checkLastName(lastName) {
    if ((lastName.length < 10 || lastName.length > 100) || !(/^[a-zA-Z \u00E0-\u00FC\u00f1\u00d1]+$/.test(lastName)) || lastName.indexOf(' ') < 0 || !lastName) {
        return false;
    } else {
        return true;
    }
}

function checkStudentId(studentId) {
    var initialLetter = studentId.charAt(0);
    var restNumeric = studentId.substring(1, studentId.length);

    if ((studentId.length != 6) || (initialLetter != initialLetter.toUpperCase()) || (isNaN(restNumeric)) || !studentId) {
        return false;
    } else {
        return true;
    }
}

function checkEmail(email) {

    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@ucr\.ac\.cr/.test(email)) || !email) {
        return false;
    } else {
        return true;
    }
}

function checkPassword(password) {
    if ((password.length != 8) || !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!.#$%^&*_=+-]).*$/.test(password)) || !password) {
        return false;
    } else {
        return true;
    }
}

function cleanErrorInput() {
    $('#firstName').removeClass("formInput-error");
    $('#lastName').removeClass("formInput-error");
    $('#studentId').removeClass("formInput-error");
    $('#email').removeClass("formInput-error");
    $('#password').removeClass("formInput-error");
}

function putErrorInput() {
    cleanErrorInput();
    var validate = true;
    var student = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        studentId: $('#studentId').val(),
        email: $('#email').val(),
        password: $('#password').val()
    };

    if (!checkFirstName(student.firstName)) {
        $('#firstName').addClass("formInput-error");
        validate = false;
    }
    if (!checkLastName(student.lastName)) {
        $('#lastName').addClass("formInput-error");
        validate = false;
    }
    if (!checkStudentId(student.studentId)) {
        $('#studentId').addClass("formInput-error");
        validate = false;
    }
    if (!checkEmail(student.email)) {
        $('#email').addClass("formInput-error");
        validate = false;
    }
    if (!checkPassword(student.password)) {
        $('#password').addClass("formInput-error");
        validate = false;
    }
    return validate;
}

//ACTION ADD
formStudent.addEventListener("submit", function (e) {
    e.preventDefault();

    if (putErrorInput()) {
        //AJAX
    }

});
