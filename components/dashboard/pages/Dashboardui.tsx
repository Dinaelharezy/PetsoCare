'use client'

/**
 * DashboardUI.tsx
 * Shared primitives for all dashboard management pages.
 * Import from here instead of duplicating in each page.
 */

import { Alert, Button, Modal, Spinner } from 'react-bootstrap'

// ─── Flash Alert ─────────────────────────────────────────────────────────────

interface FlashAlertProps {
  message: string
  onClose: () => void
  variant?: 'success' | 'danger' | 'warning'
}

export function FlashAlert({ message, onClose, variant = 'success' }: FlashAlertProps) {
  if (!message) return null
  return (
    <Alert variant={variant} dismissible onClose={onClose} className="mb-3">
      {message}
    </Alert>
  )
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

interface DeleteModalProps {
  show: boolean
  title?: string
  description?: string
  itemName?: string
  icon?: string
  onCancel: () => void
  onConfirm: () => void
}

export function DeleteConfirmModal({
  show,
  title = 'Delete Item',
  description = 'This action cannot be undone. This will permanently remove the item.',
  itemName,
  icon = '🗑️',
  onCancel,
  onConfirm,
}: DeleteModalProps) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="text-danger mb-3">{icon} {title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-2 text-center py-3">
    
        <h5 className='mt-3'>Are you sure?</h5>
        <p className="text-muted mb-0">
          {description}
          {itemName && <strong className="d-block mt-1">"{itemName}"</strong>}
        </p>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <Button variant="light" className="border px-4" onClick={onCancel}>
          Nevermind
        </Button>
        <Button variant="danger" className="px-4" onClick={onConfirm}>
          Yes, Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

// ─── Page Header ─────────────────────────────────────────────────────────────

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: { label: string; icon?: string; onClick: () => void }
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 className="page-title mb-0">{title}</h1>
        {subtitle && <p className="text-muted small mb-0">{subtitle}</p>}
      </div>
      {action && (
        <Button className="background-for-app d-flex align-items-center gap-2" onClick={action.onClick}>
          {action.icon && <i className={action.icon} />}
          {action.label}
        </Button>
      )}
    </div>
  )
}

// ─── Loading Spinner ──────────────────────────────────────────────────────────

export function PageLoader() {
  return (
    <div className="py-5 text-center">
      <Spinner animation="border" variant="primary" role="status" />
    </div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────

interface EmptyStateProps {
  icon: string
  message: string
}

export function EmptyState({ icon, message }: EmptyStateProps) {
  return (
    <div className="text-center py-5 text-muted">
      <div style={{ fontSize: 56, marginBottom: 12 }}>{icon}</div>
      <p className="mb-0">{message}</p>
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string
  value: number | string
  icon: string
  bg: string
  color: string
}

export function StatCard({ label, value, icon, bg, color }: StatCardProps) {
  return (
    <div style={{ background: bg, borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ fontSize: 28 }}>{icon}</span>
      <div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '0.75rem', color, opacity: 0.8, marginTop: 2 }}>{label}</div>
      </div>
    </div>
  )
}