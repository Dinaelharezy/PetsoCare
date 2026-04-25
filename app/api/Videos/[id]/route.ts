
// import { NextResponse } from 'next/server'
// import { auth } from '../../../../lib/auth'

// async function getToken() {
//   const session = await auth()
//   return (session?.user as any)?.accessToken

  
// const API_URL = process.env.NEXT_PUBLIC_API_URL
// // // تخزين مؤقت للبيانات (نفس البيانات اللي فوق)
// // let videos = [
// //   {
// //     id: 1,
// //     titleAr: "ماذا تفعل إذا تعرض شخص لعضة أو خدش من كلب",
// //     titleEn: "What to do if someone is bitten or scratched by a dog",
// //     url: "https://www.youtube.com/embed/_hchkrLTr98",
// //     source: "World Health Organization"
// //   },
// //   {
// //     id: 2,
// //     titleAr: "كيف تبقى آمناً حول الكلاب؟",
// //     titleEn: "How to stay safe around dogs?",
// //     url: "https://www.youtube.com/embed/suc6FZenGVw",
// //     source: "World Health Organization"
// //   },
// //   {
// //     id: 3,
// //     titleAr: "الوقاية من داء الكلب - معلومات مهمة",
// //     titleEn: "Rabies Prevention - Important Information",
// //     url: "https://www.youtube.com/embed/_hchkrLTr98",
// //     source: "WHO"
// //   },
// //   {
// //     id: 4,
// //     titleAr: "أعراض داء الكلب وكيفية التعامل معها",
// //     titleEn: "Rabies Symptoms and How to Deal with Them",
// //     url: "https://www.youtube.com/embed/suc6FZenGVw",
// //     source: "CDC"
// //   },
// //   {
// //     id: 5,
// //     titleAr: "تطعيم الكلاب وأهميته",
// //     titleEn: "Dog Vaccination and Its Importance",
// //     url: "https://www.youtube.com/embed/_hchkrLTr98",
// //     source: "CDC"
// //   },
// //   {
// //     id: 6,
// //     titleAr: "كيف تحمي نفسك وعائلتك من داء الكلب",
// //     titleEn: "How to Protect Yourself and Your Family from Rabies",
// //     url: "https://www.youtube.com/embed/suc6FZenGVw",
// //     source: "CDC"
// //   }
// // ]

// // // GET /api/Videos/{id} - جلب فيديو واحد
// // export async function GET(
// //   request: Request,
// //   { params }: { params: { id: string } }
// // ) {
// //   const video = videos.find(v => v.id === parseInt(params.id))
  
// //   if (!video) {
// //     return NextResponse.json({ error: 'Video not found' }, { status: 404 })
// //   }
  
// //   return NextResponse.json(video, { status: 200 })
// // }

// // // PUT /api/Videos/{id} - تحديث فيديو
// // export async function PUT(
// //   request: Request,
// //   { params }: { params: { id: string } }
// // ) {
// //   try {
// //     const body = await request.json()
// //     const index = videos.findIndex(v => v.id === parseInt(params.id))
    
// //     if (index === -1) {
// //       return NextResponse.json({ error: 'Video not found' }, { status: 404 })
// //     }
    
// //     videos[index] = {
// //       ...videos[index],
// //       titleAr: body.titleAr || videos[index].titleAr,
// //       titleEn: body.titleEn || videos[index].titleEn,
// //       url: body.url || videos[index].url,
// //       source: body.source || videos[index].source
// //     }
    
// //     return NextResponse.json(videos[index], { status: 200 })
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Failed to update video' }, { status: 500 })
// //   }
// // }

// // // DELETE /api/Videos/{id} - حذف فيديو
// // export async function DELETE(
// //   request: Request,
// //   { params }: { params: { id: string } }
// // ) {
// //   const index = videos.findIndex(v => v.id === parseInt(params.id))
  
// //   if (index === -1) {
// //     return NextResponse.json({ error: 'Video not found' }, { status: 404 })
// //   }
  
// //   videos.splice(index, 1)
// //   return NextResponse.json({ message: 'Video deleted successfully' }, { status: 200 })
// // }



// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   console.log('🔴 GET request received for ID:', params.id)
  
//   try {
//     const session = await auth()
//     const token = (session?.user as any)?.accessToken
    
//     console.log('🔴 Token exists:', !!token)
    
//     // ✅ جرب تجيب من mock data الأول (للتأكد)
//     const mockVideos = [
//       { id: 1, titleAr: "ماذا تفعل إذا تعرض شخص لعضة من كلب", titleEn: "What to do if bitten by a dog", url: "https://www.youtube.com/embed/_hchkrLTr98", source: "WHO" },
//       { id: 2, titleAr: "كيف تبقى آمناً حول الكلاب", titleEn: "How to stay safe around dogs", url: "https://www.youtube.com/embed/suc6FZenGVw", source: "WHO" },
//       { id: 3, titleAr: "الوقاية من داء الكلب", titleEn: "Rabies Prevention", url: "https://www.youtube.com/embed/_hchkrLTr98", source: "WHO" },
//       { id: 4, titleAr: "أعراض داء الكلب", titleEn: "Rabies Symptoms", url: "https://www.youtube.com/embed/suc6FZenGVw", source: "CDC" },
//       { id: 5, titleAr: "تطعيم الكلاب", titleEn: "Dog Vaccination", url: "https://www.youtube.com/embed/_hchkrLTr98", source: "CDC" },
//       { id: 6, titleAr: "كيف تحمي نفسك من داء الكلب", titleEn: "How to protect yourself from rabies", url: "https://www.youtube.com/embed/suc6FZenGVw", source: "CDC" },
//       { id: 7, titleAr: "داء الكلب - معلومات مهمة", titleEn: "Rabies - Important Information", url: "https://www.youtube.com/embed/_hchkrLTr98", source: "WHO" },
//       { id: 8, titleAr: "الكلاب والتطعيم", titleEn: "Dogs and Vaccination", url: "https://www.youtube.com/embed/suc6FZenGVw", source: "WHO" },
//     ]
    
