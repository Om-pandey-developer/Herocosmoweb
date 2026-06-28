'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiMenu, FiX, FiSun, FiMoon, FiUser } from 'react-icons/fi';
import SearchBar from './SearchBar';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);

  const navLinks = [
    { href: '/categories', label: 'Categories' },
    { href: '/themes', label: 'Themes' },
    { href: '/featured', label: 'Featured' },
    { href: '/new-arrivals', label: 'New Arrivals' },
    { href: '/special-collections', label: 'Collections' },
    { href: '/sale', label: 'Sale', highlight: true },
    { href: '/shop', label: 'Shop' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white">
      {/* Starry background effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/assets/images/stars.png')] opacity-20"></div>
      </div>

      {/* Top Banner */}
      <div className="relative z-20 bg-purple-600 text-white text-center py-1.5 text-xs font-medium">
        🚀 Free shipping on orders above ₹1999 | Use code <strong>HERO10</strong> for 10% off
      </div>

      {/* Navigation */}
      <nav className="relative z-20 bg-black/60 backdrop-blur-md border-b border-purple-500/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Nav Row */}
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white p-2"
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                HeroCosmos
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 justify-center max-w-md mx-4">
              <SearchBar />
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-1">
              <Link href="/wishlist" className="relative text-gray-300 hover:text-white p-2 transition-colors">
                <FiHeart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="relative text-gray-300 hover:text-white p-2 transition-colors">
                <FiShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-purple-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/auth/login" className="text-gray-300 hover:text-white p-2 transition-colors">
                <FiUser className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Nav Links Row - Desktop */}
          <div className="hidden md:flex items-center justify-center gap-1 pb-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  link.highlight
                    ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <SearchBar />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/90 backdrop-blur-md border-t border-purple-500/20 overflow-hidden"
            >
              <div className="px-4 py-2 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      link.highlight
                        ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/70 backdrop-blur-sm border-t border-purple-500/20 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
                HeroCosmos
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Your ultimate destination for superhero-inspired fashion. Wear your heroes with pride.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-white font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                {['New Arrivals', 'Bestsellers', 'Sale', 'All Products'].map((item) => (
                  <li key={item}>
                    <Link href="/shop" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="text-white font-semibold mb-4">Help</h4>
              <ul className="space-y-2">
                {['Size Guide', 'Shipping Info', 'Returns & Exchanges', 'Contact Us'].map((item) => (
                  <li key={item}>
                    <Link href="/shop" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-400 text-sm mb-3">Subscribe for new launches & exclusive offers.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/10 border border-purple-500/30 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
                />
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-500/20 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 HeroCosmos. All rights reserved.
            </p>
            <div className="flex gap-4 text-gray-500 text-sm">
              <Link href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-purple-400 transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-purple-400 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;