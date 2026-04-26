import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

async function getToken() {
  const session = await auth();
  return (session?.user as any)?.accessToken;
}

export async function GET() {
  try {
    const token = await getToken();

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Appointments/my-appointments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: text }, { status: response.status });
    }

    const text = await response.text();
    if (!text || text.trim() === '') return NextResponse.json({ appointments: [] });

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch {
      return NextResponse.json({ appointments: [] });
    }
  } catch (error) {
    console.error("Error in GET /api/Appointments/my-appointments:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}