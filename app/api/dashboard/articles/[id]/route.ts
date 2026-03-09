import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles/${params.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(body),
    }
  );
  const data = await response.json();
  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles/${params.id}`,
    {
      method: "DELETE",
      headers: { "ngrok-skip-browser-warning": "true" },
    }
  );
  return NextResponse.json({ success: true });
}