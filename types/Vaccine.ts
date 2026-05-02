export interface Vaccine {
  id: string
  pet: string
  name: string
  reminder: boolean
  completed: boolean
  vaccineType?:     string  
  exposureCategory?: string  
  startDate?:       string   
}

export interface CreateVaccineDto {
  name:             string
  pet:              string
  vaccineType:      string
  exposureCategory: string
  startDate:        string   // ISO string
  reminder:         boolean
}

export interface CreateCustomVaccineDto {
  name:      string
  pet:       string
  doseDays:  number[]
  startDate: string
  reminder:  boolean
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
