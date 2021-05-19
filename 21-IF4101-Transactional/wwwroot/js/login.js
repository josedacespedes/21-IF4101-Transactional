"use strict";
var studentHobbies = "";
var studentProfileImage = "";
var loginForm = document.getElementById("loginForm");
var alertMessageToSendLogin = document.getElementById("messageToSendLogin");

// Login

$(document).ready(function () {
    $(".displayAdmin").hide();
    $(".displayStudent").hide();
    $(".displayProfessor").hide();
});

//SHOW/HID PASSWORD
$('#showPasswordLogin').hover(function () {
    $('#passwordLogin').attr('type', 'text');
}, function () {
    $('#passwordLogin').attr('type', 'password');
});


//VALIDATIONS

function checkEmailLogin(email) {
    if (email == "" || !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@ucr\.ac\.cr/.test(email)) || !email) {
        return false;
    } else {
        return true;
    }
}

function checkPasswordLogin(password) {
    if (password == "" || (password.length != 8) || !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!.#$%^&*_=+-]).*$/.test(password)) || !password) {
        return false;
    } else {
        return true;
    }
}


function cleanErrorInputLogin() {
    $('#emailLogin').removeClass("formInput-error");
    $('#passwordLogin').removeClass("formInput-error");
}

function putErrorInputLogin(email, password) {

    var validate = true;
    cleanErrorInputLogin();
    if (!checkEmailLogin(email)) {
        $('#emailLogin').addClass("formInput-error");
        alert("Invalidate email!");
        validate = false;
    }
    if (!checkPasswordLogin(password)) {
        $('#passwordLogin').addClass("formInput-error");
        alert("Invalidate password!")
        validate = false;
    }
    return validate;
}


//ACTION SIGN IN
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var login = {
        email: $('#emailLogin').val(),
        password: $('#passwordLogin').val()
    }

    if (putErrorInputLogin(login.email, login.password)) {
        $.ajax({
            url: "/Login/Login",
            data: JSON.stringify(login),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {  //(result = 1): Admin  (result = 2): Student  (result = 3): Professor
                if (result == 1) {
                    loginForm.reset(); //Clean form fields
                    showDisplay("admin");
                    loadConsultList();
                }
                else if (result == 2) {
                    loginForm.reset(); //Clean form fields
                    showDisplay("student");
                    setNameStudent();
                    loadConsultList();
                } else if (result == 3) {
                    loginForm.reset(); //Clean form fields
                    showDisplay("professor");
                    setNameProfessor();
                    loadConsultList();
                    loadAppointment();
                } else if (result == 0) {
                    alertMessageToSendLogin.innerHTML = `<label class="text-danger">Email o contraseña incorrecta</label>`;
                }
            },
            error: function (errorMessage) {
                alert("Error de contraseña o usuario");
            }
        });
    }
});

//HIDE MSG FORM
$("#emailLogin").click(function () {
    alertMessageToSendLogin.innerHTML = "";
});
$("#passwordLogin").click(function () {
    alertMessageToSendLogin.innerHTML = "";
});

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
            $(".displayAll").show();
            $(".displayAdmin").show();
            break;
        case "student":
            hiddenAll();
            $(".displayAll").show();
            $(".displayStudent").show();
            break;
        case "professor":
            hiddenAll();
            $(".displayAll").show();
            $(".displayProfessor").show();
            break;
    }
}

function logOut() {
    $(".displayAdmin").hide();
    $(".displayStudent").hide();
    $(".displayProfessor").hide();
    $(".displayAll").show();
    $(".displayNoUser").show();
}

/*--------------------------------------------- PROFILE STUDENT -----------------------------------------------------------*/

var profileStudentHobbies, studentEmail, studentImage, newImageStudent, filePathStudentImage= null;


function setNameStudent() {

    $.ajax({
        url: "/Student/GetSessionVariables",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            document.getElementById('profileNameStudent').innerHTML = result;
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

$("#showModalStudentProfile").click(function () {
    $.ajax({
        url: "/Student/GetProfile",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result.image != "") {
                document.getElementById('profileStudentImage').innerHTML = `<img src=` + result.image + ` id="imgStudentProfile" class="center-block img-circle" alt="Imagen de Perfil" width="150" height="150">`;
            } else {
                document.getElementById('profileStudentImage').innerHTML = `<img src="images/userDefault.png" id="imgStudentProfile" class="center-block img-circle" alt="Imagen de Perfil" width="150" height="150">`;
            }
           
            document.getElementById('hProfileNameStudent').innerHTML = result.firstName + ' ' + result.lastName;
            document.getElementById('hProfileEmailStudent').innerHTML = result.email;
            document.getElementById('hProfileCarnetStudent').innerHTML = result.studentId;
            document.getElementById('inputStudentHobbies').value = result.likes;

            profileStudentHobbies = result.likes;
            studentEmail = result.email;
            studentImage = result.image;

            $('#imgStudentProfile').on("click", function () {
                $('#imgFileProfileStudent').click();
            });
                    
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });

});


//VALIDATIONS
function checkInputValue(value) {

    if ((value.length < 10 || value.length > 255)) {
        return false;
    } else {
        return true;
    }
}

function putErrorInputStudentProfile(Student) {

    var validate = false;

    if (!checkInputValue(Student.likes)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal...',
            footer: '<a href>El espacio de intereses debe ser más extenso, no se guardarán sus cambios.</a>'
        });

        validate = true;
    }

    return validate;
}


