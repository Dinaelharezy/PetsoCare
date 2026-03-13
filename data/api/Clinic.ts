
// import { Clinic } from '../../types/Clinic'

// const getAllClinics = async (): Promise<Clinic[]> => {
//   const response = await fetch('/api/Clinics')
//   if (!response.ok) throw new Error('Failed to fetch clinics')
//   return response.json()
// }

// const createClinic = async (formData: FormData): Promise<Clinic> => {
//   const response = await fetch('/api/Clinics', {
//     method: 'POST',
//     body: formData,
//   })
//   if (!response.ok) throw new Error('Failed to create clinic')
//   return response.json()
// }

// const getClinicById = async (id: string): Promise<Clinic | null> => {
//   const response = await fetch(`/api/Clinics/${id}`)
//   if (!response.ok) return null
//   return response.json()
// }

// const updateClinic = async (id: number, formData: FormData): Promise<Clinic> => {
//   const response = await fetch(`/api/Clinics/${id}`, {
//     method: 'PUT',
//     body: formData,
//   })
//   if (!response.ok) throw new Error('Failed to update clinic')

//   const text = await response.text()
//   if (!text || text.trim() === '') return {} as Clinic
//   return JSON.parse(text)
// }

// const deleteClinic = async (id: number): Promise<void> => {
//   const response = await fetch(`/api/Clinics/${id}`, {
//     method: 'DELETE',
//   })
//   if (!response.ok) throw new Error('Failed to delete clinic')
// }

// export const clinicsApi = {
//   getAll: getAllClinics,
//   getById: getClinicById,
//   create: createClinic,
//   update: updateClinic,
//   delete: deleteClinic,
// }

// export const vetsApi = clinicsApi

import { Clinic } from '../../types/Clinic'

const getAllClinics = async (): Promise<Clinic[]> => {
  const response = await fetch('/api/Clinics')
  if (!response.ok) throw new Error('Failed to fetch clinics')
  return response.json()
}

const getClinicById = async (id: string): Promise<Clinic | null> => {
  const response = await fetch(`/api/dashboard/clinics/${id}`)
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

  const response = await fetch('/api/dashboard/clinics', {
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

  const response = await fetch(`/api/dashboard/clinics/${id}`, {
    method: 'PUT',
    body: formData,
  })
  if (!response.ok) throw new Error('Failed to update clinic')

  const text = await response.text()
  if (!text || text.trim() === '') return data as Clinic
  return JSON.parse(text)
}

const deleteClinic = async (id: number): Promise<void> => {
  const response = await fetch(`/api/dashboard/clinics/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete clinic')
}

const togglePublish = async (id: string): Promise<void> => {
  const response = await fetch(`/api/Clinics/${id}/toggle`, {
    method: 'PATCH',
  })
  if (!response.ok) throw new Error('Failed to toggle publish status')
}

export const clinicsApi = {
  getAll: getAllClinics,
  getById: getClinicById,
  create: createClinic,
  update: updateClinic,
  delete: deleteClinic,
  togglePublish,
}

// export const vetsApi = clinicsApi