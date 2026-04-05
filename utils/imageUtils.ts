const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

// export const getImageSrc = (src?: string): string | null => {
//   if (!src) return null
//   if (src.startsWith('http')) return src
//   if (src.startsWith('/Images') || src.startsWith('/uploads') || src.startsWith('/api')) {
//     const full = BASE_URL ? `${BASE_URL}${src}` : src
//     // ✅ روّح عن طريق الـ proxy
//     return `/api/image?url=${encodeURIComponent(full)}`
//   }
//   if (src.startsWith('/')) return src
//   return null
// }



export const getImageSrc = (src?: string): string | null => {
  if (!src) return null

  // لو URL كامل من الـ backend - روّحه عن طريق الـ proxy
  if (src.startsWith('http')) {
    return `/api/image?url=${encodeURIComponent(src)}`
  }

  // لو path نسبي من الـ backend
  if (src.startsWith('/Images') || src.startsWith('/uploads') || src.startsWith('/api')) {
    const full = BASE_URL ? `${BASE_URL}${src}` : src
    return `/api/image?url=${encodeURIComponent(full)}`
  }

  // لو صورة محلية في Next.js (public folder)
  if (src.startsWith('/')) return src

  return null
}