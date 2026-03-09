
// 'use client'

// import { useState, useEffect } from 'react'
// import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from 'react-bootstrap'
// import { articlesApi } from '@/data/api/articles'
// import { article } from '../../types/article'

// export default function ArticleManagementClient() {
//   const [articles, setArticles] = useState<article[]>([])
//   const [loading, setLoading] = useState(true)
//   const [showModal, setShowModal] = useState(false)
//   const [editingArticle, setEditingArticle] = useState<article | null>(null)
//   const [successMessage, setSuccessMessage] = useState('')

//   const [formData, setFormData] = useState({
//     title: '',
//     summary: '',
//     content: '',
//     imageUrl: '',
//     source: '',
//     category: '',
//     publishDate: '',
//       // published: true
//   })

//   const categories = ['Prevention', 'Emergency Care', 'Awareness', 'Symptoms', 'Vaccination']

//   useEffect(() => {
//     loadArticles()
//   }, [])
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault()
//   try {
//     const articleData = {
//       title: formData.title,
//       summary: formData.summary,
//       content: formData.content,
//       imageUrl: formData.imageUrl,
//       source: formData.source,
//       category: formData.category,
//       publishDate: new Date(formData.publishDate).toISOString(),
//       published: true
//     }
//     if (editingArticle) {
//       await articlesApi.update(editingArticle.id, articleData)
//       setSuccessMessage('Article updated successfully!')
//     } else {
//       const response = await fetch('/api/dashboard/articles', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'ngrok-skip-browser-warning': 'true'
//         },
//         body: JSON.stringify(articleData)
//       })
//       if (!response.ok) {
//         throw new Error(`Failed: ${response.status}`)
//       }
//       setSuccessMessage('Article created successfully!')
//     }
//     await loadArticles()
//     handleCloseModal()
//     setTimeout(() => setSuccessMessage(''), 3000)
//     window.dispatchEvent(new Event('articlesUpdated'))
//   } catch (error) {
//     console.error('Error saving article:', error)
//     alert('Failed to save article. Please try again.')
//   }
// }
//   const loadArticles = async () => {
//     try {
//       setLoading(true)
//       const response = await fetch('/api/dashboard/articles', {
//         headers: { 'ngrok-skip-browser-warning': 'true' }
//       })
//       const data = await response.json()
//       setArticles(data)
//     } catch (error) {
//       console.error('Failed to load articles:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleShowModal = (article?: article) => {
//     if (article) {
//       setEditingArticle(article)
//       setFormData({
//         title: article.title,
//         summary: article.summary,
//         content: article.content,
//         imageUrl: article.imageUrl,
//         source: article.source,
//         category: article.category,
//         publishDate: article.publishDate?.split('T')[0] || '',
//       })
//     } else {
//       setEditingArticle(null)
//       setFormData({
//         title: '',
//         summary: '',
//         content: '',
//         imageUrl: '',
//         source: '',
//         category: '',
//         publishDate: new Date().toISOString().split('T')[0],
//       })
//     }
//     setShowModal(true)
//   }

