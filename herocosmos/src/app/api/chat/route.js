import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ reply: "I didn't catch that. Could you repeat?" }, { status: 400 });
    }

    const text = message.toLowerCase();
    let reply = "I'm still learning! Could you try asking one of the quick questions, or contact support@herocosmos.in?";

    // Smart Rule-Based Keyword Matching
    if (text.includes('order') || text.includes('track') || text.includes('where is')) {
      reply = "To track your order, please visit the 'My Orders' section in your profile or check the tracking link sent to your email. If you just placed an order, please allow 24 hours for tracking to update.";
    } else if (text.includes('return') || text.includes('refund') || text.includes('exchange')) {
      reply = "We offer a 7-day hassle-free return and exchange policy. Items must be unworn and in original condition. You can initiate a return from our Returns Portal in your account.";
    } else if (text.includes('shipping') || text.includes('delivery') || text.includes('freight')) {
      reply = "We offer free shipping on all orders above ₹1999! Standard shipping is ₹99. Most orders are delivered within 3-5 business days depending on your location.";
    } else if (text.includes('agent') || text.includes('human') || text.includes('support') || text.includes('help')) {
      reply = "Please email us at support@herocosmos.in and our human heroes will get back to you within 24 hours. We're here to help!";
    } else if (text.includes('iron man') || text.includes('stark')) {
      reply = "Iron Man is one of our most popular collections! Check out our Arc Reactor oversized tees and Stark Industries hoodies in the Marvel section.";
    } else if (text.includes('batman') || text.includes('gotham')) {
      reply = "I am vengeance! 🦇 You can find our premium Batman gear, including the Dark Knight graphic hoodie, in the DC Comics section.";
    } else if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      reply = "Hello there! Welcome to HeroCosmos. How can I assist you with your heroic gear today?";
    } else if (text.includes('sale') || text.includes('discount') || text.includes('offer')) {
      reply = "We currently have a 'Buy 2 Get 1 Free' offer on all graphic tees! Also, don't forget you get free shipping on orders over ₹1999.";
    }

    // Add a slight artificial delay to feel like someone is typing
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ reply: "Oops! My communication link is down. Please try again later." }, { status: 500 });
  }
}
