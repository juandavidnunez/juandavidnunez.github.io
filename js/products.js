document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
  
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
  
        productList.appendChild(productCard);
      });
    };
  
    // Llamar a la función para cargar productos
    fetchProducts();
  });
  