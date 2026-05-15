
// import { useState, useEffect } from 'react'
// import { Report, ReportType, ReportStatus } from '@/types/report'
// import { useSession } from 'next-auth/react'
// // ✅ تحويل status من رقم إلى string
// const mapStatus = (s: number): ReportStatus => {
//   const statusMap: Record<number, ReportStatus> = {
//     0: 'Pending',
//     1: 'Seen',
//     2: 'Approved',
//     3: 'InProgress',
//     4: 'Done',
//     5: 'Rejected',
//   }
//   return statusMap[s] ?? 'Pending'
// }

// // ✅ تحويل type من رقم إلى string
// const mapType = (t: number): ReportType => {
//   const typeMap: Record<number, ReportType> = {
//     0: 'Bite',
//     1: 'DangerousAnimal',
//     2: 'Complaint',
//   }
//   return typeMap[t] ?? 'Complaint'
// }

// export function useMyReports() {
//   const [reports, setReports] = useState<Report[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
// const { data: session } = useSession()
//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         setLoading(true)
//   // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/report/my-reports`)
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/report/my-reports`, {
//   headers: {
//       'Authorization': `Bearer ${(session as any)?.accessToken}`,
//     'Content-Type': 'application/json',
//   }
// })
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }
        
//         const data = await response.json()
//         console.log('📥 Raw reports data:', data)
        
//         // ✅ تحويل البيانات من الأرقام إلى الـ enums
//         const mappedReports = (Array.isArray(data) ? data : []).map((r: any) => ({
//           ...r,
//           status: mapStatus(r.status),
//           type: mapType(r.type),
//         }))
        
//         console.log('🔄 Mapped reports:', mappedReports)
//         setReports(mappedReports)
//       } catch (err) {
//         console.error('Error fetching reports:', err)
//         setError(err instanceof Error ? err.message : 'Failed to load reports')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchReports()
//   }, [])
// const fetchReports = async () => {
//   console.log('🔑 Session:', session)
//   console.log('🔑 Token:', session?.user?.accessToken)
//   // ...
// }
//   return { reports, loading, error }
// // }
// import { useState, useEffect } from 'react'
// import { Report, ReportType, ReportStatus } from '@/types/report'
// import { useSession } from 'next-auth/react'
// import { apiUrl } from '@/lib/api'
// const mapStatus = (s: number): ReportStatus => {
//   const statusMap: Record<number, ReportStatus> = {
//     0: 'Pending',
//     1: 'Seen',
//     2: 'Approved',
//     3: 'InProgress',
//     4: 'Done',
//     5: 'Rejected',
//   }
//   return statusMap[s] ?? 'Pending'
// }

// const mapType = (t: number): ReportType => {
//   const typeMap: Record<number, ReportType> = {
//     0: 'Bite',
//     1: 'DangerousAnimal',
//     2: 'Complaint',
//   }
//   return typeMap[t] ?? 'Complaint'
// }

// export function useMyReports() {
//   const { data: session } = useSession()
//   const token = session?.user?.accessToken  // ✅ الصح

//   const [reports, setReports] = useState<Report[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error,   setError]   = useState<string | null>(null)

//   useEffect(() => {
//     if (!token) return  // ✅ استنى الـ token

//     const fetchReports = async () => {
//       try {
//         setLoading(true)

//         // ✅ بيبعت للـ Next.js API route مش للـ backend مباشرة
//         const response = await fetch(apiUrl(`report/my-reports`))

//         if (response.status === 401) {
//           setError('Unauthorized')
//           return
//         }

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }

//         const data = await response.json()

//         const mappedReports = (Array.isArray(data) ? data : []).map((r: any) => ({
//           ...r,
//           status: mapStatus(r.status),
//           type:   mapType(r.type),
//         }))

//         setReports(mappedReports)
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to load reports')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchReports()
//   }, [token])  

//   return { reports, loading, error }
// }

import { useState, useEffect } from 'react'
import { Report, ReportType, ReportStatus } from '@/types/report'
import { useSession } from 'next-auth/react'
import { apiUrl } from '@/lib/api'

const mapStatus = (s: number): ReportStatus => {
  const statusMap: Record<number, ReportStatus> = {
    0: 'Pending',
    1: 'Seen',
    2: 'Approved',
    3: 'InProgress',
    4: 'Done',
    5: 'Rejected',
  }
  return statusMap[s] ?? 'Pending'
}

const mapType = (t: number): ReportType => {
  const typeMap: Record<number, ReportType> = {
    0: 'Bite',
    1: 'DangerousAnimal',
    2: 'Complaint',
  }
  return typeMap[t] ?? 'Complaint'
}

const mapReport = (r: any): Report => ({
  id:            r.id,
  type:          mapType(r.type),
  status:        mapStatus(r.status),
  name:          r.name,
  phone:         r.phone,
  governorate:   r.governorate,
  district:      r.district,
  adminResponse: r.adminResponse,
  latitude:      r.latitude,
  longitude:     r.longitude,

  biteReport: r.type === 0 && r.details ? {
    animalType:       r.details.animalType       ?? '',
    exposureType:     r.details.exposureType     ?? '',
    severity:         r.details.severity         ?? '',
    exposureDateTime: r.details.exposureDateTime ?? '',
    locationCity:     r.details.locationCity     ?? '',
    bodyLocations:    r.details.bodyLocations    ?? '[]',
    initialActions:   r.details.initialActions   ?? '[]',
    otherBodyLocation: r.details.otherBodyLocation,
    otherAction:      r.details.otherAction,
  } : undefined,

  dangerousAnimalReport: r.type === 1 && r.details ? {
    animalType:       r.details.animalType    ?? '',
    reportDate:       r.details.exposureDateTime ?? r.details.reportDate ?? '',
    locationCity:     r.details.locationCity  ?? '',
    selectedSymptoms: r.details.symptoms      ?? r.details.selectedSymptoms ?? '[]',
    otherSymptom:     r.details.otherSymptom,
  } : undefined,

  complaintReport: r.type === 2 && r.details ? {
    email:   r.details.email   ?? '',
    subject: r.details.subject ?? '',
    message: r.details.message ?? '',
    urgency: r.details.urgency ?? '',
  } : undefined,
})

export function useMyReports() {
  const { data: session } = useSession()
  const token = session?.user?.accessToken

  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    if (!token) return

    const fetchReports = async () => {
      try {
        setLoading(true)

        const response = await fetch(apiUrl('report/my-reports'), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
        })

        if (response.status === 401) { setError('Unauthorized'); return }
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        const data = await response.json()
        setReports((Array.isArray(data) ? data : []).map(mapReport))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load reports')
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [token])

  return { reports, loading, error }
}