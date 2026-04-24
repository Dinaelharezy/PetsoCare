// 'use client'

// import { useState, useEffect } from 'react'
// import {
//   Container, Row, Col, Card, Button,
//   Modal, Form, Alert, Badge,
// } from 'react-bootstrap'
// import { getAllLocations, createLocation, deleteLocation}  from '../../data/api/VaccLocations'
// import { VaccLocation } from '../../types/VaccLocation'

// const LOCATION_TYPES = ['Hospital', 'Pharmacy', 'Lab', 'Clinic', 'Center']

// export default function DashboardVaccineLocations() {
//   const [locations, setLocations] = useState<VaccLocation[]>([])
//   const [loading, setLoading] = useState(true)
//   const [showModal, setShowModal] = useState(false)
//   const [filterType, setFilterType] = useState<string>('')
//   const [successMessage, setSuccessMessage] = useState('')

//   const emptyForm = {
//     name: '',
//     address: '',
//     phone: '',
//     hours: '',
//     note: '',
//     services: '',
//     type: '',
//     isInquiryOnly: false,
//   }

//   const [formData, setFormData] = useState(emptyForm)

//   // ─── load ────────────────────────────────────────────────────────────────
// //   const loadLocations = async (type?: string) => {
// //     try {
// //       setLoading(true)
// //       const data = await getAllLocations.getAll(type || undefined)
// //       setLocations(data)
// //     } catch (error) {
// //       console.error('Failed to load locations:', error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// const loadLocations = async (type?: string) => {
//   try {
//     setLoading(true)
//     const data = await getAllLocations(type)
//     setLocations(data)
//   } catch (error) {
//     console.error('Failed to load locations:', error)
//   } finally {
//     setLoading(false)
//   }
// }

//   useEffect(() => { loadLocations() }, [])

//   // listen for external updates (same pattern as clinics)
//   useEffect(() => {
//     const handler = () => loadLocations(filterType)
//     window.addEventListener('locationsUpdated', handler)
//     return () => window.removeEventListener('locationsUpdated', handler)
//   }, [filterType])

//   // ─── filter ──────────────────────────────────────────────────────────────
//   const handleFilterChange = (type: string) => {
//     setFilterType(type)
//     loadLocations(type)
//   }

//   // ─── modal ───────────────────────────────────────────────────────────────
//   const handleShowModal = () => {
//     setFormData(emptyForm)
//     setShowModal(true)
//   }

//   const handleCloseModal = () => {
//     setShowModal(false)
//     setFormData(emptyForm)
//   }

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const target = e.target as HTMLInputElement
//     const { name, value, type: inputType } = target
//     setFormData(prev => ({
//       ...prev,
//       [name]: inputType === 'checkbox' ? target.checked : value,
//     }))
//   }

