"use strict";
$(document).ready(function () {
    GetProfessorAppointment();
});

function GetProfessorAppointment() {

    $.ajax({
        url: "/Appointment/GetProfessors",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //llenar el dropdowns (select)
            var html = '';
            //console.log(result);
            $.each(result, function (key, item) {
                //console.log(item);
                //html += '<option value="' + item.id + '">' + item.firstNameProfessor + ' ' + item.lastNameProfessor+ '</option>';
            });
            $('#professorAppointment').append(html);
        },
        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });
}