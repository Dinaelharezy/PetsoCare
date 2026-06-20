
// lib/image-utils.ts
export const getImageSrc = (imageUrl?: string): string | null => {
  if (!imageUrl) return null
  
  // لو الصورة من الـ API (تبدأ بـ /Images)
  if (imageUrl.startsWith('/Images') || imageUrl.startsWith('/images')) {
    // استخدم Proxy الصور بدلاً من الاتصال المباشر
    return `/api/proxy-image${imageUrl}`
  }
  

  if (imageUrl.startsWith('http')) {
    // لو من نفس الـ API، استخدم الـ Proxy
    if (imageUrl.includes(process.env.NEXT_PUBLIC_API_URL || '')) {
      const path = imageUrl.replace(process.env.NEXT_PUBLIC_API_URL || '', '')
      return `/api/proxy-image${path}`
    }
    // رابط خارجي
    return imageUrl
  }
  
 
  if (imageUrl.startsWith('/')) {
    return imageUrl
  }
  
  return null
}