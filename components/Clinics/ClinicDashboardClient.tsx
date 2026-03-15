// 'use client'

// import { useState, useEffect } from 'react'
// import { Container, Row, Col, Modal } from 'react-bootstrap'

// // ===== Types =====
// interface Appointment {
//   id: number
//   patientName: string
//   patientPhone: string
//   date: string
//   time: string
//   status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled'
//   notes?: string
// }

// interface ClinicSettings {
//   name: string
//   address: string
//   governorate: string
//   phone: string
//   facebookPage?: string
//   bookingPrice?: number
//   workingDays?: string
//   workingHours?: string
// }

// // ===== API helpers =====
// // In a real app, clinicId comes from auth session/token (e.g. JWT claim)
// const getClinicId = () => {
//   if (typeof window === 'undefined') return ''
//   return localStorage.getItem('clinicId') || ''
// }

// const appointmentsApi = {
//   getAll: async (): Promise<Appointment[]> => {
//     const res = await fetch(`/api/dashboard/appointments/clinic/${getClinicId()}`, {
//       headers: { 'ngrok-skip-browser-warning': 'true' },
//       cache: 'no-store',
//     })
//     if (!res.ok) throw new Error('Failed to fetch appointments')
//     return res.json()
//   },
//   approve: async (id: number): Promise<void> => {
//     const res = await fetch(`/api/dashboard/appointments/${id}/approve`, { method: 'PUT' })
//     if (!res.ok) throw new Error('Failed to approve')
//   },
//   reject: async (id: number): Promise<void> => {
//     const res = await fetch(`/api/dashboard/appointments/${id}/reject`, { method: 'PUT' })
//     if (!res.ok) throw new Error('Failed to reject')
//   },
// }

// const settingsApi = {
//   update: async (data: Partial<ClinicSettings>): Promise<void> => {
//     const formData = new FormData()
//     Object.entries(data).forEach(([k, v]) => {
//       if (v !== undefined && v !== null) formData.append(k, String(v))
//     })
//     const res = await fetch(`/api/clinic/dashboard/${getClinicId()}/settings`, {
//       method: 'PUT',
//       body: formData,
//     })
//     if (!res.ok) throw new Error('Failed to update settings')
//   },
// }

// // ===== Status config =====
// const STATUS_CONFIG = {
//   Pending:   { color: '#F59E0B', bg: '#FEF3C7', textColor: '#78350F' },
//   Approved:  { color: '#10B981', bg: '#D1FAE5', textColor: '#065F46' },
//   Rejected:  { color: '#EF4444', bg: '#FEE2E2', textColor: '#991B1B' },
//   Cancelled: { color: '#94A3B8', bg: '#F1F5F9', textColor: '#475569' },
// }

// const governorates = ['Port Said', 'Ismailia', 'Suez', 'Cairo']

// // ===== Main Component =====
// export default function ClinicDashboardClient() {
//   const [appointments, setAppointments] = useState<Appointment[]>([])
//   const [loading, setLoading] = useState(true)
//   const [filterStatus, setFilterStatus] = useState<string>('all')
//   const [toast, setToast] = useState<{ msg: string; type: 'success' | 'danger' } | null>(null)
//   const [actionLoading, setActionLoading] = useState<number | null>(null)
//   const [showSettings, setShowSettings] = useState(false)
//   const [settings, setSettings] = useState<ClinicSettings>({
//     name: '', address: '', governorate: '', phone: '',
//     facebookPage: '', bookingPrice: undefined, workingDays: '', workingHours: '',
//   })

//   useEffect(() => { loadAppointments() }, [])

//   const loadAppointments = async () => {
//     try {
//       setLoading(true)
//       const data = await appointmentsApi.getAll()
//       setAppointments(data)
//     } catch {
//       // Demo fallback data
//       setAppointments([
//         { id: 1, patientName: 'Ahmed Hassan',   patientPhone: '01012345678', date: '2026-03-20', time: '10:00 AM', status: 'Pending',   notes: 'First visit' },
//         { id: 2, patientName: 'Sara Mohamed',   patientPhone: '01098765432', date: '2026-03-20', time: '11:30 AM', status: 'Approved' },
//         { id: 3, patientName: 'Omar Ali',        patientPhone: '01155667788', date: '2026-03-21', time: '02:00 PM', status: 'Rejected' },
//         { id: 4, patientName: 'Nour Ibrahim',   patientPhone: '01234567890', date: '2026-03-22', time: '09:00 AM', status: 'Cancelled', notes: 'Patient cancelled' },
//         { id: 5, patientName: 'Youssef Khaled', patientPhone: '01567891234', date: '2026-03-22', time: '03:30 PM', status: 'Pending' },
//       ])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const showToast = (msg: string, type: 'success' | 'danger') => {
//     setToast({ msg, type })
//     setTimeout(() => setToast(null), 3500)
//   }

