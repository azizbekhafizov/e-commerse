const BEST_URL = 'https://dummyjson.com/products?limit=9';
let products = [];

fetch(BEST_URL)
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
  alert("qo'shildi");
}


