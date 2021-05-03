"use strict";

//VARIABLES
var formApplicant = document.getElementById("registerApplicantForm");
var alertMessageAddStudent = document.getElementById("alertMessageAddStudent");

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

function cleanErrorInputApplicant() {
    $('#firstNameApplicant').removeClass("formInput-error");
    $('#lastNameApplicant').removeClass("formInput-error");
    $('#studentIdApplicant').removeClass("formInput-error");
    $('#emailApplicant').removeClass("formInput-error");
    $('#passwordApplicant').removeClass("formInput-error");
}

function putErrorInputApplicant(applicant) {
    cleanErrorInputApplicant();
    var validate = false;

    if (!checkFirstNameApplicant(applicant.firstNameApplicant)) {
        $('#firstNameApplicant').addClass("formInput-error");
        validate = true;
    }
    if (!checkLastNameApplicant(applicant.lastNameApplicant)) {
        $('#lastNameApplicant').addClass("formInput-error");
        validate = true;
    }
    if (!checkStudentIdApplicant(applicant.studentIdApplicant)) {
        $('#studentIdApplicant').addClass("formInput-error");
        validate = true;
    }
    if (!checkEmailApplicant(applicant.emailApplicant)) {
        $('#emailApplicant').addClass("formInput-error");
        validate = true;
    }
    if (!checkPasswordApplicant(applicant.passwordApplicant)) {
        $('#passwordApplicant').addClass("formInput-error");
        validate = true;
    }
    return validate;
}

//ACTION ADD
formApplicant.addEventListener("submit", function (e) {
    e.preventDefault();

    var applicant = {
        firstNameApplicant: $('#firstNameApplicant').val(),
        lastNameApplicant: $('#lastNameApplicant').val(),
        studentIdApplicant: $('#studentIdApplicant').val(),
        emailApplicant: $('#emailApplicant').val(),
        passwordApplicant: $('#passwordApplicant').val()
    };

    if (!putErrorInputApplicant(applicant)) {
        //AJAX
        //$.ajax({
        //    url: "/Applicant/Insert",
        //    data: JSON.stringify(applicant),
        //    type: "POST",
        //    contentType: "application/json;charset=utf-8",
        //    dataType: "json",
        //    success: function (result) {
        //        if (result == 1) {
        //            alertMessageAddStudent.innerHTML = `<label class="text-success">Register successfully</label>`;//Msg enter success
        //            formApplicant.reset(); //Clean form fields
        //        } else if (result == -1) {
        //            alertMessageAddStudent.innerHTML = `<label class="text-danger">Student is already exist</label>`;//Msg  existence
        //        }
        //    },
        //    error: function (errorMessage) {
        //        alert("Error");
        //        alert(errorMessage.responseText);
        //    }
        //});
    }

});
