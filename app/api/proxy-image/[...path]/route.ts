// app/api/proxy-image/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const session = await auth()
    const token = session?.user?.accessToken

    // المسار المطلوب (مثلاً: Images/clinics/modernvet.jpg)
    const imagePath = params.path.join('/')
    
    // بناء URL كامل للـ API الخارجي
    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    const fullUrl = `${baseUrl}/${imagePath}`

    const headers: HeadersInit = {}
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(fullUrl, { headers })

    if (!response.ok) {
      console.error(`Image not found: ${fullUrl} - Status: ${response.status}`)
      return new NextResponse('Image not found', { status: 404 })
    }

    const imageBuffer = await response.arrayBuffer()
    const contentType = response.headers.get('content-type') || 'image/jpeg'

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Image proxy error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}