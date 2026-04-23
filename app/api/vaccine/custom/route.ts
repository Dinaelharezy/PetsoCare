import { auth } from '../../../../lib/auth'
import { NextRequest, NextResponse } from 'next/server'

const API = process.env.NEXT_PUBLIC_API_URL

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()

  const res = await fetch(`${API}/api/vaccine/custom`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.user.accessToken}`,
      'ngrok-skip-browser-warning': 'true',
    },
    body: JSON.stringify(body),
  })

  const text = await res.text()
  const data = text ? JSON.parse(text) : { success: true }
  return NextResponse.json(data, { status: res.status })
}