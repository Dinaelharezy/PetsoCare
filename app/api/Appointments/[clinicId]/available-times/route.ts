// import { NextResponse } from "next/server";

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ clinicId: string }> }
// ) {
//   const { clinicId } = await params;

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/Appointments/${clinicId}/available-times`,
//     {
//       headers: { "ngrok-skip-browser-warning": "true" },
//       cache: "no-store",
//     }
//   );

//   if (!response.ok) {
//     const text = await response.text();
//     return NextResponse.json({ error: text }, { status: response.status });
//   }

//   const data = await response.json();
//   return NextResponse.json(data);
// }
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

async function getToken() {
  const session = await auth();
  return (session?.user as any)?.accessToken;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ clinicId: string }> }
) {
  try {
    const { clinicId } = await params;
    const token = await getToken();

    console.log("📡 [available-times] Fetching for clinic:", clinicId);
    console.log("🔑 Token exists:", !!token);

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ جلب الـ query parameters
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    if (!date) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 });
    }

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/Appointments/${clinicId}/available-times?date=${date}`;
    console.log("📡 Calling backend:", backendUrl);

    const response = await fetch(backendUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
      cache: "no-store",
    });

    const responseText = await response.text();
    console.log("📡 Backend response status:", response.status);
    console.log("📡 Backend response body:", responseText);

    if (!response.ok) {
      return NextResponse.json(
        { error: responseText || `Backend error: ${response.status}` },
        { status: response.status }
      );
    }

    if (!responseText || responseText.trim() === '') {
      return NextResponse.json({ times: [] });
    }

    try {
      const data = JSON.parse(responseText);
      return NextResponse.json(data);
    } catch {
      return NextResponse.json({ times: [] });
    }
  } catch (error) {
    console.error("❌ Error in available-times API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}