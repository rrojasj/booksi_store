`use strict`

var registeredUsers = JSON.parse(localStorage.getItem(`registered-users`)) || [];

document.getElementById('btn-login').addEventListener('click', loginUser);

function loginUser() {
    var loginEmail = document.getElementById(`input-email-login`).value
    var loginPswd = document.getElementById(`input-pswd-login`).value
    
    if (loginEmail == `` || loginPswd == ``) {
        Swal.fire({
            icon: "warning",
            title: "Advertencia",
            text: "Por favor complete todos los campos"
        });
    } else {
        var user = registeredUsers.find(u => u.email === loginEmail && u.password === loginPswd);
        
        if (user) {
            localStorage.setItem(`current-user`, JSON.stringify(user));
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Inicio de sesión exitoso',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'index.html';
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Email o contraseña incorrectos"
            });
        }
    }
}

