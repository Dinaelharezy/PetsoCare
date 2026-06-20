

'use client'

import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from 'react-bootstrap'
import { article } from '../../../types/article'
import { getImageSrc } from '@/utils/imageUtils'
import { FlashAlert, PageHeader, PageLoader, EmptyState, DeleteConfirmModal } from '../pages/Dashboardui'
import { useDashboardArticle, CATEGORIES } from '../hooks/useDashboardArticle'

// ─── Component ───────────────────────────────────────────────────────────────

export default function ArticleManagementClient() {
  const {
    articles, loading, deletingTitle,
    showModal, editingArticle, formData, formError, imageFile,
    openModal, closeModal, handleInputChange, handleImageChange,
    handleSubmit, handleDelete,
    flash, clearFlash,
    deletingId, requestDelete, cancelDelete, confirmDelete,
  } = useDashboardArticle()

  if (loading) return <PageLoader />

  return (
    <Container fluid className="px-4 py-4">
      <PageHeader
        title="Article Management"
        action={{ label: 'Add New Article', icon: 'bi bi-file-earmark-plus', onClick: () => openModal() }}
      />

      <FlashAlert message={flash} onClose={clearFlash} />

      <Row className="g-4">
        {articles.map((article: article) => (
          <Col lg={6} xl={4} key={article.id}>
            <Card className="h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Badge bg="info">{article.category}</Badge>
                  <Badge bg="dark">ID: {article.id}</Badge>
                </div>

                {article.imageUrl && (
                  <img
                    src={getImageSrc(article.imageUrl) || '/fallback.png'}
                    alt={article.title}
                    style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }}
                  />
                )}

                <h5 className="card-title mb-2">{article.title}</h5>
                <p className="text-muted small mb-2">{article.summary}</p>

                <div className="text-muted small mb-3">
                  <i className="bi bi-person me-1" /> {article.source}
                  <br />
                  <i className="bi bi-calendar me-1" /> {new Date(article.publishDate).toLocaleDateString()}
                </div>

                <div className="d-flex gap-2 flex-wrap">
                  <Button variant="outline-primary" size="sm" onClick={() => openModal(article)}>
                    <i className="bi bi-pencil" /> Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => requestDelete(article.id)}>
                    <i className="bi bi-trash" /> Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {articles.length === 0 && (
        <Card className="mt-3">
          <Card.Body>
            <EmptyState icon="📄" message="No articles found. Create your first article!" />
          </Card.Body>
        </Card>
      )}

      {/* Create / Edit Modal */}
      <Modal show={showModal} onHide={closeModal} centered size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1.1rem' }}>
            {editingArticle ? `Edit Article (ID: ${editingArticle.id})` : 'Add New Article'}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto', padding: '16px 20px' }}>
            {formError && <Alert variant="danger" className="mb-3">{formError}</Alert>}

            <Form.Group className="mb-2">
              <Form.Label className="small fw-bold">Title *</Form.Label>
              <Form.Control
                size="sm" type="text" name="TitleEn"
                value={formData.TitleEn} onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small fw-bold">Summary *</Form.Label>
              <Form.Control
                size="sm" as="textarea" rows={2} name="SummaryEn"
                value={formData.SummaryEn} onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small fw-bold">Content *</Form.Label>
              <Form.Control
                size="sm" as="textarea" rows={5} name="ContentEn"
                value={formData.ContentEn} onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="small fw-bold">Image</Form.Label>
              <Form.Control
                size="sm" type="file" accept="image/*"
                onChange={e => {
                  const file = (e.target as HTMLInputElement).files?.[0]
                  if (file) handleImageChange(file)
                }}
              />
              {editingArticle?.imageUrl && !imageFile && (
                <small className="text-muted mt-1 d-block">
                  <i className="bi bi-image me-1" /> Current image exists — upload new to replace
                </small>
              )}
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">Category *</Form.Label>
                  <Form.Select size="sm" name="Category" value={formData.Category} onChange={handleInputChange}>
                    <option value="">Select category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="small fw-bold">Publish Date *</Form.Label>
                  <Form.Control
                    size="sm" type="date" name="PublishDate"
                    value={formData.PublishDate} onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-2">
              <Form.Label className="small fw-bold">Source *</Form.Label>
              <Form.Control
                size="sm" type="text" name="Source"
                value={formData.Source} onChange={handleInputChange}
                placeholder="World Health Organization (2024)"
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer style={{ padding: '10px 20px' }}>
            <Button variant="secondary" size="sm" onClick={closeModal}>Cancel</Button>
            <Button type="submit" size="sm" className="background-for-app">
              {editingArticle ? 'Update Article' : 'Create Article'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Modal */}
      <DeleteConfirmModal
        show={deletingId !== null}
        title="Delete Article"
        icon="📄"
        itemName={deletingTitle}
        onCancel={cancelDelete}
        onConfirm={() => confirmDelete(handleDelete)}
      />
    </Container>
  )
}