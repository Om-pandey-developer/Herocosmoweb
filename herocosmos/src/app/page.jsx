'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import InstagramFeed from '../components/InstagramFeed';
import { getBestsellers, getNewArrivals, getTrendingProducts } from '../data/products';
import { motion } from 'framer-motion';
import { FiArrowRight, FiZap, FiStar, FiTrendingUp } from 'react-icons/fi';

const categories = [
  { name: 'Oversized', image: '/images/redarmor.jpg', slug: 'oversized' },
  { name: 'Graphic Printed', image: '/images/lightning.jpg', slug: 'graphic-printed' },
  { name: 'Hooded', image: '/images/firesword.jpg', slug: 'hooded' },
  { name: 'Long Sleeve', image: '/images/spacehero.jpg', slug: 'long-sleeve' },
];

const themes = [
  { name: 'Marvel Universe', image: '/images/ironman.jpg', slug: 'marvel' },
  { name: 'DC Comics', image: '/images/archer.jpg', slug: 'dc' },
  { name: 'Anime Superheroes', image: '/images/foxgirl.jpg', slug: 'anime' },
  { name: 'Video Game Characters', image: '/images/magicgirl.jpg', slug: 'video-games' },
];

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const bestsellers = getBestsellers();
  const newArrivals = getNewArrivals();
  const trending = getTrendingProducts();

  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 23; minutes = 59; seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative h-[85vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/arise.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-indigo-900/80"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block bg-purple-600/20 border border-purple-500/30 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6"
          >
            <span className="text-purple-300 text-sm font-medium">🚀 New Collection Dropped!</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 leading-tight">
            Superhero Fashion
            <br />Universe
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Wear your favorite heroes with pride. Premium quality superhero merchandise designed for true fans.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-colors shadow-lg shadow-purple-600/30 flex items-center gap-2"
              >
                Shop Now
                <FiArrowRight />
              </motion.button>
            </Link>
            <Link href="/new-arrivals">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full text-lg font-bold transition-colors border border-white/20"
              >
                New Arrivals
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-3 bg-white/50 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Flash Deals Banner */}
      <section className="bg-gradient-to-r from-red-600/20 via-orange-600/20 to-yellow-600/20 border-y border-orange-500/20 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-bounce">🔥</span>
            <div>
              <h3 className="text-white font-bold text-lg">Flash Deal of the Day!</h3>
              <p className="text-orange-300 text-sm">Up to 50% off on selected superhero merch.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {['hours', 'minutes', 'seconds'].map((unit, i) => (
                <React.Fragment key={unit}>
                  <div className="bg-black/50 border border-orange-500/30 rounded px-2 py-1 min-w-[40px] text-center">
                    <span className="text-lg font-bold text-white">{pad(timeLeft[unit])}</span>
                  </div>
                  {i < 2 && <span className="text-orange-400 font-bold self-center">:</span>}
                </React.Fragment>
              ))}
            </div>
            <Link href="/sale" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold transition-colors whitespace-nowrap">
              Shop Sale
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <FiTrendingUp className="w-6 h-6 text-orange-400" />
              <h2 className="text-3xl font-bold text-white">Trending Now</h2>
            </div>
            <Link href="/shop" className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-medium">
              View All <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-white">Shop by Category</h2>
          <p className="text-gray-400 text-center mb-12">Find your style</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="group relative block overflow-hidden rounded-xl aspect-[3/4]"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                    <div className="p-5">
                      <h3 className="text-white text-xl font-bold">{category.name}</h3>
                      <p className="text-purple-300 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        Explore <FiArrowRight className="w-3 h-3" />
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <FiStar className="w-6 h-6 text-yellow-400" />
              <h2 className="text-3xl font-bold text-white">Bestsellers</h2>
            </div>
            <Link href="/shop" className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-medium">
              View All <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-white">Explore Themes</h2>
          <p className="text-gray-400 text-center mb-12">Choose your universe</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {themes.map((theme, index) => (
              <motion.div
                key={theme.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/themes/${theme.slug}`}
                  className="group relative block overflow-hidden rounded-xl aspect-square"
                >
                  <img
                    src={theme.image}
                    alt={theme.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-center">
                    <h3 className="text-white text-lg font-bold pb-5 text-center">{theme.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <FiZap className="w-6 h-6 text-green-400" />
              <h2 className="text-3xl font-bold text-white">New Arrivals</h2>
            </div>
            <Link href="/new-arrivals" className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-medium">
              View All <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* CTA Banner */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join the Hero Squad</h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
              Subscribe for early access to new drops, exclusive discounts, and earn Hero Coins on every purchase!
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/10 border border-purple-500/30 rounded-full px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-bold transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <QuickViewModal product={quickViewProduct} isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </Layout>
  );
}