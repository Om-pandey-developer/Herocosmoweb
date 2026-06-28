'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHeart, FiEye, FiShoppingCart } from 'react-icons/fi';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';
import toast from 'react-hot-toast';

const ProductCard = ({ product, onQuickView }) => {
  const addToCart = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[1] || product.sizes[0], product.colors[0]);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(168,85,247,0.3)' },
    });
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
    >
      <Link href={`/products/${product.slug}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-800">
          {/* Skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.discount > 0 && (
              <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                -{product.discount}%
              </span>
            )}
            {product.tags?.includes('new-arrival') && (
              <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                NEW
              </span>
            )}
            {product.tags?.includes('trending') && (
              <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                🔥 TRENDING
              </span>
            )}
          </div>

          {/* Action Buttons Overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${isInWishlist ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-red-500'}`}
            >
              <FiHeart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickView}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-purple-500 transition-colors"
            >
              <FiEye className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Quick Add to Cart (bottom overlay) */}
          <motion.div
            initial={{ y: '100%' }}
            whileHover={{ y: 0 }}
            className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <button
              onClick={handleAddToCart}
              className="w-full bg-purple-600/90 backdrop-blur-sm hover:bg-purple-700 text-white py-3 flex items-center justify-center gap-2 text-sm font-semibold transition-colors"
            >
              <FiShoppingCart className="w-4 h-4" />
              Quick Add
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-purple-400 text-xs font-medium uppercase tracking-wider mb-1">{product.theme}</p>
          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xs ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
              ))}
            </div>
            <span className="text-gray-500 text-xs">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-gray-500 line-through text-sm">₹{product.originalPrice}</span>
            )}
          </div>

          {/* Available Sizes */}
          <div className="flex gap-1 mt-2">
            {product.sizes.slice(0, 4).map((size) => (
              <span key={size} className="text-[10px] text-gray-500 border border-gray-700 px-1.5 py-0.5 rounded">
                {size}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-[10px] text-gray-500 border border-gray-700 px-1.5 py-0.5 rounded">
                +{product.sizes.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;