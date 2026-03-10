
// import { NextResponse } from "next/server";

// export async function GET() {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles`,
//     {
//       headers: { "ngrok-skip-browser-warning": "true" },
//       cache: "no-store",
//     }
//   );
//   const data = await response.json();
//   return NextResponse.json(data);
// }



// Working but photos not working - because .NET API expects multipart/form-data for file uploads, so we need to handle FormData instead of JSON
// export async function POST(request: Request) {
//   const body = await request.json();
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "ngrok-skip-browser-warning": "true",
//       },
//       body: JSON.stringify(body),
//     }
//   );
//   const data = await response.json();
//   return NextResponse.json(data);
// }

// export async function POST(request: Request) {
//   // ✅ استقبل FormData وبعتها للـ .NET زي ما هي
//   const formData = await request.formData()

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles`,
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

//   const text = await response.text();
//   if (!text || text.trim() === '') return NextResponse.json({ success: true });

//   try {
//     return NextResponse.json(JSON.parse(text));
//   } catch {
//     return NextResponse.json({ success: true });
//   }
// }

import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles`,
    {
      headers: { "ngrok-skip-browser-warning": "true" },
      cache: "no-store",
    }
  );
  const data = await response.json();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  // ✅ استقبل FormData وبعتها للـ .NET زي ما هي
  const formData = await request.formData()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles`,
    {
      method: "POST",
      headers: { "ngrok-skip-browser-warning": "true" },
      body: formData,
    }
  );

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json({ error: text }, { status: response.status });
  }

  const text = await response.text();
  if (!text || text.trim() === '') return NextResponse.json({ success: true });

  try {
    return NextResponse.json(JSON.parse(text));
  } catch {
    return NextResponse.json({ success: true });
  }
}