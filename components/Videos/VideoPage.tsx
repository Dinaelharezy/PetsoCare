

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Video } from '@/types/Video'

export default function VideoPage() {
  const router = useRouter()
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Videos`)
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      
      const data = await res.json()
      const videosList = Array.isArray(data) ? data : []
      setVideos(videosList)
    } catch (err) {
      console.error('Fetch error:', err)
      setError('Error Of Getting Videos')
    } finally {
      setLoading(false)
    }
  }

  const goToVideo = (id: number) => {
   router.push(`/main/Videos/${id}`)
  }

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&?/\s]+)/)
    return match ? match[1] : null
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchVideos} />
  }

  if (videos.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="videos-page">
      <div className="hero-section background-for-app">

 <div className="hero-wrap">
  <div className="hero-inner">

    
    <h1 className="hero-title">
   <span>Awareness Videos</span>
    </h1>
    
    <p className="hero-subtitle">
      Watch and learn about rabies prevention and safety tips for you and your family
    </p>

  </div>
</div>
      </div>

      <div className="videos-container">
        <div className="section-header">
          <h2 className="section-title">
            <i className="bi bi-play-circle-fill"></i>
           All Videos
          </h2>
        </div>

        <div className="videos-grid">
          {videos.map((video) => {
            const youtubeId = getYoutubeId(video.url)
            const thumbUrl = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg` : null

            return (
              <div key={video.id} className="video-card" onClick={() => goToVideo(video.id)}>
                <div className="video-thumbnail">
                  {thumbUrl ? (
                    <img src={thumbUrl} alt={video.titleEn} className="thumbnail-img" />
                  ) : (
                    <div className="thumbnail-placeholder">
                      <i className="bi bi-play-circle"></i>
                    </div>
                  )}
                  <div className="play-overlay">
                    <i className="bi bi-play-circle-fill"></i>
                  </div>
                </div>
                <div className="video-card-content">
                  <div className="source-badge">
                    <i className="bi bi-youtube"></i>
                    {video.source}
                  </div>
                  <h3 className="video-card-title-ar">{video.titleEn}</h3>
                  {/* <p className="video-card-title-en">{video.titleEn}</p> */}
                  <button className="watch-btn mt-3">
                   Watch
                    <i className="bi bi-arrow-left-short"></i>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .videos-page {
          min-height: 100vh;
         background: linear-gradient(135deg, #f9f9f9 0%, #e9f3e3 100%);
          direction: rtl;
        }

        .hero-section {
             background: linear-gradient(135deg, #f9f9f9 0%, #e9f3e3 100%);
          padding: 60px 24px;
          text-align: center;
        }


        .hero-subtitle {
          font-size: clamp(18px, 4vw, 18px);
          color: #2d5a00;
        }

        .videos-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 32px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a3a00;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .section-title i {
          color: rgb(173, 241, 120);
        }

        .section-count {
          color: #6c757d;
        }

        .videos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 28px;
        }

        .video-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .video-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.15);
        }

        .video-thumbnail {
          position: relative;
          aspect-ratio: 16/9;
          background: #000;
        }

        .thumbnail-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumbnail-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
          color: rgb(173, 241, 120);
          font-size: 48px;
        }

        .play-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .video-card:hover .play-overlay {
          opacity: 1;
        }

        .play-overlay i {
          font-size: 48px;
          color: rgb(173, 241, 120);
        }

        .video-card-content {
          padding: 20px;
        }

        .source-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f0fce0;
          color: #4a8a00;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .video-card-title-ar {
          font-size: 18px;
          font-weight: 700;
          color: #1a3a00;
          margin: 0 0 6px;
        }

        .video-card-title-en {
          font-size: 13px;
          color: #999;
          margin: 0 0 16px;
          direction: ltr;
          text-align: left;
        }

        .watch-btn {
          background: none;
          border: none;
          color: rgb(173, 241, 120);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }

        .watch-btn:hover {
          gap: 10px;
        }

        @media (max-width: 768px) {
          .videos-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="loading-container">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">جاري التحميل...</span>
      </div>
      <style jsx>{`
        .loading-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5fce8 0%, #e8f5e0 100%);
        }
      `}</style>
    </div>
  )
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="error-container">
      <div className="error-card">
        <i className="bi bi-exclamation-triangle-fill"></i>
        <p>{message}</p>
        <button onClick={onRetry}>
          <i className="bi bi-arrow-repeat"></i>
          إعادة المحاولة
        </button>
      </div>
      <style jsx>{`
        .error-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5fce8 0%, #e8f5e0 100%);
        }
        .error-card {
          text-align: center;
          background: white;
          padding: 48px;
          border-radius: 24px;
        }
        .error-card i {
          font-size: 48px;
          color: rgb(173, 241, 120);
        }
        .error-card button {
          background: rgb(173, 241, 120);
          border: none;
          padding: 10px 24px;
          border-radius: 30px;
          margin-top: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="empty-container">
      <div className="empty-card">
        <i className="bi bi-camera-reels-fill"></i>
        <p>لا توجد فيديوهات حالياً</p>
      </div>
      <style jsx>{`
        .empty-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5fce8 0%, #e8f5e0 100%);
        }
        .empty-card {
          text-align: center;
          background: white;
          padding: 48px;
          border-radius: 24px;
        }
        .empty-card i {
          font-size: 48px;
          color: rgb(173, 241, 120);
        }
      `}</style>
    </div>
  )
}