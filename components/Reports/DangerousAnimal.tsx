// 'use client'

// import { useState } from 'react'
// import { Container, Card, Form, Button } from 'react-bootstrap'

// export default function DangerousAnimalReport() {
//   const [urgency, setUrgency] = useState('Medium')
//   const [formData, setFormData] = useState({
//     name: 'Chris Garcia',
//     email: 'chris.evans@example.com',
//     phone: '+1 (555) 111-2222',
//     address: '789 Beach Road',
//     city: 'Ismailia',
//     state: 'Ismailia',
//     description: 'Observed a pack of stray dogs acting aggressively towards passersby near the local park entrance. They appear to be in poor health.'
//   })

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     alert('Location report submitted successfully!')
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   return (
//     <Container className="py-5" style={{ maxWidth: '800px' }}>
//       <h2 className="mb-2">Location-Based Report: Dangerous or Infected Animals</h2>
//       <p className="text-muted mb-4">
//         Report animals that are dangerous, infected, or in a critical state within a specific location is encountered.
//       </p>

//       <Card className="p-4">
//         <Form onSubmit={handleSubmit}>
//           {/* Name and Email */}
//           <div className="row mb-3">
//             <div className="col-md-6">
//               <Form.Group>
//                 <Form.Label>Your Name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Form.Group>
//             </div>
//             <div className="col-md-6">
//               <Form.Group>
//                 <Form.Label>Email Address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Form.Group>
//             </div>
//           </div>

//           {/* Phone Number */}
//           <Form.Group className="mb-3">
//             <Form.Label>Phone Number</Form.Label>
//             <Form.Control
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleInputChange}
//               required
//             />
//           </Form.Group>

//           {/* Report Address */}
//           <Form.Group className="mb-3">
//             <Form.Label>Report Address</Form.Label>
//             <Form.Control
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               required
//             />
//           </Form.Group>

//           {/* City/Town and State/Region */}
//           <div className="row mb-3">
//             <div className="col-md-6">
//               <Form.Group>
//                 <Form.Label>City/Town</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Form.Group>
//             </div>
//             <div className="col-md-6">
//               <Form.Group>
//                 <Form.Label>State/Region</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Form.Group>
//             </div>
//           </div>

//           {/* Animal & Situation Description */}
//           <Form.Group className="mb-3">
//             <Form.Label>Animal & Situation Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               rows={4}
//               required
//             />
//           </Form.Group>

//           {/* Pin Location Button */}
//           <div className="mb-4">
//             <Button variant="outline-secondary" className="w-100" style={{ 
//               background: '#e8f5e9',
//               borderColor: '#c3e6cb',
//               color: '#155724'
//             }}>
//               📍 Pin Location on Map (Screen 1/3)
//             </Button>
//           </div>

//           {/* Upload Photo */}
//           <Form.Group className="mb-4">
//             <Form.Label>Upload Photo (Optional)</Form.Label>
//             <div className="upload-area">
//               <div className="upload-icon">
//                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
//                   <circle cx="8.5" cy="8.5" r="1.5"></circle>
//                   <polyline points="21 15 16 10 5 21"></polyline>
//                 </svg>
//               </div>
//               <p className="mb-0">Drag & drop photos here, or click to upload</p>
//             </div>
//           </Form.Group>

//           {/* Urgency Level */}
//           <Form.Group className="mb-4">
//             <Form.Label>Urgency Level</Form.Label>
//             <div className="urgency-selector">
//               <div
//                 className={`urgency-option ${urgency === 'Low' ? 'selected low' : ''}`}
//                 onClick={() => setUrgency('Low')}
//               >
//                 Low
//               </div>
//               <div
//                 className={`urgency-option ${urgency === 'Medium' ? 'selected medium' : ''}`}
//                 onClick={() => setUrgency('Medium')}
//               >
//                 Medium
//               </div>
//               <div
//                 className={`urgency-option ${urgency === 'High' ? 'selected high' : ''}`}
//                 onClick={() => setUrgency('High')}
//               >
//                 High
//               </div>
//             </div>
//           </Form.Group>

//           {/* Submit Button */}
//           <Button type="submit" className="btn-primary-green w-100">
//             Submit Location Report
//           </Button>
//         </Form>
//       </Card>
//     </Container>
//   )
// }

'use client'

import { useState } from 'react'
import { Container, Card, Form, Button, Alert } from 'react-bootstrap'

