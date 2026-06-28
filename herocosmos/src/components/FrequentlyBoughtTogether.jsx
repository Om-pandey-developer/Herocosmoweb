'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiShoppingCart } from 'react-icons/fi';
import useCartStore from '../store/cartStore';
import toast from 'react-hot-toast';

const FrequentlyBoughtTogether = ({ products }) => {
  const [selectedIds, setSelectedIds] = useState(products.map(p => p.id));
  const addToCart = useCartStore((state) => state.addItem);

  const toggleProduct = (id) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length <= 1) return; // Keep at least 1 selected
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedProducts = products.filter(p => selectedIds.includes(p.id));
  const bundleTotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleOriginal = selectedProducts.reduce((sum, p) => sum + p.originalPrice, 0);
  const extraDiscount = Math.round(bundleTotal * 0.1);
  const bundleFinalPrice = bundleTotal - extraDiscount;

  const handleAddBundle = () => {
    selectedProducts.forEach(product => {
      addToCart(product, product.sizes[1] || product.sizes[0], product.colors[0]);
    });
    toast.success(`${selectedProducts.length} items added to cart!`, {
      icon: '🛒',
      style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(168,85,247,0.3)' },
    });
  };

  if (products.length < 2) return null;

  return (
    <div className="mt-12 border-t border-gray-800 pt-12">
      <h2 className="text-2xl font-bold text-white mb-6">Frequently Bought Together</h2>
      <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {products.map((product, index) => (
            <React.Fragment key={product.id}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => toggleProduct(product.id)}
                className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                  selectedIds.includes(product.id) ? 'border-purple-500' : 'border-gray-700 opacity-50'
                }`}
              >
                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover" />
                <div className="absolute top-1 right-1">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedIds.includes(product.id) ? 'bg-purple-600 border-purple-600' : 'border-gray-500 bg-gray-900'
                  }`}>
                    {selectedIds.includes(product.id) && <span className="text-white text-xs">✓</span>}
                  </div>
                </div>
              </motion.button>
              {index < products.length - 1 && (
                <span className="text-2xl text-gray-500 font-bold">+</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-gray-500 line-through text-sm">₹{bundleOriginal}</span>
            <span className="text-2xl font-bold text-white">₹{bundleFinalPrice}</span>
            <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-xs font-bold">
              Save ₹{bundleOriginal - bundleFinalPrice}
            </span>
          </div>
          <p className="text-purple-400 text-xs mb-4">Extra 10% off when buying together!</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddBundle}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <FiShoppingCart className="w-4 h-4" />
            Add {selectedProducts.length} Items to Cart
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyBoughtTogether;
