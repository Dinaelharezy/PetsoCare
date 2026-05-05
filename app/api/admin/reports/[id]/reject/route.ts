
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  const body = await req.json()
 const { id } = await params
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports/${id}/reject`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...(session?.user?.accessToken
          ? { Authorization: `Bearer ${session.user.accessToken}` }
          : {}),
      },
      body: JSON.stringify(body),
    }
  )

  const text = await response.text()
  return NextResponse.json({ message: text }, { status: response.status })
}