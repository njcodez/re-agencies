import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../server/db"; // Adjust the import based on your directory structure

// Handle GET request to fetch users or search users
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("searchTerm") ?? "";

  try {
    const users = await db.user.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { email: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
