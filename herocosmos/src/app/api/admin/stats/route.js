import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Revenue per day (last 7 days mock or real data)
    // For simplicity, we'll aggregate orders manually or return mock trends if no orders
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7))
        }
      },
      select: {
        totalAmount: true,
        createdAt: true,
        status: true
      }
    });

    const revenueData = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dateString = d.toISOString().split('T')[0];
      const dailyOrders = orders.filter(o => o.createdAt.toISOString().startsWith(dateString));
      return {
        date: d.toLocaleDateString('en-US', { weekday: 'short' }),
        revenue: dailyOrders.reduce((sum, o) => sum + o.totalAmount, 0)
      };
    });

    const totalOrders = await prisma.order.count();
    const totalUsers = await prisma.user.count();
    const totalRevenue = await prisma.order.aggregate({
      _sum: { totalAmount: true }
    });

    const lowStockItems = await prisma.product.findMany({
      where: { stock: { lt: 10 } },
      select: { id: true, name: true, stock: true },
      take: 5
    });

    return NextResponse.json({
      revenueData,
      stats: {
        totalOrders,
        totalUsers,
        totalRevenue: totalRevenue._sum.totalAmount || 0
      },
      lowStockItems
    });
  } catch (error) {
    console.error("Admin Stats API Error:", error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
