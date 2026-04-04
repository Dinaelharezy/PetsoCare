import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { clinicsApi } from '../../../data/api/Clinic'
import { Clinic } from '../../../types/Clinic'
import { Review } from '../../../types/Review'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

// ── Helpers ───────────────────────────────────────────────────────────────────
export const getImageSrc = (src?: string): string | null => {
  if (!src) return null
  if (src.startsWith('http')) return src
  if (src.startsWith('/')) return `${BASE_URL}${src}`
  return null
}

export const getCurrentUserName = (): string => 'Aisha Sayed'

const REVIEWS_KEY = 'vet_clinic_reviews'

const getStoredReviews = (vetId: string): Review[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(`${REVIEWS_KEY}_${vetId}`)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveReview = (vetId: string, review: Review): void => {
  if (typeof window === 'undefined') return
  const existing = getStoredReviews(vetId)
  localStorage.setItem(`${REVIEWS_KEY}_${vetId}`, JSON.stringify([review, ...existing]))
}

export const parseWorkingDays = (workingDays?: string): { label: string; day: string }[] => {
  if (!workingDays) return []

  const dayMap: Record<string, string> = {
    Saturday: 'Sat', Sunday: 'Sun', Monday: 'Mon',
    Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri',
  }
  const allDays = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  if (workingDays.includes('-')) {
    const [start, end] = workingDays.split('-')
    const startIdx = allDays.indexOf(start.trim())
    const endIdx   = allDays.indexOf(end.trim())
    if (startIdx === -1 || endIdx === -1) return []
    const range = startIdx <= endIdx
      ? allDays.slice(startIdx, endIdx + 1)
      : [...allDays.slice(startIdx), ...allDays.slice(0, endIdx + 1)]
    return range.map(d => ({ label: dayMap[d] ?? d, day: d }))
  }

  return workingDays.split(',').map(d => ({
    label: dayMap[d.trim()] ?? d.trim(),
    day: d.trim(),
  }))
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useDoctorProfile() {
  const params = useParams()
  const router = useRouter()

  const [clinic, setClinic]           = useState<Clinic | null>(null)
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState('')

  const [allReviews, setAllReviews]         = useState<Review[]>([])
  const [newComment, setNewComment]         = useState('')
  const [newRating, setNewRating]           = useState(5)
  const [hoverRating, setHoverRating]       = useState(0)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const weekDays = parseWorkingDays(clinic?.workingDays)

  // ── Fetch clinic ─────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchClinic = async () => {
      if (!params?.id) return
      try {
        setLoading(true)
        const data = await clinicsApi.getById(params.id as string)
        if (!data) { setError('Clinic not found'); return }
        setClinic(data)
        setAllReviews(getStoredReviews(params.id as string))
      } catch {
        setError('Failed to load clinic profile')
      } finally {
        setLoading(false)
      }
    }

    fetchClinic()
    window.addEventListener('clinicsUpdated', fetchClinic)
    return () => window.removeEventListener('clinicsUpdated', fetchClinic)
  }, [params?.id])

  // ── Set default selected date ─────────────────────────────────────────────
  useEffect(() => {
    if (clinic?.workingDays) {
      const days = parseWorkingDays(clinic.workingDays)
      if (days.length > 0) setSelectedDate(days[0].day)
    }
  }, [clinic])

  // ── Submit review ─────────────────────────────────────────────────────────
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !params?.id) return

    const review: Review = {
      name:    getCurrentUserName(),
      rating:  newRating,
      date:    new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      comment: newComment.trim(),
    }

    saveReview(params.id as string, review)
    setAllReviews(prev => [review, ...prev])
    setNewComment('')
    setNewRating(5)
    setReviewSubmitted(true)
    setTimeout(() => setReviewSubmitted(false), 3000)
  }

  // ── Confirm appointment ───────────────────────────────────────────────────
  const handleConfirmAppointment = () => {
    if (selectedDate) {
      alert(`Appointment confirmed with ${clinic?.name} on ${selectedDate}`)
      window.dispatchEvent(new CustomEvent('newAppointment', {
        detail: { clinicName: clinic?.name, patientName: getCurrentUserName(), date: selectedDate },
      }))
    }
  }

  return {
    // data
    clinic,
    loading,
    error,
    weekDays,
    // date
    selectedDate,
    setSelectedDate,
    // reviews
    allReviews,
    newComment,
    setNewComment,
    newRating,
    setNewRating,
    hoverRating,
    setHoverRating,
    reviewSubmitted,
    handleSubmitReview,
    // appointment
    handleConfirmAppointment,
    // nav
    router,
  }
}