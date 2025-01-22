// Al cargar la página, muestra los productos almacenados
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
  });
  
  document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    // Obtener los valores del formulario
    const category = document.getElementById('category').value.trim();
    const name = document.getElementById('name').value.trim();
    const stock = document.getElementById('stock').value;
    const price = parseFloat(document.getElementById('price').value);
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];
  
    if (!imageFile) {
      alert('Por favor, selecciona una imagen.');
      return;
    }
  
    // Convertir la imagen a Base64
    const imageBase64 = await convertToBase64(imageFile);
  
    // Crear el objeto del producto
    const newProduct = {
      category,
      name,
      stock,
      price,
      image: imageBase64, // Imagen en formato Base64
    };
  
    // Guardar el producto en localStorage
    saveProduct(newProduct);
  
    // Limpiar el formulario
    document.getElementById('product-form').reset();
  
    // Actualizar la lista de productos
    addProductToDOM(newProduct);
    alert('Producto creado con éxito.');
  });
  
  // Función para convertir una imagen a Base64
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  
  // Función para guardar un producto en localStorage
  function saveProduct(product) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  }
  
  // Función para cargar productos desde localStorage
  function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach((product) => addProductToDOM(product));
  }
  
  // Función para agregar un producto al DOM
  function addProductToDOM(product) {
    const productsContainer = document.getElementById('products-container');
    const productElement = document.createElement('li');
    productElement.innerHTML = `
      <strong>${product.name}</strong> - ${product.category} - $${product.price.toFixed(2)} 
      (${product.stock === 'in-stock' ? 'En Stock' : 'Fuera de Stock'})<br>
      <img src="${product.image}" alt="${product.name}" style="width: 100px; height: auto;">
    `;
    productsContainer.appendChild(productElement);
  }
  