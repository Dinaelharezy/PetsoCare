
export type AnimalType = "Dogs" | "Cats" | "Both";

export interface Shelter {
  id: string
  name: string
  governorate: string
  address: string      
  animalType: string
  capacity: string      
  phone: string        
  workingHours: string
  notes?: string
  lat?: number
  lng?: number
}
