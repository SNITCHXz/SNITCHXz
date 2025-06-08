const products = [
  { name: "Black Oversized Tee", price: 799 },
  { name: "SnitchX Hoodie", price: 1499 },
  { name: "Classic Cap", price: 499 },
  { name: "Street Joggers", price: 1199 },
  // Add more here up to 80-90 as needed
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
let cart = [];

function displayProducts() {
  productList.innerHTML = "";
  products.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="https://via.placeholder.com/150" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function addToCart(index) {
  cart.push(products[index]);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = total;
  cartCount.textContent = cart.length;
}

function toggleCart() {
  const section = document.getElementById("cart-section");
  section.classList.toggle("hidden");
}

function orderViaWhatsApp() {
  const msg = cart.map(item => `${item.name} - ₹${item.price}`).join("\n");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const finalMsg = encodeURIComponent(`My Order:\n${msg}\nTotal: ₹${total}`);
  window.open(`https://wa.me/919876543210?text=${finalMsg}`, "_blank");
}

displayProducts();
