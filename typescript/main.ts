document.addEventListener('DOMContentLoaded', () => {
    const productListElement = document.getElementById('product-list');
  
    if (productListElement) {
      fetch('../data/products.json') // Cambia la ruta si usas subcarpetas específicas
        .then(response => response.json())
        .then((products: { name: string; price: number; stock: string; image: string }[]) => {
          products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.innerHTML = `
              <h3>${product.name}</h3>
              <p>Precio: $${product.price}</p>
              <p>${product.stock === 'in-stock' ? 'En stock' : 'Agotado'}</p>
              <img src="../imag/${product.image}" alt="${product.name}" width="100">
            `;
            productListElement.appendChild(productCard);
          });
        })
        .catch(err => console.error('Error cargando los productos:', err));
    }
  });
  