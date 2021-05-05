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

    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@ucr\.ac\.cr/.test(email)) || !email) {
        return false;
    } else {
        return true;
    }
}

function checkPasswordLogin(password) {
    if ((password.length != 8) || !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!.#$%^&*_=+-]).*$/.test(password)) || !password) {
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
    //var email = document.getElementById("emailLogin").value;
    //var password = document.getElementById("passwordLogin").value;
    //var email = $('#emailLogin').val();
    //var password = $('#passwordLogin').val();
    //console.log("PutErrorInput "+email);
    //console.log(password);
    //cleanErrorInput();
    if (!checkEmailLogin(email)) {
        $('#emailLogin').addClass("formInput-error");
        validate = false;
    }
    if (!checkPasswordLogin(password)) {
        $('#passwordLogin').addClass("formInput-error");
        validate = false;
    }
    return validate;
}


//ACTION ADD


//loginForm.addEventListener("submit", function (e) {
//    e.preventDefault();
//    var email = $('#emailLogin').val();
//    var password = $('#passwordLogin').val();
//    if (putErrorInput()) {
//        //AJAX
//    }

function add() {


    /*loginForm.addEventListener("submit", function (e) {*/
    //e.preventDefault();
    var messageToSend = document.getElementById("messageToSendLogin");
    var login = {
        email: $('#emailLogin').val(),
        password: $('#passwordLogin').val()
    }
    //var email = $('#emailLogin').val();
    //var password = $('#passwordLogin').val();
    //console.log(login.email);
    //console.log(login.password);
    //console.log(putErrorInput(email, password));
    //if (putErrorInput(email, password)) {
        //AJAX
        
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
                    messageToSend.innerHTML = "<label class='text-success'>Welcome Administrator!</label>";
                    $('#emailLogin').val("");
                    $('#passwordLogin').val("");
                    login.reset();
                    alert("Es admin");
                }
                else if (result == 2) {
                    //messageToSend.innerHTML = "<label class='text-danger'>Wlcome Student!</label>";
                    $('#emailLogin').val("");
                    $('#passwordLogin').val("");
                    login.reset();
                    alert("Es estudiante");
                } else if (result == 3) {
                    //messageToSend.innerHTML = "<label class='text-danger'>Welcome Teacher!</label>";
                    $('#emailLogin').val("");
                    $('#passwordLogin').val("");
                    login.reset();
                    alert("Es profesor");
                } else {
                    //messageToSend.innerHTML = "<label class='text-danger'>Error to verify login</label>";
                    alert("Error de contraseña o usuario");
                }
                $('#emailLogin').val("");
                $('#passwordLogin').val("");
            },
            error: function (errorMessage) {
                alert("Error de contraseña o usuario");
                //alert(errorMessage.responseText);
            }
        });
    //}

    //});

}
