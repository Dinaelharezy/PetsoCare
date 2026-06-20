import type { MapLocation } from '../../types/MapLocation'
import { TYPE_COLORS, FILTER_LABELS } from '../../types/MapLocation'

type Props = {
  location:  MapLocation
  onClose:   () => void
}

function SeverityBadge({ severity }: { severity: string }) {
  const sv        = severity.toLowerCase()
  const bg        = sv === 'superficial' ? '#fef9c3' : sv === 'deep' || sv === 'moderate' ? '#ffedd5' : '#fee2e2'
  const fg        = sv === 'superficial' ? '#854d0e' : sv === 'deep' || sv === 'moderate' ? '#9a3412' : '#7f1d1d'
  const dotColor  = sv === 'superficial' ? '#facc15' : sv === 'deep' || sv === 'moderate' ? '#f97316' : '#dc2626'
  const label     =
    sv === 'superficial' ? 'Superficial' :
    sv === 'deep'        ? 'Deep'        :
    sv === 'moderate'    ? 'Moderate'    :
    sv === 'severe'      ? 'Severe'      : severity

  return (
    <p className="mb-1 small d-flex align-items-center gap-2">
      <span>⚠️ Severity:</span>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '2px 10px', borderRadius: 12,
        background: bg, color: fg, fontWeight: 700, fontSize: 11,
      }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: dotColor, display: 'inline-block' }} />
        {label}
      </span>
    </p>
  )
}

function SymptomsRow({ symptoms }: { symptoms: any }) {
  try {
    const parsed: string[] = typeof symptoms === 'string' ? JSON.parse(symptoms) : symptoms
    if (Array.isArray(parsed) && parsed.length > 0)
      return <p className="mb-1 small">🔍 {parsed.join(', ')}</p>
  } catch {}
  return null
}

export default function SelectedLocationCard({ location, onClose }: Props) {
  const { extra } = location
  const color     = (TYPE_COLORS as any)[location.type] ?? '#666'

  return (
    <div className="card mt-4 p-3">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <span style={{
            display: 'inline-block', padding: '2px 10px', borderRadius: 12,
            background: color + '22', color,
            fontSize: 11, fontWeight: 700, marginBottom: 6,
          }}>
            {(FILTER_LABELS as any)[location.type]}
          </span>
          <h5 className="mb-1">{location.name}</h5>
        </div>
        <button
          onClick={onClose}
          style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}
        >×</button>
      </div>

      {location.address          && <p className="mb-1 text-muted small">📍 {location.address}</p>}
      {extra?.reporterName       && <p className="mb-1 small">👤 {extra.reporterName}</p>}
      {extra?.phone              && <p className="mb-1 small">📞 {extra.phone}</p>}
      {extra?.reportType         && <p className="mb-1 small">📋 {extra.reportType}</p>}
      {extra?.animalType         && <p className="mb-1 small">🐾 {extra.animalType}</p>}
      {extra?.exposureDateTime   && <p className="mb-1 small">🕐 {new Date(extra.exposureDateTime).toLocaleString()}</p>}
      {extra?.severity           && <SeverityBadge severity={extra.severity} />}
      {extra?.symptoms           && <SymptomsRow symptoms={extra.symptoms} />}
      {extra?.hours              && <p className="mb-1 small">🕐 {extra.hours}</p>}
      {extra?.price              && <p className="mb-1 small">💰 {extra.price} EGP</p>}
      {extra?.statusText         && <p className="mb-1 small">🏷 Status: {extra.statusText}</p>}
    </div>
  )
}