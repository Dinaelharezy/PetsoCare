
'use client'

import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap'
import { Appointment } from './Appointment'
import { useDoctorProfile, getImageSrc, getCurrentUserName, parseWorkingDays } from './hooks/useDoctorProfile'

export default function DoctorProfileClient() {
  const {
    clinic,
    loading,
    error,
    selectedDate,
    setSelectedDate,
    allReviews,
    newComment,
    setNewComment,
    newRating,
    setNewRating,
    hoverRating,
    setHoverRating,
    reviewSubmitted,
    handleSubmitReview,
    router,
  } = useDoctorProfile()

  const weekDays = parseWorkingDays(clinic?.workingDays)

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading clinic profile...</p>
      </Container>
    )
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error || !clinic) {
    return (
      <Container className="py-5 text-center">
        <h3 className="text-muted">{error || 'Clinic not found'}</h3>
        <button className="btn btn-primary mt-3" onClick={() => router.push('/main/Home')}>
          Back to Clinics
        </button>
      </Container>
    )
  }

  return (
    <Container className="py-5">

      {/* ── Clinic Profile ──────────────────────────────────────────────────── */}
      <Card className="doctor-card p-5 mb-4" style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderRadius: '15px', border: 'none' }}>
        <Row>
          <Col md={2}>
            <div style={{ width: '100%', height: '180px', borderRadius: '12px', overflow: 'hidden' }}>
              {getImageSrc(clinic.imageUrl) ? (
                <img
                  src={getImageSrc(clinic.imageUrl)!}
                  alt={clinic.name}
                  width={180}
                  height={180}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div className="d-flex align-items-center justify-content-center h-100 bg-light">
                  <i className="bi bi-building text-secondary" style={{ fontSize: '4rem' }}></i>
                </div>
              )}
            </div>
          </Col>

          <Col md={10}>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h2 className="mb-2">{clinic.name}</h2>
                {clinic.workingDays && (
                  <p className="text-muted mb-1">
                    <i className="bi bi-calendar3 me-2"></i>{clinic.workingDays}
                  </p>
                )}
                {clinic.workingHours && (
                  <p className="text-muted mb-0">
                    <i className="bi bi-clock me-2"></i>{clinic.workingHours}
                  </p>
                )}
              </div>
              <div className="text-end">
                {clinic.bookingPrice && (
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <i className="bi bi-cash text-success"></i>
                    <span><strong>{clinic.bookingPrice} EGP</strong> per visit</span>
                  </div>
                )}
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-geo-alt-fill text-success"></i>
                  <span>{clinic.governorate}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <span><i className="bi bi-telephone-fill me-2"></i>{clinic.phone}</span>
              {clinic.address && (
                <span><i className="bi bi-map me-2"></i>{clinic.address}</span>
              )}
              {clinic.facebookPage && (
                <a href={clinic.facebookPage} target="_blank" rel="noreferrer">
                  <i className="bi bi-facebook me-2"></i>Facebook Page
                </a>
              )}
            </div>
          </Col>
        </Row>
      </Card>

      {/* ── Book Appointment ────────────────────────────────────────────────── */}
      <Appointment />

      {/* ── Map ─────────────────────────────────────────────────────────────── */}
      <div className="section-header mb-3">
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Clinic Location</h3>
      </div>
      <div style={{ height: '300px', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', marginBottom: '16px' }}>
        {clinic.latitude && clinic.longitude ? (
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${clinic.longitude - 0.01},${clinic.latitude - 0.01},${clinic.longitude + 0.01},${clinic.latitude + 0.01}&layer=mapnik&marker=${clinic.latitude},${clinic.longitude}`}
            title="Clinic Location Map"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        ) : (
          <div className="d-flex align-items-center justify-content-center h-100 bg-light">
            <p className="text-muted">Location not available</p>
          </div>
        )}
      </div>
      <p className="text-muted mb-4">
        <small><i className="bi bi-geo-alt-fill me-2"></i>{clinic.address}, {clinic.governorate}</small>
      </p>

      {/* ── Reviews ─────────────────────────────────────────────────────────── */}
      <div className="section-header mb-3">
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Patient Reviews</h3>
      </div>

      {/* Add Review Form */}
      <Card className="mb-3 p-4" style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderRadius: '15px', border: 'none' }}>
        <div className="d-flex align-items-center gap-2 mb-3">
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#7CB342', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '1rem', flexShrink: 0 }}>
            {getCurrentUserName().charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{getCurrentUserName()}</div>
            <div style={{ fontSize: '0.8rem', color: '#999' }}>Writing as yourself</div>
          </div>
        </div>

        <Form onSubmit={handleSubmitReview}>
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

          <Button
            type="submit"
            style={{ backgroundColor: '#7CB342', border: 'none', padding: '10px 30px', borderRadius: '10px', fontWeight: '500' }}
          >
            Submit Review
          </Button>
        </Form>
      </Card>

      {/* Reviews List */}
      {allReviews.map((review, index) => (
        <Card key={index} className="mb-3 p-4" style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderRadius: '15px', border: 'none' }}>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div className="d-flex align-items-center gap-2">
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