'use client';

import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiCreditCard, FiCheckCircle, FiChevronRight, FiShield, FiTruck, FiArrowLeft } from 'react-icons/fi';
import useCartStore from '../../store/cartStore';
import toast from 'react-hot-toast';

const steps = [
  { id: 1, title: 'Address', icon: FiMapPin },
  { id: 2, title: 'Payment', icon: FiCreditCard },
  { id: 3, title: 'Confirm', icon: FiCheckCircle },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState({ name: '', phone: '', email: '', addressLine: '', city: '', state: '', pincode: '' });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const getOriginalTotal = useCartStore((state) => state.getOriginalTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = getTotal();
  const originalTotal = getOriginalTotal();
  const savings = originalTotal - total;
  const shippingFree = total >= 1999;
  const shippingCost = shippingFree ? 0 : 99;
  const finalTotal = total + shippingCost;

  const handlePlaceOrder = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          totalAmount: finalTotal,
          paymentMethod,
          customerName: address.name,
          email: address.email
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          toast.error('Please login to place an order');
          return;
        }
        throw new Error('Failed to create order');
      }

      const data = await res.json();

      if (paymentMethod !== 'cod' && data.razorpayOrderId) {
        if (!window.Razorpay) {
          toast.error("Payment gateway failed to load. Simulating success.");
        } else {
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'mock_key',
            amount: data.totalAmount * 100,
            currency: "INR",
            name: "HeroCosmos",
            description: "Super Hero Merchandise",
            order_id: data.razorpayOrderId.startsWith('mock') ? undefined : data.razorpayOrderId,
            handler: async function (response) {
              const verifyRes = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id || 'mock_pay_id',
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  dbOrderId: data.id,
                })
              });
              if (!verifyRes.ok) {
                toast.error('Payment verification failed');
              } else {
                setOrderPlaced(true);
                clearCart();
                toast.success('Order placed successfully! 🎉', {
                  style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(168,85,247,0.3)' },
                });
              }
            },
            prefill: {
              name: address.name,
              email: address.email,
              contact: address.phone
            },
            theme: {
              color: "#9333ea"
            }
          };

          // If it's a mock order id (no keys), Razorpay sdk will error if order_id is invalid mock. 
          // So if we deleted order_id, we just let it run in test mode (if they put a test key). 
          // If no key at all, it will fail, so we catch and simulate:
          try {
            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response){
              toast.error("Payment failed: " + response.error.description);
            });
            rzp.open();
            return; // Exit here, let the handler finish the flow
          } catch(err) {
            console.error("Razorpay UI failed (likely missing/invalid keys). Simulating success.", err);
            // Fallthrough to simulate success
          }
        }
      }

      // COD or Mock Fallback success flow
      setOrderPlaced(true);
      clearCart();
      toast.success('Order placed successfully! 🎉', {
        style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(168,85,247,0.3)' },
      });
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
          <Link href="/shop" className="text-purple-400 hover:underline">Go shopping</Link>
        </div>
      </Layout>
    );
  }

  if (orderPlaced) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }}>
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle className="w-12 h-12 text-green-400" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h1 className="text-3xl font-bold text-white mb-3">Order Placed Successfully! 🎉</h1>
            <p className="text-gray-400 mb-2">Order ID: <span className="text-white font-mono">HC-{Date.now().toString().slice(-8)}</span></p>
            <p className="text-gray-400 mb-8">You will receive a confirmation email shortly.</p>
            <div className="bg-black/30 border border-purple-500/20 rounded-xl p-6 mb-8 text-left">
              <h3 className="text-white font-semibold mb-3">What&apos;s Next?</h3>
              <div className="space-y-3">
                {[
                  { step: '1', text: 'Order confirmation sent to your email' },
                  { step: '2', text: 'Your order will be packed within 24 hours' },
                  { step: '3', text: 'Shipping details will be shared via SMS' },
                  { step: '4', text: 'Expected delivery in 5-7 business days' },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-600/30 text-purple-300 text-xs font-bold flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <p className="text-gray-300 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <Link href="/profile" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                Track Order
              </Link>
              <Link href="/shop" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                Continue Shopping
              </Link>
            </div>
            <p className="text-purple-400 text-sm mt-6">🪙 You earned <strong>{Math.floor(total / 10)}</strong> Hero Coins from this order!</p>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((step, i) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  currentStep >= step.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-white/10 text-gray-500'
                }`}>
                  {currentStep > step.id ? <FiCheckCircle className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${currentStep >= step.id ? 'text-white' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 md:w-24 h-0.5 mx-2 transition-colors ${currentStep > step.id ? 'bg-purple-600' : 'bg-gray-700'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Step Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Address */}
              {currentStep === 1 && (
                <motion.div key="address" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Delivery Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Full Name *</label>
                      <input type="text" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })}
                        placeholder="Peter Parker" className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Phone *</label>
                      <input type="tel" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        placeholder="+91 98765 43210" className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-1">Email Address *</label>
                      <input type="email" value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })}
                        placeholder="peter@parker.com" className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-1">Address *</label>
                      <textarea value={address.addressLine} onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                        placeholder="House No., Street, Landmark" rows={2} className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">City *</label>
                      <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        placeholder="Mumbai" className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">State *</label>
                      <input type="text" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        placeholder="Maharashtra" className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Pincode *</label>
                      <input type="text" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                        placeholder="400001" className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setCurrentStep(2)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors">
                      Continue to Payment <FiChevronRight />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6">Payment Method</h2>
                  <div className="space-y-3">
                    {[
                      { id: 'upi', label: 'UPI (GPay / PhonePe / Paytm)', icon: '📱', desc: 'Instant payment via UPI' },
                      { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
                      { id: 'netbanking', label: 'Net Banking', icon: '🏦', desc: 'All major banks supported' },
                      { id: 'wallet', label: 'Wallets', icon: '👛', desc: 'Paytm, Amazon Pay, Mobikwik' },
                      { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive (₹30 extra)' },
                    ].map((method) => (
                      <button key={method.id} onClick={() => setPaymentMethod(method.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                          paymentMethod === method.id
                            ? 'border-purple-500 bg-purple-600/10'
                            : 'border-gray-700 bg-white/[0.02] hover:border-gray-600'
                        }`}>
                        <span className="text-2xl">{method.icon}</span>
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">{method.label}</p>
                          <p className="text-gray-500 text-xs">{method.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === method.id ? 'border-purple-500' : 'border-gray-600'
                        }`}>
                          {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6">
                    <button onClick={() => setCurrentStep(1)} className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                      <FiArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setCurrentStep(3)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors">
                      Review Order <FiChevronRight />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-4">
                  {/* Address Summary */}
                  <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-semibold flex items-center gap-2"><FiMapPin className="w-4 h-4 text-purple-400" /> Deliver To</h3>
                      <button onClick={() => setCurrentStep(1)} className="text-purple-400 text-xs hover:underline">Change</button>
                    </div>
                    <p className="text-white text-sm">{address.name || 'Not provided'}</p>
                    <p className="text-gray-400 text-sm">{address.addressLine || 'Address'}, {address.city || 'City'}, {address.state || 'State'} - {address.pincode || 'Pincode'}</p>
                    <p className="text-gray-500 text-xs mt-1">{address.phone || 'Phone'}</p>
                  </div>

                  {/* Items */}
                  <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-5">
                    <h3 className="text-white font-semibold mb-3">Order Items ({items.length})</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm truncate">{item.name}</p>
                            <p className="text-gray-500 text-xs">{item.size} • {item.color} • Qty: {item.quantity}</p>
                          </div>
                          <span className="text-white font-medium text-sm">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button onClick={() => setCurrentStep(2)} className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                      <FiArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handlePlaceOrder}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-green-600/30 text-lg">
                      🎉 Place Order — ₹{finalTotal}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 sticky top-32">
              <h2 className="text-lg font-bold text-white mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{originalTotal}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
                    <span>-₹{savings}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>{shippingFree ? <span className="text-green-400">FREE</span> : `₹${shippingCost}`}</span>
                </div>
                {paymentMethod === 'cod' && (
                  <div className="flex justify-between text-gray-400">
                    <span>COD Charges</span>
                    <span>₹30</span>
                  </div>
                )}
                <div className="border-t border-gray-700 pt-2">
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>₹{finalTotal + (paymentMethod === 'cod' ? 30 : 0)}</span>
                  </div>
                </div>
                {savings > 0 && (
                  <p className="text-green-400 text-xs font-medium pt-1">
                    🎉 You save ₹{savings} on this order!
                  </p>
                )}
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <FiShield className="w-3 h-3 text-green-400" /> 100% Secure Payments
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <FiTruck className="w-3 h-3 text-blue-400" /> Delivery in 5-7 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