//   const handleApprove = async (id: number) => {
//     setActionLoading(id)
//     try {
//       await appointmentsApi.approve(id)
//       setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Approved' as const } : a))
//       showToast('Appointment approved!', 'success')
//     } catch { showToast('Failed to approve.', 'danger') }
//     finally { setActionLoading(null) }
//   }

//   const handleReject = async (id: number) => {
//     setActionLoading(id)
//     try {
//       await appointmentsApi.reject(id)
//       setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Rejected' as const } : a))
//       showToast('Appointment rejected.', 'success')
//     } catch { showToast('Failed to reject.', 'danger') }
//     finally { setActionLoading(null) }
//   }

//   const handleSettingsSave = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       await settingsApi.update(settings)
//       showToast('Settings saved!', 'success')
//       setShowSettings(false)
//     } catch { showToast('Failed to save settings.', 'danger') }
//   }

//   const filtered = filterStatus === 'all'
//     ? appointments
//     : appointments.filter(a => a.status === filterStatus)

//   const counts = {
//     all: appointments.length,
//     Pending:   appointments.filter(a => a.status === 'Pending').length,
//     Approved:  appointments.filter(a => a.status === 'Approved').length,
//     Rejected:  appointments.filter(a => a.status === 'Rejected').length,
//     Cancelled: appointments.filter(a => a.status === 'Cancelled').length,
//   }

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

//         .cd-wrap { font-family: 'Sora', sans-serif; background: #F8FAFC; min-height: 100vh; }

//         /* Header */
//         .cd-header {
//           background: linear-gradient(135deg, #0F766E 0%, #0D9488 60%, #14B8A6 100%);
//           padding: 2rem 1.75rem 3.75rem;
//           position: relative; overflow: hidden; color: white;
//         }
//         .cd-header::before {
//           content: ''; position: absolute; top: -50px; right: -50px;
//           width: 220px; height: 220px; background: rgba(255,255,255,0.06); border-radius: 50%;
//         }
//         .cd-header::after {
//           content: ''; position: absolute; bottom: -80px; right: 80px;
//           width: 320px; height: 320px; background: rgba(255,255,255,0.04); border-radius: 50%;
//         }
//         .cd-header h1 { font-size: 1.65rem; font-weight: 700; letter-spacing: -0.02em; margin: 0; }
//         .cd-header .subtitle { font-size: 0.82rem; opacity: 0.75; margin: 0.3rem 0 0; }
//         .cd-eyebrow { font-size: 0.68rem; opacity: 0.65; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 0.2rem; }

//         .cd-header-btn {
//           background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.28);
//           color: white; font-size: 0.78rem; font-weight: 500; padding: 0.45rem 1rem;
//           border-radius: 8px; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.4rem;
//         }
//         .cd-header-btn:hover { background: rgba(255,255,255,0.24); }

//         /* Stats */
//         .cd-stats { padding: 0 1.5rem; margin-top: -2rem; position: relative; z-index: 10; }
//         .cd-chip {
//           background: white; border-radius: 12px; padding: 0.9rem 1rem;
//           box-shadow: 0 4px 16px rgba(0,0,0,0.07); text-align: center;
//           border: 1.5px solid #E2E8F0; cursor: pointer; transition: all 0.2s;
//         }
//         .cd-chip:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
//         .cd-chip.active { border-color: #0D9488; box-shadow: 0 4px 20px rgba(13,148,136,0.18); }
//         .cd-chip .cn { font-family: 'DM Mono', monospace; font-size: 1.6rem; font-weight: 500; line-height: 1; }
//         .cd-chip .cl { font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #64748B; margin-top: 0.2rem; }

//         /* Content */
//         .cd-content { padding: 1.25rem 1.5rem 2rem; }
//         .cd-section-label { font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #94A3B8; }

//         /* Appointment card */
//         .cd-card {
//           background: white; border-radius: 12px; border: 1px solid #E2E8F0;
//           padding: 1.1rem 1.1rem 1.1rem 1.4rem; margin-bottom: 0.75rem;
//           position: relative; overflow: hidden; transition: all 0.2s;
//         }
//         .cd-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); transform: translateY(-1px); }
//         .cd-card::before {
//           content: ''; position: absolute; left: 0; top: 0; bottom: 0;
//           width: 3.5px; border-radius: 3px 0 0 3px;
//         }
//         .cd-card.Pending::before   { background: #F59E0B; }
//         .cd-card.Approved::before  { background: #10B981; }
//         .cd-card.Rejected::before  { background: #EF4444; }
//         .cd-card.Cancelled::before { background: #94A3B8; }

//         .cd-name { font-size: 0.92rem; font-weight: 600; color: #0F172A; }
//         .cd-meta { font-size: 0.75rem; color: #64748B; margin-top: 0.25rem; display: flex; flex-wrap: wrap; gap: 0.75rem; }
//         .cd-meta i { margin-right: 0.2rem; }
//         .cd-note { font-size: 0.73rem; color: #64748B; font-style: italic; margin-top: 0.5rem; background: #F8FAFC; padding: 0.3rem 0.6rem; border-radius: 6px; display: inline-block; }

