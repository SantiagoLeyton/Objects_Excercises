const cart = []; // Array vacio, aqui se guardaran los productos que se añadan al carrito
const products = [ // Lista de productos disponibles con su precio y stock
    { name: "Laptop", price: 1000, stock: 5 },
    { name: "Mouse", price: 50, stock: 10 },
    { name: "Keyboard", price: 80, stock: 7 }
];

/*
Al cargar el DOM, se muestran los productos y el carrito (el DOM son los modelos de objetos del documento)
En pocas palabras, el DOM es la representación de la página web
*/
document.addEventListener("DOMContentLoaded", function () {
    displayProducts();
    displayCart();
})

// Muestra la lista de productos disponibles en la tienda
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

// Coloca los productos en una lista para que se vea mas ordenado
    products.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.name} $${p.price} (${stockMessage(p)})`;
        productList.appendChild(li);
    });
}

// Devuelve un mensaje según el stock del producto
function stockMessage(product) {
    if (product.stock === 0) return "Out of stock!"; // Cuando el producto esta agotado
    if (product.stock === 1) return "Only one left!"; // Cuando solo queda un producto
    if (product.stock <= 3) return `Only ${product.stock} left!`; // Cuando quedan 3 productos o menos
    return `${product.stock} units available`; // Cuando hay 4 productos o mas
}

// Agrega un producto al carrito
function addToCart(name, quantity) {
    // Validar que la cantidad sea un entero positivo
    if (isNaN(quantity) || !Number.isInteger(quantity) || quantity <= 0) {
        alert("Quantity must be a positive integer");
        return;
    }

    // Buscar el producto por su nombre
    const product = products.find(p => p.name === name);
    if (!product) {
        alert("Product not found.");
        return;
    }

    // Verificar si hay suficiente stock
    if (product.stock < quantity) {
        alert("Not enough stock.");
        return;
    }

    // Buscar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: product.name, price: product.price, quantity });
    }

    // Actualizar el stock del producto
    product.stock -= quantity;
    displayCart();
    displayProducts();
}

// Remueve una cierta cantidad de un producto del carrito
function removeFromCart(name, quantity) {
    // Validar que la cantidad sea un entero positivo
    if (isNaN(quantity) || !Number.isInteger(quantity) || quantity <= 0) {
        alert("Quantity must be a positive integer");
        return;
    }

    // Buscar el producto en el carrito
    const item = cart.find(item => item.name === name);
    if (!item) {
        alert("Product not found in the cart");
        return;
    }

    // Determinar cuánto se puede remover (no más de lo que hay)
    const amountToRemove = Math.min(quantity, item.quantity);

    if (item.quantity > amountToRemove) {
        item.quantity -= amountToRemove;
    } else {
        cart.splice(cart.indexOf(item), 1);
    }

    // Devolver stock al inventario
    const product = products.find(p => p.name === name);
    if (product) {
        product.stock += amountToRemove;
    }

    displayCart();
    displayProducts();
}

// Muestra el contenido del carrito y el total de la compra
function displayCart() {
    const cartElement = document.getElementById('cart');
    const totalElement = document.getElementById('total');

    cartElement.innerHTML = '';

    // Si el carrito está vacío, mostrara este mensaje
    if (cart.length === 0) {
        cartElement.textContent = "Your cart is empty.";
        totalElement.textContent = '';
        return;
    }

    let total = 0;
    cart.forEach(item => { // Muestra los productos en modo de lista
        const li = document.createElement('li');
        li.textContent = `${item.name} - Quantity: ${item.quantity} - Subtotal: $${item.price * item.quantity}`;
        cartElement.appendChild(li);
        total += item.price * item.quantity;
    });

    totalElement.textContent = `Total: $${total}`; // Muestra el precio acumulado
}

// Pagar: vacía el carrito y muestra un mensaje de agradecimiento
function pay() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    cart.length = 0; // Vaciar el carrito
    displayCart();
    alert("Thank you for your purchase!");
}