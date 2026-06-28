'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiThumbsUp, FiImage, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const mockReviews = [
  {
    id: 1,
    name: 'Arjun M.',
    avatar: '🦸',
    rating: 5,
    date: '22 Jun 2024',
    title: 'Absolutely love the quality!',
    text: 'The fabric is super soft and the print quality is amazing. Worn it 3 times already and washed twice — no fading at all. True to size, ordered L and it fits perfectly.',
    helpful: 24,
    verified: true,
    images: ['/images/ironman.jpg'],
  },
  {
    id: 2,
    name: 'Priya S.',
    avatar: '🦹‍♀️',
    rating: 4,
    date: '18 Jun 2024',
    title: 'Great design, slightly long',
    text: 'Love the design and color. The oversized fit is nice but it was a bit longer than expected. Would recommend sizing down if you prefer a shorter length.',
    helpful: 12,
    verified: true,
    images: [],
  },
  {
    id: 3,
    name: 'Rahul K.',
    avatar: '🧑‍💻',
    rating: 5,
    date: '15 Jun 2024',
    title: 'Best superhero merch I\'ve bought',
    text: 'Been looking for good quality superhero merch for ages. HeroCosmos delivers! The packaging was premium too. Will definitely order more.',
    helpful: 31,
    verified: true,
    images: [],
  },
];

const ProductReviews = ({ productRating, reviewCount }) => {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, title: '', text: '' });
  const [hoverRating, setHoverRating] = useState(0);

  const ratingBreakdown = [
    { stars: 5, percent: 72 },
    { stars: 4, percent: 18 },
    { stars: 3, percent: 7 },
    { stars: 2, percent: 2 },
    { stars: 1, percent: 1 },
  ];

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    toast.success('Review submitted! 🪙 +50 Hero Coins earned!', {
      style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(168,85,247,0.3)' },
    });
    setShowWriteReview(false);
    setNewReview({ rating: 0, title: '', text: '' });
  };

  return (
    <div className="mt-16 border-t border-gray-800 pt-12">
      <h2 className="text-2xl font-bold text-white mb-8">Customer Reviews</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Rating Summary */}
        <div className="bg-black/30 border border-purple-500/20 rounded-xl p-6 text-center">
          <p className="text-5xl font-bold text-white">{productRating}</p>
          <div className="flex justify-center my-2">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className={`w-5 h-5 ${i < Math.floor(productRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
            ))}
          </div>
          <p className="text-gray-400 text-sm">{reviewCount} reviews</p>

          <div className="mt-4 space-y-2">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-2 text-sm">
                <span className="text-gray-400 w-3">{item.stars}</span>
                <FiStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${item.percent}%` }} />
                </div>
                <span className="text-gray-500 text-xs w-8">{item.percent}%</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowWriteReview(!showWriteReview)}
            className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl font-medium transition-colors text-sm"
          >
            Write a Review
          </button>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Write Review Form */}
          <AnimatePresence>
            {showWriteReview && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleSubmitReview}
                className="bg-black/30 border border-purple-500/20 rounded-xl p-5 overflow-hidden"
              >
                <h3 className="text-white font-semibold mb-4">Write Your Review</h3>
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Your Rating</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                      >
                        <FiStar className={`w-7 h-7 transition-colors cursor-pointer ${
                          star <= (hoverRating || newReview.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Review title"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 mb-3 text-sm"
                  required
                />
                <textarea
                  placeholder="Share your experience..."
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  rows={3}
                  className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 mb-3 text-sm resize-none"
                  required
                />
                <div className="flex items-center justify-between">
                  <button type="button" className="text-purple-400 text-sm flex items-center gap-1 hover:underline">
                    <FiImage className="w-4 h-4" /> Add Photos
                  </button>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setShowWriteReview(false)} className="text-gray-400 text-sm hover:text-white px-4 py-2">
                      Cancel
                    </button>
                    <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
                      <FiSend className="w-3 h-3" /> Submit
                    </button>
                  </div>
                </div>
                <p className="text-purple-400/60 text-[10px] mt-2">🪙 Earn 50 Hero Coins for your review!</p>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Reviews */}
          {mockReviews.map((review) => (
            <div key={review.id} className="bg-black/20 border border-purple-500/10 rounded-xl p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{review.avatar}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">{review.name}</span>
                      {review.verified && (
                        <span className="bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded text-[10px] font-medium">✓ Verified</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                        ))}
                      </div>
                      <span className="text-gray-500 text-xs">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="text-white font-medium text-sm mb-1">{review.title}</h4>
              <p className="text-gray-400 text-sm">{review.text}</p>
              {review.images.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {review.images.map((img, i) => (
                    <img key={i} src={img} alt="Review" className="w-16 h-16 rounded-lg object-cover" />
                  ))}
                </div>
              )}
              <button className="flex items-center gap-1 text-gray-500 hover:text-purple-400 text-xs mt-3 transition-colors">
                <FiThumbsUp className="w-3 h-3" /> Helpful ({review.helpful})
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
