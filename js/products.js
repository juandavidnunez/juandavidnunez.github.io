document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const modal = document.createElement("div");
  modal.classList.add("modal");
  document.body.appendChild(modal);

  // Ruta al archivo JSON
  const dataFilePath = "../data/products.json";

  // Función para cargar datos
  const fetchProducts = async () => {
      try {
          const response = await fetch(dataFilePath);
          if (!response.ok) throw new Error("No se pudo cargar los productos");
          const products = await response.json();
          renderProducts(products);
      } catch (error) {
          console.error("Error al cargar los productos:", error);
      }
  };

  // Función para renderizar los productos
  const renderProducts = (products) => {
      productList.innerHTML = ""; // Limpiar la lista
      products.forEach((product) => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");

          productCard.innerHTML = `
              <img src="../img/${product.imagen}" alt="${product.nombre}">
              <h3>${product.nombre}</h3>
              <p class="product-price">Precio: $${parseFloat(product.precio).toFixed(2)}</p>
          `;

          productCard.addEventListener("click", () => {
              openModal(product);
          });

          productList.appendChild(productCard);
      });
  };

  // Función para abrir el modal
  const openModal = (product) => {
      modal.innerHTML = `
          <div class="modal-content">
              <span class="close">&times;</span>
              <img src="../img/${product.imagen}" alt="${product.nombre}" class="modal-image">
              <h3>${product.nombre}</h3>
              <p class="product-price">Precio: $${parseFloat(product.precio).toFixed(2)}</p>
              <a 
                  href="https://wa.me/3136775803?text=${encodeURIComponent(
                      `Hola, estoy interesado en el producto: ${product.nombre}.\nPrecio: $${parseFloat(product.precio).toFixed(
                          2
                      )}.`
                  )}" 
                  target="_blank" 
                  class="whatsapp-button"
              >
                  Pedir por WhatsApp
              </a>
          </div>
      `;
      modal.style.display = "block";

      modal.querySelector(".close").addEventListener("click", () => {
          modal.style.display = "none";
      });
  };

  // Llamar a la función para cargar productos
  fetchProducts();
});
