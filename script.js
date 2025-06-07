// Product Data Arrays with fixed prices

const shoes = [
  {id:1, brand:"Nike", name:"Air Max 270", priceINR:1500, priceUSD:90, img:"https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=400&q=80"},
  {id:2, brand:"Adidas", name:"Ultraboost", priceINR:2000, priceUSD:120, img:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80"},
  {id:3, brand:"Roadster", name:"Classic Sneaker", priceINR:2500, priceUSD:150, img:"https://images.unsplash.com/photo-1510915361899-2e9c1f7a3bf7?auto=format&fit=crop&w=400&q=80"},
];

const watches = [
  {id:4, brand:"Rolex", name:"Submariner", priceINR:9000, priceUSD:800, img:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"},
  {id:5, brand:"Omega", name:"Seamaster", priceINR:8000, priceUSD:650, img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"},
  {id:6, brand:"Tag Heuer", name:"Carrera", priceINR:7000, priceUSD:600, img:"https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80"},
];

const clothes = [
  {id:7, brand:"Gucci", name:"Leather Jacket", priceINR:4000, priceUSD:350, img:"https://images.unsplash.com/photo-1530845641765-06f4d8f7e4b0?auto=format&fit=crop&w=400&q=80"},
  {id:8, brand:"Prada", name:"Silk Dress", priceINR:3500, priceUSD:300, img:"https://images.unsplash.com/photo-1542068829-1115f7259450?auto=format&fit=crop&w=400&q=80"},
  {id:9, brand:"Versace", name:"T-Shirt", priceINR:2500, priceUSD:220, img:"https://images.unsplash.com/photo-1542068829-1115f7259450?auto=format&fit=crop&w=400&q=80"},
];

const perfumes = [
  {id:10, brand:"Chanel", name:"No. 5", priceINR:6000, priceUSD:500, img:"https://images.unsplash.com/photo-1516707572761-7218f0c06e0b?auto=format&fit=crop&w=400&q=80"},
  {id:11, brand:"Dior", name:"J'adore", priceINR:6500, priceUSD:520, img:"https://images.unsplash.com/photo-1516116216624-53e697fedbe2?auto=format&fit=crop&w=400&q=80"},
  {id:12, brand:"Tom Ford", name:"Black Orchid", priceINR:7000, priceUSD:580, img:"https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80"},
];

// Detect user currency by navigator.language or fallback
const isIndianUser = navigator.language.includes('en-IN') || navigator.language.includes('hi-IN');

// Helper: format price
function formatPrice(price) {
  if(isIndianUser) {
    return `₹${price.toLocaleString('en-IN')}`;
  } else {
    return `$${price.toLocaleString('en-US')}`;
  }
}

// Build product cards dynamically
function buildProductCards(products, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  products.forEach(product => {
    const price = isIndianUser ? product.priceINR : product.priceUSD;
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img loading="lazy" src="${product.img}" alt="${product.name}" />
      <div class="product-info">
        <div class="product-title">${product.name}</div>
        <div class="product-brand">${product.brand}</div>
        <div class="product-price">${formatPrice(price)}</div>
        <button class="add-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Cart Logic
let cart = JSON.parse(localStorage.getItem('snitchx_cart')) || [];

function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  document.getElementById