//   const handleCloseModal = () => {
//     setShowModal(false)
//     setEditingArticle(null)
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const articleData = {
//         title: formData.title,
//         summary: formData.summary,
//         content: formData.content,
//         imageUrl: formData.imageUrl,
//         source: formData.source,
//         category: formData.category,
//         publishDate: new Date(formData.publishDate).toISOString(),
//          published: true 
//       }

//       if (editingArticle) {
//         await articlesApi.update(editingArticle.id, articleData)
//         setSuccessMessage('Article updated successfully!')
//       } else {
//         await articlesApi.create(articleData)
//         setSuccessMessage('Article created successfully!')
//       }

//       await loadArticles()
//       handleCloseModal()
//       setTimeout(() => setSuccessMessage(''), 3000)
//       window.dispatchEvent(new Event('articlesUpdated'))
//     } catch (error) {
//       console.error('Error saving article:', error)
//       alert('Failed to save article. Please try again.')
//     }
//   }

//   const handleDelete = async (id: number) => {
//     if (window.confirm('Are you sure you want to delete this article?')) {
//       try {
//         await articlesApi.delete(id)
//         setSuccessMessage('Article deleted successfully!')
//         await loadArticles()
//         setTimeout(() => setSuccessMessage(''), 3000)
//         window.dispatchEvent(new Event('articlesUpdated'))
//       } catch (error) {
//         console.error('Error deleting article:', error)
//         alert('Failed to delete article. Please try again.')
//       }
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
//                   <Badge bg="info">{article.category}</Badge>
//                   <Badge bg="dark">ID: {article.id}</Badge>
//                 </div>

//                 {article.imageUrl && (
//                   <img
//                     src={`${process.env.NEXT_PUBLIC_API_URL}${article.imageUrl}`}
//                     alt={article.title}
//                     style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }}
//                   />
//                 )}

//                 <h5 className="card-title mb-2">{article.title}</h5>
//                 <p className="text-muted small mb-2">{article.summary}</p>

//                 <div className="text-muted small mb-3">
//                   <i className="bi bi-person me-1"></i> {article.source}
//                   <br />
//                   <i className="bi bi-calendar me-1"></i> {new Date(article.publishDate).toLocaleDateString()}
//                 </div>

//                 <div className="d-flex gap-2 flex-wrap">
//                   <Button variant="outline-primary" size="sm" onClick={() => handleShowModal(article)}>
//                     <i className="bi bi-pencil"></i> Edit
//                   </Button>
//                   <Button variant="outline-danger" size="sm" onClick={() => handleDelete(article.id)}>
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

//       <Modal
//         show={showModal}
//         onHide={handleCloseModal}
//         centered
//         dialogClassName="article-modal"
//       >
//         <Modal.Header closeButton style={{ background: '#86C8BC', color: 'white' }}>
//           <Modal.Title style={{ fontSize: '1.1rem' }}>
//             {editingArticle ? `Edit Article (ID: ${editingArticle.id})` : 'Add New Article'}
//           </Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body style={{ maxHeight: '55vh', overflowY: 'auto', padding: '16px 20px' }}>
//             <Form.Group className="mb-2">
//               <Form.Label className="small fw-bold">Title *</Form.Label>
//               <Form.Control size="sm" type="text" name="title" value={formData.title} onChange={handleInputChange} required />
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label className="small fw-bold">Summary *</Form.Label>
//               <Form.Control size="sm" as="textarea" name="summary" value={formData.summary} onChange={handleInputChange} rows={2} required />
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label className="small fw-bold">Content *</Form.Label>
//               <Form.Control size="sm" as="textarea" name="content" value={formData.content} onChange={handleInputChange} rows={5} required />
//             </Form.Group>

//             {/* <Form.Group className="mb-2">
//               <Form.Label className="small fw-bold">Image</Form.Label>
//               <Form.Control size="sm" type="file" name="image" value={formData.imageUrl} onChange={handleInputChange} placeholder="/Images/Articles/example.jpeg" />
//             </Form.Group> */}
//             <Form.Group className="mb-2">
//   <Form.Label className="small fw-bold">Image</Form.Label>
//   <Form.Control 
//     size="sm" 
//     type="file" 
//     name="image"
//     accept="image/*"
//     onChange={(e) => {
//       const file = (e.target as HTMLInputElement).files?.[0]
//       if (file) {
//         // محتاجة backend endpoint لرفع الصور
//         console.log('File selected:', file.name)
//       }
//     }} 
//   />
// </Form.Group>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-2">
//                   <Form.Label className="small fw-bold">Category *</Form.Label>
//                   <Form.Select size="sm" name="category" value={formData.category} onChange={handleInputChange} required>
//                     <option value="">Select category</option>
//                     {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-2">
//                   <Form.Label className="small fw-bold">Publish Date *</Form.Label>
//                   <Form.Control size="sm" type="date" name="publishDate" value={formData.publishDate} onChange={handleInputChange} required />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group className="mb-2">
//               <Form.Label className="small fw-bold">Source *</Form.Label>
//               <Form.Control size="sm" type="text" name="source" value={formData.source} onChange={handleInputChange} placeholder="World Health Organization (2024)" required />
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer style={{ padding: '10px 20px' }}>
//             <Button variant="secondary" size="sm" onClick={handleCloseModal}>Cancel</Button>
//             <Button type="submit" size="sm" className="btn-primary-green">
//               {editingArticle ? 'Update Article' : 'Create Article'}
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </Container>
//   )
// }
// 

// 'use client'

// import { useState, useEffect } from 'react'
// import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from 'react-bootstrap'
// import { articlesApi } from '@/data/api/articles'
// import { article } from '../../types/article'

// export default function ArticleManagementClient() {
//   const [articles, setArticles] = useState<article[]>([])
//   const [loading, setLoading] = useState(true)
//   const [showModal, setShowModal] = useState(false)
//   const [editingArticle, setEditingArticle] = useState<article | null>(null)
//   const [successMessage, setSuccessMessage] = useState('')

//   const [formData, setFormData] = useState({
//     Title: '',
//     Summary: '',
//     Content: '',
//     ImageUrl: '',
//     Source: '',
//     Category: '',
//     PublishDate: '',
//   })

//   const categories = ['Prevention', 'Emergency Care', 'Awareness', 'Symptoms', 'Vaccination']

//   useEffect(() => {
//     loadArticles()
//   }, [])

//   const loadArticles = async () => {
//     try {
//       setLoading(true)
//       const response = await fetch('/api/dashboard/articles', {
//         headers: { 'ngrok-skip-browser-warning': 'true' }
//       })
//       const data = await response.json()
//       setArticles(data)
//     } catch (error) {
//       console.error('Failed to load articles:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleShowModal = (article?: article) => {
//     if (article) {
//       setEditingArticle(article)
//       setFormData({
//         Title: article.title,
//         Summary: article.summary,
//         Content: article.content,
//         ImageUrl: article.imageUrl,
//         Source: article.source,
//         Category: article.category,
//         PublishDate: article.publishDate?.split('T')[0] || '',
//       })
//     } else {
//       setEditingArticle(null)
//       setFormData({
//         Title: '',
//         Summary: '',
//         Content: '',
//         ImageUrl: '',
//         Source: '',
//         Category: '',
//         PublishDate: new Date().toISOString().split('T')[0],
//       })
//     }
//     setShowModal(true)
//   }

//   const handleCloseModal = () => {
//     setShowModal(false)
//     setEditingArticle(null)
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const articleData = {
//         Title: formData.Title,
//         Summary: formData.Summary,
//         Content: formData.Content,
//         ImageUrl: formData.ImageUrl,
//         Source: formData.Source,
//         Category: formData.Category,
//         PublishDate: new Date(formData.PublishDate).toISOString(),
//         Published: true
//       }

//       if (editingArticle) {
//         await articlesApi.update(editingArticle.id, articleData)
//         setSuccessMessage('Article updated successfully!')
//       } else {
//         const response = await fetch('/api/dashboard/articles', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'ngrok-skip-browser-warning': 'true'
//           },
//           body: JSON.stringify(articleData)
//         })
//         if (!response.ok) {
//           throw new Error(`Failed: ${response.status}`)
//         }
//         setSuccessMessage('Article created successfully!')
//       }

//       await loadArticles()
//       handleCloseModal()
//       setTimeout(() => setSuccessMessage(''), 3000)
//       window.dispatchEvent(new Event('articlesUpdated'))
//     } catch (error) {
//       console.error('Error saving article:', error)
//       alert('Failed to save article. Please try again.')
//     }
//   }

//   const handleDelete = async (id: number) => {
//     if (window.confirm('Are you sure you want to delete this article?')) {
//       try {
//         await articlesApi.delete(id)
//         setSuccessMessage('Article deleted successfully!')
//         await loadArticles()
//         setTimeout(() => setSuccessMessage(''), 3000)
//         window.dispatchEvent(new Event('articlesUpdated'))
//       } catch (error) {
//         console.error('Error deleting article:', error)
//         alert('Failed to delete article. Please try again.')
//       }
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
//                   <Badge bg="info">{article.category}</Badge>
//                   <Badge bg="dark">ID: {article.id}</Badge>
//                 </div>

//                 {article.imageUrl && (
//                   <img
//                     src={`${process.env.NEXT_PUBLIC_API_URL}${article.imageUrl}`}
//                     alt={article.title}
//                     style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }}
//                   />
//                 )}

//                 <h5 className="card-title mb-2">{article.title}</h5>
//                 <p className="text-muted small mb-2">{article.summary}</p>

//                 <div className="text-muted small mb-3">
//                   <i className="bi bi-person me-1"></i> {article.source}
//                   <br />
//                   <i className="bi bi-calendar me-1"></i> {new Date(article.publishDate).toLocaleDateString()}
//                 </div>

//                 <div className="d-flex gap-2 flex-wrap">
//                   <Button variant="outline-primary" size="sm" onClick={() => handleShowModal(article)}>
//                     <i className="bi bi-pencil"></i> Edit
//                   </Button>
//                   <Button variant="outline-danger" size="sm" onClick={() => handleDelete(article.id)}>
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

//       <Modal
//         show={showModal}
//         onHide={handleCloseModal}
//         centered
//         dialogClassName="article-modal"
//       >
//         <Modal.Header closeButton style={{ background: '#86C8BC', color: 'white' }}>
//           <Modal.Title style={{ fontSize: '1.1rem' }}>
//             {editingArticle ? `Edit Article (ID: ${editingArticle.id})` : 'Add New Article'}
//           </Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body style={{ maxHeight: '55vh', overflowY: 'auto', padding: '16px 20px' }}>
//             <Form.Group className="mb-2">
//               <Form.Label className="small fw-bold">Title *</Form.Label>
//               <Form.Control size="sm" type="text" name="Title" value={formData.Title} onChange={handleInputChange} required />
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label className="small fw-bold">Summary *</Form.Label>
//               <Form.Control size="sm" as="textarea" name="Summary" value={formData.Summary} onChange={handleInputChange} rows={2} required />
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label className="small fw-bold">Content *</Form.Label>
//               <Form.Control size="sm" as="textarea" name="Content" value={formData.Content} onChange={handleInputChange} rows={5} required />
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label className="small fw-bold">Image</Form.Label>
//               <Form.Control
//                 size="sm"
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = (e.target as HTMLInputElement).files?.[0]
//                   if (file) {
//                     console.log('File selected:', file.name)
//                   }
//                 }}
//               />
//             </Form.Group>

//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-2">
//                   <Form.Label className="small fw-bold">Category *</Form.Label>
//                   <Form.Select size="sm" name="Category" value={formData.Category} onChange={handleInputChange} required>
//                     <option value="">Select category</option>
//                     {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-2">
//                   <Form.Label className="small fw-bold">Publish Date *</Form.Label>
//                   <Form.Control size="sm" type="date" name="PublishDate" value={formData.PublishDate} onChange={handleInputChange} required />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Form.Group className="mb-2">
//               <Form.Label className="small fw-bold">Source *</Form.Label>
//               <Form.Control size="sm" type="text" name="Source" value={formData.Source} onChange={handleInputChange} placeholder="World Health Organization (2024)" required />
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer style={{ padding: '10px 20px' }}>
//             <Button variant="secondary" size="sm" onClick={handleCloseModal}>Cancel</Button>
//             <Button type="submit" size="sm" className="btn-primary-green">
//               {editingArticle ? 'Update Article' : 'Create Article'}
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </Container>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from 'react-bootstrap'
import { articlesApi } from '@/data/api/articles'
import { article } from '../../types/article'

export default function ArticleManagementClient() {
  const [articles, setArticles] = useState<article[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingArticle, setEditingArticle] = useState<article | null>(null)
  const [successMessage, setSuccessMessage] = useState('')

  const [formData, setFormData] = useState({
    Title: '',
    Summary: '',
    Content: '',
    ImageUrl: '',
    Source: '',
    Category: '',
    PublishDate: '',
  })

  const categories = ['Prevention', 'Emergency Care', 'Awareness', 'Symptoms', 'Vaccination']

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/dashboard/articles', {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      })
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error('Failed to load articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleShowModal = (article?: article) => {
    if (article) {
      setEditingArticle(article)
      setFormData({
        Title: article.title,
        Summary: article.summary,
        Content: article.content,
        ImageUrl: article.imageUrl,
        Source: article.source,
        Category: article.category,
        PublishDate: article.publishDate?.split('T')[0] || '',
      })
    } else {
      setEditingArticle(null)
      setFormData({
        Title: '',
        Summary: '',
        Content: '',
        ImageUrl: '',
        Source: '',
        Category: '',
        PublishDate: new Date().toISOString().split('T')[0],
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingArticle(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingArticle) {
        // PascalCase for C# backend, cast to any to bypass TS type check
        const updateData = {
          Title: formData.Title,
          Summary: formData.Summary,
          Content: formData.Content,
          ImageUrl: formData.ImageUrl,
          Source: formData.Source,
          Category: formData.Category,
          PublishDate: new Date(formData.PublishDate).toISOString(),
          Published: true
        }
        await articlesApi.update(editingArticle.id, updateData as any)
        setSuccessMessage('Article updated successfully!')
      } else {
        // PascalCase for backend POST (C# / .NET)
        const createData = {
          Title: formData.Title,
          Summary: formData.Summary,
          Content: formData.Content,
          ImageUrl: formData.ImageUrl,
          Source: formData.Source,
          Category: formData.Category,
          PublishDate: new Date(formData.PublishDate).toISOString(),
          Published: true
        }
        const response = await fetch('/api/dashboard/articles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          },
          body: JSON.stringify(createData)
        })
        if (!response.ok) {
          throw new Error(`Failed: ${response.status}`)
        }
        setSuccessMessage('Article created successfully!')
      }

      await loadArticles()
      handleCloseModal()
      setTimeout(() => setSuccessMessage(''), 3000)
      window.dispatchEvent(new Event('articlesUpdated'))
    } catch (error) {
      console.error('Error saving article:', error)
      alert('Failed to save article. Please try again.')
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await articlesApi.delete(id)
        setSuccessMessage('Article deleted successfully!')
        await loadArticles()
        setTimeout(() => setSuccessMessage(''), 3000)
        window.dispatchEvent(new Event('articlesUpdated'))
      } catch (error) {
        console.error('Error deleting article:', error)
        alert('Failed to delete article. Please try again.')
      }
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
                  <Badge bg="info">{article.category}</Badge>
                  <Badge bg="dark">ID: {article.id}</Badge>
                </div>

                {article.imageUrl && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${article.imageUrl}`}
                    alt={article.title}
                    style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }}
                  />
                )}

                <h5 className="card-title mb-2">{article.title}</h5>
                <p className="text-muted small mb-2">{article.summary}</p>

                <div className="text-muted small mb-3">
                  <i className="bi bi-person me-1"></i> {article.source}
                  <br />
                  <i className="bi bi-calendar me-1"></i> {new Date(article.publishDate).toLocaleDateString()}
                </div>

                <div className="d-flex gap-2 flex-wrap">
                  <Button variant="outline-primary" size="sm" onClick={() => handleShowModal(article)}>
                    <i className="bi bi-pencil"></i> Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(article.id)}>
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

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        dialogClassName="article-modal"
      >
        <Modal.Header closeButton style={{ background: '#86C8BC', color: 'white' }}>
          <Modal.Title style={{ fontSize: '1.1rem' }}>
            {editingArticle ? `Edit Article (ID: ${editingArticle.id})` : 'Add New Article'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body style={{ maxHeight: '55vh', overflowY: 'auto', padding: '16px 20px' }}>
            <Form.Group className="mb-2">
              <Form.Label className="small fw-bold">Title *</Form.Label>
              <Form.Control size="sm" type="text" name="Title" value={formData.Title} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small fw-bold">Summary *</Form.Label>
              <Form.Control size="sm" as="textarea" name="Summary" value={formData.Summary} onChange={handleInputChange} rows={2} required />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small fw-bold">Content *</Form.Label>
              <Form.Control size="sm" as="textarea" name="Content" value={formData.Content} onChange={handleInputChange} rows={5} required />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small fw-bold">Image</Form.Label>
              <Form.Control
                size="sm"
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) {
                    console.log('File selected:', file.name)
                  }
                }}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">Category *</Form.Label>
                  <Form.Select size="sm" name="Category" value={formData.Category} onChange={handleInputChange} required>
                    <option value="">Select category</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">Publish Date *</Form.Label>
                  <Form.Control size="sm" type="date" name="PublishDate" value={formData.PublishDate} onChange={handleInputChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-2">
              <Form.Label className="small fw-bold">Source *</Form.Label>
              <Form.Control size="sm" type="text" name="Source" value={formData.Source} onChange={handleInputChange} placeholder="World Health Organization (2024)" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{ padding: '10px 20px' }}>
            <Button variant="secondary" size="sm" onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" size="sm" className="btn-primary-green">
              {editingArticle ? 'Update Article' : 'Create Article'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}