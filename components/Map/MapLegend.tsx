const LEGEND_ITEMS = [
  { color: '#facc15', border: '#854d0e', label: '🟡 Caution (2–3)'  },
  { color: '#f97316', border: '#9a3412', label: '🟠 High Risk (4–6)' },
  { color: '#ef4444', border: '#7f1d1d', label: '🔴 Critical (7+)'   },
]

export default function MapLegend() {
  return (
    <div style={{
      position: 'absolute', bottom: 24, right: 12, zIndex: 999,
      background: 'rgba(255,255,255,0.95)', borderRadius: 10,
      padding: '10px 14px', boxShadow: '0 2px 12px rgba(0,0,0,.18)',
      fontSize: 12, lineHeight: 1.8, backdropFilter: 'blur(4px)',
      border: '1px solid #e5e7eb',
    }}>
      <div style={{ fontWeight: 700, color: '#374151', fontSize: 11, marginBottom: 4 }}>
        🔴 Danger Zones
      </div>
      {LEGEND_ITEMS.map(({ color, border, label }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{
            width: 14, height: 14, borderRadius: '50%',
            background: color + '40', border: `2px dashed ${border}`, flexShrink: 0,
          }} />
          <span style={{ color: '#374151' }}>{label}</span>
        </div>
      ))}
    </div>
  )
}