'use client'

import { Card } from 'react-bootstrap'

const notifications = [
  {
    id: 1,
    icon: 'bi-calendar-event',
    iconBg: 'bg-warning-subtle',
    iconColor: 'text-warning',
    title: "Max's Annual Booster Due Today.",
    time: '10:30 AM'
  },
  {
    id: 2,
    icon: 'bi-file-text',
    iconBg: 'bg-info-subtle',
    iconColor: 'text-info',
    title: "Bella's Rabies Vaccine Completed.",
    time: 'Yesterday'
  },
  {
    id: 3,
    icon: 'bi-exclamation-circle',
    iconBg: 'bg-danger-subtle',
    iconColor: 'text-danger',
    title: 'Urgent: Report on stray dog near Park.',
    time: 'Yesterday'
  },
  {
    id: 4,
    icon: 'bi-check-circle',
    iconBg: 'bg-success-subtle',
    iconColor: 'text-success',
    title: "Daisy's Deworming Scheduled.",
    time: 'Tomorrow'
  }
]

export default function NotificationsCard() {
  return (
    <Card className="h-100 animate-card">
      <Card.Body>
        <h5 className="card-title">Recent Notifications</h5>
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <div className={`notification-icon ${notification.iconBg}`}>
              <i className={`bi ${notification.icon} ${notification.iconColor}`}></i>
            </div>
            <div className="notification-content">
              <div className="notification-title">{notification.title}</div>
              <div className="notification-time">{notification.time}</div>
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  )
}