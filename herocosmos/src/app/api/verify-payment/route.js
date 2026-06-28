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

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, dbOrderId } = await req.json();

    // In a real app, verify razorpay_signature here using crypto & razorpay secret

    // Update order status in DB
    const order = await prisma.order.update({
      where: { id: dbOrderId },
      data: {
        status: "Paid & Processing",
        paymentId: razorpay_payment_id || "mock_payment_id"
      }
    });

    return NextResponse.json({ success: true, order });

  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}
