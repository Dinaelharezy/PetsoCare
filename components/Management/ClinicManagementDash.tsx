'use client'

import { Card, Button } from 'react-bootstrap'
import { useRouter } from 'next/navigation'

export default function ClinicManagementDash() {
  const router = useRouter()

  const handleAddClinic = () => {
    // Navigate to clinic management page
    router.push('/admin/clinics')
  }

  const handleViewClinics = () => {
    // Navigate to clinic management page
    router.push('/admin/clinics')
  }

  return (
    <Card className="animate-card">
      <Card.Body>
        <h5 className="card-title">Clinic Management</h5>
        <div className="d-grid gap-3">
          <Button 
            className="btn-primary-green" 
            onClick={handleAddClinic}
          >
            <i className="bi bi-person-plus me-2"></i>
            Add New Clinic
          </Button>
          <Button 
            variant="outline-secondary" 
            onClick={handleViewClinics}
          >
            View All CLinics
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}