

'use client'

import { useState, useEffect } from 'react'
import { Video } from '@/types/Video'

export function useVideo(id: string) {
  const [video,   setVideo]   = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    // ✅ الـ early return بدون setState (بيتجنب مشكلة set-state-in-effect)
    if (!id) {
      setError('No video ID provided')
      setLoading(false)
      return
    }

    // ✅ async function جوا الـ effect (الطريقة الصح)
    async function fetchVideo() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Videos`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        const data: Video[] = await response.json()
        const found = data.find(v => String(v.id) === String(id))

        if (found) {
          setVideo(found)
        } else {
          setError('Video not found')
        }
      } catch (err) {
        console.error('Error fetching video:', err)
        setError('Failed to load video')
      } finally {
        setLoading(false)
      }
    }

    fetchVideo()
  }, [id])

  return { video, loading, error }
}