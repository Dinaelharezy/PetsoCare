import { auth } from '../../../../lib/auth'
import { NextRequest, NextResponse } from 'next/server'

const API = process.env.NEXT_PUBLIC_API_URL

export async function PUT(req: NextRequest) { 
  const session = await auth()
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

 
  const body = await req.json()

  const res = await fetch(`${API}/api/auth/update-phone`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      'Content-Type': 'application/json',       
      'ngrok-skip-browser-warning': 'true',
    },
    body: JSON.stringify(body),                
  })

  if (!res.ok) {
    const text = await res.text()
    return NextResponse.json({ error: text }, { status: res.status })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}