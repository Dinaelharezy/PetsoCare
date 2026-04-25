'use client'

import { useRouter } from 'next/navigation'
import { Container, Spinner } from 'react-bootstrap'
import VideoDetailClient from './VideoDetailClient'
import { useVideo } from './hooks/useVideo'

export default function VideoFetching({ id }: { id: string }) {
  const router = useRouter()
  const { video, loading, error } = useVideo(id)  // ✅ useVideo

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3 text-muted">Loading video...</p>
      </Container>
    )
  }

  if (error || !video) {
    return (
      <Container className="py-5 text-center">
        <h3 className="text-muted">{error || 'Video not found'}</h3>
        <p className="text-muted mt-2">
          Requested ID: {id || 'None'}
        </p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => router.push('/main/Videos')}  // ✅ الرابط الصحيح
        >
          Back to Videos
        </button>
      </Container>
    )
  }

  return <VideoDetailClient video={video} />
}