//   // ─── submit ──────────────────────────────────────────────────────────────
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const payload: Partial<VaccLocation> = {
//         name: formData.name,
//         address: formData.address,
//         phone: formData.phone,
//         hours: formData.hours,
//         note: formData.note,
//         services: formData.services,
//         type: formData.type,
//         isInquiryOnly: formData.isInquiryOnly,
//       }
// console.log('createLocation =>', createLocation)
//       await createLocation(payload)
//       setSuccessMessage('Location added successfully!')
//       await loadLocations(filterType)
//       handleCloseModal()
//       setTimeout(() => setSuccessMessage(''), 3000)
//     } catch (error) {
//       console.error('Error saving location:', error)
//       alert('Failed to save location.')
//     }
//   }

//   // ─── delete ──────────────────────────────────────────────────────────────
//   const handleDelete = async (id: number) => {
//     if (!window.confirm('Are you sure you want to delete this location?')) return
//     try {
//      await deleteLocation(id)
//       setSuccessMessage('Location deleted successfully!')
//       await loadLocations(filterType)
//       setTimeout(() => setSuccessMessage(''), 3000)
//     } catch (error) {
//       console.error('Error deleting location:', error)
//     }
//   }

//   // ─── render ──────────────────────────────────────────────────────────────
//   if (loading) {
//     return (
//       <Container className="py-5 text-center">
//         <div className="spinner-border text-primary" role="status" />
//       </Container>
//     )
//   }

//   return (
//     <Container fluid className="px-4 py-4">
//       {/* ── header ── */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1 className="page-title">Location Management</h1>
//         <Button className="color-for-app" onClick={handleShowModal}>
//           <i className="bi bi-plus-circle me-2" />Add New Location
//         </Button>
//       </div>

//       {/* ── success alert ── */}
//       {successMessage && (
//         <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
//           {successMessage}
//         </Alert>
//       )}

//       {/* ── type filter ── */}
//       <div className="d-flex gap-2 flex-wrap mb-4">
//         <Button
//           variant={filterType === '' ? 'primary' : 'outline-primary'}
//           size="sm"
//           onClick={() => handleFilterChange('')}
//         >
//           All
//         </Button>
//         {LOCATION_TYPES.map(t => (
//           <Button
//             key={t}
//             variant={filterType === t ? 'primary' : 'outline-primary'}
//             size="sm"
//             onClick={() => handleFilterChange(t)}
//           >
//             {t}
//           </Button>
//         ))}
//       </div>

//       {/* ── cards ── */}
//       <Row className="g-4">
//         {locations.map(loc => (
//           <Col lg={4} md={6} key={loc.id}>
//             <Card className="h-100">
//               {/* top colour strip by type */}
//               <div
//                 style={{
//                   height: '6px',
//                   background: typeColor(loc.type),
//                   borderTopLeftRadius: 'var(--bs-card-border-radius)',
//                   borderTopRightRadius: 'var(--bs-card-border-radius)',
//                 }}
//               />
//               <Card.Body>
//                 <div className="d-flex justify-content-between align-items-start mb-2">
//                   <h5 className="mb-0">{loc.name}</h5>
//                   <div className="d-flex gap-1 flex-wrap">
//                     {loc.type && (
//                       <Badge bg="secondary">{loc.type}</Badge>
//                     )}
//                     {loc.isInquiryOnly && (
//                       <Badge bg="warning" text="dark">Inquiry Only</Badge>
//                     )}
//                   </div>
//                 </div>

//                 {loc.address && (
//                   <p className="text-muted mb-1">
//                     <i className="bi bi-geo-alt me-1" />{loc.address}
//                   </p>
//                 )}
//                 {loc.phone && (
//                   <p className="text-muted mb-1">
//                     <i className="bi bi-telephone me-1" />{loc.phone}
//                   </p>
//                 )}
//                 {loc.hours && (
//                   <p className="text-muted mb-1">
//                     <i className="bi bi-clock me-1" />{loc.hours}
//                   </p>
//                 )}
//                 {loc.services && (
//                   <p className="text-muted mb-1">
//                     <i className="bi bi-list-check me-1" />{loc.services}
//                   </p>
//                 )}
//                 {loc.note && (
//                   <p className="text-muted mb-3 fst-italic">
//                     <i className="bi bi-info-circle me-1" />{loc.note}
//                   </p>
//                 )}

//                 <div className="d-flex gap-2 flex-wrap mt-3">
//                   <Button
//                     variant="outline-danger"
//                     size="sm"
//                     onClick={() => handleDelete(loc.id)}
//                   >
//                     <i className="bi bi-trash me-1" />Delete
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}

//         {locations.length === 0 && (
//           <Col>
//             <Card>
//               <Card.Body className="text-center text-muted py-5">
//                 <i className="bi bi-geo-alt-fill" style={{ fontSize: '48px' }} />
//                 <p className="mt-3">No locations found. Add your first location!</p>
//               </Card.Body>
//             </Card>
//           </Col>
//         )}
//       </Row>

//       {/* ── add modal ── */}
//       <Modal show={showModal} onHide={handleCloseModal} size="lg" scrollable>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Location</Modal.Title>
//         </Modal.Header>

//         <Form onSubmit={handleSubmit}>
//           <Modal.Body>
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Name *</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     placeholder="Location name"
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Type</Form.Label>
//                   <Form.Select
//                     name="type"
//                     value={formData.type}
//                     onChange={handleInputChange}
//                   >
//                     <option value="">Select type</option>
//                     {LOCATION_TYPES.map(t => (
//                       <option key={t} value={t}>{t}</option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Address</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     placeholder="Street, Area"
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Phone</Form.Label>
//                   <Form.Control
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="+20 XXX XXX XXXX"
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Working Hours</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="hours"
//                     value={formData.hours}
//                     onChange={handleInputChange}
//                     placeholder="e.g. 9:00 AM – 5:00 PM"
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Services</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="services"
//                     value={formData.services}
//                     onChange={handleInputChange}
//                     placeholder="e.g. X-Ray, Blood Tests"
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group className="mb-3">
//               <Form.Label>Note</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={2}
//                 name="note"
//                 value={formData.note}
//                 onChange={handleInputChange}
//                 placeholder="Any additional notes…"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Check
//                 type="checkbox"
//                 name="isInquiryOnly"
//                 checked={formData.isInquiryOnly}
//                 onChange={handleInputChange}
//                 label="Inquiry Only (no walk-in booking)"
//               />
//             </Form.Group>
//           </Modal.Body>

