

'use client'

import { useEffect, useState } from 'react'
import { UserVaccineData,GlobalStats } from '../../types/Statistics'
import { apiUrl } from '@/lib/api'

export default function StatisticsCard() {
  const [users,    setUsers]   = useState<UserVaccineData[]>([])
  const [stats,    setStats]   = useState<GlobalStats | null>(null)
  const [loading,  setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, statsRes] = await Promise.all([
          fetch(apiUrl(`admin/vaccine/users`)),
          fetch(apiUrl(`admin/vaccine/stats`)),
        ])
        const usersData = await usersRes.json()
const statsData = await statsRes.json()
setUsers(usersData.users || [])   
setStats(statsData || null)
      } catch (err) {
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const completion = stats && stats.totalDoses > 0
    ? Math.round((stats.takenDoses / stats.totalDoses) * 100)
    : 0

  const statItems = [
    { label: 'Total Users',      value: stats?.totalUsers      ?? 0, color: '#6366f1', bg: '#eef2ff', icon: '👥' },
    { label: 'Total Doses',      value: stats?.totalDoses      ?? 0, color: '#0ea5e9', bg: '#e0f2fe', icon: '💉' },
    { label: 'Taken Doses',      value: stats?.takenDoses      ?? 0, color: '#22c55e', bg: '#dcfce7', icon: '✅' },
    { label: 'Human Cases',      value: stats?.humanCases      ?? 0, color: '#6366f1', bg: '#eef2ff', icon: '🧑' },
    { label: 'Animal Cases',     value: stats?.animalCases     ?? 0, color: '#f59e0b', bg: '#fef3c7', icon: '🐾' },
    { label: 'Dog Cases',        value: stats?.dogCases        ?? 0, color: '#0ea5e9', bg: '#e0f2fe', icon: '🐕' },
  ]

  return (
    <div style={s.card}>

      {/* ── Header ── */}
      <div style={s.header}>
        <div>
          <div style={s.title}>Vaccine Statistics</div>
          <div style={s.subtitle}>Real-time overview of all users</div>
        </div>
        <div style={s.liveChip}>● Live</div>
      </div>

      {/* ── Stat Pills ── */}
      {loading ? (
        <div style={s.loading}>Loading statistics…</div>
      ) : (
        <>
          <div style={s.pillsRow}>
            {statItems.map((item, i) => (
              <div key={i} style={{ ...s.pill, background: item.bg }}>
                <div style={s.pillIcon}>{item.icon}</div>
                <div style={{ ...s.pillValue, color: item.color }}>{item.value}</div>
                <div style={s.pillLabel}>{item.label}</div>
              </div>
            ))}
          </div>

          {/* ── Progress ── */}
          {stats && (
            <div style={s.progressSection}>
              <div style={s.progressHeader}>
                <span style={s.progressLabel}>Overall Completion Rate</span>
                <span style={{
                  ...s.progressPct,
                  color: completion >= 70 ? '#22c55e' : completion >= 40 ? '#f59e0b' : '#ef4444',
                }}>
                  {completion}%
                </span>
              </div>
              <div style={s.progressTrack}>
                <div style={{
                  ...s.progressFill,
                  width: `${completion}%`,
                  background: completion >= 70
                    ? 'linear-gradient(90deg,#86efac,#22c55e)'
                    : completion >= 40
                    ? 'linear-gradient(90deg,#fde68a,#f59e0b)'
                    : 'linear-gradient(90deg,#fca5a5,#ef4444)',
                }} />
              </div>
            </div>
          )}

          {/* ── Divider ── */}
          <div style={s.divider} />

          {/* ── Users Table ── */}
          <div style={s.tableTitle}>📋 Users Vaccine Status</div>

          <div style={s.tableHead}>
            <span style={{ flex: 2 }}>User</span>
            <span style={{ flex: 1, textAlign: 'center' }}>Taken</span>
            <span style={{ flex: 1, textAlign: 'center' }}>Pending</span>
            <span style={{ flex: 1, textAlign: 'center' }}>Risk</span>
            <span style={{ flex: 1, textAlign: 'center' }}>RIG</span>
            <span style={{ width: 32 }} />
          </div>

          <div style={s.tableBody}>
            {users.length === 0 && (
              <div style={s.empty}>No users found.</div>
            )}
            {users.map((user, i) => {
              const isOpen = expanded === user.userId
              const pct = (user.taken + user.pending) > 0
                ? Math.round((user.taken / (user.taken + user.pending)) * 100)
                : 0

              return (
                <div key={user.userId}>
                  {/* Row */}
                  <div
                    onClick={() => setExpanded(isOpen ? null : user.userId)}
                    style={{
                      ...s.tableRow,
                      background: i % 2 === 0 ? '#fafafa' : '#fff',
                      borderBottom: isOpen ? 'none' : '1px solid #f0f0f0',
                    }}
                  >
                    {/* User */}
                    <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={s.avatar}>
                        {(user.name ?? user.userId).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={s.userName}>{user.name ?? `User #${user.userId}`}</div>
                        <div style={s.userId}>ID: {user.userId}</div>
                      </div>
                    </div>

                    {/* Taken */}
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      <span style={{ ...s.badge, background: '#dcfce7', color: '#16a34a' }}>
                        ✓ {user.taken}
                      </span>
                    </div>

                    {/* Pending */}
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      <span style={{ ...s.badge, background: '#fef9c3', color: '#92400e' }}>
                        ⏳ {user.pending}
                      </span>
                    </div>

                    {/* Risk */}
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      {user.risk ? (
                        <span style={{ ...s.badge, background: '#fee2e2', color: '#dc2626' }}>
                          ⚠️ {user.risk}
                        </span>
                      ) : (
                        <span style={{ ...s.badge, background: '#f1f5f9', color: '#64748b' }}>
                          Low
                        </span>
                      )}
                    </div>

                    {/* RIG */}
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      {user.needsRIG ? (
                        <span style={{ ...s.badge, background: '#fee2e2', color: '#dc2626' }}>RIG</span>
                      ) : (
                        <span style={{ ...s.badge, background: '#f1f5f9', color: '#94a3b8' }}>—</span>
                      )}
                    </div>

                    {/* Chevron */}
                    <div style={{
                      width: 32, textAlign: 'center', color: '#94a3b8', fontSize: 14,
                      transition: 'transform 0.2s',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}>
                      ▼
                    </div>
                  </div>

                  {/* Expanded Detail */}
                  {isOpen && (
                    <div style={s.expandedRow}>
                      <div style={s.expandedInner}>
                        <div style={s.expandLabel}>Completion</div>
                        <div style={s.expandProgressTrack}>
                          <div style={{
                            ...s.expandProgressFill,
                            width: `${pct}%`,
                            background: pct >= 70 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#ef4444',
                          }} />
                        </div>
                        <div style={s.expandPct}>{pct}%</div>
                      </div>
                      <div style={s.expandGrid}>
                        <div style={s.expandItem}>
                          <span style={s.expandKey}>User ID</span>
                          <span style={s.expandVal}>{user.userId}</span>
                        </div>
                        <div style={s.expandItem}>
                          <span style={s.expandKey}>Name</span>
                          <span style={s.expandVal}>{user.name ?? 'N/A'}</span>
                        </div>
                        <div style={s.expandItem}>
                          <span style={s.expandKey}>Doses Taken</span>
                          <span style={{ ...s.expandVal, color: '#22c55e', fontWeight: 700 }}>{user.taken}</span>
                        </div>
                        <div style={s.expandItem}>
                          <span style={s.expandKey}>Pending</span>
                          <span style={{ ...s.expandVal, color: '#f59e0b', fontWeight: 700 }}>{user.pending}</span>
                        </div>
                        <div style={s.expandItem}>
                          <span style={s.expandKey}>Risk Level</span>
                          <span style={{ ...s.expandVal, color: user.risk ? '#ef4444' : '#22c55e' }}>
                            {user.risk ?? 'Low Risk'}
                          </span>
                        </div>
                        <div style={s.expandItem}>
                          <span style={s.expandKey}>Needs RIG</span>
                          <span style={{ ...s.expandVal, color: user.needsRIG ? '#ef4444' : '#64748b' }}>
                            {user.needsRIG ? 'Yes — RIG Required' : 'No'}
                          </span>
                        </div>
                        <div style={s.expandItem}>
                          <span style={s.expandKey}>Victim Type</span>
                          <span style={s.expandVal}>{user.victimType ?? 'N/A'}</span>
                        </div>
                        <div style={s.expandItem}>
                          <span style={s.expandKey}>Animal Type</span>
                          <span style={s.expandVal}>{user.animalType ?? 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

// ── Styles ──────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  card: {
    background: '#fff',
    borderRadius: 20,
    padding: '28px 32px',
    boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
    border: '1px solid #f0f0f0',
    height: '100%',
    maxHeight: 600,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24,
  },
  title:    { fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' },
  subtitle: { fontSize: '0.75rem', color: '#94a3b8', marginTop: 3 },
  liveChip: {
    background: '#dcfce7', color: '#16a34a', fontSize: '0.7rem',
    fontWeight: 700, borderRadius: 20, padding: '3px 10px', border: '1px solid #bbf7d0',
  },
  loading:  { textAlign: 'center', color: '#94a3b8', padding: '40px 0', fontSize: '0.9rem' },
  pillsRow: { display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 },
  pill: {
    flex: '1 1 120px', borderRadius: 14, padding: '16px 12px',
    textAlign: 'center', minWidth: 100,
  },
  pillIcon:  { fontSize: 22, marginBottom: 6 },
  pillValue: { fontSize: '1.8rem', fontWeight: 800, lineHeight: 1 },
  pillLabel: { fontSize: '0.7rem', color: '#64748b', marginTop: 4, fontWeight: 500 },
  progressSection: { marginBottom: 24 },
  progressHeader:  { display: 'flex', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel:   { fontSize: '0.78rem', color: '#64748b', fontWeight: 500 },
  progressPct:     { fontSize: '0.78rem', fontWeight: 700 },
  progressTrack:   { height: 8, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' },
  progressFill:    { height: '100%', borderRadius: 99, transition: 'width 0.8s ease' },
  divider:         { height: 1, background: '#f1f5f9', margin: '4px 0 20px' },
  tableTitle:      { fontWeight: 700, fontSize: '0.875rem', color: '#0f172a', marginBottom: 12 },
  tableHead: {
    display: 'flex', alignItems: 'center', padding: '10px 16px',
    background: '#f8fafc', borderRadius: 10, marginBottom: 4,
    fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8',
    textTransform: 'uppercase', letterSpacing: '0.06em',
  },
  tableBody: { display: 'flex', flexDirection: 'column', gap: 0 },
  tableRow: {
    display: 'flex', alignItems: 'center', padding: '12px 16px',
    cursor: 'pointer', transition: 'background 0.15s', borderRadius: 0,
  },
  avatar: {
    width: 34, height: 34, borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff', fontWeight: 700, fontSize: '0.85rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  userName: { fontWeight: 600, fontSize: '0.85rem', color: '#0f172a' },
  userId:   { fontSize: '0.7rem', color: '#94a3b8' },
  badge: {
    padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem',
    fontWeight: 600, display: 'inline-block',
  },
  expandedRow: {
    background: '#f8fafc', borderBottom: '1px solid #f0f0f0',
    padding: '16px 20px', borderRadius: '0 0 10px 10px',
  },
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