
'use client'

import { Container, Row, Col, Card, Button, Modal, Form, Badge } from 'react-bootstrap'
import {
  SERVICE_TYPE_LABELS,
  LOCATION_TYPE_LABELS,
  typeColor,
  isLocationActive,
  LOCATION_TYPES,
  SERVICE_TYPES,
} from '../../../types/VaccLocation'
import { FlashAlert, PageHeader, PageLoader, EmptyState, DeleteConfirmModal } from './Dashboardui'
import { useDashboardVaccineLocations } from '../hooks/useDashboardVaccineLocations'

// ─── Component ───────────────────────────────────────────────────────────────

export default function DashboardVaccineLocations() {
  const {
    locations, loading, activeCount,
    showModal, editTarget, formData,
    openCreate, openEdit, closeModal,
    handleInputChange, handleSubmit,
    handleDelete, handleToggle,
    flash, clearFlash,
    deletingId, requestDelete, cancelDelete, confirmDelete,
  } = useDashboardVaccineLocations()

  if (loading) return <PageLoader />

  return (
    <Container fluid className="px-4 py-4">
      <PageHeader
        title="Location Management"
        action={{ label: 'Add New Location', icon: 'bi bi-plus-circle', onClick: openCreate }}
      />

      <FlashAlert message={flash} onClose={clearFlash} />

      {/* Stats */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="bg-primary text-white">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-0">Total Locations</h6>
                <h2 className="mb-0">{locations.length}</h2>
              </div>
              <i className="bi bi-geo-alt-fill fs-1" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="bg-info text-white">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="mb-0">Active</h6>
                <h2 className="mb-0">{activeCount}</h2>
              </div>
              <i className="bi bi-check-circle-fill fs-1" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Location Cards */}
      <Row className="g-4">
        {locations.map(loc => {
          const active = isLocationActive(loc)
          return (
            <Col lg={4} md={6} key={loc.id}>
              <Card className="h-100 shadow-sm">
                <div style={{
                  height: 6,
                  background: typeColor(loc.type),
                  borderTopLeftRadius: 'var(--bs-card-border-radius)',
                  borderTopRightRadius: 'var(--bs-card-border-radius)',
                }} />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="mb-0">{loc.name}</h5>
                    <div className="d-flex gap-1 flex-wrap">
                      {loc.type && (
                        <Badge bg="secondary">
                          <i className="bi bi-tag me-1" />
                          {LOCATION_TYPE_LABELS[loc.type] ?? loc.type}
                        </Badge>
                      )}
                      <Badge bg={active ? 'success' : 'secondary'}>
                        <i className={`bi bi-${active ? 'check' : 'x'}-circle me-1`} />
                        {active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-muted small">
                    {loc.governorate && <p className="mb-2"><i className="bi bi-map me-2" />{loc.governorate}</p>}
                    {loc.address     && <p className="mb-2"><i className="bi bi-geo-alt me-2" />{loc.address}</p>}
                    {loc.phone       && <p className="mb-2"><i className="bi bi-telephone me-2" />{loc.phone}</p>}
                    {!!loc.serviceType && (
                      <p className="mb-2"><i className="bi bi-list-check me-2" />{SERVICE_TYPE_LABELS[loc.serviceType]}</p>
                    )}
                  </div>

                  <div className="d-flex gap-2 flex-wrap mt-3">
                    <Button variant="outline-primary" size="sm" onClick={() => openEdit(loc)}>
                      <i className="bi bi-pencil me-1" /> Edit
                    </Button>
                    <Button
                      variant={active ? 'outline-warning' : 'outline-success'}
                      size="sm"
                      onClick={() => handleToggle(loc.id)}
                    >
                      <i className={`bi bi-toggle-${active ? 'off' : 'on'} me-1`} />
                      {active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => requestDelete(loc.id)}>
                      <i className="bi bi-trash me-1" /> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )
        })}

        {locations.length === 0 && (
          <Col>
            <Card>
              <Card.Body>
                <EmptyState icon="📍" message="No locations found. Add your first location!" />
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {/* Create / Edit Modal */}
      <Modal show={showModal} onHide={closeModal} centered size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1.1rem' }}>
            {editTarget ? 'Edit Location' : 'Add New Location'}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto', padding: '16px 20px' }}>
            <p className="text-muted small mb-3">
              {editTarget
                ? 'ℹ️ Leave fields empty to keep their current values'
                : 'ℹ️ All fields marked with * are required'}
            </p>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">{editTarget ? 'Name' : 'Name *'}</Form.Label>
                  <Form.Control
                    size="sm" type="text" name="name"
                    value={formData.name} onChange={handleInputChange}
                    placeholder="Location name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">{editTarget ? 'Type' : 'Type *'}</Form.Label>
                  <Form.Select size="sm" name="type" value={formData.type} onChange={handleInputChange}>
                    <option value="">-- {editTarget ? 'Keep current' : 'Select type'} --</option>
                    {LOCATION_TYPES.map(t => <option key={t.val} value={t.val}>{t.label}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">{editTarget ? 'Governorate' : 'Governorate *'}</Form.Label>
                  <Form.Control
                    size="sm" type="text" name="governorate"
                    value={formData.governorate} onChange={handleInputChange}
                    placeholder="e.g. Port Said"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">{editTarget ? 'Service Type' : 'Service Type *'}</Form.Label>
                  <Form.Select size="sm" name="serviceType" value={formData.serviceType} onChange={handleInputChange}>
                    <option value="">-- {editTarget ? 'Keep current' : 'Select service type'} --</option>
                    {SERVICE_TYPES.map(s => <option key={s.val} value={s.val}>{s.label}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">{editTarget ? 'Address' : 'Address *'}</Form.Label>
                  <Form.Control
                    size="sm" type="text" name="address"
                    value={formData.address} onChange={handleInputChange}
                    placeholder="Street, Area"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">Phone</Form.Label>
                  <Form.Control
                    size="sm" type="tel" name="phone"
                    value={formData.phone} onChange={handleInputChange}
                    placeholder="+20 XXX XXX XXXX"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer style={{ padding: '10px 20px' }}>
            <Button variant="secondary" size="sm" onClick={closeModal}>Cancel</Button>
            <Button type="submit" size="sm" className="background-for-app">
              {editTarget ? 'Save Changes' : 'Add Location'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Modal */}
      <DeleteConfirmModal
        show={deletingId !== null}
        title="Delete Location"
        icon="📍"
        onCancel={cancelDelete}
        onConfirm={() => confirmDelete(handleDelete)}
      />
    </Container>
  )
}