import React from 'react';
import Layout from '../../../components/Layout';
import JumpingPage from '../../../components/JumpingPage';

export default function CategoriesJumpPage() {
  return (
    <Layout>
      <JumpingPage
        title="Explore Categories"
        description="Discover our wide range of T-shirt styles and designs. From oversized to hooded, find your perfect fit."
        image="/assets/themes/explore categories/explorecategories.jpg"
        link="/categories"
        buttonText="View All Categories"
      />
    </Layout>
  );
} 