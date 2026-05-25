
'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap'
import Image from 'next/image'
import { clinicsApi } from '../../data/api/Clinic'
import { Clinic } from '../../types/Clinic'
import LocationMapModal from '../Reports/modals/LocationMapModals'
import { getImageSrc } from '@/utils/imageUtils'
import { apiUrl } from '@/lib/api'



// export const getImageSrc = (src?: string): string | null => {
//   if (!src) return null
//   if (src.startsWith('http')) return `/api/image?url=${encodeURIComponent(src)}`
//   if (src.startsWith('/Images') || src.startsWith('/images') || src.startsWith('/uploads') || src.startsWith('/api')) {
//     const full = BASE_URL ? `${BASE_URL}${src}` : src
//     return `/api/image?url=${encodeURIComponent(full)}`
//   }
//   if (src.includes('images/') || src.includes('Images/') || src.includes('uploads/')) {
//     const full = BASE_URL ? `${BASE_URL}/${src}` : `/${src}`
//     return `/api/image?url=${encodeURIComponent(full)}`
//   }
//   if (src.startsWith('/')) return src
//   return null
// }

const isValidImage = (src?: string) => {
  if (!src) return false
  return src.startsWith('/') || src.startsWith('http')
}

export default function ClinicManagementClient() {
  const [clinics,           setClinics]           = useState<Clinic[]>([])
  const [loading,           setLoading]           = useState(true)
  const [showModal,         setShowModal]         = useState(false)
  const [imageFile,         setImageFile]         = useState<File | null>(null)
  const [editingClinic,     setEditingClinic]     = useState<Clinic | null>(null)
  const [successMessage,    setSuccessMessage]    = useState('')
  const [showLocationMap,   setShowLocationMap]   = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletingId,        setDeletingId]        = useState<number | null>(null)

  const [formData, setFormData] = useState({
    name: '', address: '', governorate: '', phone: '',
    facebookPage: '', bookingPrice: '', workingDays: '',
    workingHours: '', latitude: '', longitude: '',
  })

  const governorates = ['Port Said', 'Ismailia', 'Suez', 'Cairo']

 
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

 useEffect(() => { loadClinics() }, [])
  useEffect(() => {
    const handler = () => loadClinics()
    window.addEventListener('clinicsUpdated', handler)
    return () => window.removeEventListener('clinicsUpdated', handler)
  }, [])


  const handleShowModal = (clinic?: Clinic) => {
    if (clinic) {
      setEditingClinic(clinic)
      setFormData({
        name: clinic.name, address: clinic.address,
        governorate: clinic.governorate, phone: clinic.phone,
        facebookPage: clinic.facebookPage || '',
        bookingPrice: clinic.bookingPrice?.toString() || '',
        workingDays: clinic.workingDays || '',
        workingHours: clinic.workingHours || '',
        latitude: clinic.latitude?.toString() || '',
        longitude: clinic.longitude?.toString() || '',
      })
    } else {
      setEditingClinic(null)
      setFormData({ name: '', address: '', governorate: '', phone: '', facebookPage: '', bookingPrice: '', workingDays: '', workingHours: '', latitude: '', longitude: '' })
    }
    setImageFile(null)
    setShowModal(true)
  }

  const handleCloseModal = () => { setShowModal(false); setEditingClinic(null); setImageFile(null) }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleLocationConfirm = (lat: number, lng: number, address: string) => {
    setFormData(prev => ({ ...prev, latitude: lat.toString(), longitude: lng.toString(), address }))
  }

  const handleDeleteClick = (id: number) => { setDeletingId(id); setShowDeleteConfirm(true) }

  const confirmDelete = async () => {
    if (!deletingId) return
    try {
      await clinicsApi.delete(deletingId)
      setSuccessMessage('Clinic deleted successfully!')
      await loadClinics()
      setTimeout(() => setSuccessMessage(''), 3000)
      window.dispatchEvent(new Event('clinicsUpdated'))
    } catch (error) {
      console.error('Error deleting clinic:', error)
      alert('Failed to delete clinic. Please try again.')
    } finally {
      setShowDeleteConfirm(false)
      setDeletingId(null)
    }
  }

  const cancelDelete = () => { setShowDeleteConfirm(false); setDeletingId(null) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const fd = new FormData()
      fd.append('Name',         formData.name)
      fd.append('Address',      formData.address)
      fd.append('Governorate',  formData.governorate)
      fd.append('Phone',        formData.phone)
      fd.append('FacebookPage', formData.facebookPage || '')
      fd.append('BookingPrice', formData.bookingPrice || '0')
      fd.append('WorkingDays',  formData.workingDays  || 'N/A')
      fd.append('WorkingHours', formData.workingHours || 'N/A')
      fd.append('Latitude',     formData.latitude     || '0')
      fd.append('Longitude',    formData.longitude    || '0')
      if (imageFile) fd.append('Image', imageFile)

      const url    = editingClinic ? apiUrl(`dashboard/clinics/${editingClinic.id}`) : apiUrl('dashboard/clinics')
      const method = editingClinic ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'ngrok-skip-browser-warning': 'true' },
        body: fd,
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        console.error('Save error:', err)
        alert(`Failed to save: ${response.status}`)
        return
      }

      setSuccessMessage(editingClinic ? 'Clinic updated successfully!' : 'Clinic added successfully!')
      setImageFile(null)
      await loadClinics()
      handleCloseModal()
      setTimeout(() => setSuccessMessage(''), 3000)
      window.dispatchEvent(new Event('clinicsUpdated'))
    } catch (error) {
      console.error('Error saving clinic:', error)
      alert('Failed to save clinic.')
    }
  }

  if (loading) return (
    <Container className="py-5 text-center">
      <div className="spinner-border text-primary" role="status" />
    </Container>
  )

  return (
    <Container fluid className="px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-0 fw-bold" style={{ fontSize: '1.6rem' }}>Clinic Management</h1>
          <p className="text-muted small mb-0">Manage veterinary clinics across Egypt</p>
        </div>
        <Button className="background-for-app d-flex align-items-center gap-2" onClick={() => handleShowModal()}>
          <i className="bi bi-plus-circle" /> Add New Clinic
        </Button>
      </div>

      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>{successMessage}</Alert>
      )}

      {/* Stats */}
      <Row className="mb-4 g-3">
        {[
          { label: 'Total Clinics', value: clinics.length, icon: '🏥', bg: '#eef2ff', color: '#6366f1' },
          { label: 'Port Said',     value: clinics.filter(c => c.governorate === 'Port Said').length, icon: '📍', bg: '#e0f2fe', color: '#0369a1' },
          { label: 'Cairo',         value: clinics.filter(c => c.governorate === 'Cairo').length,     icon: '🏙️', bg: '#fef3c7', color: '#92400e' },
          { label: 'Other Areas',   value: clinics.filter(c => !['Port Said','Cairo'].includes(c.governorate)).length, icon: '🗺️', bg: '#dcfce7', color: '#166534' },
        ].map((stat, i) => (
          <Col key={i} xs={6} md={3}>
            <div style={{ background: stat.bg, borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 28 }}>{stat.icon}</span>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '0.75rem', color: stat.color, opacity: 0.8, marginTop: 2 }}>{stat.label}</div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Row className="g-4">
        {clinics.map((clinic) => (
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
                  <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.65)', color: '#fff', borderRadius: 20, padding: '4px 12px', fontSize: '0.75rem', fontWeight: 600 }}>
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
                  <Button size="sm" variant="light" className="border flex-grow-1 fw-semibold" onClick={() => handleShowModal(clinic)}>
                    ✏️ Edit
                  </Button>
                  <Button size="sm" variant="light" className="flex-grow-1 fw-semibold"
                    style={{ border: '1px solid #fee2e2', color: '#dc2626', background: '#fff5f5' }}
                    onClick={() => handleDeleteClick(clinic.id)}>
                    🗑️ Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {clinics.length === 0 && (
          <Col>
            <div className="text-center py-5 text-muted">
              <div style={{ fontSize: 64, marginBottom: 16 }}>🏥</div>
              <h5>No clinics yet</h5>
              <p className="small">Add your first clinic to get started.</p>
            </div>
          </Col>
        )}
      </Row>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered scrollable>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">{editingClinic ? '✏️ Edit Clinic' : '🏥 Add New Clinic'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="pt-2">
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-muted text-uppercase">Clinic Name *</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Clinic Name" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-muted text-uppercase">Phone *</Form.Label>
                  <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+20 XXX XXX XXXX" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-muted text-uppercase">Address *</Form.Label>
                  <Form.Control type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Street, Area" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-muted text-uppercase">Governorate *</Form.Label>
                  <Form.Select name="governorate" value={formData.governorate} onChange={handleInputChange} required>
                    <option value="">Select governorate</option>
                    {governorates.map(gov => <option key={gov} value={gov}>{gov}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-muted text-uppercase">Location</Form.Label>
                  <div className="d-flex gap-2 align-items-center">
                    <Button type="button" variant="outline-secondary" onClick={() => setShowLocationMap(true)}>
                      <i className="bi bi-geo-alt me-2" />
                      {formData.latitude && formData.longitude
                        ? `${parseFloat(formData.latitude).toFixed(4)}, ${parseFloat(formData.longitude).toFixed(4)}`
                        : 'Pick on Map'}
                    </Button>
                    {formData.latitude && formData.longitude && (
                      <span className="text-muted small">✅ Location selected</span>
                    )}
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-muted text-uppercase">Working Days</Form.Label>
                  <Form.Control type="text" name="workingDays" value={formData.workingDays} onChange={handleInputChange} placeholder="e.g. Saturday - Thursday" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-muted text-uppercase">Working Hours</Form.Label>
                  <Form.Control type="text" name="workingHours" value={formData.workingHours} onChange={handleInputChange} placeholder="e.g. 9:00 AM - 5:00 PM" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-muted text-uppercase">Booking Price (EGP)</Form.Label>
                  <Form.Control type="number" name="bookingPrice" value={formData.bookingPrice} onChange={handleInputChange} placeholder="500" min="0" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-muted text-uppercase">Image</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={(e) => {
                    const file = (e.target as HTMLInputElement).files?.[0]
                    if (file) setImageFile(file)
                  }} />
                  {editingClinic?.imageUrl && !imageFile && (
                    <small className="text-muted mt-1 d-block">Current image exists — upload new to replace</small>
                  )}
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="small fw-semibold text-muted text-uppercase">Facebook Page URL</Form.Label>
                  <Form.Control type="url" name="facebookPage" value={formData.facebookPage} onChange={handleInputChange} placeholder="https://facebook.com/yourclinic" />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button variant="light" className="border px-4" onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" className="background-for-app px-4">
              {editingClinic ? 'Update Clinic' : 'Add Clinic'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <LocationMapModal show={showLocationMap} onClose={() => setShowLocationMap(false)} onConfirm={handleLocationConfirm} />

      {/* Delete Modal */}
      <Modal show={showDeleteConfirm} onHide={cancelDelete} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="text-danger fw-bold mb-3">🗑️ Delete Clinic</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0 text-center py-4">
          <div style={{ fontSize: 64, marginBottom: 12 }}>🏥</div>
          <h5>Are you absolutely sure?</h5>
          <p className="text-muted mb-0">
            This action <strong>cannot be undone</strong>. This will permanently delete{' '}
            <strong>{deletingId && clinics.find(c => c.id === deletingId)?.name}</strong>.
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" className="border px-4" onClick={cancelDelete}>Nevermind</Button>
          <Button variant="danger" className="px-4" onClick={confirmDelete}>Yes, Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}