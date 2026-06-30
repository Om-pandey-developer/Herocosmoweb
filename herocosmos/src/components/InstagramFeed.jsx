'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiHeart, FiMessageCircle } from 'react-icons/fi';

const mockPosts = [
  { id: 1, image: '/images/ironman.jpg', likes: 1240, comments: 45, handle: '@geeky_hero' },
  { id: 2, image: '/images/archer.jpg', likes: 856, comments: 23, handle: '@comicfan99' },
  { id: 3, image: '/images/foxgirl.jpg', likes: 2100, comments: 128, handle: '@anime_style' },
  { id: 4, image: '/images/knight.jpg', likes: 934, comments: 12, handle: '@dark_knight_rises' },
];

export default function InstagramFeed() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <FiInstagram className="text-purple-400" />
            Join the <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">#HeroCosmos</span> Squad
          </h2>
          <p className="text-gray-400">Tag us on Instagram to get featured and win 500 Hero Coins!</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group aspect-square rounded-2xl overflow-hidden cursor-pointer bg-gray-900"
            >
              <img 
                src={post.image} 
                alt="Instagram post" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white">
                <div className="flex gap-6 mb-2">
                  <div className="flex items-center gap-2 font-bold">
                    <FiHeart className="fill-white" /> {post.likes}
                  </div>
                  <div className="flex items-center gap-2 font-bold">
                    <FiMessageCircle className="fill-white" /> {post.comments}
                  </div>
                </div>
                <p className="text-sm text-purple-300 font-medium">{post.handle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-full border border-white/20 transition-colors"
          >
            Follow @herocosmos.in
          </a>
        </div>
      </div>
    </section>
  );
}
