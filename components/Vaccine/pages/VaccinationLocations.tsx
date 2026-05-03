
'use client'

import { Container, Alert, Spinner } from 'react-bootstrap'
import { useRouter, usePathname } from 'next/navigation'
import { useVaccLocations } from '../hooks/useVaccLocations'
import LocationCard from '../components/Cards/LocationCard'

export default function VaccinationLocations() {
  const router = useRouter()
  const pathname = usePathname()
  
  const {
    activeTab,
    setActiveTab,
    animalLocations,
    humanLocations,
    loading,
    error,
  } = useVaccLocations()

  const handleTabChange = (tab: 'animal' | 'human') => {
    setActiveTab(tab)
  }

  const goToAreasPage = () => {
    router.push('/main/VaccinationAreas')
  }

  return (
    <Container className="py-5" style={{ maxWidth: '860px' }}>
      <h2 className="mb-1">Locations Where Vaccinations Are Available</h2>
      <p className="text-muted mb-4">Port Said Governorate · Updated 2025/2026</p>

      <Alert variant="warning" className="mb-4">
        <strong>⚠️ Before you go:</strong> Call the hospital or health office first to confirm
        the availability of the rabies vaccine or Rabies Immunoglobulin (RIG) to avoid
        unnecessary travel. Go to the emergency department immediately if you have been
        bitten or scratched.
      </Alert>

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
    src="/hospital2.svg"
    alt="Emergency bite report"
    style={{
      position: 'absolute',
      right: 0,
      top: 0,
      height: '100%',
      width: '30%',        // 👈 تاخد نص الـ container
      objectFit: 'cover',
      objectPosition: 'left 100%',
    }}
  />

  {/* Gradient overlay */}
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, rgba(220,53,69,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
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
  🏥 Find Your Nearest Vaccination Center
</div>
<div style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.82rem', maxWidth: 300, lineHeight: 1.6 }}>
  Verified clinics and hospitals offering rabies vaccines near you.
</div>
  </div>
</div>

      {/* ── Tab Selector ── */}
      <div className="d-flex gap-3 mb-4 flex-wrap">
        {/* Animal Tab */}
        <button
          onClick={() => handleTabChange('animal')}
          style={{
            border: 'none',
            borderRadius: '50px',
            padding: '10px 24px',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
            background: activeTab === 'animal' ? '#198754' : '#e9ecef',
            color: activeTab === 'animal' ? '#fff' : '#555',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s',
          }}
        >
          <span style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: activeTab === 'animal' ? '#fff' : '#198754',
            display: 'inline-block',
          }} />
          🐕 Prevention of Animal Rabies
        </button>

        {/* Human Tab */}
        <button
          onClick={() => handleTabChange('human')}
          style={{
            border: 'none',
            borderRadius: '50px',
            padding: '10px 24px',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
            background: activeTab === 'human' ? '#0d6efd' : '#e9ecef',
            color: activeTab === 'human' ? '#fff' : '#555',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s',
          }}
        >
          <span style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: activeTab === 'human' ? '#fff' : '#0d6efd',
            display: 'inline-block',
          }} />
          👨‍⚕️ Prevention of Human Rabies
        </button>

        {/* Areas Link - using button instead of Link for better control */}
        <button
          onClick={goToAreasPage}
          style={{
            border: 'none',
            borderRadius: '50px',
            padding: '10px 24px',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
            background: '#e9ecef',
            color: '#555',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#dee2e6'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#e9ecef'
          }}
        >
          <span style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#6c757d',
            display: 'inline-block',
          }} />
          📋 Areas Where Vaccination Conducted
        </button>
      </div>

      {/* ── Content ── */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div className="d-flex flex-column gap-3">
          {activeTab === 'animal' ? (
            animalLocations.length > 0 ? (
              <>
                <div className="text-muted small mb-2">
                  🏥 Showing {animalLocations.length} animal vaccination {animalLocations.length === 1 ? 'location' : 'locations'}
                </div>
                {animalLocations.map(loc => (
                  <LocationCard key={loc.id} loc={loc} type="animal" />
                ))}
              </>
            ) : (
              <div className="text-center py-5">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🐕</div>
                <p className="text-muted">No animal vaccination locations found.</p>
                <p className="text-muted small">
                  Check back later or contact the Veterinary Medicine Directorate.
                </p>
              </div>
            )
          ) : (
            humanLocations.length > 0 ? (
              <>
                <div className="text-muted small mb-2">
                  🏥 Showing {humanLocations.length} human vaccination {humanLocations.length === 1 ? 'location' : 'locations'}
                </div>
                {humanLocations.map(loc => (
                  <LocationCard key={loc.id} loc={loc} type="human" />
                ))}
              </>
            ) : (
              <div className="text-center py-5">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍⚕️</div>
                <p className="text-muted">No human vaccination locations found.</p>
                <p className="text-muted small">
                  Call 15344 for inquiries about nearest health facilities.
                </p>
              </div>
            )
          )}
        </div>
      )}

      {/* ── Footer notes ── */}
      {!loading && activeTab === 'human' && (
        <div className="mt-4 p-3 bg-light rounded" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="text-muted small">
            <strong>📞 Hotline for booking and inquiries:</strong>
            <br />
            Call <strong style={{ fontSize: '1.1rem' }}>15344</strong> - General Authority for Healthcare
            <br />
            <span className="text-muted">For inquiries about Family Health Units and vaccination services.</span>
          </div>
        </div>
      )}
      
      {!loading && activeTab === 'animal' && (
        <p className="text-muted small mt-4">
          * Contact information for these entities is currently being updated.
          <br />
          For emergency animal bites, contact the nearest veterinary clinic immediately.
        </p>
      )}

      {/* ── Map Button ── */}
      <div className="mt-4 text-center">
        <button
          style={{
            background: '#fff',
            border: '1.5px solid #dee2e6',
            borderRadius: '10px',
            padding: '10px 28px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f8f9fa'
            e.currentTarget.style.borderColor = '#198754'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff'
            e.currentTarget.style.borderColor = '#dee2e6'
          }}
          onClick={() => alert('Map view coming soon')}
        >
          🗺️ View All Locations on Map
        </button>
      </div>
    </Container>
  )
}