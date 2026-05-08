
export interface Appointment {
  id: number
  customerName: string      // ✅ بدل patientName
  phone: string             // ✅ بدل patientPhone
  date: string
  time: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled'
  notes?: string
}

export interface AdminAppointment {
  id: number
  patientName: string
  clinicName: string
  date: string
  time: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled'
}

