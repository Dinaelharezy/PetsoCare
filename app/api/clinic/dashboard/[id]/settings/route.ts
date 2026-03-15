import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ clinicId: string }> }
) {
  const { clinicId } = await params;
  const formData = await request.formData();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/clinic/dashboard/${clinicId}/settings`,
    {
      method: "PUT",
      headers: { "ngrok-skip-browser-warning": "true" },
      body: formData,
    }
  );

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json({ error: text }, { status: response.status });
  }

  const text = await response.text();
  if (!text || text.trim() === "") return NextResponse.json({ success: true });

  try {
    return NextResponse.json(JSON.parse(text));
  } catch {
    return NextResponse.json({ success: true });
  }
}