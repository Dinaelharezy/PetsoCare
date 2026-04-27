// ═══════════════════════════════════════════════════════
// app/api/rating/average/route.ts
// GET /api/rating/average  — admin only
// ═══════════════════════════════════════════════════════

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET() {
  const session = await auth()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Rating/average`,
    {
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

  if (!response.ok) {
    const text = await response.text()
    return NextResponse.json({ error: text }, { status: response.status })
  }

  const contentType = response.headers.get('content-type')
  const data = contentType?.includes('application/json')
    ? await response.json()
    : await response.text()

  return NextResponse.json(data)
}

export const dynamic = 'force-dynamic'


// ═══════════════════════════════════════════════════════
// SEPARATE FILE: app/api/rating/count/route.ts
// GET /api/rating/count  — admin only
// ═══════════════════════════════════════════════════════

// import { NextResponse } from 'next/server'
// import { auth } from '@/lib/auth'
//
// export async function GET() {
//   const session = await auth()
//
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/Rating/count`,
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         'ngrok-skip-browser-warning': 'true',
//         ...(session?.user?.accessToken
//           ? { Authorization: `Bearer ${session.user.accessToken}` }
//           : {}),
//       },
//       cache: 'no-store',
//     }
//   )
//
//   if (!response.ok) {
//     const text = await response.text()
//     return NextResponse.json({ error: text }, { status: response.status })
//   }
//
//   const contentType = response.headers.get('content-type')
//   const data = contentType?.includes('application/json')
//     ? await response.json()
//     : await response.text()
//
//   return NextResponse.json(data)
// }
//
// export const dynamic = 'force-dynamic'