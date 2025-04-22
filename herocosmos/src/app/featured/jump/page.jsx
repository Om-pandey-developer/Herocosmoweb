import React from 'react';
import Layout from '../../../components/Layout';
import JumpingPage from '../../../components/JumpingPage';

export default function FeaturedJumpPage() {
  return (
    <Layout>
      <JumpingPage
        title="Featured Collection"
        description="Discover our most popular and trending superhero designs. Limited edition and exclusive prints available."
        image="/assets/featured/banner.jpg"
        link="/featured"
        buttonText="View Featured"
      />
    </Layout>
  );
} 