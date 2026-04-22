// // app/api/vaccine/route.ts
// import { auth } from "../../../lib/auth";
// import { NextRequest, NextResponse } from "next/server";

// const API = process.env.NEXT_PUBLIC_API_URL;

// export async function GET() {
//   const session = await auth();

//   if (!session)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const res = await fetch(`${API}/api/vaccine`, {
//     headers: {
//       Authorization: `Bearer ${session.user.accessToken}`,
//     //   "ngrok-skip-browser-warning": "true",
//     },
//   });

//   const data = await res.json();
//   return NextResponse.json(data);
// }

// export async function POST(req: NextRequest) {
//   const session = await auth();

//   if (!session)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const body = await req.json();

//   const res = await fetch(`${API}/api/vaccine`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${session.user.accessToken}`,
//       "ngrok-skip-browser-warning": "true",
//     },
//     body: JSON.stringify(body),
//   });

//   const data = await res.json();
//   return NextResponse.json(data, { status: res.status });
// }

// ════════════════════════════════════════════════════════════
// app/api/vaccine/route.ts          (GET + POST)
// ════════════════════════════════════════════════════════════
import { auth } from '../../../lib/auth'
import { NextRequest, NextResponse } from 'next/server'

const API = process.env.NEXT_PUBLIC_API_URL

export async function GET() {
  const session = await auth()
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const res = await fetch(`${API}/api/vaccine`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      'ngrok-skip-browser-warning': 'true',
    },
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  // body shape: { name, pet, vaccineType, exposureCategory, startDate, reminder }

  const res = await fetch(`${API}/api/vaccine`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user.accessToken}`,
      'ngrok-skip-browser-warning': 'true',
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}