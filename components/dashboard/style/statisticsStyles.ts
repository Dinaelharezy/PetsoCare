import type React from 'react'

const s: Record<string, React.CSSProperties> = {
  card: {
    background: '#fff', borderRadius: 20, padding: '28px 32px',
    boxShadow: '0 4px 32px rgba(0,0,0,0.07)', border: '1px solid #f0f0f0',
    height: '100%', maxHeight: 600, overflowY: 'auto', display: 'flex', flexDirection: 'column',
  },
  header:    { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  title:     { fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' },
  subtitle:  { fontSize: '0.75rem', color: '#94a3b8', marginTop: 3 },
  liveChip:  {
    background: '#dcfce7', color: '#16a34a', fontSize: '0.7rem',
    fontWeight: 700, borderRadius: 20, padding: '3px 10px', border: '1px solid #bbf7d0',
  },
  loading:   { textAlign: 'center', color: '#94a3b8', padding: '40px 0', fontSize: '0.9rem' },
  pillsRow:  { display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 },
  pill:      { flex: '1 1 120px', borderRadius: 14, padding: '16px 12px', textAlign: 'center', minWidth: 100 },
  pillIcon:  { fontSize: 22, marginBottom: 6 },
  pillValue: { fontSize: '1.8rem', fontWeight: 800, lineHeight: 1 },
  pillLabel: { fontSize: '0.7rem', color: '#64748b', marginTop: 4, fontWeight: 500 },

  progressSection: { marginBottom: 24 },
  progressHeader:  { display: 'flex', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel:   { fontSize: '0.78rem', color: '#64748b', fontWeight: 500 },
  progressPct:     { fontSize: '0.78rem', fontWeight: 700 },
  progressTrack:   { height: 8, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' },
  progressFill:    { height: '100%', borderRadius: 99, transition: 'width 0.8s ease' },

  divider:    { height: 1, background: '#f1f5f9', margin: '4px 0 20px' },
  tableTitle: { fontWeight: 700, fontSize: '0.875rem', color: '#0f172a', marginBottom: 12 },
  tableHead:  {
    display: 'flex', alignItems: 'center', padding: '10px 16px',
    background: '#f8fafc', borderRadius: 10, marginBottom: 4,
    fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8',
    textTransform: 'uppercase', letterSpacing: '0.06em',
  },
  tableBody:  { display: 'flex', flexDirection: 'column', gap: 0 },
  tableRow:   {
    display: 'flex', alignItems: 'center', padding: '12px 16px',
    cursor: 'pointer', transition: 'background 0.15s', borderRadius: 0,
  },
  avatar: {
    width: 34, height: 34, borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff', fontWeight: 700, fontSize: '0.85rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  userName: { fontWeight: 600, fontSize: '0.85rem', color: '#0f172a' },
  badge: {
    padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem',
    fontWeight: 600, display: 'inline-block',
  },

  expandedRow:         { background: '#f8fafc', borderBottom: '1px solid #f0f0f0', padding: '16px 20px', borderRadius: '0 0 10px 10px' },
  expandedInner:       { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 },
  expandLabel:         { fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap' },
  expandProgressTrack: { flex: 1, height: 6, background: '#e2e8f0', borderRadius: 99, overflow: 'hidden' },
  expandProgressFill:  { height: '100%', borderRadius: 99, transition: 'width 0.6s ease' },
  expandPct:           { fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' },
  expandGrid:          { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px 24px' },
  expandItem:          { display: 'flex', flexDirection: 'column', gap: 2 },
  expandKey:           { fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' },
  expandVal:           { fontSize: '0.82rem', color: '#0f172a', fontWeight: 500 },
  empty:               { textAlign: 'center', color: '#94a3b8', padding: '32px 0', fontSize: '0.85rem' },
}

export default s