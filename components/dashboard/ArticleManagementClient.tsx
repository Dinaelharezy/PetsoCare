

// 'use client'

// import { useState, useEffect } from 'react'
// import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from 'react-bootstrap'
// import { articlesApi } from '@/data/api/articles'
// import { Article } from '@/types/article'

// export default function ArticleManagementPage() {
//   const [articles, setArticles] = useState<Article[]>([])
//   const [loading, setLoading] = useState(true)
//   const [showModal, setShowModal] = useState(false)
//   const [editingArticle, setEditingArticle] = useState<Article | null>(null)
//   const [successMessage, setSuccessMessage] = useState('')
  
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     date: '',
//     category: '',
//     excerpt: '',
//     color: 'green' as 'yellow' | 'green' | 'blue' | 'purple',
//     tags: '',
//     content: '',
//     imageUrls: '',
//     imageAlts: '',
//     videoUrl: '',
//     videoTitle: '',
//     published: false
//   })

//   const categories = ['Health', 'Nutrition', 'Behavior', 'Prevention', 'Emergency Care', 'Senior Care', 'Dental Care']
//   const colors: ('yellow' | 'green' | 'blue' | 'purple')[] = ['yellow', 'green', 'blue', 'purple']

//   // Load articles
//   useEffect(() => {
//     loadArticles()
//   }, [])

//   const loadArticles = async () => {
//     try {
//       setLoading(true)
//       const data = await articlesApi.getAll()
//       setArticles(data)
//     } catch (error) {
//       console.error('Failed to load articles:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleShowModal = (article?: Article) => {
//     if (article) {
//       setEditingArticle(article)
//       setFormData({
//         title: article.title,
//         author: article.author,
//         date: article.date,
//         category: article.category,
//         excerpt: article.excerpt,
//         color: article.color,
//         tags: article.tags.join(', '),
//         content: article.content.map(p => p.text).join('\n\n'),
//         imageUrls: article.media.images.map(img => img.url).join('\n'),
//         imageAlts: article.media.images.map(img => img.alt).join('\n'),
//         videoUrl: article.media.video?.url || '',
//         videoTitle: article.media.video?.title || '',
//         published: article.published
//       })
//     } else {
//       setEditingArticle(null)
//       setFormData({
//         title: '',
//         author: '',
//         date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
//         category: '',
//         excerpt: '',
//         color: 'green',
//         tags: '',
//         content: '',
//         imageUrls: '',
//         imageAlts: '',
//         videoUrl: '',
//         videoTitle: '',
//         published: false
//       })
//     }
//     setShowModal(true)
//   }

//   const handleCloseModal = () => {
//     setShowModal(false)
//     setEditingArticle(null)
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
//     })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     try {
//       // Parse content into paragraphs
//       const contentParagraphs = formData.content
//         .split('\n\n')
//         .filter(text => text.trim())
//         .map(text => ({ text: text.trim() }))

//       // Parse images
//       const imageUrlsArray = formData.imageUrls
//         .split('\n')
//         .filter(url => url.trim())
//       const imageAltsArray = formData.imageAlts
//         .split('\n')
//         .filter(alt => alt.trim())
      
//       const images = imageUrlsArray.map((url, index) => ({
//         url: url.trim(),
//         alt: imageAltsArray[index]?.trim() || `Image ${index + 1}`
//       }))

//       // Parse video
//       const video = formData.videoUrl.trim() ? {
//         url: formData.videoUrl.trim(),
//         title: formData.videoTitle.trim() || 'Video'
//       } : undefined

//       const articleData = {
//         title: formData.title,
//         author: formData.author,
//         date: formData.date,
//         category: formData.category,
//         excerpt: formData.excerpt,
//         color: formData.color,
//         tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
//         content: contentParagraphs,
//         media: {
//           images,
//           video
//         },
//         published: formData.published
//       }

//       if (editingArticle) {
//         await articlesApi.update(editingArticle.id, articleData)
//         setSuccessMessage('Article updated successfully!')
//       } else {
//         // Generate a unique ID for new articles
//         const newId = `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
//         await articlesApi.create({ ...articleData, id: newId })
//         setSuccessMessage('Article created successfully!')
//       }
      
//       await loadArticles()
//       handleCloseModal()
      
//       // Clear success message after 3 seconds
//       setTimeout(() => setSuccessMessage(''), 3000)
      
//       // Notify other components that articles have been updated
//       window.dispatchEvent(new Event('articlesUpdated'))
//     } catch (error) {
//       console.error('Error saving article:', error)
//       alert('Failed to save article. Please try again.')
//     }
//   }

