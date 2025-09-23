let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartCounter = document.querySelector('.cart-counter');
const cartIcon = document.querySelector('.cart');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');

function updateCartCounter() {
  if (cartCounter) cartCounter.innerText = cart.length;
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


function renderCart() {
  cartItemsList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} <span>Rs.${item.price}</span>
      <button class="delete-btn" data-index="${index}">X</button>
    `;
    cartItemsList.appendChild(li);
    total += item.price;
  });

  cartTotal.innerText = `Total: Rs.${total}`;

  
  const deleteButtons = cartItemsList.querySelectorAll('.delete-btn');
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'));
      removeItemFromCart(idx);
    });
  });
}

function removeItemFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCounter();
  renderCart();
}

function addItemToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  updateCartCounter();
  alert(`${name} added to cart!`);
}

const detailCards = document.querySelectorAll('.detail-card');
detailCards.forEach(card => {
  card.addEventListener('click', () => {
    const name = card.querySelector('.detail-name h4').innerText;
    const priceText = card.querySelector('.price').innerText;
    const price = parseInt(priceText.replace('Rs.', ''));
    addItemToCart(name, price);
  });
});

const highlightCards = document.querySelectorAll('.highlight-card');
highlightCards.forEach(card => {
  card.addEventListener('click', () => {
    const name = card.querySelector('.highlight-desc h4').innerText;
    const priceText = card.querySelector('.highlight-desc p').innerText;
    const price = parseInt(priceText.replace('Rs.', ''));
    addItemToCart(name, price);
  });
});

const bestsellerCards = document.querySelectorAll('.menu_btn');

bestsellerCards.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault(); 
    const card = btn.closest('.menu_card');
    const name = card.querySelector('h2').innerText;
    const priceText = card.querySelector('h3').innerText;
    const price = parseInt(priceText.replace('Rs.', '').trim());
    addItemToCart(name, price); 
    updateCartCounter();        
  });
});


if (cartIcon && cartModal) {
  cartIcon.addEventListener('click', () => {
    renderCart();
    cartModal.style.display = 'block';
  });
}

if (closeCart) {
  closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });
}

window.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = 'none';
  }
});


updateCartCounter();

const placeOrderBtn = document.getElementById('place-order-btn');

if (placeOrderBtn) {
  placeOrderBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    cart = [];
    saveCart();
    updateCartCounter();
    renderCart();

    alert("Your order has been placed!");
    cartModal.style.display = 'none';
  });
}



document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registerForm');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

    
    let valid = true;
    let messages = [];

    if (name === '') {
      valid = false;
      messages.push('Name is required.');
    }

    
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email === '') {
      valid = false;
      messages.push('Email is required.');
    } else if (!email.match(emailPattern)) {
      valid = false;
      messages.push('Email is not valid.');
    }

   
    const phonePattern = /^[0-9]{10}$/;
    if (phone === '') {
      valid = false;
      messages.push('Phone is required.');
    } else if (!phone.match(phonePattern)) {
      valid = false;
      messages.push('Phone number must be 10 digits.');
    }

    
    if (address === '') {
      valid = false;
      messages.push('Address is required.');
    }

    
    if (!valid) {
      alert(messages.join('\n'));
    } else {
      alert('Registration successful!');
      form.reset(); 
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const logoutLink = document.querySelector('.sidebar-logout a');

  if (logoutLink) {
    logoutLink.addEventListener('click', function (e) {
      e.preventDefault(); 
      alert('Logged out successfully!');
    });
  }
});
