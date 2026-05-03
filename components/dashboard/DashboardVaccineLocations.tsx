
'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Container, Row, Col, Card, Button,
  Modal, Form, Alert, Badge,
} from 'react-bootstrap'
import {
  getAllLocations,
  createLocation,
  updateLocation,
  deleteLocation,
  toggleLocation,
} from '../../data/api/VaccLocations'
import {
  VaccLocation,
  VaccLocationForm,
  emptyVaccLocationForm,
  SERVICE_TYPE_LABELS,
  LOCATION_TYPE_LABELS,
  typeColor,
  isLocationActive,
  formToPayload,
} from '../../types/VaccLocation'

const LOCATION_TYPES = [
  { val: '1', label: 'Area' },
  { val: '2', label: 'Location' },
]

const SERVICE_TYPES = [
  { val: '0', label: '—' },
  { val: '1', label: 'Human Rabies Prevention' },
  { val: '2', label: 'Animal Rabies Prevention' },
]

export default function DashboardVaccineLocations() {
  const [locations, setLocations]       = useState<VaccLocation[]>([])
  const [loading, setLoading]           = useState(true)
  const [showModal, setShowModal]       = useState(false)
  const [editTarget, setEditTarget]     = useState<VaccLocation | null>(null)
  const [filterType, setFilterType]     = useState<number | ''>('')
  const [successMessage, setSuccessMessage] = useState('')
  const [formData, setFormData]         = useState<VaccLocationForm>(emptyVaccLocationForm)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  
  // ─── load ────────────────────────────────────────────────────────────────
  const loadLocations = useCallback(async (type?: number | '') => {
    try {
      setLoading(true)
      const data = await getAllLocations(type ? { type } : undefined)
      setLocations(data)
    } catch (err) {
      console.error('Failed to load locations:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadLocations() }, [loadLocations])

  useEffect(() => {
    const handler = () => loadLocations(filterType || undefined)
    window.addEventListener('locationsUpdated', handler)
    return () => window.removeEventListener('locationsUpdated', handler)
  }, [filterType, loadLocations])

  // ─── filter ──────────────────────────────────────────────────────────────
  const handleFilterChange = (type: number | '') => {
    setFilterType(type)
    loadLocations(type || undefined)
  }

  // ─── modal ───────────────────────────────────────────────────────────────
  const openCreate = () => {
    setEditTarget(null)
    setFormData(emptyVaccLocationForm)
    setShowModal(true)
  }

  const openEdit = (loc: VaccLocation) => {
    const typeVal = loc.type === 'Area' ? '1' : loc.type === 'Location' ? '2' : ''

    setEditTarget(loc)
    setFormData({
      name:            loc.name        || '',
      type:            typeVal,
      governorate:     loc.governorate || '',
      address:         loc.address     || '',
      phone:           loc.phone       || '',
      serviceType:     String(loc.serviceType ?? ''),
      providesVaccine: loc.providesVaccine === true,
      isActive:        isLocationActive(loc),
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditTarget(null)
    setFormData(emptyVaccLocationForm)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement
    const { name, value, type: inputType } = target
    setFormData(prev => ({
      ...prev,
      [name]: inputType === 'checkbox' ? target.checked : value,
    }))
  }

  // ─── submit ──────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editTarget) {
      const typeVal = editTarget.type === 'Area' ? '1'
                    : editTarget.type === 'Location' ? '2'
                    : '1'

      const updatedData: VaccLocationForm = {
        name:            formData.name        || editTarget.name,
        type:            formData.type        || typeVal,
        governorate:     formData.governorate || editTarget.governorate,
        address:         formData.address     || editTarget.address,
        phone:           formData.phone       || editTarget.phone || '',
        serviceType:     formData.serviceType || String(editTarget.serviceType),
        providesVaccine: formData.providesVaccine,
        isActive:        formData.isActive,
      }

      try {
        await updateLocation(editTarget.id, formToPayload(updatedData))
        setSuccessMessage('✅ Location updated successfully!')
        await loadLocations(filterType || undefined)
        closeModal()
        setTimeout(() => setSuccessMessage(''), 3000)
      } catch (err) {
        console.error('Error saving location:', err)
        alert('Failed to save location. Check console for details.')
      }

    } else {
      if (!formData.name)        { alert('Name is required');              return }
      if (!formData.type)        { alert('Please select a location type'); return }
      if (!formData.governorate) { alert('Governorate is required');       return }
      if (!formData.serviceType) { alert('Please select a service type');  return }
      if (!formData.address)     { alert('Address is required');           return }

      try {
        await createLocation(formToPayload(formData))
        setSuccessMessage('✅ Location added successfully!')
        await loadLocations(filterType || undefined)
        closeModal()
        setTimeout(() => setSuccessMessage(''), 3000)
      } catch (err) {
        console.error('Error saving location:', err)
        alert('Failed to save location. Check console for details.')
      }
    }
  }

  // ─── delete ──────────────────────────────────────────────────────────────
  const handleDeleteClick = (id: number) => {
    setDeletingId(id)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    if (!deletingId) return
    
    try {
      await deleteLocation(deletingId)
      setSuccessMessage('🗑️ Location deleted successfully!')
      await loadLocations(filterType || undefined)
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      console.error('Error deleting location:', err)
      alert('Failed to delete location. Please try again.')
    } finally {
      setShowDeleteConfirm(false)
      setDeletingId(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setDeletingId(null)
  }

  // ─── toggle ──────────────────────────────────────────────────────────────
  const handleToggle = async (id: number) => {
    try {
      await toggleLocation(id)
      const location = locations.find(l => l.id === id)
      const newStatus = isLocationActive(location!) ? 'Deactivated' : 'Activated'
      setSuccessMessage(`✅ Location ${newStatus} successfully!`)
      await loadLocations(filterType || undefined)
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      console.error('Error toggling location:', err)
    }
  }

  // ─── render ──────────────────────────────────────────────────────────────
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
        <h1 className="page-title"> Location Management</h1>
        <Button className="color-for-app" onClick={openCreate}>
          <i className="bi bi-plus-circle me-2" />Add New Location
        </Button>
      </div>

      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="bg-primary text-white">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Total Locations</h6>
                  <h2 className="mb-0">{locations.length}</h2>
                </div>
                <i className="bi bi-geo-alt-fill fs-1"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="bg-info text-white">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">Active</h6>
                  <h2 className="mb-0">{locations.filter(l => isLocationActive(l)).length}</h2>
                </div>
                <i className="bi bi-check-circle-fill fs-1"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ── cards ── */}
      <Row className="g-4">
        {locations.map(loc => {
          const active = isLocationActive(loc)

          return (
            <Col lg={4} md={6} key={loc.id}>
              <Card className="h-100 shadow-sm">
                <div style={{
                  height: '6px',
                  background: typeColor(loc.type),
                  borderTopLeftRadius:  'var(--bs-card-border-radius)',
                  borderTopRightRadius: 'var(--bs-card-border-radius)',
                }} />

                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="mb-0">{loc.name}</h5>
                    <div className="d-flex gap-1 flex-wrap">
                      {loc.type && (
                        <Badge bg="secondary">
                          <i className="bi bi-tag me-1"></i>
                          {LOCATION_TYPE_LABELS[loc.type] ?? loc.type}
                        </Badge>
                      )}
                      {active ? (
                        <Badge bg="success">
                          <i className="bi bi-check-circle me-1"></i>Active
                        </Badge>
                      ) : (
                        <Badge bg="secondary">
                          <i className="bi bi-x-circle me-1"></i>Inactive
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-muted small">
                    {loc.governorate && (
                      <p className="mb-2">
                        <i className="bi bi-map me-2"></i> {loc.governorate}
                      </p>
                    )}
                    {loc.address && (
                      <p className="mb-2">
                        <i className="bi bi-geo-alt me-2"></i> {loc.address}
                      </p>
                    )}
                    {loc.phone && (
                      <p className="mb-2">
                        <i className="bi bi-telephone me-2"></i> {loc.phone}
                      </p>
                    )}
                    {loc.serviceType !== undefined && loc.serviceType !== 0 && (
                      <p className="mb-2">
                        <i className="bi bi-list-check me-2"></i>
                        {SERVICE_TYPE_LABELS[loc.serviceType]}
                      </p>
                    )}
                  </div>

                  <div className="d-flex gap-2 flex-wrap mt-3">
                    <Button variant="outline-primary" size="sm" onClick={() => openEdit(loc)}>
                      <i className="bi bi-pencil me-1" /> Edit
                    </Button>

                    {active ? (
                      <Button variant="outline-warning" size="sm" onClick={() => handleToggle(loc.id)}>
                        <i className="bi bi-toggle-off me-1" /> Deactivate
                      </Button>
                    ) : (
                      <Button variant="outline-success" size="sm" onClick={() => handleToggle(loc.id)}>
                        <i className="bi bi-toggle-on me-1" /> Activate
                      </Button>
                    )}

                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(loc.id)}>
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
              <Card.Body className="text-center text-muted py-5">
                <i className="bi bi-geo-alt-fill" style={{ fontSize: '48px' }} />
                <p className="mt-3">No locations found. Add your first location!</p>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {/* ── modal for create/edit ── */}
      <Modal show={showModal} onHide={closeModal} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{editTarget ? ' Edit Location' : ' Add New Location'}</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <div className="text-muted small mb-3">
              {editTarget
                ? 'ℹ️ Leave fields empty to keep their current values'
                : 'ℹ️ All fields marked with * are required'}
            </div>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{editTarget ? 'Name' : 'Name *'}</Form.Label>
                  <Form.Control
                    type="text" name="name" value={formData.name}
                    onChange={handleInputChange} placeholder="Location name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{editTarget ? 'Type' : 'Type *'}</Form.Label>
                  <Form.Select name="type" value={formData.type} onChange={handleInputChange}>
                    <option value="">-- {editTarget ? 'Keep current' : 'Select type'} --</option>
                    {LOCATION_TYPES.map(t => (
                      <option key={t.val} value={t.val}>{t.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{editTarget ? 'Governorate' : 'Governorate *'}</Form.Label>
                  <Form.Control
                    type="text" name="governorate" value={formData.governorate}
                    onChange={handleInputChange} placeholder="e.g. Port Said"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{editTarget ? 'Service Type' : 'Service Type *'}</Form.Label>
                  <Form.Select name="serviceType" value={formData.serviceType} onChange={handleInputChange}>
                    <option value="">-- {editTarget ? 'Keep current' : 'Select service type'} --</option>
                    {SERVICE_TYPES.map(s => (
                      <option key={s.val} value={s.val}>{s.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{editTarget ? 'Address' : 'Address *'}</Form.Label>
                  <Form.Control
                    type="text" name="address" value={formData.address}
                    onChange={handleInputChange} placeholder="Street, Area"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel" name="phone" value={formData.phone}
                    onChange={handleInputChange} placeholder="+20 XXX XXX XXXX"
                  />
                </Form.Group>
              </Col>
            </Row>


          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal} className='background-for-app'>Cancel</Button>
            <Button type="submit" className='background-for-app'>
              {editTarget ? 'Save Changes' : ' Add Location'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* ── Delete Confirmation Modal ── */}
      <Modal show={showDeleteConfirm} onHide={cancelDelete} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="text-danger">
            <i className="bi bi-exclamation-octagon-fill me-2" />
            Delete Location
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="pt-0">
          <div className="text-center py-3">
            <div className="mb-3">
              <i className="bi bi-trash3-fill text-danger" style={{ fontSize: '4rem' }} />
            </div>
            <h5>Are you absolutely sure?</h5>
            <p className="text-muted mb-0">
              This action <strong>cannot be undone</strong>. This will permanently delete the location
              and remove all associated data from our servers.
            </p>
          </div>
        </Modal.Body>
        
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" onClick={cancelDelete}>
            <i className="bi bi-arrow-left me-1" /> Nevermind
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            <i className="bi bi-trash me-1" /> Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  )
}