

'use client'
// components/AddVaccineModal.tsx

import { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { CreateVaccineDto } from '../../../types/Vaccine'

/* ── Vaccine name suggestions ───────────────────────────────────────── */
const VACCINE_SUGGESTIONS = [
  'Rabies PrEP — WHO Protocol',
  'Rabies PEP 5-Dose — WHO Protocol',
  'Rabies PEP 4-Dose — WHO Protocol',
  'Rabies PEP — Egypt Protocol (Domestic Animal)',
  'Rabies PEP — Egypt Protocol (Stray Animal)',
  'Rabies — Annual Booster (Dog)',
  'Rabies — Annual Booster (Cat)',
  'DHPP (Dog)',
  'FVRCP (Cat)',
  'Leptospirosis (Dog)',
  'Bordetella (Dog)',
  'FeLV (Cat)',
]

/* ── Exposure categories ────────────────────────────────────────────── */
const EXPOSURE_CATEGORIES = [
  { value: 'N/A',          label: 'N/A',          color: '#6c757d' },
  { value: 'Category I',   label: 'Category I',   color: '#198754' },
  { value: 'Category II',  label: 'Category II',  color: '#fd7e14' },
  { value: 'Category III', label: 'Category III', color: '#dc3545' },
]

interface Props {
  show: boolean
  onClose: () => void
  onSubmit: (dto: CreateVaccineDto) => Promise<boolean>
  submitting: boolean
}

export default function AddVaccineModal({ show, onClose, onSubmit, submitting }: Props) {
  const [name,             setName]             = useState('')
  const [pet,              setPet]              = useState('')
  const [vaccineType,      setVaccineType]      = useState('')
  const [exposureCategory, setExposureCategory] = useState('N/A')
  const [startDate,        setStartDate]        = useState('')
  const [reminder,         setReminder]         = useState(false)
  const [err,              setErr]              = useState('')

  // autocomplete
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSugs,    setShowSugs]    = useState(false)
  const sugRef = useRef<HTMLDivElement>(null)

  /* reset on open */
  useEffect(() => {
    if (show) {
      setName(''); setPet(''); setVaccineType('')
      setExposureCategory('N/A'); setStartDate('')
      setReminder(false); setErr('')
      setSuggestions([]); setShowSugs(false)
    }
  }, [show])

  /* close suggestions on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sugRef.current && !sugRef.current.contains(e.target as Node))
        setShowSugs(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  /* ── handlers ── */
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setName(val)
    const filtered = VACCINE_SUGGESTIONS.filter(s =>
      s.toLowerCase().includes(val.toLowerCase())
    )
    setSuggestions(filtered)
    setShowSugs(val.length > 0 && filtered.length > 0)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErr('')
    if (!name || !pet || !vaccineType || !startDate) {
      setErr('Please fill in all required fields.')
      return
    }
    const ok = await onSubmit({
      name,
      pet,
      vaccineType,
      exposureCategory,
      startDate: new Date(startDate).toISOString(),
      reminder,
    })
    if (ok) onClose()
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Add Vaccine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {err && <Alert variant="danger" className="py-2">{err}</Alert>}

        <Form onSubmit={handleSubmit}>

          {/* ── Vaccine Name (with autocomplete) ── */}
          <Form.Group className="mb-3" ref={sugRef as any} style={{ position: 'relative' }}>
            <Form.Label className="text-muted small fw-semibold text-uppercase">
              Vaccine Name *
            </Form.Label>
            <Form.Control
              placeholder="e.g. Rabies PEP — Egypt Protocol…"
              value={name}
              onChange={handleNameChange}
              onFocus={() => name && setShowSugs(suggestions.length > 0)}
              autoComplete="off"
            />
            {showSugs && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1050,
                background: '#fff', border: '1px solid #ddd', borderRadius: 8,
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)', maxHeight: 200, overflowY: 'auto',
              }}>
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    onMouseDown={() => { setName(s); setShowSugs(false) }}
                    style={{
                      padding: '9px 14px', fontSize: '0.875rem', cursor: 'pointer',
                      borderBottom: i < suggestions.length - 1 ? '1px solid #f5f5f5' : 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f0faf0')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </Form.Group>

          {/* ── Pet Name ── */}
          <Form.Group className="mb-3">
            <Form.Label className="text-muted small fw-semibold text-uppercase">
              Pet Name *
            </Form.Label>
            <Form.Control
              placeholder="e.g. Moly"
              value={pet}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPet(e.target.value)}
            />
          </Form.Group>

          {/* ── Vaccine Type ── */}
          <Form.Group className="mb-3">
            <Form.Label className="text-muted small fw-semibold text-uppercase">
              Vaccine Type / Brand *
            </Form.Label>
            <Form.Control
              placeholder="e.g. Verorab, HDCV…"
              value={vaccineType}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setVaccineType(e.target.value)}
            />
          </Form.Group>

          {/* ── Exposure Category ── */}
          <Form.Group className="mb-3">
            <Form.Label className="text-muted small fw-semibold text-uppercase">
              Exposure Category
            </Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {EXPOSURE_CATEGORIES.map(cat => {
                const active = exposureCategory === cat.value
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setExposureCategory(cat.value)}
                    style={{
                      padding: '5px 14px',
                      borderRadius: 20,
                      border: `2px solid ${active ? cat.color : '#dee2e6'}`,
                      background: active ? cat.color + '18' : 'transparent',
                      color: active ? cat.color : '#6c757d',
                      fontWeight: active ? 700 : 400,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </Form.Group>

          {/* ── Start Date ── */}
          <Form.Group className="mb-3">
            <Form.Label className="text-muted small fw-semibold text-uppercase">
              Start Date *
            </Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
            />
          </Form.Group>

          {/* ── Reminder ── */}
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
              className="background-for-app"
            >
              {submitting ? 'Adding…' : 'Add Vaccine'}
            </Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  )
}