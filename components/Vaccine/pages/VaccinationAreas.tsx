'use client'

import { Container, Badge } from 'react-bootstrap'
import { useVaccAreas } from '../hooks/useVaccAreas'

export default function VaccinationAreas() {


  const {selectedGov,
setSelectedGov,
selected,
PORT_SAID_DISTRICTS,
GOVERNORATES} = useVaccAreas();

  return (
    <Container className="py-5" style={{ maxWidth: '860px' }}>
      <h2 className="mb-1">Areas Where Vaccination Has Been Conducted</h2>
      <p className="text-muted mb-1">
        Rabies vaccination campaigns for stray animals across Egyptian governorates.
      </p>
      <p className="text-muted small mb-4">
        Source: Port Said Veterinary Medicine Directorate · Updated 2025/2026
      </p>

      {/* Governorate Icon Selector */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        {GOVERNORATES.map(gov => (
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

      {/* Content Area */}
      {selected?.hasData ? (
        <div>
          <h5 className="mb-3 fw-semibold text-success">
            ✅ {selected.name} — Vaccinated Districts
          </h5>
          <div className="d-flex flex-column gap-3">
            {PORT_SAID_DISTRICTS.map((district, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  border: '1px solid #e9ecef',
                  borderLeft: '4px solid #198754',
                  borderRadius: '10px',
                  padding: '14px 18px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                }}
              >
                <div className="d-flex align-items-start gap-3">
                  <span style={{ fontSize: '1.5rem' }}>{district.icon}</span>
                  <div>
                    <div className="fw-semibold">{district.name}</div>
                    <div className="text-muted small mt-1">{district.campaign}</div>
                  </div>
                  <Badge bg="success" className="ms-auto" style={{ whiteSpace: 'nowrap' }}>Vaccinated</Badge>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted small mt-3">
            * Data reflects campaigns conducted as part of the national "Egypt Free of Rabies" initiative.
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
          <h6 className="fw-semibold">No data available yet for {selected?.name}</h6>
          <p className="mb-0 small">Campaign records for this governorate will be added once available.</p>
        </div>
      )}
    </Container>
  )
}