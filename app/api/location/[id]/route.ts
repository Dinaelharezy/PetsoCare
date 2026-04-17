// app/api/location/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

// DELETE /api/location/{id}
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const res = await fetch(`${BASE_URL}/api/location/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to delete location' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('DELETE /api/location/[id] error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}