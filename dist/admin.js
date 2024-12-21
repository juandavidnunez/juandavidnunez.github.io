// Elementos del DOM
var form = document.getElementById('product-form');
var categoryInput = document.getElementById('category');
var nameInput = document.getElementById('name');
var stockInput = document.getElementById('stock');
var priceInput = document.getElementById('price');
var imageInput = document.getElementById('image');
var productList = document.getElementById('product-list');
// Función para guardar producto en localStorage
function saveProduct(productData) {
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push(productData);
    localStorage.setItem('products', JSON.stringify(products));
}
// Función para cargar productos de localStorage
function loadProducts() {
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    products.forEach(function (product) {
        addProductToList(product);
    });
}
// Crear producto
form.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    var category = categoryInput.value.trim();
    var productName = nameInput.value.trim();
    var stock = stockInput.value;
    var price = parseFloat(priceInput.value);
    var imageFile = (_a = imageInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (!category || !productName || isNaN(price) || !imageFile) {
        alert('Todos los campos son obligatorios');
        return;
    }
    var reader = new FileReader();
    reader.onload = function () {
        var productData = {
            category: category,
            productName: productName,
            stock: stock,
            price: price,
            image: reader.result, // Base64 data URL
        };
        // Guardar datos y mostrar producto
        saveProduct(productData);
        addProductToList(productData);
        // Limpiar formulario
        form.reset();
        alert('Producto creado con éxito');
    };
    reader.readAsDataURL(imageFile);
});
// Mostrar producto en la lista
function addProductToList(productData) {
    var productDiv = document.createElement('div');
    productDiv.classList.add('product-item');
    productDiv.innerHTML = "\n    <img src=\"".concat(productData.image, "\" alt=\"").concat(productData.productName, "\" />\n    <div class=\"product-info\">\n      <h4>").concat(productData.productName, "</h4>\n      <p>Categor\u00EDa: ").concat(productData.category, "</p>\n      <p>Estado: ").concat(productData.stock, "</p>\n      <p>Precio: $").concat(productData.price.toFixed(2), "</p>\n    </div>\n    <button class=\"delete-btn\">Eliminar</button>\n  ");
    var deleteBtn = productDiv.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function () {
        productDiv.remove();
        deleteProduct(productData.productName);
    });
    productList.appendChild(productDiv);
}
// Eliminar producto
function deleteProduct(productName) {
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    products = products.filter(function (product) { return product.productName !== productName; });
    localStorage.setItem('products', JSON.stringify(products));
}
// Cargar productos al iniciar
loadProducts();
