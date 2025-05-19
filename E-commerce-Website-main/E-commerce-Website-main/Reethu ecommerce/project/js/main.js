import { setupCart } from './cart.js';
import { setupHeader } from './header.js';
import { getProducts } from './api.js';
import { createProductCard } from './products.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', initApp);

// Initialize the application
async function initApp() {
  setupHeader();
  setupCart();
  await loadHomePageContent();
}

// Load content for the home page
async function loadHomePageContent() {
  // Check if we're on the home page
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    await loadFeaturedProducts();
    await loadNewProducts();
    setupTestimonialSlider();
    setupNewsletterForm();
  }
}

// Load featured products
async function loadFeaturedProducts() {
  const featuredProductsContainer = document.getElementById('featured-products');
  if (!featuredProductsContainer) return;

  try {
    const products = await getProducts({ featured: true, limit: 4 });
    
    if (products.length === 0) {
      featuredProductsContainer.innerHTML = '<p class="no-products">No featured products found.</p>';
      return;
    }

    featuredProductsContainer.innerHTML = '';
    products.forEach(product => {
      const productCard = createProductCard(product);
      featuredProductsContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error('Error loading featured products:', error);
    featuredProductsContainer.innerHTML = '<p class="error">Failed to load featured products. Please try again later.</p>';
  }
}

// Load new products
async function loadNewProducts() {
  const newProductsContainer = document.getElementById('new-products');
  if (!newProductsContainer) return;

  try {
    const products = await getProducts({ sort: 'newest', limit: 4 });
    
    if (products.length === 0) {
      newProductsContainer.innerHTML = '<p class="no-products">No new products found.</p>';
      return;
    }

    newProductsContainer.innerHTML = '';
    products.forEach(product => {
      const productCard = createProductCard(product);
      newProductsContainer.appendChild(productCard);
    });
  } catch (error) {
    console.error('Error loading new products:', error);
    newProductsContainer.innerHTML = '<p class="error">Failed to load new products. Please try again later.</p>';
  }
}

// Setup testimonial slider with auto-slide functionality
function setupTestimonialSlider() {
  const slider = document.getElementById('testimonials-slider');
  if (!slider) return;

  let currentSlide = 0;
  const slides = slider.querySelectorAll('.testimonial');
  const slideWidth = slides[0].offsetWidth;
  const slideMargin = parseInt(window.getComputedStyle(slides[0]).marginRight);
  const totalWidth = slideWidth + slideMargin;

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    slider.scrollTo({
      left: currentSlide * totalWidth,
      behavior: 'smooth'
    });
  }

  // Auto slide every 5 seconds
  const autoSlideInterval = setInterval(nextSlide, 5000);

  // Pause auto-slide on mouse enter
  slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  // Resume auto-slide on mouse leave
  slider.addEventListener('mouseleave', () => {
    clearInterval(autoSlideInterval);
    setInterval(nextSlide, 5000);
  });

  // Handle manual scrolling
  slider.addEventListener('scroll', () => {
    const scrollPosition = slider.scrollLeft;
    currentSlide = Math.round(scrollPosition / totalWidth);
  });
}

// Setup newsletter form
function setupNewsletterForm() {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.textContent = 'Subscribing...';
    
    setTimeout(() => {
      submitButton.textContent = 'Subscribed!';
      emailInput.value = '';
      
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }, 2000);
    }, 1500);
  });
}

// Add animation class when elements come into view
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(element => {
    observer.observe(element);
  });
}

// Call animation function
animateOnScroll();