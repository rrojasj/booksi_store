`use strict`

// Get all users registered or initialize an empty array
var registeredUsers = JSON.parse(localStorage.getItem(`registered-users`)) || [];

document.getElementById('btn-registration').addEventListener('click', registerUser);
document.getElementById('btn-cancel').addEventListener('click', clearInputs);

function registerUser () {
    var regName = document.getElementById(`input-name-registration`).value
    var regLastName = document.getElementById(`input-lastname-registration`).value
    var regID = document.getElementById(`input-id-registration`).value
    var regEmail = document.getElementById(`input-email-registration`).value
    var regPswd = document.getElementById(`input-pswd-registration`).value
    
    validateRegistration(regName, regLastName, regID, regEmail, regPswd)
}

var regIDInput = document.getElementById(`input-id-registration`);

regIDInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 9);
});

function validateRegistration(regName, regLastName, regID, regEmail, regPswd) {
    if (regName == `` || regLastName == `` || regID == `` || regEmail == `` || regPswd == ``) {
        Swal.fire({
            icon: "warning",
            title: "Advertencia",
            text: "Por favor complete los espacios requeridos"
        });
    } else if (regPswd.length < 8) {
        Swal.fire({
            icon: "error",
            title: "Incorrecto",
            text: "La contraseña debe ser de al menos 8 caracteres"
        });
    } else if (regID.length !== 9) {
        Swal.fire({
            icon: "error",
            title: "Incorrecto",
            text: "El ID debe ser de 9 dígitos"
        });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) {
        Swal.fire({
            icon: "error",
            title: "Incorrecto",
            text: "Por favor ingrese un email válido"
        });
    } else {
        var newUser = {
            name: regName,
            lastName: regLastName,
            id: regID,
            email: regEmail,
            password: regPswd,
        }
        registeredUsers.push(newUser)
        localStorage.setItem(`registered-users`, JSON.stringify(registeredUsers))
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario registrado satisfactoriamente',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = 'index.html';
            }
          });
    }
}

function clearInputs() {
    document.getElementById(`input-name-registration`).value = ``
    document.getElementById(`input-lastname-registration`).value = ``
    document.getElementById(`input-id-registration`).value = ``
    document.getElementById(`input-email-registration`).value = ``
    document.getElementById(`input-pswd-registration`).value = ``
}