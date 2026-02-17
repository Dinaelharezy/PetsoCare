
// 'use client'

// import { useState, useEffect } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap'
// import Image from 'next/image'
// import { vetsApi } from '../../data/api/vet'
// import { Vet } from '../../types/Vet'


// export default function DoctorProfileClient() {
//   const params = useParams()
//   const router = useRouter()
//   const [vet, setVet] = useState<Vet | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [selectedDate, setSelectedDate] = useState(9)

//   const weekDays = [
//     { label: 'Mon', day: 6 },
//     { label: 'Tue', day: 7 },
//     { label: 'Wed', day: 8 },
//     { label: 'Thu', day: 9 },
//     { label: 'Fri', day: 10 },
//     { label: 'Sat', day: 11 },
//     { label: 'Sun', day: 12 }
//   ]

//   const reviews = [
//     {
//       name: 'Ahmed A.',
//       rating: 5,
//       date: 'Dec 18, 2025',
//       comment: 'Dr. Petrova is amazing! She genuinely cares not only excellently knowledgeable, highly recommend.'
//     },
//     {
//       name: 'Sara K.',
//       rating: 4,
//       date: 'Dec 20, 2025',
//       comment: 'Great experience. The staff was friendly, and Dr. Petrova provided clear explanations. A bit of a wait, but worth it.'
//     },
//     {
//       name: 'Omar M.',
//       rating: 5,
//       date: 'Aug 12, 2025',
//       comment: 'I was impressed quickly treated my pet. Dr. Petrova is super surgery. Couldn\'t be happier with the results.'
//     }
//   ]

//   useEffect(() => {
//     const fetchVet = async () => {
//       if (!params?.id) return

//       try {
//         setLoading(true)
//         const data = await vetsApi.getById(params.id as string)
        
//         if (!data) {
//           setError('Doctor not found')
//           return
//         }

//         // Check if vet is published
//         if (data.published === false) {
//           setError('This doctor profile is not available')
//           return
//         }

//         setVet(data)
//       } catch (err) {
//         console.error('Failed to fetch vet:', err)
//         setError('Failed to load doctor profile')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchVet()
//   }, [params?.id])

//   const handleSubmitReview = (e: React.FormEvent) => {
//     e.preventDefault()
//     alert('Review submitted successfully!')
//   }

//   const handleConfirmAppointment = () => {
//     if (vet) {
//       // Here you can trigger the notification to admin
//       // using the same system as the booking page
//       alert(`Appointment confirmed with ${vet.name} on day ${selectedDate}`)
      
//       // You can dispatch the event here
//       const event = new CustomEvent('newAppointment', {
//         detail: {
//           doctorName: vet.name,
//           patientName: 'Current User', // Get from user session
//           date: `Day ${selectedDate}`
//         }
//       })
//       window.dispatchEvent(event)
//     }
//   }

//   if (loading) {
//     return (
//       <Container className="py-5 text-center">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//         <p className="mt-3 text-muted">Loading doctor profile...</p>
//       </Container>
//     )
//   }

//   if (error || !vet) {
//     return (
//       <Container className="py-5 text-center">
//         <h3 className="text-muted">{error || 'Doctor not found'}</h3>
//         <button 
//           className="btn btn-primary mt-3"
//           onClick={() => router.push('/main/Vet-profile')}
//         >
//           Back to Doctors
//         </button>
//       </Container>
//     )
//   }

