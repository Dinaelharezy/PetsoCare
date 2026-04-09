

// 'use client'
// import { Clinic } from '../../types/Clinic'
// import Link from 'next/link'

// interface ClinicsCardProps {
//   Clinic : Clinic
// }

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

// const getImageSrc = (src?: string): string | null => {
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
// export default function Card({ Clinic }: ClinicsCardProps) {
//   return (
//     <Link href={`/main/Clinics/${Clinic.id}`} className="article-card animate-card">
//       <div className="article-image">
//         {Clinic.imageUrl ? (
//           <img
//             src={`${process.env.NEXT_PUBLIC_API_URL}${Clinic.imageUrl}`}
//             alt={Clinic.name}
//             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//           />
//         ) : (
//           <div style={{ background: 'linear-gradient(135deg, #f0f0f0, #f8f8f8)', width: '100%', height: '100%' }} />
//         )}
//       </div>
//       <div className="article-content">
//         <span className="article-category">{Clinic.address}</span>
//         <h3 className="article-title">{Clinic.governorate}</h3>
//         <p className="article-excerpt">{Clinic.workingDays}</p>
//         <p className="article-excerpt">{Clinic.workingHours}</p>
//         <div className="article-meta">
//         </div>
//       </div>
//     </Link>
//   )
// }

'use client'
import { Clinic } from '../../types/Clinic'
import Link from 'next/link'

interface ClinicsCardProps {
  Clinic: Clinic
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

const getImageSrc = (src?: string): string | null => {
  if (!src) return null
  if (src.startsWith('http')) return src
  if (src.startsWith('/Images') || src.startsWith('/uploads') || src.startsWith('/api')) {
    const full = BASE_URL ? `${BASE_URL}${src}` : src
    return `/api/image?url=${encodeURIComponent(full)}`
  }
  if (src.startsWith('/')) return src
  return null
}

export default function Card({ Clinic }: ClinicsCardProps) {
  return (
    <Link href={`/main/Clinics/${Clinic.id}`} className="article-card animate-card">
      <div className="article-image">
        {getImageSrc(Clinic.imageUrl) ? (
          <img
            src={getImageSrc(Clinic.imageUrl)!}
            alt={Clinic.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ background: 'linear-gradient(135deg, #f0f0f0, #f8f8f8)', width: '100%', height: '100%' }} />
        )}
      </div>
      <div className="article-content">
             <h3 className="article-title">{Clinic.name}</h3>
        <span className="article-category">{Clinic.address}</span>
        <h5 className="article-title">{Clinic.governorate}</h5>
        <p className="article-excerpt">{Clinic.workingDays}</p>
        <p className="article-excerpt">{Clinic.workingHours}</p>
        <div className="article-meta"></div>
      </div>
    </Link>
  )
}