import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ThemeCard = ({ theme }) => {
  return (
    <Link 
      href={`/themes/${theme.slug}`}
      className="group relative overflow-hidden rounded-lg bg-black/30 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
    >
      <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
        <Image
          src={theme.bannerImage}
          alt={theme.name}
          width={800}
          height={450}
          className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
        <div className="p-4">
          <h3 className="text-xl font-bold text-white mb-1">{theme.name}</h3>
          <p className="text-gray-300 text-sm">{theme.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ThemeCard; 