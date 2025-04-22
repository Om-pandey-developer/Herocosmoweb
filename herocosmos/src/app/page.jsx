import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const categories = [
  { name: 'Oversized', image: '/categories/oversized.jpg' },
  { name: 'Graphic Printed', image: '/categories/graphic.jpg' },
  { name: 'Hooded', image: '/categories/hooded.jpg' },
  { name: 'Long Sleeve', image: '/categories/longsleeve.jpg' },
];

const themes = [
  { name: 'Marvel Universe', image: '/assets/themes/marvel/0a1749654c745c6f1deb54780237caaf.jpg' },
  { name: 'DC Comics', image: '/assets/themes/dc/512af595d24fb6b9edd55797bc1a0ba4.jpg' },
  { name: 'Anime Superheroes', image: '/assets/themes/anime/465a60bd329a3fd6d686160e88731c75.jpg' },
  { name: 'Video Game Characters', image: '/assets/themes/games.jpg' },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-indigo-900/50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Superhero Fashion Universe
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Wear your favorite heroes with pride
          </p>
          <Link 
            href="/shop" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {categories.map((category) => (
            <Link 
              key={category.name}
              href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Themes Section */}
      <section className="py-16 px-4 bg-black/30">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Themes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {themes.map((theme) => (
            <Link 
              key={theme.name}
              href={`/themes/${theme.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={theme.image}
                  alt={theme.name}
                  className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{theme.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
} 