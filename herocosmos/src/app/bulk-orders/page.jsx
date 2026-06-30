'use client';

import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import { FiUsers, FiBriefcase, FiCheckCircle } from 'react-icons/fi';

export default function BulkOrdersPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Power Up Your Team with <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                Custom Hero Merch
              </span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Whether it's for college fests, corporate teams, or special events, we provide premium quality custom apparel at supercharged discounts.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-purple-600/20 p-3 rounded-lg text-purple-400 h-fit">
                  <FiUsers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">College Fests & Events</h3>
                  <p className="text-gray-400 text-sm">Special pricing for student organizations and tech fests. Stand out from the crowd.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-600/20 p-3 rounded-lg text-blue-400 h-fit">
                  <FiBriefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Corporate Gifting</h3>
                  <p className="text-gray-400 text-sm">Premium quality hoodies and tees for your startup or enterprise team.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/40 border border-purple-500/20 backdrop-blur-md rounded-2xl p-8"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                <p className="text-gray-400 mb-6">Our B2B hero team will contact you within 24 hours with a custom quote.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-6">Request a Quote</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Name</label>
                    <input required type="text" className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Organization</label>
                    <input required type="text" className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <input required type="email" className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Phone</label>
                  <input required type="tel" className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Estimated Quantity</label>
                    <select required className="w-full bg-gray-900 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 appearance-none">
                      <option value="">Select quantity</option>
                      <option value="50-100">50 - 100</option>
                      <option value="101-500">101 - 500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Product Type</label>
                    <select required className="w-full bg-gray-900 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 appearance-none">
                      <option value="">Select product</option>
                      <option value="tshirts">T-Shirts</option>
                      <option value="hoodies">Hoodies</option>
                      <option value="both">Mix of both</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Any specific requirements?</label>
                  <textarea rows="3" className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 mt-4"
                >
                  {isSubmitting ? 'Sending Request...' : 'Get Custom Quote'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
