
'use client'
import React from 'react'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { article } from '@/types/article'
import { getImageSrc } from '@/utils/imageUtils'
import { SourceWithLinks } from '@/utils/SourceWithLinks'
interface ArticleContentProps {
  article: article
}


export default function ArticleContent({ article }: ArticleContentProps) {
  const router = useRouter()
  const imageSrc = getImageSrc(article?.imageUrl)

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <button
              className="btn btn-link text-decoration-none mb-3 ps-0"
              onClick={() => router.push('/main/Articles')}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Articles
            </button>

            <div className="bg-white rounded-4 shadow-sm p-5 mb-4">
              <Badge bg="info" className="mb-3" style={{ fontSize: '0.9rem' }}>
                {article.category}
              </Badge>

              <h1 className="display-5 fw-bold mb-4" style={{ lineHeight: '1.3' }}>
                {article.title}
              </h1>

              <div className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                <i className="bi bi-person me-1"></i>
                <SourceWithLinks source={article.source} /> •{' '}
                {new Date(article.publishDate).toLocaleDateString()}
              </div>

              {imageSrc && (
                <div className="mb-4 rounded-3 overflow-hidden" style={{ maxHeight: '400px' }}>
                  <img
                    src={imageSrc}
                    alt={article.title}
                    width={800}
                    height={400}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              {article.summary && (
                <div
                  className="p-4 mb-4 rounded-3"
                  style={{
                    backgroundColor: '#f8f9fa',
                    borderLeft: '4px solid #86C8BC',
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    color: '#495057',
                  }}
                >
                  {article.summary}
                </div>
              )}

              <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#2c3e50' }}>
                {article.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2">
                    {paragraph}
                  </p>
                ))}
              </div>

              {article.source && (
                <div
                  className="mt-4 pt-4"
                  style={{ borderTop: '1px solid #e9ecef', fontSize: '0.85rem', color: '#6c757d' }}
                >
                  <i className="bi bi-journal-text me-2"></i>
                  <strong>Source: </strong>
                  <SourceWithLinks source={article.source} />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}