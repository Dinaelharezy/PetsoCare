
'use client'
import { useState } from 'react'
import { useRating } from './useRating'

export default function RatingWidget({ fullWidth = false }: { fullWidth?: boolean }) {
  const { submitRating, submitting, submitted, success, error } = useRating()
  const [hovered, setHovered] = useState(0)
  const [selected, setSelected] = useState(0)

  const handleClick = async (value: number) => {
    setSelected(value)
    await submitRating(value)
  }

  const labels: Record<number, string> = {
    1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent',
  }

  // ← cardStyle جوا الـ component عشان يشوف fullWidth
  const cardStyle: React.CSSProperties = {
    background:   '#fff',
    border:       '1px solid #f0f0f0',
    borderRadius: 16,
    padding:      '20px 24px',
    boxShadow:    '0 2px 12px rgba(0,0,0,0.06)',
    textAlign:    'center',
    maxWidth:     fullWidth ? '100%' : 320,
    width:        '100%',
  }

  if (success) {
    return (
      <div style={cardStyle}>
        <div style={styles.successIcon}>🎉</div>
        <div style={styles.successTitle}>Thanks for your feedback!</div>
        <div style={styles.successSub}>Your rating helps us improve BetsoCare.</div>
      </div>
    )
  }

  return (
    <div style={cardStyle}>
      <div style={styles.header}>
        <span style={styles.icon}>⭐</span>
        <div>
          <div style={styles.title}>Rate Your Experience</div>
          <div style={styles.subtitle}>How was BetsoCare for you?</div>
        </div>
      </div>

      <div style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map(star => {
          const active = star <= (hovered || selected)
          return (
            <button
              key={star}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => handleClick(star)}
              disabled={submitting || submitted}
              style={{
                ...styles.starBtn,
                transform: hovered === star ? 'scale(1.25)' : 'scale(1)',
                filter: active ? 'drop-shadow(0 0 6px #fbbf24)' : 'none',
              }}
              title={labels[star]}
            >
              <svg width="32" height="32" viewBox="0 0 24 24">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={active ? '#fbbf24' : '#e5e7eb'}
                  stroke={active ? '#f59e0b' : '#d1d5db'}
                  strokeWidth="1"
                />
              </svg>
            </button>
          )
        })}
      </div>

      {(hovered || selected) > 0 && !submitted && (
        <div style={styles.label}>{labels[hovered || selected]}</div>
      )}

      {error && (
        <div style={styles.error}>
          {error.includes('24') ? '⏰ You can rate again after 24 hours.' : error}
        </div>
      )}

      {submitting && <div style={styles.submitting}>Submitting…</div>}
    </div>
  )
}

// باقي الـ styles برّا عادي — بس card اتنقلت جوا
const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, textAlign: 'left',
  },
  icon:      { fontSize: 28 },
  title:     { fontWeight: 700, fontSize: '0.95rem', color: '#111' },
  subtitle:  { fontSize: '0.78rem', color: '#999', marginTop: 2 },
  starsRow:  { display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 12 },
  starBtn:   { background: 'none', border: 'none', cursor: 'pointer', padding: 4, transition: 'transform 0.15s ease', lineHeight: 1 },
  label:     { fontSize: '0.82rem', fontWeight: 600, color: '#f59e0b', marginBottom: 8, letterSpacing: '0.02em' },
  error:     { fontSize: '0.78rem', color: '#ef4444', marginTop: 8, background: '#fff5f5', borderRadius: 8, padding: '6px 12px' },
  submitting:{ fontSize: '0.78rem', color: '#999', marginTop: 6 },
  successIcon:  { fontSize: 40, marginBottom: 8 },
  successTitle: { fontWeight: 700, fontSize: '1rem', color: '#111', marginBottom: 4 },
  successSub:   { fontSize: '0.8rem', color: '#999' },
}