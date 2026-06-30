import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : 10;
    
    // Fetch recent reviews with images for the Hero Wall
    const reviews = await prisma.review.findMany({
      where: {
        imageUrl: { not: null }
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        user: {
          select: { name: true, image: true }
        }
      }
    });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Reviews GET Error:", error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { productId, rating, comment, imageUrl } = body;

    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        productId,
        rating: rating || 5,
        comment,
        imageUrl
      }
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    console.error("Reviews POST Error:", error);
    return NextResponse.json({ error: 'Failed to post review' }, { status: 500 });
  }
}