/*--------------------------------------------- MODIFY PROFILE STUDENT -----------------------------------------------------------*/

$("#modalStudentProfile").on("click", "#buttonCloseProfile", function () {

    if ($('#imgFileProfileStudent').get(0).files.length === 0) {
        newImageStudent = studentImage;
    } else {
        
        newImageStudent = 'images/' + document.getElementById("imgFileProfileStudent").files[0].name;
    }   
   
    if (profileStudentHobbies != $('#inputStudentHobbies').val() || studentImage != newImageStudent) {

        var student = {
            email: studentEmail,
            image: newImageStudent,
            likes: $('#inputStudentHobbies').val()
        }


        if (!putErrorInputStudentProfile(student)) {
            Swal.fire({
                title: "¿Desea guardar los cambios?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: `Confirmar`,
                denyButtonText: `Cancelar`,
            }).then((result) => {

                if (result.isConfirmed) {
                    if (studentImage != newImageStudent) {
                        saveStudentProfileImage();
                    }
                    
                    $.ajax({
                        url: "/Student/UpdateProfile",
                        data: JSON.stringify(student),
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",

                        success: function (result) {

                            Swal.fire({
                                icon: 'success',
                                title: 'Modificado Exitoso',
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

    }

});

function saveStudentProfileImage() {
   
    var imgFileProfileStudent =  document.getElementById("imgFileProfileStudent").files[0];
    var formData = new FormData();
    formData.append("files", imgFileProfileStudent);

    $.ajax({
        url: "/Student/SaveImageProfile",
        data: formData,
        type: "POST",
        contentType: false,
        processData: false,

        success: function (result) {
        },

        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });
}


/*--------------------------------------------- PROFILE PROFESSOR -----------------------------------------------------------*/
var profileProfessorHobbies, profileProfessorVocationalTraining, profileProfessorFacebook, profileProfessorLinkedIn, profileProfessorGithub, professorEmail, profileProfessorImg = null;
var newImageProfessor, newProfessorHobbies, newVocational, newFacebook, newLinkedIn, newGithub = null;

function setNameProfessor() {

    $.ajax({
        url: "/Professor/GetSessionVariables",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            document.getElementById('profileNameProfessor').innerHTML = result;
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}


$("#showModalProfessorProfile").click(function () {
    $.ajax({
        url: "/Professor/GetProfile",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result.image != "") {
                document.getElementById('profileProfessorImage').innerHTML = `<img src=` + result.imageProfessor + `  id="imgProfessorProfile" class="center-block img-circle" alt="Imagen de Perfil" width="150" height="150">`;
            } else {
                document.getElementById('profileProfessorImage').innerHTML = `<img src="images/userDefault.png" id="imgProfessorProfile" class="center-block img-circle" alt="Imagen de Perfil" width="150" height="150">`;
            }
            
            document.getElementById('hProfileNameProfessor').innerHTML = result.firstNameProfessor + ' ' + result.lastNameProfessor;
            document.getElementById('hProfileEmailProfessor').innerHTML = result.emailProfessor;
            document.getElementById('hProfileCodeProfessor').innerHTML = result.idProfessor;
            document.getElementById('inputProfessorTraining').value = result.vocationalTrainingProfessor;
            document.getElementById('inputProfessorHobbies').value = result.likesProfessor;

            var links = getLinksProfessor(result.linksProfessor);
            document.getElementById('inputFacebookProfessor').value = links[0];
            document.getElementById('inputProfessorLinkedIn').value = links[1];
            document.getElementById('inputProfessorGithub').value = links[2];


            document.getElementById('facebookProfileProfessor').href = links[0];
            document.getElementById('linkedinProfileProfessor').href = links[1];
            document.getElementById('githubProfileProfessor').href = links[2];


            //VARIABLES ANTIGUAS PARA MOIFICAR
            profileProfessorImg = result.imageProfessor;
            profileProfessorHobbies = result.likesProfessor;
            profileProfessorVocationalTraining = result.vocationalTrainingProfessor;
            profileProfessorFacebook = links[0];
            profileProfessorLinkedIn = links[1];
            profileProfessorGithub = links[2];

            //VARIABLES NUEVAS PARA MODIFICAR
           

            professorEmail = result.emailProfessor;
            newImageProfessor = result.imageProfessor;

          
            $('#imgProfessorProfile').on("click", function () {
                $('#imgFileProfileProfessor').click();
            });
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });

});


function getLinksProfessor(rawList) {
    var array = rawList.split(",");
    return array;
}


function putErrorInputProfessorProfile(Professor) {

    var validate = false;

    if (!checkInputValue(Professor.likesProfessor)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal...',
            footer: '<a href>El espacio de intereses debe ser más extenso, no se guardarán sus cambios.</a>'
        });

        validate = true;
    }


    if (!checkInputValue(Professor.vocationalTrainingProfessor)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal...',
            footer: '<a href>El espacio de formación profesional debe ser más extenso, no se guardarán sus cambios.</a>'
        });

        validate = true;
    }

    return validate;
}

function validateChanges(profileProfessorHobbies, profileProfessorVocationalTraining, profileProfessorFacebook, profileProfessorLinkedIn, profileProfessorGithub, profileProfessorImg) {
    var validate = false;

      
    if (profileProfessorVocationalTraining != newVocational) {
        validate = true;
    }else
    if (profileProfessorHobbies != newProfessorHobbies) {
        validate = true;
    } else
    if (profileProfessorFacebook != newFacebook) {
        validate = true;
    } else
    if (profileProfessorLinkedIn != newLinkedIn) {
        validate = true;
    } else
    if (profileProfessorGithub != newGithub) {
        validate = true;
    } else
    if (profileProfessorImg != newImageProfessor) {
        validate = true;
    }
    
    return validate;
}

/*--------------------------------------------- MODIFY PROFILE PROFESSOR -----------------------------------------------------------*/

$("#modalProfessorProfile").on("click", "#buttonCloseProfile", function () {

    newProfessorHobbies = $('#inputProfessorHobbies').val();
    newVocational = $('#inputProfessorTraining').val();
    newFacebook = $('#inputFacebookProfessor').val();
    newLinkedIn = $('#inputProfessorLinkedIn').val();
    newGithub = $('#inputProfessorGithub').val();

    if ($('#imgFileProfileProfessor').get(0).files.length === 0) {
        newImageProfessor = profileProfessorImg;
    } else {
        newImageProfessor = 'images/' + document.getElementById("imgFileProfileProfessor").files[0].name;
    } 

    if (validateChanges(profileProfessorHobbies, profileProfessorVocationalTraining, profileProfessorFacebook, profileProfessorLinkedIn, profileProfessorGithub, profileProfessorImg)) {

        var professor = {
            emailProfessor: professorEmail,
            imageProfessor: newImageProfessor,
            likesProfessor: newProfessorHobbies,
            vocationalTrainingProfessor: newVocational,
            linksProfessor: newFacebook + "," + newLinkedIn + "," + newGithub
        }

        if (!putErrorInputProfessorProfile(professor)) {
            Swal.fire({
                title: "¿Desea guardar los cambios?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: `Confirmar`,
                denyButtonText: `Cancelar`,
            }).then((result) => {

                if (result.isConfirmed) {
                    if (profileProfessorImg != newImageProfessor) {
                        saveProfessorProfileImage();
                    }

                    $.ajax({
                        url: "/Professor/UpdateProfile",
                        data: JSON.stringify(professor),
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",

                        success: function (result) {

                            Swal.fire({
                                icon: 'success',
                                title: 'Modificado Exitoso',
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

       

    }

});

function saveProfessorProfileImage() {

    var imgFileProfileProfessor = document.getElementById("imgFileProfileProfessor").files[0];
    var formData = new FormData();
    formData.append("files", imgFileProfileProfessor);

    $.ajax({
        url: "/Professor/SaveImageProfile",
        data: formData,
        type: "POST",
        contentType: false,
        processData: false,

        success: function (result) {
        },

        error: function (errorMessage) {
            alert("Error");
            alert(errorMessage.responseText);
        }
    });
}

function init() {

    var inputFile = document.getElementById('imgFileProfileStudent');

    inputFile.addEventListener('change', showImageStudent, false);
}

function showImageStudent(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = document.getElementById('imgStudentProfile');
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
}

window.addEventListener('load', init, false);

function initProfessor() {
    var inputFile = document.getElementById('imgFileProfileProfessor');
    inputFile.addEventListener('change', showImageProfessor, false);
}

function showImageProfessor(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = document.getElementById('imgProfessorProfile');
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
}

window.addEventListener('load', initProfessor, false);