'use client'

import { Container, Row, Col } from 'react-bootstrap'
import NotificationsCard from './NotificationCard'
import StatisticsCard from './StatisticsCard'
import ArticleManagement from './ArticleManagement'
import DoctorManagement from './DoctorManagement'
import ReportAnimal from './ReportAnimal'

export default function DashboardClient() {
  return (
    <>
      <Container fluid className="px-4 py-4">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Admin Dashboard</h1>
        </div>

        {/* Top Row: Notifications and Statistics */}
        <Row className="g-4 mb-4">
          <Col lg={6}>
            <NotificationsCard />
          </Col>
          <Col lg={6}>
            <StatisticsCard />
          </Col>
        </Row>

        {/* Bottom Row: Action Sections */}
        <Row className="g-4">
          <Col lg={4}>
            <ArticleManagement />
          </Col>
          <Col lg={4}>
            <DoctorManagement />
          </Col>
          <Col lg={4}>
            <ReportAnimal />
          </Col>
        </Row>
      </Container>
    </>
  )
}