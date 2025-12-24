// Simple navigation scroll
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Login form validation
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Login successful!');
    });
}

// Signup form validation
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Signup successful!');
    });
}

// Cart logic
const cartKey = 'shopEaseCart';

function getCart() {
    const cart = localStorage.getItem(cartKey);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

function addToCart(product) {
    const cart = getCart();
    // Check if product already in cart
    const existing = cart.find(item => item.name === product.name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
    alert(product.name + ' added to cart!');
}

document.addEventListener('DOMContentLoaded', function() {
    const addCartButtons = document.querySelectorAll('.add-to-cart');
    addCartButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));
            addToCart({ name, price });
        });
    });

    // Cart icon and modal logic
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsList = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');

    function updateCartCount() {
        const cart = getCart();
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) cartCount.textContent = total;
    }

    function renderCartItems() {
        const cart = getCart();
        cartItemsList.innerHTML = '';
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
            return;
        }
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;
            cartItemsList.appendChild(li);
        });
    }

    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            renderCartItems();
            cartModal.style.display = 'block';
        });
    }

    updateCartCount();

    // Update cart count when item is added
    addCartButtons.forEach(btn => {
        btn.addEventListener('click', updateCartCount);
    });
});
});