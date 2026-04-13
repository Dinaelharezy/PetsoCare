// // app/api/admin/reports/[id]/[action]/route.ts
// import { NextResponse } from 'next/server'
// import { revalidatePath } from 'next/cache'
// import { auth } from '@/lib/auth'

// const ALLOWED_ACTIONS = ['seen', 'approve', 'reject', 'in-progress', 'done']

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string; action: string } }
// ) {
//   const { id, action } = params

//   if (!ALLOWED_ACTIONS.includes(action)) {
//     return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
//   }

//   const session = await auth()

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports/${id}/${action}`,
//     {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'ngrok-skip-browser-warning': 'true',
//         ...(session?.user?.accessToken
//           ? { Authorization: `Bearer ${session.user.accessToken}` }
//           : {}),
//       },
//        body: JSON.stringify({})
//     }
//   )

//   if (!response.ok) {
//     const text = await response.text()
//     return NextResponse.json({ error: text }, { status: response.status })
//   }

//   revalidatePath('/admin/dashboard')
//   revalidatePath('/admin/reports')

//   const contentType = response.headers.get('content-type')
//   const data = contentType?.includes('application/json')
//     ? await response.json()
//     : await response.text()

//   return NextResponse.json({ success: true, data })
// }

// import { NextResponse } from 'next/server'
// import { revalidatePath } from 'next/cache'
// import { auth } from '@/lib/auth'

// const ALLOWED_ACTIONS = ['seen', 'approve', 'reject', 'in-progress', 'done']

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string; action: string } }
// ) {
//   const { id, action } = params
// const body = await request.text()
//   // ✅ Validate action
//   if (!ALLOWED_ACTIONS.includes(action)) {
//     return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
//   }

//   try {
//     const session = await auth()
// // /api/admin/reports/[id]/[action]/route.ts  — update the fetch call
// const response = await fetch(
//   `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports/${id}/${action}`,
//   {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       'ngrok-skip-browser-warning': 'true',
//       ...(session?.user?.accessToken
//         ? { Authorization: `Bearer ${session.user.accessToken}` }
//         : {}),
//     },
//     // Forward whatever body was sent from the frontend (reason for reject, or empty for others)
//     // body: request.body ? await request.text() : JSON.stringify({}),
//     body: body || JSON.stringify({})  }
// )

//     // 🔥 هنا أهم تعديل: نقرأ الرد مرة واحدة بس
//     const text = await response.text()

//     let data
//     try {
//       data = JSON.parse(text)
//     } catch {
//       data = text
//     }

//     // ❌ لو فيه error من الباك
//     if (!response.ok) {
//       console.log('❌ BACKEND ERROR:', data) // 👈 ده اللي هيكشفلك المشكلة
//       return NextResponse.json(
//         { error: data || 'Request failed' },
//         { status: response.status }
//       )
//     }

//     // ✅ نجاح
//     revalidatePath('/admin/dashboard')
//     revalidatePath('/admin/reports')

//     return NextResponse.json({ success: true, data })

//   } catch (error: any) {
//     console.log('❌ SERVER ERROR:', error)
//     return NextResponse.json(
//       { error: error.message || 'Something went wrong' },
//       { status: 500 }
//     )
//   }
// }

import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'

const ALLOWED_ACTIONS = ['seen', 'approve', 'reject', 'in-progress', 'done']

export async function PUT(
  request: Request,
  { params }: { params: { id: string; action: string } }
) {
  const { id, action } = params

  // validate action
  if (!ALLOWED_ACTIONS.includes(action)) {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  try {
    const session = await auth()

    // 👇 backend expects plain string (NOT object)
    const reason = await request.text()

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reports/${id}/${action}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          ...(session?.user?.accessToken && {
            Authorization: `Bearer ${session.user.accessToken}`,
          }),
        },
        body: reason, // ✅ important fix
      }
    )

    const text = await response.text()

    let data: any
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }

    if (!response.ok) {
      console.log('❌ BACKEND ERROR:', data)
      return NextResponse.json(
        { error: data },
        { status: response.status }
      )
    }

    // refresh pages
    revalidatePath('/admin/dashboard')
    revalidatePath('/admin/reports')

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error: any) {
    console.log('❌ SERVER ERROR:', error)

    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    )
  }
}

