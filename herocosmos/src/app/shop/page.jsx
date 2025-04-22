import React from 'react';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';


const products = [
  {
    id: 1,
    name: 'Marvel Avengers Oversized T-shirt',
    price: 29.99,
    image: '/products/avengers-oversized.jpg',
    themes: ['Marvel', 'Oversized'],
    slug: 'marvel-avengers-oversized-tee'
  },
  {
    id: 2,
    name: 'Batman Graphic Hoodie',
    price: 49.99,
    image: '/products/batman-hoodie.jpg',
    themes: ['DC', 'Hooded'],
    slug: 'batman-graphic-hoodie'
  },
  
];

const categories = [
  'Oversized',
  'Acid Wash',
  'Graphic Printed',
  'Solid Color',
  'Polo T-Shirts',
  'Sleeveless',
  'Long Sleeve',
  'Henley',
  'Hooded',
  'Crop Tops'
];

const themes = [
  'Marvel Universe',
  'DC Comics',
  'Anime Superheroes',
  'Classic Comics',
  'Sci-Fi & Fantasy',
  'Video Game Characters',
  'Custom Fan Art'
];

export default function Shop() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 bg-black/30 backdrop-blur-sm rounded-lg p-4 h-fit">
            <h2 className="text-xl font-bold mb-4 text-white">Filters</h2>
            
            {/* Categories Filter */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-purple-400">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 text-gray-300">
                    <input type="checkbox" className="rounded text-purple-600" />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Themes Filter */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-purple-400">Themes</h3>
              <div className="space-y-2">
                {themes.map((theme) => (
                  <label key={theme} className="flex items-center space-x-2 text-gray-300">
                    <input type="checkbox" className="rounded text-purple-600" />
                    <span>{theme}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 