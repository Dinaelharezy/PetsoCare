
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap'
import Image from 'next/image'
import { vetsApi } from '../../data/api/vet'
import { Vet } from '../../types/Vet'


export default function DoctorProfileClient() {
  const params = useParams()
  const router = useRouter()
  const [vet, setVet] = useState<Vet | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState(9)

  const weekDays = [
    { label: 'Mon', day: 6 },
    { label: 'Tue', day: 7 },
    { label: 'Wed', day: 8 },
    { label: 'Thu', day: 9 },
    { label: 'Fri', day: 10 },
    { label: 'Sat', day: 11 },
    { label: 'Sun', day: 12 }
  ]

  const reviews = [
    {
      name: 'Ahmed A.',
      rating: 5,
      date: 'Dec 18, 2025',
      comment: 'Dr. Petrova is amazing! She genuinely cares not only excellently knowledgeable, highly recommend.'
    },
    {
      name: 'Sara K.',
      rating: 4,
      date: 'Dec 20, 2025',
      comment: 'Great experience. The staff was friendly, and Dr. Petrova provided clear explanations. A bit of a wait, but worth it.'
    },
    {
      name: 'Omar M.',
      rating: 5,
      date: 'Aug 12, 2025',
      comment: 'I was impressed quickly treated my pet. Dr. Petrova is super surgery. Couldn\'t be happier with the results.'
    }
  ]

  useEffect(() => {
    const fetchVet = async () => {
      if (!params?.id) return

      try {
        setLoading(true)
        const data = await vetsApi.getById(params.id as string)
        
        if (!data) {
          setError('Doctor not found')
          return
        }

        // Check if vet is published
        if (data.published === false) {
          setError('This doctor profile is not available')
          return
        }

        setVet(data)
      } catch (err) {
        console.error('Failed to fetch vet:', err)
        setError('Failed to load doctor profile')
      } finally {
        setLoading(false)
      }
    }

    fetchVet()
  }, [params?.id])

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Review submitted successfully!')
  }

  const handleConfirmAppointment = () => {
    if (vet) {
      // Here you can trigger the notification to admin
      // using the same system as the booking page
      alert(`Appointment confirmed with ${vet.name} on day ${selectedDate}`)
      
      // You can dispatch the event here
      const event = new CustomEvent('newAppointment', {
        detail: {
          doctorName: vet.name,
          patientName: 'Current User', // Get from user session
          date: `Day ${selectedDate}`
        }
      })
      window.dispatchEvent(event)
    }
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading doctor profile...</p>
      </Container>
    )
  }

  if (error || !vet) {
    return (
      <Container className="py-5 text-center">
        <h3 className="text-muted">{error || 'Doctor not found'}</h3>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => router.push('/main/Vet-profile')}
        >
          Back to Doctors
        </button>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      {/* Doctor Profile Section */}
      <Card className="doctor-card p-5 mb-4" style={{
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        borderRadius: '15px',
        border: 'none'
      }}>
        <Row>
          <Col md={2}>
            <div className="doctor-image mt-2 mx-0" style={{
              width: '100%',
              height: '180px',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              {vet.image ? (
                <Image 
                  src={vet.image} 
                  alt={vet.name} 
                  width={180}
                  height={180}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <div className="d-flex align-items-center justify-content-center h-100 bg-light">
                  <i className="bi bi-person-fill text-secondary" style={{ fontSize: '4rem' }}></i>
                </div>
              )}
            </div>
          </Col>
          <Col md={10}>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h2 className="mb-2">{vet.name}</h2>
                <p className="text-muted mb-0">{vet.specialty}</p>
                {vet.experience && (
                  <p className="text-muted mb-0">
                    <i className="bi bi-award me-2"></i>
                    {vet.experience} years of experience
                  </p>
                )}
              </div>
              <div className="text-end">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-star-fill text-warning"></i>
                  <span><strong>{vet.rating}</strong> ({vet.reviews} reviews)</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-geo-alt-fill text-success"></i>
                  <span>{vet.location}</span>
                </div>
              </div>
            </div>
            
            <p className="mb-3" style={{ lineHeight: '1.8' }}>
              {vet.bio}
            </p>
            
            <div className="contact-info" style={{ 
              display: 'flex', 
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              <span>
                <i className="bi bi-telephone-fill me-2"></i>
                {vet.phone}
              </span> 
              <span>
                <i className="bi bi-envelope-fill me-2"></i>
                {vet.email}
              </span>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Book Appointment Section */}
      <div className="section-header mb-3">
        <h3 className="section-title" style={{ fontSize: '1.5rem', fontWeight: '600' }}>
          Book an Appointment
        </h3>
        <p className="section-subtitle text-muted">
          Please select time to schedule your scheduled appointment. Emergency appointments available upon request.
        </p>
      </div>

      <Card className="p-4 mb-4" style={{
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        borderRadius: '15px',
        border: 'none'
      }}>
        <h5 className="mb-3">Select a Day</h5>
        <div className="date-selector" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
          gap: '10px',
          marginBottom: '20px'
        }}>
          {weekDays.map((item) => (
            <div
              key={item.day}
              className={`date-box ${selectedDate === item.day ? 'selected' : ''}`}
              onClick={() => setSelectedDate(item.day)}
              style={{
                padding: '15px',
                textAlign: 'center',
                borderRadius: '10px',
                border: selectedDate === item.day ? '2px solid #7CB342' : '2px solid #ddd',
                backgroundColor: selectedDate === item.day ? '#f0f8e8' : 'white',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              <span className="date-label" style={{ 
                display: 'block', 
                fontSize: '0.85rem',
                color: '#666',
                marginBottom: '5px'
              }}>
                {item.label}
              </span>
              <span className="date-number" style={{ 
                display: 'block',
                fontSize: '1.5rem',
                fontWeight: '600',
                color: selectedDate === item.day ? '#7CB342' : '#333'
              }}>
                {item.day}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Button 
            className="btn-primary-green"
            onClick={handleConfirmAppointment}
            style={{
              backgroundColor: '#7CB342',
              border: 'none',
              padding: '12px 40px',
              borderRadius: '10px',
              fontWeight: '500',
              fontSize: '1rem'
            }}
          >
            Confirm Appointment
          </Button>
        </div>
      </Card>

      {/* Clinic Location Section */}
      <div className="section-header mb-3">
        <h3 className="section-title" style={{ fontSize: '1.5rem', fontWeight: '600' }}>
          Clinic Location
        </h3>
      </div>

      <div className="map-container mb-4" style={{
        height: '300px',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
      }}>
        <iframe
          className="map-embed"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1&bbox=51.5&layer=mapnik"
          title="Clinic Location Map"
          style={{ width: '100%', height: '100%', border: 'none' }}
        ></iframe>
      </div>
      <p className="text-muted">
        <small>
          <i className="bi bi-geo-alt-fill me-2"></i>
          123 Pet Care Road, {vet.location}, Block #12, Floor 3rd, Office 8
        </small>
      </p>

      {/* Patient Reviews Section */}
      <div className="section-header mb-3">
        <h3 className="section-title" style={{ fontSize: '1.5rem', fontWeight: '600' }}>
          Patient Reviews
        </h3>
      </div>

      {/* Add Review Form */}
      <Card className="review-input mb-3 p-4" style={{
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        borderRadius: '15px',
        border: 'none'
      }}>
        <h5 className="mb-3">Add a Review</h5>
        <Form onSubmit={handleSubmitReview}>
          <div className="star-rating mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#FFD700' }}>
                ☆
              </span>
            ))}
          </div>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Share your experience..."
              rows={3}
              style={{
                borderRadius: '10px',
                border: '1px solid #ddd'
              }}
            />
          </Form.Group>
          <Button 
            className="btn-primary-green"
            type="submit"
            style={{
              backgroundColor: '#7CB342',
              border: 'none',
              padding: '10px 30px',
              borderRadius: '10px',
              fontWeight: '500'
            }}
          >
            Submit Review
          </Button>
        </Form>
      </Card>

      {/* Reviews List */}
      {reviews.map((review, index) => (
        <Card key={index} className="review-card mb-3 p-4" style={{
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          borderRadius: '15px',
          border: 'none'
        }}>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h6 className="mb-1" style={{ fontWeight: '600' }}>{review.name}</h6>
              <div className="star-rating" style={{ color: '#FFD700' }}>
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
            </div>
            <span className="review-date text-muted" style={{ fontSize: '0.85rem' }}>
              {review.date}
            </span>
          </div>
          <p className="mb-0" style={{ lineHeight: '1.6' }}>{review.comment}</p>
        </Card>
      ))}
    </Container>
  )
}