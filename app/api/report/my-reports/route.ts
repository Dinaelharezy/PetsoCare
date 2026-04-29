// app/api/report/my-reports/route.ts
import { NextResponse } from 'next/server'
import { auth } from '../../../../lib/auth'   // ← نفس الـ import اللي بتستخدميه في /api/auth/me

export const runtime = 'nodejs'

export async function GET() {
  try {
    const session = await auth()
    const token = (session?.user as any)?.accessToken

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/report/my-reports`, {
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