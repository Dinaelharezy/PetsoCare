'use client'

import { Card, Button } from 'react-bootstrap'
import { useRouter } from 'next/navigation'

export default function ArticleManagement() {
  const router = useRouter()

  const handleAddArticle = () => {
    // Navigate to article management page
    router.push('/admin/articles')
  }

  const handleViewArticles = () => {
    // Navigate to article management page
    router.push('/admin/articles')
  }

  return (
    <Card className="animate-card">
      <Card.Body>
        <h5 className="card-title">Article Management</h5>
        <div className="d-grid gap-3">
          <Button 
            className="btn-primary-green" 
            onClick={handleAddArticle}
          >
            <i className="bi bi-file-earmark-plus me-2"></i>
            Add New Article
          </Button>
          <Button 
            variant="outline-secondary" 
            onClick={handleViewArticles}
          >
            View All Articles
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}