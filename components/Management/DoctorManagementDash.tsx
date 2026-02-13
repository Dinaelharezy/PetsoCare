'use client'

import { Card, Button } from 'react-bootstrap'
import { useRouter } from 'next/navigation'

export default function DoctorManagement() {
  const router = useRouter()

  const handleAddDoctor = () => {
    // Navigate to doctor management page
    router.push('/admin/doctors')
  }

  const handleViewDoctors = () => {
    // Navigate to doctor management page
    router.push('/admin/doctors')
  }

  return (
    <Card className="animate-card">
      <Card.Body>
        <h5 className="card-title">Doctor Management</h5>
        <div className="d-grid gap-3">
          <Button 
            className="btn-primary-green" 
            onClick={handleAddDoctor}
          >
            <i className="bi bi-person-plus me-2"></i>
            Add New Doctor
          </Button>
          <Button 
            variant="outline-secondary" 
            onClick={handleViewDoctors}
          >
            View All Doctors
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}