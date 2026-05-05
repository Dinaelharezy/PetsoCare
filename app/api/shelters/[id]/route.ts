// app/api/shelters/[id]/route.ts

// import { NextResponse } from "next/server";

// export async function GET(
//   _req: Request,
// { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/shelters/${params.id}`,
//       {
//         cache: "no-store",
//       }
//     );

//     let data = null;
//     const contentType = res.headers.get("content-type");

//     if (contentType && contentType.includes("application/json")) {
//       data = await res.json();
//     }

//     return NextResponse.json(data, { status: res.status });
//   } catch (error) {
//     console.error(`[GET /api/shelters/${params.id}]`, error);

//     return NextResponse.json(
//       { error: "Failed to fetch shelter." },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/shelters/${id}`,
      {
        cache: "no-store",
      }
    );

    let data = null;
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(`[GET /api/shelters/${id}]`, error);

    return NextResponse.json(
      { error: "Failed to fetch shelter." },
      { status: 500 }
    );
  }
}