const products = [
  // Shoes (Indian prices 600-3000 INR)
  {id:1, category:"shoes", title:"Nike Air Max", price: 1500, img:"https://images.unsplash.com/photo-1528701800489-139b58a35f97?auto=format&fit=crop&w=400&q=80"},
  {id:2, category:"shoes", title:"Adidas Ultraboost", price: 2200, img:"https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=400&q=80"},
  {id:3, category:"shoes", title:"Roadster Sneakers", price: 1200, img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"},

  // Watches (International 90$ - 800$ approx converted to INR 7200 - 64000)
  {id:4, category:"watches", title:"Rolex Oyster Perpetual", price: 65000, img:"https://images.unsplash.com/photo-1519666213630-c0e89c7ff08e?auto=format&fit=crop&w=400&q=80"},
  {id:5, category:"watches", title:"Omega Seamaster", price: 56000, img:"https://images.unsplash.com/photo-1518546314287-2b8d8f66cc22?auto=format&fit=crop&w=400&q=80"},
  {id:6, category:"watches", title:"Tag Heuer Carrera", price: 48000, img:"https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=400&q=80"},

  // Perfumes (Expensive)
  {id:7, category:"perfumes", title:"Chanel No.5", price: 9000, img:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80"},
  {id:8, category:"perfumes", title:"Dior Sauvage", price: 8500, img:"https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=400&q=80"},
  {id:9, category:"perfumes", title:"Tom Ford Black Orchid", price: 12000, img:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},

  // Clothes (Expensive Brands)
  {id:10, category:"clothes", title:"Gucci Leather Jacket", price: 16000, img:"https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=400&q=80"},
  {id:11, category:"clothes", title:"Prada Dress", price: 14000, img:"https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80"},
  {id:12, category:"clothes", title:"Louis Vuitton Shirt", price: 12000, img:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80"},

  // Specs
  {id:13, category:"specs", title:"Ray-Ban Aviator", price: 7000, img:"https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80"},
  {id:14, category:"specs", title:"Oakley Radar", price: 8500, img:"https://images.unsplash.com/photo-1521049301972-f4342d11a7b9?auto=format&fit=crop&w=400&q=80"},
  {id:15, category:"specs", title:"Persol Folding", price: 12000, img:"https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=400&q=80"},
];

// Load products into page
const productsContainer = document.getElementById("products-container");
const cartIcon = document.getElementById("cart-icon");
const cartCount = document.getElementById("cart-count");
const cartPanel = document.getElementById("cart-panel");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElem = document.getElementById("cart-total");
const orderBtn = document.getElementById("order-btn");
const closeCartBtn = document.getElementById("close-cart");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.querySelectorAll(".category-btn");

let cart = JSON.parse(localStorage.getItem("snitchx_cart")) || [];

function saveCart() {
  localStorage.setItem("snitchx_cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

function renderProducts(filterCategory = "all", searchTerm = "") {
  productsContainer.innerHTML = "";

  let filteredProducts = products;

  if (filterCategory !== "all") {
    filteredProducts = filteredProducts.filter(p => p.category === filterCategory);
  }

  if (searchTerm.trim() !== "") {
    filteredProducts = filteredProducts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = `<p style="color:#aaa; font-size:18px; text-align:center;">No products found</p>`;
    return;
  }

  filteredProducts.forEach(product => {
    const discount = product.price > 6000 ? 75 : 0; // 75% off if price > 6000
    const discountedPrice = discount ? Math.round(product.price * (1 - discount / 100)) : product.price;

    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.img}" alt="${product.title}" class="product-image" />
      <div class="product-title">${product.title}</div>
      <div class="product-price">
        ₹${discountedPrice.toLocaleString()} 
        ${discount ? `<span class="price-discount">${discount}% OFF</span>` : ""}
      </div>
      <button class="add-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productsContainer.appendChild(card);
  });

  // Add event listeners for add to cart buttons
  document.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const prodId = parseInt(btn.getAttribute("data-id"));
      addToCart(prodId);
    });
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({id: product.id, title: product.title, price: product.price, img: product.img, qty: 1});
  }
  saveCart();
  alert(`${product.title} added to cart!`);
}

function renderCart() {
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
    cartTotalElem.textContent = "0";
    return;
  }
  let total = 0;
  cart.forEach(item => {
    const discount = item.price > 6000 ? 75 : 0;
    const discountedPrice = discount ? Math.round(item.price * (1 - discount / 100)) : item.price;
    total += discountedPrice * item.qty;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <img src="${item.img}" alt="${item.title}" />
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <p>Price: ₹${discountedPrice.toLocaleString()}</p>
        <div class="cart-item-qty">
          <button class="qty-dec" data-id="${item.id}">-</button>
          <span>${item.qty}</span>
          <button class="qty-inc" data-id="${item.id}">+</
