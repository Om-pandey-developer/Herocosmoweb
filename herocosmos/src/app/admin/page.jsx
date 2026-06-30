'use client';

import React from 'react';
import { FiTrendingUp, FiDollarSign, FiShoppingBag, FiUsers, FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Revenue', value: '₹1,24,500', change: '+12.5%', isUp: true, icon: FiDollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
    { title: 'Total Orders', value: '342', change: '+8.2%', isUp: true, icon: FiShoppingBag, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Active Users', value: '1,420', change: '+24.1%', isUp: true, icon: FiUsers, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { title: 'Conversion Rate', value: '3.2%', change: '-1.4%', isUp: false, icon: FiTrendingUp, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  ];

  const recentOrders = [
    { id: '#HC-2024-89', customer: 'Rahul Sharma', product: 'Iron Man Arc Reactor Tee', total: '₹1,499', status: 'Processing' },
    { id: '#HC-2024-88', customer: 'Priya Patel', product: 'Batman Dark Knight Hoodie', total: '₹2,999', status: 'Shipped' },
    { id: '#HC-2024-87', customer: 'Amit Kumar', product: 'Naruto Sage Mode Tee', total: '₹1,299', status: 'Delivered' },
    { id: '#HC-2024-86', customer: 'Neha Singh', product: 'Spider-Man Web Slinger', total: '₹1,499', status: 'Delivered' },
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
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
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
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Recent Orders</h3>
            <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-gray-800">
                  <th className="pb-4 font-medium">Order ID</th>
                  <th className="pb-4 font-medium">Customer</th>
                  <th className="pb-4 font-medium">Product</th>
                  <th className="pb-4 font-medium">Total</th>
                  <th className="pb-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="text-sm">
                    <td className="py-4 font-medium text-white">{order.id}</td>
                    <td className="py-4 text-gray-300">{order.customer}</td>
                    <td className="py-4 text-gray-300 truncate max-w-[200px]">{order.product}</td>
                    <td className="py-4 text-gray-300">{order.total}</td>
                    <td className="py-4 text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-400/10 text-green-400' :
                        order.status === 'Shipped' ? 'bg-blue-400/10 text-blue-400' :
                        'bg-yellow-400/10 text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Top Products</h3>
          <div className="space-y-6">
            {[
              { name: 'Iron Man Arc Reactor Tee', sales: '124', rev: '₹1.8L' },
              { name: 'Batman Dark Knight Hoodie', sales: '98', rev: '₹2.9L' },
              { name: 'Naruto Sage Mode', sales: '85', rev: '₹1.1L' },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">{p.name}</h4>
                  <p className="text-xs text-gray-500">{p.sales} sales</p>
                </div>
                <span className="text-purple-400 font-bold text-sm">{p.rev}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
