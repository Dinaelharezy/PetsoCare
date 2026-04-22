// ════════════════════════════════════════════════════════════
// app/api/vaccine/[id]/route.ts     (DELETE)
// ════════════════════════════════════════════════════════════
import { auth } from '../../../../lib/auth'
import { NextRequest, NextResponse } from 'next/server'

const API = process.env.NEXT_PUBLIC_API_URL

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const res = await fetch(`${API}/api/vaccine/${params.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
      'ngrok-skip-browser-warning': 'true',
    },
  })

  if (!res.ok) {
    const text = await res.text()
    return NextResponse.json({ error: text }, { status: res.status })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}