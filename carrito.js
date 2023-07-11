var cartItems = [];
var cartTotal = 0;

function updateCart() {
    var cartItemsElement = document.getElementById("cart-items");
    var cartTotalElement = document.getElementById("cart-total");
    var cartCountElement = document.getElementById("cart-count");

    // Limpiar el contenido del carrito
    cartItemsElement.innerHTML = "";

    // Recorrer los productos en el carrito y agregarlos al carrito HTML
    for (var i = 0; i < cartItems.length; i++) {
        var item = cartItems[i];

        // Crear un nuevo elemento de lista para el producto
        var newItem = document.createElement("li");
        newItem.textContent = item.name + " - $" + (item.price * item.quantity).toFixed(2) + " - Cantidad: " + item.quantity;

        // Agregar el nuevo elemento a la lista del carrito
        cartItemsElement.appendChild(newItem);
    }

    // Calcular el total del carrito
    cartTotal = cartItems.reduce(function(total, item) {
        return total + (item.price * item.quantity);
    }, 0);

    // Actualizar el total del carrito en el HTML
    cartTotalElement.textContent = "$" + cartTotal.toFixed(2);

    // Actualizar el contador del carrito
    var cartCount = cartItems.reduce(function(count, item) {
        return count + item.quantity;
    }, 0);
    cartCountElement.textContent = cartCount.toString();

    // Actualizar el carrito en localStorage
    saveCartToStorage();
}

function addToCart(productName, price, quantity) {
    var existingItem = cartItems.find(function(item) {
        return item.name === productName;
    });

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({
            name: productName,
            price: price,
            quantity: quantity
        });
    }

    updateCart();
}

function removeFromCart(productName) {
    cartItems = cartItems.filter(function(item) {
        return item.name !== productName;
    });

    updateCart();
}

function incrementQuantity(productId) {
    var quantityInput = document.getElementById("quantity-" + productId);
    var quantity = parseInt(quantityInput.value) + 1;
    quantityInput.value = quantity.toString();
}

function decrementQuantity(productId) {
    var quantityInput = document.getElementById("quantity-" + productId);
    var quantity = parseInt(quantityInput.value);
    if (quantity > 0) {
        quantityInput.value = (quantity - 1).toString();
    }
}

function toggleCart() {
    var cartElement = document.getElementById("cart");
    cartElement.style.display = cartElement.style.display === "none" ? "block" : "none";
}

function saveCartToStorage() {
    var cartJSON = JSON.stringify(cartItems);
    localStorage.setItem("cart", cartJSON);
}

function loadCartFromStorage() {
    var cartJSON = localStorage.getItem("cart");

    if (cartJSON) {
        cartItems = JSON.parse(cartJSON);
        updateCart();
    }
}

window.addEventListener("load", function() {
    loadCartFromStorage();
});