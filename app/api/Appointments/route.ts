// import { NextResponse } from "next/server";
// import { auth } from "@/lib/auth";

// async function getToken() {
//   const session = await auth();
//   return (session?.user as any)?.accessToken;
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const token = await getToken();

//     console.log("📥 [Next.js] Received from frontend:", JSON.stringify(body, null, 2));

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // ✅ الطريقة الصحيحة: نبعت نفس البايلود بالظبط
//     // الـ body المفروض يكون شكله { dto: { ClinicId, Date, Time, CustomerName, Phone } }
//     let payloadToSend = body;

//     // ✅ لو الـ body مش جاي بالشكل المتوقع، نحوله
//     if (!body.dto && (body.ClinicId || body.clinicId)) {
//       // لو البايلود جاي من غير dto
//       payloadToSend = {
//         dto: {
//           ClinicId: String(body.ClinicId || body.clinicId),
//           Date: body.Date || body.date,
//           Time: body.Time || body.time,
//           CustomerName: body.CustomerName || body.customerName || body.name,
//           Phone: body.Phone || body.phone,
//         }
//       };
//     }

//     console.log("📡 [Next.js] Sending to backend:", JSON.stringify(payloadToSend, null, 2));

//     const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Appointments`;
//     const response = await fetch(backendUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//         "ngrok-skip-browser-warning": "true",
//       },
//       body: JSON.stringify(payloadToSend),
//     });

//     const responseText = await response.text();
//     console.log("📡 [Backend] Response status:", response.status);
//     console.log("📡 [Backend] Response body:", responseText);

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: responseText || `Backend error: ${response.status}` },
//         { status: response.status }
//       );
//     }

//     if (!responseText || responseText.trim() === '') {
//       return NextResponse.json({ success: true });
//     }

//     try {
//       const data = JSON.parse(responseText);
//       return NextResponse.json(data);
//     } catch {
//       return NextResponse.json({ success: true, raw: responseText });
//     }
//   } catch (error) {
//     console.error("❌ [Next.js] Error in POST /api/Appointments:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

async function getToken() {
  const session = await auth();
  return (session?.user as any)?.accessToken;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = await getToken();

    console.log("📥 [Next.js] Received from frontend:", JSON.stringify(body, null, 2));

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ من غير أي تعديل، نبعت نفس اللى جالنا (سواء flat أو dto)
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Appointments`;
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(body), // ← نفس البايلود اللى جالنا من الفرونت
    });

    const responseText = await response.text();
    console.log("📡 [Backend] Response status:", response.status);
    console.log("📡 [Backend] Response body:", responseText);

    if (!response.ok) {
      return NextResponse.json(
        { error: responseText || `Backend error: ${response.status}` },
        { status: response.status }
      );
    }

    if (!responseText || responseText.trim() === "") {
      return NextResponse.json({ success: true });
    }

    try {
      const data = JSON.parse(responseText);
      return NextResponse.json(data);
    } catch {
      return NextResponse.json({ success: true, raw: responseText });
    }
  } catch (error) {
    console.error("❌ [Next.js] Error in POST /api/Appointments:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}