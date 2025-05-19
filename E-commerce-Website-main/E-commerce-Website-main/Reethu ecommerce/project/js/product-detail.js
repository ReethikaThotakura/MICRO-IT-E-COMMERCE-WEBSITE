// Product Detail Page Functionality
import { getProductById, getRelatedProducts, getProductReviews } from './api.js';
import { formatPrice, formatDate } from './utils.js';
import { createProductCard } from './products.js';

// Initialize the product detail page
document.addEventListener('DOMContentLoaded', async () => {
  const isProductDetailPage = window.location.pathname.includes('product-detail.html');
  
  if (!isProductDetailPage) return;
  
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  if (!productId) {
    // Redirect to products page if no ID provided
    window.location.href = 'products.html';
    return;
  }
  
  try {
    // Load product details
    const product = await getProductById(productId);
    
    if (!product) {
      showProductNotFound();
      return;
    }
    
    // Render product details
    renderProductDetails(product);
    
    // Setup product tabs
    setupProductTabs();
    
    // Load related products
    loadRelatedProducts(productId);
    
    // Load product reviews
    loadProductReviews(productId);
    
  } catch (error) {
    console.error('Error loading product details:', error);
    showProductNotFound();
  }
});

// Render product details
function renderProductDetails(product) {
  const productDetailContainer = document.getElementById('product-detail');
  const breadcrumbName = document.getElementById('product-breadcrumb-name');
  
  if (!productDetailContainer || !breadcrumbName) return;
  
  // Update page title
  document.title = `${product.name} - Luxe E-Commerce`;
  
  // Update breadcrumb
  breadcrumbName.textContent = product.name;
  
  // Create product gallery HTML
  const galleryHTML = createGalleryHTML(product.images);
  
  // Create product info HTML
  const infoHTML = createProductInfoHTML(product);
  
  // Update product detail container
  productDetailContainer.innerHTML = '';
  productDetailContainer.dataset.id = product.id;
  productDetailContainer.dataset.price = product.price;
  
  // Create product gallery element
  const galleryElement = document.createElement('div');
  galleryElement.className = 'product-gallery';
  galleryElement.innerHTML = galleryHTML;
  
  // Create product info element
  const infoElement = document.createElement('div');
  infoElement.className = 'product-info';
  infoElement.innerHTML = infoHTML;
  
  // Append elements to container
  productDetailContainer.appendChild(galleryElement);
  productDetailContainer.appendChild(infoElement);
  
  // Setup gallery functionality
  setupGallery();
  
  // Setup variants selection
  setupVariantsSelection();
  
  // Setup quantity input
  setupQuantityInput();
  
  // Add product description to tab
  updateProductDescription(product.description);
  
  // Add product specifications to tab
  updateProductSpecifications(product.specs);
}

// Create gallery HTML
function createGalleryHTML(images) {
  let thumbnailsHTML = '';
  
  images.forEach((image, index) => {
    thumbnailsHTML += `
      <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
        <img src="${image}" alt="Product thumbnail">
      </div>
    `;
  });
  
  return `
    <div class="main-image">
      <img src="${images[0]}" alt="Product image">
    </div>
    <div class="gallery-thumbnails">
      ${thumbnailsHTML}
    </div>
  `;
}

