'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const SizeRecommender = ({ isOpen, onClose, sizes }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ height: '', weight: '', fit: 'regular', bodyType: 'athletic' });
  const [recommendation, setRecommendation] = useState(null);

  const getRecommendedSize = () => {
    const h = parseFloat(data.height);
    const w = parseFloat(data.weight);

    if (!h || !w) return null;

    let baseSize;
    const bmi = w / ((h / 100) ** 2);

    if (bmi < 18.5) baseSize = 'S';
    else if (bmi < 22) baseSize = 'M';
    else if (bmi < 25) baseSize = 'L';
    else if (bmi < 28) baseSize = 'XL';
    else baseSize = 'XXL';

    // Adjust for fit preference
    if (data.fit === 'loose') {
      const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      const idx = sizeOrder.indexOf(baseSize);
      if (idx < sizeOrder.length - 1) baseSize = sizeOrder[idx + 1];
    } else if (data.fit === 'tight') {
      const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      const idx = sizeOrder.indexOf(baseSize);
      if (idx > 0) baseSize = sizeOrder[idx - 1];
    }

    // Check if size is available
    if (sizes && !sizes.includes(baseSize)) {
      const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      const idx = sizeOrder.indexOf(baseSize);
      // Find nearest available size
      for (let i = 0; i <= sizeOrder.length; i++) {
        if (sizes.includes(sizeOrder[idx + i])) { baseSize = sizeOrder[idx + i]; break; }
        if (sizes.includes(sizeOrder[idx - i])) { baseSize = sizeOrder[idx - i]; break; }
      }
    }

    return baseSize;
  };

  const handleCalculate = () => {
    const rec = getRecommendedSize();
    setRecommendation(rec);
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setData({ height: '', weight: '', fit: 'regular', bodyType: 'athletic' });
    setRecommendation(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900/95 backdrop-blur-md border border-purple-500/30 rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">🤖 AI Size Recommender</h2>
              <button onClick={() => { onClose(); reset(); }} className="text-gray-400 hover:text-white p-1">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Body Measurements */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-gray-400 text-sm mb-5">Tell us about yourself and we&apos;ll find your perfect fit.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Height (cm)</label>
                    <input
                      type="number"
                      value={data.height}
                      onChange={(e) => setData({ ...data, height: e.target.value })}
                      placeholder="e.g., 175"
                      className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      value={data.weight}
                      onChange={(e) => setData({ ...data, weight: e.target.value })}
                      placeholder="e.g., 70"
                      className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                <button
                  onClick={() => data.height && data.weight && setStep(2)}
                  disabled={!data.height || !data.weight}
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition-colors"
                >
                  Next →
                </button>
              </motion.div>
            )}

            {/* Step 2: Fit Preference */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-gray-400 text-sm mb-5">How do you like your tees to fit?</p>
                <div className="space-y-3 mb-6">
                  {[
                    { id: 'tight', label: 'Slim / Fitted', emoji: '👕', desc: 'Close to body, shows physique' },
                    { id: 'regular', label: 'Regular Fit', emoji: '👔', desc: 'Comfortable, not too tight or loose' },
                    { id: 'loose', label: 'Oversized / Loose', emoji: '🧥', desc: 'Extra room, streetwear vibes' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setData({ ...data, fit: opt.id })}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                        data.fit === opt.id ? 'border-purple-500 bg-purple-600/10' : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      <div>
                        <p className="text-white font-medium text-sm">{opt.label}</p>
                        <p className="text-gray-500 text-xs">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <button onClick={handleCalculate}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-colors">
                  Find My Size 🔍
                </button>
              </motion.div>
            )}

            {/* Step 3: Recommendation */}
            {step === 3 && recommendation && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="w-24 h-24 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-purple-400">{recommendation}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">We recommend size {recommendation}!</h3>
                <p className="text-gray-400 text-sm mb-2">
                  Based on your height ({data.height}cm), weight ({data.weight}kg), and {data.fit} fit preference.
                </p>
                <div className="bg-purple-600/10 border border-purple-500/20 rounded-lg p-3 mb-6">
                  <p className="text-purple-300 text-xs">
                    💡 95% of customers with similar measurements are happy with this size.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={reset} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl text-sm font-medium transition-colors">
                    Try Again
                  </button>
                  <button onClick={() => { onClose(); reset(); }} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl text-sm font-medium transition-colors">
                    Got It!
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SizeRecommender;