//         .cd-pill {
//           display: inline-flex; align-items: center; gap: 0.28rem;
//           padding: 0.18rem 0.6rem; border-radius: 20px;
//           font-size: 0.67rem; font-weight: 600; letter-spacing: 0.03em;
//         }
//         .cd-dot { width: 5px; height: 5px; border-radius: 50%; }

//         .cd-btn {
//           padding: 0.32rem 0.8rem; border-radius: 7px; font-size: 0.73rem;
//           font-weight: 600; border: none; cursor: pointer; transition: all 0.18s;
//           display: inline-flex; align-items: center; gap: 0.28rem; font-family: 'Sora', sans-serif;
//         }
//         .cd-btn:disabled { opacity: 0.45; cursor: not-allowed; }
//         .cd-btn-approve { background: #D1FAE5; color: #065F46; }
//         .cd-btn-approve:hover:not(:disabled) { background: #10B981; color: white; }
//         .cd-btn-reject  { background: #FEE2E2; color: #991B1B; }
//         .cd-btn-reject:hover:not(:disabled)  { background: #EF4444; color: white; }
//         .cd-btn-ghost   { background: #F1F5F9; color: #475569; }
//         .cd-btn-ghost:hover { background: #E2E8F0; }
//         .cd-btn-primary { background: #0D9488; color: white; padding: 0.45rem 1.25rem; }
//         .cd-btn-primary:hover { background: #0F766E; }

//         .cd-empty { text-align: center; padding: 3rem 1rem; color: #94A3B8; }
//         .cd-empty-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }

//         /* Toast */
//         .cd-toast {
//           position: fixed; top: 1.25rem; left: 50%; transform: translateX(-50%);
//           z-index: 9999; padding: 0.65rem 1.4rem; border-radius: 10px;
//           font-size: 0.82rem; font-weight: 500; box-shadow: 0 8px 30px rgba(0,0,0,0.15);
//           animation: cdSlide 0.25s ease; white-space: nowrap; font-family: 'Sora', sans-serif;
//         }
//         @keyframes cdSlide {
//           from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
//           to   { opacity: 1; transform: translateX(-50%) translateY(0); }
//         }
//         .cd-toast-success { background: #065F46; color: white; }
//         .cd-toast-danger  { background: #991B1B; color: white; }

//         .cd-spin { animation: cdSpin 0.7s linear infinite; display: inline-block; }
//         @keyframes cdSpin { to { transform: rotate(360deg); } }

//         /* Settings modal */
//         .cd-modal .modal-content { border-radius: 16px; border: none; box-shadow: 0 20px 60px rgba(0,0,0,0.14); overflow: hidden; }
//         .cd-modal .modal-header { background: linear-gradient(135deg, #0F766E, #0D9488); color: white; border: none; padding: 1.25rem 1.5rem; }
//         .cd-modal .modal-header .btn-close { filter: invert(1); opacity: 0.85; }
//         .cd-modal .modal-title { font-family: 'Sora'; font-size: 1rem; font-weight: 600; }
//         .cd-modal label { font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: #64748B; margin-bottom: 0.35rem; }
//         .cd-modal .form-control, .cd-modal .form-select {
//           border-radius: 8px; border: 1.5px solid #E2E8F0; font-size: 0.85rem;
//           padding: 0.55rem 0.85rem; font-family: 'Sora'; transition: border-color 0.2s;
//         }
//         .cd-modal .form-control:focus, .cd-modal .form-select:focus {
//           border-color: #0D9488; box-shadow: 0 0 0 3px rgba(13,148,136,0.1);
//         }
//         .cd-modal .modal-footer { border: none; padding: 1rem 1.5rem; background: #F8FAFC; }
//       `}</style>

//       <div className="cd-wrap">
//         {/* Toast */}
//         {toast && (
//           <div className={`cd-toast cd-toast-${toast.type}`}>
//             <i className={`bi bi-${toast.type === 'success' ? 'check-circle' : 'x-circle'} me-2`}></i>
//             {toast.msg}
//           </div>
//         )}

//         {/* Header */}
//         <div className="cd-header">
//           <div className="d-flex justify-content-between align-items-start position-relative" style={{ zIndex: 2 }}>
//             <div>
//               <p className="cd-eyebrow">Clinic Portal</p>
//               <h1>My Dashboard</h1>
//               <p className="subtitle">Manage appointments & clinic settings</p>
//             </div>
//             <button className="cd-header-btn" onClick={() => setShowSettings(true)}>
//               <i className="bi bi-gear-fill"></i> Settings
//             </button>
//           </div>
//         </div>

