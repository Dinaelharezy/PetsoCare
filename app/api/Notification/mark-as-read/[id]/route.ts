// // app/api/notification/mark-as-read/[id]/route.ts

// import { NextResponse } from 'next/server'
// import { auth } from '@/lib/auth'

// export async function POST(
//   _request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const session = await auth()

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/Notification/mark-as-read/${params.id}`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'ngrok-skip-browser-warning': 'true',
//         ...(session?.user?.accessToken
//           ? { Authorization: `Bearer ${session.user.accessToken}` }
//           : {}),
//       },
//     }
//   )

//   if (!response.ok) {
//     const text = await response.text()
//     return NextResponse.json({ error: text }, { status: response.status })
//   }

//   const contentType = response.headers.get('content-type')
//   let data

//   if (contentType && contentType.includes('application/json')) {
//     data = await response.json()
//   } else {
//     data = await response.text()
//   }

//   return NextResponse.json({ success: true, data })
// }

// export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const session = await auth()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Notification/mark-as-read/${id}`,
    {
      method: 'POST',
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

  const contentType = response.headers.get('content-type')
  let data

  if (contentType && contentType.includes('application/json')) {
    data = await response.json()
  } else {
    data = await response.text()
  }

  return NextResponse.json({ success: true, data })
}

export const dynamic = 'force-dynamic'