'use client'

import { Card, Button } from 'react-bootstrap'

export default function ArticleManagement() {
  const handleAddArticle = () => {
    console.log('Add new article')
  }

  const handleViewArticles = () => {
    console.log('View all articles')
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