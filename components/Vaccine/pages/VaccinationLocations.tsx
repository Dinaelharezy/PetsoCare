'use client'


import { Container, Alert } from 'react-bootstrap'
import Link from 'next/link'
import { useVaccLocations } from '../hooks/useVaccLocations'
import LocationCard from '../components/Cards/LocationCard'

export default function VaccinationLocations() {
  const {
    activeTab, setActiveTab,
    ANIMAL_LOCATIONS,
    HUMAN_LOCATIONS} = useVaccLocations();

  return (
    <Container className="py-5" style={{ maxWidth: '860px' }}>
      <h2 className="mb-1">Locations Where Vaccinations Are Available</h2>
      <p className="text-muted mb-4">Port Said Governorate · Updated 2025/2026</p>

      <Alert variant="warning" className="mb-4">
        <strong>⚠️ Before you go:</strong> Call the hospital or health office first to confirm the availability of the rabies vaccine or Rabies Immunoglobulin (RIG) to avoid unnecessary travel. Go to the emergency department immediately if you have been bitten or scratched.
      </Alert>

      {/* Tab Selector */}
      <div className="d-flex gap-3 mb-4">
        <button
          onClick={() => setActiveTab('animal')}
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
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: activeTab === 'animal' ? '#fff' : '#198754',
              display: 'inline-block',
            }}
          />
          Prevention of Animal Rabies
        </button>
        <button
          onClick={() => setActiveTab('human')}
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
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: activeTab === 'human' ? '#fff' : '#0d6efd',
              display: 'inline-block',
            }}
          />
          Prevention of Human Rabies
        </button>
        <Link
        href='/main/VaccinationAreas'
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
            textDecoration:'none'
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: activeTab === 'human' ? '#fff' : '#0d6efd',
              display: 'inline-block',
            }}
          />
          Areas Where Vaccination conducted
        </Link>
        
      </div>

      {/* Location Cards */}
      <div className="d-flex flex-column gap-3">
        {activeTab === 'animal'
          ? ANIMAL_LOCATIONS.map((loc, i) => (
              <LocationCard key={i} loc={loc as any} type="animal" />
            ))
          : HUMAN_LOCATIONS.map((loc, i) => (
              <LocationCard key={i} loc={loc} type="human" />
            ))}
      </div>

      {activeTab === 'human' && (
        <div className="mt-3 text-muted small">
          📞 Hotline for booking and inquiries about Family Health Units: <strong>15344</strong> (General Authority for Healthcare)
        </div>
      )}

      {activeTab === 'animal' && (
        <p className="text-muted small mt-3">
          * Contact information for these entities is currently being updated.
        </p>
      )}



      <div className="mt-4 text-center">
        <button
          style={{
            background: '#fff',
            border: '1.5px solid #dee2e6',
            borderRadius: '10px',
            padding: '10px 28px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
          onClick={() => alert('Map view coming soon')}
        >
          🗺 View All Cases on the Map
        </button>
      </div>
    </Container>
  )
}