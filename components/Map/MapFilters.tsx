import type { FilterKey } from '../../types/MapLocation'
import { TYPE_COLORS, FILTER_LABELS } from '../../types/MapLocation'

type Props = {
  activeFilters: Set<FilterKey>
  loading:       boolean
  onToggle:      (type: FilterKey) => void
  onPickLocation?: () => void
}

export default function MapFilters({ activeFilters, loading, onToggle, onPickLocation }: Props) {
  return (
    <div className="d-flex gap-2 flex-wrap mb-3 align-items-center justify-content-between">
      <div className="d-flex gap-2 flex-wrap align-items-center">
        {(Object.keys(FILTER_LABELS) as FilterKey[]).map(type => {
          const active = activeFilters.has(type)
          const color  = TYPE_COLORS[type]
          return (
            <button
              key={type}
              onClick={() => onToggle(type)}
              style={{
                padding: '5px 14px', borderRadius: 20, cursor: 'pointer',
                border:     `2px solid ${color}`,
                background: active ? color : 'transparent',
                color:      active ? 'white' : color,
                fontWeight: 600, fontSize: 12, transition: 'all 0.2s',
              }}
            >
              {FILTER_LABELS[type]}
            </button>
          )
        })}
        {loading && (
          <span className="text-muted small align-self-center ms-1">⏳ Loading…</span>
        )}
      </div>

      {onPickLocation && (
        <button
          onClick={onPickLocation}
          style={{
            padding: '8px 20px', borderRadius: 20, cursor: 'pointer',
            border: '2px solid #6366f1', background: '#6366f1', color: 'white',
            fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: '0 2px 8px rgba(99,102,241,0.35)', whiteSpace: 'nowrap',
          }}
        >
          📍 Detect Location
        </button>
      )}
    </div>
  )
}