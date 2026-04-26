// export interface Appointment {
//   id: number
//   patientName: string
//   patientPhone: string
//   date: string
//   time: string
//   status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled'
//   notes?: string
// }

export interface Appointment {
  id: number
  customerName: string      // ✅ بدل patientName
  phone: string             // ✅ بدل patientPhone
  date: string
  time: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled'
  notes?: string
}