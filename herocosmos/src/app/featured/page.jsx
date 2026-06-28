'use client';

import React, { useState } from 'react';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import QuickViewModal from '../../components/QuickViewModal';
import { getFeaturedProducts } from '../../data/products';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

export default function FeaturedPage() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const featured = getFeaturedProducts();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <FiStar className="w-6 h-6 text-yellow-400" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">
              Featured Products
            </h1>
            <FiStar className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-gray-400">Hand-picked by our team. The best of the best.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      </div>
      <QuickViewModal product={quickViewProduct} isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </Layout>
  );
}
