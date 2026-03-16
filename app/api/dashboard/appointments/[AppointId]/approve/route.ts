

import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ AppointId: string }> }
) {
  const { AppointId } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/appointments/${AppointId}/approve`,
    {
      method: "PUT",
      headers: { 
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: "Approved" }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json({ error: text }, { status: response.status });
  }

  return NextResponse.json({ success: true });
}