//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
//             <Button type="submit" className="btn-primary-green">
//               Add Location
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </Container>
//   )
// }

// // ─── helpers ──────────────────────────────────────────────────────────────
// function typeColor(type?: string): string {
//   const map: Record<string, string> = {
//     Hospital: '#ef4444',
//     Pharmacy: '#22c55e',
//     Lab: '#3b82f6',
//     Clinic: '#f97316',
//     Center: '#a855f7',
//   }
//   return type ? (map[type] ?? '#6b7280') : '#6b7280'
// }

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
  LocationType,
  ServiceType,
  LOCATION_TYPE_LABELS,
  SERVICE_TYPE_LABELS,
  typeColor,
} from '../../types/VaccLocation'

const LOCATION_TYPES = Object.entries(LOCATION_TYPE_LABELS).map(([val, label]) => ({
  val: Number(val) as LocationType,
  label,
}))

const SERVICE_TYPES = Object.entries(SERVICE_TYPE_LABELS).map(([val, label]) => ({
  val: Number(val) as ServiceType,
  label,
}))

export default function DashboardVaccineLocations() {
  const [locations,      setLocations]      = useState<VaccLocation[]>([])
  const [loading,        setLoading]        = useState(true)
  const [showModal,      setShowModal]      = useState(false)
  const [editTarget,     setEditTarget]     = useState<VaccLocation | null>(null)
  const [filterType,     setFilterType]     = useState<number | ''>('')
  const [successMessage, setSuccessMessage] = useState('')
  const [formData,       setFormData]       = useState<VaccLocationForm>(emptyVaccLocationForm)

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
    setEditTarget(loc)
    setFormData({
      name:            loc.name,
      type:            String(loc.type),
      governorate:     loc.governorate,
      address:         loc.address,
      phone:           loc.phone    ?? '',
      hours:           loc.hours    ?? '',
      note:            loc.note     ?? '',
      providesVaccine: loc.providesVaccine,
      serviceType:     String(loc.serviceType),
      isActive:        loc.isActive,
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
    try {
      if (editTarget) {
        await updateLocation(editTarget.id, formData)
        setSuccessMessage('Location updated successfully!')
      } else {
        await createLocation(formData)
        setSuccessMessage('Location added successfully!')
      }
      await loadLocations(filterType || undefined)
      closeModal()
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      console.error('Error saving location:', err)
      alert('Failed to save location.')
    }
  }

  // ─── delete ──────────────────────────────────────────────────────────────
  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this location?')) return
    try {
      await deleteLocation(id)
      setSuccessMessage('Location deleted successfully!')
      await loadLocations(filterType || undefined)
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      console.error('Error deleting location:', err)
    }
  }

  // ─── toggle ──────────────────────────────────────────────────────────────
 const handleToggle = async (id: number) => {
  try {
    await toggleLocation(id)  // ده بيعكس isActive
    await loadLocations(filterType || undefined)  // reload
    // بعد التغيير، الـ location هينتقل من صفحة للتانية حسب isActive الجديد
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
      {/* ── header ── */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="page-title">Location Management</h1>
        <Button className="color-for-app" onClick={openCreate}>
          <i className="bi bi-plus-circle me-2" />Add New Location
        </Button>
      </div>

      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      {/* ── type filter ── */}
      <div className="d-flex gap-2 flex-wrap mb-4">
        <Button
          variant={filterType === '' ? 'primary' : 'outline-primary'}
          size="sm"
          onClick={() => handleFilterChange('')}
        >
          All
        </Button>
        {LOCATION_TYPES.map(t => (
          <Button
            key={t.val}
            variant={filterType === t.val ? 'primary' : 'outline-primary'}
            size="sm"
            onClick={() => handleFilterChange(t.val)}
          >
            {t.label}
          </Button>
        ))}
      </div>

      {/* ── cards ── */}
      <Row className="g-4">
        {locations.map(loc => (
          <Col lg={4} md={6} key={loc.id}>
            <Card className="h-100">
              <div
                style={{
                  height: '6px',
                  background: typeColor(loc.type),
                  borderTopLeftRadius:  'var(--bs-card-border-radius)',
                  borderTopRightRadius: 'var(--bs-card-border-radius)',
                }}
              />
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="mb-0">{loc.name}</h5>
                  <div className="d-flex gap-1 flex-wrap">
                    {loc.type && (
                      <Badge bg="secondary">{LOCATION_TYPE_LABELS[loc.type]}</Badge>
                    )}
                     {loc.isActive ? (
          <Badge bg="success" style={{ backgroundColor: '#198754' }}>
            <i className="bi bi-check-circle me-1" /> Active
          </Badge>
        ) : (
          <Badge bg="secondary" style={{ backgroundColor: '#6c757d' }}>
            <i className="bi bi-x-circle me-1" /> Inactive
          </Badge>
        )}
                    {loc.serviceType === ServiceType.InquiryOnly && (
                      <Badge bg="warning" text="dark">Inquiry Only</Badge>
                    )}
                  </div>
                </div>

                {loc.governorate && (
                  <p className="text-muted mb-1">
                    <i className="bi bi-map me-1" />{loc.governorate}
                  </p>
                )}
                {loc.address && (
                  <p className="text-muted mb-1">
                    <i className="bi bi-geo-alt me-1" />{loc.address}
                  </p>
                )}
                {loc.phone && (
                  <p className="text-muted mb-1">
                    <i className="bi bi-telephone me-1" />{loc.phone}
                  </p>
                )}
                {loc.hours && (
                  <p className="text-muted mb-1">
                    <i className="bi bi-clock me-1" />{loc.hours}
                  </p>
                )}
                {loc.serviceType && (
                  <p className="text-muted mb-1">
                    <i className="bi bi-list-check me-1" />
                    {SERVICE_TYPE_LABELS[loc.serviceType]}
                  </p>
                )}
                {loc.note && (
                  <p className="text-muted mb-3 fst-italic">
                    <i className="bi bi-info-circle me-1" />{loc.note}
                  </p>
                )}

                <div className="d-flex gap-2 flex-wrap mt-3">
                  <Button variant="outline-secondary" size="sm" onClick={() => openEdit(loc)}>
                    <i className="bi bi-pencil me-1" />Edit
                  </Button>
                  
             {loc.isActive ? (
        <Button 
          variant="outline-danger" 
          size="sm" 
          onClick={() => handleToggle(loc.id)}
          title="Deactivate this location (will be hidden from public)"
        >
          <i className="bi bi-toggle-off me-1" />
          Deactivate
        </Button>
      ) : (
        <Button 
          variant="outline-success" 
          size="sm" 
          onClick={() => handleToggle(loc.id)}
          title="Activate this location (will appear to public)"
        >
          <i className="bi bi-toggle-on me-1" />
          Activate
        </Button>
      )}
      
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(loc.id)}>
                    <i className="bi bi-trash me-1" />Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}

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

      {/* ── modal ── */}
      <Modal show={showModal} onHide={closeModal} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{editTarget ? 'Edit Location' : 'Add New Location'}</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    type="text" name="name" value={formData.name}
                    onChange={handleInputChange} placeholder="Location name" required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select name="type" value={formData.type} onChange={handleInputChange}>
                    <option value="">Select type</option>
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
                  <Form.Label>Governorate *</Form.Label>
                  <Form.Control
                    type="text" name="governorate" value={formData.governorate}
                    onChange={handleInputChange} placeholder="e.g. Port Said" required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Service Type</Form.Label>
                  <Form.Select name="serviceType" value={formData.serviceType} onChange={handleInputChange}>
                    <option value="">Select service type</option>
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
                  <Form.Label>Address</Form.Label>
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

            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Working Hours</Form.Label>
                  <Form.Control
                    type="text" name="hours" value={formData.hours}
                    onChange={handleInputChange} placeholder="e.g. 9:00 AM – 5:00 PM"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Note</Form.Label>
              <Form.Control
                as="textarea" rows={2} name="note" value={formData.note}
                onChange={handleInputChange} placeholder="Any additional notes…"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Check
                  type="checkbox" name="providesVaccine"
                  checked={formData.providesVaccine} onChange={handleInputChange}
                  label="Provides Vaccine on-site"
                />
              </Col>
              <Col md={6}>
                <Form.Check
                  type="checkbox" name="isActive"
                  checked={formData.isActive} onChange={handleInputChange}
                  label="Active (visible to public)"
                />
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button type="submit" className="btn-primary-green">
              {editTarget ? 'Save Changes' : 'Add Location'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}