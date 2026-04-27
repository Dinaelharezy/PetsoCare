
'use client'

import { Shelter } from '../../types/Shelter'
import { useRouter } from 'next/navigation'

interface Props {
  shelter: Shelter
}

export default function ShelterCard({ shelter }: Props) {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/main/Shelters/${shelter.id}`)}
      className="article-card animate-card"
      style={{ cursor: 'pointer' }}
    >
      <div className="article-image">
        <div style={{ background: '#f3f3f3', width: '100%', height: '100%' }} />
      </div>

      <div className="article-content">
        <h3>{shelter.name}</h3>
        <span>{shelter.governorate}</span>

        <p>{shelter.address}</p>
        <p>Capacity: {shelter.capacity ?? 'N/A'}</p>
        <p>{shelter.phone}</p>
      </div>
    </div>
  )
}