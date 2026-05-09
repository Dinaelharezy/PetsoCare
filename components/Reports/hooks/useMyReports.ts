
import { useState, useEffect } from 'react'
import { Report, ReportType, ReportStatus } from '@/types/report'

// ✅ تحويل status من رقم إلى string
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

// ✅ تحويل type من رقم إلى string
const mapType = (t: number): ReportType => {
  const typeMap: Record<number, ReportType> = {
    0: 'Bite',
    1: 'DangerousAnimal',
    2: 'Complaint',
  }
  return typeMap[t] ?? 'Complaint'
}

export function useMyReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/report/my-reports`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('📥 Raw reports data:', data)
        
        // ✅ تحويل البيانات من الأرقام إلى الـ enums
        const mappedReports = (Array.isArray(data) ? data : []).map((r: any) => ({
          ...r,
          status: mapStatus(r.status),
          type: mapType(r.type),
        }))
        
        console.log('🔄 Mapped reports:', mappedReports)
        setReports(mappedReports)
      } catch (err) {
        console.error('Error fetching reports:', err)
        setError(err instanceof Error ? err.message : 'Failed to load reports')
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  return { reports, loading, error }
}
