'use client';

import React, { useState, useMemo } from 'react';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import QuickViewModal from '../../components/QuickViewModal';
import { getAllProducts, allCategories, allThemes, allSizes } from '../../data/products';
import { motion } from 'framer-motion';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';

export default function Shop() {
  const allProducts = getAllProducts();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (array, setArray, value) => {
    if (array.includes(value)) {
      setArray(array.filter(v => v !== value));
    } else {
      setArray([...array, value]);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedThemes.length > 0) {
      result = result.filter(p => selectedThemes.includes(p.theme));
    }
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => b.discount - a.discount);
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [allProducts, selectedCategories, selectedThemes, selectedSizes, priceRange, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedThemes([]);
    setSelectedSizes([]);
    setPriceRange([0, 5000]);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedThemes.length > 0 || selectedSizes.length > 0;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">All Products</h1>
            <p className="text-gray-400 text-sm mt-1">{filteredProducts.length} products found</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-lg text-sm"
            >
              <FiFilter className="w-4 h-4" />
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/10 border border-purple-500/30 text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-purple-400 appearance-none cursor-pointer"
            >
              <option value="popular" className="bg-gray-900">Most Popular</option>
              <option value="newest" className="bg-gray-900">Newest First</option>
              <option value="price-low" className="bg-gray-900">Price: Low to High</option>
              <option value="price-high" className="bg-gray-900">Price: High to Low</option>
              <option value="rating" className="bg-gray-900">Highest Rated</option>
              <option value="discount" className="bg-gray-900">Biggest Discount</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`w-full md:w-64 shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-5 border border-purple-500/20 sticky top-32 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Filters</h2>
                {hasActiveFilters && (
                  <button onClick={clearAllFilters} className="text-purple-400 text-xs hover:underline">
                    Clear All
                  </button>
                )}
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-purple-400 mb-3 uppercase tracking-wider">Categories</h3>
                <div className="space-y-2">
                  {allCategories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                        className="rounded bg-white/10 border-gray-600 text-purple-600 focus:ring-purple-500"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* Themes */}
              <div>
                <h3 className="text-sm font-semibold text-purple-400 mb-3 uppercase tracking-wider">Themes</h3>
                <div className="space-y-2">
                  {allThemes.map((theme) => (
                    <label key={theme} className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedThemes.includes(theme)}
                        onChange={() => toggleFilter(selectedThemes, setSelectedThemes, theme)}
                        className="rounded bg-white/10 border-gray-600 text-purple-600 focus:ring-purple-500"
                      />
                      {theme}
                    </label>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-sm font-semibold text-purple-400 mb-3 uppercase tracking-wider">Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleFilter(selectedSizes, setSelectedSizes, size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedSizes.includes(size)
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/5 text-gray-400 border border-gray-700 hover:border-purple-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-semibold text-purple-400 mb-3 uppercase tracking-wider">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-purple-600"
                />
                <div className="flex justify-between text-gray-400 text-xs mt-1">
                  <span>₹0</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Active Filters Tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map((cat) => (
                  <span key={cat} className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    {cat}
                    <button onClick={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}>
                      <FiX className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedThemes.map((theme) => (
                  <span key={theme} className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    {theme}
                    <button onClick={() => toggleFilter(selectedThemes, setSelectedThemes, theme)}>
                      <FiX className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg mb-4">No products match your filters.</p>
                <button onClick={clearAllFilters} className="text-purple-400 hover:underline">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </Layout>
  );
}