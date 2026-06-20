'use client'

import { useState, useEffect, useCallback } from 'react'
import { AdminAppointment } from '@/types/Appointment'
import { apiUrl } from '@/lib/api'

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAdminAppointments() {
  const [appointments, setAppointments] = useState<AdminAppointment[]>([])
  const [loading,      setLoading]      = useState(true)
  const [newIds,       setNewIds]       = useState<Set<number>>(new Set())

  // ─── Fetch ─────────────────────────────────────────────────────────────────

  const fetchAppointments = useCallback(async () => {
    try {
      const res  = await fetch(apiUrl('dashboard/appointments/clinic/all'), { cache: 'no-store' })
      const data = await res.json()
      setAppointments(data)
    } catch (err) {
      console.error('Failed to load appointments:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAppointments() }, [fetchAppointments])

  // ─── New appointment listener ──────────────────────────────────────────────

  useEffect(() => {
    const handleNewAppointment = (event: CustomEvent) => {
      const { patientName, clinicName, date, time } = event.detail
      const newAppt: AdminAppointment = {
        id:          Date.now(),
        patientName: patientName ?? 'Unknown Patient',
        clinicName:  clinicName  ?? 'Unknown Clinic',
        date:        date        ?? new Date().toISOString().slice(0, 10),
        time:        time        ?? 'N/A',
        status:      'Pending',
      }

      setAppointments(prev => [newAppt, ...prev])

      // Highlight new row for 4 seconds
      setNewIds(prev => new Set(prev).add(newAppt.id))
      setTimeout(() => {
        setNewIds(prev => {
          const next = new Set(prev)
          next.delete(newAppt.id)
          return next
        })
      }, 4000)
    }

    window.addEventListener('newAppointment', handleNewAppointment as EventListener)
    return () => window.removeEventListener('newAppointment', handleNewAppointment as EventListener)
  }, [])

  return {
    appointments,
    loading,
    newIds,
  }
}