// components/Vaccine/components/EditVaccineModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { Vaccine } from '../../../types/Vaccine';

interface Props {
  show: boolean;
  vaccine: Vaccine | null;
  onClose: () => void;
  onUpdate: (id: string, date: string, reminder: boolean) => Promise<boolean>;
  submitting: boolean;
}

export default function EditVaccineModal({ show, vaccine, onClose, onUpdate, submitting }: Props) {
  const [startDate, setStartDate] = useState('');
  const [reminder, setReminder] = useState(false);
  const [err, setErr] = useState('');

  
  useEffect(() => {
    if (show && vaccine) {
      setStartDate(vaccine.startDate ? vaccine.startDate.split('T')[0] : '');
      setReminder(vaccine.reminder || false);
      setErr('');
    }
  }, [show, vaccine]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    
    if (!vaccine) return;
    if (!startDate) {
      setErr('Please select a date.');
      return;
    }

    const success = await onUpdate(vaccine.id, new Date(startDate).toISOString(), reminder);
    if (success) onClose();
  };

  if (!vaccine) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Edit Vaccine: {vaccine.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {err && <Alert variant="danger">{err}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          {/* معلومات ثابتة للعرض فقط */}
          <div className="mb-3 p-2 bg-light rounded">
            <div><strong>Name:</strong> {vaccine.pet}</div>
            <div><strong>Type:</strong> {vaccine.vaccineType || 'N/A'}</div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label className="text-muted small fw-semibold text-uppercase">
              Next Dose Date 
            </Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check
              type="switch"
              label="Enable Reminder"
              checked={reminder}
              onChange={() => setReminder(!reminder)}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="light" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting} className="background-for-app">
              {submitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}