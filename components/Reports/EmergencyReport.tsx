

'use client'

import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { useEmergency } from './hooks/useEmergency'
import LocationMapModal from './modals/LocationMapModals'
import RatingWidget from '../Rating/RatingWidget'
export default function EmergencyReport() {
  const {
    handleSubmit,
    handleChange,
    toggleBodyLocation,
    toggleAction,
    handleDetectLocation,
    handleLocationSelected,
    formData,
    setFormData,
    bodyLocations,
    initialActions,
    locationMode,
    setLocationMode,
    showMapModal,
    setShowMapModal,
    submitted,
    submittedData,
    isLoading,
    error,
    BODY_LOCATIONS,
    INITIAL_ACTIONS,
     showRating
  } = useEmergency()

  if (submitted && submittedData) {
    return (
      <Container className="py-5" style={{ maxWidth: '800px' }}>
        <Alert variant="success" className="text-center p-5">
          <div style={{ fontSize: '3rem' }}>✅</div>
          <h4 className="mt-3 fw-bold">Report Submitted Successfully!</h4>
  <h5 className="fw-bold mb-3">🚨 Animal Bite Emergency First Aid</h5>
  <ul className="mb-0" style={{ paddingInlineStart: '1.2rem' }}>
    <li className="mb-2"><strong>🚿 Wash</strong> — Soap + running water for <span className="text-danger fw-bold">15 minutes</span></li>
    <li className="mb-2"><strong>🧴 Disinfect</strong> — Apply antiseptic (povidone-iodine or alcohol)</li>
    <li className="mb-2"><strong>🏥 Visit Hospital</strong> — Seek immediate medical care for rabies PEP</li>
  </ul>
    </Alert>
     {showRating && (
              <div className="mt-4" style={{ width: '100%' }}>
                <RatingWidget fullWidth />
              </div>
            )}
      </Container>
    )
  }

  return (
    <Container className="py-5" style={{ maxWidth: '800px' }}>
      <h2 className="mb-2">Report a Bite or Scratch Case</h2>
      <p className="text-muted mb-4">
        Use this form to report exposure to an animal bite or scratch. This does not replace the need to visit an emergency department immediately.
      </p>

      <Alert variant="danger" className="mb-4">
        <strong>⚠️ Important:</strong> This application does <strong>not</strong> replace the need to go immediately to the emergency department after a bite or scratch.
      </Alert>

      {error && (
        <Alert variant="danger" className="mb-4">
          ❌ <strong>Error:</strong> {error}
        </Alert>
      )}

      <Card className="p-4">
        <Form onSubmit={handleSubmit}>

          {/* 1. Reporter Information */}
          <h5 className="mb-3 border-bottom pb-2">1. Reporter Information</h5>
          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Name <span className="text-muted">(Optional)</span></Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Mobile Number <span className="text-muted">(Optional)</span></Form.Label>
                <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+20 ..." />
              </Form.Group>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Governorate <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="governorate" value={formData.governorate} onChange={handleChange} placeholder="e.g. Port Said" required />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Area / District <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="district" value={formData.district} onChange={handleChange} placeholder="e.g. Al-Qabuti" required />
              </Form.Group>
            </div>
          </div>

          {/* 2. Animal Type */}
          <h5 className="mb-3 border-bottom pb-2">2. Animal Type</h5>
          <Form.Group className="mb-4">
            <Form.Label>Select the type of animal that caused the bite or scratch <span className="text-danger">*</span></Form.Label>
            <Form.Select name="animalType" value={formData.animalType} onChange={handleChange} required>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </Form.Select>
          </Form.Group>

          {/* 3. Location on Body */}
          <h5 className="mb-3 border-bottom pb-2">3. Location of Exposure on the Body</h5>
          <div className="mb-4">
            {BODY_LOCATIONS.map(loc => (
              <Form.Check
                key={loc}
                type="checkbox"
                id={`body-${loc}`}
                label={loc}
                className="mb-2"
                checked={bodyLocations.includes(loc)}
                onChange={() => toggleBodyLocation(loc)}
              />
            ))}
            <div className="d-flex align-items-center gap-2 mt-2">
              <Form.Check
                type="checkbox"
                id="body-other"
                label="Other:"
                checked={!!formData.otherBodyLocation}
                onChange={() => {
                  if (formData.otherBodyLocation) setFormData(prev => ({ ...prev, otherBodyLocation: '' }))
                }}
              />
              <Form.Control
                type="text"
                name="otherBodyLocation"
                value={formData.otherBodyLocation}
                onChange={handleChange}
                placeholder="Specify location..."
                style={{ maxWidth: '280px' }}
              />
            </div>
          </div>

          {/* 4. Type of Exposure */}
          <h5 className="mb-3 border-bottom pb-2">4. Type of Exposure</h5>
          <Form.Group className="mb-4">
            {['Bite', 'Scratch'].map(type => (
              <Form.Check key={type} type="radio" id={`exposure-${type}`} label={type} name="exposureType" value={type} checked={formData.exposureType === type} onChange={handleChange} className="mb-2" />
            ))}
          </Form.Group>

          {/* 5. Severity */}
          <h5 className="mb-3 border-bottom pb-2">5. Severity of Injury</h5>
          <Form.Group className="mb-4">
            {['Superficial', 'Deep', 'Bleeding'].map(level => (
              <Form.Check key={level} type="radio" id={`severity-${level}`} label={level} name="severity" value={level} checked={formData.severity === level} onChange={handleChange} className="mb-2" />
            ))}
          </Form.Group>

          {/* 6. Date and Time */}
          <h5 className="mb-3 border-bottom pb-2">6. Date and Time of Exposure</h5>
          <Form.Group className="mb-4">
            <Form.Label>When did the exposure occur? <span className="text-danger">*</span></Form.Label>
            <Form.Control type="datetime-local" name="exposureDateTime" value={formData.exposureDateTime} onChange={handleChange} required />
          </Form.Group>

          {/* 7. Case Location ✅ UPDATED */}
          <h5 className="mb-3 border-bottom pb-2">7. Case Location</h5>
          <div className="mb-3 d-flex gap-2">
            <Button
              variant={locationMode === 'gps' ? 'success' : 'outline-secondary'}
              onClick={handleDetectLocation}
              type="button"
            >
              📍 Detect Location Automatically
            </Button>
            <Button
              variant={locationMode === 'manual' ? 'primary' : 'outline-secondary'}
              onClick={() => setLocationMode('manual')}
              type="button"
            >
              ✏️ Enter Manually
            </Button>
          </div>

          {/* Manual input */}
          {locationMode === 'manual' && (
            <Form.Group className="mb-4">
              <Form.Label>City / Area <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="locationCity"
                value={formData.locationCity}
                onChange={handleChange}
                placeholder="e.g. Al-Israa Area"
                required
              />
            </Form.Group>
          )}

          {/* GPS selected — show result */}
          {locationMode === 'gps' && (
            <div className="mb-4">
              {formData.locationCity ? (
                <Alert variant="success" className="d-flex align-items-start gap-2 mb-2">
                  <span>✅</span>
                  <div>
                    <strong>Location selected:</strong><br />
                    <span className="small">{formData.locationCity}</span>
                    {formData.lat && formData.lng && (
                      <div className="text-muted small mt-1">
                        📌 {parseFloat(formData.lat).toFixed(5)}, {parseFloat(formData.lng).toFixed(5)}
                      </div>
                    )}
                  </div>
                  {/* Allow re-picking */}
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="ms-auto"
                    onClick={() => setShowMapModal(true)}
                    type="button"
                  >
                    Change
                  </Button>
                </Alert>
              ) : (
                <Alert variant="info" className="mb-2">
                  📍 Click <strong>"Detect Location Automatically"</strong> to open the map and pick your location.
                </Alert>
              )}
            </div>
          )}

          {/* 8. Initial Actions */}
          <h5 className="mb-3 border-bottom pb-2">8. Initial Actions Taken After Exposure</h5>
          <div className="mb-4">
            {INITIAL_ACTIONS.map(action => (
              <Form.Check
                key={action}
                type="checkbox"
                id={`action-${action}`}
                label={action}
                className="mb-2"
                checked={initialActions.includes(action)}
                onChange={() => toggleAction(action)}
              />
            ))}
            <div className="d-flex align-items-center gap-2 mt-2">
              <Form.Check
                type="checkbox"
                id="action-other"
                label="Other:"
                checked={!!formData.otherAction}
                onChange={() => {
                  if (formData.otherAction) setFormData(prev => ({ ...prev, otherAction: '' }))
                }}
              />
              <Form.Control
                type="text"
                name="otherAction"
                value={formData.otherAction}
                onChange={handleChange}
                placeholder="Describe other action..."
                style={{ maxWidth: '280px' }}
              />
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" variant="danger" className="w-100 py-2 fw-bold" disabled={isLoading}>
            {isLoading ? (
              <><Spinner animation="border" size="sm" className="me-2" />Submitting…</>
            ) : (
              'Submit Report'
            )}
          </Button>
        </Form>
      </Card>

      <div className="mt-3 text-center">
        <Button variant="outline-secondary">🗺 View Cases on the Map</Button>
      </div>

      {/* ✅ Location Map Modal */}
      <LocationMapModal
        show={showMapModal}
        onClose={() => setShowMapModal(false)}
        onConfirm={handleLocationSelected}
      />
    </Container>
  )
}