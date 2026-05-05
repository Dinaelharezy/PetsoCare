import { auth } from '../../../../../lib/auth'
import { NextRequest, NextResponse } from 'next/server'

const API = process.env.NEXT_PUBLIC_API_URL

// PUT /api/admin/locations/{id}
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { id } = await params

  const res = await fetch(`${API}/api/admin/locations/${id}`, {
    method: 'PUT',
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

// DELETE /api/admin/locations/{id}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const res = await fetch(`${API}/api/admin/locations/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      'ngrok-skip-browser-warning': 'true',
    },
  })

  const text = await res.text()
  const data = text ? JSON.parse(text) : { success: true }
  return NextResponse.json(data, { status: res.status })
}

