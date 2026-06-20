import { Modal, Button } from 'react-bootstrap'

type Props = {
  show:      boolean
  onCancel:  () => void
  onConfirm: () => void
}

export default function DeleteConfirmModal({ show, onCancel, onConfirm }: Props) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="text-danger mb-3">
          <i className="bi bi-exclamation-octagon-fill me-2" />
          Delete Video
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-0">
        <div className="text-center py-3">
          <div className="mb-3">
            <i className="bi bi-trash3-fill text-danger" style={{ fontSize: '4rem' }} />
          </div>
          <h5>Are you absolutely sure?</h5>
          <p className="text-muted mb-0">
            This action <strong>cannot be undone</strong>. This will permanently delete the video
            and remove all associated data from our servers.
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <Button variant="light" onClick={onCancel}>
          <i className="bi bi-arrow-left me-1" /> Nevermind
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          <i className="bi bi-trash me-1" /> Yes, Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}