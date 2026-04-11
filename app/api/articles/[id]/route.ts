

// import { NextResponse } from "next/server";

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;  // ✅ await الـ params
  
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/Articles/${id}`,
//       {
//         headers: { "ngrok-skip-browser-warning": "true" },
//         cache: "no-store",
//       }
//     );
//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error: String(error) }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") ?? "en";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Articles/${params.id}?lang=${lang}`,
      {
        headers: { "ngrok-skip-browser-warning": "true" },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}