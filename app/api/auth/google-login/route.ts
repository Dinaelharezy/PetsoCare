import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const returnUrl = searchParams.get('returnUrl') ?? `${process.env.NEXTAUTH_URL}/auth/google-success`

  const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google-login?returnUrl=${encodeURIComponent(returnUrl)}`

  return NextResponse.redirect(backendUrl)
}