// components/RatingModal.tsx
'use client'

import { useState, useEffect } from 'react'

interface RatingModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (rating: number, feedback: string) => void
  triggerAction: 'booking' | 'report' | 'vaccination'
}

export default function RatingModal({ isOpen, onClose, onSubmit, triggerAction }: RatingModalProps) {
  const [rating, setRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [feedback, setFeedback] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setRating(0)
      setHoverRating(0)
      setFeedback('')
    }
  }, [isOpen])

  if (!isOpen) return null

  const getActionText = () => {
    switch (triggerAction) {
      case 'booking':
        return 'your appointment with the veterinarian'
      case 'report':
        return 'reporting a suspected rabies case'
      case 'vaccination':
        return 'completing 3 vaccination doses'
      default:
        return 'using PetsoCare'
    }
  }

  const getTitle = () => {
    switch (triggerAction) {
      case 'booking':
        return 'How was your visit?'
      case 'report':
        return 'How was your reporting experience?'
      case 'vaccination':
        return 'How was your vaccination experience?'
      default:
        return 'Rate Your Experience'
    }
  }

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating before submitting')
      return
    }

    setIsSubmitting(true)
    await onSubmit(rating, feedback)
    setIsSubmitting(false)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.2s ease',
        }}
        onClick={onClose}
      >
        {/* Modal Content */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            maxWidth: '450px',
            width: '90%',
            padding: '32px 24px',
            position: 'relative',
            animation: 'slideUp 0.3s ease',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#94a3b8',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#475569')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
          >
            ×
          </button>

          {/* Icon */}
          <div
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#fef3c7',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '32px',
            }}
          >
            ⭐
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '8px',
              color: '#1e293b',
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            {getTitle()}
          </h3>

          {/* Subtitle */}
          <p
            style={{
              textAlign: 'center',
              color: '#64748b',
              marginBottom: '24px',
              fontSize: '0.9rem',
            }}
          >
            Your feedback helps us improve {getActionText()}
          </p>

          {/* Star Rating */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '48px',
                    cursor: 'pointer',
                    transition: 'transform 0.1s ease',
                    padding: '0 4px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <span
                    style={{
                      color: (hoverRating || rating) >= star ? '#fbbf24' : '#e2e8f0',
                      transition: 'color 0.1s ease',
                    }}
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              {rating === 1 && '😞 Very Poor'}
              {rating === 2 && '🙁 Poor'}
              {rating === 3 && '😐 Average'}
              {rating === 4 && '🙂 Good'}
              {rating === 5 && '😍 Excellent!'}
            </p>
          </div>

          {/* Feedback Textarea */}
          <div style={{ marginBottom: '24px' }}>
            <label
              htmlFor="feedback"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#334155',
                marginBottom: '8px',
              }}
            >
              Share your experience (optional)
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what went well or how we can improve..."
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontFamily: 'inherit',
                resize: 'vertical',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#0f7b6c')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: rating === 0 ? '#cbd5e1' : '#0f7b6c',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: rating === 0 ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              if (rating !== 0) e.currentTarget.style.backgroundColor = '#0a5c50'
            }}
            onMouseLeave={(e) => {
              if (rating !== 0) e.currentTarget.style.backgroundColor = '#0f7b6c'
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>

          {/* Skip Link */}
          <button
            onClick={onClose}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              marginTop: '16px',
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              fontSize: '0.875rem',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Maybe later
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}


// // app/about/page.tsx (أو أي صفحة فيها الإجراءات)
// 'use client'

// import { useRatingModal } from '@/hooks/useRatingModal'
// import RatingModal from '@/components/RatingModal'

// export default function About() {
//   const { isModalOpen, triggerAction, checkAndShowModal, submitRating, closeModal } = useRatingModal()

//   // Example function when user books an appointment
//   const handleBooking = async () => {
//     // Your booking logic here
//     console.log('Booking completed')
    
//     // Show rating modal
//     checkAndShowModal('booking')
//   }

//   // Example function when user submits a report
//   const handleReport = async () => {
//     // Your report logic here
//     console.log('Report submitted')
    
//     // Show rating modal
//     checkAndShowModal('report')
//   }

//   // Example function when user completes vaccination
//   const handleVaccination = async () => {
//     // Your vaccination logic here
//     console.log('Vaccination recorded')
    
//     // Show rating modal
//     checkAndShowModal('vaccination')
//   }

//   return (
//     <>
//       {/* Your page content */}
//       <div className="about-page">
//         {/* Example buttons for testing */}
//         <button onClick={handleBooking}>Book Appointment</button>
//         <button onClick={handleReport}>Submit Report</button>
//         <button onClick={handleVaccination}>Record Vaccination</button>
//       </div>

//       {/* Rating Modal */}
//       <RatingModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onSubmit={submitRating}
//         triggerAction={triggerAction}
//       />
//     </>
//   )
// }