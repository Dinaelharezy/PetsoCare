'use client'
import { useEffect } from 'react'

export function useCheckDanger() {
  useEffect(() => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          await fetch('/api/user-location/check-danger', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude }),
          })
          // الـ backend بيبعت الـ notification تلقائي
          // الـ NotificationBell هيلاقيها لما يـ poll
        } catch (e) {
          console.error('check-danger failed', e)
        }
      },
      (err) => console.warn('Geolocation denied:', err)
    )
  }, [])
}