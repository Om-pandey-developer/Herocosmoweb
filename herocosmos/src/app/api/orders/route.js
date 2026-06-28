import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, total, addressId, paymentMethod } = await req.json();

    // In a real app, calculate total on server based on items to avoid tampering
    const orderTotal = total; 

    // Create Order in Database
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount: orderTotal,
        paymentMethod: paymentMethod,
        status: "Processing", // Default status
        items: {
          create: items.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            image: item.image
          }))
        }
      }
    });

    if (paymentMethod === 'online') {
      // Mock Razorpay Order Creation
      const mockRazorpayOrderId = `order_${Math.random().toString(36).substring(2, 15)}`;
      
      return NextResponse.json({
        id: mockRazorpayOrderId,
        currency: "INR",
        amount: orderTotal * 100, // Razorpay takes amount in paise
        dbOrderId: order.id
      });
    }

    // For COD
    return NextResponse.json({ success: true, dbOrderId: order.id });

  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
