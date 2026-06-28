'use client';

import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import ProductCard from '../../../components/ProductCard';
import SizeGuideModal from '../../../components/SizeGuideModal';
import QuickViewModal from '../../../components/QuickViewModal';
import ProductReviews from '../../../components/ProductReviews';
import SizeRecommender from '../../../components/SizeRecommender';
import FrequentlyBoughtTogether from '../../../components/FrequentlyBoughtTogether';
import Product3DViewer from '../../../components/Product3DViewer';
import useCartStore from '../../../store/cartStore';
import useWishlistStore from '../../../store/wishlistStore';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiTruck, FiRefreshCw, FiShield, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ProductDetailClient({ product, relatedProducts }) {
  const [viewMode, setViewMode] = useState('2d'); // '2d' or '3d'
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [sizeRecommenderOpen, setSizeRecommenderOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const addToCart = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛒',
      style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(168,85,247,0.3)' },
    });
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
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-800">
              
              <div className="absolute top-4 right-4 z-10 flex bg-black/60 backdrop-blur-md rounded-lg p-1 border border-white/10">
                <button
                  onClick={() => setViewMode('2d')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${viewMode === '2d' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  2D
                </button>
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${viewMode === '3d' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  3D
                </button>
              </div>

              {viewMode === '3d' ? (
                <Product3DViewer imageUrl={product.images[selectedImage]} />
              ) : (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}

              {product.discount > 0 && viewMode === '2d' && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                  -{product.discount}% OFF
                </span>
              )}
            </div>
            {viewMode === '2d' && (
              <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-purple-500' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-purple-400 text-sm font-medium uppercase tracking-wider mb-1">{product.theme} / {product.category}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                  ))}
                </div>
                <span className="text-white font-medium">{product.rating}</span>
                <span className="text-gray-400">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl font-bold text-white">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-gray-500 line-through text-xl">₹{product.originalPrice}</span>
                    <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-sm font-semibold">
                      Save ₹{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>
              <p className="text-green-400 text-sm font-medium">Inclusive of all taxes</p>
            </div>

            <p className="text-gray-300">{product.description}</p>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-white font-semibold">Select Size</p>
                <div className="flex gap-3">
                  <button onClick={() => setSizeRecommenderOpen(true)} className="text-green-400 text-sm hover:underline flex items-center gap-1">
                    🤖 Find My Size
                  </button>
                  <button onClick={() => setSizeGuideOpen(true)} className="text-purple-400 text-sm hover:underline">
                    Size Guide
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      selectedSize === size
                        ? 'bg-purple-600 text-white border-2 border-purple-600 shadow-lg shadow-purple-600/30'
                        : 'bg-white/5 text-gray-300 border-2 border-gray-700 hover:border-purple-500'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <p className="text-white font-semibold mb-3">Select Color</p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <motion.button
                    key={color}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(color)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      selectedColor === color
                        ? 'bg-purple-600 text-white border-2 border-purple-600 shadow-lg shadow-purple-600/30'
                        : 'bg-white/5 text-gray-300 border-2 border-gray-700 hover:border-purple-500'
                    }`}
                  >
                    {color}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-white font-semibold mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center text-lg font-bold"
                >
                  -
                </button>
                <span className="text-white font-semibold text-lg w-10 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-lg transition-colors shadow-lg shadow-purple-600/30"
              >
                <FiShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleWishlist}
                className={`p-4 rounded-xl border-2 transition-all ${
                  isInWishlist
                    ? 'bg-red-500/20 border-red-500 text-red-400'
                    : 'bg-white/5 border-gray-700 text-gray-400 hover:border-red-500 hover:text-red-400'
                }`}
              >
                <FiHeart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
              </motion.button>
            </div>

            {/* Stock Info */}
            {product.stockCount <= 20 && (
              <p className="text-orange-400 text-sm font-medium">
                🔥 Only {product.stockCount} left in stock - order soon!
              </p>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800">
              <div className="text-center">
                <FiTruck className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                <p className="text-gray-400 text-xs">Free Shipping</p>
                <p className="text-gray-500 text-[10px]">Above ₹1999</p>
              </div>
              <div className="text-center">
                <FiRefreshCw className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                <p className="text-gray-400 text-xs">Easy Returns</p>
                <p className="text-gray-500 text-[10px]">15 day return</p>
              </div>
              <div className="text-center">
                <FiShield className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                <p className="text-gray-400 text-xs">Secure Payment</p>
                <p className="text-gray-500 text-[10px]">100% secure</p>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-3 pt-4 border-t border-gray-800">
              <h3 className="text-white font-semibold">Product Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-400">Material</span>
                <span className="text-gray-200">{product.material}</span>
                <span className="text-gray-400">Fit</span>
                <span className="text-gray-200">{product.fit}</span>
              </div>
            </div>

            {/* Care Instructions */}
            <div className="space-y-3 pt-4 border-t border-gray-800">
              <h3 className="text-white font-semibold">Care Instructions</h3>
              <ul className="space-y-1">
                {product.care.map((instruction, i) => (
                  <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-purple-400"></span>
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Frequently Bought Together */}
        {relatedProducts.length >= 2 && (
          <FrequentlyBoughtTogether products={[product, ...relatedProducts.slice(0, 2)]} />
        )}

        {/* Reviews */}
        <ProductReviews productRating={product.rating} reviewCount={product.reviewCount} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
      <SizeRecommender isOpen={sizeRecommenderOpen} onClose={() => setSizeRecommenderOpen(false)} sizes={product.sizes} />
      <QuickViewModal product={quickViewProduct} isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </Layout>
  );
}
