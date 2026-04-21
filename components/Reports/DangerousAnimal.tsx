

// 'use client'

// import { useDangerousAnimal } from './hooks/useDangerousAnimal'
// import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap'

// export default function DangerousAnimalReport() {
//   const {
//     formData,
//     setFormData,
//     selectedSymptoms,
//     locationMode,
//     setLocationMode,
//     submitted,
//     submittedData,
//     isLoading,
//     error,
//     symptoms,
//     highSuspicion,
//     toggleSymptom,
//     handleChange,
//     handleSubmit,
//   } = useDangerousAnimal()

//   // ✅ Success screen
//   if (submitted && submittedData) {
//     return (
//       <Container className="py-5" style={{ maxWidth: '800px' }}>
//         <Alert variant="success" className="text-center p-5">
//           <div style={{ fontSize: '3rem' }}>✅</div>
//           <h4 className="mt-3 fw-bold">Report Submitted Successfully!</h4>
//           <p className="text-muted">The relevant health authorities have been notified.</p>
//           <p className="text-muted small">Form will reset automatically in a few seconds…</p>
//         </Alert>
//       </Container>
//     )
//   }

//   return (
//     <Container className="py-5" style={{ maxWidth: '800px' }}>
//       <h2 className="mb-2">Report a Suspected Case</h2>
//       <p className="text-muted mb-4">
//         Use this form to report an animal showing signs of rabies or dangerous behavior.
//         Your report will be forwarded to the relevant health authorities.
//       </p>

//       {highSuspicion && (
//         <Alert variant="danger" className="mb-4 fw-bold fs-6">
//           ⚠️ High Suspicion Case – Please Report Immediately to the Relevant Authorities
//         </Alert>
//       )}

//       <Alert variant="warning" className="mb-4">
//         <strong>Alert:</strong> If the animal has bitten a person or another animal,
//         please go immediately to the nearest veterinary or health unit and do not attempt to capture the animal.
//       </Alert>

//       {error && (
//         <Alert variant="danger" className="mb-4">
//           ❌ <strong>Error:</strong> {error}
//         </Alert>
//       )}

//       <Card className="p-4">
//         <Form onSubmit={handleSubmit}>

//           {/* 1. Reporter Information */}
//           <h5 className="mb-3 border-bottom pb-2">1. Reporter Information</h5>
//           <div className="row mb-3">
//             <div className="col-md-6">
//               <Form.Group>
//                 <Form.Label>Name <span className="text-muted">(Optional)</span></Form.Label>
//                 <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
//               </Form.Group>
//             </div>
//             <div className="col-md-6">
//               <Form.Group>
//                 <Form.Label>Mobile Number <span className="text-muted">(Optional)</span></Form.Label>
//                 <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+20 ..." />
//               </Form.Group>
//             </div>
//           </div>
//           <div className="row mb-4">
//             <div className="col-md-6">
//               <Form.Group>
//                 <Form.Label>Governorate <span className="text-danger">*</span></Form.Label>
//                 <Form.Control type="text" name="governorate" value={formData.governorate} onChange={handleChange} placeholder="e.g. Port Said" required />
//               </Form.Group>
//             </div>
//             <div className="col-md-6">
//               <Form.Group>
//                 <Form.Label>District / Neighborhood <span className="text-danger">*</span></Form.Label>
//                 <Form.Control type="text" name="district" value={formData.district} onChange={handleChange} placeholder="e.g. Al-Manakh" required />
//               </Form.Group>
//             </div>
//           </div>

//           {/* 2. Case Type */}
//           <h5 className="mb-3 border-bottom pb-2">2. Case Type</h5>
//           <Form.Group className="mb-4">
//             <Form.Label>Animal Type <span className="text-danger">*</span></Form.Label>
//             <Form.Select name="animalType" value={formData.animalType} onChange={handleChange} required>
//               <option value="Dog">Dog</option>
//               <option value="Cat">Cat</option>
//             </Form.Select>
//           </Form.Group>

