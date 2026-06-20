
'use client'

import { Container, Row, Col, Card, Button, Modal, Form, Badge } from 'react-bootstrap'
import { Shelter } from '../../../types/Shelter'
import { FlashAlert, PageHeader, PageLoader, EmptyState, DeleteConfirmModal } from '../pages/Dashboardui'
import { useDashboardShelters } from '../hooks/useDashboardShelters'

// ─── Config ───────────────────────────────────────────────────────────────────

const ANIMAL_TYPE_CFG = {
  Dogs: { emoji: '🐕', bg: '#e0f2fe', color: '#0369a1' },
  Cats: { emoji: '🐈', bg: '#fef3c7', color: '#92400e' },
  Both: { emoji: '🐾', bg: '#dcfce7', color: '#166534' },
} as const

type AnimalType = keyof typeof ANIMAL_TYPE_CFG

// ─── Component ───────────────────────────────────────────────────────────────

export default function DashboardSheltersClient() {
  const {
    shelters, loading, submitting, deletingName,
    showModal, editingShelter, form,
    openModal, closeModal, handleInputChange, handleSubmit, handleDelete,
    flash, clearFlash,
    deletingId, requestDelete, cancelDelete, confirmDelete,
  } = useDashboardShelters()

  if (loading) return <PageLoader />

  return (
    <Container fluid className="px-4 py-4">
      <PageHeader
        title="Shelters"
        action={{ label: '+ Add Shelter', onClick: () => openModal() }}
      />

      <FlashAlert message={flash} onClose={clearFlash} />

      <Row className="g-4">
        {shelters.map((s: Shelter) => {
          const animalCfg = ANIMAL_TYPE_CFG[s.animalType as AnimalType] ?? ANIMAL_TYPE_CFG.Both
          return (
            <Col lg={4} md={6} key={s.id}>
              <Card className="h-100" style={{ borderRadius: 12, border: '1px solid #eee' }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="mb-0 fw-semibold">{s.name}</h5>
                    <Badge style={{
                      background: animalCfg.bg, color: animalCfg.color,
                      fontWeight: 600, fontSize: '0.75rem', padding: '4px 10px', borderRadius: 20,
                    }}>
                      {animalCfg.emoji} {s.animalType}
                    </Badge>
                  </div>

                  {s.governorate  && <div className="text-muted small mb-1">📍 {s.governorate}</div>}
                  {s.address      && <div className="text-muted small mb-2">{s.address}</div>}
                  {s.phone        && <div className="small mb-1">📞 {s.phone}</div>}
                  {s.workingHours && <div className="small mb-1">🕐 {s.workingHours}</div>}
                  {s.capacity     && <div className="small mb-2">🏠 Capacity: {s.capacity}</div>}

                  <div className="mt-3 d-flex gap-2">
                    <Button size="sm" variant="light" className="border flex-grow-1" onClick={() => openModal(s)}>
                      ✏️ Edit
                    </Button>
                    <Button
                      size="sm" variant="light" className="flex-grow-1"
                      style={{ border: '1px solid #dc3545', color: '#dc3545' }}
                      onClick={() => requestDelete(s.id)}
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )
        })}

        {shelters.length === 0 && (
          <Col>
            <Card><Card.Body><EmptyState icon="🏚️" message="No shelters found. Add your first shelter!" /></Card.Body></Card>
          </Col>
        )}
      </Row>

      {/* Add / Edit Modal */}
      <Modal show={showModal} onHide={closeModal} centered size="lg" scrollable>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: '1.1rem' }}>
              {editingShelter ? 'Edit Shelter' : 'Add New Shelter'}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto', padding: '16px 20px' }}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    name="name" value={form.name}
                    onChange={handleInputChange} placeholder="Shelter name" required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Governorate</Form.Label>
                  <Form.Control
                    name="governorate" value={form.governorate}
                    onChange={handleInputChange} placeholder="e.g. Port Said"
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address" value={form.address}
                    onChange={handleInputChange} placeholder="Street, Area"
                  />
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
                  <Form.Control
                    name="capacity" value={form.capacity}
                    onChange={handleInputChange} placeholder="e.g. 50"
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="phone" value={form.phone}
                    onChange={handleInputChange} placeholder="+20 XXX XXX XXXX"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Working Hours</Form.Label>
                  <Form.Control
                    name="workingHours" value={form.workingHours}
                    onChange={handleInputChange} placeholder="e.g. 9 AM - 5 PM"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea" rows={2}
                    name="notes" value={form.notes}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer style={{ padding: '10px 20px' }}>
            <Button variant="secondary" size="sm" onClick={closeModal}>Cancel</Button>
            <Button type="submit" size="sm" className="background-for-app" disabled={submitting}>
              {submitting ? 'Saving…' : editingShelter ? 'Update Shelter' : 'Add Shelter'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Modal */}
      <DeleteConfirmModal
        show={deletingId !== null}
        title="Delete Shelter"
        icon="🏚️"
        itemName={deletingName}
        onCancel={cancelDelete}
        onConfirm={() => confirmDelete(handleDelete)}
      />
    </Container>
  )
}