
// import { NextResponse } from "next/server";

// export async function PUT(
//   request: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;
//   const body = await request.json();

//   // ✅ حول من PascalCase لـ camelCase
//   const payload = {
//     title: body.Title ?? body.title,
//     summary: body.Summary ?? body.summary,
//     content: body.Content ?? body.content,
//     imageUrl: body.ImageUrl ?? body.imageUrl,
//     source: body.Source ?? body.source,
//     category: body.Category ?? body.category,
//     publishDate: body.PublishDate ?? body.publishDate,
//     published: body.Published ?? body.published ?? true,
//   };

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles/${id}`,
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
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

import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const payload = {
    title: body.title,
    summary: body.summary,
    content: body.content,
    imageUrl: body.imageUrl,
    source: body.source,
    category: body.category,
    publishDate: body.publishDate,
    published: body.published ?? true,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json({ error: text }, { status: response.status });
  }

  const text = await response.text();
  if (!text || text.trim() === '') {
    return NextResponse.json({ success: true });
  }

  try {
    return NextResponse.json(JSON.parse(text));
  } catch {
    return NextResponse.json({ success: true });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles/${id}`,
    {
      method: "DELETE",
      headers: { "ngrok-skip-browser-warning": "true" },
    }
  );

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to delete" }, { status: response.status });
  }

  return NextResponse.json({ success: true });
}