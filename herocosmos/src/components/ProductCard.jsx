import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-black/30 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <p className="text-purple-400 font-bold">${product.price}</p>
            <div className="flex space-x-2">
              {product.themes.map((theme) => (
                <span
                  key={theme}
                  className="px-2 py-1 text-xs rounded-full bg-purple-900/50 text-purple-300"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 