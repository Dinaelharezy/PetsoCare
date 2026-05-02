import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET() {
  const session = await auth()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/report/approved`,
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

  if (!response.ok) {
    const text = await response.text()
    return NextResponse.json({ error: text }, { status: response.status })
  }

  const data = await response.json()
  return NextResponse.json(data)
}

export const dynamic = 'force-dynamic'