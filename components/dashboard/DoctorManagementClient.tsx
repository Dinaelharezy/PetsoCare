
'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from 'react-bootstrap'
import Image from 'next/image'
import { vetsApi } from '../../data/api/vet'
import { Vet } from '../../types/Vet'

export default function DoctorManagementClient() {
  const [vets, setVets] = useState<Vet[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingVet, setEditingVet] = useState<Vet | null>(null)
  const [successMessage, setSuccessMessage] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    rating: '5.0',
    reviews: '0',
    image: '',
    location: '',
    phone: '',
    email: '',
    bio: '',
    experience: '',
    published: true
  })

  const specialties = [
    'Internal Medicine',
    'Emergency & Critical Care',
    'Exotic Pets',
    'Small Animal Surgery',
    'Veterinary Medicine',
    'Orthopedic & Soft Tissue Surgery',
    'Dental Care',
    'Cardiology',
    'Dermatology'
  ]

  const locations = ['Port Said', 'Ismailia', 'Suez', 'Cairo']

  const isValidImage = (src?: string) => {
    if (!src) return false
    return src.startsWith('/') || src.startsWith('http')
  }

  useEffect(() => {
    loadVets()
  }, [])

  const loadVets = async () => {
    try {
      setLoading(true)
      const data = await vetsApi.getAll()
      setVets(data)
    } catch (error) {
      console.error('Failed to load vets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleShowModal = (vet?: Vet) => {
    if (vet) {
      setEditingVet(vet)
      setFormData({
        name: vet.name,
        specialty: vet.specialty,
        rating: vet.rating.toString(),
        reviews: vet.reviews.toString(),
        image: vet.image || '',
        location: vet.location,
        phone: vet.phone,
        email: vet.email,
        bio: vet.bio,
        experience: vet.experience?.toString() || '',
        published: vet.published !== false
      })
    } else {
      setEditingVet(null)
      setFormData({
        name: '',
        specialty: '',
        rating: '5.0',
        reviews: '0',
        image: '',
        location: '',
        phone: '',
        email: '',
        bio: '',
        experience: '',
        published: true
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingVet(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const safeImage =
        formData.image &&
        (formData.image.startsWith('/') || formData.image.startsWith('http'))
          ? formData.image
          : ''

      const vetData = {
        name: formData.name,
        specialty: formData.specialty,
        rating: parseFloat(formData.rating),
        reviews: parseInt(formData.reviews),
        image: safeImage,
        location: formData.location,
        phone: formData.phone,
        email: formData.email,
        bio: formData.bio,
        experience: parseInt(formData.experience) || 0,
        published: formData.published
      }

      if (editingVet) {
        await vetsApi.update(editingVet.id, vetData)
        setSuccessMessage('Doctor updated successfully!')
      } else {
        await vetsApi.create(vetData)
        setSuccessMessage('Doctor added successfully!')
      }

      await loadVets()
      handleCloseModal()
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error saving doctor:', error)
      alert('Failed to save doctor.')
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await vetsApi.delete(id)
        setSuccessMessage('Doctor deleted successfully!')
        await loadVets()
        setTimeout(() => setSuccessMessage(''), 3000)
      } catch (error) {
        console.error('Error deleting doctor:', error)
      }
    }
  }

  const handleTogglePublish = async (id: string) => {
    try {
      await vetsApi.togglePublish(id)
      await loadVets()
      setSuccessMessage('Doctor status updated!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error toggling publish status:', error)
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
        <h1 className="page-title">Doctor Management</h1>
        <Button className="btn-primary-green" onClick={() => handleShowModal()}>
          <i className="bi bi-person-plus me-2"></i>
          Add New Doctor
        </Button>
      </div>

      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      <Row className="g-4">
        {vets.map((vet) => (
          <Col lg={4} md={6} key={vet.id}>
            <Card className="h-100">
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                {isValidImage(vet.image) ? (
                  <Image
                    src={vet.image!}
                    alt={vet.name}
                    width={400}
                    height={220}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center h-100 bg-light">
                    <i className="bi bi-person-fill text-secondary" style={{ fontSize: '4rem' }}></i>
                  </div>
                )}
                <Badge
                  bg={vet.published !== false ? 'success' : 'secondary'}
                  className="position-absolute top-0 end-0 m-2"
                >
                  {vet.published !== false ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <Card.Body>
                <h5>{vet.name}</h5>
                <p className="text-muted mb-1">{vet.specialty}</p>
                <p className="text-muted mb-3" style={{ fontSize: '0.85rem' }}>{vet.location}</p>

                <div className="d-flex gap-2 flex-wrap">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleShowModal(vet)}
                  >
                    <i className="bi bi-pencil me-1"></i>Edit
                  </Button>
                  <Button
                    variant={vet.published !== false ? 'outline-warning' : 'outline-success'}
                    size="sm"
                    onClick={() => handleTogglePublish(vet.id)}
                  >
                    <i className={`bi bi-${vet.published !== false ? 'eye-slash' : 'eye'} me-1`}></i>
                    {vet.published !== false ? 'Hide' : 'Show'}
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(vet.id)}
                  >
                    <i className="bi bi-trash me-1"></i>Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {vets.length === 0 && (
          <Col>
            <Card>
              <Card.Body className="text-center text-muted py-5">
                <i className="bi bi-person-x" style={{ fontSize: '48px' }}></i>
                <p className="mt-3">No doctors found. Add your first doctor!</p>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {/* ✅ Add / Edit Modal - ده اللي كان ناقص */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingVet ? 'Edit Doctor' : 'Add New Doctor'}
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
                  <Form.Select
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select specialty</option>
                    {specialties.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </Form.Select>
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

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Location *</Form.Label>
                  <Form.Select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select location</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
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
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Rating (1-5)</Form.Label>
                  <Form.Control
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    step="0.1"
                    min="1"
                    max="5"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Number of Reviews</Form.Label>
                  <Form.Control
                    type="number"
                    name="reviews"
                    value={formData.reviews}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Profile Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="/vet1.jpg or https://..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Biography *</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Brief description of the doctor's expertise..."
                rows={4}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="published"
                label="Publish doctor profile (visible to users)"
                checked={formData.published}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" className="btn-primary-green">
              {editingVet ? 'Update Doctor' : 'Add Doctor'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}