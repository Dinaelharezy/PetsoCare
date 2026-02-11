'use client'

import { useState } from 'react'
import { Container, Card, Form, Button } from 'react-bootstrap'

export default function EmergencyReport() {
  const [urgency, setUrgency] = useState('High')
  const [formData, setFormData] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 987-6543',
    location: '456 Oak Ave',
    description: 'Found a stray cat with a noticeable limp on its front paw. Appears disoriented and in pain. Needs urgent medical attention.'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Emergency report submitted successfully!')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Container className="py-5" style={{ maxWidth: '800px' }}>
      <h2 className="mb-2">Emergency Report: Immediate Help Needed</h2>
      <p className="text-muted mb-4">
        For urgent situations involving sick or injured animals requiring swift attention.
      </p>

      <Card className="p-4">
        <Form onSubmit={handleSubmit}>
          {/* Name and Email */}
          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          {/* Phone Number */}
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* Exact Location */}
          <Form.Group className="mb-3">
            <Form.Label>Exact Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* Situation Description */}
          <Form.Group className="mb-3">
            <Form.Label>Situation Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </Form.Group>

          {/* Upload Photo */}
          <Form.Group className="mb-4">
            <Form.Label>Upload Photo (Optional)</Form.Label>
            <div className="upload-area">
              <div className="upload-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <p className="mb-0">Drag & drop photos here, or click to upload</p>
            </div>
          </Form.Group>

          {/* Urgency Level */}
          <Form.Group className="mb-4">
            <Form.Label>Urgency Level</Form.Label>
            <div className="urgency-selector">
              <div
                className={`urgency-option ${urgency === 'Low' ? 'selected low' : ''}`}
                onClick={() => setUrgency('Low')}
              >
                Low
              </div>
              <div
                className={`urgency-option ${urgency === 'Medium' ? 'selected medium' : ''}`}
                onClick={() => setUrgency('Medium')}
              >
                Medium
              </div>
              <div
                className={`urgency-option ${urgency === 'High' ? 'selected high' : ''}`}
                onClick={() => setUrgency('High')}
              >
                High
              </div>
            </div>
          </Form.Group>

          {/* Submit Button */}
          <Button type="submit" className="btn-danger-custom w-100">
            Submit Emergency Report
          </Button>
        </Form>
      </Card>
    </Container>
  )
}