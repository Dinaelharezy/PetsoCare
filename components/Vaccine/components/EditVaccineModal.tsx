// // components/Vaccine/components/EditVaccineModal.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { Modal, Button, Form, Alert } from 'react-bootstrap';
// import { Vaccine } from '../../../types/Vaccine';

// interface Props {
//   show: boolean;
//   vaccine: Vaccine | null;
//   onClose: () => void;
//   onUpdate: (id: string, date: string, reminder: boolean) => Promise<boolean>;
//   submitting: boolean;
// }

// export default function EditVaccineModal({ show, vaccine, onClose, onUpdate, submitting }: Props) {
//   const [startDate, setStartDate] = useState('');
//   const [reminder, setReminder] = useState(false);
//   const [err, setErr] = useState('');

  
//   useEffect(() => {
//     if (show && vaccine) {
//       setStartDate(vaccine.startDate ? vaccine.startDate.split('T')[0] : '');
//       setReminder(vaccine.reminder || false);
//       setErr('');
//     }
//   }, [show, vaccine]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErr('');
    
//     if (!vaccine) return;
//     if (!startDate) {
//       setErr('Please select a date.');
//       return;
//     }

//     const success = await onUpdate(vaccine.id, new Date(startDate).toISOString(), reminder);
//     if (success) onClose();
//   };

//   if (!vaccine) return null;

//   return (
//     <Modal show={show} onHide={onClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title className="fw-bold">Edit Vaccine: {vaccine.vaccineName}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {err && <Alert variant="danger">{err}</Alert>}
        
//         <Form onSubmit={handleSubmit}>
//           {/* معلومات ثابتة للعرض فقط */}
//           <div className="mb-3 p-2 bg-light rounded">
//             <div><strong>Name:</strong> {vaccine.pet}</div>
//             <div><strong>Type:</strong> {vaccine.vaccineType || 'N/A'}</div>
//           </div>

//           <Form.Group className="mb-3">
//             <Form.Label className="text-muted small fw-semibold text-uppercase">
//               Next Dose Date 
//             </Form.Label>
//             <Form.Control
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-4">
//             <Form.Check
//               type="switch"
//               label="Enable Reminder"
//               checked={reminder}
//               onChange={() => setReminder(!reminder)}
//             />
//           </Form.Group>

//           <div className="d-flex justify-content-end gap-2">
//             <Button variant="light" onClick={onClose} disabled={submitting}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={submitting} className="background-for-app">
//               {submitting ? 'Saving...' : 'Save Changes'}
//             </Button>
//           </div>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// }

'use client'

import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Vaccine } from '../../../types/Vaccine'

interface EditVaccineModalProps {
  show: boolean
  vaccine: Vaccine | null
  onClose: () => void
  onUpdate: (id: string, date: string, reminder: boolean) => Promise<boolean>
  submitting: boolean
}

export default function EditVaccineModal({ 
  show, 
  vaccine, 
  onClose, 
  onUpdate, 
  submitting 
}: EditVaccineModalProps) {
  const [date, setDate] = useState('')
  const [reminder, setReminder] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (vaccine) {
      if (vaccine.startDate) {
        const formattedDate = new Date(vaccine.startDate).toISOString().split('T')[0]
        setDate(formattedDate)
      } else {
        setDate('')
      }
      setReminder(vaccine.reminder || false)
      setError('')
    }
  }, [vaccine])

  const handleSubmit = async () => {
    if (!vaccine) return
    
    if (!date) {
      setError('Please select a date')
      return
    }

    const success = await onUpdate(vaccine.id, date, reminder)
    if (success) {
      onClose()
      setError('')
    } else {
      setError('Failed to update vaccine. Please try again.')
    }
  }

  if (!vaccine) return null

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 24px 0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h4 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            margin: 0,
            color: '#1f2937',
          }}>
            Edit Vaccine
          </h4>
          <button
            onClick={onClose}
            disabled={submitting}
            style={{
              background: 'none',
              border: 'none',
              cursor: submitting ? 'not-allowed' : 'pointer',
              padding: '4px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: submitting ? 0.5 : 1,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          {/* Vaccine Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px',
            }}>
              Vaccine Name
            </label>
            <div style={{
              padding: '10px 14px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '14px',
              color: '#1f2937',
            }}>
              {vaccine.vaccineName}
            </div>
          </div>

          {/* For (User/Pet Name) */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px',
            }}>
              For
            </label>
            <div style={{
              padding: '10px 14px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '14px',
              color: '#1f2937',
            }}>
              {vaccine.userName}
            </div>
          </div>

          {/* Date Picker */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px',
            }}>
              Next Dose Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
                setError('')
              }}
              disabled={submitting}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: error ? '1px solid #dc2626' : '1px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '14px',
                color: '#1f2937',
                backgroundColor: submitting ? '#f9fafb' : 'white',
                outline: 'none',
                transition: 'all 0.2s',
              }}
            />
            {error && (
              <p style={{
                fontSize: '12px',
                color: '#dc2626',
                marginTop: '6px',
                marginBottom: 0,
              }}>
                {error}
              </p>
            )}
          </div>

          {/* Reminder Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 0',
            borderTop: '1px solid #f0f0f0',
            borderBottom: '1px solid #f0f0f0',
          }}>
            <div>
              <div style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '2px',
              }}>
                Send Reminder
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280',
              }}>
                Get notified before the vaccine is due
              </div>
            </div>
            <button
              onClick={() => !submitting && setReminder(!reminder)}
              disabled={submitting}
              style={{
                width: '44px',
                height: '24px',
                backgroundColor: reminder ? '#8ae68d' : '#e5e7eb',
                borderRadius: '12px',
                border: 'none',
                cursor: submitting ? 'not-allowed' : 'pointer',
                position: 'relative',
                transition: 'background-color 0.2s',
                padding: 0,
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
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px 24px 24px',
          display: 'flex',
          gap: '12px',
        }}>
          <button
            onClick={onClose}
            disabled={submitting}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              backgroundColor: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: submitting ? 'not-allowed' : 'pointer',
              color: '#374151',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
              className="background-for-app"
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '500',
              cursor: submitting ? 'not-allowed' : 'pointer',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {submitting ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </Modal>
  )
}