

'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from 'react-bootstrap'
import { article } from '../../types/article'
import { getImageSrc } from '@/utils/imageUtils'
import { apiUrl } from '@/lib/api'

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

// export const getImageSrc = (src?: string): string | null => {
//   if (!src) return null
//   if (src.startsWith('http')) return `/api/image?url=${encodeURIComponent(src)}`
//   if (src.startsWith('/Images') || src.startsWith('/images') || src.startsWith('/uploads') || src.startsWith('/api')) {
//     const full = BASE_URL ? `${BASE_URL}${src}` : src
//     return `/api/image?url=${encodeURIComponent(full)}`
//   }
//   if (src.includes('images/') || src.includes('Images/') || src.includes('uploads/')) {
//     const full = BASE_URL ? `${BASE_URL}/${src}` : `/${src}`
//     return `/api/image?url=${encodeURIComponent(full)}`
//   }
//   if (src.startsWith('/')) return src
//   return null
// }

export default function ArticleManagementClient() {
  const [articles,       setArticles]       = useState<article[]>([])
  const [loading,        setLoading]        = useState(true)
  const [showModal,      setShowModal]      = useState(false)
  const [editingArticle, setEditingArticle] = useState<article | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [error,          setError]          = useState('')
  const [imageFile,      setImageFile]      = useState<File | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    Title:       '',
    Summary:     '',
    Content:     '',
    TitleEn:     '',
    SummaryEn:   '',
    ContentEn:   '',
    Source:      '',
    imageFile:   '',
    Category:    '',
    PublishDate: '',
  })

  const categories = ['Prevention', 'Emergency Care', 'Awareness', 'Symptoms', 'Vaccination']

 

  const loadArticles = async () => {
    try {
      setLoading(true)
      const response = await fetch(apiUrl(`dashboard/articles?lang=en&t=${Date.now()}`), {
        headers: { 'ngrok-skip-browser-warning': 'true' },
        cache: 'no-store',
      })
      const data = await response.json()
      setArticles(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load articles:', error)
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadArticles() }, [])
  
  const handleDeleteClick = (id: number) => {
    setDeletingId(id)
    setShowDeleteConfirm(true)
  }

  const confirmDelete = async () => {
    if (!deletingId) return
    
    try {
      const response = await fetch(apiUrl(`dashboard/articles/${deletingId}`), {
        method: 'DELETE',
        headers: { 'ngrok-skip-browser-warning': 'true' },
      })
      if (!response.ok) { 
        alert(`Failed to delete: ${response.status}`)
        return
      }
      notifySuccess('Article deleted successfully!')
      await loadArticles()
    } catch (err) {
      console.error('Error deleting article:', err)
      alert('Failed to delete article. Please try again.')
    } finally {
      setShowDeleteConfirm(false)
      setDeletingId(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setDeletingId(null)
  }

  const handleShowModal = (article?: article) => {
    if (article) {
      setEditingArticle(article)
      setFormData({
        Title:       article.title,
        Summary:     article.summary,
        Content:     article.content,
        TitleEn:     article.titleEn   ?? article.title,
        SummaryEn:   article.summaryEn ?? article.summary,
        ContentEn:   article.contentEn ?? article.content,
        Source:      article.source,
        imageFile:   article.imageUrl,
        Category:    article.category,
        PublishDate: article.publishDate?.split('T')[0] || '',
      })
    } else {
      setEditingArticle(null)
      setFormData({
        Title: '', Summary: '', Content: '',
        TitleEn: '', SummaryEn: '', ContentEn: '',
        imageFile: '', Source: '', Category: '',
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
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const notifySuccess = (msg: string) => {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(''), 3000)
    window.dispatchEvent(new Event('articlesUpdated'))
  }

  // 
  

  // ضع الكود ده بدل handleSubmit الموجودة في ArticleManagementClient

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (!formData.TitleEn.trim())   { setError("Title is required");        return; }
  if (!formData.SummaryEn.trim()) { setError("Summary is required");      return; }
  if (!formData.ContentEn.trim()) { setError("Content is required");      return; }
  if (!formData.Category.trim())  { setError("Category is required");     return; }
  if (!formData.Source.trim())    { setError("Source is required");       return; }
  if (!formData.PublishDate)      { setError("Publish date is required"); return; }

  try {
    if (editingArticle) {
      // ─── EDIT ──────────────────────────────────────────────────────────────
      if (imageFile) {
        // لو فيه صورة → بعت FormData واحدة بكل حاجة
        const fd = new FormData();
        fd.append("Title",       formData.TitleEn.trim());
        fd.append("Summary",     formData.SummaryEn.trim());
        fd.append("Content",     formData.ContentEn.trim());
        fd.append("TitleEn",     formData.TitleEn.trim());
        fd.append("SummaryEn",   formData.SummaryEn.trim());
        fd.append("ContentEn",   formData.ContentEn.trim());
        fd.append("Category",    formData.Category.trim());
        fd.append("PublishDate", new Date(formData.PublishDate).toISOString());
        fd.append("Source",      formData.Source.trim());
        fd.append("Published",   "true");
        fd.append("Image",       imageFile);

        const res = await fetch(apiUrl(`dashboard/articles/${editingArticle.id}`), {
          method: "PUT",
          headers: { "ngrok-skip-browser-warning": "true" },
          body: fd,
        });

        if (!res.ok) { setError(`Failed to update: ${res.status}`); return; }
      } else {
        // مفيش صورة → بعت JSON
        const res = await fetch(apiUrl(`dashboard/articles/${editingArticle.id}`), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({
            title:       formData.TitleEn,
            summary:     formData.SummaryEn,
            content:     formData.ContentEn,
            titleEn:     formData.TitleEn,
            summaryEn:   formData.SummaryEn,
            contentEn:   formData.ContentEn,
            category:    formData.Category,
            publishDate: new Date(formData.PublishDate).toISOString(),
            source:      formData.Source,
            published:   true,
          }),
        });

        if (!res.ok) { setError(`Failed to update: ${res.status}`); return; }
      }

      notifySuccess("Article updated successfully!");

    } else {
      // ─── CREATE ────────────────────────────────────────────────────────────
      const fd = new FormData();
      fd.append("Title",       formData.TitleEn.trim());
      fd.append("Summary",     formData.SummaryEn.trim());
      fd.append("Content",     formData.ContentEn.trim());
      fd.append("TitleEn",     formData.TitleEn.trim());
      fd.append("SummaryEn",   formData.SummaryEn.trim());
      fd.append("ContentEn",   formData.ContentEn.trim());
      fd.append("Category",    formData.Category.trim());
      fd.append("PublishDate", new Date(formData.PublishDate).toISOString());
      fd.append("Source",      formData.Source.trim());
      fd.append("Published",   "true");
      if (imageFile) fd.append("Image", imageFile);

      const res = await fetch(apiUrl(`dashboard/articles`), {
        method: "POST",
        headers: { "ngrok-skip-browser-warning": "true" },
        body: fd,
      });

      if (!res.ok) { setError(`Failed to create: ${res.status}`); return; }

      notifySuccess("Article created successfully!");
    }

    setImageFile(null);
    await loadArticles();
    handleCloseModal();

  } catch (error) {
    console.error("Error saving article:", error);
    setError("Failed to save article. Please try again.");
  }
};

  const handleDelete = async (id: number) => {
    handleDeleteClick(id)
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
        <Button className="background-for-app" onClick={() => handleShowModal()}>
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
                    src={getImageSrc(article.imageUrl) || '/fallback.png'}
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

      {/* Modal for Create/Edit */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg" scrollable>
        <Modal.Header closeButton style={{ color: 'white' }}>
          <Modal.Title style={{ fontSize: '1.1rem' }}>
            {editingArticle ? `Edit Article (ID: ${editingArticle.id})` : 'Add New Article'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto', padding: '16px 20px' }}>

            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

            <Form.Group className="mb-2">
              <Form.Label className="small fw-bold">Title *</Form.Label>
              <Form.Control size="sm" type="text" name="TitleEn" value={formData.TitleEn} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small fw-bold">Summary *</Form.Label>
              <Form.Control size="sm" as="textarea" name="SummaryEn" value={formData.SummaryEn} onChange={handleInputChange} rows={2}  />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small fw-bold">Content *</Form.Label>
              <Form.Control size="sm" as="textarea" name="ContentEn" value={formData.ContentEn} onChange={handleInputChange} rows={5} />
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
                  <Form.Select size="sm" name="Category" value={formData.Category} onChange={handleInputChange} >
                    <option value="">Select category</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">Publish Date *</Form.Label>
                  <Form.Control size="sm" type="date" name="PublishDate" value={formData.PublishDate} onChange={handleInputChange}  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-2">
              <Form.Label className="small fw-bold">Source *</Form.Label>
              <Form.Control size="sm" type="text" name="Source" value={formData.Source} onChange={handleInputChange} placeholder="World Health Organization (2024)"  />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer style={{ padding: '10px 20px' }}>
            <Button variant="secondary" size="sm" onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" size="sm" className="background-for-app">
              {editingArticle ? 'Update Article' : 'Create Article'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={cancelDelete} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="text-danger mb-3">
            <i className="bi bi-exclamation-octagon-fill me-2 " />
            Delete Article
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="pt-0">
          <div className="text-center py-3">
            <div className="mb-3">
              <i className="bi bi-trash3-fill text-danger" style={{ fontSize: '4rem' }} />
            </div>
            <h5>Are you absolutely sure?</h5>
            <p className="text-muted mb-0">
              This action <strong>cannot be undone</strong>. This will permanently delete the article
              and remove all associated data from our servers.
            </p>
          </div>
        </Modal.Body>
        
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" onClick={cancelDelete}>
            <i className="bi bi-arrow-left me-1" /> Nevermind
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            <i className="bi bi-trash me-1" /> Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  )
}