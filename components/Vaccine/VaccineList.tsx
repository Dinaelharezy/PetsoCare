'use client'

import { FiCheckCircle, FiEdit2, FiTrash2, FiClock, FiBell } from 'react-icons/fi'

interface Vaccine {
  id: string
  pet: string
  name: string
  date: Date
  reminder: boolean
  completed: boolean
}

interface VaccineListProps {
  title: string
  vaccines: Vaccine[]
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
  onEdit: (id: string) => void
}

export default function VaccineList({
  title,
  vaccines,
  onDelete,
  onToggleComplete,
  onEdit
}: VaccineListProps) {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return new Date(date).toLocaleDateString('en-US', options)
  }

  if (vaccines.length === 0) {
    return null
  }

  return (
    <div className="vaccine-section">
      <h2 className="section-title">{title}</h2>
      
      {vaccines.map((vaccine) => (
        <div key={vaccine.id} className="vaccine-item">
          <div className="vaccine-info">
            <h4>{vaccine.name}</h4>
            <div className="vaccine-meta">
              <span>
                {vaccine.pet} - {formatDate(vaccine.date)}
              </span>
              {vaccine.reminder && (
                <span>
                  <FiBell size={14} /> Reminder Set
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className={`vaccine-status ${vaccine.completed ? 'completed' : ''}`}>
              {vaccine.completed ? 'Completed' : 'Pending'}
            </span>
            
            <div className="vaccine-actions">
              <button
                className="action-btn"
                onClick={() => onToggleComplete(vaccine.id)}
                aria-label={vaccine.completed ? 'Mark as incomplete' : 'Mark as complete'}
                title={vaccine.completed ? 'Mark as incomplete' : 'Mark as complete'}
              >
                <FiCheckCircle size={18} />
              </button>
              <button
                className="action-btn"
                onClick={() => onEdit(vaccine.id)}
                aria-label="Edit vaccine"
                title="Edit vaccine"
              >
                <FiEdit2 size={18} />
              </button>
              <button
                className="action-btn delete"
                onClick={() => onDelete(vaccine.id)}
                aria-label="Delete vaccine"
                title="Delete vaccine"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}