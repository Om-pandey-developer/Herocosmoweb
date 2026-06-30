import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, dbOrderId } = await req.json();

    if (!dbOrderId) {
      return NextResponse.json({ error: "Missing database Order ID" }, { status: 400 });
    }

    let isValid = false;

    // If we have real Razorpay keys, verify the signature cryptographically
    if (process.env.RAZORPAY_KEY_SECRET && razorpay_signature) {
      const generated_signature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');

      if (generated_signature === razorpay_signature) {
        isValid = true;
      }
    } else {
      // Mock validation mode (if keys are missing, we assume success for dev purposes)
      isValid = true;
    }

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Update order status in DB
    const order = await prisma.order.update({
      where: { id: dbOrderId },
      data: {
        status: "Processing", // Paid & Processing
        // We could also store razorpay_payment_id if we had a column for it
      }
    });

    return NextResponse.json({ success: true, order });

  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}
