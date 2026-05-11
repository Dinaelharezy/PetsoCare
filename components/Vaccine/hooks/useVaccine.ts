

// 'use client'
// import { useState, useCallback, useEffect } from 'react'
// import { VaccSchedule } from '../../../types/VaccSchedule'
// import { Vaccine, CreateVaccineDto, TakeDoseDto, UpdateVaccineDto } from '@/types/Vaccine'
// import { useNotification } from '../Notification/hook/useNotification'
// import { apiUrl } from '@/lib/api'
// export function buildDoseDays(schedule: VaccSchedule): number[] {
//   return schedule.doses
//     .map(d => {
//       if (typeof d.day === 'number') return d.day
//       const match = String(d.day).match(/\d+/)
//       return match ? parseInt(match[0], 10) : null
//     })
//     .filter((d): d is number => d !== null)
// }

// export function useVaccine() {
//   const [vaccines,           setVaccines]           = useState<Vaccine[]>([])
//   const [loading,            setLoading]            = useState(false)
//   const [submitting,         setSubmitting]         = useState(false)
//   const [error,              setError]              = useState<string | null>(null)

//   // ── derived lists ──
//   const upcomingVaccines   = vaccines.filter(v => !v.completed)
//   const completedVaccines  = vaccines.filter(v =>  v.completed)

//   const fetchVaccines = useCallback(async () => {
//   setLoading(true)
//   setError(null)
//   try {
//     const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vaccine`)
//     const text = await res.text()
//     const data = text ? JSON.parse(text) : {}
//     console.log (data)
//     if (!res.ok) throw new Error(data.message ?? 'Failed to fetch vaccines')
//     const doses = Array.isArray(data.doses) ? data.doses : []
//   const mapped: Vaccine[] = doses.map((d: any) => ({
//   id:               d.id,
//   userName:         d.userName        ?? '',
//   vaccineName:      d.vaccineName     ?? '',
//   pet:              d.pet             ?? '',
//   reminder:         false,
//   completed:        d.isTaken         ?? false,
//   startDate:        d.date,
//   vaccineType:      d.vaccineType     ?? '',
//   victimType:       d.victimType      ?? '',
//   animalType:       d.animalType      ?? '',
//   exposureCategory: d.exposureCategory ?? '',
// }))
//     setVaccines(mapped)
//   } catch (e: any) {
//     setError(e.message)
//   } finally {
//     setLoading(false)
//   }
// }, [])

  

//   // auto-fetch on mount
//   useEffect(() => { fetchVaccines() }, [fetchVaccines])

//   // ── POST /api/vaccine ── (AddVaccineModal)
//   const createVaccine = useCallback(async (dto: CreateVaccineDto): Promise<boolean> => {
//     setSubmitting(true)
//     setError(null)
//     try {
//       const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vaccine`, {
//         method:  'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body:    JSON.stringify(dto),
//       })
//       const text = await res.text()
//       const data = text ? JSON.parse(text) : {}
//       if (!res.ok) throw new Error(data.message ?? 'Failed to add vaccine')
//       await fetchVaccines()   // refresh list
//       return true
//     } catch (e: any) {
//       setError(e.message)
//       return false
//     } finally {
//       setSubmitting(false)
//     }
//   }, [fetchVaccines])

//   // alias for backward compat
//   const addVaccine = createVaccine

