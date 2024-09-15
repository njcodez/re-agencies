// src/app/api/orders/route.ts

import { NextResponse } from 'next/server';
import { db } from '../../../server/db'; // Adjust the import based on your directory structure

export async function GET() {
  try {
    const orders = await db.order.findMany({
      include: {
        user: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
