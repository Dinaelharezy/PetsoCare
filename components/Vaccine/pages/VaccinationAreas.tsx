
// app/main/VaccinationAreas/page.tsx
'use client'

import { Container, Badge, Spinner, Alert } from 'react-bootstrap'
import { useVaccAreas } from '../hooks/useVaccAreas'
import { SERVICE_TYPE_LABELS } from '../../../types/VaccLocation'

export default function VaccinationAreas() {
  const {
    governorates,
    selectedGov,        // ✅ أضف selectedGov
    setSelectedGov,     // ✅ استخدم الاسم الأصلي
    areas,              // ✅ areas دي اللي فيها filteredAreas
    loading,
    error,
  } = useVaccAreas()

  return (
    <Container className="py-5" style={{ maxWidth: '860px' }}>
      <h2 className="mb-1">Areas Where Vaccination Has Been Conducted</h2>
      <p className="text-muted mb-1">
        Completed rabies vaccination campaigns for stray animals.
      </p>
      <p className="text-muted small mb-4">
        Source: Port Said Veterinary Medicine Directorate · Updated 2025/2026
      </p>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Governorate Selector */}
      {loading ? (
        <div className="text-center py-3">
          <Spinner animation="border" variant="success" size="sm" />
        </div>
      ) : (
        <>
          <div className="d-flex flex-wrap gap-3 mb-4">
            {governorates.map(gov => (
              <button
                key={gov.id}
                onClick={() => setSelectedGov(gov.id)}
                style={{
                  border: selectedGov === gov.id ? '2.5px solid #198754' : '2px solid #dee2e6',
                  borderRadius: '10px',
                  padding: '14px 28px',
                  background: selectedGov === gov.id ? '#f0fff4' : '#fff',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: selectedGov === gov.id ? '#198754' : '#333',
                  boxShadow: selectedGov === gov.id ? '0 2px 8px rgba(25,135,84,0.15)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {gov.name}
              </button>
            ))}
          </div>
          
          {governorates.length === 0 && (
            <p className="text-muted text-center">No completed campaigns available yet.</p>
          )}
        </>
      )}

      {/* Areas List - تعرض المناطق اللي isActive = false */}
      {!loading && selectedGov && (
        areas.length > 0 ? (
          <div>
            <h5 className="mb-3 fw-semibold text-success">
              ✅ {selectedGov} — Vaccinated Districts (Completed Campaigns)
            </h5>
            <div className="d-flex flex-column gap-3">
              {/* {areas.map(loc => (
                <div
                  key={loc.id}
                  style={{
                    background: '#fff',
                    border: '1px solid #e9ecef',
                    borderLeft: '4px solid #dc3545',
                    borderRadius: '10px',
                    padding: '14px 18px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <div className="d-flex align-items-start gap-3">
                    <span style={{ fontSize: '1.5rem' }}>✅</span>
                    <div className="flex-grow-1">
                      <div className="fw-semibold">{loc.name}</div>
                      {loc.address && (
                        <div className="text-muted small mt-1">📍 {loc.address}</div>
                      )}
                      {loc.note && (
                        <div className="text-muted small mt-1">{loc.note}</div>
                      )}
                      <div className="text-muted small mt-1">
                        {SERVICE_TYPE_LABELS[loc.serviceType] ?? 'Campaign completed'}
                      </div>
                    </div>
                    <Badge bg="secondary" className="ms-auto" style={{ whiteSpace: 'nowrap' }}>
                      Campaign Completed
                    </Badge>
                  </div>
                </div>
              ))} */}


{areas.map(loc => {
  
  const isCompleted = (loc as any).status === "false" || loc.isActive === false
  
  return (
    <div
      key={loc.id}
      style={{
        background: '#fff',
        border: '1px solid #e9ecef',
        borderLeft: `4px solid ${isCompleted ? '#dc3545' : '#28a745'}`,
        borderRadius: '10px',
        padding: '14px 18px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      <div className="d-flex align-items-start gap-3">
        <span style={{ fontSize: '1.5rem' }}>✅</span>
        <div className="flex-grow-1">
          <div className="fw-semibold">{loc.name}</div>
          {/* <div className="fw-semibold">{loc.status}</div> */}
          <div className="fw-semibold">{loc.phone}</div>
          {loc.address && (
            <div className="text-muted small mt-1">📍 {loc.address}</div>
          )}
          {loc.governorate && (
            <div className="text-muted small mt-1">{loc.governorate}</div>
          )}
          <div className="text-muted small mt-1">
            {SERVICE_TYPE_LABELS[loc.serviceType] ?? 'Campaign completed'}
          </div>
        </div>
        <Badge bg={isCompleted ? "secondary" : "success"} className="ms-auto" style={{ whiteSpace: 'nowrap' }}>
          {isCompleted ? "Campaign Completed" : "Active"}
        </Badge>
      </div>
    </div>
  )
})}
            </div>
            <p className="text-muted small mt-3">
              * These campaigns have been completed. For active vaccination locations, please check the "Locations" tab.
            </p>
          </div>
        ) : (
          <div
            style={{
              background: '#f8f9fa',
              border: '2px dashed #dee2e6',
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center',
              color: '#6c757d',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📋</div>
            <h6 className="fw-semibold">No completed campaigns for {selectedGov}</h6>
            <p className="mb-0 small">
              All campaigns in this governorate are currently active.
            </p>
          </div>
        )
      )}
    </Container>
  )
}