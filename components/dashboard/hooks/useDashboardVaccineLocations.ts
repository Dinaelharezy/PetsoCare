'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  getAllLocations,
  createLocation,
  updateLocation,
  deleteLocation,
  toggleLocation,
} from '../../../data/api/VaccLocations'
import {
  VaccLocation,
  VaccLocationForm,
  emptyVaccLocationForm,
  isLocationActive,
  formToPayload,
} from '../../../types/VaccLocation'
import { useDashboard } from './shared/useDashboard'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function locTypeVal(type: string) {
  return type === 'Area' ? '1' : type === 'Location' ? '2' : ''
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useDashboardVaccineLocations() {
  const [locations,  setLocations]  = useState<VaccLocation[]>([])
  const [loading,    setLoading]    = useState(true)
  const [filterType, setFilterType] = useState<number | ''>('')
  const [showModal,  setShowModal]  = useState(false)
  const [editTarget, setEditTarget] = useState<VaccLocation | null>(null)
  const [formData,   setFormData]   = useState<VaccLocationForm>(emptyVaccLocationForm)

  const { flash, showFlash, clearFlash, deletingId, requestDelete, cancelDelete, confirmDelete } =
    useDashboard()

  // ─── Data ──────────────────────────────────────────────────────────────────

  const loadLocations = useCallback(async (type?: number | '') => {
    try {
      setLoading(true)
      setLocations(await getAllLocations(type ? { type } : undefined))
    } catch (err) {
      console.error('Failed to load locations:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadLocations() }, [loadLocations])

  useEffect(() => {
    const handler = () => loadLocations(filterType || undefined)
    window.addEventListener('locationsUpdated', handler)
    return () => window.removeEventListener('locationsUpdated', handler)
  }, [filterType, loadLocations])

  // ─── Filter ────────────────────────────────────────────────────────────────

  const handleFilterChange = useCallback((type: number | '') => {
    setFilterType(type)
    loadLocations(type || undefined)
  }, [loadLocations])

  // ─── Modal ─────────────────────────────────────────────────────────────────

  const openCreate = useCallback(() => {
    setEditTarget(null)
    setFormData(emptyVaccLocationForm)
    setShowModal(true)
  }, [])

  const openEdit = useCallback((loc: VaccLocation) => {
    setEditTarget(loc)
    setFormData({
      name:            loc.name        || '',
      type:            locTypeVal(loc.type),
      governorate:     loc.governorate || '',
      address:         loc.address     || '',
      phone:           loc.phone       || '',
      serviceType:     String(loc.serviceType ?? ''),
      providesVaccine: loc.providesVaccine === true,
      isActive:        isLocationActive(loc),
    })
    setShowModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setShowModal(false)
    setEditTarget(null)
    setFormData(emptyVaccLocationForm)
  }, [])

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement
    const { name, value, type: inputType } = target
    setFormData(prev => ({ ...prev, [name]: inputType === 'checkbox' ? target.checked : value }))
  }, [])

  // ─── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editTarget) {
        const payload: VaccLocationForm = {
          name:            formData.name        || editTarget.name,
          type:            formData.type        || locTypeVal(editTarget.type) || '1',
          governorate:     formData.governorate || editTarget.governorate,
          address:         formData.address     || editTarget.address,
          phone:           formData.phone       || editTarget.phone || '',
          serviceType:     formData.serviceType || String(editTarget.serviceType),
          providesVaccine: formData.providesVaccine,
          isActive:        formData.isActive,
        }
        await updateLocation(editTarget.id, formToPayload(payload))
        showFlash('✅ Location updated successfully!')
      } else {
        if (!formData.name)        { alert('Name is required');              return }
        if (!formData.type)        { alert('Please select a location type'); return }
        if (!formData.governorate) { alert('Governorate is required');       return }
        if (!formData.serviceType) { alert('Please select a service type');  return }
        if (!formData.address)     { alert('Address is required');           return }
        await createLocation(formToPayload(formData))
        showFlash('✅ Location added successfully!')
      }
      await loadLocations(filterType || undefined)
      closeModal()
    } catch (err) {
      console.error('Error saving location:', err)
      alert('Failed to save location. Check console for details.')
    }
  }, [editTarget, formData, filterType, loadLocations, closeModal, showFlash])

  // ─── Delete ────────────────────────────────────────────────────────────────

  const handleDelete = useCallback(async (id: number | string) => {
    await deleteLocation(id as number)
    showFlash('🗑️ Location deleted successfully!')
    await loadLocations(filterType || undefined)
  }, [filterType, loadLocations, showFlash])

  // ─── Toggle ────────────────────────────────────────────────────────────────

  const handleToggle = useCallback(async (id: number) => {
    const loc = locations.find(l => l.id === id)
    await toggleLocation(id)
    showFlash(`✅ Location ${isLocationActive(loc!) ? 'deactivated' : 'activated'} successfully!`)
    await loadLocations(filterType || undefined)
  }, [locations, filterType, loadLocations, showFlash])

  // ─── Derived ───────────────────────────────────────────────────────────────

  const activeCount = locations.filter(l => isLocationActive(l)).length

  return {
    // data
    locations,
    loading,
    activeCount,
    filterType,
    // modal
    showModal,
    editTarget,
    formData,
    // actions
    handleFilterChange,
    openCreate,
    openEdit,
    closeModal,
    handleInputChange,
    handleSubmit,
    handleDelete,
    handleToggle,
    // shared dashboard state
    flash,
    clearFlash,
    deletingId,
    requestDelete,
    cancelDelete,
    confirmDelete,
  }
}