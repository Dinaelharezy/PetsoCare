'use client'

import { Card, Row, Col } from 'react-bootstrap'

export default function StatisticsCard() {
  return (
    <Card className="h-100 animate-card">
      <Card.Body>
        <h5 className="card-title">Case Statistics</h5>
        <Row className="g-3">
          <Col md={6}>
            <div className="stat-card">
              <div className="stat-label">Total Critical Cases</div>
              <div className="stat-value text-danger">
                27
                <span className="stat-suffix">cases</span>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="stat-card">
              <div className="stat-label">Total Normal Cases</div>
              <div className="stat-value text-success">
                158
                <span className="stat-suffix">cases</span>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}