// Comprehensive product catalog for HeroCosmos
const products = [
  {
    id: 1,
    name: 'Iron Man Arc Reactor Oversized Tee',
    slug: 'iron-man-arc-reactor-oversized-tee',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    image: '/images/ironman.jpg',
    images: ['/images/ironman.jpg', '/images/redarmor.jpg'],
    category: 'Oversized',
    theme: 'Marvel Universe',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy Blue', 'Charcoal'],
    rating: 4.7,
    reviewCount: 342,
    description: 'Channel your inner genius, billionaire, philanthropist with this premium oversized tee featuring the iconic Arc Reactor design. Made from 100% combed cotton with a relaxed drop-shoulder fit.',
    material: '100% Combed Cotton, 240 GSM',
    fit: 'Oversized / Drop Shoulder',
    care: ['Machine wash cold', 'Do not bleach', 'Tumble dry low', 'Iron on low heat'],
    tags: ['bestseller', 'new-arrival'],
    inStock: true,
    stockCount: 45,
  },
  {
    id: 2,
    name: 'Batman Dark Knight Graphic Hoodie',
    slug: 'batman-dark-knight-graphic-hoodie',
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    image: '/images/archer.jpg',
    images: ['/images/archer.jpg', '/images/firesword.jpg'],
    category: 'Hooded',
    theme: 'DC Comics',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Dark Grey'],
    rating: 4.9,
    reviewCount: 528,
    description: 'Embrace the darkness with this premium graphic hoodie featuring the Dark Knight. Fleece-lined interior for warmth, with a bold Gotham skyline print on the back.',
    material: '80% Cotton, 20% Polyester Fleece, 340 GSM',
    fit: 'Regular Fit',
    care: ['Machine wash cold', 'Do not bleach', 'Hang dry', 'Do not iron on print'],
    tags: ['bestseller', 'featured'],
    inStock: true,
    stockCount: 23,
  },
  {
    id: 3,
    name: 'Naruto Sage Mode Acid Wash Tee',
    slug: 'naruto-sage-mode-acid-wash-tee',
    price: 1499,
    originalPrice: 2199,
    discount: 32,
    image: '/images/foxgirl.jpg',
    images: ['/images/foxgirl.jpg', '/images/magicgirl.jpg'],
    category: 'Graphic Printed',
    theme: 'Anime Superheroes',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Orange Wash', 'Black Wash'],
    rating: 4.8,
    reviewCount: 267,
    description: 'Unleash your inner ninja with this stunning acid wash tee featuring Naruto in Sage Mode. Each piece is uniquely washed for a one-of-a-kind look.',
    material: '100% Cotton, Acid Wash Finish, 200 GSM',
    fit: 'Relaxed Fit',
    care: ['Hand wash recommended', 'Do not bleach', 'Hang dry', 'Iron inside out'],
    tags: ['new-arrival', 'trending'],
    inStock: true,
    stockCount: 67,
  },
  {
    id: 4,
    name: 'Spider-Man Web Slinger Long Sleeve',
    slug: 'spider-man-web-slinger-long-sleeve',
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    image: '/images/redarmor.jpg',
    images: ['/images/redarmor.jpg', '/images/spacehero.jpg'],
    category: 'Long Sleeve',
    theme: 'Marvel Universe',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Black', 'Navy'],
    rating: 4.6,
    reviewCount: 189,
    description: 'Swing through the city in style with this premium long sleeve featuring dynamic web-slinging Spider-Man artwork. Ribbed cuffs and hem for a snug fit.',
    material: '100% Cotton Jersey, 220 GSM',
    fit: 'Regular Fit',
    care: ['Machine wash cold', 'Do not bleach', 'Tumble dry low'],
    tags: ['featured'],
    inStock: true,
    stockCount: 34,
  },
  {
    id: 5,
    name: 'Goku Ultra Instinct Oversized Tee',
    slug: 'goku-ultra-instinct-oversized-tee',
    price: 1399,
    originalPrice: 1999,
    discount: 30,
    image: '/images/lightning.jpg',
    images: ['/images/lightning.jpg', '/images/spacehero.jpg'],
    category: 'Oversized',
    theme: 'Anime Superheroes',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Silver Grey', 'Black'],
    rating: 4.9,
    reviewCount: 456,
    description: 'Transcend your limits with this breathtaking Ultra Instinct Goku oversized tee. Features a holographic foil print that shimmers in the light.',
    material: '100% Combed Cotton, 240 GSM',
    fit: 'Oversized / Drop Shoulder',
    care: ['Machine wash cold', 'Do not bleach', 'Do not iron on print'],
    tags: ['bestseller', 'trending'],
    inStock: true,
    stockCount: 12,
  },
  {
    id: 6,
    name: 'Joker Chaos Graphic Printed Tee',
    slug: 'joker-chaos-graphic-printed-tee',
    price: 1199,
    originalPrice: 1799,
    discount: 33,
    image: '/images/scarlet.jpg',
    images: ['/images/scarlet.jpg', '/images/archer.jpg'],
    category: 'Graphic Printed',
    theme: 'DC Comics',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Purple', 'Green', 'Black'],
    rating: 4.5,
    reviewCount: 198,
    description: 'Why so serious? This premium graphic tee features the Clown Prince of Crime in a stunning watercolor art style. DTG printed for vibrant, lasting colors.',
    material: '100% Ring-spun Cotton, 180 GSM',
    fit: 'Regular Fit',
    care: ['Machine wash cold', 'Turn inside out', 'Do not iron on print'],
    tags: ['sale'],
    inStock: true,
    stockCount: 89,
  },
  {
    id: 7,
    name: 'Cyberpunk 2077 Neon Hoodie',
    slug: 'cyberpunk-2077-neon-hoodie',
    price: 2799,
    originalPrice: 3999,
    discount: 30,
    image: '/images/magicgirl.jpg',
    images: ['/images/magicgirl.jpg', '/images/lightning.jpg'],
    category: 'Hooded',
    theme: 'Video Game Characters',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Neon Yellow'],
    rating: 4.8,
    reviewCount: 312,
    description: 'Jack into Night City with this cyberpunk-inspired hoodie. Features reflective neon accents that glow under UV light and a hidden zip pocket.',
    material: '70% Cotton, 30% Polyester, 360 GSM',
    fit: 'Oversized Fit',
    care: ['Machine wash cold', 'Do not bleach', 'Hang dry'],
    tags: ['new-arrival', 'featured'],
    inStock: true,
    stockCount: 28,
  },
  {
    id: 8,
    name: 'Avengers Assemble Crop Top',
    slug: 'avengers-assemble-crop-top',
    price: 999,
    originalPrice: 1499,
    discount: 33,
    image: '/images/firesword.jpg',
    images: ['/images/firesword.jpg', '/images/ironman.jpg'],
    category: 'Graphic Printed',
    theme: 'Marvel Universe',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Black', 'Red'],
    rating: 4.4,
    reviewCount: 156,
    description: 'Assemble in style with this trendy crop top featuring minimalist Avengers iconography. Perfect for layering or wearing solo.',
    material: '95% Cotton, 5% Spandex, 180 GSM',
    fit: 'Cropped / Relaxed',
    care: ['Machine wash cold', 'Do not bleach', 'Tumble dry low'],
    tags: ['trending'],
    inStock: true,
    stockCount: 56,
  },
  {
    id: 9,
    name: 'One Punch Man Serious Punch Tee',
    slug: 'one-punch-man-serious-punch-tee',
    price: 1199,
    originalPrice: 1699,
    discount: 29,
    image: '/images/spacehero.jpg',
    images: ['/images/spacehero.jpg', '/images/lightning.jpg'],
    category: 'Oversized',
    theme: 'Anime Superheroes',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Yellow', 'Black', 'White'],
    rating: 4.7,
    reviewCount: 234,
    description: 'One punch is all it takes! This oversized tee features Saitama delivering his legendary Serious Punch with dynamic manga-style artwork.',
    material: '100% Combed Cotton, 240 GSM',
    fit: 'Oversized / Drop Shoulder',
    care: ['Machine wash cold', 'Do not iron on print'],
    tags: ['bestseller'],
    inStock: true,
    stockCount: 41,
  },
  {
    id: 10,
    name: 'Superman Kryptonian Long Sleeve',
    slug: 'superman-kryptonian-long-sleeve',
    price: 1699,
    originalPrice: 2299,
    discount: 26,
    image: '/images/arise.jpg',
    images: ['/images/arise.jpg', '/images/scarlet.jpg'],
    category: 'Long Sleeve',
    theme: 'DC Comics',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Red', 'Black'],
    rating: 4.6,
    reviewCount: 178,
    description: 'Fly higher with this Kryptonian-inspired long sleeve tee featuring the iconic S-shield in embossed metallic print.',
    material: '100% Cotton Jersey, 220 GSM',
    fit: 'Regular Fit',
    care: ['Machine wash cold', 'Do not bleach', 'Iron inside out'],
    tags: ['featured'],
    inStock: true,
    stockCount: 33,
  },
  {
    id: 11,
    name: 'Zelda Triforce Henley Tee',
    slug: 'zelda-triforce-henley-tee',
    price: 1399,
    originalPrice: 1899,
    discount: 26,
    image: '/images/firesword.jpg',
    images: ['/images/firesword.jpg', '/images/magicgirl.jpg'],
    category: 'Graphic Printed',
    theme: 'Video Game Characters',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Forest Green', 'Black', 'Gold'],
    rating: 4.5,
    reviewCount: 145,
    description: 'Its dangerous to go alone! Take this premium henley tee inspired by the Legend of Zelda, featuring an embroidered Triforce on the chest.',
    material: '100% Organic Cotton, 200 GSM',
    fit: 'Regular Fit',
    care: ['Machine wash cold', 'Tumble dry low'],
    tags: ['new-arrival'],
    inStock: true,
    stockCount: 52,
  },
  {
    id: 12,
    name: 'Black Panther Wakanda Forever Hoodie',
    slug: 'black-panther-wakanda-forever-hoodie',
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    image: '/images/arise.jpg',
    images: ['/images/arise.jpg', '/images/redarmor.jpg'],
    category: 'Hooded',
    theme: 'Marvel Universe',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Purple'],
    rating: 4.9,
    reviewCount: 389,
    description: 'Wakanda Forever! This premium hoodie features vibranium-inspired geometric patterns with subtle metallic thread accents. Kangaroo pocket with hidden earphone loop.',
    material: '80% Cotton, 20% Polyester Fleece, 340 GSM',
    fit: 'Regular Fit',
    care: ['Machine wash cold', 'Do not bleach', 'Hang dry'],
    tags: ['bestseller', 'featured', 'trending'],
    inStock: true,
    stockCount: 18,
  },
];

