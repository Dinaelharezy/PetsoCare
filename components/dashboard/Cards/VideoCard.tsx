import { Card, Col, Badge, Button } from 'react-bootstrap'
import { Video } from '@/types/Video'

type Props = {
  video:          Video
  getThumbnailUrl: (url: string) => string | null
  onEdit:         (video: Video) => void
  onDelete:       (id: number) => void
}

export default function VideoCard({ video, getThumbnailUrl, onEdit, onDelete }: Props) {
  const thumbnailUrl = getThumbnailUrl(video.url)
  const viewUrl      = `/main/Videos/${video.id}`

  return (
    <Col lg={6} xl={4} key={video.id}>
      <Card className="animate-card h-100">
        {thumbnailUrl && (
          <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#000' }}>
            <img
              src={thumbnailUrl}
              alt={video.titleEn}
              style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
              onClick={() => window.open(viewUrl, '_blank')}
            />
            <div
              style={{
                position: 'absolute', inset: 0, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.3)', cursor: 'pointer',
              }}
              onClick={() => window.open(viewUrl, '_blank')}
            >
              <i className="bi bi-play-circle-fill" style={{ fontSize: '48px', color: 'white', opacity: 0.8 }} />
            </div>
          </div>
        )}

        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Badge bg="danger"><i className="bi bi-youtube me-1" /> YouTube</Badge>
            <Badge bg="secondary">ID: {video.id}</Badge>
          </div>

          <h5 className="card-title mb-2">{video.titleEn}</h5>

          <div className="text-muted small mb-3">
            <i className="bi bi-person me-1" /> {video.source}
            <br />
            <i className="bi bi-link-45deg me-1" />
            <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              Watch on YouTube
            </a>
          </div>

          <div className="d-flex gap-2 flex-wrap">
            <Button variant="outline-primary" size="sm" onClick={() => onEdit(video)}>
              <i className="bi bi-pencil" /> Edit
            </Button>
            <Button variant="outline-danger" size="sm" onClick={() => onDelete(video.id)}>
              <i className="bi bi-trash" /> Delete
            </Button>
            <Button variant="outline-success" size="sm" onClick={() => window.open(viewUrl, '_blank')}>
              <i className="bi bi-eye" /> View
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}