//     const id = parseInt(params.id)
//     const video = mockVideos.find(v => v.id === id)
    
//     if (!video) {
//       console.log('🔴 Video not found for ID:', id)
//       return NextResponse.json({ error: 'Video not found' }, { status: 404 })
//     }
    
//     console.log('🔴 Returning video:', video.titleAr)
//     return NextResponse.json(video, { status: 200 })
    
//   } catch (error) {
//     console.error('🔴 API Error:', error)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }

// // GET /api/Videos/{id} - جلب فيديو واحد
// // export async function GET(
// //   request: Request,
// //   { params }: { params: { id: string } }
// // ) {
// //   try {
// //     const token = await getToken()

// //     const res = await fetch(`${API_URL}/api/Videos/${params.id}`, {
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': `Bearer ${token}`,
// //         'ngrok-skip-browser-warning': 'true',
// //       },
// //       cache: 'no-store',
// //     })

// //     if (!res.ok) {
// //       return NextResponse.json({ error: 'Video not found' }, { status: res.status })
// //     }

// //     const data = await res.json()
// //     return NextResponse.json(data, { status: 200 })
// //   } catch (error) {
// //     return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 })
// //   }
// // }

// // PUT /api/Videos/{id} - تحديث فيديو
// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const token = await getToken()
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
//     return NextResponse.json({ error: 'Failed to update video' }, { status: 500 })
//   }
// }

// // DELETE /api/Videos/{id} - حذف فيديو
// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const token = await getToken()

//     const res = await fetch(`${API_URL}/api/Videos/${params.id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'ngrok-skip-browser-warning': 'true',
//       },
//     })

//     if (res.status === 204) {
//       return NextResponse.json({ message: 'Video deleted successfully' }, { status: 200 })
//     }

//     const data = await res.json()
//     return NextResponse.json(data, { status: res.status })
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 })
//   }
// }}

// import { NextResponse } from 'next/server'
// import { auth } from '../../../../lib/auth'

// const API_URL = process.env.NEXT_PUBLIC_API_URL

// async function getToken() {
//   const session = await auth()
//   return (session?.user as any)?.accessToken
// }

// // ✅ GET /api/Videos/{id} - جلب فيديو واحد من الـ API الحقيقي
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

//     if (!res.ok) {
//       return NextResponse.json({ error: 'Video not found' }, { status: res.status })
//     }

//     const data = await res.json()
//     return NextResponse.json(data, { status: 200 })
//   } catch (error) {
//     console.error('Error fetching video:', error)
//     return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 })
//   }
// }

// // ✅ PUT /api/Videos/{id} - تحديث فيديو
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

// // ✅ DELETE /api/Videos/{id} - حذف فيديو
// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const token = await getToken()

//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }

//     const res = await fetch(`${API_URL}/api/Videos/${params.id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'ngrok-skip-browser-warning': 'true',
//       },
//     })

//     if (res.status === 204) {
//       return NextResponse.json({ message: 'Video deleted successfully' }, { status: 200 })
//     }

//     const data = await res.json()
//     return NextResponse.json(data, { status: res.status })
//   } catch (error) {
//     console.error('Error deleting video:', error)
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
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken()
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const res = await fetch(`${API_URL}/api/Videos/${params.id}`, {
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
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken()
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    
    const res = await fetch(`${API_URL}/api/Videos/${params.id}`, {
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

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const token = await getToken()
    
//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }
    
//     const res = await fetch(`${API_URL}/api/Videos/${params.id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'ngrok-skip-browser-warning': 'true',
//       },
//     })
    
//     if (res.status === 204) {
//       return NextResponse.json({ message: 'Video deleted successfully' }, { status: 200 })
//     }
    
//     const data = await res.json()
//     return NextResponse.json(data, { status: res.status })
//   } catch (error) {
//     console.error('Error deleting video:', error)
//     return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 })
//   }
// }


//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const token = await getToken()
    
//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }
    
//     const res = await fetch(`${API_URL}/api/Videos/${params.id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'ngrok-skip-browser-warning': 'true',
//       },
//     })
    
//     if (res.status === 204) {
//       return NextResponse.json({ message: 'Video deleted successfully' }, { status: 200 })
//     }
    
//     const data = await res.json()
//     return NextResponse.json(data, { status: res.status })
//   } catch (error) {
//     console.error('Error deleting video:', error)
//     return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 })
//   }
// }


export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken()
    const { id } = params
    
    console.log('🗑️ Deleting video with ID:', id)
    
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
