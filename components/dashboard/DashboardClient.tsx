'use client'

import { Container, Row, Col } from 'react-bootstrap'
import NotificationsCard from '../NotificationCard'
import StatisticsCard from './StatisticsCard'
import ArticleManagementDash from './Management/ArticleManagemenrDash'
// import DoctorManagementDash from '../Management/ClinicManagementDash'
import ReportAnimal from './ReportAnimal'
import ClinicManagementDash from './Management/ClinicManagementDash'
import ReportManagement from './ReportManagement'
import ShelterManagementDash from './Management/ShelterManagementDash'
import VaccineLocationsManagement from './Management/VaccineLocationsManagement'
import VideoManagementDash from './Management/VideoManagementDash'
import RatingStatsCard from '../Rating/RatingStatsCard'
import ManagementActionsSection from './Management/ArticleManagemenrDash' 
export default function DashboardClient() {
  return (
    <>
      <Container fluid className="px-5 p-4">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Admin Dashboard</h1>
        </div>

        {/* Top Row: Report and Statistics */}
  

    <Row className="g-4 mb-5">
  <Col lg={6}>
    <ReportManagement /> 
  </Col>
  <Col lg={6}>
    <StatisticsCard />
  </Col>
      </Row>

          {/* * Rating  */}

<Row className="g-4 mb-5">
  <Col lg={12}>
    <RatingStatsCard />
  </Col>
</Row>





        {/* Bottom Row: Action Sections */}
        {/* <Row className="g-">
          <Col lg={4}>
            <ArticleManagementDash />
          </Col>
          <Col lg={4}>
            <ClinicManagementDash />
          </Col>
          <Col lg={4}>
            <ReportAnimal />
          </Col>
          <Col lg={4}>
            <ShelterManagementDash />
          </Col>
          <Col lg={4}>
            <VaccineLocationsManagement />
          </Col>
          <Col lg={4}>
            <VideoManagementDash />
          </Col>
        </Row> */}

        <div className="mb-4">
          <h5 className="fw-bold mb-2" style={{ color: '#0f172a' }}>⚡ Management Actions</h5>
          <p className="text-muted small mb-4">Open and manage all admin dashboard tools</p>
          <ManagementActionsSection />
        </div>
      </Container>
    </>
  )
}