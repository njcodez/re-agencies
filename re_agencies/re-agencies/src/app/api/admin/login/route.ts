// src/app/api/admin/login/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Retrieve credentials from environment variables
  const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  // Check if credentials match
  if (username === adminUsername && password === adminPassword) {
    return NextResponse.json({ message: 'Success' });
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