//   // ── POST /api/vaccine  ── from schedule
// const addVaccineFromSchedule = useCallback(
//   async (
//     schedule: VaccSchedule,
//     opts: { 
//       pet: string
//       startDate: string
//       reminder?: boolean
//       victimType?: string  // ← زود
//       animalType?: string  // ← زود
//     },
//   ): Promise<boolean> => {
//     setSubmitting(true)
//     setError(null)
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vaccine/custom`, {
//         method:  'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body:    JSON.stringify({
//           name:       schedule.title,
//           pet:        opts.pet,
//           doseDays:   buildDoseDays(schedule),
//           startDate:  opts.startDate,
//           reminder:   opts.reminder ?? false,
//         victimType: opts.victimType?.toLowerCase(),  // ← lowercase
//           animalType: opts.animalType?.toLowerCase(),
//         }),
//       })
//       const text = await res.text()
//       const data = text ? JSON.parse(text) : {}
//       if (!res.ok) throw new Error(data.message ?? 'Failed to save schedule')
//       await fetchVaccines()
//       return true
//     } catch (e: any) {
//       setError(e.message)
//       return false
//     } finally {
//       setSubmitting(false)
//     }
//   },
//   [fetchVaccines],
// )


//   // ── POST /api/vaccine/take ──
//   const takeDose = useCallback(async (dto: TakeDoseDto): Promise<boolean> => {
//     setSubmitting(true)
//     setError(null)
//     try {
//       const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vaccine/take`, {
//         method:  'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body:    JSON.stringify({ id: dto.id, date: dto.date ?? new Date().toISOString() }),
//       })
//       const text = await res.text()
//       const data = text ? JSON.parse(text) : {}
//       if (!res.ok) throw new Error(data.message ?? 'Failed to record dose')
//       await fetchVaccines()
//       return true
//     } catch (e: any) {
//       setError(e.message)
//       return false
//     } finally {
//       setSubmitting(false)
//     }
//   }, [fetchVaccines])

//  // في useVaccine.ts - دالة updateVaccine
// const updateVaccine = useCallback(async (id: string, date?: string, reminder?: boolean): Promise<boolean> => {
//   setSubmitting(true);
//   setError(null);
//   try {
//     const body = { id, date, reminder };

//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vaccine/update`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });

//     if (!res.ok) {
//       const errorText = await res.text();
//       console.error('Server error:', res.status, errorText);
//       throw new Error(`Server returned ${res.status}`);
//     }

//     const data = await res.json();
//     await fetchVaccines();
//     return true;
//   } catch (e: any) {
//     console.error('Update error:', e);
//     setError(e.message);
//     return false;
//   } finally {
//     setSubmitting(false);
//   }
// }, [fetchVaccines]);


//   // ── DELETE /api/vaccine/[id] ──
//   const deleteVaccine = useCallback(async (id: string): Promise<boolean> => {
//     setSubmitting(true)
//     setError(null)
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vaccine/${id}`, { method: 'DELETE' })
//       if (!res.ok) {
//         const text = await res.text()
//         const data = text ? JSON.parse(text) : {}
//         throw new Error(data.message ?? 'Failed to delete vaccine')
//       }
//       await fetchVaccines()
//       return true
//     } catch (e: any) {
//       setError(e.message)
//       return false
//     } finally {
//       setSubmitting(false)
//     }
//   }, [fetchVaccines])
// const completeVaccine = useCallback(async (id: string): Promise<boolean> => {
//   setSubmitting(true)
//   setError(null)
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vaccine/take`, {   // ← take مش complete
//       method:  'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body:    JSON.stringify({ id }),
//     })
//     const text = await res.text()
//     const data = text ? JSON.parse(text) : {}
//     if (!res.ok) throw new Error(data.message ?? 'Failed to complete vaccine')
//     await fetchVaccines()
//     return true
//   } catch (e: any) {
//     setError(e.message)
//     return false
//   } finally {
//     setSubmitting(false)
//   }
// }, [fetchVaccines])
//   return {
//     // state
//     vaccines,
//     upcomingVaccines,
//     completedVaccines,
//     loading,
//     submitting,
//     error,
//     // actions
//     refetch:                fetchVaccines,
//     createVaccine,
//     addVaccine,
//     addVaccineFromSchedule,
//     completeVaccine,
//     takeDose,
//     updateVaccine,
//     deleteVaccine,
//   }
// }

'use client'
import { useState, useCallback, useEffect } from 'react'
import { VaccSchedule } from '../../../types/VaccSchedule'
import { Vaccine, CreateVaccineDto, TakeDoseDto, UpdateVaccineDto } from '@/types/Vaccine'
import { apiUrl } from '@/lib/api'  // ✅ زودي الـ import

export function buildDoseDays(schedule: VaccSchedule): number[] {
  return schedule.doses
    .map(d => {
      if (typeof d.day === 'number') return d.day
      const match = String(d.day).match(/\d+/)
      return match ? parseInt(match[0], 10) : null
    })
    .filter((d): d is number => d !== null)
}

export function useVaccine() {
  const [vaccines,  setVaccines]  = useState<Vaccine[]>([])
  const [loading,   setLoading]   = useState(false)
  const [submitting,setSubmitting] = useState(false)
  const [error,     setError]     = useState<string | null>(null)

  const upcomingVaccines  = vaccines.filter(v => !v.completed)
  const completedVaccines = vaccines.filter(v =>  v.completed)

  const fetchVaccines = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res  = await fetch(apiUrl('vaccine'))  // ✅
      const text = await res.text()
      const data = text ? JSON.parse(text) : {}
      if (!res.ok) throw new Error(data.message ?? 'Failed to fetch vaccines')
      const doses = Array.isArray(data.doses) ? data.doses : []
      const mapped: Vaccine[] = doses.map((d: any) => ({
        id:               d.id,
        userName:         d.userName         ?? '',
        vaccineName:      d.vaccineName      ?? '',
        pet:              d.pet              ?? '',
        reminder:         false,
        completed:        d.isTaken          ?? false,
        startDate:        d.date,
        vaccineType:      d.vaccineType      ?? '',
        victimType:       d.victimType       ?? '',
        animalType:       d.animalType       ?? '',
        exposureCategory: d.exposureCategory ?? '',
      }))
      setVaccines(mapped)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchVaccines() }, [fetchVaccines])

  const createVaccine = useCallback(async (dto: CreateVaccineDto): Promise<boolean> => {
    setSubmitting(true)
    setError(null)
    try {
      const res  = await fetch(apiUrl('vaccine'), {  // ✅
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(dto),
      })
      const text = await res.text()
      const data = text ? JSON.parse(text) : {}
      if (!res.ok) throw new Error(data.message ?? 'Failed to add vaccine')
      await fetchVaccines()
      return true
    } catch (e: any) {
      setError(e.message)
      return false
    } finally {
      setSubmitting(false)
    }
  }, [fetchVaccines])

  const addVaccine = createVaccine

  const addVaccineFromSchedule = useCallback(async (
    schedule: VaccSchedule,
    opts: { pet: string; startDate: string; reminder?: boolean; victimType?: string; animalType?: string },
  ): Promise<boolean> => {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch(apiUrl('vaccine/custom'), {  // ✅
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name:       schedule.title,
          pet:        opts.pet,
          doseDays:   buildDoseDays(schedule),
          startDate:  opts.startDate,
          reminder:   opts.reminder ?? false,
          victimType: opts.victimType?.toLowerCase(),
          animalType: opts.animalType?.toLowerCase(),
        }),
      })
      const text = await res.text()
      const data = text ? JSON.parse(text) : {}
      if (!res.ok) throw new Error(data.message ?? 'Failed to save schedule')
      await fetchVaccines()
      return true
    } catch (e: any) {
      setError(e.message)
      return false
    } finally {
      setSubmitting(false)
    }
  }, [fetchVaccines])

  const takeDose = useCallback(async (dto: TakeDoseDto): Promise<boolean> => {
    setSubmitting(true)
    setError(null)
    try {
      const res  = await fetch(apiUrl('vaccine/take'), {  // ✅
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ id: dto.id, date: dto.date ?? new Date().toISOString() }),
      })
      const text = await res.text()
      const data = text ? JSON.parse(text) : {}
      if (!res.ok) throw new Error(data.message ?? 'Failed to record dose')
      await fetchVaccines()
      return true
    } catch (e: any) {
      setError(e.message)
      return false
    } finally {
      setSubmitting(false)
    }
  }, [fetchVaccines])

  const updateVaccine = useCallback(async (id: string, date?: string, reminder?: boolean): Promise<boolean> => {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch(apiUrl('vaccine/update'), {  // ✅
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ id, date, reminder }),
      })
      if (!res.ok) throw new Error(`Server returned ${res.status}`)
      await fetchVaccines()
      return true
    } catch (e: any) {
      setError(e.message)
      return false
    } finally {
      setSubmitting(false)
    }
  }, [fetchVaccines])

  const deleteVaccine = useCallback(async (id: string): Promise<boolean> => {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch(apiUrl(`vaccine/${id}`), { method: 'DELETE' })  // ✅
      if (!res.ok) {
        const text = await res.text()
        const data = text ? JSON.parse(text) : {}
        throw new Error(data.message ?? 'Failed to delete vaccine')
      }
      await fetchVaccines()
      return true
    } catch (e: any) {
      setError(e.message)
      return false
    } finally {
      setSubmitting(false)
    }
  }, [fetchVaccines])

  const completeVaccine = useCallback(async (id: string): Promise<boolean> => {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch(apiUrl('vaccine/take'), {  // ✅
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ id }),
      })
      const text = await res.text()
      const data = text ? JSON.parse(text) : {}
      if (!res.ok) throw new Error(data.message ?? 'Failed to complete vaccine')
      await fetchVaccines()
      return true
    } catch (e: any) {
      setError(e.message)
      return false
    } finally {
      setSubmitting(false)
    }
  }, [fetchVaccines])

  return {
    vaccines,
    upcomingVaccines,
    completedVaccines,
    loading,
    submitting,
    error,
    refetch:             fetchVaccines,
    createVaccine,
    addVaccine,
    addVaccineFromSchedule,
    completeVaccine,
    takeDose,
    updateVaccine,
    deleteVaccine,
  }
}