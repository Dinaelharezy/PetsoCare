// // ════════════════════════════════════════════════════════════════════════════
// // app/api/vacc-locations/[id]/toggle/route.ts   (PUT toggle isActive)
// // ════════════════════════════════════════════════════════════════════════════
// import { auth } from '../../../../../../lib/auth'
// import { NextRequest, NextResponse } from 'next/server'

// const API = process.env.NEXT_PUBLIC_API_URL


// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const session = await auth()
//   if (!session)
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//   const { id } = params

//   // لو الـ toggle بيحتاج body (زي { isActive: false })
//   const body = await req.json().catch(() => ({})) // optional body

//   const res = await fetch(`${API}/api/admin/locations/${id}/toggle`, {
//     method: 'PUT', // أو PUT حسب الـ API بتاعك
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${session.user.accessToken}`,
//       'ngrok-skip-browser-warning': 'true',
//     },
//     body: JSON.stringify(body),
//   })

//   const text = await res.text()
//   const data = text ? JSON.parse(text) : { success: true }
//   return NextResponse.json(data, { status: res.status })
// }
// app/api/admin/locations/[id]/toggle/route.ts
import { auth } from '../../../../../../lib/auth'
import { NextRequest, NextResponse } from 'next/server'

const API = process.env.NEXT_PUBLIC_API_URL

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const backendUrl = `${API}/api/admin/locations/${id}/toggle`

    const res = await fetch(backendUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.user.accessToken}`,
        'ngrok-skip-browser-warning': 'true',
      },
    })

    // ========== IMPORTANT: Handle empty response ==========
    const text = await res.text()
    
    if (!res.ok) {
      console.error('Backend error:', res.status, text)
      return NextResponse.json(
        { error: `Backend error: ${res.status}`, details: text || 'No details provided' },
        { status: res.status }
      )
    }

    // Try to parse JSON if there is content, otherwise return success
    let data = {}
    if (text && text.trim()) {
      try {
        data = JSON.parse(text)
      } catch (e) {
        console.warn('Response is not valid JSON, but status is OK:', text)
        data = { message: 'Operation completed successfully' }
      }
    } else {
      data = { message: 'Location toggled successfully' }
    }

    return NextResponse.json(data, { status: 200 })
    
  } catch (error) {
    console.error('Toggle route error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    )
  }
}