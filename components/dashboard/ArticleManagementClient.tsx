
//good but photos not working
'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from 'react-bootstrap'
import { article } from '../../types/article'

export default function ArticleManagementClient() {
  const [articles, setArticles] = useState<article[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingArticle, setEditingArticle] = useState<article | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)

  const [formData, setFormData] = useState({
    Title: '',
    Summary: '',
    Content: '',
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
      if (Array.isArray(data)) {
        setArticles(data)
      } else {
        setArticles([])
      }
    } catch (error) {
      console.error('Failed to load articles:', error)
      setArticles([])
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
        Source: '',
        Category: '',
        PublishDate: new Date().toISOString().split('T')[0],
      })
    }
    setImageFile(null)
    setError('')
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingArticle(null)
    setImageFile(null)
    setError('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      // ✅ FormData عشان IFormFile في الـ .NET
      const formDataToSend = new FormData()
      formDataToSend.append('Title', formData.Title)
      formDataToSend.append('Summary', formData.Summary)
      formDataToSend.append('Content', formData.Content)
      formDataToSend.append('Category', formData.Category)
      formDataToSend.append('PublishDate', new Date(formData.PublishDate).toISOString())
      formDataToSend.append('Source', formData.Source)
      formDataToSend.append('Published', 'true')

      if (imageFile) {
        formDataToSend.append('Image', imageFile) // ← اسمه Image زي الـ DTO
      }

      if (editingArticle) {
        const response = await fetch(`/api/dashboard/articles/${editingArticle.id}`, {
          method: 'PUT',
          headers: { 'ngrok-skip-browser-warning': 'true' },
          // ❌ متحطش Content-Type مع FormData
          body: formDataToSend
        })
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}))
          console.error('Update error:', errData)
          setError(`Failed to update: ${response.status}`)
          return
        }
        setSuccessMessage('Article updated successfully!')
      } else {
        const response = await fetch('/api/dashboard/articles', {
          method: 'POST',
          headers: { 'ngrok-skip-browser-warning': 'true' },
          body: formDataToSend
        })
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}))
          console.error('Create error:', errData)
          setError(`Failed to create: ${response.status}`)
          return
        }
        setSuccessMessage('Article created successfully!')
      }

      setImageFile(null)
      await loadArticles()
      handleCloseModal()
      setTimeout(() => setSuccessMessage(''), 3000)
      window.dispatchEvent(new Event('articlesUpdated'))
    } catch (error) {
      console.error('Error saving article:', error)
      setError('Failed to save article. Please try again.')
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        const response = await fetch(`/api/dashboard/articles/${id}`, {
          method: 'DELETE',
          headers: { 'ngrok-skip-browser-warning': 'true' }
        })
        if (!response.ok) {
          alert(`Failed to delete: ${response.status}`)
          return
        }
        setSuccessMessage('Article deleted successfully!')
        await loadArticles()
        setTimeout(() => setSuccessMessage(''), 3000)
        window.dispatchEvent(new Event('articlesUpdated'))
      } catch (error) {
        console.error('Error deleting article:', error)
        alert('Failed to delete article.')
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

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg" scrollable>
        <Modal.Header closeButton style={{ background: '#86C8BC', color: 'white' }}>
          <Modal.Title style={{ fontSize: '1.1rem' }}>
            {editingArticle ? `Edit Article (ID: ${editingArticle.id})` : 'Add New Article'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto', padding: '16px 20px' }}>

            {error && (
              <Alert variant="danger" className="mb-3">{error}</Alert>
            )}

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
                accept="image/*"
                onChange={(e) => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) setImageFile(file)
                }}
              />
              {editingArticle?.imageUrl && !imageFile && (
                <small className="text-muted mt-1 d-block">
                  <i className="bi bi-image me-1"></i>
                  Current image exists — upload new to replace
                </small>
              )}
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