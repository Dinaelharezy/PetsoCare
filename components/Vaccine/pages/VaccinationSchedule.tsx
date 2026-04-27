

'use client'
import { useVaccSchedule, EXPOSURE_CATEGORIES } from '../hooks/useVaccSchedule'
import { ScheduleCard } from '../components/Cards/ScheduleCard'
import Link from 'next/link'
import { Container, Alert, Badge, Table } from 'react-bootstrap'
// import NotificationBell from '../Notification/NotificationBell'

export default function VaccinationSchedule() {
  const {tab, setTab,visibleSchedules} = useVaccSchedule();
  return (
    <Container className="py-5" style={{ maxWidth: '860px' }}>

      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-2">
        <h2 className="mb-0">Vaccination Schedule</h2>
        <Link
          href="/main/VaccineLocations"
          style={{
            background: '#8ee570',
            color: '#fff',
            borderRadius: 8,
            padding: '9px 20px',
            fontWeight: 600,
            fontSize: '0.875rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap',
        
          }}
        >
          📍 Vaccination Locations
        </Link>
      </div>

      <p className="text-muted mb-4 small">
        Pre-Exposure & Post-Exposure Rabies Vaccination Plans · Follow the schedule precisely to ensure full protection.
      </p>

      {/* Critical Alert */}
      <Alert variant="danger" className="mb-4 fw-semibold">
        ⚠️ <strong>Important Alert:</strong> Once rabies symptoms appear, there is no effective treatment. Start vaccination immediately after exposure.
      </Alert>

      {/* Tab switcher */}
      <div className="d-flex gap-3 mb-4">
        <button
          onClick={() => setTab('human')}
          style={{
            border: 'none',
            borderRadius: '50px',
            padding: '10px 24px',
            fontWeight: 600,
            cursor: 'pointer',
            background: tab === 'human' ? '#0d6efd' : '#e9ecef',
            color: tab === 'human' ? '#fff' : '#555',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s',
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: tab === 'human' ? '#fff' : '#0d6efd', display: 'inline-block' }} />
          Prevention of Human Rabies
        </button>
        <button
          onClick={() => setTab('animal')}
          style={{
            border: 'none',
            borderRadius: '50px',
            padding: '10px 24px',
            fontWeight: 600,
            cursor: 'pointer',
            background: tab === 'animal' ? '#198754' : '#e9ecef',
            color: tab === 'animal' ? '#fff' : '#555',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s',
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: tab === 'animal' ? '#fff' : '#198754', display: 'inline-block' }} />
          Prevention of Animal Rabies
        </button>
      </div>

      {/* Human tab */}
      {tab === 'human' && (
        <>
          <div
            style={{
              background: '#fff8e1',
              border: '1px solid #ffe082',
              borderRadius: 10,
              padding: '16px 20px',
              marginBottom: 20,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 8 }}>🚨 Immediate Actions After a Bite</div>
            <ol style={{ margin: 0, paddingLeft: 20, fontSize: '0.9rem' }}>
              <li>Wash the wound immediately with soap and water for <strong>15 minutes</strong>.</li>
              <li>Apply a disinfectant if available.</li>
              <li><strong>Go immediately</strong> to the nearest hospital to start vaccination.</li>
            </ol>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h5 className="fw-semibold mb-3">Exposure Categories & Recommended Actions</h5>
            <div className="d-flex flex-column gap-3">
              {EXPOSURE_CATEGORIES.map((cat, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    border: `1.5px solid ${cat.color}22`,
                    borderLeft: `4px solid ${cat.color}`,
                    borderRadius: 10,
                    padding: '14px 18px',
                  }}
                >
                  <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                    <Badge style={{ background: cat.color, fontSize: '0.8rem' }}>{cat.cat}</Badge>
                    {cat.vaccine && <Badge bg="primary" style={{ fontSize: '0.75rem' }}>💉 Vaccine Required</Badge>}
                    {cat.rig && <Badge bg="danger" style={{ fontSize: '0.75rem' }}>🩸 RIG Required</Badge>}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#444', marginBottom: 6 }}>
                    <strong>Exposure:</strong> {cat.exposure}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#198754', fontWeight: 500 }}>
                    ✅ {cat.action}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: '#fff0f0',
                border: '1px solid #ffc9c9',
                borderRadius: 8,
                padding: '12px 16px',
                marginTop: 12,
                fontSize: '0.83rem',
                color: '#555',
              }}
            >
              <strong>Rabies Immunoglobulin (RIG):</strong> Administered once on Day 0 for unvaccinated individuals with Category III exposure. RIG should be infiltrated into and around the wound. If not given on Day 0, it can still be given up to Day 7. RIG is NOT given again even if a new bite occurs.
            </div>
          </div>
        </>
      )}

      {/* Animal tab */}
      {tab === 'animal' && (
        <div
          style={{
            background: '#f0fff4',
            border: '1px solid #b2dfdb',
            borderRadius: 10,
            padding: '16px 20px',
            marginBottom: 20,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🐾 Pet Vaccination Guidelines</div>
          <Table bordered size="sm" style={{ fontSize: '0.875rem', background: '#fff' }}>
            <thead style={{ background: '#d1fae5' }}>
              <tr>
                <th>Animal</th>
                <th>Recommended Age for First Dose</th>
                <th>Vaccination Frequency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>🐕 Dog</td>
                <td>From 3 months to 1 year</td>
                <td>Every 1–3 years</td>
              </tr>
              <tr>
                <td>🐈 Cat</td>
                <td>From 3 months to 1 year</td>
                <td>Every 1–3 years</td>
              </tr>
            </tbody>
          </Table>
          <div style={{ fontSize: '0.82rem', color: '#555', marginTop: 8 }}>
            <strong>If your pet is bitten by a suspected rabid animal:</strong>
            <ul style={{ marginTop: 4, marginBottom: 0 }}>
              <li><em>Unvaccinated:</em> Humane euthanasia may be recommended if rabies is confirmed. Otherwise quarantine and observe for 6 months.</li>
              <li><em>Vaccinated (within immunity period):</em> Administer a booster dose and quarantine/observe for approximately 60 days.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Schedule Cards */}
      <h5 className="fw-semibold mb-3">
        {tab === 'human' ? 'Vaccination Schedules' : 'Animal Vaccination Schedule'}
      </h5>
      <div className="d-flex flex-column gap-3">
        {visibleSchedules.map(schedule => (
          <ScheduleCard key={schedule.id} schedule={schedule} />
        ))}
      </div>

      {/* Previously vaccinated */}
      {tab === 'human' && (
        <div
          style={{
            background: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: 10,
            padding: '16px 20px',
            marginTop: 20,
            fontSize: '0.85rem',
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🔄 Previously Vaccinated?</div>
          <p className="mb-1"><strong>If full course was within last 3 months:</strong> Clean and disinfect the wound. Usually no new course required (physician evaluation).</p>
          <p className="mb-1"><strong>If more than 3 months since last full course:</strong> Clean the wound + 2 IM doses on Day 0 and Day 3. RIG is NOT given in this case.</p>
          <p className="mb-0 text-muted small">* Full PEP course may be needed again for individuals who received vaccines of uncertain efficacy, or those with immunodeficiency (HIV/AIDS), per physician evaluation.</p>
        </div>
      )}

      {/* August 2025 updates */}
      {tab === 'human' && (
        <div
          style={{
            background: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: 10,
            padding: '16px 20px',
            marginTop: 16,
            fontSize: '0.83rem',
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8 }}>📢 Key Updates — August 2025 (Egypt Ministry of Health)</div>
          <ol style={{ paddingLeft: 18, margin: 0, color: '#555' }}>
            <li>Saliva samples for suspected cases: collected 3 times within 24 hours.</li>
            <li>Mass bite incidents must be reported from 3 cases or more.</li>
            <li>PEP updated to <strong>4 doses</strong> (0, 3, 7, 14 days) instead of 5.</li>
            <li>If a dose is missed, complete remaining doses regardless of delay.</li>
            <li>Immunocompromised patients require a 5th dose on Day 28 with proof of condition.</li>
          </ol>
        </div>
      )}

    </Container>
  )
}