//         {/* Stats Filter Row */}
//         <div className="cd-stats">
//           <Row className="g-2">
//             {[
//               { key: 'all',       label: 'Total',     color: '#0D9488' },
//               { key: 'Pending',   label: 'Pending',   color: '#F59E0B' },
//               { key: 'Approved',  label: 'Approved',  color: '#10B981' },
//               { key: 'Rejected',  label: 'Rejected',  color: '#EF4444' },
//               { key: 'Cancelled', label: 'Cancelled', color: '#94A3B8' },
//             ].map(s => (
//               <Col key={s.key} xs={6} sm={4} md>
//                 <div
//                   className={`cd-chip${filterStatus === s.key ? ' active' : ''}`}
//                   onClick={() => setFilterStatus(s.key)}
//                 >
//                   <div className="cn" style={{ color: s.color }}>{counts[s.key as keyof typeof counts]}</div>
//                   <div className="cl">{s.label}</div>
//                 </div>
//               </Col>
//             ))}
//           </Row>
//         </div>

//         {/* Appointments List */}
//         <div className="cd-content">
//           <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
//             <span className="cd-section-label">
//               {filterStatus === 'all' ? 'All Appointments' : `${filterStatus} Appointments`}
//               <span style={{ color: '#0D9488', marginLeft: '0.4rem', fontFamily: 'DM Mono, monospace' }}>
//                 ({filtered.length})
//               </span>
//             </span>
//             <button className="cd-btn cd-btn-ghost" onClick={loadAppointments} style={{ fontSize: '0.72rem' }}>
//               <i className="bi bi-arrow-clockwise"></i> Refresh
//             </button>
//           </div>

//           {loading ? (
//             <div className="cd-empty">
//               <div className="cd-spin" style={{ fontSize: '2rem', color: '#0D9488' }}>◌</div>
//               <p className="mt-3" style={{ fontSize: '0.85rem' }}>Loading appointments...</p>
//             </div>
//           ) : filtered.length === 0 ? (
//             <div className="cd-empty">
//               <div className="cd-empty-icon">📭</div>
//               <p style={{ fontSize: '0.85rem' }}>No {filterStatus !== 'all' ? filterStatus.toLowerCase() : ''} appointments found.</p>
//             </div>
//           ) : (
//             filtered.map(appt => {
//               const cfg = STATUS_CONFIG[appt.status]
//               return (
//                 <div key={appt.id} className={`cd-card ${appt.status}`}>
//                   <div className="d-flex justify-content-between align-items-start gap-3">
//                     <div style={{ minWidth: 0 }}>
//                       <div className="d-flex align-items-center gap-2 flex-wrap">
//                         <span className="cd-name">{appt.patientName}</span>
//                         <span className="cd-pill" style={{ background: cfg.bg, color: cfg.textColor }}>
//                           <span className="cd-dot" style={{ background: cfg.color }}></span>
//                           {appt.status}
//                         </span>
//                       </div>
//                       <div className="cd-meta">
//                         <span><i className="bi bi-telephone"></i>{appt.patientPhone}</span>
//                         <span><i className="bi bi-calendar3"></i>{appt.date}</span>
//                         <span><i className="bi bi-clock"></i>{appt.time}</span>
//                       </div>
//                       {appt.notes && (
//                         <span className="cd-note">
//                           <i className="bi bi-chat-left-text me-1"></i>{appt.notes}
//                         </span>
//                       )}
//                     </div>

//                     {appt.status === 'Pending' && (
//                       <div className="d-flex gap-2 flex-shrink-0">
//                         <button
//                           className="cd-btn cd-btn-approve"
//                           onClick={() => handleApprove(appt.id)}
//                           disabled={actionLoading === appt.id}
//                         >
//                           {actionLoading === appt.id
//                             ? <span className="cd-spin">◌</span>
//                             : <><i className="bi bi-check2"></i> Approve</>
//                           }
//                         </button>
//                         <button
//                           className="cd-btn cd-btn-reject"
//                           onClick={() => handleReject(appt.id)}
//                           disabled={actionLoading === appt.id}
//                         >
//                           <i className="bi bi-x"></i> Reject
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )
//             })
//           )}
//         </div>
//       </div>

