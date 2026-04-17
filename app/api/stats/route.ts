// app/api/stats/route.ts
import { NextResponse } from 'next/server'

const API = process.env.NEXT_PUBLIC_API_URL

export async function GET() {
  const res = await fetch(`${API}/api/stats`, {
    // headers: { 'ngrok-skip-browser-warning': 'true' },
    cache: 'no-store',
  })
  const data = await res.json()
  return NextResponse.json(data)
}