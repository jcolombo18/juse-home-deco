const formulario = document.getElementById("product-form");
const listaProductos = document.getElementById("product-list");
const botonGuardar = document.getElementById("boton-guardar");
const listaStock = document.getElementById("stock-list");

// ELEMENTOS DE GESTIÓN DE CLIENTES
const formularioClientes = document.getElementById("client-form");
const listaClientes = document.getElementById("client-list");
const botonGuardarCliente = document.getElementById("boton-guardar-cliente");

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

let productos = JSON.parse(localStorage.getItem("productos")) || [];
let indiceEdicion = null;

// DATOS DE CLIENTES
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let indiceEdicionCliente = null;

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

// MOSTRAR CONTROL DE STOCK
// Mostrar el control de stock
function mostrarStock() {
    listaStock.innerHTML = "";

    productos.forEach(producto => {
        const fila = document.createElement("tr");

        const cantidad = Number(producto.stock);

        const estado = cantidad === 0
            ? "Sin stock"
            : cantidad <= 5
                ? "Stock bajo"
                : "Disponible";

        const datos = [
            producto.nombre,
            producto.categoria,
            "$" + producto.precio,
            producto.stock,
            estado
        ];

        datos.forEach(dato => {
            const celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        const claseEstado = cantidad === 0
            ? "sin-stock"
            : cantidad <= 5
                ? "stock-bajo"
                : "disponible";

        fila.lastElementChild.classList.add("estado-stock", claseEstado);

        listaStock.appendChild(fila);
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
     mostrarProductos();
    mostrarStock();

    // Recuperar la posición después de actualizar la lista
    requestAnimationFrame(() => {
        window.scrollTo({
            top: posicionVertical,
            left: posicionHorizontal,
            behavior: "instant"
        });
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
    mostrarStock();
}

// Mostrar los productos guardados al abrir la página
mostrarProductos();
mostrarStock();


// MOSTRAR LOS CLIENTES
function mostrarClientes() {
    listaClientes.innerHTML = "";

    clientes.forEach((cliente, indice) => {
        const fila = document.createElement("tr");

        const datos = [
            cliente.nombre,
            cliente.telefono,
            cliente.email,
            cliente.direccion
        ];

        datos.forEach(dato => {
            const celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        const celdaAcciones = document.createElement("td");

        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.addEventListener("click", () => editarCliente(indice));

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () => eliminarCliente(indice));

        celdaAcciones.appendChild(botonEditar);
        celdaAcciones.appendChild(botonEliminar);

        fila.appendChild(celdaAcciones);
        listaClientes.appendChild(fila);
    });
}

// GUARDAR UN CLIENTE NUEVO O ACTUALIZAR UNO EXISTENTE
formularioClientes.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const cliente = {
        nombre: document.getElementById("cliente-nombre").value,
        telefono: document.getElementById("cliente-telefono").value,
        email: document.getElementById("cliente-email").value,
        direccion: document.getElementById("cliente-direccion").value
    };

    if (indiceEdicionCliente === null) {
        clientes.push(cliente);
        alert("¡Cliente guardado correctamente!");
    } else {
        clientes[indiceEdicionCliente] = cliente;
        alert("¡Cliente actualizado correctamente!");
    }

    localStorage.setItem("clientes", JSON.stringify(clientes));

    formularioClientes.reset();
    indiceEdicionCliente = null;
    botonGuardarCliente.textContent = "Guardar cliente";

    mostrarClientes();
});

// EDITAR UN CLIENTE
function editarCliente(indice) {
    const cliente = clientes[indice];

    document.getElementById("cliente-nombre").value = cliente.nombre;
    document.getElementById("cliente-telefono").value = cliente.telefono;
    document.getElementById("cliente-email").value = cliente.email;
    document.getElementById("cliente-direccion").value = cliente.direccion;

    indiceEdicionCliente = indice;
    botonGuardarCliente.textContent = "Actualizar cliente";

    formularioClientes.scrollIntoView({ behavior: "smooth" });
}

// ELIMINAR UN CLIENTE
function eliminarCliente(indice) {
    if (!confirm("¿Estás segura de que querés eliminar este cliente?")) {
        return;
    }

    clientes.splice(indice, 1);

    localStorage.setItem("clientes", JSON.stringify(clientes));

    if (indiceEdicionCliente !== null) {
        formularioClientes.reset();
        indiceEdicionCliente = null;
        botonGuardarCliente.textContent = "Guardar cliente";
    }

    mostrarClientes();
}

// MOSTRAR LOS CLIENTES GUARDADOS AL ABRIR LA PÁGINA
mostrarClientes();

