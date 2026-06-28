'use client';

import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const themes = [
  {
    name: 'Marvel Universe',
    slug: 'marvel',
    description: 'Explore the Marvel Cinematic Universe with our exclusive collection of Iron Man, Spider-Man, Avengers & more.',
    bannerImage: '/images/ironman.jpg',
    color: 'from-red-600/30 to-yellow-600/30',
  },
  {
    name: 'DC Comics',
    slug: 'dc',
    description: 'Dive into the world of DC Comics with Batman, Superman, Joker & the Justice League.',
    bannerImage: '/images/archer.jpg',
    color: 'from-blue-600/30 to-indigo-600/30',
  },
  {
    name: 'Anime Superheroes',
    slug: 'anime',
    description: 'Discover merch inspired by Naruto, Dragon Ball Z, One Punch Man, My Hero Academia & more.',
    bannerImage: '/images/foxgirl.jpg',
    color: 'from-orange-600/30 to-pink-600/30',
  },
  {
    name: 'Video Game Characters',
    slug: 'video-games',
    description: 'Wear your favorite video game heroes - Zelda, Cyberpunk, God of War & more.',
    bannerImage: '/images/magicgirl.jpg',
    color: 'from-green-600/30 to-cyan-600/30',
  },
];

export default function ThemesPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-3">
            Explore Our Themes
          </h1>
          <p className="text-gray-400">Choose your universe and find your hero</p>
        </motion.div>

        <div className="space-y-6">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.slug}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <Link
                href={`/themes/${theme.slug}`}
                className={`group relative block overflow-hidden rounded-2xl bg-gradient-to-r ${theme.color} border border-purple-500/20 hover:border-purple-500/40 transition-all`}
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/3 aspect-[4/3] overflow-hidden">
                    <img
                      src={theme.bannerImage}
                      alt={theme.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="md:w-2/3 p-6 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{theme.name}</h2>
                    <p className="text-gray-300 mb-4 max-w-lg">{theme.description}</p>
                    <span className="inline-flex items-center gap-2 text-purple-400 font-semibold group-hover:gap-4 transition-all">
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