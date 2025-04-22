import React from 'react';
import Layout from '../../../components/Layout';
import JumpingPage from '../../../components/JumpingPage';

export default function ShopJumpPage() {
  return (
    <Layout>
      <JumpingPage
        title="Shop Collection"
        description="Browse our entire collection of superhero-themed apparel. Find your perfect style and express your fandom."
        image="/assets/shop/banner.jpg"
        link="/shop"
        buttonText="Start Shopping"
      />
    </Layout>
  );
} 