//       {/* Settings Modal */}
//       <Modal show={showSettings} onHide={() => setShowSettings(false)} size="lg" scrollable className="cd-modal">
//         <Modal.Header closeButton>
//           <Modal.Title><i className="bi bi-gear-fill me-2"></i>Clinic Settings</Modal.Title>
//         </Modal.Header>
//         <form onSubmit={handleSettingsSave}>
//           <Modal.Body className="p-4">
//             <Row className="g-3">
//               <Col md={6}>
//                 <label className="form-label d-block">Clinic Name *</label>
//                 <input type="text" className="form-control" value={settings.name} placeholder="Your Clinic Name"
//                   onChange={e => setSettings({ ...settings, name: e.target.value })} required />
//               </Col>
//               <Col md={6}>
//                 <label className="form-label d-block">Phone *</label>
//                 <input type="tel" className="form-control" value={settings.phone} placeholder="+20 XXX XXX XXXX"
//                   onChange={e => setSettings({ ...settings, phone: e.target.value })} required />
//               </Col>
//               <Col md={6}>
//                 <label className="form-label d-block">Address *</label>
//                 <input type="text" className="form-control" value={settings.address} placeholder="Street, Area"
//                   onChange={e => setSettings({ ...settings, address: e.target.value })} required />
//               </Col>
//               <Col md={6}>
//                 <label className="form-label d-block">Governorate *</label>
//                 <select className="form-select" value={settings.governorate}
//                   onChange={e => setSettings({ ...settings, governorate: e.target.value })} required>
//                   <option value="">Select governorate</option>
//                   {governorates.map(g => <option key={g} value={g}>{g}</option>)}
//                 </select>
//               </Col>
//               <Col md={6}>
//                 <label className="form-label d-block">Working Days</label>
//                 <input type="text" className="form-control" value={settings.workingDays} placeholder="Saturday - Thursday"
//                   onChange={e => setSettings({ ...settings, workingDays: e.target.value })} />
//               </Col>
//               <Col md={6}>
//                 <label className="form-label d-block">Working Hours</label>
//                 <input type="text" className="form-control" value={settings.workingHours} placeholder="9:00 AM - 5:00 PM"
//                   onChange={e => setSettings({ ...settings, workingHours: e.target.value })} />
//               </Col>
//               <Col md={6}>
//                 <label className="form-label d-block">Booking Price (EGP)</label>
//                 <input type="number" className="form-control" value={settings.bookingPrice || ''} placeholder="500" min="0"
//                   onChange={e => setSettings({ ...settings, bookingPrice: parseFloat(e.target.value) || undefined })} />
//               </Col>
//               <Col md={6}>
//                 <label className="form-label d-block">Facebook Page URL</label>
//                 <input type="url" className="form-control" value={settings.facebookPage} placeholder="https://facebook.com/yourclinic"
//                   onChange={e => setSettings({ ...settings, facebookPage: e.target.value })} />
//               </Col>
//             </Row>
//           </Modal.Body>
//           <Modal.Footer>
//             <button type="button" className="cd-btn cd-btn-ghost" onClick={() => setShowSettings(false)}>Cancel</button>
//             <button type="submit" className="cd-btn cd-btn-primary">
//               <i className="bi bi-save me-1"></i> Save Settings
//             </button>
//           </Modal.Footer>
//         </form>
//       </Modal>
//     </>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { Row, Col, Modal } from 'react-bootstrap'
import { clinicsApi } from '../../data/api/Clinic'
import { Clinic } from '../../types/Clinic'

// ── Types ─────────────────────────────────────────────────────────────────

interface Appointment {
  id: number
  patientName: string
  patientPhone: string
  date: string
  time: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled'
  notes?: string
}

// ── Status config ─────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  Pending:   { color: '#F59E0B', bg: '#FEF3C7', textColor: '#78350F' },
  Approved:  { color: '#10B981', bg: '#D1FAE5', textColor: '#065F46' },
  Rejected:  { color: '#EF4444', bg: '#FEE2E2', textColor: '#991B1B' },
  Cancelled: { color: '#94A3B8', bg: '#F1F5F9', textColor: '#475569' },
}

const governorates = ['Port Said', 'Ismailia', 'Suez', 'Cairo']

// ── Helper: get clinicId from localStorage (set at login) ─────────────────

const getClinicId = (): string => {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem('clinicId') || ''
}

// ── Component ─────────────────────────────────────────────────────────────

