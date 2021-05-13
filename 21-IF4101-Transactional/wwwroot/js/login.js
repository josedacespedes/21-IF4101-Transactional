"use strict";

var loginForm = document.getElementById("loginForm");
var alertMessageToSendLogin = document.getElementById("messageToSendLogin");

// Login

$(document).ready(function () {
    $(".displayAdmin").hide();
    $(".displayStudent").hide();
    $(".displayProfessor").hide();
});

//SHOW/HID PASSWORD
$('#showPasswordLogin').hover(function () {
    $('#passwordLogin').attr('type', 'text');
}, function () {
    $('#passwordLogin').attr('type', 'password');
});


//VALIDATIONS

function checkEmailLogin(email) {
    if (email == "" || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@ucr\.ac\.cr/.test(email)) || !email) {
        return false;
    } else {
        return true;
    }
}

function checkPasswordLogin(password) {
    if (password == "" || (password.length != 8) || !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!.#$%^&*_=+-]).*$/.test(password)) || !password) {
        return false;
    } else {
        return true;
    }
}


function cleanErrorInputLogin() {
    $('#emailLogin').removeClass("formInput-error");
    $('#passwordLogin').removeClass("formInput-error");
}

function putErrorInputLogin(email, password) {

    var validate = true;
    cleanErrorInputLogin();
    if (!checkEmailLogin(email)) {
        $('#emailLogin').addClass("formInput-error");
        alert("Invalidate email!");
        validate = false;
    }
    if (!checkPasswordLogin(password)) {
        $('#passwordLogin').addClass("formInput-error");
        alert("Invalidate password!")
        validate = false;
    }
    return validate;
}


//ACTION SIGN IN
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var login = {
        email: $('#emailLogin').val(),
        password: $('#passwordLogin').val()
    }

    if (putErrorInputLogin(login.email, login.password)) {
        $.ajax({
            url: "/Login/Login",
            data: JSON.stringify(login),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {  //(result = 1): Admin  (result = 2): Student  (result = 3): Professor
                if (result == 1) {
                    loginForm.reset(); //Clean form fields
                    showDisplay("admin");
                }
                else if (result == 2) {
                    loginForm.reset(); //Clean form fields
                    showDisplay("student");
                    setNameStudent();
                } else if (result == 3) {
                    loginForm.reset(); //Clean form fields
                    showDisplay("professor");
                    setNameProfessor();
                } else if (result == 0) {
                    alertMessageToSendLogin.innerHTML = `<label class="text-danger">Email o contraseña incorrecta</label>`;
                }
            },
            error: function (errorMessage) {
                alert("Error de contraseña o usuario");
            }
        });
    }
});

//HIDE MSG FORM
$("#emailLogin").click(function () {
    alertMessageToSendLogin.innerHTML = "";
});
$("#passwordLogin").click(function () {
    alertMessageToSendLogin.innerHTML = "";
});

function hiddenAll() {
    $(".displayAll").hide();
    $(".displayAdmin").hide();
    $(".displayStudent").hide();
    $(".displayProfessor").hide();
    $(".displayNoUser").hide();
}

function showDisplay(usuario) {
    switch (usuario) {
        case "all":
            hiddenAll();
            $(".displayAll").show();
            break;
        case "admin":
            hiddenAll();
            $(".displayAll").show();
            $(".displayAdmin").show();
            break;
        case "student":
            hiddenAll();
            $(".displayAll").show();
            $(".displayStudent").show();
            break;
        case "professor":
            hiddenAll();
            $(".displayAll").show();
            $(".displayProfessor").show();
            break;
    }
}

function logOut() {
    $(".displayAdmin").hide();
    $(".displayStudent").hide();
    $(".displayProfessor").hide();
    $(".displayAll").show();
    $(".displayNoUser").show();
}

/*--------------------------------------------- PROFILE STUDENT -----------------------------------------------------------*/
function setNameStudent() {

    $.ajax({
        url: "/Student/GetSessionVariables",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            document.getElementById('profileNameStudent').innerHTML= result;
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

/*--------------------------------------------- PROFILE PROFESSOR -----------------------------------------------------------*/
function setNameProfessor() {

    $.ajax({
        url: "/Professor/GetSessionVariables",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            document.getElementById('profileNameProfessor').innerHTML = result;
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}


$("#showModalProfessorProfile").click(function () {
    $.ajax({
        url: "/Professor/GetProfile",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            document.getElementById('hProfileNameProfessor').innerHTML = result.firstNameProfessor +' '+ result.lastNameProfessor;
            document.getElementById('hProfileEmailProfessor').innerHTML = result.email;
            document.getElementById('hProfileCodeProfessor').innerHTML = result.code;
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });

});