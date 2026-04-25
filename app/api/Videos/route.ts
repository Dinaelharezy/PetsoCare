// import { NextResponse } from 'next/server'
// import { auth } from '../../../lib/auth'

// const API_URL = process.env.NEXT_PUBLIC_API_URL

// async function getToken() {
//   const session = await auth()
//   return (session?.user as any)?.accessToken
// }

// // GET /api/Videos - جلب كل الفيديوهات من الـ Backend
// export async function GET() {
//   try {
//     const token = await getToken()
    
//     const res = await fetch(`${API_URL}/api/Videos`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'ngrok-skip-browser-warning': 'true',
//       },
//       cache: 'no-store',
//     })

//     if (!res.ok) {
//       return NextResponse.json({ error: 'Failed to fetch videos' }, { status: res.status })
//     }

//     const data = await res.json()
//     return NextResponse.json(data, { status: 200 })
//   } catch (error) {
//     console.error('Error fetching videos:', error)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }

// // POST /api/Videos - إضافة فيديو جديد
// export async function POST(request: Request) {
//   try {
//     const token = await getToken()
//     const body = await request.json()

//     const res = await fetch(`${API_URL}/api/Videos`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'ngrok-skip-browser-warning': 'true',
//       },
//       body: JSON.stringify(body),
//     })

//     const data = await res.json()
//     return NextResponse.json(data, { status: res.status })
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to create video' }, { status: 500 })
//   }
// }




import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function getToken() {
  const session = await auth()
  return (session?.user as any)?.accessToken
}

export async function GET() {
  try {
    const token = await getToken()
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const res = await fetch(`${API_URL}/api/Videos`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
      cache: 'no-store',
    })
    
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error('Error fetching videos:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const token = await getToken()
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    
    const res = await fetch(`${API_URL}/api/Videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(body),
    })
    
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error('Error creating video:', error)
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 })
  }
}
