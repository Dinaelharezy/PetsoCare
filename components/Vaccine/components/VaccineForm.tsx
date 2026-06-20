// 'use client'

// import { useState } from 'react'
// import { Form } from 'react-bootstrap'

// interface AddVaccineFormProps {
//   onAddVaccine: (vaccine: {
//     pet: string
//     name: string
//     date: Date
//     reminder: boolean
//     completed: boolean
//   }) => void
// }

// export default function AddVaccineForm({ onAddVaccine }: AddVaccineFormProps) {
//   const [pet, setPet] = useState('')
//   const [vaccineName, setVaccineName] = useState('')
//   const [vaccineDate, setVaccineDate] = useState('')
//   const [reminder, setReminder] = useState(false)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
    
//     if (!pet || !vaccineName || !vaccineDate) {
//       return
//     }

//     onAddVaccine({
//       pet,
//       name: vaccineName,
//       date: new Date(vaccineDate),
//       reminder,
//       completed: false
//     })

//     // Reset form
//     setPet('')
//     setVaccineName('')
//     setVaccineDate('')
//     setReminder(false)
//   }

//   return (
//     <div className="add-vaccine-card ">
//       <h2 className="card-title">Add New Vaccine</h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label className="form-label">Select Pet</Form.Label>
//           <Form.Select
//             value={pet}
//             onChange={(e) => setPet(e.target.value)}
//             className="form-select"
//           >
//             <option value="">Choose a pet...</option>
//             <option value="Buddy">Buddy</option>
//             <option value="Whiskers">Whiskers</option>
//             <option value="Max">Max</option>
//             <option value="Luna">Luna</option>
//           </Form.Select>
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label className="form-label">Vaccine Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="e.g., Rabies"
//             value={vaccineName}
//             onChange={(e) => setVaccineName(e.target.value)}
//             className="form-control"
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label className="form-label">Vaccine Date</Form.Label>
//           <Form.Control
//             type="date"
//             value={vaccineDate}
//             onChange={(e) => setVaccineDate(e.target.value)}
//             className="form-control"
//           />
//         </Form.Group>

//         <div className="reminder-checkbox">
//           <Form.Check
//             type="checkbox"
//             id="reminder-checkbox"
//             checked={reminder}
//             onChange={(e) => setReminder(e.target.checked)}
//           />
//           <Form.Label htmlFor="reminder-checkbox" className="mb-0">
//             Set Reminder
//           </Form.Label>
//         </div>

//         <button type="submit" className="btn-add-vaccine">
//           Add Vaccine
//         </button>
//       </Form>
//     </div>
//   )
// }
'use client'

import { useState } from 'react'
import { Form } from 'react-bootstrap'

interface AddVaccineFormProps {
  onAddVaccine: (vaccine: {
    pet: string
    name: string
    date: Date
    reminder: boolean
    completed: boolean
  }) => void
  isSubmitting?: boolean
}

