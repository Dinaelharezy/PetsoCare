
'use client'

import { Row, Col, Modal } from 'react-bootstrap'
import { useDashboard } from "./hooks/useDashboard"

const STATUS_CONFIG = {
  Pending:   { color: '#F59E0B', bg: '#FEF3C7', textColor: '#78350F' },
  Approved:  { color: '#10B981', bg: '#D1FAE5', textColor: '#065F46' },
  Rejected:  { color: '#EF4444', bg: '#FEE2E2', textColor: '#991B1B' },
  Cancelled: { color: '#94A3B8', bg: '#F1F5F9', textColor: '#475569' },
}

const governorates = ['Port Said', 'Ismailia', 'Suez', 'Cairo']

// const getClinicId = (): string => {
//   return '28'
// }

export default function ClinicDashboardClient() {

  const {
    filtered, counts, loading,
    filterStatus, setFilterStatus,
    toast,
    actionLoading, loadAppointments,
    handleApprove,
    showRejectModal, setShowRejectModal, rejectReason, setRejectReason,
    openRejectModal, handleRejectConfirm,
    showSettings, setShowSettings, settings, setSettings,
    settingsLoading, handleOpenSettings, handleSettingsSave,clinicId, setClinicId
  } = useDashboard()



  return (
    <>
      <style>{`
        .cd-wrap {background: #F8FAFC; min-height: 100vh; }
        .cd-header { background:linear-gradient(135deg, #80e19f 0%, #5aec75 60%, hsl(116, 63%, 69%) 100%); padding: 2rem 1.75rem 3.75rem; position: relative; overflow: hidden; color: white; }
        .cd-header::before { content: ''; position: absolute; top: -50px; right: -50px; width: 220px; height: 220px; background: rgba(255,255,255,0.06); border-radius: 50%; }
        .cd-header::after { content: ''; position: absolute; bottom: -80px; right: 80px; width: 320px; height: 320px; background: rgba(255,255,255,0.04); border-radius: 50%; }
        .cd-header h1 { font-size: 1.65rem; font-weight: 700; letter-spacing: -0.02em; margin: 0; }
        .cd-header .subtitle { font-size: 0.82rem; opacity: 0.75; margin: 0.3rem 0 0; }
        .cd-eyebrow { font-size: 0.68rem; opacity: 0.65; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 0.2rem; }
        .cd-header-btn { background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.28); color: white; font-size: 0.78rem; font-weight: 500; padding: 0.45rem 1rem; border-radius: 8px; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 0.4rem; }
        .cd-header-btn:hover { background: rgba(255,255,255,0.24); }
        .cd-stats { padding: 0 1.5rem; margin-top: -2rem; position: relative; z-index: 10; }
        .cd-chip { background: white; border-radius: 12px; padding: 0.9rem 1rem; box-shadow: 0 4px 16px rgba(0,0,0,0.07); text-align: center; border: 1.5px solid #E2E8F0; cursor: pointer; transition: all 0.2s; }
        .cd-chip:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
        .cd-chip.active { border-color: #0D9488; box-shadow: 0 4px 20px rgba(13,148,136,0.18); }
        .cd-chip .cn { font-size: 1.6rem; font-weight: 500; line-height: 1; }
        .cd-chip .cl { font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #64748B; margin-top: 0.2rem; }
        .cd-content { padding: 1.25rem 1.5rem 2rem; }
        .cd-section-label { font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #94A3B8; }
        .cd-card { background: white; border-radius: 12px; border: 1px solid #E2E8F0; padding: 1.1rem 1.1rem 1.1rem 1.4rem; margin-bottom: 0.75rem; position: relative; overflow: hidden; transition: all 0.2s; }
        .cd-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); transform: translateY(-1px); }
        .cd-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3.5px; border-radius: 3px 0 0 3px; }
        .cd-card.Pending::before   { background: #F59E0B; }
        .cd-card.Approved::before  { background: #10B981; }
        .cd-card.Rejected::before  { background: #EF4444; }
        .cd-card.Cancelled::before { background: #94A3B8; }
        .cd-name { font-size: 0.92rem; font-weight: 600; color: #0F172A; }
        .cd-meta { font-size: 0.75rem; color: #64748B; margin-top: 0.25rem; display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .cd-meta i { margin-right: 0.2rem; }
        .cd-note { font-size: 0.73rem; color: #64748B; font-style: italic; margin-top: 0.5rem; background: #F8FAFC; padding: 0.3rem 0.6rem; border-radius: 6px; display: inline-block; }
        .cd-pill { display: inline-flex; align-items: center; gap: 0.28rem; padding: 0.18rem 0.6rem; border-radius: 20px; font-size: 0.67rem; font-weight: 600; letter-spacing: 0.03em; }
        .cd-dot { width: 5px; height: 5px; border-radius: 50%; }
        .cd-btn { padding: 0.32rem 0.8rem; border-radius: 7px; font-size: 0.73rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.18s; display: inline-flex; align-items: center; gap: 0.28rem; }
        .cd-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .cd-btn-approve { background: #D1FAE5; color: #065F46; }
        .cd-btn-approve:hover:not(:disabled) { background: #10B981; color: white; }
        .cd-btn-reject  { background: #FEE2E2; color: #991B1B; }
        .cd-btn-reject:hover:not(:disabled)  { background: #EF4444; color: white; }
        .cd-btn-ghost   { background: #F1F5F9; color: #475569; }
        .cd-btn-ghost:hover { background: #E2E8F0; }
        .cd-btn-primary { background: #0D9488; color: white; padding: 0.45rem 1.25rem; }
        .cd-btn-primary:hover { background: #0F766E; }
        .cd-btn-danger  { background: #EF4444; color: white; padding: 0.45rem 1.25rem; }
        .cd-btn-danger:hover { background: #DC2626; }
        .cd-empty { text-align: center; padding: 3rem 1rem; color: #94A3B8; }
        .cd-empty-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }
        .cd-toast { position: fixed; top: 1.25rem; left: 50%; transform: translateX(-50%); z-index: 9999; padding: 0.65rem 1.4rem; border-radius: 10px; font-size: 0.82rem; font-weight: 500; box-shadow: 0 8px 30px rgba(0,0,0,0.15); animation: cdSlide 0.25s ease; white-space: nowrap; }
        @keyframes cdSlide { from { opacity: 0; transform: translateX(-50%) translateY(-10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        .cd-toast-success { background: #065F46; color: white; }
        .cd-toast-danger  { background: #991B1B; color: white; }
        .cd-spin { animation: cdSpin 0.7s linear infinite; display: inline-block; }
        @keyframes cdSpin { to { transform: rotate(360deg); } }
        .cd-modal .modal-content { border-radius: 16px; border: none; box-shadow: 0 20px 60px rgba(0,0,0,0.14); overflow: hidden; }
        .cd-modal .modal-header { background: linear-gradient(135deg, #82cb6e, #95f586); color: white; border: none; padding: 1.25rem 1.5rem; }
        .cd-modal .modal-header .btn-close { filter: invert(1); opacity: 0.85; }
        .cd-modal .modal-title { font-size: 1rem; font-weight: 600; }
        .cd-modal label { font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: #64748B; margin-bottom: 0.35rem; }
        .cd-modal .form-control, .cd-modal .form-select { border-radius: 8px; border: 1.5px solid #E2E8F0; font-size: 0.85rem; padding: 0.55rem 0.85rem;  transition: border-color 0.2s; }
        .cd-modal .form-control:focus, .cd-modal .form-select:focus { border-color: #7be077; box-shadow: 0 0 0 3px rgba(13,148,136,0.1); }
        .cd-modal .modal-footer { border: none; padding: 1rem 1.5rem; background: #F8FAFC; }
        .cd-settings-loading { display: flex; align-items: center; justify-content: center; padding: 3rem; color: #64748B; gap: 0.75rem; font-size: 0.85rem; }
        .cd-reject-modal .modal-header { background: linear-gradient(135deg, #991B1B, #EF4444) !important; }
      `}</style>

      <div className="cd-wrap">
        {toast && (
          <div className={`cd-toast cd-toast-${toast.type}`}>
            <i className={`bi bi-${toast.type === 'success' ? 'check-circle' : 'x-circle'} me-2`}></i>
            {toast.msg}
          </div>
        )}

        <div className="cd-header">
          <div className="d-flex justify-content-between align-items-start position-relative " style={{ zIndex: 2 }}>
            <div>
              <p className="cd-eyebrow">Clinic Portal</p>
              <h1>My Dashboard</h1>
              <p className="subtitle">Manage appointments & clinic settings</p>
            </div>
            <button className="cd-header-btn" onClick={handleOpenSettings}>
              <i className="bi bi-gear-fill"></i> Settings
            </button>
          </div>
        </div>

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
                        <span className="cd-name">{appt.customerName}</span>
                        <span className="cd-pill" style={{ background: cfg.bg, color: cfg.textColor }}>
                          <span className="cd-dot" style={{ background: cfg.color }}></span>
                          {appt.status}
                        </span>
                      </div>
                      <div className="cd-meta">
                        <span><i className="bi bi-telephone"></i>{appt.phone}</span>
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
                          onClick={() => openRejectModal(appt.id)}
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

      {/* ── Reject Confirmation Modal ───────────────────────────────────────── */}
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)} centered className="cd-modal cd-reject-modal">
        <Modal.Header closeButton>
          <Modal.Title><i className="bi bi-x-circle me-2"></i>Reject Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1rem' }}>
            Are you sure you want to reject this appointment?
          </p>
          <label className="form-label d-block">
            Reason <span style={{ color: '#94A3B8', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
          </label>
          <textarea
            className="form-control"
            rows={3}
            placeholder="e.g. No available slots on this date..."
            value={rejectReason}
            onChange={e => setRejectReason(e.target.value)}
            style={{ resize: 'none' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="cd-btn cd-btn-ghost" onClick={() => setShowRejectModal(false)}>
            Cancel
          </button>
          <button type="button" className="cd-btn cd-btn-danger" onClick={handleRejectConfirm}>
            <i className="bi bi-x-circle me-1"></i> Confirm Reject
          </button>
        </Modal.Footer>
      </Modal>

      {/* ── Settings Modal ──────────────────────────────────────────────────── */}
      <Modal show={showSettings} onHide={() => setShowSettings(false)} size="lg" scrollable className="cd-modal">
        <Modal.Header closeButton>
          <Modal.Title><i className="bi bi-gear-fill me-2"></i>Clinic Settings</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSettingsSave}>
          <Modal.Body className="p-4">
            {settingsLoading ? (
              <div className="cd-settings-loading">
                <div className="spinner-border spinner-border-sm text-success" role="status" />
                Loading clinic data...
              </div>
            ) : (
              <Row className="g-3">
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
              </Row>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="cd-btn cd-btn-ghost" onClick={() => setShowSettings(false)}>Cancel</button>
            <button type="submit" className="cd-btn" style={{backgroundColor:''}} disabled={settingsLoading}>
              <i className="bi bi-save me-1"></i> Save Settings
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}