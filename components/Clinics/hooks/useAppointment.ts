
import { useEffect, useState } from 'react'

const FALLBACK_TIMES = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

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

  // generate next 7 days
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

  // fetch times when date changes, fallback to static if API fails
  useEffect(() => {
    if (!selectedDate || !clinicId) return

    const fetchTimes = async () => {
      setLoadingTimes(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Appointments/${clinicId}/available-times?date=${selectedDate}`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        const times = Array.isArray(data) ? data : data.times ?? data.data ?? []
        // لو الـ API رجع array فاضية → استخدم الـ fallback
        setAvailableTimes(times.length > 0 ? times : FALLBACK_TIMES)
      } catch {
        setAvailableTimes(FALLBACK_TIMES)
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