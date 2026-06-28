'use client';

import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import ProductCard from '../../../components/ProductCard';
import QuickViewModal from '../../../components/QuickViewModal';
import { getProductsByTheme } from '../../../data/products';
import { motion } from 'framer-motion';
import { use } from 'react';

const themeInfo = {
  'marvel': { title: 'Marvel Universe', gradient: 'from-red-400 to-yellow-400', description: 'Earth\'s Mightiest Heroes merch collection' },
  'dc': { title: 'DC Comics', gradient: 'from-blue-400 to-indigo-400', description: 'The Dark Knight & Justice League collection' },
  'anime': { title: 'Anime Superheroes', gradient: 'from-orange-400 to-pink-400', description: 'Naruto, DBZ, One Punch Man & more' },
  'video-games': { title: 'Video Game Characters', gradient: 'from-green-400 to-cyan-400', description: 'Level up your wardrobe' },
  'classic-comics': { title: 'Classic Comics', gradient: 'from-amber-400 to-red-400', description: 'Timeless heroes, timeless style' },
  'sci-fi-fantasy': { title: 'Sci-Fi & Fantasy', gradient: 'from-violet-400 to-blue-400', description: 'Journey through epic universes' },
};

export default function ThemeDetailPage({ params }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const info = themeInfo[slug] || { title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), gradient: 'from-purple-400 to-blue-400', description: '' };
  const products = getProductsByTheme(info.title);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${info.gradient} mb-3`}>
            {info.title}
          </h1>
          <p className="text-gray-400">{info.description} • {products.length} products</p>
        </motion.div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Products coming soon for this theme!</p>
          </div>
        )}
      </div>
      <QuickViewModal product={quickViewProduct} isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </Layout>
  );
}