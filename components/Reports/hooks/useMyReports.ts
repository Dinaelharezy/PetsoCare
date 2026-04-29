'use client'
// hooks/useMyReports.ts
import { useEffect, useState } from 'react'

interface Report {
  id: number
  type: string
  status: string
}

export function useMyReports() {
  const [reports, setReports]   = useState<Report[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/report/my-reports')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch reports')
        return res.json()
      })
      .then(data => setReports(Array.isArray(data) ? data : []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { reports, loading, error }
}