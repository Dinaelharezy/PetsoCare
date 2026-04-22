// 'use client'
// // hooks/useVaccines.ts

// import { useState, useEffect, useCallback } from 'react'

// export interface Vaccine {
//   id: string
//   name: string
//   pet: string
//   date: string        // ISO string
//   reminder: boolean
//   completed: boolean
// }

// export interface CreateVaccineDto {
//   name: string
//   pet: string
//   date: string
//   reminder: boolean
// }

// export function useVaccines() {
//   const [vaccines, setVaccines]   = useState<Vaccine[]>([])
//   const [loading, setLoading]     = useState(true)
//   const [error, setError]         = useState('')
//   const [submitting, setSubmitting] = useState(false)

//   const fetchVaccines = useCallback(async () => {
//     try {
//       setLoading(true)
//       const res = await fetch('/api/vaccine', { cache: 'no-store' })
//       if (!res.ok) throw new Error('Failed to fetch vaccines')
//       const data = await res.json()
//       // normalize field names: backend returns Pascal-case from C#
//      const normalized: Vaccine[] = (Array.isArray(data) ? data : []).map((v: any) => ({
//   id:        v.id        ?? v.Id,
//   name:      v.name      ?? v.Name      ?? '',
//   pet:       v.pet       ?? v.Pet       ?? '',
//   date:      v.startDate ?? v.StartDate ?? '', // ✅ FIX
//   reminder:  v.reminder  ?? v.Reminder  ?? false,
//   completed: v.completed ?? v.Completed ?? false,
// }))
//       setVaccines(normalized)
//     } catch (e: any) {
//       setError(e.message)
//     } finally {
//       setLoading(false)
//     }
//   }, [])

//   useEffect(() => { fetchVaccines() }, [fetchVaccines])

//   const createVaccine = async (dto: CreateVaccineDto) => {
//     setSubmitting(true)
//     setError('')
//     try {
//       const res = await fetch('/api/vaccine', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(dto),
//       })
//       if (!res.ok) throw new Error(await res.text())
//       await fetchVaccines()
//       return true
//     } catch (e: any) {
//       setError(e.message)
//       return false
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   const completeVaccine = async (id: string) => {
//     try {
//       const res = await fetch('/api/vaccine/complete', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ id }),
//       })
//       if (!res.ok) throw new Error(await res.text())
//       // Optimistic update
//       setVaccines(prev =>
//         prev.map(v => v.id === id ? { ...v, completed: true } : v)
//       )
//     } catch (e: any) {
//       setError(e.message)
//     }
//   }

//   const upcomingVaccines = vaccines.filter(v => !v.completed)
//   const completedVaccines = vaccines.filter(v => v.completed)

//   return {
//     vaccines,
//     upcomingVaccines,
//     completedVaccines,
//     loading,
//     error,
//     submitting,
//     createVaccine,
//     completeVaccine,
//     refetch: fetchVaccines,
//   }
// }

'use client'
// hooks/useVaccine.ts

import { useState, useEffect, useCallback } from 'react'

export interface Vaccine {
  id: string
  name: string
  pet: string
  vaccineType: string
  exposureCategory: string
  startDate: string   // ISO string
  reminder: boolean
  completed: boolean
}

export interface CreateVaccineDto {
  name: string
  pet: string
  vaccineType: string
  exposureCategory: string
  startDate: string   // ISO string
  reminder: boolean
}

export interface UpdateVaccineDto {
  id: string
  date: string        // ISO string
  reminder: boolean
}

export function useVaccines() {
  const [vaccines, setVaccines]     = useState<Vaccine[]>([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState('')
  const [submitting, setSubmitting] = useState(false)

  /* ─── fetch ─── */
  const fetchVaccines = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/vaccine', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to fetch vaccines')
      const data = await res.json()

      const normalized: Vaccine[] = (Array.isArray(data) ? data : []).map((v: any) => ({
        id:               v.id               ?? v.Id               ?? '',
        name:             v.name             ?? v.Name             ?? '',
        pet:              v.pet              ?? v.Pet              ?? '',
        vaccineType:      v.vaccineType      ?? v.VaccineType      ?? '',
        exposureCategory: v.exposureCategory ?? v.ExposureCategory ?? '',
        startDate:        v.startDate        ?? v.StartDate        ?? '',
        reminder:         v.reminder         ?? v.Reminder         ?? false,
        completed:        v.completed        ?? v.Completed        ?? false,
      }))

      setVaccines(normalized)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchVaccines() }, [fetchVaccines])

  /* ─── create ─── */
  const createVaccine = async (dto: CreateVaccineDto): Promise<boolean> => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/vaccine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      })
      if (!res.ok) throw new Error(await res.text())
      await fetchVaccines()
      return true
    } catch (e: any) {
      setError(e.message)
      return false
    } finally {
      setSubmitting(false)
    }
  }

  /* ─── take (mark completed) ─── */
  const completeVaccine = async (id: string): Promise<void> => {
    try {
      const res = await fetch('/api/vaccine/take', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) throw new Error(await res.text())
      // optimistic update
      setVaccines(prev =>
        prev.map(v => v.id === id ? { ...v, completed: true } : v)
      )
    } catch (e: any) {
      setError(e.message)
    }
  }

  /* ─── update ─── */
  const updateVaccine = async (dto: UpdateVaccineDto): Promise<boolean> => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/vaccine/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      })
      if (!res.ok) throw new Error(await res.text())
      await fetchVaccines()
      return true
    } catch (e: any) {
      setError(e.message)
      return false
    } finally {
      setSubmitting(false)
    }
  }

  /* ─── delete ─── */
  const deleteVaccine = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`/api/vaccine/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(await res.text())
      setVaccines(prev => prev.filter(v => v.id !== id))
    } catch (e: any) {
      setError(e.message)
    }
  }

  const upcomingVaccines  = vaccines.filter(v => !v.completed)
  const completedVaccines = vaccines.filter(v =>  v.completed)

  return {
    vaccines,
    upcomingVaccines,
    completedVaccines,
    loading,
    error,
    submitting,
    createVaccine,
    completeVaccine,
    updateVaccine,
    deleteVaccine,
    refetch: fetchVaccines,
  }
}