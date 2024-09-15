import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../server/db"; // Adjust the import based on your directory structure
import { UserRole } from "@prisma/client"; // Import enum from Prisma client

// Handle PATCH request to update user role
export async function PATCH(request: NextRequest) {
  const id = Number(request.nextUrl.pathname.split("/").pop() ?? ""); // Extract ID from the URL and convert it to a number
  const { role } = await request.json();

  try {
    const updatedUser = await db.user.update({
      where: { id: Number(id) },
      data: { role },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Handle POST request to send a message
export async function POST(request: NextRequest) {
  const id = Number(request.nextUrl.pathname.split("/").pop() ?? "");
  const { content } = await request.json();

  try {
    await db.message.create({
      data: {
        userId: id,
        content,
      },
    });
    return NextResponse.json({ message: "Message sent" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
