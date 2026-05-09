
import { Clinic } from '../../types/Clinic'

// ── Admin: Clinics ────────────────────────────────────────────────────────

const getAllClinics = async (): Promise<Clinic[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Clinics?t=${Date.now()}`, {
    cache: 'no-store',
  })
  if (!response.ok) throw new Error('Failed to fetch clinics')
  return response.json()
}

const getClinicById = async (id: string): Promise<Clinic | null> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Clinics/${id}`)
  if (!response.ok) return null
  return response.json()
}

const createClinic = async (data: Partial<Clinic>): Promise<Clinic> => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value))
    }
  })

  const response = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/clinics', {
    method: 'POST',
    body: formData,
  })
  if (!response.ok) throw new Error('Failed to create clinic')

  return response.json()
}

const updateClinic = async (id: number, data: Partial<Clinic>): Promise<Clinic> => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value))
    }
  })

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/clinics/${id}`, {
    method: 'PUT',
    body: formData,
  })
  if (!response.ok) throw new Error('Failed to update clinic')

  const text = await response.text()
  if (!text || text.trim() === '') return data as Clinic
  return JSON.parse(text)
}

const deleteClinic = async (id: number): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/clinics/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete clinic')
}

const togglePublish = async (id: string): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Clinics/${id}/toggle`, {
    method: 'PATCH',
  })
  if (!response.ok) throw new Error('Failed to toggle publish status')
}

// ── Clinic Owner: Appointments ────────────────────────────────────────────

const getClinicAppointments = async (id: string | number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/appointments/clinic/${id}`, {
    cache: 'no-store',
  })
  if (!response.ok) throw new Error('Failed to fetch appointments')
  return response.json()
}

const approveAppointment = async (id: number): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/appointments/${id}/approve`, {
    method: 'PUT',
  })
  if (!response.ok) throw new Error('Failed to approve appointment')
}

// const rejectAppointment = async (id: number): Promise<void> => {
//   const response = await fetch(`/api/dashboard/appointments/${id}/reject`, {
//     method: 'PUT',
    
//   })
//   if (!response.ok) throw new Error('Failed to reject appointment')
// }
const rejectAppointment = async (id: number, reason?: string): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/appointments/${id}/reject`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason: reason || '' }),
  })
  if (!response.ok) throw new Error('Failed to reject appointment')
}

// ── Clinic Owner: Settings ────────────────────────────────────────────────

const updateClinicSettings = async (clinicId: string | number, data: Partial<Clinic>): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clinic/dashboard/${clinicId}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update clinic settings')
}

const getClinicForOwner = async (clinicId: string | number): Promise<Clinic | null> => {
  // ✅ cache: 'no-store' + timestamp عشان تتجنب الـ stale cache
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Clinics?t=${Date.now()}`, { cache: 'no-store' })
  if (!response.ok) return null
  const clinics: Clinic[] = await response.json()
  return clinics.find(c => c.id === Number(clinicId)) ?? null
}

// ── Export ────────────────────────────────────────────────────────────────

export const clinicsApi = {
  // Admin
  getAll:             getAllClinics,
  getById:            getClinicById,
  create:             createClinic,
  update:             updateClinic,
  delete:             deleteClinic,
  togglePublish,

  // Clinic owner
  getAppointments:    getClinicAppointments,
  approveAppointment,
  rejectAppointment,
  updateSettings:     updateClinicSettings,
  getForOwner:        getClinicForOwner,
}