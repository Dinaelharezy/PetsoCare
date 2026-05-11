// const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''


// // export const getImageSrc = (src?: string): string | null => {
// //   if (!src) return null

// //   // لو URL كامل من الـ backend - روّحه عن طريق الـ proxy
// //   if (src.startsWith('http')) {
// //     return `/api/image?url=${encodeURIComponent(src)}`
// //   }
// //   if (
// //     src.startsWith('/Images') ||
// //     src.startsWith('/images') ||
// //     src.startsWith('/uploads') ||
// //     src.startsWith('/api')
// //   ) {
// //     const full = BASE_URL ? `${BASE_URL}${src}` : src
// //     return `/api/image?url=${encodeURIComponent(full)}`
// //   }
// //   // لو path نسبي من الـ backend
// //   if (src.startsWith('/Images') || src.startsWith('/uploads') || src.startsWith('/api')) {
// //     const full = BASE_URL ? `${BASE_URL}${src}` : src
// //     return `/api/image?url=${encodeURIComponent(full)}`
// //   }

// //     if (src.includes('Images/') || src.includes('uploads/')) {
// //     const full = BASE_URL ? `${BASE_URL}/${src}` : `/${src}`
// //     return `/api/image?url=${encodeURIComponent(full)}`
// //   }
// //   // لو صورة محلية في Next.js (public folder)
// //   if (src.startsWith('/')) return src

// //   return null
// // }

// export const getImageSrc = (src?: string): string | null => {
//   if (!src) return null

//   // لو URL كامل - رجعيه مباشرة بدون proxy
//   if (src.startsWith('http')) {
//     return src
//   }

//   // لو path نسبي
//   if (src.startsWith('/')) {
//     return `${process.env.NEXT_PUBLIC_API_URLمل}${src}`
//   }

//   return null
// }
// lib/image-utils.ts
export const getImageSrc = (imageUrl?: string): string | null => {
  if (!imageUrl) return null
  
  // لو الصورة من الـ API (تبدأ بـ /Images)
  if (imageUrl.startsWith('/Images') || imageUrl.startsWith('/images')) {
    // استخدم Proxy الصور بدلاً من الاتصال المباشر
    return `/api/proxy-image${imageUrl}`
  }
  
  // لو رابط كامل
  if (imageUrl.startsWith('http')) {
    // لو من نفس الـ API، استخدم الـ Proxy
    if (imageUrl.includes(process.env.NEXT_PUBLIC_API_URL || '')) {
      const path = imageUrl.replace(process.env.NEXT_PUBLIC_API_URL || '', '')
      return `/api/proxy-image${path}`
    }
    // رابط خارجي
    return imageUrl
  }
  
  // لو صورة محلية في public
  if (imageUrl.startsWith('/')) {
    return imageUrl
  }
  
  return null
}