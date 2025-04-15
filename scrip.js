const BESTuRL = 'https://dummyjson.com/products?limit=9';
let allProducts = [];

fetch(BESTuRL)
  .then((res) => res.json())
  .then((data) => {
    allProducts = data.products;
    displayProducts(allProducts);
  });

document.getElementById('searchInput')?.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
  displayProducts(filtered);
});

function displayProducts(products) {
  const productList = document.getElementById('productList');
  if (!productList) return;
  productList.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product';
    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>${product.description.substring(0, 60)}...</p>
      <div class="price">$${product.price}</div>
      <div class="actions">
        <button class="add-btn" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
      </div>
    `;
    productList.appendChild(card);
  });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart!');
}

if (window.location.pathname.includes('korzinka.html')) {
  const cartItemsContainer = document.getElementById('cartItems');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Cart is empty</p>';
      return;
    }
    cart.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'product';
      card.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.title}" />
        <div class="cart-details">
          <h3>${item.title}</h3>
          <p>$${item.price.toFixed(2)} each</p>
          <div class="quantity">
            <button onclick="updateQuantity(${index}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${index}, 1)">+</button>
          </div>
          <p><strong>$${(item.price * item.quantity).toFixed(2)}</strong></p>
        </div>
        <div class="actions">
          <button class="delete-btn" onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(card);
    });
  }

  window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  window.updateQuantity = function(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  renderCart();
}