"use strict";
var messageAppointment = document.getElementById("alertMessageAddAppointment");
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
                html += '<option>' + item.firstNameProfessor + ' ' + item.lastNameProfessor + '</option>';
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

function CleanDate() {
    var selectobject = document.getElementById("professorDateAppointment");

    if (selectobject.length > 1) {
        var options = selectobject.length;
        while (options != 1) {
            selectobject.remove(options - 1);
            options--;
        }

    }
}

function DateAppointment() {
    CleanDate();
    var ProfessorName = $('#professorAppointment').val();
    //console.log(ProfessorName);
    $.ajax({
        url: "/Appointment/GetDates",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: { "ProfessorName": ProfessorName },
        success: function (result) {
            //llenar el dropdowns (select)
            var html = '';
            //console.log(result);
            var i = 1;
            $.each(result, function (key, item) {
                //console.log(item);
                //html += '<option>' + item + '</option>';
                html += '<option value="' + i + '">' + item + '</option>';
                i++;
            });
            $('#professorDateAppointment').append(html);
        },
        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });
}


registerAppintmentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var checkStatus = $("input[name='consultTypeAppoCheck']").is(':checked') ? 1 : 0; //Validate if th input is checked or not

    var appointment = {
        professor_fullname: $('#professorAppointment').val(),
        appointment_date: $('#professorDateAppointment option:selected').text(),
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

function loadAppointment(id) {
    tableComments = $("#appointmentTable").DataTable({
        "destroy": true,
        "autoWidth": false,
        "columnDefs": [
            { "width": "20%", "targets": [0, 3] }
        ],
        "ajax": {
            "url": "/Appointment/Get/",
            "tpye": 'GET',
            "datatype": "json"
        },
        lengthMenu: [7, 20, 50, 100],
        "columns": [
            { "data": "appointment_date" },
            { "data": "studentId" },
            { "data": "student_FullName" },
            {
                render: function (data, type, row) {
                    return row.type == 1 ? 'Presencial' : 'Virtual';
                },

            }
        ]

    });

}

function sendEmailProfessorAppointment(professorname, dateappointment) {
    //nameStudent, emailProfessor,
    $.ajax({
        url: "/Appointment/GetInformation",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: { "professorname": professorname },
        success: function (result) {
                Email.send({
                    Host: "smtp.gmail.com",
                    Username: "ucrtransactionaladm1n@gmail.com",
                    Password: "usuarioadmin",
                    To: result.emailProfessor,
                    From: "ucrtransactionaladm1n@gmail.com",
                    Subject: `Cita de consulta`,
                    Body: `Hola ${nameProfessor}, el estudiante ${result.name} ha solicitado una reunión contigo el día ${dateappointment}`
                });
            
        },
        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });


    
}