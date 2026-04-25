'use client'

import { useRouter } from 'next/navigation'
import { Video } from '@/types/Video'

export default function VideoDetailClient({ video }: { video: Video }) {
  const router = useRouter()
  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&?/\s]+)/)
    return match ? match[1] : null
  }

  const youtubeId = getYoutubeId(video.url)

  return (
    <div className="video-page" style={{ direction: 'rtl', padding: '20px' }}>
      <button
        onClick={() => router.push('/main/Videos')}
        className="back-button"
        style={{
          background: 'rgb(173, 241, 120)',
          border: 'none',
          padding: '8px 20px',
          borderRadius: '20px',
          marginBottom: '20px',
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
       All Videos
      </button>

      <div className="video-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className="video-player" style={{ aspectRatio: '16/9', background: '#000', borderRadius: '16px', overflow: 'hidden' }}>
          {youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&autoplay=0`}
              title={video.titleEn}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: '16px' }}>
              <i className="bi bi-youtube" style={{ fontSize: '48px', color: 'rgb(173,241,120)' }}></i>
              <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(173,241,120)' }}>
               Open On Youtube
              </a>
            </div>
          )}
        </div>

        <div className="video-info" style={{ marginTop: '24px' }}>
          <div style={{ 
            background: '#f0fce0', 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            marginBottom: '12px'
          }}>
            <i className="bi bi-youtube"></i>
            {video.source}
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1a3a00', marginBottom: '8px' }}>
            {video.titleEn}
          </h1>
          <p style={{ color: '#666' }}>{video.titleEn}</p>
        </div>
      </div>
    </div>
  )
}