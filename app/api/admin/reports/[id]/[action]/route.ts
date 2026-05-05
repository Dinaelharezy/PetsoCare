

import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'

const ALLOWED_ACTIONS = ['seen', 'approve', 'reject', 'in-progress', 'done']

export async function PUT(
  request: Request,
  { params }: { params: { id: string; action: string } }
) {
  const { id, action } = await params

  // validate action
  if (!ALLOWED_ACTIONS.includes(action)) {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  try {
    const session = await auth()

    // 👇 backend expects plain string (NOT object)
    const reason = await request.text()

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports/${id}/${action}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          ...(session?.user?.accessToken && {
            Authorization: `Bearer ${session.user.accessToken}`,
          }),
        },
        body: reason, // ✅ important fix
      }
    )

    const text = await response.text()

    let data: any
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }

    if (!response.ok) {
      console.log('❌ BACKEND ERROR:', data)
      return NextResponse.json(
        { error: data },
        { status: response.status }
      )
    }

    // refresh pages
    revalidatePath('/admin/dashboard')
    revalidatePath('/admin/reports')

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error: any) {
    console.log('❌ SERVER ERROR:', error)

    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}

