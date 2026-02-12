'use client'

import { Container, Row, Col, Badge } from 'react-bootstrap'
import Image from 'next/image'
import { articlesApi } from '../../data/api/articles'
import { Article } from '@/types/article'

interface ArticleContentProps {
  article: Article
}

export default function ArticleContent({ article }: ArticleContentProps) {
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            {/* Article Header */}
            <div className="bg-white rounded-4 shadow-sm p-5 mb-4">
              <h1 className="display-5 fw-bold mb-4" style={{ lineHeight: '1.3' }}>
                {article.title}
              </h1>
              
              <div className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                <span>By {article.author} • {article.date}</span>
              </div>

              {/* Article Content */}
              <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#2c3e50' }}>
                {article.content.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph.text}
                  </p>
                ))}
              </div>

              {/* Article Images */}
              {article.media.images.length > 0 && (
                <Row className="my-5">
                  {article.media.images.map((image, index) => (
                    <Col key={index} md={6} className="mb-3 mb-md-0">
                      <div 
                        className="rounded-3 overflow-hidden" 
                        style={{ height: '250px', backgroundColor: '#e9ecef' }}
                      >
                        <div className="d-flex align-items-center justify-content-center h-100">
                          <span className="text-muted">{image.alt}</span>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}

              {/* Video Placeholder */}
              {article.media.video && (
                <div 
                  className="rounded-3 overflow-hidden mb-4" 
                  style={{ height: '400px', backgroundColor: '#e9ecef', position: 'relative' }}
                >
                  <div className="d-flex align-items-center justify-content-center h-100">
                    <div className="text-center">
                      <div 
                        className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                        style={{ width: '80px', height: '80px', cursor: 'pointer' }}
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="#6c757d">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <p className="text-muted mb-0">Video: {article.media.video.title}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="d-flex flex-wrap gap-2 pt-4 border-top">
                {article.tags.map((tag, index) => (
                  <Badge 
                    key={index}
                    bg="light" 
                    text="dark" 
                    className="px-3 py-2 fw-normal"
                    style={{ fontSize: '0.9rem', border: '1px solid #dee2e6' }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .rounded-4 {
          border-radius: 1rem !important;
        }

        .shadow-sm {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
        }
      `}</style>
    </div>
  )
}