import React from 'react';
import Layout from '../../../components/Layout';
import JumpingPage from '../../../components/JumpingPage';

export default function SaleJumpPage() {
  return (
    <Layout>
      <JumpingPage
        title="Superhero Sale"
        description="Unlock amazing deals on your favorite superhero designs. Limited time offers on selected items."
        image="/assets/sale/banner.jpg"
        link="/sale"
        buttonText="View Sale Items"
      />
    </Layout>
  );
} 