'use client'

import { useState, useEffect, useCallback } from 'react'
import { Shelter } from '../../../types/Shelter'
import { apiUrl } from '@/lib/api'
import { useDashboard } from './shared/useDashboard'

// ─── Constants ────────────────────────────────────────────────────────────────

export const EMPTY_FORM: Shelter = {
  id: '', name: '', governorate: '', address: '',
  animalType: 'Dogs', capacity: '', phone: '', workingHours: '', notes: '',
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useDashboardShelters() {
  const [shelters,       setShelters]       = useState<Shelter[]>([])
  const [loading,        setLoading]        = useState(true)
  const [showModal,      setShowModal]      = useState(false)
  const [editingShelter, setEditingShelter] = useState<Shelter | null>(null)
  const [form,           setForm]           = useState<Shelter>(EMPTY_FORM)
  const [submitting,     setSubmitting]     = useState(false)

  const { flash, showFlash, clearFlash, deletingId, requestDelete, cancelDelete, confirmDelete } =
    useDashboard()

  // ─── Data ──────────────────────────────────────────────────────────────────

  const fetchShelters = useCallback(async () => {
    try {
      setLoading(true)
      const res  = await fetch(apiUrl('shelters'))
      const json = await res.json()
      setShelters(json.data ?? json)
    } catch (err) {
      console.error('Failed to load shelters:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchShelters() }, [fetchShelters])

  // ─── Modal ─────────────────────────────────────────────────────────────────

  const openModal = useCallback((shelter?: Shelter) => {
    setEditingShelter(shelter ?? null)
    setForm(shelter ? { ...shelter } : EMPTY_FORM)
    setShowModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setShowModal(false)
    setEditingShelter(null)
  }, [])

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }, [])

  // ─── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // const url    = editingShelter ? apiUrl(`shelters/${editingShelter.id}`) : apiUrl('dashboard/shelters')
    const url    = editingShelter ? apiUrl(`dashboard/shelters/${editingShelter.id}`) : apiUrl('dashboard/shelters')
    const method = editingShelter ? 'PUT' : 'POST'
    const { id: _id, ...payload } = form

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')

      showFlash(editingShelter ? '✅ Shelter updated successfully!' : '✅ Shelter added successfully!')
      await fetchShelters()
      closeModal()
    } catch (err) {
      console.error(err)
      alert('Failed to save shelter')
    } finally {
      setSubmitting(false)
    }
  }, [editingShelter, form, fetchShelters, closeModal, showFlash])

  // ─── Delete ────────────────────────────────────────────────────────────────

  const handleDelete = useCallback(async (id: number | string) => {
    await fetch(apiUrl(`dashboard/shelters/${id}`), { method: 'DELETE' })
    showFlash('🗑️ Shelter deleted successfully!')
    await fetchShelters()
  }, [fetchShelters, showFlash])

  // ─── Derived ───────────────────────────────────────────────────────────────

  const deletingName = deletingId
    ? shelters.find(s => s.id === String(deletingId))?.name
    : undefined

  return {
    // data
    shelters,
    loading,
    submitting,
    deletingName,
    // modal
    showModal,
    editingShelter,
    form,
    // actions
    fetchShelters,
    openModal,
    closeModal,
    handleInputChange,
    handleSubmit,
    handleDelete,
    // shared dashboard state
    flash,
    clearFlash,
    deletingId,
    requestDelete,
    cancelDelete,
    confirmDelete,
  }
}