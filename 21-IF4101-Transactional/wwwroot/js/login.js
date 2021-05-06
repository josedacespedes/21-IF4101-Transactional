"use strict";

/*const { error } = require("jquery");*/

var loginForm = document.getElementById("loginForm");

// Login

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
    if (password =="" || (password.length != 8) || !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!.#$%^&*_=+-]).*$/.test(password)) || !password) {
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

function add() {
    
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
                console.log("Esta consultando al DAO");
                console.log(result);
                if (result == 1) {
                    showDisplay("admin");
                    login.reset();
                }
                else if (result == 2) {
                    showDisplay("student");
                    login.reset();
                } else if (result == 3) {
                    showDisplay("professor");
                    login.reset();
                } else if (result == 0) {
                    alert("Error de contraseña o usuario");
                }
                $('#emailLogin').val("");
                $('#passwordLogin').val("");
            },
            error: function (errorMessage) {
                alert("Error de contraseña o usuario");
            }
        });
    }
}



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
            $(".displayAdmin").show();
            break;
        case "student":
            hiddenAll();
            $(".displayStudent").show();
            break;
        case "professor":
            hiddenAll();
            $(".displayProfessor").show();
            break;
        case "noUser":
            hiddenAll();
            $(".displayNoUser").show();
            break;
    }
}