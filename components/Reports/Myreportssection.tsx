'use client'

import { useState } from 'react'
import { Report, ReportType, ReportStatus } from '../../types/report'

// ── helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ReportStatus, { label: string; color: string; bg: string; dot: string }> = {
  Pending:    { label: 'Pending',     color: '#92693a', bg: '#fef3e2', dot: '#f59e0b' },
  Seen:       { label: 'Seen',        color: '#3a5f8a', bg: '#e8f1fb', dot: '#3b82f6' },
  Approved:   { label: 'Approved',    color: '#2d6a4f', bg: '#e8f8f0', dot: '#10b981' },
  InProgress: { label: 'In Progress', color: '#5b3a8a', bg: '#f3eeff', dot: '#8b5cf6' },
  Done:       { label: 'Done',        color: '#1e4d3a', bg: '#d1fae5', dot: '#059669' },
  Rejected:   { label: 'Rejected',    color: '#7a2525', bg: '#fde8e8', dot: '#ef4444' },
}

const TYPE_CONFIG: Record<ReportType, { label: string; icon: string; accent: string }> = {
  Bite:            { label: 'Bite Report',       icon: '🦷', accent: '#ef4444' },
  DangerousAnimal: { label: 'Dangerous Animal',  icon: '⚠️', accent: '#f59e0b' },
  Complaint:       { label: 'Complaint',         icon: '📋', accent: '#6366f1' },
}

function parseJson(val?: string): string[] {
  if (!val) return []
  try { return JSON.parse(val) } catch { return [val] }
}

// ── sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ReportStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.Pending
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
      color: cfg.color, backgroundColor: cfg.bg,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
      {cfg.label}
    </span>
  )
}

function TagList({ items, color }: { items: string[]; color: string }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
      {items.map((item, i) => (
        <span key={i} style={{
          padding: '2px 8px', borderRadius: 12, fontSize: 11,
          background: color + '15', color: color, fontWeight: 500,
          border: `1px solid ${color}30`,
        }}>{item}</span>
      ))}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
      <span style={{ color: '#999', minWidth: 110, flexShrink: 0 }}>{label}</span>
      <span style={{ color: '#333', fontWeight: 500 }}>{value}</span>
    </div>
  )
}

function ReportDetails({ report }: { report: Report }) {
  const accent = TYPE_CONFIG[report.type]?.accent ?? '#6b7280'

  if (report.type === 'Bite' && report.biteReport) {
    const b = report.biteReport
    const bodyLocs = parseJson(b.bodyLocations)
    const actions  = parseJson(b.initialActions)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <InfoRow label="Animal Type"    value={b.animalType} />
        <InfoRow label="Exposure Type"  value={b.exposureType} />
        <InfoRow label="Severity"       value={b.severity} />
        <InfoRow label="Date & Time"    value={b.exposureDateTime ? new Date(b.exposureDateTime).toLocaleString('en-GB') : undefined} />
        <InfoRow label="City"           value={b.locationCity} />
        {bodyLocs.length > 0 && (
          <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
            <span style={{ color: '#999', minWidth: 110, flexShrink: 0 }}>Body Locations</span>
            <TagList items={bodyLocs} color={accent} />
          </div>
        )}
        {actions.length > 0 && (
          <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
            <span style={{ color: '#999', minWidth: 110, flexShrink: 0 }}>Initial Actions</span>
            <TagList items={actions} color={accent} />
          </div>
        )}
      </div>
    )
  }

  if (report.type === 'DangerousAnimal' && report.dangerousAnimalReport) {
    const d = report.dangerousAnimalReport
    const symptoms = parseJson(d.selectedSymptoms)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <InfoRow label="Animal Type"  value={d.animalType} />
        <InfoRow label="Report Date"  value={d.reportDate ? new Date(d.reportDate).toLocaleDateString('en-GB') : undefined} />
        <InfoRow label="City"         value={d.locationCity} />
        {symptoms.length > 0 && (
          <div style={{ display: 'flex', gap: 8, fontSize: 13 }}>
            <span style={{ color: '#999', minWidth: 110, flexShrink: 0 }}>Symptoms</span>
            <TagList items={symptoms} color={accent} />
          </div>
        )}
      </div>
    )
  }

  if (report.type === 'Complaint' && report.complaintReport) {
    const c = report.complaintReport
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <InfoRow label="Email"    value={c.email} />
        <InfoRow label="Subject"  value={c.subject} />
        <InfoRow label="Urgency"  value={c.urgency} />
        {c.message && (
          <div style={{ fontSize: 13 }}>
            <span style={{ color: '#999', display: 'block', marginBottom: 4 }}>Message</span>
            <p style={{ margin: 0, color: '#444', lineHeight: 1.6, background: '#f8f8f8', borderRadius: 8, padding: '8px 12px' }}>
              {c.message}
            </p>
          </div>
        )}
      </div>
    )
  }

  return null
}

