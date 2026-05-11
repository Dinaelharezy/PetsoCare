// 'use client'
// // hooks/useNotification.ts
// // Drop this file in the same hooks folder as useVaccine.ts

// import { useState, useCallback, useEffect } from 'react'

// export interface AppNotification {
//   id: number
//   userId: number
//   title: string
//   message: string
//   isRead: boolean
//   createdAt: string
// }

// export function useNotification() {
//   const [notifications, setNotifications] = useState<AppNotification[]>([])
//   const [unreadCount,   setUnreadCount]   = useState(0)
//   const [loading,       setLoading]       = useState(false)

//   // ── GET /api/Notification ──
//   const fetchNotifications = useCallback(async () => {
//     setLoading(true)
//     try {
//       const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Notification`)
//       const text = await res.text()
//       const data = text ? JSON.parse(text) : []
//       if (res.ok) setNotifications(Array.isArray(data) ? data : [])
//     } catch (e) {
//       console.error('Failed to fetch notifications', e)
//     } finally {
//       setLoading(false)
//     }
//   }, [])

//   // ── GET /api/Notification/unread-count ──
//   const fetchUnreadCount = useCallback(async () => {
//     try {
//       const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Notification/unread-count`)
//       const text = await res.text()
//       const data = text ? JSON.parse(text) : 0
//       if (res.ok) setUnreadCount(typeof data === 'number' ? data : 0)
//     } catch (e) {
//       console.error('Failed to fetch unread count', e)
//     }
//   }, [])

//   // ── POST /api/Notification/mark-as-read/{id} ──
//   const markAsRead = useCallback(async (id: number): Promise<boolean> => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Notification/mark-as-read/${id}`, {
//         method: 'POST',
//       })
//       if (res.ok) {
//         // optimistic update
//         setNotifications(prev =>
//           prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
//         )
//         setUnreadCount(prev => Math.max(0, prev - 1))
//         return true
//       }
//       return false
//     } catch (e) {
//       console.error('Failed to mark as read', e)
//       return false
//     }
//   }, [])

//   // ── Mark all as read ──
//   const markAllAsRead = useCallback(async () => {
//     const unread = notifications.filter(n => !n.isRead)
//     await Promise.all(unread.map(n => markAsRead(n.id)))
//   }, [notifications, markAsRead])

//   // auto-fetch on mount + poll every 60 seconds for new reminders
//   useEffect(() => {
//     fetchNotifications()
//     fetchUnreadCount()

//     const interval = setInterval(() => {
//       fetchUnreadCount()
//     }, 60_000)

//     return () => clearInterval(interval)
//   }, [fetchNotifications, fetchUnreadCount])

//   return {
//     notifications,
//     unreadCount,
//     loading,
//     refetch:      fetchNotifications,
//     markAsRead,
//     markAllAsRead,
//   }
// }

'use client'
import { useState, useCallback, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export interface AppNotification {
  id: number
  userId: number
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

export function useNotification() {
  const { data: session } = useSession()
  const token = session?.user?.accessToken

  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [unreadCount,   setUnreadCount]   = useState(0)
  const [loading,       setLoading]       = useState(false)

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  // ── GET /api/Notification ──
  const fetchNotifications = useCallback(async () => {
    if (!token) return   // ✅ متعملش request لو مفيش token
    setLoading(true)
    try {
      const res = await fetch(
        `/api/proxy/Notification`,
        { headers }
      )
      if (res.status === 401 || !res.ok) return  // ✅ متعملش redirect
      const text = await res.text()
      const data = text ? JSON.parse(text) : []
      setNotifications(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error('Failed to fetch notifications', e)
    } finally {
      setLoading(false)
    }
  }, [token])

  // ── GET /api/Notification/unread-count ──
  const fetchUnreadCount = useCallback(async () => {
    if (!token) return   // ✅ متعملش request لو مفيش token
    try {
      const res = await fetch(
        `/api/proxy/Notification/unread-count`,
        { headers }
      )
      if (res.status === 401 || !res.ok) return  // ✅ متعملش redirect
      const text = await res.text()
      const data = text ? JSON.parse(text) : 0
      setUnreadCount(typeof data === 'number' ? data : 0)
    } catch (e) {
      console.error('Failed to fetch unread count', e)
    }
  }, [token])

  // ── POST /api/Notification/mark-as-read/{id} ──
  const markAsRead = useCallback(async (id: number): Promise<boolean> => {
    if (!token) return false
    try {
      const res = await fetch(
        `/api/proxy/Notification/mark-as-read/${id}`,
        { method: 'POST', headers }
      )
      if (res.ok) {
        setNotifications(prev =>
          prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
        )
        setUnreadCount(prev => Math.max(0, prev - 1))
        return true
      }
      return false
    } catch (e) {
      console.error('Failed to mark as read', e)
      return false
    }
  }, [token])

  // ── Mark all as read ──
  const markAllAsRead = useCallback(async () => {
    const unread = notifications.filter(n => !n.isRead)
    await Promise.all(unread.map(n => markAsRead(n.id)))
  }, [notifications, markAsRead])

  // ✅ بيستنى الـ session تتحمل الأول
  useEffect(() => {
    if (!token) return

    fetchNotifications()
    fetchUnreadCount()

    const interval = setInterval(() => {
      fetchUnreadCount()
    }, 60_000)

    return () => clearInterval(interval)
  }, [token]) // ✅ بيشتغل لما الـ token يتغير

  return {
    notifications,
    unreadCount,
    loading,
    refetch:      fetchNotifications,
    markAsRead,
    markAllAsRead,
  }
}