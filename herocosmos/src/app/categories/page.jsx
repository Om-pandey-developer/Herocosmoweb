'use client';

import React, { useState } from 'react';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import QuickViewModal from '../../components/QuickViewModal';
import { getProductsByCategory } from '../../data/products';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const categoriesData = [
  { name: 'Oversized', slug: 'oversized', image: '/images/redarmor.jpg', description: 'Comfortable & trendy drop-shoulder fits' },
  { name: 'Graphic Printed', slug: 'graphic-printed', image: '/images/lightning.jpg', description: 'Bold artwork & vivid designs' },
  { name: 'Hooded', slug: 'hooded', image: '/images/firesword.jpg', description: 'Premium hoodies for every season' },
  { name: 'Long Sleeve', slug: 'long-sleeve', image: '/images/spacehero.jpg', description: 'Elegant & versatile long sleeves' },
];

export default function CategoriesPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-3">
            All Categories
          </h1>
          <p className="text-gray-400">Find your perfect style</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoriesData.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/categories/${category.slug}`}
                className="group relative block overflow-hidden rounded-2xl aspect-[16/9] bg-gray-800"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-white mb-2">{category.name}</h2>
                    <p className="text-gray-300 mb-4">{category.description}</p>
                    <span className="inline-flex items-center gap-1 text-purple-400 font-medium group-hover:gap-3 transition-all">
                      Explore Collection <FiArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
