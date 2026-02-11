'use client'

import { useState } from 'react'
import { Container, Card, Form, Button } from 'react-bootstrap'

export default function DangerousAnimalReport() {
  const [urgency, setUrgency] = useState('Medium')
  const [formData, setFormData] = useState({
    name: 'Chris Garcia',
    email: 'chris.evans@example.com',
    phone: '+1 (555) 111-2222',
    address: '789 Beach Road',
    city: 'Ismailia',
    state: 'Ismailia',
    description: 'Observed a pack of stray dogs acting aggressively towards passersby near the local park entrance. They appear to be in poor health.'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Location report submitted successfully!')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Container className="py-5" style={{ maxWidth: '800px' }}>
      <h2 className="mb-2">Location-Based Report: Dangerous or Infected Animals</h2>
      <p className="text-muted mb-4">
        Report animals that are dangerous, infected, or in a critical state within a specific location is encountered.
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

          {/* Report Address */}
          <Form.Group className="mb-3">
            <Form.Label>Report Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* City/Town and State/Region */}
          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>City/Town</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>State/Region</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          {/* Animal & Situation Description */}
          <Form.Group className="mb-3">
            <Form.Label>Animal & Situation Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </Form.Group>

          {/* Pin Location Button */}
          <div className="mb-4">
            <Button variant="outline-secondary" className="w-100" style={{ 
              background: '#e8f5e9',
              borderColor: '#c3e6cb',
              color: '#155724'
            }}>
              📍 Pin Location on Map (Screen 1/3)
            </Button>
          </div>

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
          <Button type="submit" className="btn-primary-green w-100">
            Submit Location Report
          </Button>
        </Form>
      </Card>
    </Container>
  )
}