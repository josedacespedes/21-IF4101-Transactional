"use strict";

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
            $(".displayAll").show();
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
