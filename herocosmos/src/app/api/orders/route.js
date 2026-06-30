import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import Razorpay from 'razorpay';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const orders = await prisma.order.findMany({
      where: userId ? { userId } : undefined,
      include: {
        user: true,
        items: true,
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { items, totalAmount, paymentMethod, customerName, email } = data;

    // Check if user exists by email, or create a guest user
    let user = await prisma.user.findUnique({
      where: { email: email || 'guest@herocosmos.com' }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: customerName || 'Guest User',
          email: email || `guest-${Date.now()}@herocosmos.com`,
        }
      });
    }

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount,
        paymentMethod,
        items: {
          create: items.map(item => ({
            productId: item.id || 'mock-id',
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.selectedSize,
            color: item.selectedColor,
            image: item.image
          }))
        }
      },
      include: {
        items: true
      }
    });

    let razorpayOrder = null;
    if (paymentMethod !== 'cod') {
      try {
        if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
          const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
          });
          razorpayOrder = await razorpay.orders.create({
            amount: totalAmount * 100, // in paise
            currency: 'INR',
            receipt: order.id,
          });
        }
      } catch (err) {
        console.warn("Razorpay order creation failed (maybe invalid keys). Falling back to mock order.");
      }
    }

    return NextResponse.json({
      ...order,
      razorpayOrderId: razorpayOrder?.id || `mock_rzp_order_${Date.now()}`
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
