
'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from 'react-bootstrap'
import { articlesApi } from '@/data/api/articles'
import { article } from '../../types/article'

export default function ArticleManagementPage() {
  const [articles, setArticles] = useState<article[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingArticle, setEditingArticle] = useState<article | null>(null)
  const [successMessage, setSuccessMessage] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    imageUrl: '',
    source: '',
    category: '',
    publishDate: '',
  })

  const categories = ['Health', 'Nutrition', 'Behavior', 'Prevention', 'Emergency Care', 'Senior Care', 'Dental Care', 'Awareness', 'Symptoms', 'Vaccination']

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

  const handleShowModal = (article?: article) => {
    if (article) {
      setEditingArticle(article)
      setFormData({
        title: article.title,
        summary: article.summary,
        content: article.content,
        imageUrl: article.imageUrl,
        source: article.source,
        category: article.category,
        publishDate: article.publishDate?.split('T')[0] || '',
      })
    } else {
      setEditingArticle(null)
      setFormData({
        title: '',
        summary: '',
        content: '',
        imageUrl: '',
        source: '',
        category: '',
        publishDate: new Date().toISOString().split('T')[0],
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
      const articleData = {
        title: formData.title,
        summary: formData.summary,
        content: formData.content,
        imageUrl: formData.imageUrl,
        source: formData.source,
        category: formData.category,
        publishDate: new Date(formData.publishDate).toISOString(),
      }

      if (editingArticle) {
        await articlesApi.update(editingArticle.id, articleData)
        setSuccessMessage('Article updated successfully!')
      } else {
        await articlesApi.create(articleData)
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
                    src={article.imageUrl}
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

      <Modal show={showModal} onHide={handleCloseModal} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingArticle ? `Edit Article (ID: ${editingArticle.id})` : 'Add New Article'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Summary *</Form.Label>
              <Form.Control as="textarea" name="summary" value={formData.summary} onChange={handleInputChange} rows={2} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content *</Form.Label>
              <Form.Control as="textarea" name="content" value={formData.content} onChange={handleInputChange} rows={8} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="/Images/Articles/example.jpeg" />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category *</Form.Label>
                  <Form.Select name="category" value={formData.category} onChange={handleInputChange} required>
                    <option value="">Select category</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Publish Date *</Form.Label>
                  <Form.Control type="date" name="publishDate" value={formData.publishDate} onChange={handleInputChange} required />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Source *</Form.Label>
              <Form.Control type="text" name="source" value={formData.source} onChange={handleInputChange} placeholder="World Health Organization (2024)" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" className="btn-primary-green">
              {editingArticle ? 'Update Article' : 'Create Article'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}