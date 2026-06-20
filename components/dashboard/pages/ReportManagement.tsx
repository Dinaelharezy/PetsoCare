

'use client'

import { Button, Card, Modal, Spinner, Table, Form, Toast, ToastContainer } from 'react-bootstrap'
import { Report } from '../../../types/report'
import { useReportManagement, ReportStatus, ReportType } from '../hooks/Usereportmanagement'

// ─── Config ───────────────────────────────────────────────────────────────────

const STATUS_CFG: Record<ReportStatus, { icon: string; label: string; bg: string; color: string; border: string }> = {
  Pending:    { icon: '⏳', label: 'Pending',     bg: '#FFF8E1', color: '#F57F17', border: '#FFE082' },
  Seen:       { icon: '👁️', label: 'Seen',        bg: '#F3E5F5', color: '#6A1B9A', border: '#CE93D8' },
  Approved:   { icon: '🔧', label: 'In Progress', bg: '#E3F2FD', color: '#1565C0', border: '#90CAF9' },
  InProgress: { icon: '🔧', label: 'In Progress', bg: '#E3F2FD', color: '#1565C0', border: '#90CAF9' },
  Done:       { icon: '✅', label: 'Done',        bg: '#E8F5E9', color: '#1B5E20', border: '#A5D6A7' },
  Rejected:   { icon: '❌', label: 'Rejected',    bg: '#FFEBEE', color: '#B71C1C', border: '#EF9A9A' },
}

const TYPE_CFG: Record<ReportType, { icon: string; label: string }> = {
  Bite:            { icon: '🦷', label: 'Bite'             },
  DangerousAnimal: { icon: '⚠️', label: 'Dangerous Animal' },
  Complaint:       { icon: '📋', label: 'Complaint'        },
}

const FILTER_OPTIONS = ['All', 'Pending', 'Seen', 'Approved', 'Done', 'Rejected']

const SKIP_FIELDS = new Set(['id', 'type', 'status', 'name', 'phone', 'governorate', 'district', 'createdAt', 'adminResponse'])

const INJECTED_CSS = `
  .report-mgmt .status-pill {
    display: inline-block !important;
    border-radius: 40px !important;
    padding: 3px 10px !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    white-space: nowrap !important;
    line-height: 1.5 !important;
    border-width: 1px !important;
    border-style: solid !important;
  }
`

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getStatus = (s: string) =>
  STATUS_CFG[s as ReportStatus] ?? { icon: '❓', label: s, bg: '#F5F5F5', color: '#757575', border: '#E0E0E0' }

const getType = (t: string) =>
  TYPE_CFG[t as ReportType] ?? { icon: '📄', label: t }

const formatKey = (key: string) =>
  key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim()

const formatValue = (val: any): string => {
  if (val === null || val === undefined || val === '') return '—'
  if (Array.isArray(val)) return val.length ? val.join(', ') : '—'
  if (typeof val === 'boolean') return val ? 'Yes' : 'No'
  if (typeof val === 'object') {
    return Object.entries(val)
      .filter(([, v]) => v !== null && v !== undefined && v !== '')
      .map(([k, v]) => `${formatKey(k)}: ${Array.isArray(v) ? (v as any[]).join(', ') : String(v)}`)
      .join(' · ') || '—'
  }
  if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(val))
    return new Date(val).toLocaleString()
  return String(val)
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusPill({ status }: { status: ReportStatus }) {
  const c = getStatus(status)
  return (
    <span className="status-pill" style={{ background: c.bg, color: c.color, borderColor: c.border }}>
      {c.icon} {c.label}
    </span>
  )
}

function StatusTimeline({ current }: { current: ReportStatus }) {
  const steps: ReportStatus[] = ['Pending', 'Seen', 'Approved', 'Done']
  const isRejected = current === 'Rejected'
  const currentIdx = steps.indexOf(current)

  return (
    <div className="mb-4">
      <div className="d-flex align-items-center justify-content-center gap-1 flex-wrap">
        {steps.map((s, i) => {
          const cfg      = getStatus(s)
          const isActive = s === current && !isRejected
          const isPast   = !isRejected && currentIdx > i
          return (
            <div key={s} className="d-flex align-items-center gap-1">
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isActive ? cfg.color : isPast ? '#2E7D32' : '#ECEFF1',
                color: (isActive || isPast) ? '#fff' : '#90A4AE',
                fontWeight: 800, fontSize: 15,
                boxShadow: isActive ? `0 0 0 4px ${cfg.border}` : 'none',
              }}>
                {isPast ? '✓' : i + 1}
              </div>
              <span style={{
                fontSize: 12,
                fontWeight: isActive ? 700 : 400,
                color: isActive ? cfg.color : isPast ? '#2E7D32' : '#90A4AE',
              }}>
                {cfg.icon} {cfg.label}
              </span>
              {i < steps.length - 1 && (
                <div style={{
                  width: 24, height: 3, borderRadius: 2,
                  background: isPast ? '#2E7D32' : '#ECEFF1',
                  margin: '0 2px',
                }} />
              )}
            </div>
          )
        })}
      </div>

      {isRejected && (
        <div className="d-flex align-items-center justify-content-center gap-2 mt-2">
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: STATUS_CFG.Rejected.color, color: '#fff', fontWeight: 800, fontSize: 14,
              boxShadow: `0 0 0 4px ${STATUS_CFG.Rejected.border}`,
            }}>✕</div>
            <span style={{ fontSize: 12, fontWeight: 700, color: STATUS_CFG.Rejected.color }}>❌ Rejected</span>
          </div>
        </div>
      )}
    </div>
  )
}

function FieldCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: '#F8F9FA', borderRadius: 10, padding: '10px 14px', border: '1px solid #ECEFF1' }}>
      <div style={{ fontSize: 11, color: '#90A4AE', marginBottom: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: .5 }}>
        {label}
      </div>
      <div style={{ fontWeight: 700, fontSize: 14, color: '#263238', wordBreak: 'break-word' }}>{value}</div>
    </div>
  )
}

// ─── Action Buttons ───────────────────────────────────────────────────────────

function ActionButtons({
  report,
  size = 'sm',
  actionLoading,
  doAction,
  openReject,
}: {
  report: Report
  size?: 'sm' | 'lg'
  actionLoading: number | null
  doAction: (id: number, action: any) => void
  openReject: (report: Report) => void
}) {
  const busy       = actionLoading === report.id
  const isFinished = report.status === 'Done' || report.status === 'Rejected'
  const fs         = size === 'sm' ? 11 : 14

  if (isFinished) return <span className="text-muted" style={{ fontSize: 12 }}>Finalized</span>

  return (
    <div className="d-flex gap-2 flex-wrap">
      {report.status === 'Pending' && (
        <>
          <Button size={size} variant="outline-secondary" disabled={busy} style={{ fontSize: fs }}
            onClick={() => doAction(report.id, 'seen')}>
            {busy ? <Spinner size="sm" animation="border" /> : '👁️ Mark Seen'}
          </Button>
          <Button size={size} variant="outline-danger" disabled={busy} style={{ fontSize: fs }}
            onClick={() => openReject(report)}>
            ❌ Reject
          </Button>
        </>
      )}

      {report.status === 'Seen' && (
        <>
          <Button size={size} variant="outline-success" disabled={busy} style={{ fontSize: fs }}
            onClick={() => doAction(report.id, 'approve')}>
            {busy ? <Spinner size="sm" animation="border" /> : '✅ Approve'}
          </Button>
          <Button size={size} variant="outline-danger" disabled={busy} style={{ fontSize: fs }}
            onClick={() => openReject(report)}>
            ❌ Reject
          </Button>
        </>
      )}

      {(report.status === 'Approved' || report.status === 'InProgress') && (
        <Button size={size} variant="outline-success" disabled={busy} style={{ fontSize: fs }}
          onClick={() => doAction(report.id, 'done')}>
          {busy ? <Spinner size="sm" animation="border" /> : '✅ Mark Done'}
        </Button>
      )}
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ReportManagement() {
  const {
    loading, error, filtered, counts, freshSelected,
    filter, setFilter,
    fetchReports, doAction, actionLoading,
    rejectTarget, rejectReason, rejectLoading, setRejectReason,
    openReject, cancelReject, doReject,
    setSelected,
    toast, clearToast,
  } = useReportManagement()

  return (
    <div className="report-mgmt">
      <style>{INJECTED_CSS}</style>

      {/* Toast */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast show={!!toast} bg={toast?.variant} onClose={clearToast} delay={4000} autohide>
          <Toast.Body className="text-white fw-semibold">
            {toast?.variant === 'success' ? '✅' : '❌'} {toast?.msg}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Main Card */}
      <Card className="h-100 border-0 shadow-sm">
        <Card.Header
          className="d-flex justify-content-between align-items-center border-0"
          style={{
            background: 'linear-gradient(135deg, #82e594 0%, #6be72d 100%)',
            borderRadius: '16px 16px 0 0', padding: '16px 20px',
          }}
        >
          <div>
            <h6 className="mb-0 fw-bold text-white">📊 Report Management</h6>
            <small className="text-white-50">{counts.All} total reports</small>
          </div>
          <Button size="sm" variant="outline-light" onClick={fetchReports} disabled={loading}>
            {loading ? <Spinner size="sm" animation="border" /> : '↺'}
          </Button>
        </Card.Header>

        <Card.Body className="p-3" style={{ overflowY: 'auto', maxHeight: 500 }}>
          {/* Filter tabs */}
          <div className="d-flex gap-2 flex-wrap mb-3">
            {FILTER_OPTIONS.map(s => {
              const cfg    = s !== 'All' ? getStatus(s) : null
              const active = filter === s
              return (
                <button key={s} onClick={() => setFilter(s)} style={{
                  border:     active ? `2px solid ${cfg?.color ?? '#1a1a2e'}` : '2px solid transparent',
                  borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600,
                  cursor:     'pointer',
                  background: active ? (cfg?.bg ?? '#1a1a2e') : '#F5F5F5',
                  color:      active ? (cfg?.color ?? '#fff') : '#757575',
                }}>
                  {cfg?.icon ?? '📋'} {cfg?.label ?? 'All'}
                  <span style={{ marginLeft: 4, opacity: .7 }}>({counts[s] ?? 0})</span>
                </button>
              )
            })}
          </div>

          {error && <div className="alert alert-danger py-2 small mb-3">{error}</div>}

          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="text-muted mt-2 small">Loading reports…</p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-5 text-muted">
              <div style={{ fontSize: 40 }}>📭</div>
              <p className="mt-2 small">No reports found</p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <Table hover responsive size="sm" className="align-middle mb-0" style={{ fontSize: 13 }}>
              <thead style={{ background: '#F5F5F5' }}>
                <tr>
                  <th style={{ width: 40 }}>#</th>
                  <th>Type</th>
                  <th>Reporter</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r: Report) => {
                  const typeCfg = getType(r.type)
                  return (
                    <tr key={r.id}>
                      <td className="text-muted fw-bold">{r.id}</td>
                      <td>{typeCfg.icon} {typeCfg.label}</td>
                      <td>
                        <span
                          className="fw-semibold"
                          style={{ cursor: 'pointer', color: '#1565C0', textDecoration: 'underline dotted' }}
                          onClick={() => setSelected(r)}
                        >
                          {r.name || 'Anonymous'}
                        </span>
                      </td>
                      <td><StatusPill status={r.status} /></td>
                      <td>
                        <ActionButtons
                          report={r} size="sm"
                          actionLoading={actionLoading}
                          doAction={doAction}
                          openReject={openReject}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Detail Modal */}
      <Modal show={!!freshSelected} onHide={() => setSelected(null)} centered size="lg" scrollable>
        <Modal.Header closeButton style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          color: '#fff', border: 'none',
        }}>
          <Modal.Title style={{ fontSize: 16 }}>
            {freshSelected && `Report #${freshSelected.id} — ${getType(freshSelected.type).icon} ${getType(freshSelected.type).label}`}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          {freshSelected && (
            <>
              <StatusTimeline current={freshSelected.status} />
              <div className="row g-3">
                {([
                  ['Reporter',    freshSelected.name        || '—'],
                  ['Phone',       freshSelected.phone       || '—'],
                  ['Governorate', freshSelected.governorate || '—'],
                  ['District',    freshSelected.district    || '—'],
                  ['Type',        `${getType(freshSelected.type).icon} ${getType(freshSelected.type).label}`],
                  ['Status',      `${getStatus(freshSelected.status).icon} ${getStatus(freshSelected.status).label}`],
                  ...(freshSelected.adminResponse ? [['Admin Response', freshSelected.adminResponse]] : []),
                ] as [string, string][]).map(([label, value]) => (
                  <div key={label} className="col-md-6">
                    <FieldCard label={label} value={value} />
                  </div>
                ))}

                {Object.entries(freshSelected)
                  .filter(([key]) => !SKIP_FIELDS.has(key))
                  .map(([key, val]) => {
                    if (val && typeof val === 'object' && !Array.isArray(val)) {
                      return Object.entries(val)
                        .filter(([, v]) => v !== null && v !== undefined && v !== '')
                        .map(([subKey, subVal]) => (
                          <div key={`${key}-${subKey}`} className="col-md-6">
                            <FieldCard label={formatKey(subKey)} value={formatValue(subVal)} />
                          </div>
                        ))
                    }
                    return (
                      <div key={key} className="col-md-6">
                        <FieldCard label={formatKey(key)} value={formatValue(val)} />
                      </div>
                    )
                  })}
              </div>
            </>
          )}
        </Modal.Body>

        <Modal.Footer style={{ borderTop: '1px solid #ECEFF1' }}>
          {freshSelected && (
            <ActionButtons
              report={freshSelected} size="lg"
              actionLoading={actionLoading}
              doAction={doAction}
              openReject={openReject}
            />
          )}
          <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Reject Modal */}
      <Modal show={!!rejectTarget} onHide={cancelReject} centered>
        <Modal.Header closeButton style={{ background: '#FFEBEE', border: 'none' }}>
          <Modal.Title style={{ fontSize: 16, color: '#B71C1C' }}>
            ❌ Reject Report #{rejectTarget?.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <p className="text-muted small mb-3">
            This message will be sent to the reporter to explain why their report was rejected.
          </p>
          <Form.Group>
            <Form.Label style={{ fontWeight: 600, fontSize: 13 }}>Rejection Reason</Form.Label>
            <Form.Control
              as="textarea" rows={4}
              placeholder="e.g. Insufficient information, duplicate report…"
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              style={{ fontSize: 13, resize: 'vertical' }}
            />
            <Form.Text className="text-muted">Optional — leave blank to send without a reason.</Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: '1px solid #ECEFF1' }}>
          <Button variant="secondary" onClick={cancelReject}>Cancel</Button>
          <Button variant="danger" onClick={doReject} disabled={rejectLoading}>
            {rejectLoading
              ? <><Spinner size="sm" animation="border" className="me-2" />Rejecting…</>
              : '❌ Confirm Reject'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}