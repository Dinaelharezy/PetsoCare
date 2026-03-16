
// import { NextResponse } from "next/server";

// export async function PUT(
//   request: Request,
//   { params }: { params: Promise<{ AppointId: string }> }
// ) {
//   const { AppointId } = await params;

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/appointments/${AppointId}/reject`,
//     {
//       method: "PUT",
//       headers: { 
//         "ngrok-skip-browser-warning": "true",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ reason: "" }),  // ✅ الـ backend بيطلب Reason
//     }
//   );

//   if (!response.ok) {
//     const text = await response.text();
//     return NextResponse.json({ error: text }, { status: response.status });
//   }

//   return NextResponse.json({ success: true });
// }

import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ AppointId: string }> }
) {
  const { AppointId } = await params;
  const body = await request.json()  // ✅ اقرأ الـ reason من الـ request

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/appointments/${AppointId}/reject`,
    {
      method: "PUT",
      headers: { 
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reason: body.reason || '' }),  // ✅ ابعته للـ backend
    }
  );

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json({ error: text }, { status: response.status });
  }

  return NextResponse.json({ success: true });
}