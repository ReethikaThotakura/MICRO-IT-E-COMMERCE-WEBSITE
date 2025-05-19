// API Service for products (mock implementation)
// In a real application, this would make API calls to your backend

const mockProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    originalPrice: 129.99,
    description: "Premium noise-cancelling headphones with exceptional sound quality and comfort. Features include: 30-hour battery life, quick charging, built-in microphone, and touch controls. Perfect for work, travel, or everyday use.",
    rating: 4.8,
    reviewCount: 245,
    category: "electronics",
    brand: "AudioTech",
    featured: true,
    new: false,
    sale: true,
    stock: 15,
    tags: ["headphones", "audio", "wireless", "bluetooth"],
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    ],
    colors: ["black", "white", "blue"],
    specs: {
      "Type": "Over-ear, Closed-back",
      "Drivers": "40mm Dynamic",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      "Bluetooth Version": "5.0",
      "Weight": "280g"
    }
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    price: 199.99,
    originalPrice: 249.99,
    description: "Advanced smartwatch with comprehensive health monitoring, fitness tracking, and seamless smartphone integration. Features include: heart rate monitoring, ECG, sleep tracking, GPS, water resistance up to 50m, and up to 18 hours of battery life.",
    rating: 4.7,
    reviewCount: 189,
    category: "electronics",
    brand: "TechFit",
    featured: true,
    new: true,
    sale: true,
    stock: 8,
    tags: ["smartwatch", "wearable", "fitness", "tech"],
    images: [
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/9667388/pexels-photo-9667388.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    ],
    colors: ["black", "silver", "red"],
    specs: {
      "Display": "1.7 inch OLED",
      "Resolution": "396 x 484 pixels",
      "Processor": "Dual-core",
      "Storage": "32GB",
      "Battery Life": "Up to 18 hours",
      "Water Resistance": "50m",
      "Weight": "42g"
    }
  },
  {
    id: "3",
    name: "Premium Leather Jacket",
    price: 249.99,
    originalPrice: 299.99,
    description: "Genuine leather jacket crafted with premium materials and exceptional attention to detail. Features a timeless design with a modern fit, perfect for any occasion. Includes multiple pockets, soft interior lining, and durable YKK zippers.",
    rating: 4.9,
    reviewCount: 78,
    category: "fashion",
    brand: "Urban Style",
    featured: false,
    new: false,
    sale: true,
    stock: 5,
    tags: ["jacket", "leather", "outerwear", "fashion"],
    images: [
      "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/6711026/pexels-photo-6711026.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/6765030/pexels-photo-6765030.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["black", "brown"],
    specs: {
      "Material": "Genuine Leather",
      "Lining": "100% Polyester",
      "Closure": "YKK Zipper",
      "Pockets": "4 external, 2 internal",
      "Care": "Professional leather cleaning only"
    }
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    originalPrice: null,
    description: "Eco-friendly t-shirt made from 100% organic cotton. Soft, breathable, and comfortable for everyday wear. Features a classic fit, reinforced stitching, and pre-shrunk fabric. Ethically manufactured with sustainable practices.",
    rating: 4.5,
    reviewCount: 156,
    category: "fashion",
    brand: "EcoWear",
    featured: false,
    new: true,
    sale: false,
    stock: 25,
    tags: ["tshirt", "organic", "cotton", "sustainable"],
    images: [
      "https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/9594667/pexels-photo-9594667.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["white", "black", "blue", "red"],
    specs: {
      "Material": "100% Organic Cotton",
      "Weight": "180 gsm",
      "Fit": "Classic/Regular",
      "Care": "Machine wash cold, tumble dry low",
      "Certification": "GOTS Certified Organic"
    }
  },
  {
    id: "5",
    name: "Modern Coffee Table",
    price: 149.99,
    originalPrice: 199.99,
    description: "Elegant coffee table with modern design, combining wood and glass elements. Features a solid wood frame with tempered glass top, providing durability and sophisticated style. Includes lower shelf for additional storage.",
    rating: 4.6,
    reviewCount: 62,
    category: "home",
    brand: "HomeDesign",
    featured: true,
    new: false,
    sale: true,
    stock: 7,
    tags: ["furniture", "coffee table", "living room", "modern"],
    images: [
      "https://images.pexels.com/photos/6207816/pexels-photo-6207816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/4857776/pexels-photo-4857776.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/6492397/pexels-photo-6492397.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    ],
    colors: ["walnut", "oak", "black"],
    specs: {
      "Material": "Solid Wood & Tempered Glass",
      "Dimensions": "120cm x 60cm x 45cm",
      "Weight": "15kg",
      "Assembly": "Required, tools included",
      "Weight Capacity": "20kg"
    }
  },
  {
    id: "6",
    name: "Luxury Scented Candle",
    price: 39.99,
    originalPrice: null,
    description: "Premium scented candle made with natural soy wax and essential oils. Long-lasting fragrance that creates a warm and inviting atmosphere. Housed in an elegant glass container that complements any decor. Burn time of approximately 60 hours.",
    rating: 4.8,
    reviewCount: 94,
    category: "home",
    brand: "Aromatherapy",
    featured: false,
    new: true,
    sale: false,
    stock: 18,
    tags: ["candle", "home decor", "fragrance", "gift"],
    images: [
      "https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/8470138/pexels-photo-8470138.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/7319158/pexels-photo-7319158.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    ],
    variants: ["Vanilla & Cedar", "Lavender & Sage", "Citrus & Mint", "Sandalwood"],
    specs: {
      "Material": "Natural Soy Wax",
      "Scent Source": "Essential Oils",
      "Burn Time": "Approximately 60 hours",
      "Container": "Handcrafted Glass",
      "Weight": "340g"
    }
  },
  {
    id: "7",
    name: "Facial Cleansing Kit",
    price: 59.99,
    originalPrice: 74.99,
    description: "Complete skincare set designed to cleanse, exfoliate, and hydrate all skin types. Includes gentle cleanser, exfoliating scrub, toner, and moisturizer. Formulated with natural ingredients like aloe vera, vitamin E, and antioxidants. Cruelty-free and paraben-free.",
    rating: 4.7,
    reviewCount: 138,
    category: "beauty",
    brand: "PureSkin",
    featured: true,
    new: false,
    sale: true,
    stock: 12,
    tags: ["skincare", "beauty", "facial", "natural"],
    images: [
      "https://images.pexels.com/photos/3735149/pexels-photo-3735149.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/6621308/pexels-photo-6621308.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    ],
    variants: ["Normal Skin", "Dry Skin", "Combination Skin", "Sensitive Skin"],
    specs: {
      "Ingredients": "Natural & Organic",
      "Skin Type": "All Types",
      "Usage": "Daily",
      "Contents": "Cleanser 150ml, Scrub 100ml, Toner 200ml, Moisturizer 50ml",
      "Certifications": "Cruelty-Free, Paraben-Free"
    }
  },
  {
    id: "8",
    name: "Ultra HD Smart TV 55\"",
    price: 699.99,
    originalPrice: 899.99,
    description: "Immersive viewing experience with 4K Ultra HD resolution and HDR technology. Smart features include voice control, streaming app integration, and screen mirroring. Includes multiple HDMI and USB ports for connectivity. Thin bezel design with stable stand.",
    rating: 4.6,
    reviewCount: 210,
    category: "electronics",
    brand: "VisionTech",
    featured: true,
    new: false,
    sale: true,
    stock: 6,
    tags: ["tv", "smart tv", "4k", "entertainment"],
    images: [
      "https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/5502227/pexels-photo-5502227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      "https://images.pexels.com/photos/6976103/pexels-photo-6976103.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    ],
    colors: ["black"],
    specs: {
      "Screen Size": "55 inches",
      "Resolution": "3840 x 2160 (4K Ultra HD)",
      "HDR": "Yes, HDR10+",
      "Refresh Rate": "120Hz",
      "Connectivity": "4x HDMI, 2x USB, Ethernet, Wi-Fi, Bluetooth",
      "Smart Platform": "SmartView OS with Voice Control",
      "Audio": "2.1 Channel, 20W"
    }
  }
];

// Get products with filters
export async function getProducts(options = {}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const {
    category,
    brand,
    search,
    minPrice,
    maxPrice,
    sort,
    featured,
    sale,
    page = 1,
    limit = 12
  } = options;
  
  // Clone the products array to avoid modifying the original
  let filteredProducts = [...mockProducts];
  
  // Apply category filter
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase());
  }
  
  // Apply brand filter
  if (brand) {
    filteredProducts = filteredProducts.filter(product => 
      product.brand.toLowerCase() === brand.toLowerCase());
  }
  
  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply price range filter
  if (minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
  }
  
  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
  }
  
  // Apply featured filter
  if (featured) {
    filteredProducts = filteredProducts.filter(product => product.featured);
  }
  
  // Apply sale filter
  if (sale) {
    filteredProducts = filteredProducts.filter(product => product.sale);
  }
  
  // Apply sorting
  if (sort) {
    switch (sort) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => a.new ? -1 : b.new ? 1 : 0);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured or default
        filteredProducts.sort((a, b) => b.featured ? 1 : a.featured ? -1 : 0);
    }
  }
  
  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return paginatedProducts;
}

