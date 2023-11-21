const productos = [
    { id: 1, nombre: "Producto 1", precio: 10 },
    { id: 2, nombre: "Producto 2", precio: 20 },
    { id: 3, nombre: "Producto 3", precio: 30 },
  ];
  
  let carrito = [];
  let total = 0;
  
  function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total.toString());
  }
  
  function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    const totalGuardado = localStorage.getItem('total');
  
    if (carritoGuardado && totalGuardado) {
      carrito = JSON.parse(carritoGuardado);
      total = parseFloat(totalGuardado);
    }
  }
  
  function mostrarProductos() {
    const catalogoElement = document.getElementById("catalogo");
    catalogoElement.innerHTML = "";
  
    productos.forEach((producto) => {
      const card = document.createElement("div");
      card.classList.add("card");
  
      const titulo = document.createElement("h3");
      titulo.textContent = producto.nombre;
  
      const imagen = document.createElement("img");
      imagen.src = `images/${producto.id}.jpg`;
      imagen.alt = producto.nombre;
      imagen.classList.add("producto-imagen");
      imagen.style.width = "200px";
      imagen.style.height = "200px";
  
      const descripcion = document.createElement("p");
      descripcion.textContent = `Precio: $${producto.precio}`;
  
      const agregarBtn = document.createElement("button");
      agregarBtn.textContent = "Agregar al carrito";
  
      agregarBtn.addEventListener("click", () => agregarDesdeElCard(producto));
  
      card.appendChild(titulo);
      card.appendChild(imagen);
      card.appendChild(descripcion);
      card.appendChild(agregarBtn);
  
      catalogoElement.appendChild(card);
    });
  
    cargarCarritoDesdeLocalStorage();
  }
  
  function agregarDesdeElCard(producto) {
    carrito.push(producto);
    total += producto.precio;
    alert(`${producto.nombre} ha sido agregado al carrito.`);
    guardarCarritoEnLocalStorage();
  }
  
  function agregarAlCarrito() {
    const productoID = parseInt(prompt("Ingrese el ID del producto que desea agregar al carrito:"));
    const producto = productos.find((p) => p.id === productoID);
  
    if (producto) {
      carrito.push(producto);
      total += producto.precio;
      alert(`${producto.nombre} ha sido agregado al carrito.`);
      guardarCarritoEnLocalStorage();
    } else {
      alert("Producto no encontrado. Intente de nuevo.");
    }
  }
  
  function mostrarCarrito() {
    const carritoElement = document.getElementById("carrito");
    carritoElement.innerHTML = "Carrito de compras:";
  
    carrito.forEach((producto) => {
      carritoElement.innerHTML += `<p>ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: $${producto.precio}</p>`;
    });
  
    carritoElement.innerHTML += `<p>Total: $${total}</p>`;
  
    cargarCarritoDesdeLocalStorage();
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const mostrarBtn = document.getElementById("mostrarBtn");
    const agregarBtn = document.getElementById("agregarBtn");
    const verCarritoBtn = document.getElementById("verCarritoBtn");
    const salirBtn = document.getElementById("salirBtn");
  
    mostrarBtn.addEventListener("click", mostrarProductos);
    agregarBtn.addEventListener("click", agregarAlCarrito);
    verCarritoBtn.addEventListener("click", mostrarCarrito);
    salirBtn.addEventListener("click", function () {
      alert("Gracias por su compra.");
    });
  
    cargarCarritoDesdeLocalStorage();
  });
  