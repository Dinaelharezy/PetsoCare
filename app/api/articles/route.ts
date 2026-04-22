
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




// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const lang = searchParams.get("lang") ?? "en";

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/Articles?lang=${lang}&pageSize=100`,
//       {
//         headers: { "ngrok-skip-browser-warning": "true" },
//         cache: "no-store",
//       }
//     );

//     const data = await response.json();
//     const raw = Array.isArray(data) ? data : (data.items ?? data.data ?? data.articles ?? data.result ?? []);

//     // ✅ normalize هنا كمان
//     const normalized = raw.map((a: any) => ({
//       id:          a.id          ?? a.Id,
//       title:       a.title       ?? a.Title       ?? '',
//       summary:     a.summary     ?? a.Summary     ?? '',
//       content:     a.content     ?? a.Content     ?? '',
//       source:      a.source      ?? a.Source      ?? '',
//       category:    a.category    ?? a.Category    ?? '',
//       publishDate: a.publishDate ?? a.PublishDate ?? '',
//       imageUrl:    a.imageUrl    ?? a.ImageUrl    ?? a.image ?? a.Image ?? '',
//       published:   a.published   ?? a.Published   ?? true,
//     }));

//     return NextResponse.json(normalized);
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
    const raw = Array.isArray(data)
      ? data
      : (data.items ?? data.data ?? data.articles ?? data.result ?? []);

    const normalized = raw.map((a: any) => ({
      id:          a.id          ?? a.Id,
      title:       a.title       ?? a.Title       ?? '',
      summary:     a.summary     ?? a.Summary     ?? '',
      content:     a.content     ?? a.Content     ?? '',
      source:      a.source      ?? a.Source      ?? '',
      category:    a.category    ?? a.Category    ?? '',
      publishDate: a.publishDate ?? a.PublishDate ?? '',
      imageUrl:    a.imageUrl    ?? a.ImageUrl    ?? a.image ?? a.Image ?? '',
      published:   a.published   ?? a.Published   ?? true,
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}