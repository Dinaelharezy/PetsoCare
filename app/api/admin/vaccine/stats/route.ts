// app/api/admin/vaccine/stats/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const API = process.env.NEXT_PUBLIC_API_URL

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const res = await fetch(`${API}/api/admin/vaccine/stats`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.user.accessToken}`,
        'ngrok-skip-browser-warning': 'true',
      },
    })

    const text = await res.text()
    const data = text ? JSON.parse(text) : {}

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching vaccine stats:', error)
    return NextResponse.json(
      { message: 'Backend unreachable' },
      { status: 502 }
    )
  }
}