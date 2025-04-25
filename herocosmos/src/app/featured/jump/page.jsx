import React from 'react';
import Layout from '../../../components/Layout';
import JumpingPage from '../../../components/JumpingPage';

export default function FeaturedJumpPage() {
  return (
    <Layout>
      <JumpingPage
        title="Featured Collection"
        description="Discover our handpicked selection of premium superhero merchandise. Exclusive designs and limited editions."
        image="/assets/featured/featured-banner.jpg"
        link="/featured"
        buttonText="View Featured"
      />
    </Layout>
  );
} 