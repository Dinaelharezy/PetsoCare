'use client'

import { Card, Button } from 'react-bootstrap'
import { useRouter } from 'next/navigation'

export default function VideoManagementDash() {
  const router = useRouter()

  const handleAddVideo = () => {
    // Navigate to clinic management page
    router.push('/admin/videos')
  }

  const handleViewVideo = () => {
    // Navigate to clinic management page
    router.push('/admin/videos')
  }

  return (
    <Card className="animate-card p-2">
      <Card.Body>
        <h5 className="card-title p-1">Video Management</h5>
        <div className="d-grid gap-3">
          <Button 
            className="background-for-app" 
            onClick={handleAddVideo}
          >
            <i className="bi bi-person-plus me-2"></i>
            Add New Video
          </Button>
          <Button 
            variant="outline-secondary" 
            onClick={handleViewVideo}
          >
            View All Videos
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}