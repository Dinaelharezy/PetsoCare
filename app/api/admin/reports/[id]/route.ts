// import { NextResponse } from "next/server"

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   const body = await req.json()

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports/${params.id}`,
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     }
//   )

//   const data = await res.text()
//   return NextResponse.json(data)
// }
import { NextResponse } from "next/server"
import { auth } from '@/lib/auth'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports/${params.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  )

  const data = await res.text()
  return NextResponse.json(data)
}

// ✅ أضيفي ده
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports/${params.id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...(session?.user?.accessToken
          ? { Authorization: `Bearer ${session.user.accessToken}` }
          : {}),
      },
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    const text = await res.text()
    return NextResponse.json({ error: text }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
