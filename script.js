// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Retrieve cart from session storage or initialize an empty cart
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  // Clear the current cart list display
  cartList.innerHTML = "";

  // Render each item in the cart
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });

  // Attach remove event listeners
  const removeButtons = document.querySelectorAll(".remove-from-cart-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(productId);
    });
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((product) => product.id === productId);

  // Add the product to the cart
  cart.push(product);

  // Save the cart to session storage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // Re-render the cart list
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  // Filter out the product to be removed
  cart = cart.filter((item) => item.id !== productId);

  // Update session storage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // Re-render the cart list
  renderCart();
}

// Clear cart
function clearCart() {
  // Empty the cart array
  cart = [];

  // Update session storage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // Re-render the cart list
  renderCart();
}

// Attach event listeners
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(e.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
