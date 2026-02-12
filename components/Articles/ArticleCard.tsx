'use client'
import { Article } from '../../types/article'
import Link from 'next/link'
interface ArticleCardProps {
  article: Article
}


export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/main/Articles/${article.id}`} className="article-card animate-card">
      <div
        className="article-image"
        style={{
          background: `linear-gradient(135deg, ${getGradientColors(article.color)})`
        }}
      ></div>
      <div className="article-content">
        <h3 className="article-title">{article.title}</h3>
        <p className="article-excerpt">{article.excerpt}</p>
        <div className="article-tags">
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`article-tag ${idx === 0 ? article.color : ''}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

function getGradientColors(color: string): string {
  const gradients: { [key: string]: string } = {
    yellow: '#ffd966, #ffe699',
    green: '#d4edda, #e1f5e8',
    blue: '#c3e6f5, #d1eefa',
    purple: '#e8d9f5, #f0e6fa'
  }
  return gradients[color] || '#f0f0f0, #f8f8f8'
}