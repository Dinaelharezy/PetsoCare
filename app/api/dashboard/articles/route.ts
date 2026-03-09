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
  const data = await response.json();
  return NextResponse.json(data);
}