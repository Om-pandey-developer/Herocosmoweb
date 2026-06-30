'use client';

import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import { FiPackage, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

export default function ReturnsPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ orderId: '', email: '', reason: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3); // Success step
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
            Returns & Exchanges
          </h1>
          <p className="text-gray-400">
            Hassle-free 7-day returns. Enter your order details below to get started.
          </p>
        </div>

        <div className="bg-black/40 border border-purple-500/20 backdrop-blur-md rounded-2xl p-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>

          {step === 1 && (
            <motion.form 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={(e) => { e.preventDefault(); setStep(2); }} 
              className="space-y-6 relative z-10"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Order ID</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. HC-20240615-001"
                  value={formData.orderId}
                  onChange={(e) => setFormData({...formData, orderId: e.target.value})}
                  className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="Enter the email used for the order"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
              >
                Find Order <FiArrowRight />
              </button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6 relative z-10"
            >
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4 flex items-start gap-4 mb-6">
                <FiPackage className="text-purple-400 w-6 h-6 mt-1 shrink-0" />
                <div>
                  <h3 className="text-white font-medium">Order Found: {formData.orderId}</h3>
                  <p className="text-sm text-gray-400">Delivered on 15 Jun 2024. Eligible for return.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reason for Return</label>
                <select 
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="w-full bg-gray-900/80 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 transition-colors appearance-none"
                >
                  <option value="" disabled>Select a reason</option>
                  <option value="size">Size didn't fit</option>
                  <option value="quality">Quality issue</option>
                  <option value="wrong_item">Received wrong item</option>
                  <option value="changed_mind">Changed my mind</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-4 rounded-xl transition-colors border border-white/10"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
                >
                  {isSubmitting ? 'Processing...' : 'Submit Request'}
                </button>
              </div>
            </motion.form>
          )}

          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 relative z-10"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Return Request Submitted</h2>
              <p className="text-gray-400 mb-6">
                Your return request for {formData.orderId} has been successfully logged. Our delivery partner will pick up the item within 48 hours.
              </p>
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-purple-600 hover:bg-purple-500 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Back to Store
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
