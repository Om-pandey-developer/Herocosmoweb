import React from 'react';
import Layout from '../../components/Layout';
import ThemeCard from '../../components/ThemeCard';

// Mock data - replace with actual theme data
const themes = [
  {
    name: 'Marvel Universe',
    slug: 'marvel',
    description: 'Explore the Marvel Cinematic Universe with our exclusive collection',
    bannerImage: '/assets/themes/marvel/0a1749654c745c6f1deb54780237caaf.jpg',
  },
  {
    name: 'DC Comics',
    slug: 'dc',
    description: 'Dive into the world of DC Comics with our premium collection',
    bannerImage: '/assets/themes/dc/512af595d24fb6b9edd55797bc1a0ba4.jpg',
  },
  {
    name: 'Anime Superheroes',
    slug: 'anime',
    description: 'Discover our collection inspired by popular anime series',
    bannerImage: '/assets/themes/anime/465a60bd329a3fd6d686160e88731c75.jpg',
  },
  {
    name: 'Video Game Characters',
    slug: 'video-games',
    description: 'Wear your favorite video game heroes with pride',
    bannerImage: '/assets/themes/video games character/videogames character.jpg',
  },
  {
    name: 'Classic Comics',
    slug: 'classic-comics',
    description: 'Celebrate the timeless heroes of classic comics',
    bannerImage: '/assets/themes/classic comics/classic comic.jpg',
  },
  {
    name: 'Sci-Fi & Fantasy',
    slug: 'sci-fi-fantasy',
    description: 'Journey through epic sci-fi and fantasy universes',
    bannerImage: '/assets/themes/sci-fi & fantasy/sci-fi fantasy.jpg',
  },
  {
    name: 'Oversized',
    slug: 'oversized',
    description: 'Comfortable and stylish oversized apparel',
    bannerImage: '/assets/themes/oversized/oversized.jpg',
  },
  {
    name: 'Graphic Printed',
    slug: 'graphic-printed',
    description: 'Bold and artistic graphic designs',
    bannerImage: '/assets/themes/graphic printed/graphic printed.jpg',
  },
  {
    name: 'Hooded',
    slug: 'hooded',
    description: 'Cozy and trendy hooded collection',
    bannerImage: '/assets/themes/hooded/hoodies.jpg',
  },
  {
    name: 'Long Sleeve',
    slug: 'long-sleeve',
    description: 'Elegant and versatile long sleeve designs',
    bannerImage: '/assets/themes/Long sleeve/long sleeves.jpg',
  }
];

export default function ThemesPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Explore Our Themes
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme) => (
            <ThemeCard key={theme.slug} theme={theme} />
          ))}
        </div>
      </div>
    </Layout>
  );
} 