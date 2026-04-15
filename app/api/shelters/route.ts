// app/api/shelters/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/shelters`,
      {
        cache: "no-store",
      }
    );

    let data = null;
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("[GET /api/shelters]", error);

    return NextResponse.json(
      { error: "Failed to fetch shelters." },
      { status: 500 }
    );
  }
}