
'use client'

import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { VaccSchedule } from '../../../../types/VaccSchedule'
import VaccTimeline from '../VaccTimeLine'

export function ScheduleCard({
  schedule,
  onSaved,           // ✅ أضفناها هنا
}: {
  schedule: VaccSchedule
  onSaved?: () => void
}) {
  const [open, setOpen] = useState(false)
  const accentColor = schedule.type === 'human' ? '#0d6efd' : '#198754'
  const lightBg     = schedule.type === 'human' ? '#f0f4ff' : '#f0fff4'

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
                {schedule.doses.map((d: VaccSchedule['doses'][number], i: number) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{d.label}</td>
                    <td>{d.note ?? 'Dose'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
{schedule.type === 'human' && (
  <div
    style={{
      display: 'flex',
      gap: 16,
      margin: '20px 0 8px',
      borderRadius: 12,
      overflow: 'hidden',
      border: '1px solid #e9ecef',
      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    }}
  >
    {/* Image 1 */}
    <div
      style={{ flex: 1, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
      onMouseEnter={e => {
        (e.currentTarget.querySelector('img') as HTMLImageElement).style.transform = 'scale(1.07)'
        ;(e.currentTarget.querySelector('.overlay') as HTMLElement).style.opacity = '1'
      }}
      onMouseLeave={e => {
        (e.currentTarget.querySelector('img') as HTMLImageElement).style.transform = 'scale(1)'
        ;(e.currentTarget.querySelector('.overlay') as HTMLElement).style.opacity = '0'
      }}
    >
      <img
        src="/examine.jpg"
        alt="Medical examination"
        style={{
          width: '100%', height: 180, objectFit: 'cover',
          objectPosition: '50% 45%', display: 'block',
          transition: 'transform 0.4s ease',
        }}
      />
      <div className="overlay" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(13,110,253,0.75), transparent)',
        opacity: 0, transition: 'opacity 0.3s ease',
        display: 'flex', alignItems: 'flex-end', padding: '12px',
      }}>
        <span style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 600 }}>🩺 Medical Examination</span>
      </div>
    </div>

    <div style={{ width: 2, background: '#e9ecef', flexShrink: 0 }} />

    {/* Image 2 */}
    <div
      style={{ flex: 1, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
      onMouseEnter={e => {
        (e.currentTarget.querySelector('img') as HTMLImageElement).style.transform = 'scale(1.07)'
        ;(e.currentTarget.querySelector('.overlay') as HTMLElement).style.opacity = '1'
      }}
      onMouseLeave={e => {
        (e.currentTarget.querySelector('img') as HTMLImageElement).style.transform = 'scale(1)'
        ;(e.currentTarget.querySelector('.overlay') as HTMLElement).style.opacity = '0'
      }}
    >
      <img
        src="/vaccine-5808436_1280.png"
        alt="Vaccination"
        style={{
          width: '100%', height: 180, objectFit: 'cover',
          display: 'block', transition: 'transform 0.4s ease',
        }}
      />
      <div className="overlay" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(25,135,84,0.75), transparent)',
        opacity: 0, transition: 'opacity 0.3s ease',
        display: 'flex', alignItems: 'flex-end', padding: '12px',
      }}>
        <span style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 600 }}>💉 Vaccination</span>
      </div>
    </div>
  </div>
)}


{schedule.type === 'animal' && (
  <div
    style={{
      display: 'flex',
      gap: 16,
      margin: '20px 0 8px',
      borderRadius: 12,
      overflow: 'hidden',
      border: '1px solid #e9ecef',
      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
    }}
  >
    {/* Image 1 */}
    <div
      style={{ flex: 1, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
      onMouseEnter={e => {
        (e.currentTarget.querySelector('img') as HTMLImageElement).style.transform = 'scale(1.07)'
        ;(e.currentTarget.querySelector('.overlay') as HTMLElement).style.opacity = '1'
      }}
      onMouseLeave={e => {
        (e.currentTarget.querySelector('img') as HTMLImageElement).style.transform = 'scale(1)'
        ;(e.currentTarget.querySelector('.overlay') as HTMLElement).style.opacity = '0'
      }}
    >
      <img
        src="/syringe.png"
        alt="Medical examination"
        style={{
          width: '100%', height: 180, objectFit: 'cover',
          objectPosition: '50% 45%', display: 'block',
          transition: 'transform 0.4s ease',
        }}
      />
      <div className="overlay" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(13,110,253,0.75), transparent)',
        opacity: 0, transition: 'opacity 0.3s ease',
        display: 'flex', alignItems: 'flex-end', padding: '12px',
      }}>
        <span style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 600 }}>🩺 Medical Examination</span>
      </div>
    </div>

    <div style={{ width: 2, background: '#e9ecef', flexShrink: 0 }} />

    {/* Image 2 */}
    <div
      style={{ flex: 1, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
      onMouseEnter={e => {
        (e.currentTarget.querySelector('img') as HTMLImageElement).style.transform = 'scale(1.07)'
        ;(e.currentTarget.querySelector('.overlay') as HTMLElement).style.opacity = '1'
      }}
      onMouseLeave={e => {
        (e.currentTarget.querySelector('img') as HTMLImageElement).style.transform = 'scale(1)'
        ;(e.currentTarget.querySelector('.overlay') as HTMLElement).style.opacity = '0'
      }}
    >
      <img
        src="/syringe1.jpg"
        alt="Vaccination"
        style={{
          width: '100%', height: 180, objectFit: 'cover',
          display: 'block', transition: 'transform 0.4s ease',
        }}
      />
      <div className="overlay" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(25,135,84,0.75), transparent)',
        opacity: 0, transition: 'opacity 0.3s ease',
        display: 'flex', alignItems: 'flex-end', padding: '12px',
      }}>
        <span style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 600 }}>💉 Vaccination</span>
      </div>
    </div>
  </div>
)}



          <VaccTimeline schedule={schedule} onSaved={onSaved} /> {/* ✅ */}

          {schedule.notes && schedule.notes.length > 0 && (
            <div className="mt-3">
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: 4 }}>
                Notes:
              </div>
              <ul style={{ fontSize: '0.82rem', color: '#6c757d', paddingLeft: 18, margin: 0 }}>
                {schedule.notes.map((n: string, i: number) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}