"use strict";

var loginForm = document.getElementById("loginForm");

// Login

//SHOW/HID PASSWORD
$('#showPasswordLogin').hover(function () {
    $('#passwordLogin').attr('type', 'text');
}, function () {
    $('#passwordLogin').attr('type', 'password');
});


//VALIDATIONS

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
    $('#emailLogin').removeClass("formInput-error");
    $('#passwordLogin').removeClass("formInput-error");
}

function putErrorInput() {
    
    var validate = true;
    var email = document.getElementById("emailLogin").val;
    var password = document.getElementById("passwordLogin").val;
    console.log(email);
    console.log(password);
    //cleanErrorInput();
    if (!checkEmail(email)) {
        $('#emailLogin').addClass("formInput-error");
        validate = false;
    }
    if (!checkPassword(password)) {
        $('#passwordLogin').addClass("formInput-error");
        validate = false;
    }
    return validate;
}

function add() {

    /*loginForm.addEventListener("submit", function (e) {*/
        //e.preventDefault();
        var messageToSend = document.getElementById("validateMessage");
        var email = document.getElementById("emailLogin").value;
        var password = document.getElementById("passwordLogin").value;
        console.log("Holaaaaaaaaaaaaaaaa");
        console.log(putErrorInput());
        /*if (putErrorInput()) {*/
            //AJAX
            console.log("Esta entrando al AJAX");
            $.ajax({
                url: "/Login/Login",
                data: { "Email": email, "Password": password },
                type: "POST",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    console.log("Esta consultando al DAO");
                    if (result == 1) {
                        messageToSend.innerHTML = "<label class='text-success'>Welcome!</label>";
                        $('#emailLogin').val("");
                        $('#passwordLogin').val("");
                    }
                    else {
                        messageToSend.innerHTML = "<label class='text-danger'>Error to verify login</label>";
                    }
                    $('#emailLogin').val("");
                    $('#passwordLogin').val("");
                },
                error: function (errorMessage) {
                    //alert("Error");
                    //alert(errorMessage.responseText);
                }
            });
        //}

    //});

}