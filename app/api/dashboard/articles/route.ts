
//sh8aaal
import { NextResponse,NextRequest } from "next/server";




export async function POST(request: Request) {
  try {
    const formData = await request.formData(); // اقرأ FormData

    // ابعتها للـ .NET backend مباشرة
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles`, {
      method: 'POST',
      headers: { 'ngrok-skip-browser-warning': 'true' }, // متحطش Content-Type
      body: formData
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: text }, { status: response.status });
    }

    const text = await response.text();
    try {
      return NextResponse.json(JSON.parse(text));
    } catch {
      return NextResponse.json({ success: true });
    }

  } catch (err) {
    console.error('POST error:', err);
    return NextResponse.json({ error: 'Failed to send FormData' }, { status: 500 });
  }
}

// export async function GET(request: Request) {
//   try {
//     // جيب كل حاجة
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles`,
//       {
//         // headers: { "ngrok-skip-browser-warning": "true" },
//         cache: "no-store",
//       }
//     );

//     const data = await response.json();
//     const articles = Array.isArray(data) ? data : (data.items ?? data.data ?? []);

//     // فلتر هنا: بس اللي فيه title/content بالإنجليزي
//     const englishOnly = articles.filter((a: any) => {
//       const title = a.title ?? a.Title ?? '';
//       return /^[a-zA-Z0-9\s\W]+$/.test(title); // لو الـ title إنجليزي
//     });

//     return NextResponse.json(englishOnly);
//   } catch (error) {
//     return NextResponse.json({ error: String(error) }, { status: 500 });
//   }
// }




// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const lang = searchParams.get("lang") ?? "en"; // ✅ أضف lang

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles?lang=${lang}`,
//       { cache: "no-store" }
//     );

//     const data = await response.json();
//     const articles = Array.isArray(data) ? data : (data.items ?? data.data ?? []);

//     const normalized = articles.map((a: any) => ({
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

//     const englishOnly = normalized.filter((a: any) =>
//       /^[a-zA-Z0-9\s\W]+$/.test(a.title)
//     );

//     return NextResponse.json(englishOnly);
//   } catch (error) {
//     return NextResponse.json({ error: String(error) }, { status: 500 });
//   }
// }

export async function GET(request: Request) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles`,
      { cache: "no-store" }
    );

    const data = await response.json();
    const articles = Array.isArray(data) ? data : (data.items ?? data.data ?? []);
const normalized = articles.map((a: any) => ({
  id:          a.id          ?? a.Id,
  title:       a.titleEn     ?? a.TitleEn     ?? a.title   ?? a.Title   ?? '',
  summary:     a.summaryEn   ?? a.SummaryEn   ?? a.summary ?? a.Summary ?? '',
  content:     a.contentEn   ?? a.ContentEn   ?? a.content ?? a.Content ?? '',
  source:      a.source      ?? a.Source      ?? '',
  category:    a.category    ?? a.Category    ?? '',
  publishDate: a.publishDate ?? a.PublishDate ?? '',
  imageUrl:    a.imageUrl    ?? a.ImageUrl    ?? a.image   ?? a.Image   ?? '',
  published:   a.published   ?? a.Published   ?? true,
}));

return NextResponse.json(normalized);

  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}