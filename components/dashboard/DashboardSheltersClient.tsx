
'use client';

import { useEffect, useState } from 'react';
import {
  Container, Row, Col, Card, Button,
  Modal, Form, Badge, Alert
} from 'react-bootstrap';
import { Shelter } from '../../types/Shelter'

const EMPTY_FORM: Shelter = {
  id: "", name: "", governorate: "", address: "",
  animalType: "Dogs", capacity: "", phone: "", workingHours: "", notes: "",
};

export default function DashboardSheltersClient() {
  const [shelters,       setShelters]       = useState<Shelter[]>([])
  const [loading,        setLoading]        = useState(true)
  const [showModal,      setShowModal]      = useState(false)
  const [editingShelter, setEditingShelter] = useState<Shelter | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [form,           setForm]           = useState<Shelter>(EMPTY_FORM)
  const [submitting,     setSubmitting]     = useState(false)

  // ── Delete confirm ──
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletingId,        setDeletingId]        = useState<string | null>(null)

  const fetchShelters = async () => {
    try {
      setLoading(true)
      const res  = await fetch("/api/shelters")
      const json = await res.json()
      setShelters(json.data ?? json)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchShelters() }, [])

  const handleShowModal = (shelter?: Shelter) => {
    if (shelter) {
      setEditingShelter(shelter)
      setForm({
        id:           shelter.id,
        name:         shelter.name,
        address:      shelter.address      ?? "",
        animalType:   shelter.animalType,
        capacity:     shelter.capacity     ?? "",
        phone:        shelter.phone        ?? "",
        workingHours: shelter.workingHours ?? "",
        notes:        shelter.notes        ?? "",
        governorate:  shelter.governorate,
      })
    } else {
      setEditingShelter(null)
      setForm(EMPTY_FORM)
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingShelter(null)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const url    = editingShelter ? `/api/dashboard/shelters/${editingShelter.id}` : "/api/dashboard/shelters"
    const method = editingShelter ? "PUT" : "POST"

    const payload = {
      name:         form.name,
      governorate:  form.governorate,
      address:      form.address,
      animalType:   form.animalType,
      capacity:     form.capacity,
      phone:        form.phone,
      workingHours: form.workingHours,
      notes:        form.notes,
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Request failed")

      setSuccessMessage(editingShelter ? "Shelter updated successfully!" : "Shelter added successfully!")
      await fetchShelters()
      handleCloseModal()
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      console.error(err)
      alert("Failed to save shelter")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteClick = (id: string) => {
    setDeletingId(id)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    if (!deletingId) return
    try {
      await fetch(`/api/dashboard/shelters/${deletingId}`, { method: "DELETE" })
      setSuccessMessage("Shelter deleted successfully!")
      await fetchShelters()
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch {
      alert("Failed to delete shelter")
    } finally {
      setShowDeleteConfirm(false)
      setDeletingId(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setDeletingId(null)
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
      </Container>
    )
  }

  return (
    <Container fluid className="px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="page-title">Shelters</h1>
        <Button className="background-for-app" onClick={() => handleShowModal()}>
          + Add Shelter
        </Button>
      </div>

      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      <Row className="g-4">
        {shelters.map(s => (
          <Col lg={4} md={6} key={s.id}>
            <Card className="h-100" style={{ borderRadius: 12, border: '1px solid #eee' }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="mb-0 fw-semibold">{s.name}</h5>
                  <Badge style={{
                    background: s.animalType === 'Dogs' ? '#e0f2fe' : s.animalType === 'Cats' ? '#fef3c7' : '#dcfce7',
                    color:      s.animalType === 'Dogs' ? '#0369a1' : s.animalType === 'Cats' ? '#92400e' : '#166534',
                    fontWeight: 600, fontSize: '0.75rem', padding: '4px 10px', borderRadius: 20,
                  }}>
                    {s.animalType === 'Dogs' ? '🐕' : s.animalType === 'Cats' ? '🐈' : '🐾'} {s.animalType}
                  </Badge>
                </div>

                {s.governorate  && <div className="text-muted small mb-1">📍 {s.governorate}</div>}
                {s.address      && <div className="text-muted small mb-2">{s.address}</div>}
                {s.phone        && <div className="small mb-1">📞 {s.phone}</div>}
                {s.workingHours && <div className="small mb-1">🕐 {s.workingHours}</div>}
                {s.capacity     && <div className="small mb-2">🏠 Capacity: {s.capacity}</div>}
      
          

                <div className="mt-3 d-flex gap-2">
                  <Button size="sm" variant="light" className="border flex-grow-1" onClick={() => handleShowModal(s)}>
                    ✏️ Edit
                  </Button>
                  <Button
                    size="sm" variant="light" className="flex-grow-1"
                    style={{ border: '1px solid #dc3545', color: '#dc3545' }}
                    onClick={() => handleDeleteClick(s.id)}
                  >
                    🗑️ Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {shelters.length === 0 && (
          <Col>
            <Card>
              <Card.Body className="text-center text-muted py-5">
                <p className="mt-3">No shelters found. Add your first shelter!</p>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {/* ── Add / Edit Modal ── */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered scrollable>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editingShelter ? "Edit Shelter" : "Add New Shelter"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name *</Form.Label>
                  <Form.Control name="name" value={form.name} onChange={handleInputChange} placeholder="Shelter name" required />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Governorate</Form.Label>
                  <Form.Control name="governorate" value={form.governorate} onChange={handleInputChange} placeholder="e.g. Port Said" />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control name="address" value={form.address} onChange={handleInputChange} placeholder="Street, Area" />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Animal Type</Form.Label>
                  <Form.Select name="animalType" value={form.animalType} onChange={handleInputChange}>
                    <option value="Dogs">Dogs</option>
                    <option value="Cats">Cats</option>
                    <option value="Both">Both</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Capacity</Form.Label>
                  <Form.Control name="capacity" value={form.capacity} onChange={handleInputChange} placeholder="e.g. 50" />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control name="phone" value={form.phone} onChange={handleInputChange} placeholder="+20 XXX XXX XXXX" />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Working Hours</Form.Label>
                  <Form.Control name="workingHours" value={form.workingHours} onChange={handleInputChange} placeholder="e.g. 9 AM - 5 PM" />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" rows={2} name="notes" value={form.notes} onChange={handleInputChange} />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="light" className="border" onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" disabled={submitting} className="background-for-app">
              {submitting ? "Saving..." : editingShelter ? "Update Shelter" : "Add Shelter"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* ── Delete Confirm Modal ── */}
      <Modal show={showDeleteConfirm} onHide={cancelDelete} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="text-danger">
            🗑️ Delete Shelter
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-0">
          <div className="text-center py-3">
            <div className="mb-3" style={{ fontSize: '4rem' }}>🏚️</div>
            <h5>Are you absolutely sure?</h5>
            <p className="text-muted mb-0">
              This action <strong>cannot be undone</strong>. This will permanently delete
              <strong className="d-block mt-2">
                {deletingId && shelters.find(s => s.id === deletingId)?.name}
              </strong>
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" className="border" onClick={cancelDelete}>
            Nevermind
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}