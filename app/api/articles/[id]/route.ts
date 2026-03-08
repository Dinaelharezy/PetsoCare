import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${params.id}`,
    {
      headers: { "ngrok-skip-browser-warning": "true" },
      cache: "no-store",
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}