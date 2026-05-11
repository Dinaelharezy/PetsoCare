
// import { NextResponse } from "next/server";

// export async function GET(
//   request: Request,
//    { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const lang = searchParams.get("lang") ?? "en";

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/Articles/${params.id}?lang=${lang}`,
//       {
//         headers: { "ngrok-skip-browser-warning": "true" },
//         cache: "no-store",
//       }
//     );

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: "Article not found" },
//         { status: response.status }
//       );
//     }

//     const a = await response.json();

//     // normalize هنا كمان
//     const normalized = {
//       id:          a.id          ?? a.Id,
//       title:       a.title       ?? a.Title       ?? '',
//       summary:     a.summary     ?? a.Summary     ?? '',
//       content:     a.content     ?? a.Content     ?? '',
//       source:      a.source      ?? a.Source      ?? '',
//       category:    a.category    ?? a.Category    ?? '',
//       publishDate: a.publishDate ?? a.PublishDate ?? '',
//       imageUrl:    a.imageUrl    ?? a.ImageUrl    ?? a.image ?? a.Image ?? '',
//       published:   a.published   ?? a.Published   ?? true,
//     };

//     return NextResponse.json(normalized);
//   } catch (error) {
//     return NextResponse.json({ error: String(error) }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") ?? "en";

    const response = await fetch(
      `${process.env.API_URL}/api/Articles/${id}?lang=${lang}`,
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

    const a = await response.json();

    const normalized = {
      id:          a.id          ?? a.Id,
      title:       a.title       ?? a.Title       ?? '',
      summary:     a.summary     ?? a.Summary     ?? '',
      content:     a.content     ?? a.Content     ?? '',
      source:      a.source      ?? a.Source      ?? '',
      category:    a.category    ?? a.Category    ?? '',
      publishDate: a.publishDate ?? a.PublishDate ?? '',
      imageUrl:    a.imageUrl    ?? a.ImageUrl    ?? a.image ?? a.Image ?? '',
      published:   a.published   ?? a.Published   ?? true,
    };

    return NextResponse.json(normalized);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}