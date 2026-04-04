'use client'
import { article } from '../../types/article'
import Link from 'next/link'

interface ArticleCardProps {
  article: article
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

const getImageSrc = (src?: string): string | null => {
  if (!src) return null
  if (src.startsWith('http')) return src
  if (src.startsWith('/Images') || src.startsWith('/uploads') || src.startsWith('/api')) {
    const full = BASE_URL ? `${BASE_URL}${src}` : src
    return `/api/image?url=${encodeURIComponent(full)}`
  }
  if (src.startsWith('/')) return src
  return null
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/main/Articles/${article.id}`} className="article-card animate-card">
      <div className="article-image">
        {getImageSrc(article.imageUrl) ? (
          <img
            src={getImageSrc(article.imageUrl)!}
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ background: 'linear-gradient(135deg, #f0f0f0, #f8f8f8)', width: '100%', height: '100%' }} />
        )}
      </div>
      <div className="article-content">
        <span className="article-category">{article.category}</span>
        <h3 className="article-title">{article.title}</h3>
        <p className="article-excerpt">{article.summary}</p>
        <div className="article-meta">
          <small className="text-muted">
            {new Date(article.publishDate).toLocaleDateString()}
          </small>
        </div>
      </div>
    </Link>
  )
}