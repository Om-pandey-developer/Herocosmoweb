import React from 'react';
import Layout from '../../../components/Layout';
import JumpingPage from '../../../components/JumpingPage';

export default function CartJumpPage() {
  return (
    <Layout>
      <JumpingPage
        title="Your Cart"
        description="Review your selected items and proceed to checkout. Your superhero collection awaits!"
        image="/assets/cart/cart-banner.jpg"
        link="/cart"
        buttonText="View Cart"
      />
    </Layout>
  );
} 