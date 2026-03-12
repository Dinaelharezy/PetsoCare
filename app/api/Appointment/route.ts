import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Appointments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json({ error: text }, { status: response.status });
  }

  const text = await response.text();
  if (!text || text.trim() === '') return NextResponse.json({ success: true });

  try {
    return NextResponse.json(JSON.parse(text));
  } catch {
    return NextResponse.json({ success: true });
  }
}