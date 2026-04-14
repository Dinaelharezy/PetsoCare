

// import { NextResponse } from 'next/server'
// import { auth } from '@/lib/auth'

// export const runtime = 'nodejs'

// export async function POST(req: Request) {
//   try {
//     const session = await auth()
//     const token = (session?.user as any)?.accessToken

//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const formData = await req.formData()
//     const file = formData.get('file') as File | null

//     if (!file) {
//       return NextResponse.json({ error: 'No file provided' }, { status: 400 })
//     }

//     console.log('📁 File received:', file.name, file.size)

//     const forwardForm = new FormData()
//     forwardForm.append('file', file)

//     // ✅ try both possible routes
//     const possibleUrls = [
//       `${process.env.NEXT_PUBLIC_API_URL}/api/user/upload-profile-image`,
//       `${process.env.NEXT_PUBLIC_API_URL}/api/auth/upload-profile-image`,
//       `${process.env.NEXT_PUBLIC_API_URL}/api/account/upload-profile-image`,
//     ]

//     let res: Response | null = null
//     let usedUrl = ''

//     for (const url of possibleUrls) {
//       console.log('📡 Trying:', url)
//       const attempt = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'ngrok-skip-browser-warning': 'true',
//           Authorization: `Bearer ${token}`,
//         },
//         body: forwardForm,
//       })
//       console.log('📥 Status:', attempt.status, 'for', url)
//       if (attempt.status !== 404) {
//         res = attempt
//         usedUrl = url
//         break
//       }
//     }

//     if (!res) {
//       return NextResponse.json({ error: 'Upload endpoint not found on backend' }, { status: 404 })
//     }

//     const text = await res.text()
//     console.log('✅ Used URL:', usedUrl)
//     console.log('📥 Backend response:', text)

//     let data: any
//     try { data = JSON.parse(text) } catch { data = { message: text } }

//     if (!res.ok) {
//       return NextResponse.json({ error: data?.message ?? text }, { status: res.status })
//     }

//     return NextResponse.json({
//       imageUrl: data.imageUrl ?? data.url ?? data.image ?? null,
//       message: data.message ?? 'Uploaded successfully',
//     }, { status: 200 })

//   } catch (err: any) {
//     console.error('❌ Upload route error:', err)
//     return NextResponse.json({ error: err.message ?? 'Server error' }, { status: 500 })
//   }
// }

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

    const forwardForm = new FormData()
    forwardForm.append('file', file)

    // ✅ CORRECT endpoint from swagger
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/upload-profile-image`,
      {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          Authorization: `Bearer ${token}`,
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
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}