'use client';

import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiUser, FiPackage, FiHeart, FiMapPin, FiLogOut, FiEdit2, FiChevronRight, FiStar, FiAward } from 'react-icons/fi';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const mockUser = {
  name: 'Guest Hero',
  email: 'guest@herocosmos.in',
  avatar: '/images/spacehero.jpg',
  heroCoins: 0,
  memberSince: 'Today',
  tier: 'New Hero',
};

const mockOrders = [
  {
    id: 'HC-20240615-001',
    date: '15 Jun 2024',
    total: 3798,
    status: 'Delivered',
    items: [
      { name: 'Iron Man Arc Reactor Oversized Tee', size: 'L', color: 'Black', image: '/images/ironman.jpg', qty: 1 },
      { name: 'Batman Dark Knight Graphic Hoodie', size: 'M', color: 'Black', image: '/images/archer.jpg', qty: 1 },
    ],
  },
  {
    id: 'HC-20240628-002',
    date: '28 Jun 2024',
    total: 1499,
    status: 'Shipped',
    items: [
      { name: 'Naruto Sage Mode Acid Wash Tee', size: 'XL', color: 'Orange Wash', image: '/images/foxgirl.jpg', qty: 1 },
    ],
  },
];

const mockAddresses = [
  { id: 1, label: 'Home', name: 'Peter Parker', address: '20 Ingram Street, Queens, New York - 110001', phone: '+91 98765 43210', isDefault: true },
  { id: 2, label: 'Office', name: 'Peter Parker', address: 'Daily Bugle, Manhattan, New York - 110002', phone: '+91 98765 43211', isDefault: false },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('orders');
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetch('/api/orders')
        .then(res => res.json())
        .then(data => {
          if (data.orders) setOrders(data.orders);
          setLoadingOrders(false);
        })
        .catch(err => {
          console.error(err);
          setLoadingOrders(false);
        });
    }
  }, [session]);

  const userToDisplay = session?.user || mockUser;

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: FiPackage },
    { id: 'addresses', label: 'Addresses', icon: FiMapPin },
    { id: 'rewards', label: 'Hero Coins', icon: FiAward },
    { id: 'settings', label: 'Account', icon: FiUser },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-400 bg-green-400/10';
      case 'Shipped': return 'text-blue-400 bg-blue-400/10';
      case 'Processing': return 'text-yellow-400 bg-yellow-400/10';
      case 'Cancelled': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 sticky top-32"
            >
              {/* User Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <img src={userToDisplay.image || mockUser.avatar} alt="Profile" className="w-32 h-32 rounded-full border-4 border-purple-500/30 object-cover" />
                <button className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-500 p-2 rounded-full text-white transition-colors">
                  <FiEdit2 size={16} />
                </button>
              </div>
              <div className="text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-1">{userToDisplay.name}</h1>
                    <p className="text-gray-400">{userToDisplay.email}</p>
                  </div>
                  <button onClick={() => signOut()} className="flex items-center justify-center gap-2 px-6 py-2 bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 rounded-full transition-colors border border-white/10 hover:border-red-500/30">
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>

              {/* Hero Coins Banner */}
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-xl p-3 mb-6 text-center mt-6">
                <p className="text-gray-400 text-xs">Hero Coins Balance</p>
                <p className="text-2xl font-bold text-white">🪙 {mockUser.heroCoins}</p>
                <p className="text-purple-400 text-[10px]">= ₹{mockUser.heroCoins} off next order</p>
              </div>

              {/* Nav Tabs */}
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Orders Tab */}
              {activeTab === 'orders' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Recent Orders</h2>
                {loadingOrders ? (
                  <p className="text-gray-400">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <div className="bg-black/30 border border-purple-500/20 rounded-xl p-8 text-center">
                    <FiPackage className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
                    <p className="text-gray-400 mb-6">Looks like you haven't made your first purchase.</p>
                    <Link href="/shop" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="bg-black/30 border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-800 pb-4">
                        <div>
                          <p className="text-sm text-gray-400">Order <span className="text-white font-mono">{order.id}</span></p>
                          <p className="text-sm text-gray-500 mt-1">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <span className="text-lg font-bold text-white">₹{order.totalAmount}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-4 items-center">
                            <div className="w-16 h-16 bg-white/5 rounded-lg overflow-hidden shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium truncate">{item.name}</h4>
                              <p className="text-sm text-gray-400">Qty: {item.quantity} {item.size && `| Size: ${item.size}`} {item.color && `| Color: ${item.color}`}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-gray-800 flex justify-end">
                        <button className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1">
                          View Details <FiChevronRight />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-white">Saved Addresses</h1>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
                      + Add Address
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockAddresses.map((addr) => (
                      <div key={addr.id} className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-5 relative">
                        {addr.isDefault && (
                          <span className="absolute top-3 right-3 bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full text-[10px] font-medium">
                            Default
                          </span>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                          <FiMapPin className="w-4 h-4 text-purple-400" />
                          <span className="text-white font-semibold text-sm">{addr.label}</span>
                        </div>
                        <p className="text-white text-sm">{addr.name}</p>
                        <p className="text-gray-400 text-sm mt-1">{addr.address}</p>
                        <p className="text-gray-500 text-xs mt-1">{addr.phone}</p>
                        <div className="flex gap-3 mt-4">
                          <button className="text-purple-400 text-xs hover:underline flex items-center gap-1">
                            <FiEdit2 className="w-3 h-3" /> Edit
                          </button>
                          {!addr.isDefault && (
                            <button className="text-gray-400 text-xs hover:text-red-400 transition-colors">
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rewards Tab */}
              {activeTab === 'rewards' && (
                <div>
                  <h1 className="text-2xl font-bold text-white mb-6">Hero Coins</h1>

                  <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-2xl p-8 text-center mb-8">
                    <p className="text-gray-400 text-sm">Your Balance</p>
                    <p className="text-5xl font-bold text-white my-3">🪙 {mockUser.heroCoins}</p>
                    <p className="text-purple-400">Worth ₹{mockUser.heroCoins} off your next order</p>
                  </div>

                  <h2 className="text-lg font-bold text-white mb-4">How to Earn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {[
                      { icon: '🛍️', title: 'Shop & Earn', desc: 'Earn 1 coin per ₹10 spent', coins: '+1/₹10' },
                      { icon: '⭐', title: 'Write Reviews', desc: 'Earn 50 coins per review', coins: '+50' },
                      { icon: '🤝', title: 'Refer Friends', desc: 'Earn 100 coins per referral', coins: '+100' },
                    ].map((item) => (
                      <div key={item.title} className="bg-black/30 border border-purple-500/20 rounded-xl p-5 text-center">
                        <span className="text-3xl">{item.icon}</span>
                        <h3 className="text-white font-semibold mt-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                        <span className="inline-block mt-2 bg-purple-600/20 text-purple-300 px-3 py-0.5 rounded-full text-xs font-bold">
                          {item.coins}
                        </span>
                      </div>
                    ))}
                  </div>

                  <h2 className="text-lg font-bold text-white mb-4">Transaction History</h2>
                  <div className="bg-black/30 border border-purple-500/20 rounded-xl overflow-hidden">
                    {[
                      { type: 'earned', desc: 'Purchase: HC-20240615-001', coins: '+38', date: '15 Jun 2024' },
                      { type: 'earned', desc: 'Review: Iron Man Tee', coins: '+50', date: '18 Jun 2024' },
                      { type: 'earned', desc: 'Purchase: HC-20240628-002', coins: '+15', date: '28 Jun 2024' },
                    ].map((txn, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border-b border-gray-800 last:border-0">
                        <div>
                          <p className="text-white text-sm">{txn.desc}</p>
                          <p className="text-gray-500 text-xs">{txn.date}</p>
                        </div>
                        <span className={`font-bold text-sm ${txn.type === 'earned' ? 'text-green-400' : 'text-red-400'}`}>
                          {txn.coins}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Account Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h1 className="text-2xl font-bold text-white mb-6">Account Settings</h1>
                  <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                        <input type="text" defaultValue={mockUser.name} className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input type="email" defaultValue={mockUser.email} className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Phone</label>
                        <input type="tel" defaultValue="+91 98765 43210" className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Member Since</label>
                        <input type="text" value={mockUser.memberSince} disabled className="w-full bg-white/5 border border-gray-700 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
