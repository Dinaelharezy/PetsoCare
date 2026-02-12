'use client'

import { useState } from 'react'
import { Container, Row, Col, Card, Button, Form, Image } from 'react-bootstrap'
import image from 'next/image'
export default function DoctorProfile({vet} :{name: string, specialty: string, rating: number, reviews: number, location: string}) {
    if (!vet) return null
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

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Review submitted successfully!')
  }

  return (
    <Container className="py-5">
      {/* Doctor Profile Section */}
      <Card className="doctor-card p-5">
        <Row>
      <Col md={2}>
  <div className="doctor-image mt-2 mx-0" style={{
    width: '90%',
    height: '90%',
    
    overflow: 'hidden'
  }}>
    <Image src={vet.image} alt={vet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  </div>
</Col>
          <Col md={10}>
            <h2 className="mb-3">{vet.name}</h2>
            <p className="mb-3">
              `{vet.name} is a highly experienced and caring surgeon with over 15 years in veterinary specializing in complex 
              orthopedic and soft tissue surgeries. She is renowned for her compassionate care and dedication to animal 
              well-being, providing comprehensive diagnostics and surgical treatment for pets. At our Clinic, she cares for 
              pets in need and is dedicated to enhancing pet owners' experience with exceptional care. Dr. Petrova and surgical facilities.`
            </p>
            <div className="contact-info">
              <span>📞 {vet.phone}</span> 
              <span className="ms-3">✉️ {vet.email}</span>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Book Appointment Section */}
      <div className="section-header">
        <h3 className="section-title">Book an Appointment</h3>
        <p className="section-subtitle">
          Please select time to schedule your scheduled appointment. Emergency appointments available upon request.
        </p>
      </div>

      <Card className="p-4 mb-4">
        <h5 className="mb-3">Select a Day</h5>
        <div className="date-selector">
          {weekDays.map((item) => (
            <div
              key={item.day}
              className={`date-box ${selectedDate === item.day ? 'selected' : ''}`}
              onClick={() => setSelectedDate(item.day)}
            >
              <span className="date-label">{item.label}</span>
              <span className="date-number">{item.day}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Button className="btn-primary-green">
            Confirm Appointment
          </Button>
        </div>
      </Card>

      {/* Clinic Location Section */}
      <div className="section-header">
        <h3 className="section-title">Clinic Location</h3>
      </div>

      <div className="map-container mb-4">
        <iframe
          className="map-embed"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1&bbox=51.5&layer=mapnik"
          title="Clinic Location Map"
        ></iframe>
      </div>
      <p className="text-muted">
        <small>📍 123 Pet Care Road, Block #12, Floor 3rd, Office 8</small>
      </p>

      {/* Patient Reviews Section */}
      <div className="section-header">
        <h3 className="section-title">Patient Reviews</h3>
      </div>

      {/* Add Review Form */}
      <Card className="review-input mb-3">
        <h5 className="mb-3">Add a Review</h5>
        <Form onSubmit={handleSubmitReview}>
          <div className="star-rating mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} style={{ cursor: 'pointer', fontSize: '1.5rem' }}>
                ☆
              </span>
            ))}
          </div>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Share your experience..."
              rows={3}
            />
          </Form.Group>
          <Button className="btn-primary-green">
            Submit Review
          </Button>
        </Form>
      </Card>

      {/* Reviews List */}
      {reviews.map((review, index) => (
        <Card key={index} className="review-card">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h6 className="mb-1">{review.name}</h6>
              <div className="star-rating">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
            </div>
            <span className="review-date">{review.date}</span>
          </div>
          <p className="mb-0">{review.comment}</p>
        </Card>
      ))}
    </Container>
  )
}