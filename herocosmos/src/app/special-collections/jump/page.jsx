import React from 'react';
import Layout from '../../../components/Layout';
import JumpingPage from '../../../components/JumpingPage';

export default function SpecialCollectionsJumpPage() {
  return (
    <Layout>
      <JumpingPage
        title="Special Collections"
        description="Explore our exclusive collections and limited edition designs. Unique pieces for true superhero fans."
        image="/assets/special-collections/banner.jpg"
        link="/special-collections"
        buttonText="View Collections"
      />
    </Layout>
  );
} 