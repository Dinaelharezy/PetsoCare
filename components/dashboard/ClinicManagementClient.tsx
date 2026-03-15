
'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from 'react-bootstrap'
import Image from 'next/image'
import { clinicsApi } from '../../data/api/Clinic'
import { Clinic } from '../../types/Clinic'

export default function ClinicManagementClient() {
  const [clinics, setClinics] = useState<Clinic[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null)
  const [successMessage, setSuccessMessage] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    governorate: '',
    phone: '',
    facebookPage: '',
    imageUrl: '',
    bookingPrice: '',
    workingDays: '',
    workingHours: '',
  })

  const governorates = ['Port Said', 'Ismailia', 'Suez', 'Cairo']

  const isValidImage = (src?: string) => {
    if (!src) return false
    return src.startsWith('/') || src.startsWith('http')
  }

  useEffect(() => { loadClinics() }, [])

  const loadClinics = async () => {
    try {
      setLoading(true)
      const data = await clinicsApi.getAll()
      setClinics(data)
    } catch (error) {
      console.error('Failed to load clinics:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleShowModal = (clinic?: Clinic) => {
    if (clinic) {
      setEditingClinic(clinic)
      setFormData({
        name: clinic.name,
        address: clinic.address,
        governorate: clinic.governorate,
        phone: clinic.phone,
        facebookPage: clinic.facebookPage || '',
        imageUrl: clinic.imageUrl || '',
        bookingPrice: clinic.bookingPrice?.toString() || '',
        workingDays: clinic.workingDays || '',
        workingHours: clinic.workingHours || '',
      })
    } else {
      setEditingClinic(null)
      setFormData({
        name: '',
        address: '',
        governorate: '',
        phone: '',
        facebookPage: '',
        imageUrl: '',
        bookingPrice: '',
        workingDays: '',
        workingHours: '',
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingClinic(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const clinicData: Partial<Clinic> = {
        name: formData.name,
        address: formData.address,
        governorate: formData.governorate,
        phone: formData.phone,
        facebookPage: formData.facebookPage,
        imageUrl: formData.imageUrl,
        bookingPrice: parseFloat(formData.bookingPrice) || 0,
        workingDays: formData.workingDays,
        workingHours: formData.workingHours,
      }

      if (editingClinic) {
        await clinicsApi.update(editingClinic.id, clinicData)
        setSuccessMessage('Clinic updated successfully!')
      } else {
        await clinicsApi.create(clinicData)
        setSuccessMessage('Clinic added successfully!')
      }

      await loadClinics()
      handleCloseModal()
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error saving clinic:', error)
      alert('Failed to save clinic.')
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this clinic?')) {
      try {
        await clinicsApi.delete(id)
        setSuccessMessage('Clinic deleted successfully!')
        await loadClinics()
        setTimeout(() => setSuccessMessage(''), 3000)
      } catch (error) {
        console.error('Error deleting clinic:', error)
      }
    }
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
      </Container>
    )
  }

  return (
    <Container fluid className="px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="page-title">Clinic Management</h1>
        <Button className="btn-primary-green" onClick={() => handleShowModal()}>
          <i className="bi bi-plus-circle me-2"></i>Add New Clinic
        </Button>
      </div>

      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      <Row className="g-4">
        {clinics.map((clinic) => (
          <Col lg={4} md={6} key={clinic.id}>
            <Card className="h-100">
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                {isValidImage(clinic.imageUrl) ? (
                  <Image
                    src={clinic.imageUrl!}
                    alt={clinic.name}
                    width={400}
                    height={220}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center h-100 bg-light">
                    <i className="bi bi-building text-secondary" style={{ fontSize: '4rem' }}></i>
                  </div>
                )}
              </div>

              <Card.Body>
                <h5>{clinic.name}</h5>
                <p className="text-muted mb-1">
                  <i className="bi bi-geo-alt me-1"></i>{clinic.address}
                </p>
                <p className="text-muted mb-1">
                  <i className="bi bi-map me-1"></i>{clinic.governorate}
                </p>
                <p className="text-muted mb-1">
                  <i className="bi bi-telephone me-1"></i>{clinic.phone}
                </p>
                {clinic.workingHours && (
                  <p className="text-muted mb-1">
                    <i className="bi bi-clock me-1"></i>{clinic.workingHours}
                  </p>
                )}
                {clinic.bookingPrice && (
                  <p className="text-muted mb-3">
                    <i className="bi bi-cash me-1"></i>{clinic.bookingPrice} EGP
                  </p>
                )}

                <div className="d-flex gap-2 flex-wrap">
                  <Button variant="outline-primary" size="sm" onClick={() => handleShowModal(clinic)}>
                    <i className="bi bi-pencil me-1"></i>Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(clinic.id)}>
                    <i className="bi bi-trash me-1"></i>Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {clinics.length === 0 && (
          <Col>
            <Card>
              <Card.Body className="text-center text-muted py-5">
                <i className="bi bi-building-x" style={{ fontSize: '48px' }}></i>
                <p className="mt-3">No clinics found. Add your first clinic!</p>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{editingClinic ? 'Edit Clinic' : 'Add New Clinic'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Clinic Name *</Form.Label>
                  <Form.Control
                    type="text" name="name" value={formData.name}
                    onChange={handleInputChange} placeholder="Clinic Name" required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone *</Form.Label>
                  <Form.Control
                    type="tel" name="phone" value={formData.phone}
                    onChange={handleInputChange} placeholder="+20 XXX XXX XXXX" required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Address *</Form.Label>
                  <Form.Control
                    type="text" name="address" value={formData.address}
                    onChange={handleInputChange} placeholder="Street, Area" required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Governorate *</Form.Label>
                  <Form.Select name="governorate" value={formData.governorate} onChange={handleInputChange} required>
                    <option value="">Select governorate</option>
                    {governorates.map(gov => <option key={gov} value={gov}>{gov}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Working Days</Form.Label>
                  <Form.Control
                    type="text" name="workingDays" value={formData.workingDays}
                    onChange={handleInputChange} placeholder="e.g. Saturday - Thursday"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Working Hours</Form.Label>
                  <Form.Control
                    type="text" name="workingHours" value={formData.workingHours}
                    onChange={handleInputChange} placeholder="e.g. 9:00 AM - 5:00 PM"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Booking Price (EGP)</Form.Label>
                  <Form.Control
                    type="number" name="bookingPrice" value={formData.bookingPrice}
                    onChange={handleInputChange} placeholder="500" min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="file" name="imageUrl" value={formData.imageUrl}
                    onChange={handleInputChange} placeholder="/clinic.jpg or https://..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Facebook Page URL</Form.Label>
              <Form.Control
                type="url" name="facebookPage" value={formData.facebookPage}
                onChange={handleInputChange} placeholder="https://facebook.com/yourclinic"
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" className="btn-primary-green">
              {editingClinic ? 'Update Clinic' : 'Add Clinic'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}