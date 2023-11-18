const productosContainer = document.querySelector("#contenedor-productos");
const btnCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");
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

let productos = [];
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

function cargarProductos(productosSeleccionados) {
    productosContainer.innerHTML = "";
    productosSeleccionados.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${producto.titulo}</h3>
                        <p class="producto-precio">u$ ${producto.precio}</p>
                        <button class="producto-agregar" id="${producto.id}">Agregar</button>
                    </div>
        `
        productosContainer.append(div);
    })
    actualizarAgregar()
}

btnCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {
        btnCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos"
            cargarProductos(productos);
        }
    })
})

function actualizarAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarCarrito);
    })
}

let productosAgregados;
let productosAgregadosLS = localStorage.getItem("productos-en-carrito");
if (productosAgregadosLS) {
    productosAgregados = JSON.parse(productosAgregadosLS);
    actualizarNumero();
} else {
    productosAgregados = [];
}

function agregarCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosAgregados.some(producto => producto.id === idBoton)) {
        const index = productosAgregados.findIndex(producto => producto.id === idBoton);
        productosAgregados[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosAgregados.push(productoAgregado);
    };
    Swal.fire({
        position: 'bottom-end',
        color: '#A675A1',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 2000,
        imageUrl: './img/add.gif',
        imageWidth: 150,
        imageHeight: 150,
        background: '#fcfcfc'
    })

    actualizarNumero();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosAgregados));
}

function actualizarNumero() {
    let nuevoNumero = productosAgregados.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumero;
}



function mostrarResultados(resultados) {
    const resultadosContainer = document.getElementById('contenedor-productos');
    resultadosContainer.innerHTML = '';

    if (resultados.length === 0) {
        const div = document.createElement("div");
        div.classList.add("nada");
        div.innerHTML = `
            <p class="nada">No se encontraron productos</p>
                    </div>
        `
        productosContainer.append(div);
    } else {
        resultados.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                        <div class="producto-detalles">
                            <h3 class="producto-titulo">${producto.titulo}</h3>
                            <p class="producto-precio">u$ ${producto.precio}</p>
                            <button class="producto-agregar" id="${producto.id}">Agregar</button>
                        </div>
            `
            productosContainer.append(div);
            const nuevoBotonAgregar = div.querySelector(".producto-agregar");
            nuevoBotonAgregar.addEventListener("click", agregarCarrito);
        });
    }
}

document.getElementById('search-button').addEventListener('click', function () {
    const searchText = document.getElementById('search').value.toLowerCase();
    const resultados = productos.filter(producto =>
        producto.titulo.toLowerCase().includes(searchText)
    );
    mostrarResultados(resultados);
});



function buscar() {
    const searchText = document.getElementById('search').value.toLowerCase();
    const resultados = productos.filter(producto =>
        producto.titulo.toLowerCase().includes(searchText)
    );
    mostrarResultados(resultados);
}

document.getElementById('search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        buscar();
    }
});



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



