// import { NextResponse } from 'next/server'
// import { auth } from '@/lib/auth'

// export async function PUT(_req: Request, { params }: { params: { id: string } }) {
//   const session = await auth()

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports/${params.id}/approve`,
//     {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'ngrok-skip-browser-warning': 'true',
//         ...(session?.user?.accessToken
//           ? { Authorization: `Bearer ${session.user.accessToken}` }
//           : {}),
//       },
//     }
//   )

//   const text = await response.text()
//   return NextResponse.json({ message: text }, { status: response.status })
// }

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function PUT(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports/${params.id}/approve`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...(session?.user?.accessToken
          ? { Authorization: `Bearer ${session.user.accessToken}` }
          : {}),
      },
    }
  )

  const text = await response.text()
  return NextResponse.json({ message: text }, { status: response.status })
}