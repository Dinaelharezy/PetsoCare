import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'

export async function POST(request: Request) {
  const session = await auth()
  const body = await request.json()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/report/complaint`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...(session?.user?.accessToken
          ? { Authorization: `Bearer ${session.user.accessToken}` }
          : {}),
      },
      body: JSON.stringify(body),
    }
  )

//   if (!response.ok) {
//     const text = await response.text()
//     return NextResponse.json({ error: text }, { status: response.status })
//   }

//   revalidatePath('/')
//   revalidatePath('/admin/dashboard')

//   const data = await response.json()
//   return NextResponse.json({ success: true, data })
// }

// export const dynamic = 'force-dynamic'

if (!response.ok) {
  const text = await response.text()
  return NextResponse.json({ error: text }, { status: response.status })
}

revalidatePath('/')
revalidatePath('/admin/dashboard')

const contentType = response.headers.get('content-type')

let data

if (contentType && contentType.includes('application/json')) {
  data = await response.json()
} else {
  data = await response.text()
}

return NextResponse.json({ success: true, data })
}