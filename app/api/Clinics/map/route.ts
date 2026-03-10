import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Clinics/map`,
      {
        headers: { "ngrok-skip-browser-warning": "true" },
        cache: "no-store",
      }
    );
    const data = await response.json();
    
   
    if (Array.isArray(data)) {
      return NextResponse.json(data);
    }
    

    const clinicsMap = data.items ?? data.data ?? data.articles ?? data.result ?? [];
    return NextResponse.json(clinicsMap);
    
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}