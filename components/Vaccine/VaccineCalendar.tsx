'use client'

import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface Vaccine {
  id: string
  pet: string
  name: string
  date: Date
  reminder: boolean
  completed: boolean
}

interface VaccineCalendarProps {
  vaccines: Vaccine[]
}

export default function VaccineCalendar({ vaccines }: VaccineCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)) // December 2025

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const hasVaccineOnDate = (day: number) => {
    return vaccines.some(vaccine => {
      const vaccineDate = new Date(vaccine.date)
      return (
        vaccineDate.getDate() === day &&
        vaccineDate.getMonth() === currentDate.getMonth() &&
        vaccineDate.getFullYear() === currentDate.getFullYear()
      )
    })
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasEvent = hasVaccineOnDate(day)
      days.push(
        <div
          key={day}
          className={`calendar-day ${hasEvent ? 'has-event' : ''}`}
        >
          {day}
        </div>
      )
    }

    return days
  }

  return (
    <div className="calendar-card">
      <h2 className="card-title">Vaccine Schedule</h2>
      
      <div className="calendar-header">
        <h3 className="calendar-month">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="calendar-nav">
          <button onClick={previousMonth} aria-label="Previous month">
            <FiChevronLeft size={20} />
          </button>
          <button onClick={nextMonth} aria-label="Next month">
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="calendar-grid">
        {dayNames.map(day => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  )
}