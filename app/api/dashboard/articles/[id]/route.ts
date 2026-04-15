
import { NextResponse } from "next/server";
// // ************** WORKING BUT PHOTOS NOT WORKING **************
// export async function PUT(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;
//   const body = await request.json();

//   // ✅ JSON مش FormData
//   const payload = {
//     Title: body.title ?? '',
//     Summary: body.summary ?? '',
//     Content: body.content ?? '',
//     Category: body.category ?? '',
//     PublishDate: body.publishDate ?? new Date().toISOString(),
//     Source: body.source ?? '',
//     Published: body.published ?? true,
//   };

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles/${id}`,
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",  // ✅ JSON
//         "ngrok-skip-browser-warning": "true",
//       },
//       body: JSON.stringify(payload),
//     }
//   );

//   if (!response.ok) {
//     const text = await response.text();
//     return NextResponse.json({ error: text }, { status: response.status });
//   }

//   const text = await response.text();
//   if (!text || text.trim() === '') {
//     return NextResponse.json({ success: true });
//   }

//   try {
//     return NextResponse.json(JSON.parse(text));
//   } catch {
//     return NextResponse.json({ success: true });
//   }
// }

// export async function DELETE(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles/${id}`,
//     {
//       method: "DELETE",
//       headers: { "ngrok-skip-browser-warning": "true" },
//     }
//   );

//   if (!response.ok) {
//     return NextResponse.json({ error: "Failed to delete" }, { status: response.status });
//   }

//   return NextResponse.json({ success: true });
// }


// export async function PATCH(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;
//   const formData = await request.formData();

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles/${id}/image`,
//     {
//       method: "POST",
//       headers: { "ngrok-skip-browser-warning": "true" },
//       body: formData,
//     }
//   );

//   if (!response.ok) {
//     const text = await response.text();
//     return NextResponse.json({ error: text }, { status: response.status });
//   }

//   return NextResponse.json({ success: true });
// }



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
        // headers: { "ngrok-skip-browser-warning": "true" },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Article not found" }, { status: response.status });
    }

    const a = await response.json();
    

    // normalize هنا كمان
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
    }

    return NextResponse.json(normalized);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