//           {/* 3. Symptoms */}
//           <h5 className="mb-3 border-bottom pb-2">3. Rabies Symptoms in {formData.animalType}s</h5>
//           <p className="text-muted small mb-3">Select the symptoms you observed (multiple selections allowed)</p>
//           <div className="mb-3">
//             {symptoms.map(symptom => (
//               <Form.Check
//                 key={symptom}
//                 type="checkbox"
//                 id={`symptom-${symptom}`}
//                 label={symptom}
//                 className="mb-2"
//                 checked={selectedSymptoms.includes(symptom)}
//                 onChange={() => toggleSymptom(symptom)}
//               />
//             ))}
//             <div className="mt-2 d-flex align-items-center gap-2">
//               <Form.Check
//                 type="checkbox"
//                 id="symptom-other"
//                 label="Other:"
//                 checked={!!formData.otherSymptom}
//                 onChange={() => {
//                   if (formData.otherSymptom) setFormData(prev => ({ ...prev, otherSymptom: '' }))
//                 }}
//               />
//               <Form.Control
//                 type="text"
//                 name="otherSymptom"
//                 value={formData.otherSymptom}
//                 onChange={handleChange}
//                 placeholder="Describe other symptom..."
//                 style={{ maxWidth: '300px' }}
//               />
//             </div>
//           </div>

//           {highSuspicion && (
//             <Alert variant="danger" className="mb-4">
//               🚨 <strong>High Suspicion Case</strong> – Multiple symptoms detected. Please report immediately.
//             </Alert>
//           )}

//           {/* 4. Report Date */}
//           <h5 className="mb-3 border-bottom pb-2">4. Report Date</h5>
//           <Form.Group className="mb-4">
//             <Form.Label>Date of Observation <span className="text-danger">*</span></Form.Label>
//             <Form.Control type="date" name="reportDate" value={formData.reportDate} onChange={handleChange} required />
//           </Form.Group>

//           {/* 5. Case Location */}
//           <h5 className="mb-3 border-bottom pb-2">5. Case Location</h5>
//           <div className="mb-3 d-flex gap-2">
//             <Button variant={locationMode === 'gps' ? 'success' : 'outline-secondary'} onClick={() => setLocationMode('gps')} type="button">
//               📍 Detect Location Automatically
//             </Button>
//             <Button variant={locationMode === 'manual' ? 'primary' : 'outline-secondary'} onClick={() => setLocationMode('manual')} type="button">
//               ✏️ Enter Manually
//             </Button>
//           </div>
//           {locationMode === 'manual' && (
//             <Form.Group className="mb-4">
//               <Form.Label>City / Area <span className="text-danger">*</span></Form.Label>
//               <Form.Control type="text" name="locationCity" value={formData.locationCity} onChange={handleChange} placeholder="e.g. Al-Qabuti District" required />
//             </Form.Group>
//           )}
//           {locationMode === 'gps' && (
//             <Alert variant="info" className="mb-4">📡 GPS location will be captured automatically upon submission.</Alert>
//           )}

//           {/* Submit */}
//           <Button type="submit" variant="danger" className="w-100 py-2 fw-bold" disabled={isLoading}>
//             {isLoading ? (
//               <><Spinner animation="border" size="sm" className="me-2" />Submitting…</>
//             ) : (
//               'Submit Report'
//             )}
//           </Button>
//         </Form>
//       </Card>

//       <div className="mt-3 text-center">
//         <Button variant="outline-secondary">🗺 View Cases on the Map</Button>
//       </div>
//     </Container>
//   )
// }

'use client'

import { useDangerousAnimal } from './hooks/useDangerousAnimal'
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap'
import LocationMapModal from './modals/LocationMapModals'

