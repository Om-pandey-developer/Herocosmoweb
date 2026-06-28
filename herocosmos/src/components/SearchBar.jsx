'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import { searchProducts } from '../data/products';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (query.length >= 2) {
      const found = searchProducts(query);
      setResults(found.slice(0, 6));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search heroes, themes, products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 bg-white/10 backdrop-blur-sm border border-purple-500/30 rounded-full text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
        />
        {query && (
          <button onClick={() => { setQuery(''); setIsOpen(false); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-gray-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-2xl z-50 overflow-hidden"
          >
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                onClick={() => { setQuery(''); setIsOpen(false); }}
                className="flex items-center gap-3 p-3 hover:bg-purple-600/20 transition-colors"
              >
                <img src={product.image} alt={product.name} className="w-10 h-10 rounded-md object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{product.name}</p>
                  <p className="text-purple-400 text-xs">₹{product.price}</p>
                </div>
              </Link>
            ))}
            <Link
              href={`/shop?q=${encodeURIComponent(query)}`}
              onClick={() => { setQuery(''); setIsOpen(false); }}
              className="block p-3 text-center text-purple-400 text-sm hover:bg-purple-600/20 border-t border-purple-500/20"
            >
              View all results for &quot;{query}&quot;
            </Link>
          </motion.div>
        )}
        {isOpen && query.length >= 2 && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-gray-900/95 backdrop-blur-md border border-purple-500/30 rounded-lg shadow-2xl z-50 p-4 text-center text-gray-400 text-sm"
          >
            No results found for &quot;{query}&quot;
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
