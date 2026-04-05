'use client'

import { useState } from 'react'
import { VaccSchedule} from '../../../types/VaccSchedule'

export default function VaccTimeline({ schedule }: { schedule: VaccSchedule }) {
  const [takenDoses, setTakenDoses] = useState<number[]>([])
  const [startDate, setStartDate]   = useState<string>('')

  if (schedule.id === 'animal-vaccine') return null

  const toggleDose = (index: number) => {
    setTakenDoses(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const nextDoseIndex = schedule.doses.findIndex((_, i) => !takenDoses.includes(i))

  const getDoseDate = (dayNum: number | string): string | null => {
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
            const taken    = takenDoses.includes(i)
            const isCurrent = i === nextDoseIndex
            const doseDate  = getDoseDate(dose.day)
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90 }}>
                  <button
                    onClick={() => toggleDose(i)}
                    title={taken ? 'Click to undo' : 'Click to mark as taken'}
                    style={{
                      width: 44, height: 44, borderRadius: '50%',
                      border:      taken ? '3px solid #198754' : isCurrent ? '3px solid #0d6efd' : '2px solid #ccc',
                      background:  taken ? '#198754'           : isCurrent ? '#e7f1ff'           : '#f8f9fa',
                      color:       taken ? '#fff'              : isCurrent ? '#0d6efd'           : '#999',
                      fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
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
        <div style={{ background: '#e7f1ff', borderRadius: 8, padding: '10px 16px', display: 'inline-block', marginTop: 4, fontSize: '0.9rem', color: '#0d6efd', fontWeight: 500 }}>
          🕐 Next dose ({schedule.doses[nextDoseIndex].label}){' '}
          {getDoseDate(schedule.doses[nextDoseIndex].day)
            ? `on ${getDoseDate(schedule.doses[nextDoseIndex].day)}`
            : ''}
        </div>
      )}

      {takenDoses.length === schedule.doses.length && (
        <div style={{ background: '#d1fae5', borderRadius: 8, padding: '10px 16px', marginTop: 8, color: '#065f46', fontWeight: 600 }}>
          ✅ All doses recorded. Course complete!
        </div>
      )}

      {nextDoseIndex >= 0 && (
        <button
          onClick={() => toggleDose(nextDoseIndex)}
          style={{ background: '#198754', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 22px', fontWeight: 600, cursor: 'pointer', marginTop: 12, display: 'block' }}
        >
          💉 Record My Dose Now (Dose {nextDoseIndex + 1})
        </button>
      )}
    </div>
  )
}