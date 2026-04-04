

'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Container, Alert, Badge, Table } from 'react-bootstrap'

// ─── Types ────────────────────────────────────────────────────────────────────
interface DoseDay {
  day: number | string
  label: string
  note?: string
}

interface Schedule {
  id: string
  title: string
  subtitle?: string
  type: 'human' | 'animal'
  doses: DoseDay[]
  notes?: string[]
}

// ─── All Schedules ────────────────────────────────────────────────────────────
const SCHEDULES: Schedule[] = [
  {
    id: 'prep-who',
    title: 'Pre-Exposure (PrEP) — WHO Protocol',
    subtitle: 'For individuals at risk: veterinarians, lab workers, animal handlers, children in endemic areas, travelers',
    type: 'human',
    doses: [
      { day: 0, label: 'Day 0', note: 'First dose' },
      { day: 7, label: 'Day 7', note: 'Second dose' },
      { day: 28, label: 'Day 21 or 28', note: 'Third dose' },
    ],
    notes: [
      'Inject into the deltoid muscle for adults; anterolateral thigh for young children.',
      'Avoid the gluteal region.',
    ],
  },
  {
    id: 'pep-who-5dose',
    title: 'Post-Exposure (PEP) 5-Dose — WHO Protocol',
    subtitle: 'Most common protocol. Used when bitten/scratched by a suspected rabid animal.',
    type: 'human',
    doses: [
      { day: 0, label: 'Day 0', note: 'First dose (+ RIG if Category III)' },
      { day: 3, label: 'Day 3', note: 'Second dose' },
      { day: 7, label: 'Day 7', note: 'Third dose' },
      { day: 14, label: 'Day 14', note: 'Fourth dose' },
      { day: 28, label: 'Day 28', note: 'Fifth dose' },
      { day: 90, label: 'Day 90', note: 'Booster (physician evaluation)' },
    ],
    notes: [
      'Day 0 = the day of exposure (bite).',
      'Inject into deltoid muscle (adults & children ≥2 years), or anterolateral thigh (younger children).',
      'Gluteal region is contraindicated.',
    ],
  },
  {
    id: 'pep-who-4dose',
    title: 'Post-Exposure (PEP) 4-Dose — WHO Protocol',
    subtitle: 'Alternative protocol (used in some settings).',
    type: 'human',
    doses: [
      { day: 0, label: 'Day 0', note: 'Two doses (right arm + left arm)' },
      { day: 7, label: 'Day 7', note: 'One dose' },
      { day: 28, label: 'Day 21 or 28', note: 'One dose' },
      { day: 90, label: 'Day 90', note: 'Booster (physician evaluation)' },
    ],
    notes: [
      'Schedule is determined by physician instructions and approved protocol.',
      'Booster after Day 90 may be required depending on risk level and antibody testing.',
    ],
  },
  {
    id: 'pep-egypt-domestic',
    title: 'PEP — Egypt Protocol (Domestic/Observable Animal)',
    subtitle: 'Egyptian Ministry of Health — For bites from domestic animals that can be observed for 10 days.',
    type: 'human',
    doses: [
      { day: 0, label: 'Day 0', note: 'First dose' },
      { day: 3, label: 'Day 3', note: 'Second dose' },
      { day: 7, label: 'Day 7', note: 'Third dose — discontinued if no behavioral changes on Day 10' },
    ],
    notes: [
      'Animal must be domestic/known and available for observation.',
      'Observe the animal for 10 days from the bite date.',
      'If no behavioral changes appear in the animal, discontinue vaccination at the end of Day 10.',
    ],
  },
  {
    id: 'pep-egypt-stray',
    title: 'PEP — Egypt Protocol (Stray/Unobservable Animal)',
    subtitle: 'Egyptian Ministry of Health — For bites from stray animals that cannot be observed. Updated August 2025.',
    type: 'human',
    doses: [
      { day: 0, label: 'Day 0', note: 'First dose' },
      { day: 3, label: 'Day 3', note: 'Second dose' },
      { day: 7, label: 'Day 7', note: 'Third dose' },
      { day: 14, label: 'Day 14', note: 'Fourth dose' },
    ],
    notes: [
      'For immunocompromised individuals: a fifth dose should be given on Day 28.',
      'Proof of immunodeficiency is required for the fifth dose.',
      'August 2025 update: PEP doses updated to 4 doses (0, 3, 7, 14) instead of 5.',
      'If a dose is missed, complete remaining doses regardless of delay.',
    ],
  },
  {
    id: 'animal-vaccine',
    title: 'Animal Vaccination Schedule (Dogs & Cats)',
    subtitle: 'Annual rabies vaccination for owned pets.',
    type: 'animal',
    doses: [],
    notes: [
      'Dogs: First dose from 3 months to 1 year of age; repeat every 1–3 years.',
      'Cats: First dose from 3 months to 1 year of age; repeat every 1–3 years.',
      'Dogs must be muzzled and kept on a leash per regulatory requirements.',
    ],
  },
]

