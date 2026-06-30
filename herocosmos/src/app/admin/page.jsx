'use client';

import React, { useEffect, useState } from 'react';
import { FiTrendingUp, FiDollarSign, FiShoppingBag, FiUsers, FiArrowUpRight, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-white text-center py-20 animate-pulse">Loading dashboard...</div>;
  }

  if (!data || data.error) {
    return <div className="text-red-400 text-center py-20">Error loading dashboard stats or unauthorized.</div>;
  }

  const stats = [
    { title: 'Total Revenue', value: `₹${data.stats.totalRevenue.toLocaleString()}`, change: '+12.5%', isUp: true, icon: FiDollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
    { title: 'Total Orders', value: data.stats.totalOrders, change: '+8.2%', isUp: true, icon: FiShoppingBag, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Active Users', value: data.stats.totalUsers, change: '+24.1%', isUp: true, icon: FiUsers, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { title: 'Conversion Rate', value: '3.2%', change: '-1.4%', isUp: false, icon: FiTrendingUp, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg shadow-black/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-sm font-medium flex items-center gap-1 ${stat.isUp ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change} <FiArrowUpRight className={stat.isUp ? '' : 'rotate-90'} />
              </span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Revenue (Last 7 Days)</h3>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#888" fontSize={12} tickMargin={10} />
                <YAxis stroke="#888" fontSize={12} tickFormatter={(value) => `₹${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#c084fc' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#c084fc" strokeWidth={3} dot={{ fill: '#c084fc', r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <FiAlertCircle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-bold text-white">Low Stock Alerts</h3>
          </div>
          <div className="space-y-4">
            {data.lowStockItems && data.lowStockItems.length > 0 ? (
              data.lowStockItems.map((item) => (
                <div key={item.id} className="flex flex-col gap-1 p-3 bg-red-900/10 border border-red-500/20 rounded-lg">
                  <h4 className="text-white font-medium text-sm">{item.name}</h4>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">ID: {item.id.slice(0, 8)}...</span>
                    <span className="text-red-400 font-bold bg-red-500/20 px-2 py-0.5 rounded-full">
                      {item.stock} left
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-8">All items are well stocked!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
