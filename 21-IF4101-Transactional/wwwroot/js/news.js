"use strict";

//VARIABLES
var formNews = document.getElementById("registerNewsForm");

$(document).ready(function () {

});

registerNewsForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var news = {
        title: $('#professorAppointment').val(),
        description: $('#professorDateAppointment option:selected').text(),

        type: parseInt(checkStatus)
    };
    //console.log(appointment);
    if (appointment.professor_fullname == "" && appointment.appointment_date == "") {
        $('#professorAppointment').addClass("formInput-error");
        $('#professorDateAppointment').addClass("formInput-error");
        return false;
    } else if (appointment.professor_fullname == "") {
        $('#professorAppointment').addClass("formInput-error");
        return false;
    } else if (appointment.appointment_date == "") {
        $('#professorDateAppointment').addClass("formInput-error");
        return false;
    } else {
        $.ajax({
            url: "/Appointment/InsertRequest",
            data: JSON.stringify(appointment),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result == 1) {
                    messageAppointment.innerHTML = "<label class='text-success'>Cita agregada exitosamente</label>";
                    $('#professorAppointment').val(0);
                    $('#professorDateAppointment').val(0);
                    CleanDate();
                    sendEmailProfessorAppointment(appointment.professor_fullname, appointment.appointment_date);
                } else if (result == 3) {

                    messageAppointment.innerHTML = "<label class='text-danger'>Esta Cita ya existe</label>";
                }
                else {
                    messageAppointment.innerHTML = "<label class='text-danger'>Error al ingresar Cita</label>";
                }
            },
            error: function (errorMessage) {
                alert("Error");
                alert(errorMessage.responseText);
            }
        });
    }
});