export default function VaccineForm({ onAddVaccine, isSubmitting = false }: AddVaccineFormProps) {
  const [pet, setPet] = useState('')
  const [vaccineName, setVaccineName] = useState('')
  const [vaccineDate, setVaccineDate] = useState('')
  const [reminder, setReminder] = useState(false)
  const [errors, setErrors] = useState<{ pet?: string; vaccineName?: string; vaccineDate?: string }>({})

  const validateForm = () => {
    const newErrors: { pet?: string; vaccineName?: string; vaccineDate?: string } = {}
    
    if (!pet) newErrors.pet = 'Please select a pet'
    if (!vaccineName.trim()) newErrors.vaccineName = 'Please enter vaccine name'
    if (!vaccineDate) newErrors.vaccineDate = 'Please select a date'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    onAddVaccine({
      pet,
      name: vaccineName,
      date: new Date(vaccineDate),
      reminder,
      completed: false
    })

    // Reset form
    setPet('')
    setVaccineName('')
    setVaccineDate('')
    setReminder(false)
    setErrors({})
  }

  return (
    <div style={{ 
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '24px',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
    }}>
      <h2 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '20px',
        paddingBottom: '12px',
        borderBottom: '2px solid #f0f0f0'
      }}>
        Add New Vaccine
      </h2>
      
      <Form onSubmit={handleSubmit}>
        {/* Select Pet */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Select Pet
          </label>
          <select
            value={pet}
            onChange={(e) => {
              setPet(e.target.value)
              if (errors.pet) setErrors({ ...errors, pet: undefined })
            }}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '10px 14px',
              border: errors.pet ? '1px solid #dc2626' : '1px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '14px',
              color: '#1f2937',
              backgroundColor: isSubmitting ? '#f9fafb' : 'white',
              outline: 'none',
              transition: 'all 0.2s',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            <option value="">Choose a pet...</option>
            <option value="Buddy">🐕 Buddy</option>
            <option value="Whiskers">🐈 Whiskers</option>
            <option value="Max">🐕 Max</option>
            <option value="Luna">🐈 Luna</option>
          </select>
          {errors.pet && (
            <p style={{
              fontSize: '12px',
              color: '#dc2626',
              marginTop: '6px',
              marginBottom: 0
            }}>
              {errors.pet}
            </p>
          )}
        </div>

        {/* Vaccine Name */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Vaccine Name
          </label>
          <input
            type="text"
            placeholder="e.g., Rabies, Distemper, Parvovirus"
            value={vaccineName}
            onChange={(e) => {
              setVaccineName(e.target.value)
              if (errors.vaccineName) setErrors({ ...errors, vaccineName: undefined })
            }}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '10px 14px',
              border: errors.vaccineName ? '1px solid #dc2626' : '1px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '14px',
              color: '#1f2937',
              backgroundColor: isSubmitting ? '#f9fafb' : 'white',
              outline: 'none',
              transition: 'all 0.2s',
            }}
          />
          {errors.vaccineName && (
            <p style={{
              fontSize: '12px',
              color: '#dc2626',
              marginTop: '6px',
              marginBottom: 0
            }}>
              {errors.vaccineName}
            </p>
          )}
        </div>

        {/* Vaccine Date */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Vaccine Date
          </label>
          <input
            type="date"
            value={vaccineDate}
            onChange={(e) => {
              setVaccineDate(e.target.value)
              if (errors.vaccineDate) setErrors({ ...errors, vaccineDate: undefined })
            }}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '10px 14px',
              border: errors.vaccineDate ? '1px solid #dc2626' : '1px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '14px',
              color: '#1f2937',
              backgroundColor: isSubmitting ? '#f9fafb' : 'white',
              outline: 'none',
              transition: 'all 0.2s',
            }}
          />
          {errors.vaccineDate && (
            <p style={{
              fontSize: '12px',
              color: '#dc2626',
              marginTop: '6px',
              marginBottom: 0
            }}>
              {errors.vaccineDate}
            </p>
          )}
        </div>

        {/* Reminder Toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 0',
          marginBottom: '24px',
          borderTop: '1px solid #f0f0f0',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '2px'
            }}>
              Set Reminder
            </div>
            <div style={{
              fontSize: '12px',
              color: '#6b7280'
            }}>
              Get notified before the vaccine is due
            </div>
          </div>
          <button
            type="button"
            onClick={() => !isSubmitting && setReminder(!reminder)}
            disabled={isSubmitting}
            style={{
              width: '44px',
              height: '24px',
              backgroundColor: reminder ? '#8ae68d' : '#e5e7eb',
              borderRadius: '12px',
              border: 'none',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              position: 'relative',
              transition: 'background-color 0.2s',
              padding: 0
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: 'white',
              borderRadius: '50%',
              position: 'absolute',
              top: '2px',
              left: reminder ? '22px' : '2px',
              transition: 'left 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }} />
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: '#8ae68d',
            fontSize: '14px',
            fontWeight: '600',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            color: '#1f2937',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) e.currentTarget.style.backgroundColor = '#7ad87d'
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) e.currentTarget.style.backgroundColor = '#8ae68d'
          }}
        >
          {isSubmitting ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Adding Vaccine...
            </>
          ) : (
            '+ Add Vaccine'
          )}
        </button>
      </Form>
    </div>
  )
}