//   const handleDelete = async (id: string | number) => {
//     if (window.confirm('Are you sure you want to delete this article?')) {
//       try {
//         await articlesApi.delete(id)
//         setSuccessMessage('Article deleted successfully!')
//         await loadArticles()
//         setTimeout(() => setSuccessMessage(''), 3000)
        
//         // Notify other components that articles have been updated
//         window.dispatchEvent(new Event('articlesUpdated'))
//       } catch (error) {
//         console.error('Error deleting article:', error)
//         alert('Failed to delete article. Please try again.')
//       }
//     }
//   }

//   const handleTogglePublish = async (id: string | number) => {
//     try {
//       await articlesApi.togglePublish(id)
//       await loadArticles()
//       setSuccessMessage('Article status updated!')
//       setTimeout(() => setSuccessMessage(''), 3000)
      
//       // Notify other components that articles have been updated
//       window.dispatchEvent(new Event('articlesUpdated'))
//     } catch (error) {
//       console.error('Error toggling publish status:', error)
//       alert('Failed to update article status. Please try again.')
//     }
//   }

//   if (loading) {
//     return (
//       <Container className="py-5 text-center">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </Container>
//     )
//   }

//   return (
//     <Container fluid className="px-4 py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1 className="page-title">Article Management</h1>
//         <Button className="btn-primary-green" onClick={() => handleShowModal()}>
//           <i className="bi bi-file-earmark-plus me-2"></i>
//           Add New Article
//         </Button>
//       </div>

//       {successMessage && (
//         <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
//           {successMessage}
//         </Alert>
//       )}

//       <Row className="g-4">
//         {articles.map((article) => (
//           <Col lg={6} xl={4} key={article.id}>
//             <Card className="animate-card h-100">
//               <Card.Body>
//                 <div className="d-flex justify-content-between align-items-start mb-2">
//                   <Badge bg={article.published ? 'success' : 'secondary'}>
//                     {article.published ? 'Published' : 'Draft'}
//                   </Badge>
//                   <Badge bg="info">{article.category}</Badge>
//                 </div>
                
//                 {/* Color indicator */}
//                 <div 
//                   className="mb-3 rounded" 
//                   style={{ 
//                     height: '8px', 
//                     background: `linear-gradient(135deg, ${getGradientColors(article.color)})` 
//                   }}
//                 />
                
//                 <h5 className="card-title mb-3">{article.title}</h5>
                
//                 <div className="text-muted small mb-3">
//                   <i className="bi bi-person me-1"></i> {article.author}
//                   <br />
//                   <i className="bi bi-calendar me-1"></i> {article.date}
//                 </div>

//                 <p className="text-muted mb-3" style={{ 
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                   display: '-webkit-box',
//                   WebkitLineClamp: 3,
//                   WebkitBoxOrient: 'vertical'
//                 }}>
//                   {article.excerpt}
//                 </p>

//                 <div className="mb-3">
//                   {article.tags.slice(0, 3).map((tag, index) => (
//                     <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
//                       {tag}
//                     </Badge>
//                   ))}
//                   {article.tags.length > 3 && (
//                     <Badge bg="light" text="dark" className="me-1 mb-1">
//                       +{article.tags.length - 3}
//                     </Badge>
//                   )}
//                 </div>

//                 <div className="small text-muted mb-3">
//                   <i className="bi bi-image me-1"></i> {article.media.images.length} images
//                   {article.media.video && (
//                     <span className="ms-2">
//                       <i className="bi bi-play-circle me-1"></i> 1 video
//                     </span>
//                   )}
//                 </div>

