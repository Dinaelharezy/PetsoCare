

// 'use client'

// import { useState, useEffect } from 'react'
// import { Container, Row, Col, Badge, Spinner } from 'react-bootstrap'
// import { useParams, useRouter } from 'next/navigation'
// import { articlesApi } from '@/data/api/articles'
// import { Article } from '@/types/article'

// export default function ArticleContent() {
//   const params = useParams()
//   const router = useRouter()
//   const [article, setArticle] = useState<Article | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchArticle = async () => {
//       if (!params?.id) {
//         console.log('❌ No ID in params:', params)
//         setError('No article ID provided')
//         setLoading(false)
//         return
//       }

//       console.log('🔍 Fetching article with ID:', params.id)
//       console.log('📝 ID type:', typeof params.id)

//       try {
//         setLoading(true)
        
//         // Debug: Log all articles
//         const allArticles = await articlesApi.getAll()
//         console.log('📚 All articles:', allArticles)
//         console.log('🆔 Available IDs:', allArticles.map(a => ({ 
//           id: a.id, 
//           type: typeof a.id,
//           title: a.title 
//         })))
        
//         const data = await articlesApi.getById(params.id as string)
//         console.log('✅ API returned:', data)
        
//         if (!data) {
//           console.log('❌ Article not found for ID:', params.id)
//           setError('Article not found')
//           setLoading(false)
//           return
//         }

//         // Check if article is published (unless admin)
//         if (!data.published) {
//           console.log('⚠️ Article is not published')
//           setError('This article is not available')
//           setLoading(false)
//           return
//         }

//         console.log('✨ Article loaded successfully:', data.title)
//         setArticle(data)
//       } catch (err) {
//         console.error('💥 Failed to fetch article:', err)
//         setError('Failed to load article')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchArticle()
//   }, [params?.id])

//   if (loading) {
//     return (
//       <Container className="py-5 text-center">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//         <p className="mt-3 text-muted">Loading article...</p>
//       </Container>
//     )
//   }

//   if (error || !article) {
//     return (
//       <Container className="py-5 text-center">
//         <h3 className="text-muted">{error || 'Article not found'}</h3>
//         <p className="text-muted mt-2">
//           Requested ID: {params?.id ? String(params.id) : 'None'}
//         </p>
//         <button 
//           className="btn btn-primary mt-3"
//           onClick={() => router.push('/main/Articles')}
//         >
//           Back to Articles
//         </button>
//       </Container>
//     )
//   }

//   return (
//     <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
//       <Container className="py-5">
//         <Row className="justify-content-center">
//           <Col lg={8} md={10}>
//             {/* Back Button */}
//             <button 
//               className="btn btn-link text-decoration-none mb-3 ps-0"
//               onClick={() => router.push('/main/Articles')}
//             >
//               <i className="bi bi-arrow-left me-2"></i>
//               Back to Articles
//             </button>

//             {/* Article Header */}
//             <div className="bg-white rounded-4 shadow-sm p-5 mb-4">
//               {/* Category Badge */}
//               <Badge bg="info" className="mb-3" style={{ fontSize: '0.9rem' }}>
//                 {article.category}
//               </Badge>

//               <h1 className="display-5 fw-bold mb-4" style={{ lineHeight: '1.3' }}>
//                 {article.title}
//               </h1>
              
//               <div className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
//                 <span>
//                   <i className="bi bi-person me-1"></i>
//                   By {article.author} • {article.date}
//                 </span>
//               </div>

//               {/* Article Excerpt */}
//               {article.excerpt && (
//                 <div 
//                   className="p-4 mb-4 rounded-3"
//                   style={{ 
//                     backgroundColor: '#f8f9fa',
//                     borderLeft: '4px solid #86C8BC',
//                     fontSize: '1.1rem',
//                     fontStyle: 'italic',
//                     color: '#495057'
//                   }}
//                 >
//                   {article.excerpt}
//                 </div>
//               )}

//               {/* Article Content */}
//               <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#2c3e50' }}>
//                 {article.content.map((paragraph, index) => (
//                   <p key={index} className="mb-4">
//                     {paragraph.text}
//                   </p>
//                 ))}
//               </div>

//               {/* Article Images */}
//               {article.media.images.length > 0 && (
//                 <Row className="my-5">
//                   {article.media.images.map((image, index) => (
//                     <Col key={index} md={article.media.images.length === 1 ? 12 : 6} className="mb-3">
//                       <div 
//                         className="rounded-3 overflow-hidden" 
//                         style={{ 
//                           height: '300px', 
//                           backgroundColor: '#e9ecef',
//                           border: '2px solid #dee2e6'
//                         }}
//                       >
//                         <div className="d-flex flex-column align-items-center justify-content-center h-100 p-4 text-center">
//                           <i className="bi bi-image text-muted mb-2" style={{ fontSize: '3rem' }}></i>
//                           <span className="text-muted fw-medium">{image.alt}</span>
//                           {image.caption && (
//                             <small className="text-muted mt-2">{image.caption}</small>
//                           )}
//                         </div>
//                       </div>
//                     </Col>
//                   ))}
//                 </Row>
//               )}

