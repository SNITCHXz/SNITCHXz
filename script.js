const productsData = [
  {id:1, cat:'shoes', name:'Nike Air Max', brand:'Nike', priceINR: 2800, priceUSD: 350, img:'https://...'},
  {id:2, cat:'shoes', name:'Adidas Ultraboost', brand:'Adidas', priceINR: 3000, priceUSD: 400, img:'https://...'},
  {id:3, cat:'shoes', name:'Roadster Classic', brand:'Roadster', priceINR: 2100, priceUSD: 150, img:'https://...'},
  // similarly for other products
];

// Price display logic:
const clientTypeSelect = document.getElementById('clientType');

function renderProducts(category='all') {
  const clientType = clientTypeSelect.value;
  const filtered = filterProducts(category);
  productsContainer.innerHTML = '';
  filtered.forEach(product => {
    let price, currencySymbol;
    if (clientType === 'india') {
      price = product.priceINR;
      currencySymbol = '₹';
    } else {
      price = product.priceUSD;
      currencySymbol = '$';
    }
    const hasOffer = (clientType === 'india' && price >= 2500) || (clientType === 'intl' && price >= 500);
    const displayPrice = hasOffer
      ? `${currencySymbol}${Math.round(price * 0.5)} <span class="offer">50% OFF</span>`
      : `${currencySymbol}${price}`;
    
    // Render product card with displayPrice
  });
}

// Add event listener for toggle:
clientTypeSelect.addEventListener('change', () => renderProducts());
