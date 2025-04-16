const API_URL = 'https://dummyjson.com/products?limit=9';
let products = [];

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    products = data.products;
    if (document.getElementById('productList')) renderProducts(products);
    if (window.location.pathname.includes('korzinka.html')) renderCart();
  });

function renderProducts(items) {
  const list = document.getElementById('productList');
  list.innerHTML = items.map(item => `
    <div class="product">
      <img src="${item.thumbnail}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>${item.description.slice(0, 60)}</p>
      <div class="price">$${item.price}</div>
      <div class="actions">
        <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
      </div>
    </div>
  `).join('');
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let item = cart.find(i => i.id === product.id);
  if (item) item.quantity += 1;
  else cart.push({ ...product, quantity: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
}

function renderCart() {
  const container = document.getElementById('cartItems');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart.length) return container.innerHTML = '<p>Cart is empty</p>';

  container.innerHTML = cart.map((item, i) => `
    <div class="product">
      <img src="${item.thumbnail}" alt="${item.title}">
      <div class="cart-details">
        <h3>${item.title}</h3>
        <p>$${item.price.toFixed(2)} each</p>
        <div class="quantity">
          <button onclick="changeQty(${i}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty(${i}, 1)">+</button>
        </div>
        <p><strong>$${(item.price * item.quantity).toFixed(2)}</strong></p>
      </div>
      <div class="actions">
        <button onclick="removeItem(${i})">Remove</button>
      </div>
    </div>
  `).join('');
}

function changeQty(index, delta) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}