"use strict";
var tableAppointmentRequest;
var professorFullName;
var messageAppointment = document.getElementById("alertMessageAddAppointment");
var dataInfoAppointmentRequest;
var formCommentAppointment = document.getElementById("formCommentAppointment");
var dataInfoAppointmentRequestAdd;
var flagCommentAppointment; // 1 acepta y 0 rechaza

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
    tableComments = $('#appointmentTable').DataTable();
    $('#appointmentTable thead tr').clone(true).appendTo('#appointmentTable thead');

    $('#appointmentTable thead tr:eq(1) th').each(function (i) {
        var title = $(this).text(); //es el nombre de la columna

        if (title === "Día") {
            $(this).html(`
                <center><select class="form-select" id="selectTableAppointment">
                    <option value="" selected>Seleccione...</option>
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miercoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sábado">Sábado</option>
                </select></center>
                `);
        } else {
            $(this).html('');
        }
        //Filtra con los tipo select
        $('select', this).on('keyup change', function () {
            if (tableComments.column(i).search() !== this.value) {
                tableComments
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        });

    });


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
            {
                render: function (data, type, row) {
                    var day = row.appointment_date;
                    return day.substring(0, day.indexOf(" "));
                }
            },
            {
                render: function (data, type, row) {
                    var hour = row.appointment_date;
                    return hour.substring(hour.indexOf(" "));
                }
            },
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

/*--------------------------------------------- REQUEST APPOINTMMENT LIST-----------------------------------------------------------*/

function loadAppointmentRequest(id) {
    tableAppointmentRequest = $("#appointmentRequestTable").DataTable({
        "destroy": true,
        "autoWidth": false,
        "columnDefs": [
            { "width": "20%", "targets": [0, 3] }
        ],
        "ajax": {
            "url": "/Appointment/GetRequest",
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
            { defaultContent: "<button id='acceptAppointment' name='acceptAppointment' data-toggle='modal' data-target='#modalCommentAppointment' type='button' class='btn btn-success' title='Accept'><i class='fa fa-check'></i></button> <button id='rejectAppointment' name='rejectAppointment' data-toggle='modal' data-target='#modalCommentAppointment' type='button' class='btn btn-danger' title='Reject'><i class='fa fa-trash'></i></button>" }

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

/*--------------------------------------------- DELETE APPOINTMMENT-----------------------------------------------------------*/
var rowToRemove;

$("#appointmentRequestTable tbody").on("click", "#rejectAppointment", function () {
    dataInfoAppointmentRequest = tableAppointmentRequest.row($(this).parents("tr")).data();
    document.getElementById("commentAppointmentTitle").innerHTML = `<h4>Estudiante: ${dataInfoAppointmentRequest.student_FullName}</h4>`;
    rowToRemove = $(this).parents('tr');
    flagCommentAppointment = 0;
});


formCommentAppointment.addEventListener("submit", function (e) {
    if (flagCommentAppointment == 0) {
        e.preventDefault();

        $.ajax({
            url: "/Appointment/GetEmailStudent",
            type: "GET",
            contentType: "application/json;charset=utf-8",
            data: { "studentId": dataInfoAppointmentRequest.studentId },
            success: function (result) {
                var emailStudent = result;
                $.ajax({
                    url: "/Appointment/Delete",
                    data: { id: dataInfoAppointmentRequest.id },
                    type: "GET",
                    contentType: "application/json;charset=utf-8",
                    success: function (result) {

                        var commentAppointmentAdd = $('#appointmentComment').val();
                        sendEmailStudentReject(dataInfoAppointmentRequest.student_FullName, emailStudent, dataInfoAppointmentRequest.appointment_date, dataInfoAppointmentRequest.professor_fullname, commentAppointmentAdd); //Send Email
                        tableAppointmentRequest.row(rowToRemove).remove().draw(); //Remove of list
                        $('#modalCommentAppointment').modal('hide');
                        cleanFieldsFormCommentAppointment();

                        Swal.fire({
                            icon: 'info',
                            title: 'Cita rechazada',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    },
                    error: function (errorMessage) {
                        alert("Failed to delete Applicant");
                    }
                });
            }
        });
    }
});


function sendEmailStudentReject(studentFullName, emailStudent, timeAppointment, professorFullName, professorComment) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "ucrtransactionaladm1n@gmail.com",
        Password: "usuarioadmin",
        To: emailStudent,
        From: "ucrtransactionaladm1n@gmail.com",
        Subject: `Administrator 21-IF4101-Transactional`,
        Body: `Saludos,  ${studentFullName}. <br/><br/> De parte de UCR Transactional le informamos que su cita con el profesor ${professorFullName} 
        para la fecha ${timeAppointment} ha sido rechazada.<br/><br/> 
        Comentario del profesor: </br>
        ${professorComment}`
    });
}


/*--------------------------------------------- ACCEPT APPOINTMMENT-----------------------------------------------------------*/

var rowToRemoveAdd;
$("#appointmentRequestTable tbody").on("click", "#acceptAppointment", function () {
    dataInfoAppointmentRequestAdd = tableAppointmentRequest.row($(this).parents("tr")).data();
    document.getElementById("commentAppointmentTitle").innerHTML = `<h4>Estudiante: ${dataInfoAppointmentRequestAdd.student_FullName}</h4>`;
    rowToRemoveAdd = $(this).parents('tr');
    flagCommentAppointment = 1;
});


formCommentAppointment.addEventListener("submit", function (e) {

    if (flagCommentAppointment == 1) {
        e.preventDefault();

        var appointment = {
            id: dataInfoAppointmentRequestAdd.id,
            student_fullname: dataInfoAppointmentRequestAdd.student_FullName,
            type: dataInfoAppointmentRequestAdd.type,
            professor_fullname: dataInfoAppointmentRequestAdd.professor_fullname,
            appointment_date: dataInfoAppointmentRequestAdd.appointment_date,
            studentId: dataInfoAppointmentRequestAdd.studentId
        };

        $.ajax({
            url: "/Appointment/GetEmailStudent",
            type: "GET",
            contentType: "application/json;charset=utf-8",
            data: { "studentId": dataInfoAppointmentRequestAdd.studentId },
            success: function (result) {
                var emailStudent = result;

                $.ajax({
                    url: "/Appointment/Insert",
                    data: JSON.stringify(appointment),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        var commentAppointmentAdd = $('#appointmentComment').val();
                        sendEmailAppointmentAccept(dataInfoAppointmentRequestAdd.student_FullName, emailStudent, dataInfoAppointmentRequestAdd.appointment_date, dataInfoAppointmentRequestAdd.professor_fullname, commentAppointmentAdd); //Send Email

                        $('#modalCommentAppointment').modal('hide');
                        tableAppointmentRequest.row(rowToRemoveAdd).remove().draw(); //Remove of list
                        cleanFieldsFormCommentAppointment();

                        Swal.fire({
                            icon: 'success',
                            title: 'Cita agendada',
                            showConfirmButton: false,
                            timer: 1500
                        })

                    },
                    error: function (errorMessage) {
                        alert("Error");
                        alert(errorMessage.responseText);
                    }
                });
            }
        });
    }
});

function sendEmailAppointmentAccept(studentFullName, emailStudent, timeAppointment, professorFullName, professorComment) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "ucrtransactionaladm1n@gmail.com",
        Password: "usuarioadmin",
        To: emailStudent,
        From: "ucrtransactionaladm1n@gmail.com",
        Subject: `Administrator 21-IF4101-Transactional`,
        Body: `Saludos,  ${studentFullName}. <br/><br/> De parte de UCR Transactional le confirmamos su cita con el profesor ${professorFullName} 
        para el día ${timeAppointment}.<br/><br/>
        Comentario del profesor: </br></br>
        ${professorComment}`
    });
}

function cleanFieldsFormCommentAppointment() {
    formCommentAppointment.reset();
}
