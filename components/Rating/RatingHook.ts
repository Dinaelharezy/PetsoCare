// hooks/useRatingModal.ts
'use client'

import { useState, useEffect, useCallback } from 'react'

type TriggerType = 'booking' | 'report' | 'vaccination'

interface RatingState {
  bookings: number
  reports: number
  vaccinations: number
  lastRatingTime: number | null
  pendingTrigger: TriggerType | null
}

export function useRatingModal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [triggerAction, setTriggerAction] = useState<TriggerType>('booking')
  const [ratingState, setRatingState] = useState<RatingState>({
    bookings: 0,
    reports: 0,
    vaccinations: 0,
    lastRatingTime: null,
    pendingTrigger: null,
  })

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('petsoCareRatingState')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setRatingState(parsed)
      } catch (e) {
        console.error('Failed to load rating state', e)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('petsoCareRatingState', JSON.stringify(ratingState))
  }, [ratingState])

  // Check if modal should appear after an action
  const checkAndShowModal = useCallback(
    (action: TriggerType) => {
      const now = Date.now()
      const THREE_HOURS = 3 * 60 * 60 * 1000 // 3 hours cooldown

      // Don't show if last rating was less than 3 hours ago
      if (ratingState.lastRatingTime && now - ratingState.lastRatingTime < THREE_HOURS) {
        console.log('Rating modal cooldown active')
        return false
      }

      let shouldShow = false
      let newState = { ...ratingState }

      switch (action) {
        case 'booking':
          newState.bookings += 1
          // Show after every booking
          shouldShow = true
          break
        case 'report':
          newState.reports += 1
          // Show after every report
          shouldShow = true
          break
        case 'vaccination':
          newState.vaccinations += 1
          // Show after 3 vaccinations
          if (newState.vaccinations >= 3) {
            shouldShow = true
            newState.vaccinations = 0 // Reset counter
          }
          break
      }

      setRatingState(newState)

      if (shouldShow) {
        setTriggerAction(action)
        setIsModalOpen(true)
        return true
      }

      return false
    },
    [ratingState]
  )

  // Handle rating submission
  const submitRating = useCallback(
    async (rating: number, feedback: string) => {
      // Here you would send the rating to your backend
      console.log({
        action: triggerAction,
        rating,
        feedback,
        timestamp: new Date().toISOString(),
      })

      // Update last rating time
      setRatingState((prev) => ({
        ...prev,
        lastRatingTime: Date.now(),
        pendingTrigger: null,
      }))

      // Optionally send to an API endpoint
      try {
        await fetch('/api/ratings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: triggerAction,
            rating,
            feedback,
          }),
        })
      } catch (error) {
        console.error('Failed to submit rating', error)
      }
    },
    [triggerAction]
  )

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return {
    isModalOpen,
    triggerAction,
    checkAndShowModal,
    submitRating,
    closeModal,
    ratingState, // Exposed for debugging
  }
}