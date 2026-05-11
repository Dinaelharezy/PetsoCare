'use client'
// hooks/useRating.ts

import { useState, useEffect } from 'react'

export function useRating() {
  const [submitted,  setSubmitted]  = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error,      setError]      = useState<string | null>(null)
  const [success,    setSuccess]    = useState(false)

  const submitRating = async (value: number): Promise<boolean> => {
    setSubmitting(true)
    setError(null)
    try {
      const res  = await fetch(`/api/proxy/Rating`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ value }),
      })
      const text = await res.text()
      const data = text ? JSON.parse(text) : {}

      if (!res.ok) {
        // 24h cooldown message from backend
        setError(data.error ?? 'Failed to submit rating')
        return false
      }

      setSuccess(true)
      setSubmitted(true)
      return true
    } catch (e: any) {
      setError(e.message)
      return false
    } finally {
      setSubmitting(false)
    }
  }

  return { submitRating, submitting, submitted, success, error }
}

// ── Admin hook ──────────────────────────────────────────────────────
export function useRatingStats() {
  const [average,  setAverage]  = useState<number>(0)
  const [count,    setCount]    = useState<number>(0)
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const [avgRes, cntRes] = await Promise.all([
          fetch(`/api/proxy/Rating/average`),
          fetch(`/api/proxy/Rating/count`),
        ])
        const avg = await avgRes.json()
        const cnt = await cntRes.json()
        setAverage(typeof avg === 'number' ? avg : 0)
        setCount(typeof cnt === 'number' ? cnt : 0)
      } catch (e) {
        console.error('Failed to fetch rating stats', e)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return { average, count, loading }
}