'use client'
// components/NotificationBell.tsx
// Usage: drop <NotificationBell /> anywhere in your navbar/header

import { useState, useRef, useEffect } from 'react'
import { useNotification } from './hook/useNotification'
import { useCheckDanger } from './hook/useCheckDanger'   // ← adjust path if needed

export default function NotificationBell() {
   useCheckDanger()
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead, refetch } =
    useNotification()

  const [open, setOpen] = useState(false)
  const ref  = useRef<HTMLDivElement>(null)

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // refresh list when dropdown opens
  const toggleOpen = () => {
    if (!open) refetch()
    setOpen(p => !p)
  }

  const formatTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleString('en-GB', {
        day:    '2-digit',
        month:  'short',
        hour:   '2-digit',
        minute: '2-digit',
      })
    } catch {
      return iso
    }
  }

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {/* ── Bell button ── */}
      <button
        onClick={toggleOpen}
        title="Notifications"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          padding: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Bell SVG */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        {/* Badge */}
        {unreadCount > 0 && (
          <span style={{
            position:   'absolute',
            top:        2,
            right:      2,
            background: '#dc3545',
            color:      '#fff',
            borderRadius: '50%',
            width:      18,
            height:     18,
            fontSize:   11,
            fontWeight: 700,
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* ── Dropdown panel ── */}
      {open && (
        <div style={{
          position:    'absolute',
          top:         '110%',
          right:       0,
          width:       320,
          maxHeight:   400,
          overflowY:   'auto',
          background:  '#fff',
          border:      '1px solid #e9ecef',
          borderRadius: 12,
          boxShadow:   '0 8px 32px rgba(0,0,0,0.12)',
          zIndex:      9999,
        }}>
          {/* header */}
          <div style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            padding:        '12px 16px',
            borderBottom:   '1px solid #f0f0f0',
          }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
              🔔 Notifications
              {unreadCount > 0 && (
                <span style={{
                  marginLeft: 8,
                  background: '#dc3545',
                  color: '#fff',
                  borderRadius: 20,
                  padding: '1px 7px',
                  fontSize: 11,
                }}>
                  {unreadCount}
                </span>
              )}
            </span>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  background: 'none',
                  border:     'none',
                  color:      '#8ee570',
                  fontSize:   '0.78rem',
                  fontWeight: 600,
                  cursor:     'pointer',
                  padding:    0,
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* list */}
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#999', fontSize: '0.85rem' }}>
              Loading…
            </div>
          ) : notifications.length === 0 ? (
            <div style={{ padding: '28px 16px', textAlign: 'center', color: '#aaa', fontSize: '0.85rem' }}>
              No notifications yet 🎉
            </div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                onClick={() => !n.isRead && markAsRead(n.id)}
                style={{
                  padding:       '12px 16px',
                  borderBottom:  '1px solid #f8f9fa',
                  background:    n.isRead ? '#fff' : '#f0faf0',
                  cursor:        n.isRead ? 'default' : 'pointer',
                  transition:    'background 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: n.isRead ? 400 : 700, fontSize: '0.875rem', color: '#222', flex: 1 }}>
                    {n.title}
                  </div>
                  {!n.isRead && (
                    <span style={{
                      width: 8, height: 8,
                      borderRadius: '50%',
                      background: '#8ee570',
                      display: 'inline-block',
                      marginLeft: 8,
                      flexShrink: 0,
                      marginTop: 4,
                    }} />
                  )}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: 3 }}>
                  {n.message}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#bbb', marginTop: 5 }}>
                  {formatTime(n.createdAt)}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}