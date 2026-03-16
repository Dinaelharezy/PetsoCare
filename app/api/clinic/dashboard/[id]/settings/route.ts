
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/clinic/dashboard/${id}/settings`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(body),
    }
  )

  if (!response.ok) {
    const text = await response.text()
    return NextResponse.json({ error: text }, { status: response.status })
  }

  // ✅ بيكسر الـ cache عشان الصفحات دي تجيب الداتا الجديدة
  revalidatePath('/')
  revalidatePath('/main/Home')
  revalidatePath('/admin/dashboard')
  revalidatePath('/admin/clinics')

  return NextResponse.json({ success: true })
}

export const dynamic = 'force-dynamic'