// ─── Exposure Categories ───────────────────────────────────────────────────
const EXPOSURE_CATEGORIES = [
  {
    cat: 'Category I',
    color: '#198754',
    exposure: 'Touching or feeding the animal, or the animal licking intact (unbroken) skin',
    action: 'Wash the exposed skin thoroughly. No further prophylaxis is required.',
    vaccine: false,
    rig: false,
  },
  {
    cat: 'Category II',
    color: '#fd7e14',
    exposure: 'Minor bites on exposed skin, or minor scratches or abrasions without bleeding',
    action: 'Wash the wound thoroughly and administer the vaccine immediately.',
    vaccine: true,
    rig: false,
  },
  {
    cat: 'Category III',
    color: '#dc3545',
    exposure: 'Single or multiple bites/scratches penetrating the skin; contamination of mucous membranes or broken skin with animal saliva; licking of broken skin; direct bat exposure',
    action: 'Wash the wound thoroughly, administer rabies vaccine immediately, and give Rabies Immunoglobulin (RIG).',
    vaccine: true,
    rig: true,
  },
]

// ─── Timeline Component ────────────────────────────────────────────────────
function VaccineTimeline({ schedule }: { schedule: Schedule }) {
  const [takenDoses, setTakenDoses] = useState<number[]>([])
  const [startDate, setStartDate] = useState<string>('')

  if (schedule.id === 'animal-vaccine') return null

  const toggleDose = (index: number) => {
    setTakenDoses(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const nextDoseIndex = schedule.doses.findIndex((_, i) => !takenDoses.includes(i))

  const getDoseDate = (dayNum: number | string) => {
    if (!startDate || typeof dayNum !== 'number') return null
    const d = new Date(startDate)
    d.setDate(d.getDate() + dayNum)
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="mt-3">
      <div className="mb-3">
        <label className="form-label small fw-semibold">
          📅 Set Day 0 (Exposure / Start Date):
        </label>
        <input
          type="date"
          className="form-control"
          style={{ maxWidth: 220 }}
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            minWidth: schedule.doses.length * 110,
            padding: '8px 0 16px',
          }}
        >
          {schedule.doses.map((dose, i) => {
            const taken = takenDoses.includes(i)
            const isCurrent = i === nextDoseIndex
            const doseDate = getDoseDate(dose.day)
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90 }}>
                  <button
                    onClick={() => toggleDose(i)}
                    title={taken ? 'Click to undo' : 'Click to mark as taken'}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      border: taken ? '3px solid #198754' : isCurrent ? '3px solid #0d6efd' : '2px solid #ccc',
                      background: taken ? '#198754' : isCurrent ? '#e7f1ff' : '#f8f9fa',
                      color: taken ? '#fff' : isCurrent ? '#0d6efd' : '#999',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isCurrent ? '0 0 0 4px rgba(13,110,253,0.15)' : 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    {taken ? '✓' : i + 1}
                  </button>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, marginTop: 6, color: taken ? '#198754' : isCurrent ? '#0d6efd' : '#666' }}>
                    {dose.label}
                  </div>
                  {doseDate && (
                    <div style={{ fontSize: '0.65rem', color: '#888', marginTop: 2 }}>{doseDate}</div>
                  )}
                  <div style={{ fontSize: '0.62rem', color: '#aaa', marginTop: 2, textAlign: 'center', maxWidth: 88 }}>
                    {dose.note}
                  </div>
                </div>
                {i < schedule.doses.length - 1 && (
                  <div style={{ flex: 1, height: 2, background: takenDoses.includes(i) ? '#198754' : '#dee2e6', minWidth: 16 }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {nextDoseIndex >= 0 && startDate && typeof schedule.doses[nextDoseIndex].day === 'number' && (
        <div
          style={{
            background: '#e7f1ff',
            borderRadius: 8,
            padding: '10px 16px',
            display: 'inline-block',
            marginTop: 4,
            fontSize: '0.9rem',
            color: '#0d6efd',
            fontWeight: 500,
          }}
        >
          🕐 Next dose ({schedule.doses[nextDoseIndex].label}){' '}
          {getDoseDate(schedule.doses[nextDoseIndex].day)
            ? `on ${getDoseDate(schedule.doses[nextDoseIndex].day)}`
            : ''}
        </div>
      )}

      {takenDoses.length === schedule.doses.length && (
        <div
          style={{
            background: '#d1fae5',
            borderRadius: 8,
            padding: '10px 16px',
            marginTop: 8,
            color: '#065f46',
            fontWeight: 600,
          }}
        >
          ✅ All doses recorded. Course complete!
        </div>
      )}

      {nextDoseIndex >= 0 && (
        <button
          onClick={() => toggleDose(nextDoseIndex)}
          style={{
            background: '#198754',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '9px 22px',
            fontWeight: 600,
            cursor: 'pointer',
            marginTop: 12,
            display: 'block',
          }}
        >
          💉 Record My Dose Now (Dose {nextDoseIndex + 1})
        </button>
      )}
    </div>
  )
}

// ─── Schedule Card ─────────────────────────────────────────────────────────
function ScheduleCard({ schedule }: { schedule: Schedule }) {
  const [open, setOpen] = useState(false)
  const accentColor = schedule.type === 'human' ? '#0d6efd' : '#198754'
  const lightBg = schedule.type === 'human' ? '#f0f4ff' : '#f0fff4'

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e9ecef',
        borderLeft: `4px solid ${accentColor}`,
        borderRadius: 10,
        boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: open ? lightBg : '#fff',
          border: 'none',
          padding: '16px 20px',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a' }}>
            <span
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: accentColor,
                marginRight: 8,
              }}
            />
            {schedule.title}
          </div>
          {schedule.subtitle && (
            <div style={{ fontSize: '0.78rem', color: '#6c757d', marginTop: 3 }}>
              {schedule.subtitle}
            </div>
          )}
        </div>
        <span style={{ color: accentColor, fontSize: '1.2rem', flexShrink: 0 }}>
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div style={{ padding: '0 20px 20px' }}>
          {schedule.doses.length > 0 && (
            <Table bordered size="sm" className="mt-3" style={{ fontSize: '0.875rem' }}>
              <thead style={{ background: lightBg }}>
                <tr>
                  <th>Day</th>
                  <th>Dose</th>
                </tr>
              </thead>
              <tbody>
                {schedule.doses.map((d, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{d.label}</td>
                    <td>{d.note || 'Dose'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <VaccineTimeline schedule={schedule} />

          {schedule.notes && schedule.notes.length > 0 && (
            <div className="mt-3">
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: 4 }}>Notes:</div>
              <ul style={{ fontSize: '0.82rem', color: '#6c757d', paddingLeft: 18, margin: 0 }}>
                {schedule.notes.map((n, i) => <li key={i}>{n}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function VaccinationSchedule() {
  const [tab, setTab] = useState<'human' | 'animal'>('human')
  const visibleSchedules = SCHEDULES.filter(s => s.type === tab)

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