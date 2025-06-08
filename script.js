const products = [
  { name: "Nike Air Max", category: "Shoes", price: 2999, image: "images/shoe1.jpg" },
  { name: "Adidas Ultra Boost", category: "Shoes", price: 3499, image: "images/shoe2.jpg" },
  { name: "Roadster Sneakers", category: "Shoes", price: 1599, image: "images/shoe3.jpg" },
  { name: "Rolex Submariner", category: "Watches", price: 7999, image: "images/watch1.jpg" },
  { name: "Omega Seamaster", category: "Watches", price: 5999, image: "images/watch2.jpg" },
  { name: "Armani Perfume", category: "Perfume", price: 2899, image: "images/perfume1.jpg" },
  { name: "Chanel No.5", category: "Perfume", price: 3999, image: "images/perfume2.jpg" },
  { name: "Gucci Hoodie", category: "Clothes", price: 4599, image: "images/cloth1.jpg" },
  { name: "Louis Vuitton Jacket", category: "Clothes", price: 5999, image: "images/cloth2.jpg" },
  // Add more up to 80–90 items
];

let cart = [];

function loadProducts() {
  const container = document.getElementById('product-container');
  container.innerHTML = '';
  products.forEach((p, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(index) {
  cart.push(products[index]);
  document.getElementById('cart-count').innerText = cart.length;
}

function viewCart() {
  const cartBox = document.getElementById('cart-popup');
  const list = document.getElementById('cart-items');
  list.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerText = `${item.name} - ₹${item.price}`;
    list.appendChild(li);
  });
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('whatsapp-btn').href = `https://wa.me/8793727113?text=I want to buy: ${cart.map(i => i.name).join(', ')}. Total: ₹${total}`;
  cartBox.style.display = 'block';
}

function closeCart() {
  document.getElementById('cart-popup').style.display = 'none';
}

document.getElementById('search').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  const container = document.getElementById('product-container');
  container.innerHTML = '';
  filtered.forEach((p, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
});

window.onload = loadProducts;
