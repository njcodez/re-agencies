import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../server/db'; // Adjust the import based on your directory structure

// Handle GET request to fetch notifications
export async function GET() {
  try {
    const notifications = await db.message.findMany({
      include: { user: true }, // Include user data if necessary
    });
    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle POST request to send a new notification
export async function POST(request: NextRequest) {
  const { userId, content } = await request.json();

  try {
    const newNotification = await db.message.create({
      data: {
        userId,
        content,
      },
    });
    return NextResponse.json(newNotification);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
