const formulario = document.getElementById("product-form");
const listaProductos = document.getElementById("product-list");
const botonGuardar = document.getElementById("boton-guardar");
const listaStock = document.getElementById("stock-list");

// ELEMENTOS DE GESTIÓN DE CLIENTES
const formularioClientes = document.getElementById("client-form");
const listaClientes = document.getElementById("client-list");
const botonGuardarCliente = document.getElementById("boton-guardar-cliente");

// ELEMENTOS DE GESTIÓN DE PEDIDOS
const formularioPedidos = document.getElementById("order-form");
const listaPedidos = document.getElementById("order-list");
const selectorClientePedido = document.getElementById("pedido-cliente");
const botonGuardarPedido = document.getElementById("boton-guardar-pedido");

// ELEMENTOS DE REGISTRO DE VENTAS
const formularioVentas = document.getElementById("sales-form");
const listaVentas = document.getElementById("sales-list");
const selectorClienteVenta = document.getElementById("venta-cliente");
const selectorProductoVenta = document.getElementById("venta-producto");
const botonGuardarVenta = document.getElementById("boton-guardar-venta");

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

let productos = JSON.parse(localStorage.getItem("productos")) || [];
let indiceEdicion = null;

// DATOS DE CLIENTES
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let indiceEdicionCliente = null;
// DATOS DE PEDIDOS
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
let indiceEdicionPedido = null;
// DATOS DE VENTAS
let ventas = JSON.parse(localStorage.getItem("ventas")) || [];

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
    actualizarSelectorClientes();
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

// ACTUALIZAR EL SELECTOR DE CLIENTES PARA PEDIDOS
function actualizarSelectorClientes() {
    selectorClientePedido.innerHTML = '<option value="">Seleccioná un cliente</option>';

    clientes.forEach((cliente, indice) => {
        const opcion = document.createElement("option");
        opcion.value = indice;
        opcion.textContent = cliente.nombre;
        selectorClientePedido.appendChild(opcion);
    });
}

// MOSTRAR LOS PEDIDOS
function mostrarPedidos() {
    listaPedidos.innerHTML = "";

    pedidos.forEach((pedido, indice) => {
        const fila = document.createElement("tr");

        const datos = [
            pedido.cliente,
            pedido.descripcion,
            pedido.fecha,
            pedido.estado
        ];

        datos.forEach(dato => {
            const celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        const celdaAcciones = document.createElement("td");

        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.addEventListener("click", () => editarPedido(indice));

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () => eliminarPedido(indice));

        celdaAcciones.appendChild(botonEditar);
        celdaAcciones.appendChild(botonEliminar);

        fila.appendChild(celdaAcciones);
        listaPedidos.appendChild(fila);
    });
}

// GUARDAR UN PEDIDO NUEVO O ACTUALIZAR UNO EXISTENTE
formularioPedidos.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const indiceCliente = selectorClientePedido.value;

    if (indiceCliente === "") {
        alert("Seleccioná un cliente para el pedido.");
        return;
    }

    const pedido = {
        cliente: clientes[indiceCliente].nombre,
        descripcion: document.getElementById("pedido-descripcion").value,
        fecha: document.getElementById("pedido-fecha").value,
        estado: document.getElementById("pedido-estado").value
    };

    if (indiceEdicionPedido === null) {
        pedidos.push(pedido);
        alert("¡Pedido guardado correctamente!");
    } else {
        pedidos[indiceEdicionPedido] = pedido;
        alert("¡Pedido actualizado correctamente!");
    }

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    formularioPedidos.reset();
    indiceEdicionPedido = null;
    botonGuardarPedido.textContent = "Guardar pedido";

    mostrarPedidos();
});

// EDITAR UN PEDIDO
function editarPedido(indice) {
    const pedido = pedidos[indice];

    const indiceCliente = clientes.findIndex(
        cliente => cliente.nombre === pedido.cliente
    );

    selectorClientePedido.value = indiceCliente;
    document.getElementById("pedido-descripcion").value = pedido.descripcion;
    document.getElementById("pedido-fecha").value = pedido.fecha;
    document.getElementById("pedido-estado").value = pedido.estado;

    indiceEdicionPedido = indice;
    botonGuardarPedido.textContent = "Actualizar pedido";

    formularioPedidos.scrollIntoView({ behavior: "smooth" });
}

// ELIMINAR UN PEDIDO
function eliminarPedido(indice) {
    if (!confirm("¿Estás segura de que querés eliminar este pedido?")) {
        return;
    }

    pedidos.splice(indice, 1);

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    formularioPedidos.reset();
    indiceEdicionPedido = null;
    botonGuardarPedido.textContent = "Guardar pedido";

    mostrarPedidos();
}

// MOSTRAR LOS PEDIDOS Y CLIENTES GUARDADOS AL ABRIR LA PÁGINA
actualizarSelectorClientes();
mostrarPedidos();
