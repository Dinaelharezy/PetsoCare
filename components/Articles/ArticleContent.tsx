

'use client'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { article } from '@/types/article'
import Image from 'next/image'
interface ArticleContentProps {
  article: article
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const router = useRouter()
console.log(article.imageUrl)
console.log(`${process.env.NEXT_PUBLIC_API_URL}${article.imageUrl}`)
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            {/* Back Button */}
            <button
              className="btn btn-link text-decoration-none mb-3 ps-0"
              onClick={() => router.push('/main/Articles')}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Articles
            </button>

            <div className="bg-white rounded-4 shadow-sm p-5 mb-4">
              {/* Category Badge */}
              <Badge bg="info" className="mb-3" style={{ fontSize: '0.9rem' }}>
                {article.category}
              </Badge>

              <h1 className="display-5 fw-bold mb-4" style={{ lineHeight: '1.3' }}>
                {article.title}
              </h1>

              <div className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                <i className="bi bi-person me-1"></i>
                {article.source} •{' '}
                {new Date(article.publishDate).toLocaleDateString()}
              </div>

              {/* Image */}
              {/* {article.imageUrl && (
                <div className="mb-4 rounded-3 overflow-hidden" style={{ maxHeight: '400px' }}>
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )} */}

              {article.imageUrl && (
  <div className="mb-4 rounded-3 overflow-hidden" style={{ maxHeight: '400px' }}>
    <Image
  src={`${process.env.NEXT_PUBLIC_API_URL}${article.imageUrl}`}
  alt={article.title}
  width={800}
  height={400}
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
  </div>
)}

              {/* Summary */}
              {article.summary && (
                <div
                  className="p-4 mb-4 rounded-3"
                  style={{
                    backgroundColor: '#f8f9fa',
                    borderLeft: '4px solid #86C8BC',
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    color: '#495057'
                  }}
                >
                  {article.summary}
                </div>
              )}

              {/* Content — string مش array */}
              <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#2c3e50' }}>
                {article.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* More in Category */}
            <div className="bg-white rounded-4 shadow-sm p-4">
              <h5 className="mb-3">More Articles in {article.category}</h5>
              <button
                className="btn btn-outline-primary"
                onClick={() => router.push(`/main/Articles?category=${article.category}`)}
              >
                View All {article.category} Articles
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}