

import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles`,
    {
      headers: { "ngrok-skip-browser-warning": "true" },
      cache: "no-store",
    }
  );
  const data = await response.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  // ✅ استقبل FormData وبعتها للـ .NET زي ما هي
  const formData = await request.formData()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles`,
    {
      method: "POST",
      headers: { "ngrok-skip-browser-warning": "true" },
      body: formData,
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