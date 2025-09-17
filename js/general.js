
window.addEventListener('load', () => {
    verifyBooksDataLS();
    displayBooks();
});

/**
 * Maneja el efecto de transición del logo cuando el mouse entra en la barra de navegación
 * - Realiza un fade out del logo actual
 * - Cambia a la versión hover del logo
 * - Ejecuta un fade in para mostrar la nueva versión
 */
document.querySelector('.navbar-style').addEventListener('mouseenter', function() {
    const img = document.querySelector('.navbar-logo img');
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = 'imgs/booksy_logo_navbar_2.png';
        img.width = 35;
        img.height = 40;
        img.style.opacity = '1';
    }, 150);
});

/**
 * Maneja el efecto de transición del logo cuando el mouse abandona la barra de navegación
 * - Realiza un fade out del logo en estado hover
 * - Restaura el logo a su versión original
 * - Ejecuta un fade in para mostrar el logo predeterminado
 */
document.querySelector('.navbar-style').addEventListener('mouseleave', function() {
    const img = document.querySelector('.navbar-logo img');
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = 'imgs/booksy_logo_navbar_1.png';
        img.width = 35;
        img.height = 40;
        img.style.opacity = '1';
    }, 150);
});

var currentEmail = document.getElementById('nav-name');
var currentID = document.getElementById('nav-id');
var currentUser = JSON.parse(localStorage.getItem('current-user'));

currentEmail.textContent = currentUser.email;
currentID.textContent = currentUser.id;

document.getElementById('btn-logout').addEventListener('click', logoutUser);

/**
 * Cierra la sesión del usuario actual eliminando los datos de la sesión y redirigiendo al login
 * Elimina current-user del localStorage y navega hacia login.html
 */
function logoutUser() {
    localStorage.removeItem('current-user');
    window.location.href = 'login.html';
}

/**
 * 
 */
async function loadData() {
    try {
        const response = await fetch('json/booksy_data.json');
        const data = await response.json();
        localStorage.setItem('books', JSON.stringify(data));
        console.log('Libros almacenados en localStorage satisfactoriamente');
    } catch(error) {
        console.error('Error al cargar los datos:', error);
    } 
}

function verifyBooksDataLS() {
    if (localStorage.getItem('books') === null) {
        loadData();
    }
}

/**
 * Crea un elemento de lista para un libro con los datos especificados
 * @param {string} title - El título del libro  
 * @param {string} description - La descripción del libro
 * @param {number} quantity - La cantidad de libros
 * @returns {HTMLElement} El elemento de lista creado
 */
function createBookElement(isbn, name, qty) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-start';
    
    li.innerHTML = `
        <div class="ms-2 me-auto">
            <div class="fw-bold text-start">${name}</div>
            <div class="ms-0" style="font-size:12px;">ISBN: ${isbn}</div>
        </div>
        <div><span class="badge text-bg-booksy rounded-pill" data-bs-toggle="tooltip" data-bs-placement="top" title="Disponibles">${qty}</span></div>
        <span data-bs-toggle="modal data-bs-targer="#cart-item-modal">
            <div id="${isbn}" class="ms-3 add-book-cart" style="color:#E16666;" data-bs-toggle="tooltip" data-bs-placement="top" title="Agregar al carrito"><i class="fa-solid fa-plus"></i></div>
        </span>
    `;
    
    return li;
}

/**
 * Obtiene los libros almacenados en localStorage, los parsea desde JSON
 * y los muestra en el elemento lista de la interfaz de usuario
 * @throws {Error} Si no hay datos en localStorage o si el JSON es inválido
 */
function displayBooks() {
    const data = JSON.parse(localStorage.getItem('books'));
    const bookList = document.querySelector('.list-group-numbered');
    
    data.books.forEach(book => {
        const bookElement = createBookElement(book.isbn, book.name, book.qty);
        bookList.appendChild(bookElement);
    });
    
    // Add event listeners to cart buttons
    document.querySelectorAll('.add-book-cart').forEach(button => {
        button.addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('cart-item-modal'));
            modal.show();
        });
    });
}

/**
 * Muestra un modal con la información del libro con los formatos de compra disponibles
 */

