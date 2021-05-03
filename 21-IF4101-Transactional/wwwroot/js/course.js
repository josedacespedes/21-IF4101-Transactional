"use strict";

var formProfessor = document.getElementById("registerCourseForm");

/*--------------------------------------------- ADD COURSE-----------------------------------------------------------*/

//MASK
$(document).ready(function () {
    $('#idCourse').mask('IF-0000');
});

//VALIDATIONS
function checkCourseName(courseName) {
    if ((courseName.length < 10 || courseName.length > 30) || !(/^[a-zA-Z \u00E0-\u00FC\u00f1\u00d1]+$/.test(courseName)) || !courseName) {
        return false;
    } else {
        return true;
    }
}

function checkCourseCode(courseCode) {
    var initialLetters = courseCode.substring(0, 3);
    var restNumeric = courseCode.substring(3, courseCode.length);

    if ((courseCode.length != 7) || (initialLetters != "IF-") || (isNaN(restNumeric)) || !courseCode) {
        return false;
    } else {
        return true;
    }
}

function checkCourseCreditsNumber(courseCreditsNumber) {
    var restNumeric = courseCreditsNumber.substring(0, courseCreditsNumber.length);
    var num_var = Int32.Parse(courseCreditsNumber);

    if ((courseCreditsNumber.length != 1) || (num_var < 1 || num_var > 4) || (isNaN(restNumeric)) || !courseCreditsNumber) {
        return false;
    } else {
        return true;
    }
}

function checkCourseStatus(courseStatus) {
    var restNumeric = courseStatus.substring(0, courseStatus.length);
    var num_var = Int32.Parse(courseStatus);

    if ((courseStatus.length != 1) || (num_var != 0 || num_var != 1) || (isNaN(restNumeric)) || !courseStatus) {
        return false;
    } else {
        return true;
    }
}



function cleanErrorInput() {
    $('#courseName').removeClass("formInput-error");
    $('#idCourse').removeClass("formInput-error");
    $('#creditsNumber').removeClass("formInput-error");
    $('#courseStatus').removeClass("formInput-error");
}

function putErrorInput() {
    cleanErrorInput();
    var validate = true;
    var Course = {
        courseName: $('#courseName').val(),
        courseId: $('#idCourse').val(),
        coursecreditsNumber: $('#creditsNumber').val(),
        courseStatus: $('#courseStatus').val()
    };

    if (!checkCourseName(Course.courseName)) {
        $('#courseName').addClass("formInput-error");
        validate = false;
    }
    if (!checkCourseCode(Course.courseId)) {
        $('#idCourse').addClass("formInput-error");
        validate = false;
    }
    if (!checkCourseCreditsNumber(Course.coursecreditsNumber)) {
        $('#creditsNumber').addClass("formInput-error");
        validate = false;
    }
    if (!checkCourseStatus(Course.courseStatus)) {
        $('#courseStatus').addClass("formInput-error");
        validate = false;
    }
    return validate;
}

//ACTION ADD
registerCourseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (putErrorInput()) {
        //AJAX
    }

});
