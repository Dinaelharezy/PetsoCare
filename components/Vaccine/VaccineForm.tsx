'use client'

import { useState } from 'react'
import { Form } from 'react-bootstrap'

interface AddVaccineFormProps {
  onAddVaccine: (vaccine: {
    pet: string
    name: string
    date: Date
    reminder: boolean
    completed: boolean
  }) => void
}

export default function AddVaccineForm({ onAddVaccine }: AddVaccineFormProps) {
  const [pet, setPet] = useState('')
  const [vaccineName, setVaccineName] = useState('')
  const [vaccineDate, setVaccineDate] = useState('')
  const [reminder, setReminder] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!pet || !vaccineName || !vaccineDate) {
      return
    }

    onAddVaccine({
      pet,
      name: vaccineName,
      date: new Date(vaccineDate),
      reminder,
      completed: false
    })

    // Reset form
    setPet('')
    setVaccineName('')
    setVaccineDate('')
    setReminder(false)
  }

  return (
    <div className="add-vaccine-card">
      <h2 className="card-title">Add New Vaccine</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="form-label">Select Pet</Form.Label>
          <Form.Select
            value={pet}
            onChange={(e) => setPet(e.target.value)}
            className="form-select"
          >
            <option value="">Choose a pet...</option>
            <option value="Buddy">Buddy</option>
            <option value="Whiskers">Whiskers</option>
            <option value="Max">Max</option>
            <option value="Luna">Luna</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="form-label">Vaccine Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., Rabies"
            value={vaccineName}
            onChange={(e) => setVaccineName(e.target.value)}
            className="form-control"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="form-label">Vaccine Date</Form.Label>
          <Form.Control
            type="date"
            value={vaccineDate}
            onChange={(e) => setVaccineDate(e.target.value)}
            className="form-control"
          />
        </Form.Group>

        <div className="reminder-checkbox">
          <Form.Check
            type="checkbox"
            id="reminder-checkbox"
            checked={reminder}
            onChange={(e) => setReminder(e.target.checked)}
          />
          <Form.Label htmlFor="reminder-checkbox" className="mb-0">
            Set Reminder
          </Form.Label>
        </div>

        <button type="submit" className="btn-add-vaccine">
          Add Vaccine
        </button>
      </Form>
    </div>
  )
}