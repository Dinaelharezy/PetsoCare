

'use client'

import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap'
import Image from 'next/image'
import { Clinic } from '../../../types/Clinic'
import LocationMapModal from '../../Reports/modals/LocationMapModals'
import { getImageSrc } from '@/utils/imageUtils'
import { FlashAlert, PageHeader, PageLoader, EmptyState, DeleteConfirmModal, StatCard } from '../pages/Dashboardui'
import { useDashboardClinic, GOVERNORATES, isValidImage } from '../hooks/useDashboardClinic'

// ─── Component ───────────────────────────────────────────────────────────────

export default function ClinicManagementClient() {
  const {
    clinics, loading, stats, deletingName,
    showModal, editingClinic, formData, imageFile, showLocationMap,
    openModal, closeModal,
    handleInputChange, handleImageChange, handleLocationConfirm,
    openLocationMap, closeLocationMap,
    handleSubmit, handleDelete,
    flash, clearFlash,
    deletingId, requestDelete, cancelDelete, confirmDelete,
  } = useDashboardClinic()

  if (loading) return <PageLoader />

  return (
    <Container fluid className="px-4 py-4">
      <PageHeader
        title="Clinic Management"
        subtitle="Manage veterinary clinics across Egypt"
        action={{ label: 'Add New Clinic', icon: 'bi bi-plus-circle', onClick: () => openModal() }}
      />

      <FlashAlert message={flash} onClose={clearFlash} />

      {/* Stats */}
      <Row className="mb-4 g-3">
        {stats.map((s, i) => (
          <Col key={i} xs={6} md={3}>
            <StatCard {...s} />
          </Col>
        ))}
      </Row>

      {/* Clinic Cards */}
      <Row className="g-4">
        {clinics.map((clinic: Clinic) => (
          <Col lg={4} md={6} key={clinic.id}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 16 }}>
              <div style={{ height: 200, overflow: 'hidden', borderRadius: '16px 16px 0 0', position: 'relative', background: '#f8f9fa' }}>
                {isValidImage(clinic.imageUrl) ? (
                  <Image
                    src={getImageSrc(clinic.imageUrl)!}
                    alt={clinic.name}
                    width={400} height={200}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <i className="bi bi-building text-secondary" style={{ fontSize: '4rem' }} />
                  </div>
                )}
                {clinic.bookingPrice && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'rgba(0,0,0,0.65)', color: '#fff',
                    borderRadius: 20, padding: '4px 12px', fontSize: '0.75rem', fontWeight: 600,
                  }}>
                    💰 {clinic.bookingPrice} EGP
                  </div>
                )}
              </div>

              <Card.Body className="p-4">
                <h5 className="fw-semibold mb-3">{clinic.name}</h5>
                <div className="d-flex flex-column gap-1 mb-3">
                  <div className="text-muted small">📍 <strong>{clinic.governorate}</strong> — {clinic.address}</div>
                  <div className="text-muted small">📞 {clinic.phone}</div>
                  {clinic.workingHours && <div className="text-muted small">🕐 {clinic.workingHours}</div>}
                  {clinic.workingDays  && <div className="text-muted small">📅 {clinic.workingDays}</div>}
                  {clinic.facebookPage && (
                    <a href={clinic.facebookPage} target="_blank" rel="noreferrer" className="small" style={{ color: '#1877f2' }}>
                      📘 Facebook Page
                    </a>
                  )}
                </div>

                <div className="d-flex gap-2">
                  <Button size="sm" variant="light" className="border flex-grow-1 fw-semibold" onClick={() => openModal(clinic)}>
                    ✏️ Edit
                  </Button>
                  <Button
                    size="sm" variant="light" className="flex-grow-1 fw-semibold"
                    style={{ border: '1px solid #fee2e2', color: '#dc2626', background: '#fff5f5' }}
                    onClick={() => requestDelete(clinic.id)}
                  >
                    🗑️ Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {clinics.length === 0 && (
          <Col><EmptyState icon="🏥" message="No clinics yet. Add your first clinic to get started." /></Col>
        )}
      </Row>

      {/* Add / Edit Modal */}
      <Modal show={showModal} onHide={closeModal} centered size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1.1rem' }}>
            {editingClinic ? `Edit Clinic (ID: ${editingClinic.id})` : 'Add New Clinic'}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto', padding: '16px 20px' }}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold">Clinic Name *</Form.Label>
                  <Form.Control
                    size="sm" type="text" name="name"
                    value={formData.name} onChange={handleInputChange}
                    placeholder="Clinic Name" required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold">Phone *</Form.Label>
                  <Form.Control
                    size="sm" type="tel" name="phone"
                    value={formData.phone} onChange={handleInputChange}
                    placeholder="+20 XXX XXX XXXX" required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold">Address *</Form.Label>
                  <Form.Control
                    size="sm" type="text" name="address"
                    value={formData.address} onChange={handleInputChange}
                    placeholder="Street, Area" required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold">Governorate *</Form.Label>
                  <Form.Select
                    size="sm" name="governorate"
                    value={formData.governorate} onChange={handleInputChange} required
                  >
                    <option value="">Select governorate</option>
                    {GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label className="small fw-bold">Location</Form.Label>
                  <div className="d-flex gap-2 align-items-center">
                    <Button size="sm" type="button" variant="outline-secondary" onClick={openLocationMap}>
                      <i className="bi bi-geo-alt me-2" />
                      {formData.latitude && formData.longitude
                        ? `${parseFloat(formData.latitude).toFixed(4)}, ${parseFloat(formData.longitude).toFixed(4)}`
                        : 'Pick on Map'}
                    </Button>
                    {formData.latitude && formData.longitude && (
                      <small className="text-success">✓ Location selected</small>
                    )}
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold">Working Days</Form.Label>
                  <Form.Control
                    size="sm" type="text" name="workingDays"
                    value={formData.workingDays} onChange={handleInputChange}
                    placeholder="e.g. Saturday – Thursday"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold">Working Hours</Form.Label>
                  <Form.Control
                    size="sm" type="text" name="workingHours"
                    value={formData.workingHours} onChange={handleInputChange}
                    placeholder="e.g. 9:00 AM – 5:00 PM"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold">Booking Price (EGP)</Form.Label>
                  <Form.Control
                    size="sm" type="number" name="bookingPrice"
                    value={formData.bookingPrice} onChange={handleInputChange}
                    placeholder="500" min="0"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-bold">Image</Form.Label>
                  <Form.Control
                    size="sm" type="file" accept="image/*"
                    onChange={e => {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (file) handleImageChange(file)
                    }}
                  />
                  {editingClinic?.imageUrl && !imageFile && (
                    <small className="text-muted mt-1 d-block">
                      Current image exists — upload new to replace
                    </small>
                  )}
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label className="small fw-bold">Facebook Page URL</Form.Label>
                  <Form.Control
                    size="sm" type="url" name="facebookPage"
                    value={formData.facebookPage} onChange={handleInputChange}
                    placeholder="https://facebook.com/yourclinic"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer style={{ padding: '10px 20px' }}>
            <Button variant="secondary" size="sm" onClick={closeModal}>Cancel</Button>
            <Button type="submit" size="sm" className="background-for-app">
              {editingClinic ? 'Update Clinic' : 'Create Clinic'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <LocationMapModal
        show={showLocationMap}
        onClose={closeLocationMap}
        onConfirm={handleLocationConfirm}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        show={deletingId !== null}
        title="Delete Clinic"
        icon="🏥"
        itemName={deletingName}
        onCancel={cancelDelete}
        onConfirm={() => confirmDelete(handleDelete)}
      />
    </Container>
  )
}