import React from 'react';
import Layout from '../../../components/Layout';
import JumpingPage from '../../../components/JumpingPage';

export default function ThemesJumpPage() {
  return (
    <Layout>
      <JumpingPage
        title="Discover Themes"
        description="Immerse yourself in the world of superheroes and comics. From Marvel to DC, find your favorite characters."
        image="/assets/themes/banner.jpg"
        link="/themes"
        buttonText="Explore Themes"
      />
    </Layout>
  );
} 