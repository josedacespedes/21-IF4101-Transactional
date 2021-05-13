"use strict";

var registerCourseForm = document.getElementById("registerCourseForm");
var registerCourseEdit = document.getElementById("registerCourseEdit");
var messageToSend = document.getElementById("alertMessageAddCourse");
var tableCourse;
var idCourseGroup;
var idCourseEdit;

/*--------------------------------------------- ADD COURSE-----------------------------------------------------------*/

//MASK
$(document).ready(function () {
    $('#idCourse').mask('IF-0000');
    loadCourseList();
});

//VALIDATIONS
function checkCourseName(course) {
    if ((course.length < 10 || course.length > 150) || !(/^[a-zA-Z \u00E0-\u00FC\u00f1\u00d1]+$/.test(course)) || !course) {
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

    if ((courseCreditsNumber < 1 || courseCreditsNumber > 5)) {
        return false;
    } else {
        return true;
    }
}

function checkCourseStatus(courseStatus) {
    if ((courseStatus < 0 || courseStatus > 1)) {
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

    if (!checkCourseName(Course.name)) {
        $('#courseName').addClass("formInput-error");
        validate = true;
    }
    if (!checkCourseCode(Course.code)) {
        $('#idCourse').addClass("formInput-error");
        validate = true;
    }
    if (!checkCourseCreditsNumber(Course.credits)) {
        $('#creditsNumber').addClass("formInput-error");
        validate = true;
    }
    if (!checkCourseStatus(Course.state)) {
        $('#courseStatus').addClass("formInput-error");
        validate = true;
    }
    return validate;
}

//HIDE MSG FORM
$("#idCourse").click(function () {
    messageToSend.innerHTML = "";
});


/*--------------------------------------------- ADD COURSE-----------------------------------------------------------*/
registerCourseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var checkStatus = $("input[name='courseStatus']").is(':checked') ? 1 : 0; //Validate if th input is checked or not

    var course = {
        name: $('#courseName').val(),
        code: $('#idCourse').val(),
        credits: parseInt($('#creditsNumber').val()),
        state: checkStatus
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
                    messageToSend.innerHTML = "<label class='text-success'>Curso agregado exitosamente</label>";
                    registerCourseForm.reset();
                    $('#courseTable').DataTable().ajax.reload();
                } else if (result == 3) {
                    $('#idCourse').addClass("formInput-error");
                    messageToSend.innerHTML = "<label class='text-danger'>Este curso ya existe</label>";
                }
                else {
                    messageToSend.innerHTML = "<label class='text-danger'>Error al ingresar credenciales</label>";
                }
            },
            error: function (errorMessage) {
                alert("Error");
                alert(errorMessage.responseText);
            }
        });
    }


});

/*--------------------------------------------- LIST COURSE-----------------------------------------------------------*/
function loadCourseList() {
    tableCourse = $("#courseTable").DataTable({
        "destroy": true,
        "autoWidth": false,
        "columnDefs": [
            { "width": "20%", "targets": [0, 4] }
        ],
        "ajax": {
            "url": "/Course/Get",
            "tpye": 'GET',
            "datatype": "json"
        },
        lengthMenu: [7, 20, 50, 100],
        "columns": [
            { "data": "code" },
            { "data": "name" },
            { "data": "credits" },
            {
                render: function (data, type, row) {
                    return row.state == 1 ? 'Activo' : 'Inactivo';
                }
            },
            {
                defaultContent: "<button type='button' id='buttonModalCourseGroup' name='buttonModalCourseGroup' class='btn btn-primary' data-toggle='modal' data-target='#modalCourseGroup' title='Asociar grupo'><i class='fa fa-link'></i></button> <button type='button' id='buttonModalCourseEdit' name='buttonModalCourseEdit' class='btn btn-warning' data-toggle='modal' data-target='#modalCourseEdit' title='Modificar'><i class='fa fa-pencil'></i></button>"
            }
        ]

    });
}

/*--------------------------------------------- LINK COURSE GROUP COURSE-----------------------------------------------------------*/
//ASOCIAR GRUPO
$("#courseTable tbody").on("click", "#buttonModalCourseGroup", function () {
    var dataInfoCourse = tableCourse.row($(this).parents("tr")).data();
    document.getElementById("courseTitleModal").innerHTML = `<h4>Curso: ${dataInfoCourse.code}  ${dataInfoCourse.name} </h4>`;
    idCourseGroup = dataInfoCourse.id;
});


