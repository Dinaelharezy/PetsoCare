

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

// export async function POST(request: Request) {
//   const body = await request.json();
//    console.log('Body received:', JSON.stringify(body)); 
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
  const body = await request.json();
  
  console.log('Body received:', JSON.stringify(body));

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(body),
    }
  );

  console.log('Backend status:', response.status);
  const text = await response.text();
  console.log('Backend response:', text);

  // لو الـ backend مش بيرجع حاجة (204) أو بيرجع HTML
  if (!response.ok) {
    return NextResponse.json({ error: text }, { status: response.status });
  }

  // لو الـ response فاضي
  if (!text || text.trim() === '') {
    return NextResponse.json({ success: true });
  }

  try {
    return NextResponse.json(JSON.parse(text));
  } catch {
    return NextResponse.json({ success: true });
  }
}