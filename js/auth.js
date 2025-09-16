`use strict`

// Check if user is logged in
var currentUser = JSON.parse(localStorage.getItem(`current-user`));

if (!currentUser) {
    window.location.href = 'login.html';
}