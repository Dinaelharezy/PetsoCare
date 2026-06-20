'use client'

import { Container, Row, Col } from 'react-bootstrap'
import StatisticsCard from './StatisticsCard'
import ReportManagement from './ReportManagement'
import RatingStatsCard from '../../Rating/RatingStatsCard'
import ManagementActionsSection from '../Management/allManagement' 
export default function DashboardClient() {
  return (
    <>
      <Container fluid className="px-5 p-4">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Admin Dashboard</h1>
        </div>


    <Row className="g-4 mb-5">
  <Col lg={6}>
    <ReportManagement /> 
  </Col>
  <Col lg={6}>
    <StatisticsCard />
  </Col>
      </Row>

<Row className="g-4 mb-5">
  <Col lg={12}>
    <RatingStatsCard />
  </Col>
</Row>



        <div className="mb-4">
          <h5 className="fw-bold mb-2" style={{ color: '#0f172a' }}>⚡ Management Actions</h5>
          <p className="text-muted small mb-4">Open and manage all admin dashboard tools</p>
          <ManagementActionsSection />
        </div>
      </Container>
    </>
  )
}