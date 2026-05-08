'use client'

import { useState, useEffect } from 'react'
import { clinicsApi } from '../../../data/api/Clinic'
import { Clinic } from '../../../types/Clinic'
import { ClinicForm } from '../../../types/Clinic'

const EMPTY_FORM: ClinicForm = {
  name: '', address: '', governorate: '', phone: '',
  facebookPage: '', imageUrl: '', bookingPrice: '',
  workingDays: '', workingHours: '',
}

export const GOVERNORATES = ['Port Said', 'Ismailia', 'Suez', 'Cairo']

export function isValidImage(src?: string) {
  if (!src) return false
  return src.startsWith('/') || src.startsWith('http')
}

export function useClinicManagement() {
  const [clinics,        setClinics]        = useState<Clinic[]>([])
  const [loading,        setLoading]        = useState(true)
  const [showModal,      setShowModal]      = useState(false)
  const [editingClinic,  setEditingClinic]  = useState<Clinic | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [formData,       setFormData]       = useState<ClinicForm>(EMPTY_FORM)

  useEffect(() => { loadClinics() }, [])

  useEffect(() => {
    const handler = () => loadClinics()
    window.addEventListener('clinicsUpdated', handler)
    return () => window.removeEventListener('clinicsUpdated', handler)
  }, [])

  const loadClinics = async () => {
    try {
      setLoading(true)
      const data = await clinicsApi.getAll()
      setClinics(data)
    } catch (err) {
      console.error('Failed to load clinics:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleShowModal = (clinic?: Clinic) => {
    if (clinic) {
      setEditingClinic(clinic)
      setFormData({
        name:         clinic.name,
        address:      clinic.address,
        governorate:  clinic.governorate,
        phone:        clinic.phone,
        facebookPage: clinic.facebookPage || '',
        imageUrl:     clinic.imageUrl || '',
        bookingPrice: clinic.bookingPrice?.toString() || '',
        workingDays:  clinic.workingDays || '',
        workingHours: clinic.workingHours || '',
      })
    } else {
      setEditingClinic(null)
      setFormData(EMPTY_FORM)
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingClinic(null)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const notifySuccess = (msg: string) => {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const clinicData: Partial<Clinic> = {
        name:         formData.name,
        address:      formData.address,
        governorate:  formData.governorate,
        phone:        formData.phone,
        facebookPage: formData.facebookPage,
        imageUrl:     formData.imageUrl,
        bookingPrice: parseFloat(formData.bookingPrice) || 0,
        workingDays:  formData.workingDays,
        workingHours: formData.workingHours,
      }

      if (editingClinic) {
        await clinicsApi.update(editingClinic.id, clinicData)
        notifySuccess('Clinic updated successfully!')
      } else {
        await clinicsApi.create(clinicData)
        notifySuccess('Clinic added successfully!')
      }

      await loadClinics()
      handleCloseModal()
    } catch (err) {
      console.error('Error saving clinic:', err)
      alert('Failed to save clinic.')
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this clinic?')) return
    try {
      await clinicsApi.delete(id)
      notifySuccess('Clinic deleted successfully!')
      await loadClinics()
    } catch (err) {
      console.error('Error deleting clinic:', err)
    }
  }

  return {
    clinics, loading,
    showModal, editingClinic,
    successMessage, setSuccessMessage,
    formData,
    handleShowModal, handleCloseModal,
    handleInputChange, handleSubmit, handleDelete,
  }
}