'use client'

import { useState } from 'react'
import { Container, Card, Form, Button } from 'react-bootstrap'

export default function GeneralComplainment() {
  const [urgency, setUrgency] = useState('Low')
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 333-4444',
    subject: 'Feedback on Vaccination Reminders',
    message: 'I appreciate the vaccine reminders, but I noticed they sometimes come too late. Could there be an option to set the reminder days earlier, perhaps 1-2 weeks in advance?'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('General complaint submitted successfully!')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Container className="py-5" style={{ maxWidth: '800px' }}>
      <h2 className="mb-2">General Complaints & Feedback</h2>
      <p className="text-muted mb-4">
        For non-urgent issues, general feedback, or reporting minor concerns about animal welfare or facility services.
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
            <Form.Label>Phone Number (Optional)</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Subject */}
          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* Your Message */}
          <Form.Group className="mb-3">
            <Form.Label>Your Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              required
            />
          </Form.Group>

          {/* Attach Supporting Photo */}
          <Form.Group className="mb-4">
            <Form.Label>Attach Supporting Photo (Optional)</Form.Label>
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
            Submit General Complaint
          </Button>
        </Form>
      </Card>
    </Container>
  )
}