//   return (
//     <Container className="py-5">
//       {/* Doctor Profile Section */}
//       <Card className="doctor-card p-5 mb-4" style={{
//         boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//         borderRadius: '15px',
//         border: 'none'
//       }}>
//         <Row>
//           <Col md={2}>
//             <div className="doctor-image mt-2 mx-0" style={{
//               width: '100%',
//               height: '180px',
//               borderRadius: '12px',
//               overflow: 'hidden'
//             }}>
//               {vet.image ? (
//                 <Image 
//                   src={vet.image} 
//                   alt={vet.name} 
//                   width={180}
//                   height={180}
//                   style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
//                 />
//               ) : (
//                 <div className="d-flex align-items-center justify-content-center h-100 bg-light">
//                   <i className="bi bi-person-fill text-secondary" style={{ fontSize: '4rem' }}></i>
//                 </div>
//               )}
//             </div>
//           </Col>
//           <Col md={10}>
//             <div className="d-flex justify-content-between align-items-start mb-3">
//               <div>
//                 <h2 className="mb-2">{vet.name}</h2>
//                 <p className="text-muted mb-0">{vet.specialty}</p>
//                 {vet.experience && (
//                   <p className="text-muted mb-0">
//                     <i className="bi bi-award me-2"></i>
//                     {vet.experience} years of experience
//                   </p>
//                 )}
//               </div>
//               <div className="text-end">
//                 <div className="d-flex align-items-center gap-2 mb-2">
//                   <i className="bi bi-star-fill text-warning"></i>
//                   <span><strong>{vet.rating}</strong> ({vet.reviews} reviews)</span>
//                 </div>
//                 <div className="d-flex align-items-center gap-2">
//                   <i className="bi bi-geo-alt-fill text-success"></i>
//                   <span>{vet.location}</span>
//                 </div>
//               </div>
//             </div>
            
//             <p className="mb-3" style={{ lineHeight: '1.8' }}>
//               {vet.bio}
//             </p>
            
//             <div className="contact-info" style={{ 
//               display: 'flex', 
//               gap: '20px',
//               flexWrap: 'wrap'
//             }}>
//               <span>
//                 <i className="bi bi-telephone-fill me-2"></i>
//                 {vet.phone}
//               </span> 
//               <span>
//                 <i className="bi bi-envelope-fill me-2"></i>
//                 {vet.email}
//               </span>
//             </div>
//           </Col>
//         </Row>
//       </Card>

//       {/* Book Appointment Section */}
//       <div className="section-header mb-3">
//         <h3 className="section-title" style={{ fontSize: '1.5rem', fontWeight: '600' }}>
//           Book an Appointment
//         </h3>
//         <p className="section-subtitle text-muted">
//           Please select time to schedule your scheduled appointment. Emergency appointments available upon request.
//         </p>
//       </div>

//       <Card className="p-4 mb-4" style={{
//         boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//         borderRadius: '15px',
//         border: 'none'
//       }}>
//         <h5 className="mb-3">Select a Day</h5>
//         <div className="date-selector" style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
//           gap: '10px',
//           marginBottom: '20px'
//         }}>
//           {weekDays.map((item) => (
//             <div
//               key={item.day}
//               className={`date-box ${selectedDate === item.day ? 'selected' : ''}`}
//               onClick={() => setSelectedDate(item.day)}
//               style={{
//                 padding: '15px',
//                 textAlign: 'center',
//                 borderRadius: '10px',
//                 border: selectedDate === item.day ? '2px solid #7CB342' : '2px solid #ddd',
//                 backgroundColor: selectedDate === item.day ? '#f0f8e8' : 'white',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s'
//               }}
//             >
//               <span className="date-label" style={{ 
//                 display: 'block', 
//                 fontSize: '0.85rem',
//                 color: '#666',
//                 marginBottom: '5px'
//               }}>
//                 {item.label}
//               </span>
//               <span className="date-number" style={{ 
//                 display: 'block',
//                 fontSize: '1.5rem',
//                 fontWeight: '600',
//                 color: selectedDate === item.day ? '#7CB342' : '#333'
//               }}>
//                 {item.day}
//               </span>
//             </div>
//           ))}
//         </div>
//         <div className="text-center mt-4">
//           <Button 
//             className="btn-primary-green"
//             onClick={handleConfirmAppointment}
//             style={{
//               backgroundColor: '#7CB342',
//               border: 'none',
//               padding: '12px 40px',
//               borderRadius: '10px',
//               fontWeight: '500',
//               fontSize: '1rem'
//             }}
//           >
//             Confirm Appointment
//           </Button>
//         </div>
//       </Card>

//       {/* Clinic Location Section */}
//       <div className="section-header mb-3">
//         <h3 className="section-title" style={{ fontSize: '1.5rem', fontWeight: '600' }}>
//           Clinic Location
//         </h3>
//       </div>

