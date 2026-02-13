
'use client'

import { useState } from 'react'
import { Container, Row, Col, Card, Button, Table, Modal, Form, Badge } from 'react-bootstrap'

interface Doctor {
  id: number
  name: string
  specialty: string
  experience: number
  email: string
  phone: string
  bio: string
  image?: string
}

export default function DoctorManagementClient() {
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 1,
      name: 'Dr. Rawda Mamdouh',
      specialty: 'Orthopedic & Soft Tissue Surgery',
      experience: 15,
      email: 'rawda.mamdouh@example.com',
      phone: '+20 101 234 5678',
      bio: 'Highly experienced surgeon specializing in complex orthopedic and soft tissue surgeries.',
      image: '/api/placeholder/150/150'
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    experience: '',
    email: '',
    phone: '',
    bio: '',
    image: ''
  })

  const handleShowModal = (doctor?: Doctor) => {
    if (doctor) {
      setEditingDoctor(doctor)
      setFormData({
        name: doctor.name,
        specialty: doctor.specialty,
        experience: doctor.experience.toString(),
        email: doctor.email,
        phone: doctor.phone,
        bio: doctor.bio,
        image: doctor.image || ''
      })
    } else {
      setEditingDoctor(null)
      setFormData({
        name: '',
        specialty: '',
        experience: '',
        email: '',
        phone: '',
        bio: '',
        image: ''
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingDoctor(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingDoctor) {
      // Update existing doctor
      setDoctors(doctors.map(doc => 
        doc.id === editingDoctor.id 
          ? { ...doc, ...formData, experience: parseInt(formData.experience) }
          : doc
      ))
    } else {
      // Add new doctor
      const newDoctor: Doctor = {
        id: Math.max(...doctors.map(d => d.id), 0) + 1,
        ...formData,
        experience: parseInt(formData.experience)
      }
      setDoctors([...doctors, newDoctor])
    }
    
    handleCloseModal()
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter(doc => doc.id !== id))
    }
  }

  return (
    <Container fluid className="px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="page-title">Doctor Management</h1>
        <Button className="btn-primary-green" onClick={() => handleShowModal()}>
          <i className="bi bi-person-plus me-2"></i>
          Add New Doctor
        </Button>
      </div>

      <Card className="animate-card">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialty</th>
                <th>Experience</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <div 
                          className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                          style={{ width: '50px', height: '50px' }}
                        >
                          <i className="bi bi-person-fill text-secondary" style={{ fontSize: '24px' }}></i>
                        </div>
                      </div>
                      <div>
                        <strong>{doctor.name}</strong>
                      </div>
                    </div>
                  </td>
                  <td>{doctor.specialty}</td>
                  <td>
                    <Badge bg="info">{doctor.experience} years</Badge>
                  </td>
                  <td>
                    <div className="small">
                      <i className="bi bi-envelope me-1"></i> {doctor.email}<br/>
                      <i className="bi bi-telephone me-1"></i> {doctor.phone}
                    </div>
                  </td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="me-2"
                      onClick={() => handleShowModal(doctor)}
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDelete(doctor.id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {doctors.length === 0 && (
            <div className="text-center text-muted py-5">
              <i className="bi bi-person-x" style={{ fontSize: '48px' }}></i>
              <p className="mt-3">No doctors found. Add your first doctor!</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Dr. John Doe"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Specialty *</Form.Label>
                  <Form.Control
                    type="text"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    placeholder="e.g., Surgery, Internal Medicine"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="doctor@example.com"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+20 XXX XXX XXXX"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Years of Experience *</Form.Label>
              <Form.Control
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="10"
                min="0"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Biography *</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Brief description of the doctor's expertise and approach..."
                rows={4}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Profile Image URL (Optional)</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" className="btn-primary-green">
              {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}