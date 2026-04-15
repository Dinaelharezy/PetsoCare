'use client'

import { Card, Button } from 'react-bootstrap'
import { useRouter } from 'next/navigation'

export default function ShelterManagementDash() {
  const router = useRouter()

  const handleAddShelter = () => {
    // Navigate to clinic management page
    router.push('/admin/shelters')
  }

  const handleViewShelter = () => {
    // Navigate to clinic management page
    router.push('/admin/shelters')
  }

  return (
    <Card className="animate-card p-2">
      <Card.Body>
        <h5 className="card-title p-1">Shelter Management</h5>
        <div className="d-grid gap-3">
          <Button 
            className="background-for-app" 
            onClick={handleAddShelter}
          >
            <i className="bi bi-person-plus me-2"></i>
            Add New Shelter
          </Button>
          <Button 
            variant="outline-secondary" 
            onClick={handleViewShelter}
          >
            View All Shelters
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}