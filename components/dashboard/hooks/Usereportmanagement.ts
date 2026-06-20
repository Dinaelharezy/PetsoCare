'use client'

import { useState, useEffect, useCallback } from 'react'
import { Report } from '../../../types/report'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ReportStatus = 'Pending' | 'Seen' | 'Approved' | 'InProgress' | 'Done' | 'Rejected'
export type ReportType   = 'Bite' | 'DangerousAnimal' | 'Complaint'
export type ReportAction = 'seen' | 'approve' | 'in-progress' | 'done'

// ─── Enum mappers ─────────────────────────────────────────────────────────────

export const mapStatus = (s: any): ReportStatus => {
  if (typeof s === 'string' && isNaN(Number(s))) {
    const map: Record<string, ReportStatus> = {
      Pending: 'Pending', Seen: 'Seen', Approved: 'Approved',
      InProgress: 'InProgress', Done: 'Done', Rejected: 'Rejected',
    }
    return map[s] ?? 'Pending'
  }
  const byIndex: Record<number, ReportStatus> = {
    0: 'Pending', 1: 'Seen', 2: 'Approved', 3: 'InProgress', 4: 'Done', 5: 'Rejected',
  }
  return byIndex[Number(s)] ?? 'Pending'
}

export const mapType = (t: any): ReportType => {
  if (typeof t === 'string' && isNaN(Number(t))) {
    const map: Record<string, ReportType> = {
      Bite: 'Bite', DangerousAnimal: 'DangerousAnimal', Complaint: 'Complaint',
    }
    return map[t] ?? 'Complaint'
  }
  const byIndex: Record<number, ReportType> = {
    0: 'Bite', 1: 'DangerousAnimal', 2: 'Complaint',
  }
  return byIndex[Number(t)] ?? 'Complaint'
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useReportManagement() {
  const [reports,       setReports]       = useState<Report[]>([])
  const [loading,       setLoading]       = useState(true)
  const [error,         setError]         = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [selected,      setSelected]      = useState<Report | null>(null)
  const [filter,        setFilter]        = useState<string>('All')
  const [rejectTarget,  setRejectTarget]  = useState<Report | null>(null)
  const [rejectReason,  setRejectReason]  = useState('')
  const [rejectLoading, setRejectLoading] = useState(false)
  const [toast,         setToast]         = useState<{ msg: string; variant: 'success' | 'danger' } | null>(null)

  // ─── Toast ───────────────────────────────────────────────────────────────

  const showToast = useCallback((msg: string, variant: 'success' | 'danger' = 'danger') => {
    setToast({ msg, variant })
    setTimeout(() => setToast(null), 4000)
  }, [])

  const clearToast = useCallback(() => setToast(null), [])

  // ─── Fetch ───────────────────────────────────────────────────────────────

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/proxy/admin/reports', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to load reports')
      const data = await res.json()
      setReports(
        Array.isArray(data)
          ? data.map((r: any) => ({
              ...r,
              status: mapStatus(r.status),
              type:   mapType(r.type),
            }))
          : []
      )
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchReports() }, [fetchReports])

  // ─── Actions ─────────────────────────────────────────────────────────────

  const doAction = useCallback(async (id: number, action: ReportAction) => {
    setActionLoading(id)
    try {
      const res = await fetch(`/api/proxy/admin/reports/${id}/${action}`, { method: 'PUT' })
      if (!res.ok) throw new Error('Action failed')
      await fetchReports()
      showToast('Report updated successfully', 'success')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'Action failed')
    } finally {
      setActionLoading(null)
    }
  }, [fetchReports, showToast])

  const openReject = useCallback((report: Report) => {
    setRejectTarget(report)
    setRejectReason('')
  }, [])

  const cancelReject = useCallback(() => {
    setRejectTarget(null)
    setRejectReason('')
  }, [])

  const doReject = useCallback(async () => {
    if (!rejectTarget) return
    setRejectLoading(true)
    try {
      const res = await fetch(`/api/proxy/admin/reports/${rejectTarget.id}/reject`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(rejectReason),
      })
      if (!res.ok) throw new Error('Reject failed')
      await fetchReports()
      setRejectTarget(null)
      setRejectReason('')
      setSelected(null)
      showToast('Report rejected', 'success')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'Reject failed')
    } finally {
      setRejectLoading(false)
    }
  }, [rejectTarget, rejectReason, fetchReports, showToast])

  // ─── Derived ─────────────────────────────────────────────────────────────

  const counts: Record<string, number> = {
    All:      reports.length,
    Pending:  reports.filter(r => r.status === 'Pending').length,
    Seen:     reports.filter(r => r.status === 'Seen').length,
    Approved: reports.filter(r => r.status === 'Approved' || r.status === 'InProgress').length,
    Done:     reports.filter(r => r.status === 'Done').length,
    Rejected: reports.filter(r => r.status === 'Rejected').length,
  }

  const filtered = filter === 'All'
    ? reports
    : filter === 'Approved'
      ? reports.filter(r => r.status === 'Approved' || r.status === 'InProgress')
      : reports.filter(r => r.status === filter)

  // Modal always reads fresh data from reports[]
  const freshSelected = selected
    ? (reports.find(r => r.id === selected.id) ?? selected)
    : null

  return {
    // data
    reports,
    loading,
    error,
    filtered,
    counts,
    freshSelected,
    // filter
    filter,
    setFilter,
    // actions
    fetchReports,
    doAction,
    actionLoading,
    // reject
    rejectTarget,
    rejectReason,
    rejectLoading,
    setRejectReason,
    openReject,
    cancelReject,
    doReject,
    // select
    selected,
    setSelected,
    // toast
    toast,
    showToast,
    clearToast,
  }
}