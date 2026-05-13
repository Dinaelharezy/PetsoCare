// app/api/auth/forgot-password/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email } = await req.json()

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }
  )

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}