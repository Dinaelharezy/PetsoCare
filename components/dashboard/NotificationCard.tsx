
// 'use client'

// import { Card } from 'react-bootstrap'
// import { useState, useEffect } from 'react'

// interface Notification {
//   id: number
//   icon: string
//   iconBg: string
//   iconColor: string
//   title: string
//   time: string
//   type: 'appointment' | 'vaccine' | 'urgent' | 'general'
// }

// // This would typically come from your backend/state management
// const initialNotifications: Notification[] = [
//   {
//     id: 1,
//     icon: 'bi-calendar-event',
//     iconBg: 'bg-warning-subtle',
//     iconColor: 'text-warning',
//     title: "Max's Annual Booster Due Today.",
//     time: '10:30 AM',
//     type: 'general'
//   },
//   {
//     id: 2,
//     icon: 'bi-file-text',
//     iconBg: 'bg-info-subtle',
//     iconColor: 'text-info',
//     title: "Bella's Rabies Vaccine Completed.",
//     time: 'Yesterday',
//     type: 'vaccine'
//   },
//   {
//     id: 3,
//     icon: 'bi-exclamation-circle',
//     iconBg: 'bg-danger-subtle',
//     iconColor: 'text-danger',
//     title: 'Urgent: Report on stray dog near Park.',
//     time: 'Yesterday',
//     type: 'urgent'
//   },
//   {
//     id: 4,
//     icon: 'bi-check-circle',
//     iconBg: 'bg-success-subtle',
//     iconColor: 'text-success',
//     title: "Daisy's Deworming Scheduled.",
//     time: 'Tomorrow',
//     type: 'general'
//   }
// ]

// export default function NotificationsCard() {
//   const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

//   // Function to add new appointment notification
//   const addAppointmentNotification = (doctorName: string, patientName: string, date: string) => {
//     const newNotification: Notification = {
//       id: Date.now(),
//       icon: 'bi-calendar-check',
//       iconBg: 'bg-primary-subtle',
//       iconColor: 'text-primary',
//       title: `New Appointment: ${patientName} with ${doctorName}`,
//       time: 'Just now',
//       type: 'appointment'
//     }
    
//     setNotifications([newNotification, ...notifications])
//   }

//   // Example: Listen for appointment events (you would integrate this with your actual event system)
//   useEffect(() => {
//     // Create a custom event listener for new appointments
//     const handleNewAppointment = (event: CustomEvent) => {
//       const { doctorName, patientName, date } = event.detail
//       addAppointmentNotification(doctorName, patientName, date)
//     }

//     window.addEventListener('newAppointment' as any, handleNewAppointment as any)

//     return () => {
//       window.removeEventListener('newAppointment' as any, handleNewAppointment as any)
//     }
//   }, [notifications])

//   return (
//     <Card className="h-100 animate-card">
//       <Card.Body>
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h5 className="card-title mb-0">Recent Notifications</h5>
//           {notifications.length > 0 && (
//             <span className="badge bg-primary rounded-pill">{notifications.length}</span>
//           )}
//         </div>
        
//         <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
//           {notifications.map((notification) => (
//             <div key={notification.id} className="notification-item">
//               <div className={`notification-icon ${notification.iconBg}`}>
//                 <i className={`bi ${notification.icon} ${notification.iconColor}`}></i>
//               </div>
//               <div className="notification-content">
//                 <div className="notification-title">{notification.title}</div>
//                 <div className="notification-time">{notification.time}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {notifications.length === 0 && (
//           <div className="text-center text-muted py-4">
//             <i className="bi bi-bell-slash" style={{ fontSize: '32px' }}></i>
//             <p className="mt-2 mb-0">No notifications</p>
//           </div>
//         )}
//       </Card.Body>
//     </Card>
//   )
// }

// // Export the function to trigger notifications from other components
// export const triggerAppointmentNotification = (doctorName: string, patientName: string, date: string) => {
//   const event = new CustomEvent('newAppointment', {
//     detail: { doctorName, patientName, date }
//   })
//   window.dispatchEvent(event)
// }


// 'use client'

// import { Card } from 'react-bootstrap'
// import { useState, useEffect } from 'react'

// interface Notification {
//   id: number
//   icon: string
//   iconBg: string
//   iconColor: string
//   title: string
//   time: string
//   type: 'appointment' | 'vaccine' | 'urgent' | 'general'
// }


// export default function NotificationsCard() {
//   const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

//   const addAppointmentNotification = (doctorName: string, patientName: string) => {
//     const newNotification: Notification = {
//       id: Date.now(),
//       icon: 'bi-calendar-check',
//       iconBg: 'bg-primary-subtle',
//       iconColor: 'text-primary',
//       title: `New Appointment: ${patientName} with ${doctorName}`,
//       time: 'Just now',
//       type: 'appointment'
//     }
//     setNotifications(prev => [newNotification, ...prev])
//   }