// Create product info HTML
function createProductInfoHTML(product) {
  // Calculate discount percentage if on sale
  let discountBadge = '';
  if (product.originalPrice) {
    const discountPercent = Math.round((1 - product.price / product.originalPrice) * 100);
    discountBadge = `<span class="discount-badge">-${discountPercent}%</span>`;
  }
  
  // Create color variants HTML
  let colorVariantsHTML = '';
  if (product.colors && product.colors.length > 0) {
    colorVariantsHTML = `
      <div class="variant-group">
        <h4 class="variant-title">Color</h4>
        <div class="color-options">
          ${product.colors.map((color, index) => `
            <div class="color-option color-${color} ${index === 0 ? 'active' : ''}" data-value="${color}"></div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // Create size variants HTML
  let sizeVariantsHTML = '';
  if (product.sizes && product.sizes.length > 0) {
    sizeVariantsHTML = `
      <div class="variant-group">
        <h4 class="variant-title">Size</h4>
        <div class="size-options">
          ${product.sizes.map((size, index) => `
            <div class="size-option ${index === 0 ? 'active' : ''}" data-value="${size}">${size}</div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // Create variant selection HTML
  let variantsHTML = '';
  if (colorVariantsHTML || sizeVariantsHTML) {
    variantsHTML = `
      <div class="product-variants">
        ${colorVariantsHTML}
        ${sizeVariantsHTML}
      </div>
    `;
  }
  
  return `
    <h1 class="product-title-detail">${product.name}</h1>
    <p class="product-subtitle">${product.brand}</p>
    
    <div class="product-price-detail">
      <span class="current-price-detail">${formatPrice(product.price)}</span>
      ${product.originalPrice ? `<span class="original-price-detail">${formatPrice(product.originalPrice)}</span>` : ''}
      ${discountBadge}
    </div>
    
    <div class="product-rating-detail">
      <span class="rating-stars-detail">${getRatingStars(product.rating)}</span>
      <span class="rating-count-detail">${product.reviewCount} reviews</span>
    </div>
    
    <p class="product-short-desc">${product.description.split('.')[0]}.</p>
    
    <div class="product-meta">
      <div class="meta-item">
        <span class="meta-label">Availability:</span>
        <span class="meta-value ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
          ${product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
        </span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Category:</span>
        <span class="meta-value">${capitalizeFirstLetter(product.category)}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Brand:</span>
        <span class="meta-value">${product.brand}</span>
      </div>
    </div>
    
    ${variantsHTML}
    
    <div class="product-quantity">
      <h4 class="variant-title">Quantity</h4>
      <div class="quantity-input">
        <button class="quantity-btn decrease">-</button>
        <input type="number" class="quantity-value" value="1" min="1" max="${product.stock}">
        <button class="quantity-btn increase">+</button>
      </div>
    </div>
    
    <div class="product-actions-detail">
      <button class="btn btn-primary add-to-cart-btn-detail" ${product.stock <= 0 ? 'disabled' : ''}>
        ${product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>
      <button class="wishlist-btn-detail">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      </button>
    </div>
    
    <div class="product-share">
      <span class="share-label">Share:</span>
      <div class="share-options">
        <a href="#" class="share-option" aria-label="Share on Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
        <a href="#" class="share-option" aria-label="Share on Twitter">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
        </a>
        <a href="#" class="share-option" aria-label="Share on Pinterest">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12h8"></path><path d="M12 8v8"></path><circle cx="12" cy="12" r="10"></circle></svg>
        </a>
        <a href="#" class="share-option" aria-label="Share via Email">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        </a>
      </div>
    </div>
  `;
}

// Setup gallery functionality
function setupGallery() {
  const mainImage = document.querySelector('.main-image img');
  const thumbnails = document.querySelectorAll('.thumbnail');
  
  if (!mainImage || !thumbnails.length) return;
  
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      // Update active thumbnail
      thumbnails.forEach(t => t.classList.remove('active'));
      thumbnail.classList.add('active');
      
      // Update main image
      const imageSrc = thumbnail.querySelector('img').src;
      mainImage.src = imageSrc;
      
      // Add fade-in animation
      mainImage.classList.add('fade-in');
      setTimeout(() => {
        mainImage.classList.remove('fade-in');
      }, 300);
    });
  });
}

// Setup variants selection
function setupVariantsSelection() {
  // Setup color options
  const colorOptions = document.querySelectorAll('.color-option');
  colorOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Update active option
      colorOptions.forEach(o => o.classList.remove('active'));
      option.classList.add('active');
    });
  });
  
  // Setup size options
  const sizeOptions = document.querySelectorAll('.size-option');
  sizeOptions.forEach(option => {
    option.addEventListener('click', () => {
      if (option.classList.contains('disabled')) return;
      
      // Update active option
      sizeOptions.forEach(o => o.classList.remove('active'));
      option.classList.add('active');
    });
  });
}

// Setup quantity input
function setupQuantityInput() {
  const decreaseBtn = document.querySelector('.quantity-btn.decrease');
  const increaseBtn = document.querySelector('.quantity-btn.increase');
  const quantityInput = document.querySelector('.quantity-value');
  
  if (!decreaseBtn || !increaseBtn || !quantityInput) return;
  
  const minValue = parseInt(quantityInput.getAttribute('min')) || 1;
  const maxValue = parseInt(quantityInput.getAttribute('max')) || 999;
  
  decreaseBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    value = Math.max(minValue, value - 1);
    quantityInput.value = value;
    updateButtonStates();
  });
  
  increaseBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    value = Math.min(maxValue, value + 1);
    quantityInput.value = value;
    updateButtonStates();
  });
  
  quantityInput.addEventListener('input', () => {
    let value = parseInt(quantityInput.value);
    if (isNaN(value) || value < minValue) {
      quantityInput.value = minValue;
    } else if (value > maxValue) {
      quantityInput.value = maxValue;
    }
    updateButtonStates();
  });
  
  function updateButtonStates() {
    const value = parseInt(quantityInput.value);
    decreaseBtn.disabled = value <= minValue;
    increaseBtn.disabled = value >= maxValue;
  }
  
  // Initialize button states
  updateButtonStates();
}