// Helper functions
export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug) {
  return products.find(p => p.slug === slug) || null;
}

export function getProductsByCategory(category) {
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export function getProductsByTheme(theme) {
  return products.filter(p => p.theme.toLowerCase().includes(theme.toLowerCase()));
}

export function getProductsByTag(tag) {
  return products.filter(p => p.tags.includes(tag));
}

export function getFeaturedProducts() {
  return products.filter(p => p.tags.includes('featured'));
}

export function getNewArrivals() {
  return products.filter(p => p.tags.includes('new-arrival'));
}

export function getSaleProducts() {
  return products.filter(p => p.tags.includes('sale') || p.discount >= 30);
}

export function getBestsellers() {
  return products.filter(p => p.tags.includes('bestseller'));
}

export function getTrendingProducts() {
  return products.filter(p => p.tags.includes('trending'));
}

export function searchProducts(query) {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.theme.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q)) ||
    p.description.toLowerCase().includes(q)
  );
}

export function getRelatedProducts(productId, limit = 4) {
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  return products
    .filter(p => p.id !== productId && (p.theme === product.theme || p.category === product.category))
    .slice(0, limit);
}

export const allCategories = [
  'Oversized', 'Graphic Printed', 'Hooded', 'Long Sleeve',
];

export const allThemes = [
  'Marvel Universe', 'DC Comics', 'Anime Superheroes', 'Video Game Characters',
];

export const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default products;
