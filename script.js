const products = [
  {id:1, name:"Nike Air Max 270", price: 2500, image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"},
  {id:2, name:"Adidas Ultraboost", price: 2800, image:"https://images.unsplash.com/photo-1600180758890-b9d6d3c89f4b?auto=format&fit=crop&w=400&q=80"},
  {id:3, name:"Rolex Submariner Watch", price: 150000, image:"https://images.unsplash.com/photo-1516375195443-9861c9f82d10?auto=format&fit=crop&w=400&q=80"},
  {id:4, name:"Chanel No.5 Perfume", price: 12000, image:"https://images.unsplash.com/photo-1532634726-83e17f8b078b?auto=format&fit=crop&w=400&q=80"},
  {id:5, name:"Tom Ford Suit", price: 45000, image:"https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80"}
];

const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cart-sidebar');
const cartToggleBtn = document.getElementById('cart-toggle');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const whatsappOrderBtn = document.getElementById('whatsapp-order');
const searchInput = document.getElementById('searchInput');
let cart = [];

function renderProducts(filter="") {
  productsGrid.innerHTML = '';
  const filtered = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img"/>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-price">₹${product.price.toLocaleString()}</div>
        <button class="btn-addcart" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

function addToCart(id) {
  const prod = products.find(p => p.id === id);
  if (!prod) return;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({...prod, qty:1});
  }
  updateCart();
  alert(`${prod.name} added to cart!`);
}

function updateCart() {
  cartItemsList.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name} x${item.qty}</span>
      <span>₹${(item.price * item.qty).toLocaleString()}</span>
    `;
    cartItemsList.appendChild(li);
  });
  cartTotal.textContent = `Total: ₹${total.toLocaleString()}`;
  if(cart.length > 0){
    let message = `Hello, I want to order:\n`;
    cart.forEach(item => {
      message += `- ${item.name} x${item.qty} = ₹${(item.price * item.qty).toLocaleString()}\n`;
    });
    message += `Total: ₹${total.toLocaleString()}`;
    whatsappOrderBtn.href = `https://wa.me/8793727113?text=${encodeURIComponent(message)}`;
    whatsappOrderBtn.style.display = "inline-block";
  } else {
    whatsappOrderBtn.style.display = "none";
  }
}

cartToggleBtn.addEventListener('click', () => {
  cartSidebar.classList.add('open');
});
closeCartBtn.addEventListener('click', () => {
  cartSidebar.classList.remove('open');
});
searchInput.addEventListener('input', (e) => {
  renderProducts(e.target.value);
});

renderProducts();
updateCart();
