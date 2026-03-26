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
    <Card className="h-100 animate-card" >
      <Card.Body className="d-flex flex-column">
        <h5 className="card-title ps-3 pt-2">Report Dangerous Animal</h5>
        <Form onSubmit={handleSubmit} className="d-flex flex-column flex-grow-1">
          <Form.Group className="mb-3 flex-grow-1">
            <Form.Control
              as="textarea"
              placeholder="Location or description of dangerous animal"
              value={report}
              onChange={(e) => setReport(e.target.value)}
              style={{ minHeight: '30px', height: '100%' }}
            />
          </Form.Group>
          <Button type="submit" className="w-100 color-for-app">
            <i className="bi bi-exclamation-triangle me-2"></i>
            Add Warning
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}