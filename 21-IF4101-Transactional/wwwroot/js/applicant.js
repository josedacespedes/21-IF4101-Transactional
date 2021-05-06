"use strict";

//VARIABLES
var formApplicant = document.getElementById("registerApplicantForm");
var alertMessageAddStudent = document.getElementById("alertMessageAddStudent");
var tableApplicant;

$(document).ready(function () {
    loadListApplicant();
});

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

//HIDE MSG FORM
$("#firstNameApplicant").click(function () {
    alertMessageAddStudent.innerHTML = "";
});
$("#studentIdApplicant").click(function () {
    alertMessageAddStudent.innerHTML = "";
});


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
        $.ajax({
            url: "/Applicant/Insert",
            data: JSON.stringify(applicant),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result == -1) {
                    $('#studentIdApplicant').addClass("formInput-error");
                    alertMessageAddStudent.innerHTML = `<label class="text-danger">Student is already exist</label>`;//Msg  existence
                } else if (result == -2) {
                    $('#emailApplicant').addClass("formInput-error");
                    alertMessageAddStudent.innerHTML = `<label class="text-danger">Email is already exist</label>`;//Msg  existence
                } else {
                    alertMessageAddStudent.innerHTML = `<label class="text-success">Register successfully</label>`;//Msg enter success
                    formApplicant.reset(); //Clean form fields
                    sendEmailStudentWait(applicant.firstNameApplicant, applicant.emailApplicant);
                    
                }
            },
            error: function (errorMessage) {
                alert("Error");
                alert(errorMessage.responseText);
            }
        });
    }

});

/*--------------------------------------------- LIST PROFESSOR-----------------------------------------------------------*/
function loadListApplicant() {
    tableApplicant = $("#applicantTable").DataTable({
        "destroy": true,
        "autoWidth": false,
        "ajax": {
            "url": "/Applicant/Get",
            "tpye": 'GET',
            "datatype": "json"
        },
        lengthMenu: [7, 20, 50, 100],
        "columns": [
            { "data": "studentIdApplicant" },
            {
                render: function (data, type, row) {
                    return row.firstNameApplicant + " " + row.lastNameApplicant;
                }
            },
            { "data": "emailApplicant" },
            {
                defaultContent: "<button id='acceptApplicant' name='acceptApplicant' type='button' oncli class='btn btn-success' title='Accept'><i class='fa fa-check'></i></button> <button id='rejectApplicant' name='rejectApplicant' type='button' class='btn btn-danger' title='Reject'><i class='fa fa-trash'></i></button>"
            }
        ]
    });
}

// ELIMINAR APPLICANT
$("#applicantTable tbody").on("click", "#rejectApplicant", function () {

    var data = tableApplicant.row($(this).parents("tr")).data();
    var rowToRemove = $(this).parents('tr');

    Swal.fire({
        title: "Are you sure about delete this applicant?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Confirm`,
        denyButtonText: `Cancel`,
    }).then((result) => {

        if (result.isConfirmed) {
            $.ajax({
                url: "/Applicant/Delete",
                data: { Id: data.id },
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    tableApplicant.row(rowToRemove).remove().draw(); //Remove of list
                    sendEmailStudentReject(data.firstNameApplicant, data.emailApplicant); //Send Email
                },
                error: function (errorMessage) {
                    alert("Failed to delete Applicant");
                }
            });

        }
    });
});

// AGREGAR APPLICANT
$("#applicantTable tbody").on("click", "#acceptApplicant", function () {

    var data = tableApplicant.row($(this).parents("tr")).data();
    var applicant = {
        firstNameApplicant: data.firstNameApplicant,
        lastNameApplicant: data.lastNameApplicant,
        studentIdApplicant: data.studentIdApplicant,
        emailApplicant: data.emailApplicant,
        passwordApplicant: data.passwordApplicant
    };

    var rowToRemove = $(this).parents('tr');

    $.ajax({
        url: "/Applicant/InsertStudent",
        data: JSON.stringify(applicant),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            tableApplicant.row(rowToRemove).remove().draw(); //Remove of list
            sendEmailStudentAccept(data.firstNameApplicant, data.emailApplicant, data.passwordApplicant); //Send Email
        },
        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });
});


function sendEmailStudentAccept(nameStudent, emailStudent, passwordStudent) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "ucrtransactionaladm1n@gmail.com",
        Password: "usuarioadmin",
        To: emailStudent,
        From: "ucrtransactionaladm1n@gmail.com",
        Subject: `Administrator 21-IF4101-Transactional`,
        Body: `Welcome to the system ${nameStudent}, you have been accepted as a Student.<br/>
        Log in with the following:<br/>
        Email: ${emailStudent} <br/> 
        Password: ${passwordStudent}`
    });
}

function sendEmailStudentReject(nameStudent, emailStudent) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "ucrtransactionaladm1n@gmail.com",
        Password: "usuarioadmin",
        To: emailStudent,
        From: "ucrtransactionaladm1n@gmail.com",
        Subject: `Administrator 21-IF4101-Transactional`,
        Body: `Hi ${nameStudent}, unfortunately your registration has been rejected.`
    });
}

function sendEmailStudentWait(nameStudent, emailStudent) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "ucrtransactionaladm1n@gmail.com",
        Password: "usuarioadmin",
        To: emailStudent,
        From: "ucrtransactionaladm1n@gmail.com",
        Subject: `Administrator 21-IF4101-Transactional`,
        Body: `Hi ${nameStudent}, wait for your registration response`
    });
}