

// import { NextResponse } from 'next/server'
// import { auth } from '@/lib/auth'

// export const runtime = 'nodejs'
// export const dynamic = 'force-dynamic'

// async function handler(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
//   const session = await auth()
//   const token = session?.user?.accessToken

//   const { path: pathArr } = await params 
//   const path = pathArr.join('/')
//   const url = `${process.env.API_URL}/api/${path}`

//   const isFormData = req.headers.get('content-type')?.includes('multipart/form-data')

//   const options: RequestInit = {
//     method: req.method,
//     headers: {
//       ...(token && { Authorization: `Bearer ${token}` }),
//       ...(!isFormData && { 'Content-Type': 'application/json' }),
//     },
//     cache: 'no-store',
//   }

//   if (req.method !== 'GET' && req.method !== 'HEAD') {
//   options.body = isFormData ? await req.formData() : await req.text()
//   }

//   const res = await fetch(url, options)
//   const text = await res.text()

//   try {
//     return NextResponse.json(JSON.parse(text), { status: res.status })
//   } catch {
//     return NextResponse.json({ error: text }, { status: res.status })
//   }
// }

// export const GET    = handler
// export const POST   = handler
// export const PUT    = handler
// export const DELETE = handler
// export const PATCH  = handler
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function handler(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const session = await auth()
  const token = session?.user?.accessToken

  const { path: pathArr } = await params 
  const path = pathArr.join('/')
  
  // ✅ ضيف الـ query string
  const { search } = new URL(req.url)
  const url = `${process.env.API_URL}/api/${path}${search}`

  const isFormData = req.headers.get('content-type')?.includes('multipart/form-data')

  const options: RequestInit = {
    method: req.method,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(!isFormData && { 'Content-Type': 'application/json' }),
    },
    cache: 'no-store',
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    options.body = isFormData ? await req.formData() : await req.text()
  }

  const res = await fetch(url, options)
  const text = await res.text()

  try {
    return NextResponse.json(JSON.parse(text), { status: res.status })
  } catch {
    return NextResponse.json({ error: text }, { status: res.status })
  }
}

export const GET    = handler
export const POST   = handler
export const PUT    = handler
export const DELETE = handler
export const PATCH  = handler