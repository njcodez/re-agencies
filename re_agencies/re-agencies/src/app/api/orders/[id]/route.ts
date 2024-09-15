// src/app/api/orders/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../server/db'; // Adjust the import based on your directory structure
import { OrderStatus } from '@prisma/client';

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const id = Number(url.pathname.split('/').pop()); // Extract ID from the URL and convert it to a number

  const { status } = await request.json();

  if (!Object.values(OrderStatus).includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    const updatedOrder = await db.order.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
