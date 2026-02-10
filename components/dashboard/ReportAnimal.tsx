'use client'

import { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'

export default function ReportAnimal() {
  const [report, setReport] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (report.trim()) {
      console.log('Report submitted:', report)
      alert('Warning added successfully!')
      setReport('')
    }
  }

  return (
    <Card className="animate-card">
      <Card.Body>
        <h5 className="card-title">Report Dangerous Animal</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Location or description of dangerous animal"
              value={report}
              onChange={(e) => setReport(e.target.value)}
              style={{ minHeight: '80px' }}
            />
          </Form.Group>
          <Button type="submit" className="btn-danger-custom w-100">
            <i className="bi bi-exclamation-triangle me-2"></i>
            Add Warning
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}