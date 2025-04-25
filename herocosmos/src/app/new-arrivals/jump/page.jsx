import React from 'react';
import Layout from '../../../components/Layout';
import JumpingPage from '../../../components/JumpingPage';

export default function NewArrivalsJumpPage() {
  return (
    <Layout>
      <JumpingPage
        title="New Arrivals"
        description="Be the first to explore our latest superhero merchandise. Fresh designs and new collections added regularly."
        image="/assets/new-arrivals/new-arrivals-banner.jpg"
        link="/new-arrivals"
        buttonText="View New Arrivals"
      />
    </Layout>
  );
} 