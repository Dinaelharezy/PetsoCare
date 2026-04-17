// app/api/location/route.ts
import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

// GET /api/location?type=...
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  try {
    const url = type
      ? `${BASE_URL}/api/location?type=${encodeURIComponent(type)}`
      : `${BASE_URL}/api/location`

    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch locations' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('GET /api/location error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/location
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const res = await fetch(`${BASE_URL}/api/location`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to add location' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('POST /api/location error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}