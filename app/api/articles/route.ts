
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/Articles?pageSize=100`,
//       {
//         headers: { "ngrok-skip-browser-warning": "true" },
//         cache: "no-store",
//       }
//     );
//     const data = await response.json();
    
//     // ✅ لو array رجعه مباشرة
//     if (Array.isArray(data)) {
//       return NextResponse.json(data);
//     }
    
//     // ✅ لو paginated - جرب كل الاحتمالات
//     const articles = data.items ?? data.data ?? data.articles ?? data.result ?? [];
//     return NextResponse.json(articles);
    
//   } catch (error) {
//     return NextResponse.json({ error: String(error) }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") ?? "en";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Articles?lang=${lang}&pageSize=100`,
      {
        headers: { "ngrok-skip-browser-warning": "true" },
        cache: "no-store",
      }
    );

    const data = await response.json();

    // لو array رجعه مباشرة
    if (Array.isArray(data)) {
      return NextResponse.json(data);
    }

    // لو paginated
    const articles =
      data.items ?? data.data ?? data.articles ?? data.result ?? [];

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}