import { Modal, Form, Button, Alert } from 'react-bootstrap'
import { Video } from '@/types/Video'

type Props = {
  show:         boolean
  editingVideo: Video | null
  formData:     { titleAr: string; titleEn: string; url: string; source: string }
  error:        string
  onHide:       () => void
  onChange:     (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onSubmit:     (e: React.FormEvent) => void
}

export default function VideoFormModal({ show, editingVideo, formData, error, onHide, onChange, onSubmit }: Props) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {editingVideo ? `✏️ Edit Video (ID: ${editingVideo.id})` : '➕ Add New Video'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Title (Arabic) *</Form.Label>
            <Form.Control
              type="text" name="titleAr" value={formData.titleAr}
              onChange={onChange} placeholder="العنوان بالعربية"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Title (English) *</Form.Label>
            <Form.Control
              type="text" name="titleEn" value={formData.titleEn}
              onChange={onChange} placeholder="Title in English"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Video URL *</Form.Label>
            <Form.Control
              type="url" name="url" value={formData.url}
              onChange={onChange} placeholder="https://www.youtube.com/embed/..."
            />
            <Form.Text className="text-muted">
              Use YouTube embed URL: https://www.youtube.com/embed/VIDEO_ID
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Source *</Form.Label>
            <Form.Control
              type="text" name="source" value={formData.source}
              onChange={onChange} placeholder="e.g., World Health Organization (WHO)"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button type="submit" className="background-for-app">
            {editingVideo ? '💾 Save Changes' : '➕ Add Video'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}