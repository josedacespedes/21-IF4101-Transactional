"use strict";

var registerCourseForm = document.getElementById("registerCourseForm");
var messageToSend = document.getElementById("alertMessageAddCourse");

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
    var num_var = parseInt(courseCreditsNumber);

    if ((courseCreditsNumber.length != 1) || (num_var < 1 || num_var > 4) || (isNaN(restNumeric)) || !courseCreditsNumber) {
        return false;
    } else {
        return true;
    }
}

function checkCourseStatus(courseStatus) {
    var restNumeric = courseStatus.substring(0, courseStatus.length);
    var num_var = parseInt(courseStatus);
    console.log("entro aca");
    if ((courseStatus.length != 1) || (num_var < 0 || num_var > 1) || (isNaN(restNumeric)) || !courseStatus) {
        return false;
    } else {
        return true;
    }
}



function cleanErrorInputCourse() {
    $('#courseName').removeClass("formInput-error");
    $('#idCourse').removeClass("formInput-error");
    $('#creditsNumber').removeClass("formInput-error");
    $('#courseStatus').removeClass("formInput-error");
}

function putErrorInputCourse(Course) {
    cleanErrorInputCourse();
    var validate = false;

    if (!checkCourseName(Course.courseName)) {
        $('#courseName').addClass("formInput-error");
        validate = true;
    }
    if (!checkCourseCode(Course.courseId)) {
        $('#idCourse').addClass("formInput-error");
        validate = true;
    }
    if (!checkCourseCreditsNumber(Course.coursecreditsNumber)) {
        $('#creditsNumber').addClass("formInput-error");
        validate = true;
    }
    if (!checkCourseStatus(Course.courseStatus)) {
        $('#courseStatus').addClass("formInput-error");
        validate = true;
    }
    return validate;
}

//ACTION ADD
registerCourseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var course = {
        courseName: $('#courseName').val(),
        courseId: $('#idCourse').val(),
        coursecreditsNumber: $('#creditsNumber').val(),
        courseStatus: $('#courseStatus').val()
    };

    if (!putErrorInputCourse(course)) {
        $.ajax({
            url: "/Course/Insert",
            data: JSON.stringify(course),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result == 1) {
                    messageToSend.innerHTML = "<label class='text-success'>Course added successfully</label>";
                    $('#courseName').val("");
                    $('#idCourse').val("");
                    $('#creditsNumber').val("");
                    $('#courseStatus').val("");
                } else if (result == 3) {
                    messageToSend.innerHTML = "<label class='text-danger'>Course already exist</label>";
                }
                else {
                    messageToSend.innerHTML = "<label class='text-danger'>Error to insert</label>";
                }
            },
            error: function (errorMessage) {
                alert("Error");
                alert(errorMessage.responseText);
            }
        });
    }

});
