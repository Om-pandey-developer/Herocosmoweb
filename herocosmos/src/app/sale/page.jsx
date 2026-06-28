'use client';

import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import QuickViewModal from '../../components/QuickViewModal';
import { getSaleProducts } from '../../data/products';
import { motion } from 'framer-motion';

export default function SalePage() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const saleProducts = getSaleProducts();
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400 mb-3">
            🔥 Flash Sale
          </h1>
          <p className="text-gray-400 mb-6">Grab these epic deals before they vanish!</p>
          
          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-gray-400 text-sm">Ends in:</span>
            {['hours', 'minutes', 'seconds'].map((unit, i) => (
              <React.Fragment key={unit}>
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-2 min-w-[60px]">
                  <span className="text-2xl font-bold text-white">{pad(timeLeft[unit])}</span>
                  <p className="text-red-400 text-[10px] uppercase">{unit}</p>
                </div>
                {i < 2 && <span className="text-red-400 text-2xl font-bold">:</span>}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      </div>
      <QuickViewModal product={quickViewProduct} isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </Layout>
  );
}
