"use strict";
var tableAppointmentRequest;
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
            url: "/Appointment/Insert",
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

//function loadAppointment(id) {
//    tableComments = $("#appointmentTable").DataTable({
//        "destroy": true,
//        "autoWidth": false,
//        "columnDefs": [
//            { "width": "20%", "targets": [0, 4] }
//        ],
//        "ajax": {
//            "url": "/Appointment/Get/",
//            "tpye": 'GET',
//            "datatype": "json"
//        },
//        lengthMenu: [7, 20, 50, 100],
//        "columns": [
//            { "data": "appointment_date" },
//            { "data": "studentId" },
//            { "data": "student_FullName" },
//            {
//                render: function (data, type, row) {
//                    return row.type == 1 ? 'Presencial' : 'Virtual';
//                },

//            },
//            { defaultContent: "<button id='acceptApplicant' name='acceptApplicant' type='button' class='btn btn-success' title='Accept'><i class='fa fa-check'></i></button> <button id='rejectApplicant' name='rejectApplicant' type='button' class='btn btn-danger' title='Reject'><i class='fa fa-trash'></i></button>" }
//        ]

//    });

function loadAppointmentRequest(id) {
    tableAppointmentRequest = $("#appointmentRequestTable").DataTable({
        "destroy": true,
        "autoWidth": false,
        "columnDefs": [
            { "width": "20%", "targets": [0, 4] }
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

            },
            { defaultContent: "<button id='acceptAppointment' name='acceptAppointment' data-toggle='modal' data-target='#modalCommentAppointment' type='button' class='btn btn-success' title='Accept'><i class='fa fa-check'></i></button> <button id='rejectAppointment' name='rejectAppointment' type='button' class='btn btn-danger' title='Reject'><i class='fa fa-trash'></i></button>" }
        ]

    });

}/*--------------------------------------------- DELETE APPOINTMMENT-----------------------------------------------------------*/

$("#appointmentRequestTable tbody").on("click", "#rejectAppointment", function () {

    var data = tableAppointmentRequest.row($(this).parents("tr")).data();
    var rowToRemove = $(this).parents('tr');

    Swal.fire({
        title: "¿Está seguro de rechazar esta cita?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Confirmar`,
        denyButtonText: `Cancelar`,
    }).then((result) => {

        if (result.isConfirmed) {
            $.ajax({
                url: "/Appointment/Delete",
                data: { id: data.id },
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    tableAppointmentRequest.row(rowToRemove).remove().draw(); //Remove of list
                    //sendEmailStudentReject(data.firstNameApplicant, data.emailApplicant); //Send Email
                },
                error: function (errorMessage) {
                    alert("Failed to delete Applicant");
                }
            });

        }
    });
});

var modalCommentAppointment = document.getElementById("modalCommentAppointment");

//// AGREGAR APPLICANT
$("#appointmentRequestTable tbody").on("click", "#acceptAppointment", function () {

    modalCommentAppointment.style.display = "block";
    var data = tableAppointmentRequest.row($(this).parents("tr")).data();
    document.getElementById("commentAppointmentTitle").innerHTML = `<h4>Estudiante: ${data.student_FullName}</h4>`;

    //var appointment = {
    //    student_fullname: data.student_FullName,
    //    type: data.row.type,
    //    professor_fullname: HttpContext.Session.GetString("sNombre"),
    //    appointment_date: data.appointment_date,
    //    studentId: data.studentId
    //};

    //var rowToRemove = $(this).parents('tr');

    //$.ajax({
    //    url: "/Applicant/InsertStudent",
    //    data: JSON.stringify(applicant),
    //    type: "POST",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        tableApplicant.row(rowToRemove).remove().draw(); //Remove of list
    //        sendEmailStudentAccept(data.firstNameApplicant, data.emailApplicant, data.passwordApplicant); //Send Email
    //    },
    //    error: function (errorMessage) {
    //        alert("Error");
    //        alert(errorMessage.responseText);
    //    }
    //});
});
