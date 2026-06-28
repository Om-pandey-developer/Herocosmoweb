'use client';

import React, { useState } from 'react';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import QuickViewModal from '../../components/QuickViewModal';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHeart, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import useWishlistStore from '../../store/wishlistStore';
import useCartStore from '../../store/cartStore';
import toast from 'react-hot-toast';
import { getProductBySlug, getAllProducts } from '../../data/products';

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const addToCart = useCartStore((state) => state.addItem);

  const handleMoveToCart = (item) => {
    const fullProduct = getAllProducts().find(p => p.id === item.id);
    if (fullProduct) {
      addToCart(fullProduct, fullProduct.sizes[1] || fullProduct.sizes[0], fullProduct.colors[0]);
      removeItem(item.id);
      toast.success('Moved to cart!', {
        icon: '🛒',
        style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(168,85,247,0.3)' },
      });
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <FiHeart className="w-20 h-20 text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-400 mb-8">Save your favorite superhero merch for later!</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
            >
              Browse Products
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            My Wishlist <span className="text-gray-500 text-lg font-normal">({items.length} items)</span>
          </h1>
          <button
            onClick={clearWishlist}
            className="text-gray-400 hover:text-red-400 text-sm flex items-center gap-1 transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20"
            >
              <Link href={`/products/${item.slug}`}>
                <div className="aspect-[3/4] w-full overflow-hidden bg-gray-800">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              </Link>
              <div className="p-4">
                <p className="text-purple-400 text-xs font-medium uppercase mb-1">{item.theme}</p>
                <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">{item.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-white font-bold">₹{item.price}</span>
                  {item.originalPrice > item.price && (
                    <span className="text-gray-500 line-through text-sm">₹{item.originalPrice}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-colors"
                  >
                    <FiShoppingBag className="w-4 h-4" />
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
