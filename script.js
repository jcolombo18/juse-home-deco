const formulario = document.getElementById("product-form");
const listaProductos = document.getElementById("product-list");

let productos = JSON.parse(localStorage.getItem("productos")) || [];

function mostrarProductos() {
    listaProductos.innerHTML = "";

    productos.forEach((producto, indice) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.categoria}</td>
            <td>$${producto.precio}</td>
            <td>${producto.stock}</td>
            <td>
                <button onclick="eliminarProducto(${indice})">
                    Eliminar
                </button>
            </td>
        `;

        listaProductos.appendChild(fila);
    });
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const producto = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        categoria: document.getElementById("categoria").value,
        precio: document.getElementById("precio").value,
        stock: document.getElementById("stock").value
    };

    productos.push(producto);

    localStorage.setItem("productos", JSON.stringify(productos));

    mostrarProductos();

    formulario.reset();

    alert("¡Producto guardado correctamente!");
});

function eliminarProducto(indice) {
    productos.splice(indice, 1);

    localStorage.setItem("productos", JSON.stringify(productos));

    mostrarProductos();
}

mostrarProductos();
