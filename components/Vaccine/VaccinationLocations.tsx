'use client'

import { useState } from 'react'
import { Container, Alert } from 'react-bootstrap'
import Link from 'next/link'
type Tab = 'animal' | 'human'

const ANIMAL_LOCATIONS = [
  {
    name: 'Port Said Veterinary Medicine Directorate',
    address: 'New Qabuti Area, South of the Governorate',
    phone: null,
    hours: null,
    note: 'Responsible for implementing vaccination campaigns against rabies for stray dogs under national initiatives (Ministry of Agriculture & General Organization for Veterinary Services — "Rabies-Free Egypt 2030").',
    services: 'Stray Animal Rabies Vaccination Campaigns',
  },
  {
    name: 'Pet Animal Hospital – Old Qabuti',
    address: 'Behind Al-Nour Housing',
    phone: null,
    hours: null,
    note: null,
    services: 'Animal Rabies Vaccination',
  },
  {
    name: 'Pet Animal Hospital – Port Fouad',
    address: 'Behind Port Fouad Secondary School for Girls',
    phone: null,
    hours: null,
    note: null,
    services: 'Animal Rabies Vaccination',
  },
]

const HUMAN_LOCATIONS = [
  {
    name: 'Port Said Health Affairs Directorate',
    address: 'Al-Nahda Street, off Mohamed Ali Street, El-Sharq District, Port Said',
    phone: null,
    hours: null,
    isInquiryOnly: true,
    note: 'Main authority for organizing health services. Use this to inquire about health centers providing human rabies vaccine (PEP). This is NOT a location for receiving the vaccine directly.',
    services: 'Inquiries & Referrals Only',
  },
  {
    name: 'Al-Hayah Hospital – Port Fouad',
    address: 'Al-Obour Housing, Port Fouad',
    phone: '0663400849',
    hours: null,
    isInquiryOnly: false,
    note: null,
    services: 'Emergency – Human Rabies Vaccine (PEP)',
  },
  {
    name: '30 June Hospital',
    address: 'Al-Ganoub District, First Axis of 30 June, Port Said',
    phone: '0663254111',
    hours: null,
    isInquiryOnly: false,
    note: 'Comprehensive government hospital within the General Authority for Healthcare. Also reachable via hotline 15344.',
    services: 'Emergency – Human Rabies Vaccine (PEP)',
  },
  {
    name: 'Al-Salam Hospital (formerly Al-Amiri Hospital)',
    address: 'Safeya Zaghloul Street (Eugina), El-Sharq District, Port Said',
    phone: null,
    hours: null,
    isInquiryOnly: false,
    note: null,
    services: 'Emergency – Human Rabies Vaccine (PEP)',
  },
  {
    name: 'Health Unit – Al-Manakh',
    address: 'Al-Manakh District, Port Said',
    phone: '15344',
    hours: null,
    isInquiryOnly: false,
    note: 'Ministry of Health affiliate. Call hotline 15344 to confirm services.',
    services: 'Primary Healthcare – PEP Inquiries',
  },
  {
    name: 'Health Unit – Al-Dawahi',
    address: 'Al-Dawahi District, Port Said',
    phone: '15344',
    hours: null,
    isInquiryOnly: false,
    note: 'Ministry of Health affiliate. Call hotline 15344 to confirm services.',
    services: 'Primary Healthcare – PEP Inquiries',
  },
]

function LocationCard({ loc, type }: { loc: typeof HUMAN_LOCATIONS[0] & { isInquiryOnly?: boolean }, type: Tab }) {
  const accentColor = type === 'animal' ? '#198754' : '#0d6efd'
  const lightBg = type === 'animal' ? '#f0fff4' : '#f0f4ff'

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e9ecef',
        borderLeft: `4px solid ${accentColor}`,
        borderRadius: '10px',
        padding: '18px 20px',
        boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
      }}
    >
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
        <div>
          <div className="fw-bold" style={{ fontSize: '1rem' }}>
            🏥 {loc.name}
          </div>
          <div className="text-muted small mt-1">📍 {loc.address}</div>
          {loc.phone && (
            <div className="small mt-1">📞 {loc.phone}</div>
          )}
          {loc.hours && (
            <div className="small mt-1">🕐 {loc.hours}</div>
          )}
          <div className="small mt-1">
            <span
              style={{
                background: lightBg,
                color: accentColor,
                borderRadius: '6px',
                padding: '2px 8px',
                fontWeight: 500,
              }}
            >
              🩺 {loc.services}
            </span>
          </div>
        </div>
      </div>

      {loc.note && (
        <div
          className="small text-muted mt-2"
          style={{
            background: '#f8f9fa',
            borderRadius: '6px',
            padding: '8px 10px',
          }}
        >
          ℹ️ {loc.note}
        </div>
      )}

      {'isInquiryOnly' in loc && loc.isInquiryOnly ? null : (
        <div className="d-flex gap-2 mt-3">
          {loc.phone && (
            <a
              href={`tel:${loc.phone}`}
              style={{
                background: type === 'animal' ? '#198754' : '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 18px',
                fontWeight: 600,
                fontSize: '0.875rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'filter 0.15s',
              }}
              onMouseOver={e => (e.currentTarget.style.filter = 'brightness(0.88)')}
              onMouseOut={e => (e.currentTarget.style.filter = 'none')}
            >
              📞 Call Now
            </a>
          )}
          <button
            style={{
              background: '#fff',
              color: '#333',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              padding: '8px 18px',
              fontWeight: 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
            onClick={() => alert('Map view coming soon')}
          >
            🗺 View on Map
          </button>
        </div>
      )}
    </div>
  )
}

export default function VaccinationLocations() {
  const [activeTab, setActiveTab] = useState<Tab>('animal')

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