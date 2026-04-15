
//sh8aaal
import { NextResponse } from "next/server";




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

// // export async function POST(request: Request) {
// //   // ✅ استقبل FormData وبعتها للـ .NET زي ما هي
// //   const formData = await request.formData()

// //   const response = await fetch(
// //     `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles`,
// //     {
// //       method: "POST",
// //       headers: { "ngrok-skip-browser-warning": "true" },
// //       body: formData,
// //     }
// //   );

// //   if (!response.ok) {
// //     const text = await response.text();
// //     return NextResponse.json({ error: text }, { status: response.status });
// //   }

// //   const text = await response.text();
// //   if (!text || text.trim() === '') return NextResponse.json({ success: true });

// //   try {
// //     return NextResponse.json(JSON.parse(text));
// //   } catch {
// //     return NextResponse.json({ success: true });
// //   }
// // }

// // import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData(); // اقرأ FormData

//     // ابعتها للـ .NET backend مباشرة
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles`, {
//       method: 'POST',
//       headers: { 'ngrok-skip-browser-warning': 'true' }, // متحطش Content-Type
//       body: formData
//     });

//     if (!response.ok) {
//       const text = await response.text();
//       return NextResponse.json({ error: text }, { status: response.status });
//     }

//     const text = await response.text();
//     try {
//       return NextResponse.json(JSON.parse(text));
//     } catch {
//       return NextResponse.json({ success: true });
//     }

//   } catch (err) {
//     console.error('POST error:', err);
//     return NextResponse.json({ error: 'Failed to send FormData' }, { status: 500 });
//   }
// }

export async function GET(request: Request) {
  try {
    // جيب كل حاجة
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/articles`,
      {
        // headers: { "ngrok-skip-browser-warning": "true" },
        cache: "no-store",
      }
    );

    const data = await response.json();
    const articles = Array.isArray(data) ? data : (data.items ?? data.data ?? []);

    // فلتر هنا: بس اللي فيه title/content بالإنجليزي
    const englishOnly = articles.filter((a: any) => {
      const title = a.title ?? a.Title ?? '';
      return /^[a-zA-Z0-9\s\W]+$/.test(title); // لو الـ title إنجليزي
    });

    return NextResponse.json(englishOnly);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}