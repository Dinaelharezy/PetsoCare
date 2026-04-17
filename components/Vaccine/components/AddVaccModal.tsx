'use client'
// components/AddVaccineModal.tsx

import { useState, ChangeEvent, FormEvent } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { CreateVaccineDto } from '../hooks/useVaccine'

interface Props {
  show: boolean
  onClose: () => void
  onSubmit: (dto: CreateVaccineDto) => Promise<boolean>
  submitting: boolean
}

export default function AddVaccineModal({ show, onClose, onSubmit, submitting }: Props) {
  const [name, setName]         = useState('')
  const [pet, setPet]           = useState('')
  const [date, setDate]         = useState('')
  const [reminder, setReminder] = useState(false)
  const [err, setErr]           = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErr('')
    if (!name || !pet || !date) {
      setErr('Please fill in all fields.')
      return
    }
    const ok = await onSubmit({ name, pet, date, reminder })
    if (ok) {
      setName(''); setPet(''); setDate(''); setReminder(false)
      onClose()
    }
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Add Vaccine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {err && <Alert variant="danger" className="py-2">{err}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="text-muted small fw-semibold text-uppercase">Vaccine Name</Form.Label>
            <Form.Control
              placeholder="e.g. Rabies Booster"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-muted small fw-semibold text-uppercase">Name</Form.Label>
            <Form.Control
              placeholder="e.g. Moly"
              value={pet}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPet(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-muted small fw-semibold text-uppercase">Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check
              type="switch"
              label="Enable Reminder"
              checked={reminder}
              onChange={() => setReminder(p => !p)}
              style={{ cursor: 'pointer' }}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="light" className="border" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              style={{ backgroundColor: '#8ae68d', border: 'none', color: '#333', fontWeight: 600 }}
            >
              {submitting ? 'Adding…' : 'Add Vaccine'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}