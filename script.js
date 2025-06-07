// script.js

// Cart data structure
let cart = [];

// Load cart from localStorage
function loadCart() {
  let storedCart = localStorage.getItem('snitchxCart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
}
loadCart();

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('snitchxCart', JSON.stringify(cart));
}

// Update cart UI
function updateCartUI() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalDiv = document.getElementById('cart-total');
  cartItemsDiv.innerHTML = '';

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalDiv.textContent = '';
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <span>₹${item.price * item.quantity}</span>
      <button onclick="removeFromCart('${item.id}')">Remove</button>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });

  cartTotalDiv.textContent = `Total: ₹${total.toFixed(2)}`;
}

// Add product to cart
function addToCart(id, name, price) {
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  saveCart();
  updateCartUI();
}

// Remove product from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();
}

// On page load
window.onload = () => {
  updateCartUI();

  // Add event listeners to buttons (assuming buttons have data attributes)
  const addButtons = document.querySelectorAll('.add-to-cart-btn');
  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      addToCart(id, name, price);
    });
  });

  // WhatsApp order button
  const orderBtn = document.getElementById('order-btn');
  if(orderBtn) {
    orderBtn.addEventListener('click', () => {
      if(cart.length === 0){
        alert('Your cart is empty!');
        return;
      }
