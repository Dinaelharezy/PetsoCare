

'use client'

import { useState } from 'react'
import { useStatistics } from '../hooks/useStatistics'
import UserRow from '../Cards/UserRow'
import s from '../style/statisticsStyles'

const STAT_ITEMS = (stats: ReturnType<typeof useStatistics>['stats']) => [
  { label: 'Total Users',  value: stats?.totalUsers  ?? 0, color: '#6366f1', bg: '#eef2ff', icon: '👥' },
  { label: 'Total Doses',  value: stats?.totalDoses  ?? 0, color: '#0ea5e9', bg: '#e0f2fe', icon: '💉' },
  { label: 'Taken Doses',  value: stats?.takenDoses  ?? 0, color: '#22c55e', bg: '#dcfce7', icon: '✅' },
  { label: 'Human Cases',  value: stats?.humanCases  ?? 0, color: '#6366f1', bg: '#eef2ff', icon: '🧑' },
  { label: 'Animal Cases', value: stats?.animalCases ?? 0, color: '#f59e0b', bg: '#fef3c7', icon: '🐾' },
  { label: 'Dog Cases',    value: stats?.dogCases    ?? 0, color: '#0ea5e9', bg: '#e0f2fe', icon: '🐕' },
]

function completionColor(pct: number) {
  return pct >= 70 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#ef4444'
}

function completionGradient(pct: number) {
  return pct >= 70
    ? 'linear-gradient(90deg,#86efac,#22c55e)'
    : pct >= 40
    ? 'linear-gradient(90deg,#fde68a,#f59e0b)'
    : 'linear-gradient(90deg,#fca5a5,#ef4444)'
}

export default function StatisticsCard() {
  const { users, stats, loading, completion } = useStatistics()
  const [expanded, setExpanded] = useState<string | null>(null)

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

      {loading ? (
        <div style={s.loading}>Loading statistics…</div>
      ) : (
        <>
          {/* ── Stat pills ── */}
          <div style={s.pillsRow}>
            {STAT_ITEMS(stats).map((item) => (
              <div key={item.label} style={{ ...s.pill, background: item.bg }}>
                <div style={s.pillIcon}>{item.icon}</div>
                <div style={{ ...s.pillValue, color: item.color }}>{item.value}</div>
                <div style={s.pillLabel}>{item.label}</div>
              </div>
            ))}
          </div>

          {/* ── Progress bar ── */}
          {stats && (
            <div style={s.progressSection}>
              <div style={s.progressHeader}>
                <span style={s.progressLabel}>Overall Completion Rate</span>
                <span style={{ ...s.progressPct, color: completionColor(completion) }}>
                  {completion}%
                </span>
              </div>
              <div style={s.progressTrack}>
                <div style={{ ...s.progressFill, width: `${completion}%`, background: completionGradient(completion) }} />
              </div>
            </div>
          )}

          <div style={s.divider} />

          {/* ── Users table ── */}
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
            {users.length === 0 && <div style={s.empty}>No users found.</div>}
            {users.map((user, i) => (
              <UserRow
                key={user.userId}
                user={user}
                index={i}
                isOpen={expanded === user.userId}
                onToggle={() => setExpanded(prev => prev === user.userId ? null : user.userId)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}