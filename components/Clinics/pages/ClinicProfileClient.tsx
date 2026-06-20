
'use client'

import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap'
import { Appointment } from '../components/Appointment'
import { useDoctorProfile, getImageSrc, getCurrentUserName, parseWorkingDays } from '../hooks/useDoctorProfile'

export default function DoctorProfileClient() {
  const {
    clinic,
    loading,
    error,
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



<div
  style={{
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 28,
    height: 200,
    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
  }}
>
    <img
    src="/map.svg"
    alt="map"
    style={{
      position: 'absolute',
      right: 0,
      top: 0,
      height: '90%',
      width: '25%',        
      objectFit: 'cover',
      objectPosition: '50% 50%',
    }}
  />

  {/* Gradient overlay */}
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, rgba(61, 61, 61, 0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
    }}
  />
  {/* Text */}
  <div
    style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 28px',
    }}
  >
  <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: 6 }}>
  🏥 Find Your Nearest Clinic
</div>
<div style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.82rem', maxWidth: 300, lineHeight: 1.6 }}>
  Verified clinics near to you.
</div>
  </div>
</div>
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

    </Container>
  )
}