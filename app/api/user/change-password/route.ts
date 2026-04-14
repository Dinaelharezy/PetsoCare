import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function PUT(req: Request) {
  const session = await auth()
  const body = await req.json()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/change-password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...(session?.user?.accessToken
        ? { Authorization: `Bearer ${(session.user as any).accessToken}` }
        : {}),
    },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  return new NextResponse(text, { status: res.status })
}