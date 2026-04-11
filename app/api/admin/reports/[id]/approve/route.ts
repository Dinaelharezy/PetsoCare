import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'

export async function PUT(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await auth()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports/${id}/approve`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...(session?.user?.accessToken
          ? { Authorization: `Bearer ${session.user.accessToken}` }
          : {}),
      },
    }
  )

  if (!response.ok) {
    const text = await response.text()
    return NextResponse.json({ error: text }, { status: response.status })
  }

  revalidatePath('/admin/dashboard')
  return NextResponse.json({ success: true })
}

export const dynamic = 'force-dynamic'