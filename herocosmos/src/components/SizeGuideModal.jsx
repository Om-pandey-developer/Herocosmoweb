'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const sizeData = {
  S: { chest: '36"', length: '26"', shoulder: '17"', sleeve: '8"' },
  M: { chest: '38"', length: '27"', shoulder: '18"', sleeve: '8.5"' },
  L: { chest: '40"', length: '28"', shoulder: '19"', sleeve: '9"' },
  XL: { chest: '42"', length: '29"', shoulder: '20"', sleeve: '9.5"' },
  XXL: { chest: '44"', length: '30"', shoulder: '21"', sleeve: '10"' },
};

const SizeGuideModal = ({ isOpen, onClose }) => {
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
            className="bg-gray-900/95 backdrop-blur-md border border-purple-500/30 rounded-2xl max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Size Guide</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-4">All measurements are in inches. For the best fit, measure yourself and compare with the chart below.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-purple-500/30">
                    <th className="text-left py-3 px-2 text-purple-400 font-semibold">Size</th>
                    <th className="text-center py-3 px-2 text-purple-400 font-semibold">Chest</th>
                    <th className="text-center py-3 px-2 text-purple-400 font-semibold">Length</th>
                    <th className="text-center py-3 px-2 text-purple-400 font-semibold">Shoulder</th>
                    <th className="text-center py-3 px-2 text-purple-400 font-semibold">Sleeve</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(sizeData).map(([size, measurements]) => (
                    <tr key={size} className="border-b border-gray-800 hover:bg-purple-600/10 transition-colors">
                      <td className="py-3 px-2 text-white font-medium">{size}</td>
                      <td className="py-3 px-2 text-gray-300 text-center">{measurements.chest}</td>
                      <td className="py-3 px-2 text-gray-300 text-center">{measurements.length}</td>
                      <td className="py-3 px-2 text-gray-300 text-center">{measurements.shoulder}</td>
                      <td className="py-3 px-2 text-gray-300 text-center">{measurements.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-3 bg-purple-600/10 rounded-lg border border-purple-500/20">
              <p className="text-purple-300 text-xs">
                💡 <strong>Tip:</strong> For Oversized fit, we recommend ordering your regular size. The drop shoulder and relaxed cut already provides extra room.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SizeGuideModal;