// Get product by ID
export async function getProductById(id) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockProducts.find(product => product.id === id) || null;
}

// Get related products
export async function getRelatedProducts(productId, limit = 4) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const product = mockProducts.find(product => product.id === productId);
  
  if (!product) {
    return [];
  }
  
  // Get products in same category excluding current product
  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
  
  return relatedProducts;
}

// Get product reviews (mock data)
export async function getProductReviews(productId) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Generate random reviews based on product ID
  const product = mockProducts.find(product => product.id === productId);
  
  if (!product) {
    return [];
  }
  
  const reviews = [
    {
      id: 1,
      name: "Alex Johnson",
      date: "2023-05-15",
      rating: 5,
      title: "Excellent quality and value",
      content: "I'm extremely impressed with this product. The quality exceeds my expectations and it was definitely worth the price. Would highly recommend to anyone looking for a reliable option."
    },
    {
      id: 2,
      name: "Sarah Miller",
      date: "2023-04-28",
      rating: 4,
      title: "Great product with minor issues",
      content: "Overall, I'm quite satisfied with my purchase. The product works as described and looks great. Took off one star because the delivery was delayed and there were some minor cosmetic imperfections."
    },
    {
      id: 3,
      name: "Michael Chen",
      date: "2023-03-12",
      rating: 5,
      title: "Perfect addition to my collection",
      content: "This is exactly what I was looking for! The design is sleek and modern, and the functionality is top-notch. I've already recommended it to several friends who are now also interested in purchasing."
    }
  ];
  
  return reviews;
}