
import { useEffect, useState } from 'react'

export const useAppointment = (clinicId: string) => {
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [loadingTimes, setLoadingTimes] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [booking, setBooking] = useState(false)
  const [error, setError] = useState('')

  // dates
  useEffect(() => {
    const days: string[] = []
    const today = new Date()
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      days.push(d.toISOString().split('T')[0])
    }
    setAvailableDates(days)
    setSelectedDate(days[0])
  }, [])

  // times
  useEffect(() => {
    if (!selectedDate || !clinicId) return

    const fetchTimes = async () => {
      setLoadingTimes(true)
      try {
        const res = await fetch(`/api/Appointment/${clinicId}/available-times?date=${selectedDate}`)
        const data = await res.json()
        setAvailableTimes(data)
      } catch {
        setAvailableTimes([])
      } finally {
        setLoadingTimes(false)
      }
    }

    fetchTimes()
  }, [selectedDate, clinicId])

  return {
    availableDates,
    availableTimes,
    setAvailableTimes,   
    loadingTimes,
    setLoadingTimes,     
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    customerName,
    setCustomerName,
    phone,
    setPhone,
    booking,
    setBooking,
    error,
    setError,
  }
}