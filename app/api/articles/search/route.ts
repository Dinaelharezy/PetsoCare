import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Articles/search?query=${query}`,
    {
      headers: { "ngrok-skip-browser-warning": "true" },
      cache: "no-store",
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}