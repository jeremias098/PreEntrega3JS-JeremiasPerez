// Función para cargar los productos desde un archivo JSON local o API externa
async function loadProducts() {
    try {
        const response = await axios.get('products.json'); // Cambiar la URL por la ruta correcta del JSON o API
        const products = response.data;

        const productContainer = document.getElementById("product-container");

        // Recorrer los productos y generar el contenido dinámico en el DOM
        products.forEach(function(product, index) {
            const productDiv = document.createElement("div");
            productDiv.className = "product";

            const imgElement = document.createElement("img");
            imgElement.src = product.image;
            imgElement.alt = product.name;

            const nameElement = document.createElement("h3");
            nameElement.textContent = product.name;

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = product.description;

            const priceElement = document.createElement("p");
            priceElement.textContent = "Precio: $" + product.price.toFixed(2);

            const quantityDiv = document.createElement("div");
            quantityDiv.className = "quantity";

            const decrementButton = document.createElement("button");
            decrementButton.textContent = "-";
            decrementButton.onclick = function() {
                decrementQuantity(index + 1);
            };

            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.id = "quantity-" + (index + 1);
            quantityInput.value = "0";
            quantityInput.min = "0";
            quantityInput.readOnly = true;

            const incrementButton = document.createElement("button");
            incrementButton.textContent = "+";
            incrementButton.onclick = function() {
                incrementQuantity(index + 1);
            };

            const addToCartButton = document.createElement("button");
            addToCartButton.textContent = "Agregar al carrito";
            addToCartButton.onclick = function() {
                addToCart(product.name, product.price, parseInt(quantityInput.value));
            };

            const productCountSpan = document.createElement("span");
            productCountSpan.id = "product-count-" + (index + 1);
            productCountSpan.style.display = "none";

            const removeFromCartButton = document.createElement("button");
            removeFromCartButton.textContent = "Quitar del carrito";
            removeFromCartButton.onclick = function() {
                removeFromCart(product.name);
            };

            quantityDiv.appendChild(decrementButton);
            quantityDiv.appendChild(quantityInput);
            quantityDiv.appendChild(incrementButton);

            productDiv.appendChild(imgElement);
            productDiv.appendChild(nameElement);
            productDiv.appendChild(descriptionElement);
            productDiv.appendChild(priceElement);
            productDiv.appendChild(quantityDiv);
            productDiv.appendChild(addToCartButton);
            productDiv.appendChild(productCountSpan);
            productDiv.appendChild(removeFromCartButton);

            productContainer.appendChild(productDiv);
        });
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

// Función para realizar el proceso de checkout (simulación)
function checkout() {
    alert("¡Gracias por tu compra! El total a pagar es: $" + cartTotal.toFixed(2));
    cartItems = [];
    updateCart();
}

// Cargar los productos al cargar la página
window.addEventListener("load", function() {
    loadCartFromStorage();
    loadProducts();
});
