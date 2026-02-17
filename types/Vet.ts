

export interface Vet {
  id: string
  name: string
  specialty: string
  rating: number
  reviews: number
  image: string
  location: string
  phone: string
  email: string
  bio: string
  experience?: number
  published?: boolean
  createdAt?: string
  updatedAt?: string
}

// For the admin form
export interface VetFormData {
  name: string
  specialty: string
  rating: string
  reviews: string
  image: string
  location: string
  phone: string
  email: string
  bio: string
  experience: string
  published: boolean
}

// Review interface
export interface Review {
  id: string
  vetId: string
  name: string
  rating: number
  date: string
  comment: string
}