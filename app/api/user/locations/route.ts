// // نفس الملف app/api/admin/locations/route.ts
// // ضيف الـ GET مع الـ POST
// import { auth } from '../../../../lib/auth'
// import { NextRequest, NextResponse } from 'next/server'

// const API = process.env.NEXT_PUBLIC_API_URL
// export async function GET() {
//   const session = await auth()
//   if (!session)
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/locations`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'ngrok-skip-browser-warning': 'true',
//       },
//       cache: 'no-store',
//     })

//   const text = await res.text()
//   const data = text ? JSON.parse(text) : []
//   return NextResponse.json(data, { status: res.status })
// }

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../../../../lib/auth'

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const isActive = searchParams.get('isActive')
  
  // بناء URL للـ API الخارجي
  const apiUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/user/locations`)
  if (isActive) {
    apiUrl.searchParams.set('isActive', isActive)
  }

  const response = await fetch(apiUrl.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    cache: 'no-store',
  })

  const data = await response.json()
  return NextResponse.json(data, { status: response.status })
}