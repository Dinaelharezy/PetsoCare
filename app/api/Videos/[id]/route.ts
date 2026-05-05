

// import { NextResponse } from 'next/server'
// import { auth } from '@/lib/auth'

// const API_URL = process.env.NEXT_PUBLIC_API_URL

// async function getToken() {
//   const session = await auth()
//   return (session?.user as any)?.accessToken
// }

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const token = await getToken()
    
//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }
    
//     const res = await fetch(`${API_URL}/api/Videos/${params.id}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'ngrok-skip-browser-warning': 'true',
//       },
//       cache: 'no-store',
//     })
    
//     const data = await res.json()
//     return NextResponse.json(data, { status: res.status })
//   } catch (error) {
//     console.error('Error fetching video:', error)
//     return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 })
//   }
// }

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const token = await getToken()
    
//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }
    
//     const body = await request.json()
    
//     const res = await fetch(`${API_URL}/api/Videos/${params.id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'ngrok-skip-browser-warning': 'true',
//       },
//       body: JSON.stringify(body),
//     })
    
//     const data = await res.json()
//     return NextResponse.json(data, { status: res.status })
//   } catch (error) {
//     console.error('Error updating video:', error)
//     return NextResponse.json({ error: 'Failed to update video' }, { status: 500 })
//   }
// }



// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const token = await getToken()
//     const { id } = params
    
//     console.log('🗑️ Deleting video with ID:', id)
    
//     if (!token) {
//       console.log('❌ No token found')
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }
    
//     const backendUrl = `${API_URL}/api/Videos/${id}`
//     console.log('📡 Calling backend:', backendUrl)
    
//     const res = await fetch(backendUrl, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'ngrok-skip-browser-warning': 'true',
//       },
//     })
    
//     console.log('📡 Backend response status:', res.status)
    
//     if (res.status === 404) {
//       return NextResponse.json({ error: `Video with ID ${id} not found in backend` }, { status: 404 })
//     }
    
//     if (res.status === 204 || res.status === 200) {
//       return NextResponse.json({ message: 'Video deleted successfully' }, { status: 200 })
//     }
    
//     const data = await res.json()
//     return NextResponse.json(data, { status: res.status })
    
//   } catch (error) {
//     console.error('❌ Error deleting video:', error)
//     return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 })
//   }
// }

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function getToken() {
  const session = await auth()
  return (session?.user as any)?.accessToken
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const token = await getToken()

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const res = await fetch(`${API_URL}/api/Videos/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
      cache: 'no-store',
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error('Error fetching video:', error)
    return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const token = await getToken()

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const res = await fetch(`${API_URL}/api/Videos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error('Error updating video:', error)
    return NextResponse.json({ error: 'Failed to update video' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    console.log('🗑️ Deleting video with ID:', id)

    const token = await getToken()

    if (!token) {
      console.log('❌ No token found')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const backendUrl = `${API_URL}/api/Videos/${id}`
    console.log('📡 Calling backend:', backendUrl)

    const res = await fetch(backendUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
    })

    console.log('📡 Backend response status:', res.status)

    if (res.status === 404) {
      return NextResponse.json({ error: `Video with ID ${id} not found in backend` }, { status: 404 })
    }

    if (res.status === 204 || res.status === 200) {
      return NextResponse.json({ message: 'Video deleted successfully' }, { status: 200 })
    }

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    console.error('❌ Error deleting video:', error)
    return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 })
  }
}