export default function ClinicDashboardClient() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'danger' } | null>(null)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState<Partial<Clinic>>({
    name: '', address: '', governorate: '', phone: '',
    facebookPage: '', bookingPrice: undefined, workingDays: '', workingHours: '',
  })

  useEffect(() => { loadAppointments() }, [])

  // ── Load appointments via clinicsApi ──
  const loadAppointments = async () => {
    try {
      setLoading(true)
      const data = await clinicsApi.getAppointments(getClinicId())
      setAppointments(data)
    } catch (err) {
      console.error('Failed to load appointments:', err)
    } finally {
      setLoading(false)
    }
  }

  const showToast = (msg: string, type: 'success' | 'danger') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  // ── Approve via clinicsApi ──
  const handleApprove = async (id: number) => {
    setActionLoading(id)
    try {
      await clinicsApi.approveAppointment(id)
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Approved' as const } : a))
      showToast('Appointment approved!', 'success')
    } catch {
      showToast('Failed to approve.', 'danger')
    } finally {
      setActionLoading(null)
    }
  }

  // ── Reject via clinicsApi ──
  const handleReject = async (id: number) => {
    setActionLoading(id)
    try {
      await clinicsApi.rejectAppointment(id)
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Rejected' as const } : a))
      showToast('Appointment rejected.', 'success')
    } catch {
      showToast('Failed to reject.', 'danger')
    } finally {
      setActionLoading(null)
    }
  }

  // ── Save settings via clinicsApi ──
  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await clinicsApi.updateSettings(getClinicId(), settings)
      showToast('Settings saved!', 'success')
      setShowSettings(false)
    } catch {
      showToast('Failed to save settings.', 'danger')
    }
  }

  const filtered = filterStatus === 'all'
    ? appointments
    : appointments.filter(a => a.status === filterStatus)

  const counts = {
    all:       appointments.length,
    Pending:   appointments.filter(a => a.status === 'Pending').length,
    Approved:  appointments.filter(a => a.status === 'Approved').length,
    Rejected:  appointments.filter(a => a.status === 'Rejected').length,
    Cancelled: appointments.filter(a => a.status === 'Cancelled').length,
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        .cd-wrap { font-family: 'Sora', sans-serif; background: #F8FAFC; min-height: 100vh; }

        .cd-header {
          background: linear-gradient(135deg, #0F766E 0%, #0D9488 60%, #14B8A6 100%);
          padding: 2rem 1.75rem 3.75rem;
          position: relative; overflow: hidden; color: white;
        }
        .cd-header::before {
          content: ''; position: absolute; top: -50px; right: -50px;
          width: 220px; height: 220px; background: rgba(255,255,255,0.06); border-radius: 50%;
        }
        .cd-header::after {
          content: ''; position: absolute; bottom: -80px; right: 80px;
          width: 320px; height: 320px; background: rgba(255,255,255,0.04); border-radius: 50%;
        }
        .cd-header h1 { font-size: 1.65rem; font-weight: 700; letter-spacing: -0.02em; margin: 0; }
        .cd-header .subtitle { font-size: 0.82rem; opacity: 0.75; margin: 0.3rem 0 0; }
        .cd-eyebrow { font-size: 0.68rem; opacity: 0.65; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 0.2rem; }
        .cd-header-btn {
          background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.28);
          color: white; font-size: 0.78rem; font-weight: 500; padding: 0.45rem 1rem;
          border-radius: 8px; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.4rem;
        }
        .cd-header-btn:hover { background: rgba(255,255,255,0.24); }

        .cd-stats { padding: 0 1.5rem; margin-top: -2rem; position: relative; z-index: 10; }
        .cd-chip {
          background: white; border-radius: 12px; padding: 0.9rem 1rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.07); text-align: center;
          border: 1.5px solid #E2E8F0; cursor: pointer; transition: all 0.2s;
        }
        .cd-chip:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
        .cd-chip.active { border-color: #0D9488; box-shadow: 0 4px 20px rgba(13,148,136,0.18); }
        .cd-chip .cn { font-family: 'DM Mono', monospace; font-size: 1.6rem; font-weight: 500; line-height: 1; }
        .cd-chip .cl { font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #64748B; margin-top: 0.2rem; }

        .cd-content { padding: 1.25rem 1.5rem 2rem; }
        .cd-section-label { font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #94A3B8; }

        .cd-card {
          background: white; border-radius: 12px; border: 1px solid #E2E8F0;
          padding: 1.1rem 1.1rem 1.1rem 1.4rem; margin-bottom: 0.75rem;
          position: relative; overflow: hidden; transition: all 0.2s;
        }
        .cd-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); transform: translateY(-1px); }
        .cd-card::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 3.5px; border-radius: 3px 0 0 3px;
        }
        .cd-card.Pending::before   { background: #F59E0B; }
        .cd-card.Approved::before  { background: #10B981; }
        .cd-card.Rejected::before  { background: #EF4444; }
        .cd-card.Cancelled::before { background: #94A3B8; }

        .cd-name { font-size: 0.92rem; font-weight: 600; color: #0F172A; }
        .cd-meta { font-size: 0.75rem; color: #64748B; margin-top: 0.25rem; display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .cd-meta i { margin-right: 0.2rem; }
        .cd-note { font-size: 0.73rem; color: #64748B; font-style: italic; margin-top: 0.5rem; background: #F8FAFC; padding: 0.3rem 0.6rem; border-radius: 6px; display: inline-block; }

        .cd-pill {
          display: inline-flex; align-items: center; gap: 0.28rem;
          padding: 0.18rem 0.6rem; border-radius: 20px;
          font-size: 0.67rem; font-weight: 600; letter-spacing: 0.03em;
        }
        .cd-dot { width: 5px; height: 5px; border-radius: 50%; }

        .cd-btn {
          padding: 0.32rem 0.8rem; border-radius: 7px; font-size: 0.73rem;
          font-weight: 600; border: none; cursor: pointer; transition: all 0.18s;
          display: inline-flex; align-items: center; gap: 0.28rem; font-family: 'Sora', sans-serif;
        }
        .cd-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .cd-btn-approve { background: #D1FAE5; color: #065F46; }
        .cd-btn-approve:hover:not(:disabled) { background: #10B981; color: white; }
        .cd-btn-reject  { background: #FEE2E2; color: #991B1B; }
        .cd-btn-reject:hover:not(:disabled)  { background: #EF4444; color: white; }
        .cd-btn-ghost   { background: #F1F5F9; color: #475569; }
        .cd-btn-ghost:hover { background: #E2E8F0; }
        .cd-btn-primary { background: #0D9488; color: white; padding: 0.45rem 1.25rem; }
        .cd-btn-primary:hover { background: #0F766E; }

        .cd-empty { text-align: center; padding: 3rem 1rem; color: #94A3B8; }
        .cd-empty-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }

        .cd-toast {
          position: fixed; top: 1.25rem; left: 50%; transform: translateX(-50%);
          z-index: 9999; padding: 0.65rem 1.4rem; border-radius: 10px;
          font-size: 0.82rem; font-weight: 500; box-shadow: 0 8px 30px rgba(0,0,0,0.15);
          animation: cdSlide 0.25s ease; white-space: nowrap; font-family: 'Sora', sans-serif;
        }
        @keyframes cdSlide {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .cd-toast-success { background: #065F46; color: white; }
        .cd-toast-danger  { background: #991B1B; color: white; }

        .cd-spin { animation: cdSpin 0.7s linear infinite; display: inline-block; }
        @keyframes cdSpin { to { transform: rotate(360deg); } }

        .cd-modal .modal-content { border-radius: 16px; border: none; box-shadow: 0 20px 60px rgba(0,0,0,0.14); overflow: hidden; }
        .cd-modal .modal-header { background: linear-gradient(135deg, #0F766E, #0D9488); color: white; border: none; padding: 1.25rem 1.5rem; }
        .cd-modal .modal-header .btn-close { filter: invert(1); opacity: 0.85; }
        .cd-modal .modal-title { font-family: 'Sora'; font-size: 1rem; font-weight: 600; }
        .cd-modal label { font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: #64748B; margin-bottom: 0.35rem; }
        .cd-modal .form-control, .cd-modal .form-select {
          border-radius: 8px; border: 1.5px solid #E2E8F0; font-size: 0.85rem;
          padding: 0.55rem 0.85rem; font-family: 'Sora'; transition: border-color 0.2s;
        }
        .cd-modal .form-control:focus, .cd-modal .form-select:focus {
          border-color: #0D9488; box-shadow: 0 0 0 3px rgba(13,148,136,0.1);
        }
        .cd-modal .modal-footer { border: none; padding: 1rem 1.5rem; background: #F8FAFC; }
      `}</style>

      <div className="cd-wrap">
        {toast && (
          <div className={`cd-toast cd-toast-${toast.type}`}>
            <i className={`bi bi-${toast.type === 'success' ? 'check-circle' : 'x-circle'} me-2`}></i>
            {toast.msg}
          </div>
        )}

        {/* Header */}
        <div className="cd-header">
          <div className="d-flex justify-content-between align-items-start position-relative" style={{ zIndex: 2 }}>
            <div>
              <p className="cd-eyebrow">Clinic Portal</p>
              <h1>My Dashboard</h1>
              <p className="subtitle">Manage appointments & clinic settings</p>
            </div>
            <button className="cd-header-btn" onClick={() => setShowSettings(true)}>
              <i className="bi bi-gear-fill"></i> Settings
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="cd-stats">
          <Row className="g-2">
            {[
              { key: 'all',       label: 'Total',     color: '#0D9488' },
              { key: 'Pending',   label: 'Pending',   color: '#F59E0B' },
              { key: 'Approved',  label: 'Approved',  color: '#10B981' },
              { key: 'Rejected',  label: 'Rejected',  color: '#EF4444' },
              { key: 'Cancelled', label: 'Cancelled', color: '#94A3B8' },
            ].map(s => (
              <Col key={s.key} xs={6} sm={4} md>
                <div
                  className={`cd-chip${filterStatus === s.key ? ' active' : ''}`}
                  onClick={() => setFilterStatus(s.key)}
                >
                  <div className="cn" style={{ color: s.color }}>{counts[s.key as keyof typeof counts]}</div>
                  <div className="cl">{s.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Appointments List */}
        <div className="cd-content">
          <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
            <span className="cd-section-label">
              {filterStatus === 'all' ? 'All Appointments' : `${filterStatus} Appointments`}
              <span style={{ color: '#0D9488', marginLeft: '0.4rem', fontFamily: 'DM Mono, monospace' }}>
                ({filtered.length})
              </span>
            </span>
            <button className="cd-btn cd-btn-ghost" onClick={loadAppointments} style={{ fontSize: '0.72rem' }}>
              <i className="bi bi-arrow-clockwise"></i> Refresh
            </button>
          </div>

          {loading ? (
            <div className="cd-empty">
              <div className="cd-spin" style={{ fontSize: '2rem', color: '#0D9488' }}>◌</div>
              <p className="mt-3" style={{ fontSize: '0.85rem' }}>Loading appointments...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="cd-empty">
              <div className="cd-empty-icon">📭</div>
              <p style={{ fontSize: '0.85rem' }}>
                No {filterStatus !== 'all' ? filterStatus.toLowerCase() : ''} appointments found.
              </p>
            </div>
          ) : (
            filtered.map(appt => {
              const cfg = STATUS_CONFIG[appt.status]
              return (
                <div key={appt.id} className={`cd-card ${appt.status}`}>
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <div style={{ minWidth: 0 }}>
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <span className="cd-name">{appt.patientName}</span>
                        <span className="cd-pill" style={{ background: cfg.bg, color: cfg.textColor }}>
                          <span className="cd-dot" style={{ background: cfg.color }}></span>
                          {appt.status}
                        </span>
                      </div>
                      <div className="cd-meta">
                        <span><i className="bi bi-telephone"></i>{appt.patientPhone}</span>
                        <span><i className="bi bi-calendar3"></i>{appt.date}</span>
                        <span><i className="bi bi-clock"></i>{appt.time}</span>
                      </div>
                      {appt.notes && (
                        <span className="cd-note">
                          <i className="bi bi-chat-left-text me-1"></i>{appt.notes}
                        </span>
                      )}
                    </div>

                    {appt.status === 'Pending' && (
                      <div className="d-flex gap-2 flex-shrink-0">
                        <button
                          className="cd-btn cd-btn-approve"
                          onClick={() => handleApprove(appt.id)}
                          disabled={actionLoading === appt.id}
                        >
                          {actionLoading === appt.id
                            ? <span className="cd-spin">◌</span>
                            : <><i className="bi bi-check2"></i> Approve</>
                          }
                        </button>
                        <button
                          className="cd-btn cd-btn-reject"
                          onClick={() => handleReject(appt.id)}
                          disabled={actionLoading === appt.id}
                        >
                          <i className="bi bi-x"></i> Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Settings Modal */}
      <Modal show={showSettings} onHide={() => setShowSettings(false)} size="lg" scrollable className="cd-modal">
        <Modal.Header closeButton>
          <Modal.Title><i className="bi bi-gear-fill me-2"></i>Clinic Settings</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSettingsSave}>
          <Modal.Body className="p-4">
            <Row className="g-3">
              <Col md={6}>
                <label className="form-label d-block">Clinic Name *</label>
                <input type="text" className="form-control" value={settings.name || ''} placeholder="Your Clinic Name"
                  onChange={e => setSettings({ ...settings, name: e.target.value })} required />
              </Col>
              <Col md={6}>
                <label className="form-label d-block">Phone *</label>
                <input type="tel" className="form-control" value={settings.phone || ''} placeholder="+20 XXX XXX XXXX"
                  onChange={e => setSettings({ ...settings, phone: e.target.value })} required />
              </Col>
              <Col md={6}>
                <label className="form-label d-block">Address *</label>
                <input type="text" className="form-control" value={settings.address || ''} placeholder="Street, Area"
                  onChange={e => setSettings({ ...settings, address: e.target.value })} required />
              </Col>
              <Col md={6}>
                <label className="form-label d-block">Governorate *</label>
                <select className="form-select" value={settings.governorate || ''}
                  onChange={e => setSettings({ ...settings, governorate: e.target.value })} required>
                  <option value="">Select governorate</option>
                  {governorates.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </Col>
              <Col md={6}>
                <label className="form-label d-block">Working Days</label>
                <input type="text" className="form-control" value={settings.workingDays || ''} placeholder="Saturday - Thursday"
                  onChange={e => setSettings({ ...settings, workingDays: e.target.value })} />
              </Col>
              <Col md={6}>
                <label className="form-label d-block">Working Hours</label>
                <input type="text" className="form-control" value={settings.workingHours || ''} placeholder="9:00 AM - 5:00 PM"
                  onChange={e => setSettings({ ...settings, workingHours: e.target.value })} />
              </Col>
              <Col md={6}>
                <label className="form-label d-block">Booking Price (EGP)</label>
                <input type="number" className="form-control" value={settings.bookingPrice || ''} placeholder="500" min="0"
                  onChange={e => setSettings({ ...settings, bookingPrice: parseFloat(e.target.value) || undefined })} />
              </Col>
              <Col md={6}>
                <label className="form-label d-block">Facebook Page URL</label>
                <input type="url" className="form-control" value={settings.facebookPage || ''} placeholder="https://facebook.com/yourclinic"
                  onChange={e => setSettings({ ...settings, facebookPage: e.target.value })} />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="cd-btn cd-btn-ghost" onClick={() => setShowSettings(false)}>Cancel</button>
            <button type="submit" className="cd-btn cd-btn-primary">
              <i className="bi bi-save me-1"></i> Save Settings
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}