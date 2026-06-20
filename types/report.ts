export type ReportStatus =
  | "Pending"
  | "Seen"
  | "Approved"
  | "InProgress"
  | "Done"
  | "Rejected";

export type ReportType =
  | "Bite"
  | "DangerousAnimal"
  | "Complaint";



export interface Report {
  id:                     number
  type:                   ReportType
  status:                 ReportStatus
  name:                   string
  phone:                  string
  governorate:            string
  district:               string
  adminResponse?:         string
  latitude?:              number
  longitude?:             number
  biteReport?:            BiteReport
  dangerousAnimalReport?: DangerousAnimalReport
  complaintReport?:       ComplaintReport
  [key: string]:          any   // للـ dynamic fields في الـ modal
}
 

export interface BiteReport {
  animalType:         string
  exposureType:       string
  severity:           string
  exposureDateTime:   string
  locationCity:       string
  bodyLocations:      string   // JSON string from backend
  initialActions:     string   // JSON string from backend
  otherBodyLocation?: string
  otherAction?:       string
}
 
export interface DangerousAnimalReport {
  animalType:        string
  reportDate:        string
  locationCity:      string
  selectedSymptoms:  string   // JSON string from backend
  otherSymptom?:     string
}
 
export interface ComplaintReport {
  email:    string
  subject:  string
  message:  string
  urgency:  string
}