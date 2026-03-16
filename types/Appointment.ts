export interface Appointment {
  id: number
  patientName: string
  patientPhone: string
  date: string
  time: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled'
  notes?: string
}