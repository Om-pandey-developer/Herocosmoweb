const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const products = [
  {
    name: 'Iron Man Arc Reactor Oversized Tee',
    slug: 'iron-man-arc-reactor-oversized-tee',
    description: 'Channel your inner Tony Stark with this premium oversized graphic tee featuring the iconic Arc Reactor design. Made with 100% bio-washed cotton for maximum comfort during long coding sessions or saving the world.',
    price: 1499,
    originalPrice: 2499,
    image: '/images/ironman.jpg',
    category: 'oversized',
    theme: 'marvel',
    sizes: JSON.stringify(['S', 'M', 'L', 'XL', 'XXL']),
    colors: JSON.stringify(['Black', 'Charcoal']),
    tags: JSON.stringify(['bestseller', 'trending']),
    rating: 4.8,
    reviewCount: 342,
    stock: 50
  },
  {
    name: 'Batman Dark Knight Graphic Hoodie',
    slug: 'batman-dark-knight-graphic-hoodie',
    description: 'The night is yours. This heavy-blend fleece hoodie features a minimalist yet striking Batman insignia. Perfect for those chilly evening patrols in Gotham.',
    price: 2999,
    originalPrice: 4499,
    image: '/images/archer.jpg',
    category: 'hooded',
    theme: 'dc',
    sizes: JSON.stringify(['M', 'L', 'XL']),
    colors: JSON.stringify(['Midnight Black', 'Dark Grey']),
    tags: JSON.stringify(['bestseller', 'new-arrival']),
    rating: 4.9,
    reviewCount: 856,
    stock: 25
  },
  {
    name: 'Naruto Sage Mode Acid Wash Tee',
    slug: 'naruto-sage-mode-acid-wash-tee',
    description: 'Believe it! This vintage acid-wash tee brings the legendary Sage Mode to life. Each piece has a unique wash pattern, making your merch as one-of-a-kind as your ninja way.',
    price: 1299,
    originalPrice: 1999,
    image: '/images/foxgirl.jpg',
    category: 'graphic-printed',
    theme: 'anime',
    sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
    colors: JSON.stringify(['Orange Wash', 'Black Wash']),
    tags: JSON.stringify(['trending']),
    rating: 4.7,
    reviewCount: 215,
    stock: 100
  },
  {
    name: 'Geralt Twin Swords Long Sleeve',
    slug: 'geralt-twin-swords-long-sleeve',
    description: 'One for monsters, one for men. This premium long-sleeve tee features the iconic twin swords and the Wolf School medallion. Essential gear for any Witcher on the Path.',
    price: 1799,
    originalPrice: 2299,
    image: '/images/knight.jpg',
    category: 'long-sleeve',
    theme: 'video-games',
    sizes: JSON.stringify(['M', 'L', 'XL', 'XXL']),
    colors: JSON.stringify(['Wolf Grey', 'Black']),
    tags: JSON.stringify([]),
    rating: 4.6,
    reviewCount: 128,
    stock: 40
  },
];

async function main() {
  console.log('Start seeding...');
  
  // Clear existing products
  await prisma.product.deleteMany({});
  
  for (const product of products) {
    const p = await prisma.product.create({
      data: product,
    });
    console.log(`Created product with id: ${p.id}`);
  }
  
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
