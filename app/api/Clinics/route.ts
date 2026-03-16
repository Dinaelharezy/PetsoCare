// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/Clinics`,
//       {
//         headers: { "ngrok-skip-browser-warning": "true" },
//         cache: "no-store",
//       }
//     );
//     const data = await response.json();
    
   
//     if (Array.isArray(data)) {
//       return NextResponse.json(data);
//     }
    

//     const clinics = data.items ?? data.data ?? data.articles ?? data.result ?? [];
//     return NextResponse.json(clinics);
    
//   } catch (error) {
//     return NextResponse.json({ error: String(error) }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Clinics`,
      {
        headers: { "ngrok-skip-browser-warning": "true" },
        cache: "no-store",
      }
    );
    const data = await response.json();

    const clinics = Array.isArray(data)
      ? data
      : data.items ?? data.data ?? data.articles ?? data.result ?? [];

    // ✅ ده اللي ناقص - بيمنع Next.js من cache الـ response
    return NextResponse.json(clinics, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// ✅ ده بيقول لـ Next.js إن الـ route ده دايماً dynamic مش static
export const dynamic = 'force-dynamic'