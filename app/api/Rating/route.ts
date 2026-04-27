// ═══════════════════════════════════════════════════════
// app/api/rating/route.ts
// POST /api/rating  — submit a rating (user)
// ═══════════════════════════════════════════════════════

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST(request: Request) {
  const session = await auth()
  const { value } = await request.json()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Rating?value=${value}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...(session?.user?.accessToken
          ? { Authorization: `Bearer ${session.user.accessToken}` }
          : {}),
      },
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

  return NextResponse.json({ success: true, data })
}

export const dynamic = 'force-dynamic'