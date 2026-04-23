// app/api/ratings/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, rating, feedback, timestamp } = body

    // Validate
    if (!action || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Invalid rating data' },
        { status: 400 }
      )
    }

    // Here you would save to your database
    // Example: await db.ratings.create({ data: { action, rating, feedback, timestamp } })
    
    console.log('Rating saved:', { action, rating, feedback, timestamp })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving rating:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}