
'use client'
import { Clinic } from '../../../types/Clinic'
import Link from 'next/link'
import { getImageSrc } from '@/utils/imageUtils'
interface ClinicsCardProps {
  Clinic: Clinic
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