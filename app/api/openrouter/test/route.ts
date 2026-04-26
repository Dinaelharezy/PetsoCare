import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    status: 'OK', 
    message: 'OpenRouter API is configured',
    hasApiKey: !!process.env.OPENROUTER_API_KEY
  })
}