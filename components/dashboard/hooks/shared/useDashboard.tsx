import { useState, useCallback } from 'react'

/**
 * useDashboard — shared UI state logic for dashboard management pages.
 * Handles: flash messages, delete confirmation flow.
 */
export function useDashboard() {
  // ─── Flash message ─────────────────────────────────────────────────────────
  const [flash, setFlash] = useState('')

  const showFlash = useCallback((msg: string, duration = 3000) => {
    setFlash(msg)
    setTimeout(() => setFlash(''), duration)
  }, [])

  const clearFlash = useCallback(() => setFlash(''), [])

  // ─── Delete confirm ────────────────────────────────────────────────────────
  const [deletingId, setDeletingId] = useState<number | string | null>(null)

  const requestDelete = useCallback((id: number | string) => setDeletingId(id), [])

  const cancelDelete = useCallback(() => setDeletingId(null), [])

  const confirmDelete = useCallback(
    async (fn: (id: number | string) => Promise<void>) => {
      if (deletingId == null) return
      await fn(deletingId)
      setDeletingId(null)
    },
    [deletingId]
  )

  return {
    flash,
    showFlash,
    clearFlash,
    deletingId,
    requestDelete,
    cancelDelete,
    confirmDelete,
  }
}