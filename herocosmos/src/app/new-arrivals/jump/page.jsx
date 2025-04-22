import React from 'react';
import Layout from '../../../components/Layout';
import JumpingPage from '../../../components/JumpingPage';

export default function NewArrivalsJumpPage() {
  return (
    <Layout>
      <JumpingPage
        title="New Arrivals"
        description="Be the first to explore our latest superhero designs. Fresh styles and new characters added regularly."
        image="/assets/new-arrivals/banner.jpg"
        link="/new-arrivals"
        buttonText="View New Arrivals"
      />
    </Layout>
  );
} 