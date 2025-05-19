// Cart module
import { formatPrice } from './utils.js';

// Initialize cart from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Setup cart functionality
export function setupCart() {
  const cartToggle = document.querySelector('.cart-toggle');
  const cartSidebar = document.querySelector('.cart-sidebar');
  const closeCart = document.querySelector('.close-cart');
  const overlay = document.querySelector('.overlay');
  
  if (!cartToggle || !cartSidebar || !closeCart || !overlay) return;
  
  // Update cart UI initially
  updateCartUI();
  
  // Toggle cart sidebar
  cartToggle.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    
    // Render cart items
    renderCartItems();
  });
  
  // Close cart sidebar
  closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
  });
  
  // Close cart when clicking on overlay
  overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
  });
  
  // Close cart on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartSidebar.classList.contains('active')) {
      cartSidebar.classList.remove('active');
      overlay.classList.remove('active');
    }
  });
  
  // Setup event delegation for cart item actions
  const cartItems = document.getElementById('cart-items');
  if (cartItems) {
    cartItems.addEventListener('click', (e) => {
      // Remove item button
      if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
        const cartItem = e.target.closest('.cart-item');
        const itemId = cartItem.dataset.id;
        removeFromCart(itemId);
      }
      
      // Decrease quantity button
      if (e.target.classList.contains('decrease-qty') || e.target.closest('.decrease-qty')) {
        const cartItem = e.target.closest('.cart-item');
        const itemId = cartItem.dataset.id;
        updateCartItemQuantity(itemId, 'decrease');
      }
      
      // Increase quantity button
      if (e.target.classList.contains('increase-qty') || e.target.closest('.increase-qty')) {
        const cartItem = e.target.closest('.cart-item');
        const itemId = cartItem.dataset.id;
        updateCartItemQuantity(itemId, 'increase');
      }
    });
  }
  
  // Add event listeners for add to cart buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
      e.preventDefault();
      
      const productCard = e.target.closest('.product-card');
      
      // If clicked from product card
      if (productCard) {
        const product = {
          id: productCard.dataset.id,
          name: productCard.querySelector('.product-title').textContent,
          price: parseFloat(productCard.dataset.price),
          image: productCard.querySelector('.product-image img').src,
          quantity: 1
        };
        
        addToCart(product);
      }
      
      // If clicked from product detail page
      const productDetail = document.querySelector('.product-detail-container');
      if (productDetail && !productCard) {
        const quantityInput = document.querySelector('.quantity-value');
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
        
        const product = {
          id: productDetail.dataset.id,
          name: document.querySelector('.product-title-detail').textContent,
          price: parseFloat(productDetail.dataset.price),
          image: document.querySelector('.main-image img').src,
          quantity: quantity
        };
        
        addToCart(product);
      }
    }
  });
}

// Add product to cart
export function addToCart(product) {
  // Check if product is already in cart
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
    // Update quantity if product already in cart
    cart[existingItemIndex].quantity += product.quantity;
  } else {
    // Add new product to cart
    cart.push(product);
  }
  
  // Save cart to localStorage
  saveCart();
  
  // Update cart UI
  updateCartUI();
  
  // Show cart sidebar
  const cartSidebar = document.querySelector('.cart-sidebar');
  const overlay = document.querySelector('.overlay');
  
  if (cartSidebar && overlay) {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    
    // Render cart items
    renderCartItems();
  }
  
  // Show success message
  showToast(`${product.name} added to cart!`);
}

// Remove product from cart
export function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  
  // Save cart to localStorage
  saveCart();
  
  // Update cart UI
  updateCartUI();
  
  // Render cart items
  renderCartItems();
}

// Update cart item quantity
export function updateCartItemQuantity(productId, action) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex !== -1) {
    if (action === 'increase') {
      cart[itemIndex].quantity += 1;
    } else if (action === 'decrease') {
      cart[itemIndex].quantity -= 1;
      
      // Remove item if quantity is 0
      if (cart[itemIndex].quantity <= 0) {
        removeFromCart(productId);
        return;
      }
    }
    
    // Save cart to localStorage
    saveCart();
    
    // Update cart UI
    updateCartUI();
    
    // Update specific cart item
    updateCartItemUI(productId);
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart UI (count and total)
function updateCartUI() {
  const cartCount = document.querySelectorAll('.cart-count');
  const cartTotalPrice = document.getElementById('cart-total-price');
  
  // Update cart count
  if (cartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.forEach(count => {
      count.textContent = totalItems;
    });
  }
  
  // Update cart total
  if (cartTotalPrice) {
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = formatPrice(total);
  }
  
  // Update checkout button state
  const checkoutBtn = document.querySelector('.checkout-btn');
  if (checkoutBtn) {
    if (cart.length === 0) {
      checkoutBtn.classList.add('disabled');
      checkoutBtn.setAttribute('disabled', true);
    } else {
      checkoutBtn.classList.remove('disabled');
      checkoutBtn.removeAttribute('disabled');
    }
  }
}

// Render cart items
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  if (!cartItemsContainer) return;
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        <p>Your cart is empty</p>
        <a href="pages/products.html" class="btn btn-primary">Start Shopping</a>
      </div>
    `;
    return;
  }
  
  // Clear cart items container
  cartItemsContainer.innerHTML = '';
  
  // Render each cart item
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.id = item.id;
    
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-content">
        <div class="cart-item-top">
          <h4 class="cart-item-title">${item.name}</h4>
          <button class="remove-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="cart-item-bottom">
          <div class="cart-item-quantity">
            <button class="decrease-qty">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increase-qty">+</button>
          </div>
          <div class="cart-item-subtotal">${formatPrice(item.price * item.quantity)}</div>
        </div>
      </div>
    `;
    
    cartItemsContainer.appendChild(cartItem);
  });
}

// Update specific cart item UI
function updateCartItemUI(productId) {
  const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
  if (!cartItem) return;
  
  const item = cart.find(item => item.id === productId);
  if (!item) return;
  
  const quantity = cartItem.querySelector('.quantity');
  const subtotal = cartItem.querySelector('.cart-item-subtotal');
  
  quantity.textContent = item.quantity;
  subtotal.textContent = formatPrice(item.price * item.quantity);
}

// Show toast message
function showToast(message) {
  // Create toast element if it doesn't exist
  let toast = document.querySelector('.toast');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  // Set message and show toast
  toast.textContent = message;
  toast.classList.add('show');
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Get cart items
export function getCartItems() {
  return cart;
}

// Get cart total
export function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Clear cart
export function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}