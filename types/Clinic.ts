

// export interface Vet {
//   id: string
//   name: string
//   specialty: string
//   rating: number
//   reviews: number
//   image: string
//   location: string
//   phone: string
//   email: string
//   bio: string
//   experience?: number
//   published?: boolean
//   createdAt?: string
//   updatedAt?: string
// }

// types/Clinic.ts
export interface Clinic {
  id: number
  name: string
  address: string
  governorate: string
  phone: string
  facebookPage?: string
  imageUrl?: string
  latitude?: number
  longitude?: number
  bookingPrice?: number
  workingDays?: string
  workingHours?: string
  createdAt?: string
}

