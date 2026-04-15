// export type AnimalType = "DOGS" | "CATS" | "BOTH"

// export interface Shelter {
//   id: string
//   name: string
//   governorate: string
//   location: string | null
//   animalType: AnimalType
//   capacity: number | null
//   contactNumber: string | null
//   workingHours: string | null
//   additionalNotes: string | null
//   createdAt: string
//   updatedAt: string
// }

// export interface ShelterApiError {
//   error: string
//   details?: Record<string, string[]>
// }

export type AnimalType = "Dogs" | "Cats" | "Both";

export interface Shelter {
  id: string
  name: string
  governorate: string
  address: string        // بدل location
  animalType: string
  capacity: string       // خليها string زي backend
  phone: string          // بدل contactNumber
  workingHours: string
  notes?: string
  lat?: number
  lng?: number
}
