// app/api/clinic/appointments/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET() {
  const session = await auth()

  const res = await fetch(
    `${process.env.API_URL}/api/dashboard/appointments/my-clinic`,
    {
      headers: {
        'Content-Type': 'application/json',
        ...(session?.user?.accessToken
          ? { Authorization: `Bearer ${session.user.accessToken}` }
          : {}),
      },
      cache: 'no-store',
    }
  )

  const text = await res.text()
  try {
    return NextResponse.json(JSON.parse(text), { status: res.status })
  } catch {
    return NextResponse.json({ error: text }, { status: res.status })
  }
}