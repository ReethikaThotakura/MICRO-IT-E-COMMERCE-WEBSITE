// Setup header functionality
export function setupHeader() {
  setupMobileMenu();
  setupSearchToggle();
  setupHeaderScroll();
}

// Setup mobile menu toggle
function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.overlay');
  
  if (!menuToggle || !mobileMenu || !overlay) return;
  
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Only show overlay if mobile menu is active
    if (mobileMenu.classList.contains('active')) {
      overlay.classList.add('active');
    } else {
      overlay.classList.remove('active');
    }
    
    // Toggle menu icon animation
    menuToggle.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on overlay
  overlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    menuToggle.classList.remove('active');
  });
  
  // Close mobile menu when clicking on a menu item
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      overlay.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

// Setup search toggle
function setupSearchToggle() {
  const searchToggle = document.querySelector('.search-toggle');
  const searchOverlay = document.querySelector('.search-overlay');
  const closeSearch = document.querySelector('.close-search');
  const searchInput = document.getElementById('search-input');
  
  if (!searchToggle || !searchOverlay || !closeSearch || !searchInput) return;
  
  searchToggle.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    // Focus on search input after a short delay
    setTimeout(() => {
      searchInput.focus();
    }, 100);
  });
  
  closeSearch.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
  });
  
  // Close search overlay on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      searchOverlay.classList.remove('active');
    }
  });
  
  // Setup search functionality
  setupSearch();
}

// Setup search functionality
function setupSearch() {
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  if (!searchForm || !searchInput || !searchResults) return;
  
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const query = searchInput.value.trim();
    if (!query) return;
    
    // Redirect to products page with search query
    window.location.href = `pages/products.html?search=${encodeURIComponent(query)}`;
  });
  
  // Live search as user types
  let debounceTimeout;
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    
    // Clear previous timeout
    clearTimeout(debounceTimeout);
    
    if (!query) {
      searchResults.innerHTML = '';
      return;
    }
    
    // Debounce search to avoid too many requests
    debounceTimeout = setTimeout(async () => {
      try {
        const results = await performSearch(query);
        displaySearchResults(results);
      } catch (error) {
        console.error('Error performing search:', error);
        searchResults.innerHTML = '<p class="error">Error performing search. Please try again.</p>';
      }
    }, 300);
  });
}

// Perform search (mocked for now)
async function performSearch(query) {
  // This is a mock implementation. In a real app, you would call your API.
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock results based on query
      const results = mockProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 results for preview
      
      resolve(results);
    }, 500);
  });
}

// Display search results
function displaySearchResults(results) {
  const searchResults = document.getElementById('search-results');
  
  if (results.length === 0) {
    searchResults.innerHTML = '<p class="no-results">No products found.</p>';
    return;
  }
  
  searchResults.innerHTML = '';
  
  results.forEach(product => {
    const productCard = document.createElement('a');
    productCard.href = `pages/product-detail.html?id=${product.id}`;
    productCard.className = 'search-product';
    
    productCard.innerHTML = `
      <div class="search-product-img">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="search-product-info">
        <h4>${product.name}</h4>
        <p class="search-product-price">$${product.price.toFixed(2)}</p>
      </div>
    `;
    
    searchResults.appendChild(productCard);
  });
  
  // Add view all results link
  const viewAllLink = document.createElement('a');
  viewAllLink.href = `pages/products.html?search=${encodeURIComponent(document.getElementById('search-input').value.trim())}`;
  viewAllLink.className = 'view-all-results';
  viewAllLink.textContent = 'View all results';
  
  searchResults.appendChild(viewAllLink);
}

// Setup header scroll effect
function setupHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  const scrollThreshold = 100;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mock products data for search functionality
const mockProducts = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 99.99,
    description: 'Premium noise-cancelling headphones with long battery life',
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    price: 199.99,
    description: 'Advanced fitness tracking with heart rate monitor',
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 3,
    name: 'Premium Leather Jacket',
    price: 249.99,
    description: 'Genuine leather jacket with stylish design',
    category: 'Fashion',
    image: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 4,
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    description: 'Comfortable and eco-friendly cotton t-shirt',
    category: 'Fashion',
    image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 5,
    name: 'Modern Coffee Table',
    price: 149.99,
    description: 'Elegant wooden coffee table with glass top',
    category: 'Home',
    image: 'https://images.pexels.com/photos/6207816/pexels-photo-6207816.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 6,
    name: 'Luxury Scented Candle',
    price: 39.99,
    description: 'Long-lasting scented candle made with natural ingredients',
    category: 'Home',
    image: 'https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: 7,
    name: 'Facial Cleansing Kit',
    price: 59.99,
    description: 'Complete skincare set for all skin types',
    category: 'Beauty',
    image: 'https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];