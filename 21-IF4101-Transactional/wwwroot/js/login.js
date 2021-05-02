"use strict";

var loginForm = document.getElementById("loginForm");

// Login

//SHOW/HID PASSWORD
$('#showPasswordLogin').hover(function () {
    $('.password').attr('type', 'text');
}, function () {
    $('.password').attr('type', 'password');
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
    $('#email').removeClass("formInput-error");
    $('#password').removeClass("formInput-error");
}

function putErrorInput() {
    cleanErrorInput();
    var validate = true;
    var noUser = {
        email: $('#email').val(),
        password: $('#password').val()
    };
    if (!checkEmail(noUser.email)) {
        $('#email').addClass("formInput-error");
        validate = false;
    }
    if (!checkPassword(noUser.password)) {
        $('#password').addClass("formInput-error");
        validate = false;
    }
    return validate;
}

//ACTION ADD
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (putErrorInput()) {
        //AJAX
    }

});