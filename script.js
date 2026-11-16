// SISTEMA DE GESTION JUSE HOME DECO

// Recuperar productos guardados
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// Obtener elementos del formulario
const formulario = document.getElementById("product-form");
const listaProductos = document.getElementById("product-list");

// Mostrar productos en la tabla
function mostrarProductos() {
    listaProductos.innerHTML = "";

    productos.forEach(function(producto, indice) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.categoria}</td>
            <td>$ ${Number(producto.precio).toFixed(2)}</td>
            <td>${producto.stock}</td>
            <td>
                <button onclick="editarProducto(${indice})">Editar</button>
                <button onclick="eliminarProducto(${indice})">Eliminar</button>
            </td>
        `;

        listaProductos.appendChild(fila);
    });
}

// Guardar productos
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const producto = {
        nombre: document.getElementById("nombre").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
        categoria: document.getElementById("categoria").value,
        precio: Number(document.getElementById("precio").value),
        stock: Number(document.getElementById("stock").value)
    };

    productos.push(producto);

    localStorage.setItem("productos", JSON.stringify(productos));

    formulario.reset();

    mostrarProductos();

    alert("¡Producto agregado correctamente!");
});

// Eliminar productos
function eliminarProducto(indice) {
    if (confirm("¿Querés eliminar este producto?")) {
        productos.splice(indice, 1);

        localStorage.setItem("productos", JSON.stringify(productos));

        mostrarProductos();
    }
}

// Editar productos
function editarProducto(indice) {
    const producto = productos[indice];

    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("categoria").value = producto.categoria;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock;

    productos.splice(indice, 1);

    localStorage.setItem("productos", JSON.stringify(productos));

    mostrarProductos();

    document.getElementById("nombre").focus();
}

// Mostrar los productos al abrir la página
mostrarProductos();