//                 <div className="d-flex gap-2 flex-wrap">
//                   <Button 
//                     variant="outline-primary" 
//                     size="sm"
//                     onClick={() => handleShowModal(article)}
//                   >
//                     <i className="bi bi-pencil"></i> Edit
//                   </Button>
//                   <Button 
//                     variant={article.published ? 'outline-warning' : 'outline-success'}
//                     size="sm"
//                     onClick={() => handleTogglePublish(article.id)}
//                   >
//                     <i className={`bi bi-${article.published ? 'eye-slash' : 'eye'}`}></i>
//                     {article.published ? ' Unpublish' : ' Publish'}
//                   </Button>
//                   <Button 
//                     variant="outline-danger" 
//                     size="sm"
//                     onClick={() => handleDelete(article.id)}
//                   >
//                     <i className="bi bi-trash"></i> Delete
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {articles.length === 0 && (
//         <Card className="animate-card">
//           <Card.Body className="text-center text-muted py-5">
//             <i className="bi bi-file-earmark-x" style={{ fontSize: '48px' }}></i>
//             <p className="mt-3">No articles found. Create your first article!</p>
//           </Card.Body>
//         </Card>
//       )}

//       {/* Add/Edit Modal */}
//       <Modal show={showModal} onHide={handleCloseModal} size="lg" scrollable>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {editingArticle ? 'Edit Article' : 'Add New Article'}
//           </Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body style={{ maxHeight: '70vh' }}>
//             {/* Basic Information */}
//             <h6 className="mb-3 text-primary">Basic Information</h6>
            
//             <Form.Group className="mb-3">
//               <Form.Label>Article Title *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 placeholder="Complete Guide to Dog Nutrition"
//                 required
//               />
//             </Form.Group>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Author *</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="author"
//                     value={formData.author}
//                     onChange={handleInputChange}
//                     placeholder="Dr. John Doe"
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Publication Date *</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleInputChange}
//                     placeholder="November 15, 2025"
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Category *</Form.Label>
//                   <Form.Select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="">Select category</option>
//                     {categories.map(cat => (
//                       <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Card Color *</Form.Label>
//                   <Form.Select
//                     name="color"
//                     value={formData.color}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     {colors.map(color => (
//                       <option key={color} value={color}>
//                         {color.charAt(0).toUpperCase() + color.slice(1)}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group className="mb-3">
//               <Form.Label>Excerpt (Short Summary) *</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 name="excerpt"
//                 value={formData.excerpt}
//                 onChange={handleInputChange}
//                 placeholder="A brief summary that appears on the article card..."
//                 rows={2}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-4">
//               <Form.Label>Tags (comma-separated) *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="tags"
//                 value={formData.tags}
//                 onChange={handleInputChange}
//                 placeholder="Dogs, Nutrition, Health"
//                 required
//               />
//             </Form.Group>

//             {/* Content Section */}
//             <h6 className="mb-3 text-primary mt-4">Article Content</h6>
            
//             <Form.Group className="mb-4">
//               <Form.Label>Full Article Content *</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 name="content"
//                 value={formData.content}
//                 onChange={handleInputChange}
//                 placeholder="Write your article content here...

// Use double line breaks to separate paragraphs.

// Each paragraph will be displayed separately in the article."
//                 rows={10}
//                 required
//               />
//               <Form.Text className="text-muted">
//                 Separate paragraphs with double line breaks (press Enter twice)
//               </Form.Text>
//             </Form.Group>

//             {/* Media Section */}
//             <h6 className="mb-3 text-primary mt-4">Media (Optional)</h6>
            
//             <Form.Group className="mb-3">
//               <Form.Label>Image URLs (one per line)</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 name="imageUrls"
//                 value={formData.imageUrls}
//                 onChange={handleInputChange}
//                 placeholder="https://example.com/image1.jpg
// https://example.com/image2.jpg"
//                 rows={3}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Image Alt Texts (one per line, match order of URLs)</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 name="imageAlts"
//                 value={formData.imageAlts}
//                 onChange={handleInputChange}
//                 placeholder="Healthy dog food in bowl
// Dog nutrition pyramid chart"
//                 rows={3}
//               />
//             </Form.Group>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Video URL</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="videoUrl"
//                     value={formData.videoUrl}
//                     onChange={handleInputChange}
//                     placeholder="https://example.com/video.mp4"
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Video Title</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="videoTitle"
//                     value={formData.videoTitle}
//                     onChange={handleInputChange}
//                     placeholder="Understanding Dog Nutrition"
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group className="mb-3">
//               <Form.Check
//                 type="checkbox"
//                 name="published"
//                 label="Publish article immediately (visible to users)"
//                 checked={formData.published}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseModal}>
//               Cancel
//             </Button>
//             <Button type="submit" className="btn-primary-green">
//               {editingArticle ? 'Update Article' : 'Create Article'}
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </Container>
//   )
// }

// function getGradientColors(color: string): string {
//   const gradients: { [key: string]: string } = {
//     yellow: '#ffd966, #ffe699',
//     green: '#d4edda, #e1f5e8',
//     blue: '#c3e6f5, #d1eefa',
//     purple: '#e8d9f5, #f0e6fa'
//   }
//   return gradients[color] || '#f0f0f0, #f8f8f8'
// }


'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from 'react-bootstrap'
import { articlesApi } from '@/data/api/articles'
import { Article } from '@/types/article'

export default function ArticleManagementPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    date: '',
    category: '',
    excerpt: '',
    color: 'green' as 'yellow' | 'green' | 'blue' | 'purple',
    tags: '',
    content: '',
    imageUrls: '',
    imageAlts: '',
    videoUrl: '',
    videoTitle: '',
    published: false
  })

  const categories = ['Health', 'Nutrition', 'Behavior', 'Prevention', 'Emergency Care', 'Senior Care', 'Dental Care']
  const colors: ('yellow' | 'green' | 'blue' | 'purple')[] = ['yellow', 'green', 'blue', 'purple']

  // Load articles
  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      setLoading(true)
      const data = await articlesApi.getAll()
      setArticles(data)
    } catch (error) {
      console.error('Failed to load articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleShowModal = (article?: Article) => {
    if (article) {
      setEditingArticle(article)
      setFormData({
        title: article.title,
        author: article.author,
        date: article.date,
        category: article.category,
        excerpt: article.excerpt,
        color: article.color,
        tags: article.tags.join(', '),
        content: article.content.map(p => p.text).join('\n\n'),
        imageUrls: article.media.images.map(img => img.url).join('\n'),
        imageAlts: article.media.images.map(img => img.alt).join('\n'),
        videoUrl: article.media.video?.url || '',
        videoTitle: article.media.video?.title || '',
        published: article.published
      })
    } else {
      setEditingArticle(null)
      setFormData({
        title: '',
        author: '',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        category: '',
        excerpt: '',
        color: 'green',
        tags: '',
        content: '',
        imageUrls: '',
        imageAlts: '',
        videoUrl: '',
        videoTitle: '',
        published: false
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingArticle(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Parse content into paragraphs
      const contentParagraphs = formData.content
        .split('\n\n')
        .filter(text => text.trim())
        .map(text => ({ text: text.trim() }))

      // Parse images
      const imageUrlsArray = formData.imageUrls
        .split('\n')
        .filter(url => url.trim())
      const imageAltsArray = formData.imageAlts
        .split('\n')
        .filter(alt => alt.trim())
      
      const images = imageUrlsArray.map((url, index) => ({
        url: url.trim(),
        alt: imageAltsArray[index]?.trim() || `Image ${index + 1}`
      }))

      // Parse video
      const video = formData.videoUrl.trim() ? {
        url: formData.videoUrl.trim(),
        title: formData.videoTitle.trim() || 'Video'
      } : undefined

      const articleData = {
        title: formData.title,
        author: formData.author,
        date: formData.date,
        category: formData.category,
        excerpt: formData.excerpt,
        color: formData.color,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        content: contentParagraphs,
        media: {
          images,
          video
        },
        published: formData.published
      }

      if (editingArticle) {
        // Update existing article
        await articlesApi.update(editingArticle.id, articleData)
        setSuccessMessage('Article updated successfully!')
      } else {
        // Create new article - API will auto-generate ID
        const newArticle = await articlesApi.create(articleData)
        console.log('✅ New article created with ID:', newArticle.id)
        setSuccessMessage(`Article created successfully with ID: ${newArticle.id}`)
      }
      
      await loadArticles()
      handleCloseModal()
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000)
      
      // Notify other components that articles have been updated
      window.dispatchEvent(new Event('articlesUpdated'))
    } catch (error) {
      console.error('Error saving article:', error)
      alert('Failed to save article. Please try again.')
    }
  }

  const handleDelete = async (id: string | number) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await articlesApi.delete(id)
        setSuccessMessage('Article deleted successfully!')
        await loadArticles()
        setTimeout(() => setSuccessMessage(''), 3000)
        
        // Notify other components that articles have been updated
        window.dispatchEvent(new Event('articlesUpdated'))
      } catch (error) {
        console.error('Error deleting article:', error)
        alert('Failed to delete article. Please try again.')
      }
    }
  }

  const handleTogglePublish = async (id: string | number) => {
    try {
      await articlesApi.togglePublish(id)
      await loadArticles()
      setSuccessMessage('Article status updated!')
      setTimeout(() => setSuccessMessage(''), 3000)
      
      // Notify other components that articles have been updated
      window.dispatchEvent(new Event('articlesUpdated'))
    } catch (error) {
      console.error('Error toggling publish status:', error)
      alert('Failed to update article status. Please try again.')
    }
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    )
  }

  return (
    <Container fluid className="px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="page-title">Article Management</h1>
        <Button className="btn-primary-green" onClick={() => handleShowModal()}>
          <i className="bi bi-file-earmark-plus me-2"></i>
          Add New Article
        </Button>
      </div>

      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      <Row className="g-4">
        {articles.map((article) => (
          <Col lg={6} xl={4} key={article.id}>
            <Card className="animate-card h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Badge bg={article.published ? 'success' : 'secondary'}>
                    {article.published ? 'Published' : 'Draft'}
                  </Badge>
                  <div className="d-flex gap-2">
                    <Badge bg="info">{article.category}</Badge>
                    <Badge bg="dark">ID: {article.id}</Badge>
                  </div>
                </div>
                
                {/* Color indicator */}
                <div 
                  className="mb-3 rounded" 
                  style={{ 
                    height: '8px', 
                    background: `linear-gradient(135deg, ${getGradientColors(article.color)})` 
                  }}
                />
                
                <h5 className="card-title mb-3">{article.title}</h5>
                
                <div className="text-muted small mb-3">
                  <i className="bi bi-person me-1"></i> {article.author}
                  <br />
                  <i className="bi bi-calendar me-1"></i> {article.date}
                </div>

                <p className="text-muted mb-3" style={{ 
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {article.excerpt}
                </p>

                <div className="mb-3">
                  {article.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                      {tag}
                    </Badge>
                  ))}
                  {article.tags.length > 3 && (
                    <Badge bg="light" text="dark" className="me-1 mb-1">
                      +{article.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="small text-muted mb-3">
                  <i className="bi bi-image me-1"></i> {article.media.images.length} images
                  {article.media.video && (
                    <span className="ms-2">
                      <i className="bi bi-play-circle me-1"></i> 1 video
                    </span>
                  )}
                </div>

                <div className="d-flex gap-2 flex-wrap">
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => handleShowModal(article)}
                  >
                    <i className="bi bi-pencil"></i> Edit
                  </Button>
                  <Button 
                    variant={article.published ? 'outline-warning' : 'outline-success'}
                    size="sm"
                    onClick={() => handleTogglePublish(article.id)}
                  >
                    <i className={`bi bi-${article.published ? 'eye-slash' : 'eye'}`}></i>
                    {article.published ? ' Unpublish' : ' Publish'}
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleDelete(article.id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {articles.length === 0 && (
        <Card className="animate-card">
          <Card.Body className="text-center text-muted py-5">
            <i className="bi bi-file-earmark-x" style={{ fontSize: '48px' }}></i>
            <p className="mt-3">No articles found. Create your first article!</p>
          </Card.Body>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingArticle ? `Edit Article (ID: ${editingArticle.id})` : 'Add New Article'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body style={{ maxHeight: '70vh' }}>
            {/* Basic Information */}
            <h6 className="mb-3 text-primary">Basic Information</h6>
            
            <Form.Group className="mb-3">
              <Form.Label>Article Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Complete Guide to Dog Nutrition"
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Author *</Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Dr. John Doe"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Publication Date *</Form.Label>
                  <Form.Control
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="November 15, 2025"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Card Color *</Form.Label>
                  <Form.Select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    required
                  >
                    {colors.map(color => (
                      <option key={color} value={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Excerpt (Short Summary) *</Form.Label>
              <Form.Control
                as="textarea"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="A brief summary that appears on the article card..."
                rows={2}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Tags (comma-separated) *</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Dogs, Nutrition, Health"
                required
              />
            </Form.Group>

            {/* Content Section */}
            <h6 className="mb-3 text-primary mt-4">Article Content</h6>
            
            <Form.Group className="mb-4">
              <Form.Label>Full Article Content *</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your article content here...

Use double line breaks to separate paragraphs.

Each paragraph will be displayed separately in the article."
                rows={10}
                required
              />
              <Form.Text className="text-muted">
                Separate paragraphs with double line breaks (press Enter twice)
              </Form.Text>
            </Form.Group>

            {/* Media Section */}
            <h6 className="mb-3 text-primary mt-4">Media (Optional)</h6>
            
            <Form.Group className="mb-3">
              <Form.Label>Image URLs (one per line)</Form.Label>
              <Form.Control
                as="textarea"
                name="imageUrls"
                value={formData.imageUrls}
                onChange={handleInputChange}
                placeholder="https://example.com/image1.jpg
https://example.com/image2.jpg"
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image Alt Texts (one per line, match order of URLs)</Form.Label>
              <Form.Control
                as="textarea"
                name="imageAlts"
                value={formData.imageAlts}
                onChange={handleInputChange}
                placeholder="Healthy dog food in bowl
Dog nutrition pyramid chart"
                rows={3}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Video URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/video.mp4"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Video Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="videoTitle"
                    value={formData.videoTitle}
                    onChange={handleInputChange}
                    placeholder="Understanding Dog Nutrition"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="published"
                label="Publish article immediately (visible to users)"
                checked={formData.published}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" className="btn-primary-green">
              {editingArticle ? 'Update Article' : 'Create Article'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
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