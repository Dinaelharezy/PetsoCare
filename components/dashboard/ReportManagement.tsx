
'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Modal, Spinner, Table, Form, Toast, ToastContainer } from 'react-bootstrap'

type ReportStatus = 'Pending' | 'Seen' | 'Approved' | 'InProgress' | 'Done' | 'Rejected'
type ReportType   = 'Bite' | 'DangerousAnimal' | 'Complaint'

interface Report {
  id:             number
  type:           ReportType
  status:         ReportStatus
  name?:          string
  phone?:         string
  governorate?:   string
  district?:      string
  createdAt?:     string
  adminResponse?: string
  [key: string]:  any
}

// ✅ Covers C# enum as both string and integer
const mapStatus = (s: any): ReportStatus => {
  if (typeof s === 'string' && isNaN(Number(s))) {
    const map: Record<string, ReportStatus> = {
      Pending:    'Pending',
      Seen:       'Seen',
      Approved:   'Approved',
      InProgress: 'InProgress',
      Done:       'Done',
      Rejected:   'Rejected',
    }
    return map[s] ?? 'Pending'
  }
  const byIndex: Record<number, ReportStatus> = {
    0: 'Pending',
    1: 'Seen',
    2: 'Approved',
    3: 'InProgress',
    4: 'Done',
    5: 'Rejected',
  }
  return byIndex[Number(s)] ?? 'Pending'
}

// ✅ Covers C# ReportType enum as both string and integer
const mapType = (t: any): ReportType => {
  if (typeof t === 'string' && isNaN(Number(t))) {
    const map: Record<string, ReportType> = {
      Bite:            'Bite',
      DangerousAnimal: 'DangerousAnimal',
      Complaint:       'Complaint',
    }
    return map[t] ?? 'Complaint'
  }
  const byIndex: Record<number, ReportType> = {
    0: 'Bite',
    1: 'DangerousAnimal',
    2: 'Complaint',
  }
  return byIndex[Number(t)] ?? 'Complaint'
}

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

const getStatus = (s: string) =>
  STATUS_CFG[s as ReportStatus] ?? { icon: '❓', label: s, bg: '#F5F5F5', color: '#757575', border: '#E0E0E0' }

const getType = (t: string) =>
  TYPE_CFG[t as ReportType] ?? { icon: '📄', label: t }

const SKIP_FIELDS = new Set(['id', 'type', 'status', 'name', 'phone', 'governorate', 'district', 'createdAt', 'adminResponse'])

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

