// Product data sample with fixed random prices between 800 and 6000
const products = {
  shoes: [
    { id: 1, name: "Nike Air Max", price: getRandomPrice(1500, 4000), img: "images/shoes1.jpg" },
    { id: 2, name: "Adidas Ultraboost", price: getRandomPrice(1500, 4000), img: "images/shoes2.jpg" },
    { id: 3, name: "Roadster Sneakers", price: getRandomPrice(1500, 4000), img: "images/shoes3.jpg" },
  ],
  watches: [
    { id: 4, name: "Rolex Submariner", price: getRandomPrice(1800, 9000), img: "images/watch1.jpg" },
    { id: 5, name: "Omega Seamaster", price: getRandomPrice(1800, 9000), img: "images/watch2.jpg" },
    { id: 6, name: "Tag Heuer Carrera", price: getRandomPrice(1800, 9000), img: "images/watch3.jpg" },
  ],
  perfumes: [
    { id: 7, name: "Chanel No.5", price: getRandomPrice(1200, 6000), img: "images/perfume1.jpg" },
    { id: 8, name: "Dior Sauvage", price: getRandomPrice(1200, 6000), img: "images/perfume2.jpg" },
    { id: 9, name: "Tom Ford Black Orchid", price: getRandomPrice(1200, 6000), img: "images/perfume3.jpg" },
  ],
  clothes: [
    { id: 10, name: "Gucci T-Shirt", price: getRandomPrice(1200, 6000), img: "images/clothes1.jpg" },
    { id: 11, name: "Armani Jacket", price: getRandomPrice(1200, 6000), img: "images/clothes2.jpg" },
    { id: 12, name: "Prada Jeans", price: getRandomPrice(1200, 6000), img: "images/clothes3.jpg" },
  ],
};

// Price generator with caching in localStorage to avoid changes on refresh
function getRandomPrice(min, max) {
  // We'll cache prices by product id in localStorage
  return function(id) {
    let cached = localStorage.getItem(`price_${id}`);
    if (cached) return Number(cached);
    let price = Math.floor(Math.random() * (max - min + 1)) + min;
    localStorage.setItem(`price_${id}`, price);
    return price;
  }
}

// Initialize price getter for each category
const getPrice = getRandomPrice(800, 6000);

// Cart array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart
function addToCart(id, category) {
  const product = products[category].find(p => p.id === id);
  if (!product) return;

  // Check if product already in cart
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  renderCart();
}

// Remove product from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

// Update quantity
function updateQty(id, qty) {
  if (qty <= 0) {
    removeFromCart(id);
  } else {
    const item = cart.find(i => i.id === id);
    if (item) {
      item.qty = qty;
    }
  }
  saveCart();
  renderCart();
}

// Calculate total price
function calculateTotal() {
  return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
}

// Render products to the page
function renderProducts() {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  for (const category in products) {
    const section = document.createElement("section");
    section.className = "product-section";

    const heading = document.createElement("h2");
    heading.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "products";

    products[category].forEach(product => {
      // Set fixed price from localStorage or generate now
      product.price = getPrice(product.id);

      const card = document.createElement("div");
      card.className = "product-card";

      const img = document.createElement("img");
      img.src = product.img;
      img.alt = product.name;

      const name = document.createElement("h3");
      name.textContent = product.name;

      const priceDiv = document.createElement("div");
      priceDiv.className = "price";
      priceDiv.textContent = "₹" + product.price;

      // Offer 75% off badge for product.price > 6000
      if (product.price > 6000) {
        const offer = document.createElement("span");
        offer.className = "offer";
        offer.textContent = "75% OFF";
        priceDiv.appendChild(offer);
      }

      const button = document.createElement("button");
      button.textContent = "Add to Cart";
      button.onclick = () => addToCart(product.id, category);

      card.append(img, name, priceDiv, button);
      grid.appendChild(card);
    });

    section.appendChild(grid);
    container.appendChild(section);
  }
}

// Render cart on page
function renderCart() {
  const cartList = document.getElementById("cart-list");
  const totalPriceEl = document.getElementById("total-price");
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
    totalPriceEl.textContent = "₹0";
    return;
  }

  cart.forEach(item => {
    const li = document.createElement("li");

    const itemInfo = document.createElement("span");
    itemInfo.textContent = `${item.name} x${item.qty}`;

    const itemPrice = document.createElement("span");
    itemPrice.textContent = `₹${item.price * item.qty}`;

    // Quantity input
    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = 1;
    qtyInput.value = item.qty;
    qtyInput.style.width = "50px";
    qtyInput.onchange = (e) => {
      const val = parseInt(e.target.value);
      if (isNaN(val) || val < 1) {
        e.target.value = item.qty;
        return;
      }
      updateQty(item.id, val);
    };

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.style.marginLeft = "10px";
    removeBtn.onclick = () => removeFromCart(item.id);

    li.appendChild(itemInfo);
    li.appendChild(qtyInput);
    li.appendChild(itemPrice);
    li.appendChild(removeBtn);

    cartList.appendChild(li);
  });

  totalPriceEl.textContent = "₹" + calculateTotal();
}

// WhatsApp checkout button handler
function whatsappCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hi, I want to place an order:\n\n";

  cart.forEach(item => {
    message += `- ${item.name} x${item.qty} = ₹${item.price * item.qty}\n`;
  });

  message += `\nTotal: ₹${calculateTotal()}\n\nPlease process my order. Thanks!`;

  const phoneNumber = "8793727113"; // Change this to your WhatsApp number with country code if needed

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

// On DOM load
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();

  document.getElementById("whatsapp-checkout").onclick = whatsappCheckout;
});
