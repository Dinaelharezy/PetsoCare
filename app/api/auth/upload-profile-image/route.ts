import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const session = await auth()
    const token = (session?.user as any)?.accessToken

    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    console.log('📁 File:', file.name, file.size)

    const forwardForm = new FormData()
    forwardForm.append('file', file)

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/upload-profile-image`,
      {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          Authorization: `Bearer ${token}`,
          // ✅ NO Content-Type — browser sets multipart boundary
        },
        body: forwardForm,
      }
    )

    const text = await res.text()
    console.log('📥 Backend status:', res.status)
    console.log('📥 Backend response:', text)

    let data: any
    try { data = JSON.parse(text) } catch { data = { message: text } }

    if (!res.ok) {
      return NextResponse.json({ error: data?.message ?? text }, { status: res.status })
    }

    return NextResponse.json({
      imageUrl: data.imageUrl ?? data.url ?? data.image ?? null,
      message: data.message ?? 'Uploaded successfully',
    }, { status: 200 })

  } catch (err: any) {
    console.error('❌ Upload error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}