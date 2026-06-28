'use client';

import React, { useState } from 'react';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import QuickViewModal from '../../components/QuickViewModal';
import { getBestsellers, getAllProducts } from '../../data/products';
import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import Link from 'next/link';

const collections = [
  {
    name: 'The Hero Starter Pack',
    description: 'Our most popular items bundled for newcomers. Get 3 bestsellers at a special price.',
    products: [0, 1, 4],
    gradient: 'from-purple-600/30 to-pink-600/30',
  },
  {
    name: 'Villain Arc Collection',
    description: 'Embrace the dark side with our villain-inspired designs.',
    products: [5, 6, 2],
    gradient: 'from-red-600/30 to-black/30',
  },
];

export default function SpecialCollectionsPage() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const allProducts = getAllProducts();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <FiAward className="w-6 h-6 text-purple-400" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Special Collections
            </h1>
          </div>
          <p className="text-gray-400">Curated bundles & limited editions crafted for true fans</p>
        </motion.div>

        <div className="space-y-16">
          {collections.map((collection, colIndex) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: colIndex * 0.2 }}
            >
              <div className={`bg-gradient-to-r ${collection.gradient} backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 md:p-8 mb-6`}>
                <h2 className="text-2xl font-bold text-white mb-2">{collection.name}</h2>
                <p className="text-gray-300">{collection.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.products.map((productIndex) => {
                  const product = allProducts[productIndex];
                  if (!product) return null;
                  return (
                    <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <QuickViewModal product={quickViewProduct} isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </Layout>
  );
}
