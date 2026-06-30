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
            productId: item.id ? String(item.id) : 'mock-id',
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

    // Email Automation with Nodemailer + Ethereal
    let emailPreviewUrl = null;
    try {
      const nodemailer = (await import('nodemailer')).default;
      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      const info = await transporter.sendMail({
        from: '"HeroCosmos" <orders@herocosmos.in>',
        to: user.email,
        subject: `Order Confirmation - ${order.id}`,
        text: `Thank you for your heroic order! Your total is ₹${totalAmount}. Your gear is being prepared.`,
        html: `<h2>Thank you for your heroic order!</h2><p>Your total is <b>₹${totalAmount}</b>.</p><p>Your gear is being prepared in our super-secret lab.</p>`,
      });

      emailPreviewUrl = nodemailer.getTestMessageUrl(info);
      console.log("Email Preview URL:", emailPreviewUrl);
    } catch (emailErr) {
      console.error("Failed to send confirmation email:", emailErr);
    }

    return NextResponse.json({
      ...order,
      razorpayOrderId: razorpayOrder?.id || `mock_rzp_order_${Date.now()}`,
      emailPreviewUrl
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
