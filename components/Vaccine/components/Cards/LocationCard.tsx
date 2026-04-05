// import { useVaccLocations} from "./hooks/useVaccLocations";

export default function LocationCard({
  loc,
  type,
}: {
  loc: any; 
  type: 'animal' | 'human';
}) {
  const accentColor = type === 'animal' ? '#198754' : '#0d6efd'
  const lightBg = type === 'animal' ? '#f0fff4' : '#f0f4ff'

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e9ecef',
        borderLeft: `4px solid ${accentColor}`,
        borderRadius: '10px',
        padding: '18px 20px',
        boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
      }}
    >
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
        <div>
          <div className="fw-bold" style={{ fontSize: '1rem' }}>
            🏥 {loc.name}
          </div>
          <div className="text-muted small mt-1">📍 {loc.address}</div>
          {loc.phone && (
            <div className="small mt-1">📞 {loc.phone}</div>
          )}
          {loc.hours && (
            <div className="small mt-1">🕐 {loc.hours}</div>
          )}
          <div className="small mt-1">
            <span
              style={{
                background: lightBg,
                color: accentColor,
                borderRadius: '6px',
                padding: '2px 8px',
                fontWeight: 500,
              }}
            >
              🩺 {loc.services}
            </span>
          </div>
        </div>
      </div>

      {loc.note && (
        <div
          className="small text-muted mt-2"
          style={{
            background: '#f8f9fa',
            borderRadius: '6px',
            padding: '8px 10px',
          }}
        >
          ℹ️ {loc.note}
        </div>
      )}

      {'isInquiryOnly' in loc && loc.isInquiryOnly ? null : (
        <div className="d-flex gap-2 mt-3">
          {loc.phone && (
            <a
              href={`tel:${loc.phone}`}
              style={{
                background: type === 'animal' ? '#198754' : '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 18px',
                fontWeight: 600,
                fontSize: '0.875rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'filter 0.15s',
              }}
              onMouseOver={e => (e.currentTarget.style.filter = 'brightness(0.88)')}
              onMouseOut={e => (e.currentTarget.style.filter = 'none')}
            >
              📞 Call Now
            </a>
          )}
          <button
            style={{
              background: '#fff',
              color: '#333',
              border: '1px solid #dee2e6',
              borderRadius: '8px',
              padding: '8px 18px',
              fontWeight: 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
            onClick={() => alert('Map view coming soon')}
          >
            🗺 View on Map
          </button>
        </div>
      )}
    </div>
  )
}
