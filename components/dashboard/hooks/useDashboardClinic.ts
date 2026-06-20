
'use client'

import { useState, useEffect, useCallback } from 'react'
import { clinicsApi } from '../../../data/api/Clinic'
import { Clinic } from '../../../types/Clinic'
import { apiUrl } from '@/lib/api'
import { useDashboard } from './shared/useDashboard'

// ─── Constants ────────────────────────────────────────────────────────────────

export const GOVERNORATES = ['Port Said', 'Ismailia', 'Suez', 'Cairo']

export const EMPTY_FORM = {
  name: '', address: '', governorate: '', phone: '',
  facebookPage: '', bookingPrice: '', workingDays: '',
  workingHours: '', latitude: '', longitude: '',
}

export type ClinicFormData = typeof EMPTY_FORM

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const isValidImage = (src?: string) =>
  !!src && (src.startsWith('/') || src.startsWith('http'))

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useDashboardClinic() {
  const [clinics,         setClinics]         = useState<Clinic[]>([])
  const [loading,         setLoading]         = useState(true)
  const [showModal,       setShowModal]       = useState(false)
  const [imageFile,       setImageFile]       = useState<File | null>(null)
  const [editingClinic,   setEditingClinic]   = useState<Clinic | null>(null)
  const [showLocationMap, setShowLocationMap] = useState(false)
  const [formData,        setFormData]        = useState<ClinicFormData>(EMPTY_FORM)

  const { flash, showFlash, clearFlash, deletingId, requestDelete, cancelDelete, confirmDelete } =
    useDashboard()

  // ─── Data ──────────────────────────────────────────────────────────────────

  const loadClinics = useCallback(async () => {
    try {
      setLoading(true)
      setClinics(await clinicsApi.getAll())
    } catch (err) {
      console.error('Failed to load clinics:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadClinics() }, [loadClinics])

  useEffect(() => {
    window.addEventListener('clinicsUpdated', loadClinics)
    return () => window.removeEventListener('clinicsUpdated', loadClinics)
  }, [loadClinics])

  // ─── Modal ─────────────────────────────────────────────────────────────────

  const openModal = useCallback((clinic?: Clinic) => {
    setEditingClinic(clinic ?? null)
    setFormData(clinic ? {
      name:         clinic.name,
      address:      clinic.address,
      governorate:  clinic.governorate,
      phone:        clinic.phone,
      facebookPage: clinic.facebookPage        || '',
      bookingPrice: clinic.bookingPrice?.toString() || '',
      workingDays:  clinic.workingDays          || '',
      workingHours: clinic.workingHours         || '',
      latitude:     clinic.latitude?.toString()  || '',
      longitude:    clinic.longitude?.toString() || '',
    } : EMPTY_FORM)
    setImageFile(null)
    setShowModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setShowModal(false)
    setEditingClinic(null)
    setImageFile(null)
  }, [])

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleImageChange = useCallback((file: File) => {
    setImageFile(file)
  }, [])

  const handleLocationConfirm = useCallback((lat: number, lng: number, address: string) => {
    setFormData(prev => ({ ...prev, latitude: lat.toString(), longitude: lng.toString(), address }))
  }, [])

  const openLocationMap  = useCallback(() => setShowLocationMap(true),  [])
  const closeLocationMap = useCallback(() => setShowLocationMap(false), [])

  // ─── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const fd = new FormData()
      fd.append('Name',         formData.name)
      fd.append('Address',      formData.address)
      fd.append('Governorate',  formData.governorate)
      fd.append('Phone',        formData.phone)
      fd.append('FacebookPage', formData.facebookPage || '')
      fd.append('BookingPrice', formData.bookingPrice || '0')
      fd.append('WorkingDays',  formData.workingDays  || 'N/A')
      fd.append('WorkingHours', formData.workingHours || 'N/A')
      fd.append('Latitude',     formData.latitude     || '0')
      fd.append('Longitude',    formData.longitude    || '0')
      if (imageFile) fd.append('Image', imageFile)

      const url    = editingClinic
        ? apiUrl(`dashboard/clinics/${editingClinic.id}`)
        : apiUrl('dashboard/clinics')
      const method = editingClinic ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'ngrok-skip-browser-warning': 'true' },
        body: fd,
      })

      if (!res.ok) {
         const err = await res.json().catch(() => ({}))
  const phoneError = err?.errors?.Phone?.[0]
  if (phoneError) {
    alert(`Phone: ${phoneError}`)
  } else {
    alert(`Failed to save: ${res.status}`)
  }
        console.error('Save error:', err)
        alert(`Failed to save: ${res.status}`)
        return
      }

      showFlash(editingClinic ? '✅ Clinic updated successfully!' : '✅ Clinic added successfully!')
      await loadClinics()
      closeModal()
      window.dispatchEvent(new Event('clinicsUpdated'))
    } catch (err) {
      console.error('Error saving clinic:', err)
      alert('Failed to save clinic.')
    }
  }, [formData, imageFile, editingClinic, loadClinics, closeModal, showFlash])

  // ─── Delete ────────────────────────────────────────────────────────────────

  const handleDelete = useCallback(async (id: number | string) => {
    await clinicsApi.delete(id as number)
    showFlash('🗑️ Clinic deleted successfully!')
    await loadClinics()
    window.dispatchEvent(new Event('clinicsUpdated'))
  }, [loadClinics, showFlash])

  // ─── Derived ───────────────────────────────────────────────────────────────

  const deletingName = deletingId
    ? clinics.find(c => c.id === Number(deletingId))?.name
    : undefined

  const stats = [
    { label: 'Total Clinics', value: clinics.length,                                                          icon: '🏥', bg: '#eef2ff', color: '#6366f1' },
    { label: 'Port Said',     value: clinics.filter(c => c.governorate === 'Port Said').length,               icon: '📍', bg: '#e0f2fe', color: '#0369a1' },
    { label: 'Cairo',         value: clinics.filter(c => c.governorate === 'Cairo').length,                   icon: '🏙️', bg: '#fef3c7', color: '#92400e' },
    { label: 'Other Areas',   value: clinics.filter(c => !['Port Said', 'Cairo'].includes(c.governorate)).length, icon: '🗺️', bg: '#dcfce7', color: '#166534' },
  ]

  return {
    // data
    clinics,
    loading,
    stats,
    deletingName,
    // modal
    showModal,
    editingClinic,
    formData,
    imageFile,
    showLocationMap,
    // actions
    loadClinics,
    openModal,
    closeModal,
    handleInputChange,
    handleImageChange,
    handleLocationConfirm,
    openLocationMap,
    closeLocationMap,
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