//               {/* Video Placeholder */}
//               {article.media.video && (
//                 <div 
//                   className="rounded-3 overflow-hidden mb-5" 
//                   style={{ 
//                     height: '400px', 
//                     backgroundColor: '#e9ecef', 
//                     position: 'relative',
//                     border: '2px solid #dee2e6'
//                   }}
//                 >
//                   <div className="d-flex align-items-center justify-content-center h-100">
//                     <div className="text-center">
//                       <div 
//                         className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
//                         style={{ width: '80px', height: '80px', cursor: 'pointer' }}
//                       >
//                         <svg width="32" height="32" viewBox="0 0 24 24" fill="#6c757d">
//                           <path d="M8 5v14l11-7z"/>
//                         </svg>
//                       </div>
//                       <p className="text-muted mb-0 fw-medium">Video: {article.media.video.title}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Tags */}
//               <div className="d-flex flex-wrap gap-2 pt-4 border-top">
//                 {article.tags.map((tag, index) => (
//                   <Badge 
//                     key={index}
//                     bg="light" 
//                     text="dark" 
//                     className="px-3 py-2 fw-normal"
//                     style={{ fontSize: '0.9rem', border: '1px solid #dee2e6' }}
//                   >
//                     {tag}
//                   </Badge>
//                 ))}
//               </div>
//             </div>

//             {/* Related Articles Section (Optional) */}
//             <div className="bg-white rounded-4 shadow-sm p-4">
//               <h5 className="mb-3">More Articles in {article.category}</h5>
//               <p className="text-muted">
//                 Explore more articles about {article.category.toLowerCase()}
//               </p>
//               <button 
//                 className="btn btn-outline-primary"
//                 onClick={() => router.push(`/main/Articles?category=${article.category}`)}
//               >
//                 View All {article.category} Articles
//               </button>
//             </div>
//           </Col>
//         </Row>
//       </Container>

//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
//         body {
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//         }

//         .rounded-4 {
//           border-radius: 1rem !important;
//         }

//         .shadow-sm {
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
//         }

//         .btn-link {
//           color: #495057;
//           font-weight: 500;
//         }

//         .btn-link:hover {
//           color: #86C8BC;
//         }
//       `}</style>
//     </div>
//   )
// }

'use client'

import { Container, Row, Col, Badge } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { Article } from '@/types/article'

interface ArticleContentProps {
  article: Article
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const router = useRouter()

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

            {/* Article Header */}
            <div className="bg-white rounded-4 shadow-sm p-5 mb-4">
              {/* Category Badge */}
              <Badge bg="info" className="mb-3" style={{ fontSize: '0.9rem' }}>
                {article.category}
              </Badge>

              <h1 className="display-5 fw-bold mb-4" style={{ lineHeight: '1.3' }}>
                {article.title}
              </h1>
              
              <div className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                <span>
                  <i className="bi bi-person me-1"></i>
                  By {article.author} • {article.date}
                </span>
              </div>

              {/* Article Excerpt */}
              {article.excerpt && (
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
                  {article.excerpt}
                </div>
              )}

              {/* Article Content */}
              <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#2c3e50' }}>
                {article.content.map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph.text}
                  </p>
                ))}
              </div>

              {/* Article Images */}
              {article.media.images.length > 0 && (
                <Row className="my-5">
                  {article.media.images.map((image, index) => (
                    <Col key={index} md={article.media.images.length === 1 ? 12 : 6} className="mb-3">
                      <div 
                        className="rounded-3 overflow-hidden" 
                        style={{ 
                          height: '300px', 
                          backgroundColor: '#e9ecef',
                          border: '2px solid #dee2e6'
                        }}
                      >
                        <div className="d-flex flex-column align-items-center justify-content-center h-100 p-4 text-center">
                          <i className="bi bi-image text-muted mb-2" style={{ fontSize: '3rem' }}></i>
                          <span className="text-muted fw-medium">{image.alt}</span>
                          {image.caption && (
                            <small className="text-muted mt-2">{image.caption}</small>
                          )}
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              )}

              {/* Video Placeholder */}
              {article.media.video && (
                <div 
                  className="rounded-3 overflow-hidden mb-5" 
                  style={{ 
                    height: '400px', 
                    backgroundColor: '#e9ecef', 
                    position: 'relative',
                    border: '2px solid #dee2e6'
                  }}
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
                      <p className="text-muted mb-0 fw-medium">Video: {article.media.video.title}</p>
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

            {/* Related Articles Section (Optional) */}
            <div className="bg-white rounded-4 shadow-sm p-4">
              <h5 className="mb-3">More Articles in {article.category}</h5>
              <p className="text-muted">
                Explore more articles about {article.category.toLowerCase()}
              </p>
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

        .btn-link {
          color: #495057;
          font-weight: 500;
        }

        .btn-link:hover {
          color: #86C8BC;
        }
      `}</style>
    </div>
  )
}