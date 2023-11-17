let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoIn = document.querySelector("#carrito-in");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll("#carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-in-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-in-comprar");
const cerrar = document.querySelector("#cerrar");
const wrapper = document.querySelector("#wrapper");
const ingresa = document.querySelector("#ingresa");
const cerrar2 = document.querySelector("#cerrar2");
const wrapper2 = document.querySelector("#wrapper2");
const ingresa2 = document.querySelector("#signup");
const login = document.querySelector("#login-boton");
const signup = document.querySelector("#signup-boton");
const ofertas = document.querySelector("#ofertas");
const historial = document.querySelector("#historial");



function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoIn.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled"); 
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3 class="carrito-producto-titulo">${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>   
                <div class="carrito-producto-precio">
                    <small>Precio unitario</small>
                    <p>u$ ${producto.precio}</p>
                </div>        
                <div class="carrito-producto-subtotal">
                    <small>Total</small>
                    <p>u$ ${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><img class="cart" src="./img/cross.png" alt="cross icon"></button>
            `;
            contenedorCarritoProductos.append(div);
        })
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoIn.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal()
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `u$ ${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoIn.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}

function alternar(mostrar, ocultar) {
    mostrar.classList.remove("disabled");
    if (ocultar) {
        ocultar.classList.add("disabled");
    }
}

function mostrarToast(message) {
    Toastify({
        text: message,
        duration: 1500
    }).showToast();
}

ingresa.addEventListener("click", () => {
    alternar(wrapper, wrapper2);
});

ingresa2.addEventListener("click", () => {
    alternar(wrapper2, wrapper);
});

cerrar.addEventListener("click", () => {
    wrapper.classList.add("disabled");
});

cerrar2.addEventListener("click", () => {
    wrapper2.classList.add("disabled");
});

login.addEventListener("click", () => {
    mostrarToast("Funcion no disponible");
});

signup.addEventListener("click", () => {
    mostrarToast("Funcion no disponible");
});

ofertas.addEventListener("click", () => {
    mostrarToast("Funcion disponible para usuarios");
});

historial.addEventListener("click", () => {
    mostrarToast("Funcion disponible para usuarios");
});
