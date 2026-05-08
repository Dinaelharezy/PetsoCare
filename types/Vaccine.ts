export interface Vaccine {
  id: string
  pet: string
  userName: string
  reminder: boolean
  completed: boolean
  vaccineType?:     string  
  exposureCategory?: string  
  startDate?:       string   
  victimType?: string   
  animalType?: string
  vaccineName?: string
}

export interface CreateVaccineDto {
  userName?:             string
  pet:              string
  vaccineType:      string
  exposureCategory: string
  startDate:        string   // ISO string
  reminder:         boolean
  victimType?: string
  animalType?: string
  vaccineName?: string
}

export interface CreateCustomVaccineDto {
  name:       string
  pet:        string
  doseDays:   number[]
  startDate:  string
  reminder:   boolean
  victimType?: string  
  animalType?: string  
  userName:             string
}

export interface TakeDoseDto {
  id:       string
  date?:    string   // ISO — defaults to now
  reminder?: boolean
}

export interface UpdateVaccineDto {
  id:               string
  name?:            string
  pet?:             string
  vaccineType?:     string
  exposureCategory?: string
  startDate?:       string
  reminder?:        boolean
}


