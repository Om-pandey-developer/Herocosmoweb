import React from 'react';
import Layout from '../../../components/Layout';
import ProductCard from '../../../components/ProductCard';

// Mock data - replace with actual data from your backend
const themeData = {
  marvel: {
    name: 'Marvel Universe',
    description: 'Explore our exclusive Marvel collection featuring your favorite superheroes',
    bannerImage: '/assets/themes/marvel/0a1749654c745c6f1deb54780237caaf.jpg',
    products: [
      {
        name: 'Avengers T-Shirt',
        price: 29.99,
        image: '/assets/themes/marvel/675be25d51d5a45368538d8ab07a6f2d.jpg',
        themes: ['Marvel', 'Oversized'],
      },
      {
        name: 'Spider-Man Hoodie',
        price: 49.99,
        image: '/assets/themes/marvel/0a1749654c745c6f1deb54780237caaf.jpg',
        themes: ['Marvel', 'Hooded'],
      },
    ],
  },
  dc: {
    name: 'DC Comics',
    description: 'Discover our premium DC Comics collection',
    bannerImage: '/assets/themes/dc/512af595d24fb6b9edd55797bc1a0ba4.jpg',
    products: [
      {
        name: 'Batman T-Shirt',
        price: 29.99,
        image: '/assets/themes/dc/ff9602131de451da238a41d05d181c03.jpg',
        themes: ['DC', 'Oversized'],
      },
      {
        name: 'Superman Hoodie',
        price: 49.99,
        image: '/assets/themes/dc/512af595d24fb6b9edd55797bc1a0ba4.jpg',
        themes: ['DC', 'Hooded'],
      },
    ],
  },
  anime: {
    name: 'Anime Superheroes',
    description: 'Explore our collection inspired by popular anime series',
    bannerImage: '/assets/themes/anime/465a60bd329a3fd6d686160e88731c75.jpg',
    products: [
      {
        name: 'Anime Character T-Shirt',
        price: 29.99,
        image: '/assets/themes/anime/d177e6f87fc421f799ad9dd058870c88.jpg',
        themes: ['Anime', 'Oversized'],
      },
      {
        name: 'Anime Hero Hoodie',
        price: 49.99,
        image: '/assets/themes/anime/465a60bd329a3fd6d686160e88731c75.jpg',
        themes: ['Anime', 'Hooded'],
      },
    ],
  },
  'video-games': {
    name: 'Video Game Characters',
    description: 'Wear your favorite video game heroes with pride',
    bannerImage: '/assets/themes/video games character/videogames character.jpg',
    products: [
      {
        name: 'Gaming Character T-Shirt',
        price: 29.99,
        image: '/assets/themes/video games character/videogames character.jpg',
        themes: ['Video Games', 'Graphic Printed'],
      },
    ],
  },
  'classic-comics': {
    name: 'Classic Comics',
    description: 'Celebrate the timeless heroes of classic comics',
    bannerImage: '/assets/themes/classic comics/classic comic.jpg',
    products: [
      {
        name: 'Classic Hero T-Shirt',
        price: 29.99,
        image: '/assets/themes/classic comics/classic comic.jpg',
        themes: ['Classic Comics', 'Graphic Printed'],
      },
    ],
  },
  'sci-fi-fantasy': {
    name: 'Sci-Fi & Fantasy',
    description: 'Journey through epic sci-fi and fantasy universes',
    bannerImage: '/assets/themes/sci-fi & fantasy/sci-fi fantasy.jpg',
    products: [
      {
        name: 'Sci-Fi Fantasy T-Shirt',
        price: 29.99,
        image: '/assets/themes/sci-fi & fantasy/sci-fi fantasy.jpg',
        themes: ['Sci-Fi & Fantasy', 'Graphic Printed'],
      },
    ],
  },
  oversized: {
    name: 'Oversized',
    description: 'Comfortable and stylish oversized apparel',
    bannerImage: '/assets/themes/oversized/oversized.jpg',
    products: [
      {
        name: 'Oversized T-Shirt',
        price: 29.99,
        image: '/assets/themes/oversized/oversized.jpg',
        themes: ['Oversized'],
      },
    ],
  },
  'graphic-printed': {
    name: 'Graphic Printed',
    description: 'Bold and artistic graphic designs',
    bannerImage: '/assets/themes/graphic printed/graphic printed.jpg',
    products: [
      {
        name: 'Graphic Print T-Shirt',
        price: 29.99,
        image: '/assets/themes/graphic printed/graphic printed.jpg',
        themes: ['Graphic Printed'],
      },
    ],
  },
  hooded: {
    name: 'Hooded',
    description: 'Cozy and trendy hooded collection',
    bannerImage: '/assets/themes/hooded/hoodies.jpg',
    products: [
      {
        name: 'Classic Hoodie',
        price: 49.99,
        image: '/assets/themes/hooded/hoodies.jpg',
        themes: ['Hooded'],
      },
    ],
  },
  'long-sleeve': {
    name: 'Long Sleeve',
    description: 'Elegant and versatile long sleeve designs',
    bannerImage: '/assets/themes/Long sleeve/long sleeves.jpg',
    products: [
      {
        name: 'Long Sleeve T-Shirt',
        price: 34.99,
        image: '/assets/themes/Long sleeve/long sleeves.jpg',
        themes: ['Long Sleeve'],
      },
    ],
  },
};

export default function ThemeDetail({ params }) {
  const theme = themeData[params.slug];

  if (!theme) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-center text-white">Theme not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Theme Banner */}
        <div className="relative h-96 rounded-lg overflow-hidden mb-12">
          <img
            src={theme.bannerImage}
            alt={theme.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-white mb-4">{theme.name}</h1>
              <p className="text-gray-300 text-lg max-w-2xl">{theme.description}</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {theme.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
} 