const DOG_SYMPTOMS = [
  'Sudden aggression or unusual aggressive behavior',
  'Repeated attempts to bite',
  'Eating strange objects',
  'Random running, noticeable nervous or behavioral disturbance',
  'Voice change',
  'Excessive drooling',
  'Partial or complete paralysis',
  'Sudden behavioral change (isolation or extreme agitation)',
  'Difficulty swallowing',
]

const CAT_SYMPTOMS = [
  'Sudden change in behavior (fear, extreme calmness, or unusual aggression)',
  'Severe isolation or constant hiding',
  'Loss of appetite',
  'Unusual meowing or noticeable change in voice',
  'Dilated pupils',
  'Repeated biting or scratching attempts without reason',
  'Random running or abnormal tension and movement',
  'Extreme sensitivity to sound and light',
  'Drooling or foam around the mouth',
  'Difficulty swallowing and refusal to drink water or eat',
  'Loss of balance or staggering',
  'Partial paralysis, usually starting in the hind legs',
  'Complete paralysis or inability to move',
]

export default function DangerousAnimalReport() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    governorate: '',
    district: '',
    animalType: 'Dog',
    reportDate: '',
    locationCity: '',
    otherSymptom: '',
  })
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [locationMode, setLocationMode] = useState<'gps' | 'manual'>('manual')
  const [submitted, setSubmitted] = useState(false)

  const symptoms = formData.animalType === 'Dog' ? DOG_SYMPTOMS : CAT_SYMPTOMS
  const highSuspicion = selectedSymptoms.length > 1

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (name === 'animalType') setSelectedSymptoms([])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    alert('Report submitted successfully! Relevant health authorities have been notified.')
  }

  return (
    <Container className="py-5" style={{ maxWidth: '800px' }}>
      <h2 className="mb-2">Report a Suspected Case</h2>
      <p className="text-muted mb-4">
        Use this form to report an animal showing signs of rabies or dangerous behavior. Your report will be forwarded to the relevant health authorities.
      </p>

      {highSuspicion && (
        <Alert variant="danger" className="mb-4 fw-bold fs-6">
          ⚠️ High Suspicion Case – Please Report Immediately to the Relevant Authorities
        </Alert>
      )}

      <Alert variant="warning" className="mb-4">
        <strong>Alert:</strong> If the animal has bitten a person or another animal, please go immediately to the nearest veterinary or health unit and do not attempt to capture the animal.
      </Alert>

      <Card className="p-4">
        <Form onSubmit={handleSubmit}>

          {/* 1. Reporter Information */}
          <h5 className="mb-3 border-bottom pb-2">1. Reporter Information</h5>
          <div className="row mb-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Name <span className="text-muted">(Optional)</span></Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Mobile Number <span className="text-muted">(Optional)</span></Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+20 ..."
                />
              </Form.Group>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Governorate <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="governorate"
                  value={formData.governorate}
                  onChange={handleChange}
                  placeholder="e.g. Port Said"
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>District / Neighborhood <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="e.g. Al-Manakh"
                  required
                />
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
          <h5 className="mb-3 border-bottom pb-2">
            3. Rabies Symptoms in {formData.animalType}s
          </h5>
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
              🚨 <strong>High Suspicion Case</strong> – Multiple symptoms detected. Please report immediately to the relevant authorities.
            </Alert>
          )}

          {/* 4. Report Date */}
          <h5 className="mb-3 border-bottom pb-2">4. Report Date</h5>
          <Form.Group className="mb-4">
            <Form.Label>Date of Observation <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="date"
              name="reportDate"
              value={formData.reportDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* 5. Case Location */}
          <h5 className="mb-3 border-bottom pb-2">5. Case Location</h5>
          <div className="mb-3 d-flex gap-2">
            <Button
              variant={locationMode === 'gps' ? 'success' : 'outline-secondary'}
              onClick={() => setLocationMode('gps')}
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
            <Alert variant="info" className="mb-4">
              📡 GPS location will be captured automatically upon submission.
            </Alert>
          )}

          {/* Submit */}
          <Button type="submit" variant="danger" className="w-100 py-2 fw-bold">
            Submit Report
          </Button>
        </Form>
      </Card>

      <div className="mt-3 text-center">
        <Button variant="outline-secondary">
          🗺 View Cases on the Map
        </Button>
      </div>
    </Container>
  )
}