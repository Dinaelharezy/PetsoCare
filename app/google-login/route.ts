import { NextResponse } from 'next/server'

// GET /api/auth/google-login
// Redirects the user to the backend Google OAuth URL
export async function GET() {
  const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google-login`
  return NextResponse.redirect(backendUrl)
}