//   useEffect(() => {
//     const handleNewAppointment = (event: CustomEvent) => {
//       const { doctorName, patientName } = event.detail
//       addAppointmentNotification(doctorName, patientName)
//     }

//     window.addEventListener('newAppointment' as any, handleNewAppointment as any)
//     return () => window.removeEventListener('newAppointment' as any, handleNewAppointment as any)
//   }, [])
//   //  ↑ dependency array فاضية — مش محتاج [notifications] هنا لأننا بنستخدم prev

//   return (
//     <Card className="h-100 animate-card">
//       <Card.Body>
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h5 className="card-title mb-0">Recent Notifications</h5>
//           {notifications.length > 0 && (
//             <span className="badge bg-primary rounded-pill">{notifications.length}</span>
//           )}
//         </div>

//         <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
//           {notifications.map((notification) => (
//             <div key={notification.id} className="notification-item">
//               <div className={`notification-icon ${notification.iconBg}`}>
//                 <i className={`bi ${notification.icon} ${notification.iconColor}`}></i>
//               </div>
//               <div className="notification-content">
//                 <div className="notification-title">{notification.title}</div>
//                 <div className="notification-time">{notification.time}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {notifications.length === 0 && (
//           <div className="text-center text-muted py-4">
//             <i className="bi bi-bell-slash" style={{ fontSize: '32px' }}></i>
//             <p className="mt-2 mb-0">No notifications</p>
//           </div>
//         )}
//       </Card.Body>
//     </Card>
//   )
// }

// // ─── استخدم الفانكشن دي من أي مكان في التطبيق ───
// // مثال: triggerAppointmentNotification('Dr. Ahmed', 'Sara', 'PetCare PS', '11:00 AM', '2026-03-20')
// export const triggerAppointmentNotification = (
//   doctorName: string,
//   patientName: string,
//   clinicName: string = 'Unknown Clinic',
//   time: string = 'N/A',
//   date: string = new Date().toISOString().slice(0, 10)
// ) => {
//   const event = new CustomEvent('newAppointment', {
//     detail: { doctorName, patientName, clinicName, time, date }
//   })
//   window.dispatchEvent(event)
// }

'use client'

import { Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'

interface Notification {
  id: number
  icon: string
  iconBg: string
  iconColor: string
  title: string
  time: string
  type: 'appointment' | 'vaccine' | 'urgent' | 'general'
}

export default function NotificationsCard() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  // ── جيب الإشعارات من الـ API عند التحميل ──
  useEffect(() => {
    fetch('/api/dashboard/appointments/clinic/{clinicId}', { cache: 'no-store' })
      .then(r => r.json())
      .then((data: Notification[]) => setNotifications(data))
      .catch(err => console.error('Failed to load notifications:', err))
      .finally(() => setLoading(false))
  }, [])

  // ── استمع لأي حجز جديد من أي مكان في التطبيق ──
  useEffect(() => {
    const handleNewAppointment = (event: CustomEvent) => {
      const { doctorName, patientName } = event.detail
      const newNotification: Notification = {
        id: Date.now(),
        icon: 'bi-calendar-check',
        iconBg: 'bg-primary-subtle',
        iconColor: 'text-primary',
        title: `New Appointment: ${patientName} with ${doctorName}`,
        time: 'Just now',
        type: 'appointment',
      }
      setNotifications(prev => [newNotification, ...prev])
    }

    window.addEventListener('newAppointment' as any, handleNewAppointment as any)
    return () => window.removeEventListener('newAppointment' as any, handleNewAppointment as any)
  }, [])

  return (
    <Card className="h-100 animate-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Recent Notifications</h5>
          {notifications.length > 0 && (
            <span className="badge bg-primary rounded-pill">{notifications.length}</span>
          )}
        </div>

        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {loading ? (
            <div className="text-center text-muted py-4">
              <div className="spinner-border spinner-border-sm text-primary" role="status" />
              <p className="mt-2 mb-0" style={{ fontSize: '0.85rem' }}>Loading...</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="notification-item">
                <div className={`notification-icon ${notification.iconBg}`}>
                  <i className={`bi ${notification.icon} ${notification.iconColor}`}></i>
                </div>
                <div className="notification-content">
                  <div className="notification-title">{notification.title}</div>
                  <div className="notification-time">{notification.time}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {!loading && notifications.length === 0 && (
          <div className="text-center text-muted py-4">
            <i className="bi bi-bell-slash" style={{ fontSize: '32px' }}></i>
            <p className="mt-2 mb-0">No notifications</p>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

// ── استدعي الفانكشن دي بعد أي حجز ناجح في أي صفحة ──
export const triggerAppointmentNotification = (
  doctorName: string,
  patientName: string,
  clinicName: string = 'Unknown Clinic',
  time: string = 'N/A',
  date: string = new Date().toISOString().slice(0, 10)
) => {
  const event = new CustomEvent('newAppointment', {
    detail: { doctorName, patientName, clinicName, time, date }
  })
  window.dispatchEvent(event)
}