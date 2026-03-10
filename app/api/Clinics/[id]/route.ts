
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;  
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Clinics/${id}`,
      {
        headers: { "ngrok-skip-browser-warning": "true" },
        cache: "no-store",
      }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}