//       <div className="map-container mb-4" style={{
//         height: '300px',
//         borderRadius: '15px',
//         overflow: 'hidden',
//         boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
//       }}>
//         <iframe
//           className="map-embed"
//           src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1&bbox=51.5&layer=mapnik"
//           title="Clinic Location Map"
//           style={{ width: '100%', height: '100%', border: 'none' }}
//         ></iframe>
//       </div>
//       <p className="text-muted">
//         <small>
//           <i className="bi bi-geo-alt-fill me-2"></i>
//           123 Pet Care Road, {vet.location}, Block #12, Floor 3rd, Office 8
//         </small>
//       </p>

//       {/* Patient Reviews Section */}
//       <div className="section-header mb-3">
//         <h3 className="section-title" style={{ fontSize: '1.5rem', fontWeight: '600' }}>
//           Patient Reviews
//         </h3>
//       </div>

//       {/* Add Review Form */}
//       <Card className="review-input mb-3 p-4" style={{
//         boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//         borderRadius: '15px',
//         border: 'none'
//       }}>
//         <h5 className="mb-3">Add a Review</h5>
//         <Form onSubmit={handleSubmitReview}>
//           <div className="star-rating mb-3">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <span key={star} style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#FFD700' }}>
//                 ☆
//               </span>
//             ))}
//           </div>
//           <Form.Group className="mb-3">
//             <Form.Control
//               as="textarea"
//               placeholder="Share your experience..."
//               rows={3}
//               style={{
//                 borderRadius: '10px',
//                 border: '1px solid #ddd'
//               }}
//             />
//           </Form.Group>
//           <Button 
//             className="btn-primary-green"
//             type="submit"
//             style={{
//               backgroundColor: '#7CB342',
//               border: 'none',
//               padding: '10px 30px',
//               borderRadius: '10px',
//               fontWeight: '500'
//             }}
//           >
//             Submit Review
//           </Button>
//         </Form>
//       </Card>

//       {/* Reviews List */}
//       {reviews.map((review, index) => (
//         <Card key={index} className="review-card mb-3 p-4" style={{
//           boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
//           borderRadius: '15px',
//           border: 'none'
//         }}>
//           <div className="d-flex justify-content-between align-items-start mb-2">
//             <div>
//               <h6 className="mb-1" style={{ fontWeight: '600' }}>{review.name}</h6>
//               <div className="star-rating" style={{ color: '#FFD700' }}>
//                 {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
//               </div>
//             </div>
//             <span className="review-date text-muted" style={{ fontSize: '0.85rem' }}>
//               {review.date}
//             </span>
//           </div>
//           <p className="mb-0" style={{ lineHeight: '1.6' }}>{review.comment}</p>
//         </Card>
//       ))}
//     </Container>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap'
import Image from 'next/image'
import { vetsApi } from '../../data/api/vet'
import { Vet } from '../../types/Vet'

interface Review {
  name: string
  rating: number
  date: string
  comment: string
}

// ✅ لما يجيلك next-auth، غيري الـ function دي بس
// import { useSession } from 'next-auth/react'
// const { data: session } = useSession()
// return session?.user?.name ?? 'Guest'
const getCurrentUserName = (): string => {
  return 'Aisha Sayed' // ← غيري دي لما يجي الـ API
}

const REVIEWS_KEY = 'vet_clinic_reviews'

