import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Assumes lib/prisma.js exists

export async function GET(request) {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    // Parse JSON strings back to arrays for frontend
    const formattedProducts = products.map(product => ({
      ...product,
      sizes: JSON.parse(product.sizes),
      colors: JSON.parse(product.colors),
      tags: product.tags ? JSON.parse(product.tags) : []
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Convert arrays to JSON strings for SQLite schema
    const product = await prisma.product.create({
      data: {
        ...data,
        sizes: JSON.stringify(data.sizes || []),
        colors: JSON.stringify(data.colors || []),
        tags: JSON.stringify(data.tags || [])
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
