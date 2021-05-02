// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {

})

function ValidateLogin() {

    var messageToSend = document.getElementById("validateMessageEmail");
    var messageToSend2 = document.getElementById("validateMessagePassword");
    var messageToSend3 = document.getElementById("validateMessageFields");




    var noUser = {
        email: $('#email').val(),
        password: $('#password').val()
    };

    if ((noUser.email == "") || (noUser.password == "")) {
        messageToSend3.innerHTML = "<label class='text-danger'>No debe dejar campos vacíos!</label>";
        //alert("No debe dejar campos vacíos!")
    }
    else if (validateEmail(noUser.email)) {
        messageToSend.innerHTML = "<label class='text-danger'>Invalid email!</label>";

         //alert("Email necesita el valor @ ")
    }
    //else if ((noUser.password.length < 8) || (charCodeAt(noUser.password.length) >= 65 && charCodeAt(noUser.password.length) <= 90) || (charCodeAt(noUser.password.length) >= 97 && charCodeAt(noUser.password.length) <= 122) || (charCodeAt(noUser.password.length) >= 48 && charCodeAt(noUser.password.length) <= 57) ) {
    //     alert("At least 1 Uppercase, At least 1 Lowercase, At least 1 Number, At least 1 Symbol (!.#$%^&_=+-)")
    //}
    else if ((noUser.password.length < 8) || validar_clave(noUser.password)) {
         //alert("At least 1 Uppercase, At least 1 Lowercase, At least 1 Number, At least 1 Symbol (!.#$%^&_=+-)")
        messageToSend2.innerHTML = "<label class='text-danger'>Invalid password!</label>";

    }
    else {
        alert("good")
    }
        //$.ajax({
        //    url: "/Home/Insert",
        //    data: JSON.stringify(student),
        //    type: "POST",
        //    contentType: "application/json;charset=utf-8",
        //    dataType: "json",
        //    success: function (result) {
        //        if (result === 1) {
        //            messageToSend.innerHTML = "<label class='text-success'>Welcome!</label>";
        //            $('#email').val("");
        //            $('#password').val("");
        //        } 
        //        else {
        //            messageToSend.innerHTML = "<label class='text-danger'>Error to login</label>";
        //        }
        //    },
        //    error: function (errorMessage) {
        //        alert("Error");
        //        alert(errorMessage.responseText);
        //    }
        //});
    
}



function validateEmail(valor) {
    if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(valor)) {
        alert("La dirección de email " + valor + " es correcta.");
    } else {
        alert("La dirección de email es incorrecta.");
    }
}

function validar_clave(contrasenna) {
    if (contrasenna.length >= 8) {
        var mayuscula = false;
        var minuscula = false;
        var numero = false;
        var caracter_raro = false;

        for (var i = 0; i < contrasenna.length; i++) {
            if (contrasenna.charCodeAt(i) >= 65 && contrasenna.charCodeAt(i) <= 90) {
                mayuscula = true;
            }
            else if (contrasenna.charCodeAt(i) >= 97 && contrasenna.charCodeAt(i) <= 122) {
                minuscula = true;
            }
            else if (contrasenna.charCodeAt(i) >= 48 && contrasenna.charCodeAt(i) <= 57) {
                numero = true;
            }
            else {
                caracter_raro = true;
            }
        }
        if (mayuscula == true && minuscula == true && caracter_raro == true && numero == true) {
            return true;
        }
    }
    return false;
}


"use strict";

var formStudent = document.getElementById("registerStudentForm");

// ADD STUDENT

//SHOW/HID PASSWORD
$('#showPasswordSudent').hover(function () {
    $('.password').attr('type', 'text');
}, function () {
    $('.password').attr('type', 'password');
});

//VALIDATIONS

var firstName = $('#formFirstNameStudent').val();
var lastName = $('#formFirstNameStudent').val();
var studentId = $('#formFirstNameStudent').val();
var email = $('#formFirstNameStudent').val();
var password = $('#formFirstNameStudent').val();


function checkFirstName() {
    if ((firstName.length < 3 || firstName.length > 50) || !(isNaN(firstName)) || typeof x === 'symbol' || !firstName) {
        return false;
    } else {
        return true;
    }
}

function checkLastName() {
    if ((lastName.length < 10 || lastName.length > 100) || !(isNaN(lastName)) || typeof x === 'symbol' || lastName.indexOf(' ') >= 0 || !lastName) {
        return false;
    } else {
        return true;
    }
}

function checkStudentId() {
    initialLetter = studentId.charAt(0);
    restNumeric = studentId.substring(1, studentId.length);

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

    if (!(password.length != 8) || !(/^(?=.{ 8,}) (?=.* [a - z])(?=.* [A - Z])(?=.* [!.#$%^&* +*!=]).* $)/.test(password)) || !password) {
        return false;
    } else {
        return true;
    }
}


function cleanErrorInput() {
    firstName.classList.remove("formInput-error");
    lastName.classList.remove("formInput-error");
    studentId.classList.remove("formInput-error");
    email.classList.remove("formInput-error");
    password.classList.remove("formInput-error");
}

formStudent.addEventListener("submit", function (e) {
    e.preventDefault();
    cleanErrorInput();

    if (!checkFirstName()) {
        firstName.classList.add("formInput-error");

    } else if (!checkEmail()) {

    } else if (!checkPassword()) {

    } else {
        //ACTION AJAX
    }


});

