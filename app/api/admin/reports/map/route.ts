import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET() {
  const session = await auth()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports/map`,
    {
      method: 'GET',
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
    console.log('reports data:', JSON.stringify(data, null, 2))
  } else {
    data = await response.text()
    console.log('reports data:', JSON.stringify(data, null, 2))
  }
console.log('reports data:', JSON.stringify(data, null, 2))
  return NextResponse.json(data)
}

export const dynamic = 'force-dynamic'