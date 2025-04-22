import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white">
      {/* Starry background effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/assets/images/stars.png')] opacity-20"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-black/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/assets/images/logo.png"
                  alt="HeroCosmos Logo"
                  width={150}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/categories/jump" className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
                Categories
              </Link>
              <Link href="/themes/jump" className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
                Themes
              </Link>
              <Link href="/featured/jump" className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
                Featured
              </Link>
              <Link href="/new-arrivals/jump" className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
                New Arrivals
              </Link>
              <Link href="/special-collections/jump" className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
                Collections
              </Link>
              <Link href="/sale/jump" className="text-purple-400 hover:text-purple-300 px-3 py-2 rounded-md transition-colors font-semibold">
                Sale
              </Link>
              <Link href="/shop/jump" className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
                Shop
              </Link>
              <Link href="/cart/jump" className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors">
                Cart
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/50 backdrop-blur-sm border-t border-purple-500/20 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-400">
            © 2024 HeroCosmos - Your Superhero Fashion Destination
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 