function ReportCard({ report }: { report: Report }) {
  const [expanded, setExpanded] = useState(false)
  const typeCfg = TYPE_CONFIG[report.type] ?? { label: report.type, icon: '📄', accent: '#6b7280' }

  return (
    <div style={{
      border: '1px solid #eee',
      borderRadius: 12,
      overflow: 'hidden',
      transition: 'box-shadow 0.2s',
      background: '#fff',
    }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px',
        borderLeft: `3px solid ${typeCfg.accent}`,
        cursor: 'pointer',
        background: expanded ? '#fafafa' : '#fff',
      }} onClick={() => setExpanded(p => !p)}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>{typeCfg.icon}</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#222' }}>{typeCfg.label}</div>
            <div style={{ fontSize: 11, color: '#aaa' }}>#{report.id} · {report.governorate}{report.district ? `, ${report.district}` : ''}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <StatusBadge status={report.status} />
          <span style={{ fontSize: 12, color: '#bbb', transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div style={{ padding: '14px 16px', borderTop: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Common fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <InfoRow label="Name"        value={report.name} />
            <InfoRow label="Phone"       value={report.phone} />
          </div>

          {/* Type-specific details */}
          <ReportDetails report={report} />

          {/* Admin response */}
          {report.adminResponse && (
            <div style={{ marginTop: 4, padding: '10px 12px', background: '#f0f7ff', borderRadius: 8, borderLeft: '3px solid #3b82f6' }}>
              <div style={{ fontSize: 11, color: '#3b82f6', fontWeight: 600, marginBottom: 4 }}>Admin Response</div>
              <p style={{ margin: 0, fontSize: 13, color: '#334155', lineHeight: 1.6 }}>{report.adminResponse}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main exported component ───────────────────────────────────────────────────

interface MyReportsSectionProps {
  reports: Report[]
  loading: boolean
  error: string | null
}

export default function MyReportsSection({ reports, loading, error }: MyReportsSectionProps) {
  if (loading) {
    return (
      <div style={{ padding: '16px 0' }}>
        {[1, 2].map(i => (
          <div key={i} style={{
            height: 56, borderRadius: 12, background: '#f0f0f0',
            marginBottom: 8, animation: 'pulse 1.5s ease-in-out infinite',
          }} />
        ))}
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '12px 16px', borderRadius: 10, background: '#fde8e8', color: '#7a2525', fontSize: 13 }}>
        Failed to load reports: {error}
      </div>
    )
  }

  if (reports.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '24px 0', color: '#bbb', fontSize: 13 }}>
        No reports submitted yet.
      </div>
    )
  }

  return (
    <div className="vaccine-card" style={{ marginBottom: 24 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0 fw-bold specializedFont">My Reports</h5>
        <span style={{
          fontSize: 12, fontWeight: 600, padding: '3px 10px',
          borderRadius: 20, background: 'rgba(199,242,167,0.4)', color: '#2d6a4f',
        }}>
          {reports.length} total
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {reports.map(r => <ReportCard key={r.id} report={r} />)}
      </div>
    </div>
  )
}