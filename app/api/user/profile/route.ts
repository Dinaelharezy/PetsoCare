

// import { NextResponse } from 'next/server'
// import { auth } from '@/lib/auth'

// export const runtime = 'nodejs'

// export async function GET() {
//   try {
//     const session = await auth()
//     const token = (session?.user as any)?.accessToken

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'ngrok-skip-browser-warning': 'true',
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//       cache: 'no-store',
//     })

//     const data = await res.json()
//     return NextResponse.json(data, { status: res.status })
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }

// export async function PUT(req: Request) {
//   try {
//     const session = await auth()
//     const token = (session?.user as any)?.accessToken
//     const body = await req.json()

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'ngrok-skip-browser-warning': 'true',
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//       // ✅ send both name and phone — backend supports both
//       body: JSON.stringify({
//         name: body.name,
//         phone: body.phone,
//       }),
//     })

//     const text = await res.text()
//     return new NextResponse(text, { status: res.status })
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const session = await auth()
    const token = (session?.user as any)?.accessToken

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // ✅ correct endpoint
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth()
    const token = (session?.user as any)?.accessToken
    const body = await req.json()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: body.name,
        phone: body.phone,
        address: body.address,
        dateOfBirth: body.dateOfBirth,
      }),
    })

    const text = await res.text()
    return new NextResponse(text, { status: res.status })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}