

'use client'
import { Clinic } from '../../types/Clinic'
import Link from 'next/link'

interface ClinicsCardProps {
  Clinic : Clinic
}


export default function Card({ Clinic }: ClinicsCardProps) {
  return (
    <Link href={`/main/Clinics/${Clinic.id}`} className="article-card animate-card">
      <div className="article-image">
        {Clinic.imageUrl ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${Clinic.imageUrl}`}
            alt={Clinic.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ background: 'linear-gradient(135deg, #f0f0f0, #f8f8f8)', width: '100%', height: '100%' }} />
        )}
      </div>
      <div className="article-content">
        <span className="article-category">{Clinic.address}</span>
        <h3 className="article-title">{Clinic.governorate}</h3>
        <p className="article-excerpt">{Clinic.workingDays}</p>
        <p className="article-excerpt">{Clinic.workingHours}</p>
        <div className="article-meta">
        </div>
      </div>
    </Link>
  )
}