function calculateGroupsAmount() {

    var groupsAmount = document.getElementById("groupsAmount").value;
    var associateGroupCourse = document.getElementById("associateGroupCourse").value;

    /* Solo deja ingresar numeros */
    jQuery('#groupsAmount').keypress(function (tecla) {
        if (tecla.charCode < 48 || tecla.charCode > 57) return false;
    });

    jQuery('#associateGroupCourse').keypress(function (tecla) {
        if (tecla.charCode < 48 || tecla.charCode > 57) return false;
    });
    if (associateGroupCourse != 0) {
        var groups = [];
        var i;
        for (i = 0; i < groupsAmount; i++) {
            if (i != groupsAmount - 1) {
                groups += [associateGroupCourse++ + ","];
            } else {
                groups += [associateGroupCourse++];
            }
        }
    }

    if (associateGroupCourse != 0 && groupsAmount != "") {
        document.getElementById("showAssociation").value = "Cursos agregados: " + groups;
    }
    else {
        document.getElementById("showAssociation").value = "Cursos agregados: ";
    }
    return groups;
}

//Clean modal fields
function cleanFieldsModalCourseGroup() {
    registerCourseGroup.reset();
}

registerCourseGroup.addEventListener("submit", function (e) {
    e.preventDefault();
    var list = saveListCourseGroup(calculateGroupsAmount());
    var course = {
        id: idCourseGroup,
        numGroup: list
    };
    console.log(course);

    $.ajax({
        url: "/Course/InsertGroup",
        data: JSON.stringify(course),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#modalCourseGroup').modal('hide');
            Swal.fire({
                icon: 'success',
                title: 'Guardado Exitoso',
                showConfirmButton: false,
                timer: 1500
            })
            cleanFieldsModalCourseGroup();
        },
        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });

});


// Rawlist to List
function saveListCourseGroup(rawList) {
    return JSON.parse("[" + rawList + "]");
}


/*--------------------------------------------- EDIT COURSE-----------------------------------------------------------*/

//ACTION OPEN MODAL
$("#courseTable tbody").on("click", "#buttonModalCourseEdit", function () {
    var dataInfoCourse = tableCourse.row($(this).parents("tr")).data();
    document.getElementById("courseTitleModalEdit").innerHTML = `<h4>Curso: ${dataInfoCourse.code}  ${dataInfoCourse.name} </h4>`;
    idCourseEdit = dataInfoCourse.id;

    $('#courseNameEdit').val(dataInfoCourse.name);
    $('#creditsNumberEdit').val(dataInfoCourse.credits);

    if (dataInfoCourse.state == 1) {
        $("#courseStatusEdit").prop('checked', true);
    } else {
        $("#courseStatusEdit").prop('checked', false);
    }

});


//VALIDATIONS
function checkCourseNameEdit(course) {
    if ((course.length < 10 || course.length > 150) || !(/^[a-zA-Z \u00E0-\u00FC\u00f1\u00d1]+$/.test(course)) || !course) {
        return false;
    } else {
        return true;
    }
}

function checkCourseCreditsNumberEdit(courseCreditsNumber) {

    if ((courseCreditsNumber < 1 || courseCreditsNumber > 5)) {
        return false;
    } else {
        return true;
    }
}

function cleanErrorInputCourseEdit() {
    $('#courseNameEdit').removeClass("formInput-error");
    $('#creditsNumberEdit').removeClass("formInput-error");
}

function putErrorInputCourse(Course) {
    cleanErrorInputCourseEdit();
    var validate = false;

    if (!checkCourseCreditsNumberEdit(Course.name)) {
        $('#courseNameEdit').addClass("formInput-error");
        validate = true;
    }
    if (!checkCourseCreditsNumber(Course.credits)) {
        $('#creditsNumberEdit').addClass("formInput-error");
        validate = true;
    }
    return validate;
}

//ACTION UPDATE
registerCourseEdit.addEventListener("submit", function (e) {
    e.preventDefault();

    var checkStatusEdit = $("input[name='courseStatusEdit']").is(':checked') ? 1 : 0; //Validate if th input is checked or not

    var course = {
        id: idCourseEdit,
        name: $('#courseNameEdit').val(),
        credits: parseInt($('#creditsNumberEdit').val()),
        state: checkStatusEdit
    };

    if (!putErrorInputCourse(course)) {
        Swal.fire({
            title: "Esta seguro que desea modificar este curso?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: `Confirmar`,
            denyButtonText: `Cancelar`,
        }).then((result) => {

            if (result.isConfirmed) {
                $.ajax({
                    url: "/Course/Update",
                    data: JSON.stringify(course),
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        $('#modalCourseEdit').modal('hide');
                        $('#courseTable').DataTable().ajax.reload();
                        Swal.fire({
                            icon: 'success',
                            title: 'Modificado Exitoso',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        cleanFieldsModalEdit();
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

function cleanFieldsModalEdit() {
    registerCourseEdit.reset();
}