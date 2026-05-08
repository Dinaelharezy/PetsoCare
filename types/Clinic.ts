

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

export interface ClinicForm {
  name:         string
  address:      string
  governorate:  string
  phone:        string
  facebookPage: string
  imageUrl:     string
  bookingPrice: string
  workingDays:  string
  workingHours: string
}
