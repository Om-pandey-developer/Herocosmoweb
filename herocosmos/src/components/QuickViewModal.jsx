'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingCart, FiHeart } from 'react-icons/fi';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';
import toast from 'react-hot-toast';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const addToCart = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product?.id));

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(168,85,247,0.3)' },
    });
    onClose();
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product);
    if (added) {
      toast.success('Added to wishlist!', {
        icon: '❤️',
        style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(168,85,247,0.3)' },
      });
    } else {
      toast('Removed from wishlist', {
        icon: '💔',
        style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(168,85,247,0.3)' },
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-gray-900/95 backdrop-blur-md border border-purple-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-1/2 relative">
                <img src={product.image} alt={product.name} className="w-full h-64 md:h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none" />
                {product.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{product.discount}%
                  </span>
                )}
                <button
                  onClick={handleToggleWishlist}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors ${isInWishlist ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-red-500'}`}
                >
                  <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Details */}
              <div className="md:w-1/2 p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-purple-400 text-xs font-medium uppercase tracking-wider">{product.theme}</span>
                  <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <h2 className="text-xl font-bold text-white mb-2">{product.name}</h2>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                    ))}
                  </div>
                  <span className="text-gray-400 text-xs">({product.reviewCount} reviews)</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-white">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-gray-500 line-through text-sm">₹{product.originalPrice}</span>
                  )}
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{product.description}</p>

                {/* Size Selection */}
                <div className="mb-4">
                  <p className="text-white text-sm font-medium mb-2">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedSize === size ? 'bg-purple-600 text-white border-purple-600' : 'bg-white/5 text-gray-300 border border-gray-700 hover:border-purple-500'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                  <p className="text-white text-sm font-medium mb-2">Color</p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedColor === color ? 'bg-purple-600 text-white border-purple-600' : 'bg-white/5 text-gray-300 border border-gray-700 hover:border-purple-500'}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
