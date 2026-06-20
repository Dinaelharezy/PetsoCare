import { UserVaccineData } from '../../../types/Statistics'
import s from '../style/statisticsStyles'

type Props = {
  user:      UserVaccineData
  index:     number
  isOpen:    boolean
  onToggle:  () => void
}

// Resolve display name once — eliminates the duplication that existed in the original
function resolveDisplayName(user: UserVaccineData): { initial: string; label: string } {
  const hasName = user.userName && user.userName.trim() !== ''
  return {
    initial: (hasName ? user.userName! : String(user.userId)).charAt(0).toUpperCase(),
    label:   hasName ? user.userName! : `User #${user.userId}`,
  }
}

function progressColor(pct: number) {
  return pct >= 70 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#ef4444'
}

export default function UserRow({ user, index, isOpen, onToggle }: Props) {
  const { initial, label } = resolveDisplayName(user)
  const total = user.taken + user.pending
  const pct   = total > 0 ? Math.round((user.taken / total) * 100) : 0

  return (
    <div>
      {/* ── Collapsed row ── */}
      <div
        onClick={onToggle}
        style={{
          ...s.tableRow,
          background:   index % 2 === 0 ? '#fafafa' : '#fff',
          borderBottom: isOpen ? 'none' : '1px solid #f0f0f0',
        }}
      >
        {/* User */}
        <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={s.avatar}>{initial}</div>
          <div style={s.userName}>{label}</div>
        </div>

        {/* Taken */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{ ...s.badge, background: '#dcfce7', color: '#16a34a' }}>✓ {user.taken}</span>
        </div>

        {/* Pending */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{ ...s.badge, background: '#fef9c3', color: '#92400e' }}>⏳ {user.pending}</span>
        </div>

        {/* Risk */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          {user.risk ? (
            <span style={{ ...s.badge, background: '#fee2e2', color: '#dc2626' }}>⚠️ {user.risk}</span>
          ) : (
            <span style={{ ...s.badge, background: '#f1f5f9', color: '#64748b' }}>Low</span>
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
        }}>▼</div>
      </div>

      {/* ── Expanded detail ── */}
      {isOpen && (
        <div style={s.expandedRow}>
          <div style={s.expandedInner}>
            <div style={s.expandLabel}>Completion</div>
            <div style={s.expandProgressTrack}>
              <div style={{ ...s.expandProgressFill, width: `${pct}%`, background: progressColor(pct) }} />
            </div>
            <div style={s.expandPct}>{pct}%</div>
          </div>

          <div style={s.expandGrid}>
            {[
              { key: 'User ID',      val: user.userId,                    style: {} },
              { key: 'Name',         val: user.userName ?? 'N/A',         style: {} },
              { key: 'Doses Taken',  val: user.taken,   style: { color: '#22c55e', fontWeight: 700 } },
              { key: 'Pending',      val: user.pending, style: { color: '#f59e0b', fontWeight: 700 } },
              { key: 'Risk Level',   val: user.risk ?? 'Low Risk',        style: { color: user.risk ? '#ef4444' : '#22c55e' } },
              { key: 'Needs RIG',    val: user.needsRIG ? 'Yes — RIG Required' : 'No', style: { color: user.needsRIG ? '#ef4444' : '#64748b' } },
              { key: 'Victim Type',  val: user.victimType ?? 'N/A',       style: {} },
              { key: 'Animal Type',  val: user.animalType ?? 'N/A',       style: {} },
            ].map(({ key, val, style }) => (
              <div key={key} style={s.expandItem}>
                <span style={s.expandKey}>{key}</span>
                <span style={{ ...s.expandVal, ...style }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}