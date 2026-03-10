

// import { Vet } from '../../types/Vet'

// const getAllVets = async (): Promise<Vet[]> => {
//   const response = await fetch('/api/Clinics')
//   if (!response.ok) throw new Error('Failed to fetch vets')
//   return response.json()
// }

// const getVetById = async (id: string): Promise<Vet | null> => {
//   const response = await fetch(`/api/Clinics/${id}`)
//   if (!response.ok) return null
//   return response.json()
// }

// export const vetsApi = {
//   getAll: getAllVets,
//   getById: getVetById,
// }

import { Vet } from '../../types/Vet'

const getAllVets = async (): Promise<Vet[]> => {
  const response = await fetch('/api/Clinics')
  if (!response.ok) throw new Error('Failed to fetch vets')
  return response.json()
}

const getVetById = async (id: string): Promise<Vet | null> => {
  const response = await fetch(`/api/Clinics/${id}`)
  
  console.log('Response status:', response.status)
  
  if (!response.ok) {
    console.log('Response not ok')
    return null
  }
  
  const data = await response.json()
  console.log('Clinic data received:', data) // ✅ الأهم
  
  return data
}

export const vetsApi = {
  getAll: getAllVets,
  getById: getVetById,
}