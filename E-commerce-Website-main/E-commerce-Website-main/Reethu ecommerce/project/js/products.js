import { formatPrice } from './utils.js';

// Create product card element
export function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.className = 'product-card';
  productCard.dataset.id = product.id;
  productCard.dataset.price = product.price;
  
  // Determine badges (sale, new)
  let badgesHTML = '';
  if (product.new) {
    badgesHTML += `<span class="product-badge badge-new">New</span>`;
  }
  if (product.sale) {
    badgesHTML += `<span class="product-badge badge-sale">Sale</span>`;
  }
  
  // Create HTML
  productCard.innerHTML = `
    <div class="product-image">
      <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
      <div class="product-badges">
        ${badgesHTML}
      </div>
      <div class="product-actions">
        <button class="product-action-btn wishlist-toggle" aria-label="Add to wishlist">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
        <button class="product-action-btn quick-view" aria-label="Quick view">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </button>
      </div>
    </div>
    <div class="product-content">
      <div class="product-category">${product.category}</div>
      <h3 class="product-title">${product.name}</h3>
      <div class="product-price">
        <span class="current-price">${formatPrice(product.price)}</span>
        ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
      </div>
      <div class="product-rating">
        <div class="rating-stars">${getRatingStars(product.rating)}</div>
        <span class="rating-count">(${product.reviewCount})</span>
      </div>
      <button class="btn btn-primary add-to-cart-btn">Add to Cart</button>
    </div>
  `;
  
  // Add event listeners
  const productImage = productCard.querySelector('.product-image');
  const productTitle = productCard.querySelector('.product-title');
  
  // Navigate to product detail on click
  productImage.addEventListener('click', () => {
    window.location.href = `pages/product-detail.html?id=${product.id}`;
  });
  
  productTitle.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = `pages/product-detail.html?id=${product.id}`;
  });
  
  // Return the created card
  return productCard;
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

// Setup products page functionality
export function setupProductsPage() {
  const isProductsPage = window.location.pathname.includes('products.html');
  
  if (!isProductsPage) return;
  
  // Setup filter toggles for mobile
  setupFilterToggle();
  
  // Setup view switcher (grid/list)
  setupViewSwitcher();
  
  // Setup sorting
  setupSorting();
  
  // Setup filters
  setupFilters();
  
  // Get query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  const search = urlParams.get('search');
  const sort = urlParams.get('sort');
  const sale = urlParams.get('sale');
  
  // Set initial form values based on URL params
  if (category) {
    const categoryCheckbox = document.querySelector(`input[name="category"][value="${category}"]`);
    if (categoryCheckbox) categoryCheckbox.checked = true;
  }
  
  if (sort) {
    const sortSelect = document.getElementById('sort');
    if (sortSelect) sortSelect.value = sort;
  }
  
  if (sale === 'true') {
    // Add some filter for sale items
  }
  
  // Load products based on current filters
  loadProducts({
    category,
    search,
    sort,
    sale: sale === 'true'
  });
}

// Setup filter toggle for mobile
function setupFilterToggle() {
  // Implementation will be added in real application
}

// Setup view switcher (grid/list)
function setupViewSwitcher() {
  const gridViewBtn = document.querySelector('.grid-view');
  const listViewBtn = document.querySelector('.list-view');
  const productsGrid = document.getElementById('products-grid');
  
  if (!gridViewBtn || !listViewBtn || !productsGrid) return;
  
  gridViewBtn.addEventListener('click', () => {
    productsGrid.classList.remove('list-layout');
    productsGrid.classList.add('grid-layout');
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
    
    // Save preference to local storage
    localStorage.setItem('productsViewPreference', 'grid');
  });
  
  listViewBtn.addEventListener('click', () => {
    productsGrid.classList.remove('grid-layout');
    productsGrid.classList.add('list-layout');
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
    
    // Save preference to local storage
    localStorage.setItem('productsViewPreference', 'list');
  });
  
  // Load saved preference
  const savedPreference = localStorage.getItem('productsViewPreference');
  if (savedPreference === 'list') {
    listViewBtn.click();
  } else {
    gridViewBtn.click();
  }
}

// Setup sorting
function setupSorting() {
  const sortSelect = document.getElementById('sort');
  
  if (!sortSelect) return;
  
  sortSelect.addEventListener('change', () => {
    // Get current filters and update sorting
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('sort', sortSelect.value);
    
    // Update URL and reload products
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    
    loadProducts({
      category: urlParams.get('category'),
      search: urlParams.get('search'),
      sort: urlParams.get('sort'),
      sale: urlParams.get('sale') === 'true'
    });
  });
}

// Setup filters
function setupFilters() {
  const filterApplyBtn = document.querySelector('.filter-apply-btn');
  const clearFiltersBtn = document.getElementById('clear-filters');
  
  if (!filterApplyBtn || !clearFiltersBtn) return;
  
  // Apply filters
  filterApplyBtn.addEventListener('click', () => {
    const urlParams = new URLSearchParams();
    
    // Get category filters
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]:checked');
    if (categoryCheckboxes.length === 1) {
      urlParams.set('category', categoryCheckboxes[0].value);
    }
    
    // Get price range
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;
    
    if (minPrice) urlParams.set('minPrice', minPrice);
    if (maxPrice) urlParams.set('maxPrice', maxPrice);
    
    // Get rating filters
    const ratingCheckboxes = document.querySelectorAll('input[name="rating"]:checked');
    if (ratingCheckboxes.length === 1) {
      urlParams.set('rating', ratingCheckboxes[0].value);
    }
    
    // Get brand filters
    const brandCheckboxes = document.querySelectorAll('input[name="brand"]:checked');
    if (brandCheckboxes.length === 1) {
      urlParams.set('brand', brandCheckboxes[0].value);
    }
    
    // Preserve existing sort parameter
    const currentSort = new URLSearchParams(window.location.search).get('sort');
    if (currentSort) {
      urlParams.set('sort', currentSort);
    }
    
    // Update URL and reload products
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    
    loadProducts({
      category: urlParams.get('category'),
      search: urlParams.get('search'),
      sort: urlParams.get('sort'),
      minPrice: urlParams.get('minPrice'),
      maxPrice: urlParams.get('maxPrice'),
      brand: urlParams.get('brand'),
      rating: urlParams.get('rating')
    });
  });
  
  // Clear filters
  clearFiltersBtn.addEventListener('click', () => {
    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Reset price inputs
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const priceRange = document.getElementById('price-range');
    
    if (minPriceInput) minPriceInput.value = '';
    if (maxPriceInput) maxPriceInput.value = '';
    if (priceRange) priceRange.value = priceRange.max;
    
    // Keep sort parameter but clear other filters
    const urlParams = new URLSearchParams();
    const currentSort = new URLSearchParams(window.location.search).get('sort');
    if (currentSort) {
      urlParams.set('sort', currentSort);
    }
    
    // Update URL and reload products
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    
    loadProducts({
      sort: urlParams.get('sort')
    });
  });
}

// Load products based on filters
async function loadProducts(filters) {
  // Implementation would use the API module to load products
  // This is a placeholder for the actual implementation
}