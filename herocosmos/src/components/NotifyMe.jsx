'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell } from 'react-icons/fi';
import toast from 'react-hot-toast';

const NotifyMe = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    toast.success('We\'ll notify you when it\'s back!', {
      icon: '🔔',
      style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(168,85,247,0.3)' },
    });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center"
      >
        <FiBell className="w-6 h-6 text-green-400 mx-auto mb-2" />
        <p className="text-green-400 text-sm font-medium">You&apos;re on the list!</p>
        <p className="text-gray-400 text-xs mt-1">We&apos;ll email you at {email} when this is back in stock.</p>
      </motion.div>
    );
  }

  return (
    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <FiBell className="w-5 h-5 text-orange-400" />
        <p className="text-orange-400 font-medium text-sm">Out of Stock</p>
      </div>
      <p className="text-gray-400 text-sm mb-3">Enter your email and we&apos;ll notify you when this product is available again.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 bg-white/5 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500"
          required
        />
        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0">
          Notify Me
        </button>
      </form>
    </div>
  );
};

export default NotifyMe;
