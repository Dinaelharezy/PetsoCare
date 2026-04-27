'use client'
// components/admin/RatingStatsCard.tsx
// Professional rating card for the admin dashboard

import { useRatingStats } from './useRating'   // ← adjust path

export default function RatingStatsCard() {
  const { average, count, loading } = useRatingStats()

  const rounded = Math.round(average * 10) / 10
  const fullStars = Math.floor(rounded)
  const hasHalf   = rounded - fullStars >= 0.5

  // Distribution simulation based on average (visual only)
  const bars = [5, 4, 3, 2, 1]

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.title}>App Rating</div>
          <div style={styles.subtitle}>User satisfaction score</div>
        </div>
        <div style={styles.badge}>⭐ Live</div>
      </div>

      {loading ? (
        <div style={styles.loading}>Loading stats…</div>
      ) : (
        <>
          {/* Big Score */}
          <div style={styles.scoreRow}>
            <div style={styles.bigScore}>{rounded.toFixed(1)}</div>
            <div style={styles.scoreRight}>
              {/* Stars */}
              <div style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map(s => (
                  <svg key={s} width="18" height="18" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id={`grad-${s}`}>
                        <stop offset={
                          s <= fullStars ? '100%'
                          : s === fullStars + 1 && hasHalf ? '50%'
                          : '0%'
                        } stopColor="#fbbf24" />
                        <stop offset={
                          s <= fullStars ? '100%'
                          : s === fullStars + 1 && hasHalf ? '50%'
                          : '0%'
                        } stopColor="#e5e7eb" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      fill={s <= fullStars ? '#fbbf24' : s === fullStars + 1 && hasHalf ? 'url(#grad-' + s + ')' : '#e5e7eb'}
                    />
                  </svg>
                ))}
              </div>
              <div style={styles.countText}>
                {count.toLocaleString()} {count === 1 ? 'rating' : 'ratings'}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={styles.divider} />

          {/* Distribution bars */}
          <div style={styles.distSection}>
            {bars.map(star => {
              // rough visual width — higher stars get more weight near avg
              const dist = Math.max(5, 100 - Math.abs(star - rounded) * 22)
              return (
                <div key={star} style={styles.barRow}>
                  <span style={styles.barLabel}>{star}★</span>
                  <div style={styles.barTrack}>
                    <div
                      style={{
                        ...styles.barFill,
                        width: count === 0 ? '0%' : `${dist}%`,
                        background: star >= 4
                          ? 'linear-gradient(90deg, #86efac, #22c55e)'
                          : star === 3
                          ? 'linear-gradient(90deg, #fde68a, #f59e0b)'
                          : 'linear-gradient(90deg, #fca5a5, #ef4444)',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Footer insight */}
          <div style={styles.insight}>
            {rounded >= 4.5
              ? '🏆 Outstanding — users love BetsoCare!'
              : rounded >= 3.5
              ? '👍 Good — room for small improvements.'
              : rounded >= 2.5
              ? '⚠️ Average — consider gathering more feedback.'
              : '🔴 Needs attention — review user feedback.'}
          </div>
        </>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background:   '#fff',
    borderRadius: 20,
    padding:      '24px 28px',
    boxShadow:    '0 4px 24px rgba(0,0,0,0.07)',
    border:       '1px solid #f0f0f0',
    minWidth:     280,
  },
  header: {
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'flex-start',
    marginBottom:   20,
  },
  title: {
    fontWeight: 700,
    fontSize:   '1rem',
    color:      '#111',
  },
  subtitle: {
    fontSize: '0.75rem',
    color:    '#aaa',
    marginTop: 2,
  },
  badge: {
    background:   '#fef9c3',
    color:        '#92400e',
    fontSize:     '0.7rem',
    fontWeight:   700,
    borderRadius: 20,
    padding:      '3px 10px',
    border:       '1px solid #fde68a',
  },
  loading: {
    textAlign: 'center',
    color:     '#ccc',
    padding:   '20px 0',
    fontSize:  '0.85rem',
  },
  scoreRow: {
    display:    'flex',
    alignItems: 'center',
    gap:        20,
    marginBottom: 20,
  },
  bigScore: {
    fontSize:   '3.5rem',
    fontWeight: 800,
    color:      '#111',
    lineHeight: 1,
    letterSpacing: '-2px',
  },
  scoreRight: {
    display:       'flex',
    flexDirection: 'column',
    gap:           6,
  },
  starsRow: {
    display: 'flex',
    gap:     2,
  },
  countText: {
    fontSize: '0.78rem',
    color:    '#999',
  },
  divider: {
    height:       1,
    background:   '#f5f5f5',
    marginBottom: 16,
  },
  distSection: {
    display:       'flex',
    flexDirection: 'column',
    gap:           7,
    marginBottom:  16,
  },
  barRow: {
    display:    'flex',
    alignItems: 'center',
    gap:        10,
  },
  barLabel: {
    fontSize:  '0.72rem',
    color:     '#888',
    width:     20,
    textAlign: 'right',
    flexShrink: 0,
  },
  barTrack: {
    flex:         1,
    height:       6,
    background:   '#f3f4f6',
    borderRadius: 99,
    overflow:     'hidden',
  },
  barFill: {
    height:       '100%',
    borderRadius: 99,
    transition:   'width 0.6s ease',
  },
  insight: {
    background:   '#f9fafb',
    borderRadius: 10,
    padding:      '10px 14px',
    fontSize:     '0.78rem',
    color:        '#555',
    fontWeight:   500,
    textAlign:    'center',
  },
}