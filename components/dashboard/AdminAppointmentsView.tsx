

'use client'

import { useState, useEffect } from 'react'
import { AdminAppointment } from '@/types/Appointment'
import { apiUrl } from '@/lib/api'
const STATUS_COLORS = {
  Pending:   { dot: '#F59E0B', bg: '#FEF3C7', text: '#78350F' },
  Approved:  { dot: '#10B981', bg: '#D1FAE5', text: '#065F46' },
  Rejected:  { dot: '#EF4444', bg: '#FEE2E2', text: '#991B1B' },
  Cancelled: { dot: '#94A3B8', bg: '#F1F5F9', text: '#475569' },
}

export default function AdminAppointmentsView() {
  const [appointments, setAppointments] = useState<AdminAppointment[]>([])
  const [loading, setLoading] = useState(true)
  const [newIds, setNewIds] = useState<Set<number>>(new Set())

  // ── جيب الحجوزات من الـ API عند التحميل ──
  useEffect(() => {
    fetch(apiUrl(`dashboard/appointments/clinic/all`), { cache: 'no-store' })
      .then(r => r.json())
      .then(setAppointments)
      .catch(err => console.error('Failed to load appointments:', err))
      .finally(() => setLoading(false))
  }, [])

  // ── استمع لأي حجز جديد يحصل في التطبيق ──
  useEffect(() => {
    const handleNewAppointment = (event: CustomEvent) => {
      const { patientName, clinicName, date, time } = event.detail
      const newAppt: AdminAppointment = {
        id: Date.now(),
        patientName: patientName ?? 'Unknown Patient',
        clinicName:  clinicName  ?? 'Unknown Clinic',
        date:        date        ?? new Date().toISOString().slice(0, 10),
        time:        time        ?? 'N/A',
        status: 'Pending',
      }

      setAppointments(prev => [newAppt, ...prev])

      // هايلايت الصف الجديد لمدة 4 ثواني
      setNewIds(prev => new Set(prev).add(newAppt.id))
      setTimeout(() => {
        setNewIds(prev => {
          const next = new Set(prev)
          next.delete(newAppt.id)
          return next
        })
      }, 4000)
    }

    window.addEventListener('newAppointment', handleNewAppointment as EventListener)
    return () => window.removeEventListener('newAppointment', handleNewAppointment as EventListener)
  }, [])

  return (
    <>
      <style>{`
        .aav-card { background: white; border-radius: 12px; border: 1px solid #E2E8F0; overflow: hidden; }
        .aav-header {
          padding: 1rem 1.25rem; border-bottom: 1px solid #F1F5F9;
          display: flex; align-items: center; justify-content: space-between;
        }
        .aav-title { font-size: 0.8rem; font-weight: 700; color: #0F172A; text-transform: uppercase; letter-spacing: 0.07em; }
        .aav-badge { font-size: 0.68rem; background: #F1F5F9; color: #475569; padding: 0.2rem 0.5rem; border-radius: 6px; font-weight: 600; }
        .aav-row {
          padding: 0.75rem 1.25rem; border-bottom: 1px solid #F8FAFC;
          display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;
          transition: background 0.6s;
        }
        .aav-row:last-child { border-bottom: none; }
        .aav-row.aav-new { background: #F0FDF4; animation: aavPop 0.35s ease; }
        @keyframes aavPop {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .aav-name { font-size: 0.82rem; font-weight: 600; color: #0F172A; }
        .aav-sub  { font-size: 0.7rem; color: #94A3B8; margin-top: 0.1rem; }
        .aav-pill {
          display: inline-flex; align-items: center; gap: 0.25rem;
          padding: 0.15rem 0.55rem; border-radius: 20px; font-size: 0.65rem; font-weight: 600; flex-shrink: 0;
        }
        .aav-dot  { width: 5px; height: 5px; border-radius: 50%; }
        .aav-empty { text-align: center; padding: 2rem; color: #94A3B8; font-size: 0.82rem; }
        .aav-new-label {
          font-size: 0.6rem; font-weight: 700; background: #10B981; color: white;
          padding: 0.1rem 0.4rem; border-radius: 4px; margin-left: 0.4rem; text-transform: uppercase;
        }
      `}</style>

      <div className="aav-card">
        <div className="aav-header">
          <span className="aav-title">
            <i className="bi bi-calendar-check me-2" style={{ color: '#0D9488' }}></i>
            Recent Appointments
          </span>
          <span className="aav-badge">{appointments.length} total</span>
        </div>

        {loading ? (
          <div className="aav-empty">
            <div className="spinner-border spinner-border-sm text-primary" role="status" />
          </div>
        ) : appointments.length === 0 ? (
          <div className="aav-empty">No appointments found.</div>
        ) : (
          appointments.map(appt => {
            const cfg = STATUS_COLORS[appt.status]
            const isNew = newIds.has(appt.id)
            return (
              <div className={`aav-row${isNew ? ' aav-new' : ''}`} key={appt.id}>
                <div style={{ minWidth: 0 }}>
                  <div className="aav-name">
                    {appt.patientName}
                    {isNew && <span className="aav-new-label">New</span>}
                  </div>
                  <div className="aav-sub">
                    <i className="bi bi-building me-1"></i>{appt.clinicName}
                    &nbsp;·&nbsp;
                    <i className="bi bi-clock me-1"></i>{appt.date} {appt.time}
                  </div>
                </div>
                <span className="aav-pill" style={{ background: cfg.bg, color: cfg.text }}>
                  <span className="aav-dot" style={{ background: cfg.dot }}></span>
                  {appt.status}
                </span>
              </div>
            )
          })
        )}
      </div>
    </>
  )
}