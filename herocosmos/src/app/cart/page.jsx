'use client';

import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import useCartStore from '../../store/cartStore';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotal = useCartStore((state) => state.getTotal);
  const getOriginalTotal = useCartStore((state) => state.getOriginalTotal);

  const total = getTotal();
  const originalTotal = getOriginalTotal();
  const savings = originalTotal - total;
  const shippingFree = total >= 1999;
  const shippingCost = shippingFree ? 0 : 99;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <FiShoppingBag className="w-20 h-20 text-gray-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
            >
              Start Shopping
              <FiArrowRight />
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
            Shopping Cart <span className="text-gray-500 text-lg font-normal">({items.length} items)</span>
          </h1>
          <button
            onClick={clearCart}
            className="text-gray-400 hover:text-red-400 text-sm flex items-center gap-1 transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.size}-${item.color}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 flex gap-4"
              >
                <Link href={`/products/${item.slug}`} className="shrink-0">
                  <img src={item.image} alt={item.name} className="w-24 h-28 rounded-lg object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="text-white font-semibold text-sm hover:text-purple-300 transition-colors truncate">{item.name}</h3>
                  </Link>
                  <div className="flex gap-3 mt-1 text-xs text-gray-400">
                    <span>Size: {item.size}</span>
                    <span>Color: {item.color}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-white font-bold">₹{item.price}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-gray-500 line-through text-sm">₹{item.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        className="w-7 h-7 rounded-md bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
                      >
                        <FiMinus className="w-3 h-3" />
                      </button>
                      <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        className="w-7 h-7 rounded-md bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
                      >
                        <FiPlus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold">₹{item.price * item.quantity}</span>
                      <button
                        onClick={() => removeItem(item.id, item.size, item.color)}
                        className="text-gray-500 hover:text-red-400 transition-colors p-1"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 sticky top-32"
            >
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

              {/* Coupon */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="flex-1 bg-white/10 border border-purple-500/30 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
                />
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Apply
                </button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{originalTotal}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
                    <span>-₹{savings}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>{shippingFree ? <span className="text-green-400">FREE</span> : `₹${shippingCost}`}</span>
                </div>
                {!shippingFree && (
                  <p className="text-purple-400 text-xs">
                    Add ₹{1999 - total} more for free shipping!
                  </p>
                )}
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total + shippingCost}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="block w-full mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-lg transition-colors shadow-lg shadow-purple-600/30"
                >
                  Proceed to Checkout
                  <FiArrowRight />
                </motion.button>
              </Link>

              <p className="text-gray-500 text-xs text-center mt-3">
                🔒 Secure checkout powered by Razorpay
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