const INJECTED_CSS = `
  .report-mgmt .status-pill {
    display: inline-block !important;
    border-radius: 20px !important;
    padding: 3px 10px !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    white-space: nowrap !important;
    line-height: 1.5 !important;
    border-width: 1px !important;
    border-style: solid !important;
  }
`

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
                color: isActive ? cfg.color : isPast ? '#2E7D32' : '#90A4AE'
              }}>
                {cfg.icon} {cfg.label}
              </span>
              {i < steps.length - 1 && (
                <div style={{
                  width: 24, height: 3, borderRadius: 2,
                  background: isPast ? '#2E7D32' : '#ECEFF1',
                  margin: '0 2px'
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

export default function ReportManagement() {
  const [reports, setReports]             = useState<Report[]>([])
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [selected, setSelected]           = useState<Report | null>(null)
  const [filter, setFilter]               = useState<string>('All')
  const [rejectTarget, setRejectTarget]   = useState<Report | null>(null)
  const [rejectReason, setRejectReason]   = useState('')
  const [rejectLoading, setRejectLoading] = useState(false)
  const [toast, setToast]                 = useState<{ msg: string; variant: 'success' | 'danger' } | null>(null)

  const showToast = (msg: string, variant: 'success' | 'danger' = 'danger') => {
    setToast({ msg, variant })
    setTimeout(() => setToast(null), 4000)
  }

  // ✅ Always re-fetches from DB — maps enums (int or string) on arrival
  const fetchReports = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/admin/reports', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to load reports')
      const data = await res.json()
      setReports(
        Array.isArray(data)
          ? data.map((r: any) => ({
              ...r,
              status: mapStatus(r.status), // ✅ int or string → ReportStatus
              type:   mapType(r.type),     // ✅ int or string → ReportType
            }))
          : []
      )
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchReports() }, [])

  // ✅ Calls correct backend endpoint, then re-fetches
  const doAction = async (id: number, action: 'seen' | 'approve' | 'in-progress' | 'done') => {
    setActionLoading(id)
    try {
      const res = await fetch(`/api/admin/reports/${id}/${action}`, { method: 'PUT' })
      if (!res.ok) throw new Error('Action failed')
      await fetchReports()
      showToast('Report updated successfully', 'success')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'Action failed')
    } finally {
      setActionLoading(null)
    }
  }

  const doReject = async () => {
    if (!rejectTarget) return
    setRejectLoading(true)
    try {
      const res = await fetch(`/api/admin/reports/${rejectTarget.id}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rejectReason),
      })
      if (!res.ok) throw new Error('Reject failed')
      await fetchReports()
      setRejectTarget(null)
      setRejectReason('')
      setSelected(null)
      showToast('Report rejected', 'success')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'Reject failed')
    } finally {
      setRejectLoading(false)
    }
  }

  const filterOptions = ['All', 'Pending', 'Seen', 'Approved', 'Done', 'Rejected']

  const counts: Record<string, number> = {
    All:      reports.length,
    Pending:  reports.filter(r => r.status === 'Pending').length,
    Seen:     reports.filter(r => r.status === 'Seen').length,
    Approved: reports.filter(r => r.status === 'Approved' || r.status === 'InProgress').length,
    Done:     reports.filter(r => r.status === 'Done').length,
    Rejected: reports.filter(r => r.status === 'Rejected').length,
  }

  const filtered = filter === 'All'
    ? reports
    : filter === 'Approved'
      ? reports.filter(r => r.status === 'Approved' || r.status === 'InProgress')
      : reports.filter(r => r.status === filter)

  // ✅ Buttons driven by exact backend enum — no guessing
  function ActionButtons({ report, size = 'sm' }: { report: Report; size?: 'sm' | 'lg' }) {
    const busy       = actionLoading === report.id
    const isFinished = report.status === 'Done' || report.status === 'Rejected'

    if (isFinished) return <span className="text-muted" style={{ fontSize: 12 }}>Finalized</span>

    return (
      <div className="d-flex gap-2 flex-wrap">
        {/* Pending → Seen or Reject */}
        {report.status === 'Pending' && (
          <>
            <Button size={size} variant="outline-secondary" disabled={busy}
              onClick={() => doAction(report.id, 'seen')}
              style={{ fontSize: size === 'sm' ? 11 : 14 }}>
              {busy ? <Spinner size="sm" animation="border" /> : '👁️ Mark Seen'}
            </Button>
            <Button size={size} variant="outline-danger" disabled={busy}
              onClick={() => { setRejectTarget(report); setRejectReason('') }}
              style={{ fontSize: size === 'sm' ? 11 : 14 }}>
              ❌ Reject
            </Button>
          </>
        )}

        {/* Seen → Approve or Reject */}
        {report.status === 'Seen' && (
          <>
            <Button size={size} variant="outline-success" disabled={busy}
              onClick={() => doAction(report.id, 'approve')}
              style={{ fontSize: size === 'sm' ? 11 : 14 }}>
              {busy ? <Spinner size="sm" animation="border" /> : '✅ Approve'}
            </Button>
            <Button size={size} variant="outline-danger" disabled={busy}
              onClick={() => { setRejectTarget(report); setRejectReason('') }}
              style={{ fontSize: size === 'sm' ? 11 : 14 }}>
              ❌ Reject
            </Button>
          </>
        )}

        {/* Approved / InProgress → Done */}
        {(report.status === 'Approved' || report.status === 'InProgress') && (
          <Button size={size} variant="outline-success" disabled={busy}
            onClick={() => doAction(report.id, 'done')}
            style={{ fontSize: size === 'sm' ? 11 : 14 }}>
            {busy ? <Spinner size="sm" animation="border" /> : '✅ Mark Done'}
          </Button>
        )}
      </div>
    )
  }

  // ✅ Modal always reads fresh data from reports[]
  const freshSelected = selected ? (reports.find(r => r.id === selected.id) ?? selected) : null

  return (
    <div className="report-mgmt">
      <style>{INJECTED_CSS}</style>

      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast show={!!toast} bg={toast?.variant} onClose={() => setToast(null)} delay={4000} autohide>
          <Toast.Body className="text-white fw-semibold">
            {toast?.variant === 'success' ? '✅' : '❌'} {toast?.msg}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: 16 }}>
        <Card.Header className="d-flex justify-content-between align-items-center border-0" style={{
          background: 'linear-gradient(135deg, #82e594 0%, #6be72d 100%)',
          borderRadius: '16px 16px 0 0', padding: '16px 20px',
        }}>
          <div>
            <h6 className="mb-0 fw-bold text-white">📊 Report Management</h6>
            <small className="text-white-50">{reports.length} total reports</small>
          </div>
          <Button size="sm" variant="outline-light" onClick={fetchReports} disabled={loading}>
            {loading ? <Spinner size="sm" animation="border" /> : '↺'}
          </Button>
        </Card.Header>

        <Card.Body className="p-3" style={{ overflowY: 'auto', maxHeight: 500 }}>
          {/* Filter tabs */}
          <div className="d-flex gap-2 flex-wrap mb-3">
            {filterOptions.map(s => {
              const cfg    = s !== 'All' ? getStatus(s) : null
              const active = filter === s
              return (
                <button key={s} onClick={() => setFilter(s)} style={{
                  border: active ? `2px solid ${cfg?.color ?? '#1a1a2e'}` : '2px solid transparent',
                  borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer',
                  background: active ? (cfg?.bg ?? '#1a1a2e') : '#F5F5F5',
                  color: active ? (cfg?.color ?? '#fff') : '#757575',
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
                {filtered.map(r => {
                  const typeCfg = getType(r.type)
                  return (
                    <tr key={r.id}>
                      <td className="text-muted fw-bold">{r.id}</td>
                      <td>{typeCfg.icon} {typeCfg.label}</td>
                      <td>
                        <span className="fw-semibold"
                          style={{ cursor: 'pointer', color: '#1565C0', textDecoration: 'underline dotted' }}
                          onClick={() => setSelected(r)}>
                          {r.name || 'Anonymous'}
                        </span>
                      </td>
                      <td><StatusPill status={r.status} /></td>
                      <td><ActionButtons report={r} size="sm" /></td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* ── Detail Modal ── */}
      <Modal show={!!freshSelected} onHide={() => setSelected(null)} centered size="lg">
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
                  ['Submitted',   freshSelected.createdAt ? new Date(freshSelected.createdAt).toLocaleString() : '—'],
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
          {freshSelected && <ActionButtons report={freshSelected} size="lg" />}
          <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* ── Reject Modal ── */}
      <Modal show={!!rejectTarget} onHide={() => { setRejectTarget(null); setRejectReason('') }} centered>
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
          <Button variant="secondary" onClick={() => { setRejectTarget(null); setRejectReason('') }}>
            Cancel
          </Button>
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