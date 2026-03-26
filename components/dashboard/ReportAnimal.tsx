'use client'

import { useState } from 'react'
import { Card, Button, Modal, Form } from 'react-bootstrap'

export default function ReportAnimal() {

  const [show, setShow] = useState(false)
  const [report, setReport] = useState('')
  const [location, setLocation] = useState<string | null>(null)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = `${position.coords.latitude}, ${position.coords.longitude}`
        setLocation(coords)
      })
    } else {
      alert('Geolocation not supported')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!report.trim() || !location) {
      alert('Please add description and location')
      return
    }

    console.log({
      report,
      location
    })

    alert('Warning added successfully!')

    setReport('')
    setLocation(null)
    handleClose()
  }

  return (
    <>
          <Card className="animate-card px-4 py-4">
      <Card.Body>
        <h5 className="card-title pb-2">Report Dangerous Animal</h5>
        <div className="d-grid gap-3">
          <Button 
            variant="outline-secondary color-for-app" 
            onClick={handleShow}
          >
            Report
          </Button>
        </div>
      </Card.Body>
    </Card>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Report Dangerous Animal</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            
            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Describe the animal or situation"
                value={report}
                onChange={(e) => setReport(e.target.value)}
              />
            </Form.Group>

            {/* Location */}
            <Button 
              variant="secondary" 
              className="w-100 mb-3"
              onClick={getLocation}
            >
              📍 Get Current Location
            </Button>

            {location && (
              <p className="text-success">
                Location: {location}
              </p>
            )}

            {/* Submit */}
            <Button type="submit" className="w-100 color-for-app">
              Confirm Warning
            </Button>

          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}