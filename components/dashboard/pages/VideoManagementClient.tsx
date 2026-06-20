

'use client'

import { Container, Row, Card, Button, Alert } from 'react-bootstrap'
import { useVideoManagement } from '../hooks/useVideoManagement'
import VideoCard        from '../Cards/VideoCard'
import VideoFormModal   from '../Modals/Videoformmodal'
import DeleteConfirmModal from '../Modals/DeleteConfirmModal'

// ── YouTube helpers (pure, no state) ─────────────────────────────────────
const getYoutubeId = (url: string): string | null => {
  const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&?/\s]+)/)
  return match ? match[1] : null
}

const getThumbnailUrl = (url: string): string | null => {
  const id = getYoutubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null
}

export default function VideoManagementClient() {
  const {
    videos, loading, successMessage, setSuccessMessage,
    showModal, editingVideo, error, formData,
    openModal, closeModal, handleInputChange, handleSubmit,
    showDeleteConfirm, cancelDelete, confirmDelete, handleDeleteClick,
  } = useVideoManagement()

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    )
  }

  return (
    <Container fluid className="px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="page-title">🎬 Video Management</h1>
        <Button className="background-for-app" onClick={() => openModal()}>
          <i className="bi bi-plus-circle me-2" />
          Add New Video
        </Button>
      </div>

      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      <Row className="g-4">
        {videos.map(video => (
          <VideoCard
            key={video.id}
            video={video}
            getThumbnailUrl={getThumbnailUrl}
            onEdit={openModal}
            onDelete={handleDeleteClick}
          />
        ))}
      </Row>

      {videos.length === 0 && (
        <Card className="animate-card">
          <Card.Body className="text-center text-muted py-5">
            <i className="bi bi-camera-reels" style={{ fontSize: '48px' }} />
            <p className="mt-3">No videos found. Add your first video!</p>
          </Card.Body>
        </Card>
      )}

      <VideoFormModal
        show={showModal}
        editingVideo={editingVideo}
        formData={formData}
        error={error}
        onHide={closeModal}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmModal
        show={showDeleteConfirm}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />

      <style jsx>{`
        .animate-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .animate-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.12); }
        .background-for-app {
          background: linear-gradient(135deg, rgb(173,241,120) 0%, #8bc34a 100%);
          border: none; color: #1a3a00; font-weight: 600;
        }
        .background-for-app:hover {
          background: linear-gradient(135deg, #8bc34a 0%, rgb(173,241,120) 100%);
          transform: scale(1.02);
        }
      `}</style>
    </Container>
  )
}