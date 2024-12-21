import * as fs from 'fs';

// Elementos del DOM
const form = document.getElementById('product-form') as HTMLFormElement;
const categoryInput = document.getElementById('category') as HTMLInputElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const stockInput = document.getElementById('stock') as HTMLSelectElement;
const priceInput = document.getElementById('price') as HTMLInputElement;
const imageInput = document.getElementById('image') as HTMLInputElement;
const productList = document.getElementById('product-list') as HTMLDivElement;

// Ruta base para guardar datos
const dataDir = './data'; // Usa rutas relativas al proyecto
const imageDir = './img'; // Usa rutas relativas al proyecto

// Crear carpeta si no existe
function createFolderIfNotExists(path: string) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

// Guardar producto en JSON
function saveProduct(category: string, productName: string, productData: object) {
  const categoryPath = `${dataDir}/${category}`;
  createFolderIfNotExists(categoryPath);

  const productPath = `${categoryPath}/${productName}.json`;
  try {
    fs.writeFileSync(productPath, JSON.stringify(productData, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error al guardar el producto:', error);
  }
}

// Guardar imagen
function saveImage(imageFile: File, productName: string) {
  createFolderIfNotExists(imageDir);

  const reader = new FileReader();
  reader.onload = function () {
    const buffer = Buffer.from(reader.result as ArrayBuffer);
    const imagePath = `${imageDir}/${productName}-${imageFile.name}`;
    try {
      fs.writeFileSync(imagePath, buffer);
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
    }
  };
  reader.readAsArrayBuffer(imageFile);
}

// Crear producto
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const category = categoryInput.value.trim();
  const productName = nameInput.value.trim();
  const stock = stockInput.value;
  const price = parseFloat(priceInput.value);
  const imageFile = imageInput.files?.[0];

  if (!category || !productName || isNaN(price) || !imageFile) {
    alert('Todos los campos son obligatorios');
    return;
  }

  const productData = {
    category,
    productName,
    stock,
    price,
    image: `${productName}-${imageFile.name}`,
  };

  // Guardar datos y mostrar producto
  saveProduct(category, productName, productData);
  saveImage(imageFile, productName);
  addProductToList(productData);

  // Limpiar formulario
  form.reset();
  alert('Producto creado con éxito');
});

// Mostrar producto en la lista
function addProductToList(productData: any) {
  const productDiv = document.createElement('div');
  productDiv.classList.add('product-item');

  productDiv.innerHTML = `
    <img src="./img/${productData.image}" alt="${productData.productName}" />
    <div class="product-info">
      <h4>${productData.productName}</h4>
      <p>Categoría: ${productData.category}</p>
      <p>Estado: ${productData.stock}</p>
      <p>Precio: $${productData.price.toFixed(2)}</p>
    </div>
    <button class="delete-btn">Eliminar</button>
  `;

  const deleteBtn = productDiv.querySelector('.delete-btn') as HTMLButtonElement;
  deleteBtn.addEventListener('click', () => {
    productDiv.remove();
    deleteProduct(productData.category, productData.productName);
  });

  productList.appendChild(productDiv);
}

// Eliminar producto
function deleteProduct(category: string, productName: string) {
  const productPath = `${dataDir}/${category}/${productName}.json`;
  if (fs.existsSync(productPath)) {
    try {
      fs.unlinkSync(productPath);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  }
}