// Setup product tabs
function setupProductTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update active panel
      const targetPanel = document.getElementById(button.dataset.tab);
      tabPanels.forEach(panel => panel.classList.remove('active'));
      targetPanel.classList.add('active');
    });
  });
}

// Update product description tab
function updateProductDescription(description) {
  const descriptionTab = document.getElementById('description');
  if (!descriptionTab) return;
  
  // Format description with paragraphs
  const paragraphs = description.split('. ').filter(p => p.trim() !== '');
  
  let descriptionHTML = '';
  paragraphs.forEach(paragraph => {
    descriptionHTML += `<p>${paragraph.trim()}${paragraph.endsWith('.') ? '' : '.'}</p>`;
  });
  
  descriptionTab.innerHTML = descriptionHTML;
}

// Update product specifications tab
function updateProductSpecifications(specs) {
  const specsTab = document.getElementById('specifications');
  if (!specsTab || !specs) return;
  
  const specsTable = specsTab.querySelector('.specs-table tbody');
  if (!specsTable) return;
  
  specsTable.innerHTML = '';
  
  Object.entries(specs).forEach(([key, value]) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${key}</td>
      <td>${value}</td>
    `;
    specsTable.appendChild(row);
  });
}

// Load related products
async function loadRelatedProducts(productId) {
  const relatedProductsContainer = document.getElementById('related-products');
  if (!relatedProductsContainer) return;
  
  try {
    const relatedProducts = await getRelatedProducts(productId);
    
    if (relatedProducts.length === 0) {
      relatedProductsContainer.innerHTML = '<p class="no-products">No related products found.</p>';
      return;
    }
    
    relatedProductsContainer.innerHTML = '';
    relatedProducts.forEach(product => {
      const productCard = createProductCard(product);
      relatedProductsContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error('Error loading related products:', error);
    relatedProductsContainer.innerHTML = '<p class="error">Failed to load related products.</p>';
  }
}

// Load product reviews
async function loadProductReviews(productId) {
  const reviewsList = document.getElementById('reviews-list');
  if (!reviewsList) return;
  
  try {
    const reviews = await getProductReviews(productId);
    
    if (reviews.length === 0) {
      reviewsList.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to review this product!</p>';
      return;
    }
    
    reviewsList.innerHTML = '';
    reviews.forEach(review => {
      const reviewItem = document.createElement('div');
      reviewItem.className = 'review-item';
      
      reviewItem.innerHTML = `
        <div class="review-header">
          <div class="reviewer-info">
            <div class="reviewer-name">${review.name}</div>
            <div class="review-date">${formatDate(review.date)}</div>
          </div>
          <div class="review-rating">${getRatingStars(review.rating)}</div>
        </div>
        <h4 class="review-title">${review.title}</h4>
        <p class="review-content">${review.content}</p>
      `;
      
      reviewsList.appendChild(reviewItem);
    });
  } catch (error) {
    console.error('Error loading reviews:', error);
    reviewsList.innerHTML = '<p class="error">Failed to load reviews.</p>';
  }
}

// Show product not found message
function showProductNotFound() {
  const productDetailContainer = document.getElementById('product-detail');
  if (!productDetailContainer) return;
  
  productDetailContainer.innerHTML = `
    <div class="product-not-found">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      <h2>Product Not Found</h2>
      <p>Sorry, the product you are looking for does not exist or has been removed.</p>
      <a href="products.html" class="btn btn-primary">Browse Products</a>
    </div>
  `;
}

// Get rating stars HTML based on rating value
function getRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  let starsHTML = '';
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '★';
  }
  
  // Add half star if needed
  if (halfStar) {
    starsHTML += '★';
  }
  
  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '☆';
  }
  
  return starsHTML;
}

// Capitalize first letter of string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}