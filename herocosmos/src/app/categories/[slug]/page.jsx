'use client';

import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import ProductCard from '../../../components/ProductCard';
import QuickViewModal from '../../../components/QuickViewModal';
import { getProductsByCategory } from '../../../data/products';
import { motion } from 'framer-motion';
import { use } from 'react';

export default function CategoryPage({ params }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const categoryName = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const products = getProductsByCategory(categoryName);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-3">
            {categoryName}
          </h1>
          <p className="text-gray-400">{products.length} products found</p>
        </motion.div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No products found in this category yet.</p>
          </div>
        )}
      </div>
      <QuickViewModal product={quickViewProduct} isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </Layout>
  );
}
