
const formulario = document.getElementById("product-form");
const listaProductos = document.getElementById("product-list");
const botonGuardar = document.getElementById("boton-guardar");

let productos = JSON.parse(localStorage.getItem("productos")) || [];
let indiceEdicion = null;

// Mostrar productos en la tabla
function mostrarProductos() {
    listaProductos.innerHTML = "";

    productos.forEach((producto, indice) => {
        const fila = document.createElement("tr");

        const datos = [
            producto.nombre,
            producto.descripcion,
            producto.categoria,
            "$" + producto.precio,
            producto.stock
        ];

        datos.forEach(dato => {
            const celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        const acciones = document.createElement("td");

        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.type = "button";
        botonEditar.addEventListener("click", () => editarProducto(indice));

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.type = "button";
        botonEliminar.addEventListener("click", () => eliminarProducto(indice));

        acciones.appendChild(botonEditar);
        acciones.appendChild(botonEliminar);
        fila.appendChild(acciones);

        listaProductos.appendChild(fila);
    });
}

// Guardar un producto nuevo o actualizar uno existente
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    // Guardar la posición actual de desplazamiento
    const posicionVertical = window.scrollY;
    const posicionHorizontal = window.scrollX;

    const producto = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        categoria: document.getElementById("categoria").value,
        precio: document.getElementById("precio").value,
        stock: document.getElementById("stock").value
    };

    if (indiceEdicion === null) {
        productos.push(producto);
        alert("¡Producto guardado correctamente!");
    } else {
        productos[indiceEdicion] = producto;
        alert("¡Producto actualizado correctamente!");
    }

    localStorage.setItem("productos", JSON.stringify(productos));

    formulario.reset();
    indiceEdicion = null;
    botonGuardar.textContent = "Guardar producto";

    mostrarProductos();

    // Recuperar la posición después de actualizar la lista
    requestAnimationFrame(() => {
        window.scrollTo(posicionHorizontal, posicionVertical);
    });
});

// Cargar los datos del producto en el formulario
function editarProducto(indice) {
    const producto = productos[indice];

    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("categoria").value = producto.categoria;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock;

    indiceEdicion = indice;
    botonGuardar.textContent = "Actualizar producto";

    document.getElementById("productos").scrollIntoView({
        behavior: "smooth"
    });
}

// Eliminar un producto
function eliminarProducto(indice) {
    productos.splice(indice, 1);

    localStorage.setItem("productos", JSON.stringify(productos));

    if (indiceEdicion !== null) {
        formulario.reset();
        indiceEdicion = null;
        botonGuardar.textContent = "Guardar producto";
    }

    mostrarProductos();
}

// Mostrar los productos guardados al abrir la página
mostrarProductos();