const getStoredReviews = (vetId: string): Review[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(`${REVIEWS_KEY}_${vetId}`)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveReview = (vetId: string, review: Review): void => {
  if (typeof window === 'undefined') return
  const existing = getStoredReviews(vetId)
  localStorage.setItem(`${REVIEWS_KEY}_${vetId}`, JSON.stringify([review, ...existing]))
}

export default function DoctorProfileClient() {
  const params = useParams()
  const router = useRouter()
  const [vet, setVet] = useState<Vet | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState(9)

  // Reviews state
  const [allReviews, setAllReviews] = useState<Review[]>([])
  const [newComment, setNewComment] = useState('')
  const [newRating, setNewRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const staticReviews: Review[] = [
    {
      name: 'Ahmed A.',
      rating: 5,
      date: 'Dec 18, 2025',
      comment: 'Dr. Petrova is amazing! She genuinely cares not only excellently knowledgeable, highly recommend.'
    },
    {
      name: 'Sara K.',
      rating: 4,
      date: 'Dec 20, 2025',
      comment: 'Great experience. The staff was friendly, and Dr. Petrova provided clear explanations. A bit of a wait, but worth it.'
    },
    {
      name: 'Omar M.',
      rating: 5,
      date: 'Aug 12, 2025',
      comment: "I was impressed quickly treated my pet. Dr. Petrova is super surgery. Couldn't be happier with the results."
    }
  ]

  const weekDays = [
    { label: 'Mon', day: 6 },
    { label: 'Tue', day: 7 },
    { label: 'Wed', day: 8 },
    { label: 'Thu', day: 9 },
    { label: 'Fri', day: 10 },
    { label: 'Sat', day: 11 },
    { label: 'Sun', day: 12 }
  ]

  useEffect(() => {
    const fetchVet = async () => {
      if (!params?.id) return
      try {
        setLoading(true)
        const data = await vetsApi.getById(params.id as string)
        if (!data) { setError('Doctor not found'); return }
        if (data.published === false) { setError('This doctor profile is not available'); return }
        setVet(data)

        // ✅ جيب الـ reviews من localStorage وضيفهم فوق الـ static
        const stored = getStoredReviews(params.id as string)
        setAllReviews([...stored, ...staticReviews])
      } catch {
        setError('Failed to load doctor profile')
      } finally {
        setLoading(false)
      }
    }
    fetchVet()
  }, [params?.id])

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !params?.id) return

    const review: Review = {
      name: getCurrentUserName(), // ✅ اسم اليوزر الحالي
      rating: newRating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      comment: newComment.trim()
    }

    saveReview(params.id as string, review)
    setAllReviews(prev => [review, ...prev])
    setNewComment('')
    setNewRating(5)
    setReviewSubmitted(true)
    setTimeout(() => setReviewSubmitted(false), 3000)
  }

  const handleConfirmAppointment = () => {
    if (vet) {
      alert(`Appointment confirmed with ${vet.name} on day ${selectedDate}`)
      window.dispatchEvent(new CustomEvent('newAppointment', {
        detail: { doctorName: vet.name, patientName: getCurrentUserName(), date: `Day ${selectedDate}` }
      }))
    }
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading doctor profile...</p>
      </Container>
    )
  }

  if (error || !vet) {
    return (
      <Container className="py-5 text-center">
        <h3 className="text-muted">{error || 'Doctor not found'}</h3>
        <button className="btn btn-primary mt-3" onClick={() => router.push('/main/Home')}>
          Back to Doctors
        </button>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      {/* Doctor Profile */}
      <Card className="doctor-card p-5 mb-4" style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderRadius: '15px', border: 'none' }}>
        <Row>
          <Col md={2}>
            <div style={{ width: '100%', height: '180px', borderRadius: '12px', overflow: 'hidden' }}>
              {vet.image ? (
                <Image src={vet.image} alt={vet.name} width={180} height={180} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div className="d-flex align-items-center justify-content-center h-100 bg-light">
                  <i className="bi bi-person-fill text-secondary" style={{ fontSize: '4rem' }}></i>
                </div>
              )}
            </div>
          </Col>
          <Col md={10}>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h2 className="mb-2">{vet.name}</h2>
                <p className="text-muted mb-0">{vet.specialty}</p>
                {vet.experience && (
                  <p className="text-muted mb-0">
                    <i className="bi bi-award me-2"></i>{vet.experience} years of experience
                  </p>
                )}
              </div>
              <div className="text-end">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-star-fill text-warning"></i>
                  <span><strong>{vet.rating}</strong> ({vet.reviews} reviews)</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-geo-alt-fill text-success"></i>
                  <span>{vet.location}</span>
                </div>
              </div>
            </div>
            <p className="mb-3" style={{ lineHeight: '1.8' }}>{vet.bio}</p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <span><i className="bi bi-telephone-fill me-2"></i>{vet.phone}</span>
              <span><i className="bi bi-envelope-fill me-2"></i>{vet.email}</span>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Book Appointment */}
      <div className="section-header mb-3">
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Book an Appointment</h3>
        <p className="text-muted">Please select time to schedule your appointment. Emergency appointments available upon request.</p>
      </div>

      <Card className="p-4 mb-4" style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderRadius: '15px', border: 'none' }}>
        <h5 className="mb-3">Select a Day</h5>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '10px', marginBottom: '20px' }}>
          {weekDays.map((item) => (
            <div
              key={item.day}
              onClick={() => setSelectedDate(item.day)}
              style={{
                padding: '15px', textAlign: 'center', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.3s',
                border: selectedDate === item.day ? '2px solid #7CB342' : '2px solid #ddd',
                backgroundColor: selectedDate === item.day ? '#f0f8e8' : 'white'
              }}
            >
              <span style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '5px' }}>{item.label}</span>
              <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: '600', color: selectedDate === item.day ? '#7CB342' : '#333' }}>{item.day}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Button onClick={handleConfirmAppointment} style={{ backgroundColor: '#7CB342', border: 'none', padding: '12px 40px', borderRadius: '10px', fontWeight: '500', fontSize: '1rem' }}>
            Confirm Appointment
          </Button>
        </div>
      </Card>

      {/* Map */}
      <div className="section-header mb-3">
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Clinic Location</h3>
      </div>
      <div style={{ height: '300px', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', marginBottom: '16px' }}>
        <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1&bbox=51.5&layer=mapnik" title="Clinic Location Map" style={{ width: '100%', height: '100%', border: 'none' }} />
      </div>
      <p className="text-muted mb-4">
        <small><i className="bi bi-geo-alt-fill me-2"></i>123 Pet Care Road, {vet.location}, Block #12, Floor 3rd, Office 8</small>
      </p>

      {/* Reviews */}
      <div className="section-header mb-3">
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Patient Reviews</h3>
      </div>

      {/* Add Review Form */}
      <Card className="mb-3 p-4" style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderRadius: '15px', border: 'none' }}>
        <div className="d-flex align-items-center gap-2 mb-3">
          {/* ✅ avatar اليوزر */}
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#7CB342', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '1rem', flexShrink: 0 }}>
            {getCurrentUserName().charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{getCurrentUserName()}</div>
            <div style={{ fontSize: '0.8rem', color: '#999' }}>Writing as yourself</div>
          </div>
        </div>

        <Form onSubmit={handleSubmitReview}>
          {/* ✅ star rating تفاعلي */}
          <div className="mb-3">
            <div style={{ display: 'flex', gap: '4px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setNewRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{ cursor: 'pointer', fontSize: '1.8rem', color: star <= (hoverRating || newRating) ? '#FFD700' : '#ddd', transition: 'color 0.15s' }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Share your experience..."
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{ borderRadius: '10px', border: '1px solid #ddd' }}
              required
            />
          </Form.Group>

          {reviewSubmitted && (
            <div className="alert alert-success py-2 mb-3" style={{ borderRadius: '10px' }}>
              ✅ Review submitted successfully!
            </div>
          )}

          <Button type="submit" style={{ backgroundColor: '#7CB342', border: 'none', padding: '10px 30px', borderRadius: '10px', fontWeight: '500' }}>
            Submit Review
          </Button>
        </Form>
      </Card>

      {/* Reviews List */}
      {allReviews.map((review, index) => (
        <Card key={index} className="mb-3 p-4" style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderRadius: '15px', border: 'none' }}>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div className="d-flex align-items-center gap-2">
              {/* ✅ avatar لكل reviewer */}
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7CB342', fontWeight: '600', fontSize: '0.95rem', flexShrink: 0 }}>
                {review.name.charAt(0)}
              </div>
              <div>
                <h6 className="mb-0" style={{ fontWeight: '600' }}>{review.name}</h6>
                <div style={{ color: '#FFD700', fontSize: '0.9rem' }}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
            </div>
            <span className="text-muted" style={{ fontSize: '0.85rem' }}>{review.date}</span>
          </div>
          <p className="mb-0" style={{ lineHeight: '1.6' }}>{review.comment}</p>
        </Card>
      ))}
    </Container>
  )
}