export default function DangerousAnimalReport() {
  const {
    formData,
    setFormData,
    selectedSymptoms,
    locationMode,
    setLocationMode,
    showMapModal,
    setShowMapModal,
    handleDetectLocation,
    handleLocationSelected,
    submitted,
    submittedData,
    isLoading,
    error,
    symptoms,
    highSuspicion,
    toggleSymptom,
    handleChange,
    handleSubmit,
  } = useDangerousAnimal()

  if (submitted && submittedData) {
    return (
      <Container className="py-5" style={{ maxWidth: '800px' }}>
        <Alert variant="success" className="text-center p-5">
          <div style={{ fontSize: '3rem' }}>✅</div>
          <h4 className="mt-3 fw-bold">Report Submitted Successfully!</h4>
          <p className="text-muted">The relevant health authorities have been notified.</p>
          <p className="text-muted small">Form will reset automatically in a few seconds…</p>
        </Alert>
      </Container>
    )
  }

  return (
    <Container className="py-5" style={{ maxWidth: '800px' }}>
      <h2 className="mb-2">Report a Suspected Case</h2>
      <p className="text-muted mb-4">
        Use this form to report an animal showing signs of rabies or dangerous behavior.
        Your report will be forwarded to the relevant health authorities.
      </p>

      {highSuspicion && (
        <Alert variant="danger" className="mb-4 fw-bold fs-6">
          ⚠️ High Suspicion Case – Please Report Immediately to the Relevant Authorities
        </Alert>
      )}

      <Alert variant="warning" className="mb-4">
        <strong>Alert:</strong> If the animal has bitten a person or another animal,
        please go immediately to the nearest veterinary or health unit and do not attempt to capture the animal.
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
                <Form.Label>District / Neighborhood <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="district" value={formData.district} onChange={handleChange} placeholder="e.g. Al-Manakh" required />
              </Form.Group>
            </div>
          </div>

          {/* 2. Case Type */}
          <h5 className="mb-3 border-bottom pb-2">2. Case Type</h5>
          <Form.Group className="mb-4">
            <Form.Label>Animal Type <span className="text-danger">*</span></Form.Label>
            <Form.Select name="animalType" value={formData.animalType} onChange={handleChange} required>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </Form.Select>
          </Form.Group>

          {/* 3. Symptoms */}
          <h5 className="mb-3 border-bottom pb-2">3. Rabies Symptoms in {formData.animalType}s</h5>
          <p className="text-muted small mb-3">Select the symptoms you observed (multiple selections allowed)</p>
          <div className="mb-3">
            {symptoms.map(symptom => (
              <Form.Check
                key={symptom}
                type="checkbox"
                id={`symptom-${symptom}`}
                label={symptom}
                className="mb-2"
                checked={selectedSymptoms.includes(symptom)}
                onChange={() => toggleSymptom(symptom)}
              />
            ))}
            <div className="mt-2 d-flex align-items-center gap-2">
              <Form.Check
                type="checkbox"
                id="symptom-other"
                label="Other:"
                checked={!!formData.otherSymptom}
                onChange={() => {
                  if (formData.otherSymptom) setFormData(prev => ({ ...prev, otherSymptom: '' }))
                }}
              />
              <Form.Control
                type="text"
                name="otherSymptom"
                value={formData.otherSymptom}
                onChange={handleChange}
                placeholder="Describe other symptom..."
                style={{ maxWidth: '300px' }}
              />
            </div>
          </div>

          {highSuspicion && (
            <Alert variant="danger" className="mb-4">
              🚨 <strong>High Suspicion Case</strong> – Multiple symptoms detected. Please report immediately.
            </Alert>
          )}

          {/* 4. Report Date */}
          <h5 className="mb-3 border-bottom pb-2">4. Report Date</h5>
          <Form.Group className="mb-4">
            <Form.Label>Date of Observation <span className="text-danger">*</span></Form.Label>
            <Form.Control type="date" name="reportDate" value={formData.reportDate} onChange={handleChange} required />
          </Form.Group>

          {/* 5. Case Location ✅ UPDATED */}
          <h5 className="mb-3 border-bottom pb-2">5. Case Location</h5>
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

          {locationMode === 'manual' && (
            <Form.Group className="mb-4">
              <Form.Label>City / Area <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                name="locationCity"
                value={formData.locationCity}
                onChange={handleChange}
                placeholder="e.g. Al-Qabuti District"
                required
              />
            </Form.Group>
          )}

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