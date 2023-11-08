let productos = [];
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
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


function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {

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
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar()
}

botonesCategorias.forEach(boton => {
        boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
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

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
        } else {
            productoAgregado.cantidad = 1;
            productosEnCarrito.push(productoAgregado);
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

        actualizarNumerito();
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

// Busqueda ********************

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
        contenedorProductos.append(div);
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
            contenedorProductos.append(div);

            const nuevoBotonAgregar = div.querySelector(".producto-agregar");
            nuevoBotonAgregar.addEventListener("click", agregarAlCarrito);
        });
    }
}

document.getElementById('search-button').addEventListener('click', function() {
    const searchText = document.getElementById('search').value.toLowerCase();
    const resultados = productos.filter(producto =>
        producto.titulo.toLowerCase().includes(searchText)
    );
    mostrarResultados(resultados);
});


// Buscar con la tecla enter

document.getElementById('search').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        buscar();
    }
});

function buscar() {
    const searchText = document.getElementById('search').value.toLowerCase();
    const resultados = productos.filter(producto =>
        producto.titulo.toLowerCase().includes(searchText)
    );
    mostrarResultados(resultados);
}

// Sector menu login y alerts

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




















