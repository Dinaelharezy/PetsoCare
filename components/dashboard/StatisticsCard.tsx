// 'use client'

// import { Card, Row, Col } from 'react-bootstrap'

// export default function StatisticsCard() {
//   return (
//     <Card className="h-100 animate-card">
//       <Card.Body>
//         <h5 className="card-title">Case Statistics</h5>
//         <Row className="g-3">
//           <Col md={6}>
//             <div className="stat-card">
//               <div className="stat-label">Total Critical Cases</div>
//               <div className="stat-value text-danger">
//                 27
//                 <span className="stat-suffix">cases</span>
//               </div>
//             </div>
//           </Col>
//           <Col md={6}>
//             <div className="stat-card">
//               <div className="stat-label">Total Normal Cases</div>
//               <div className="stat-value text-success">
//                 158
//                 <span className="stat-suffix">cases</span>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Card.Body>
//     </Card>
//   )
// }

'use client'

import { Card, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'

export default function StatisticsCard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats')
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <Card className="h-100 animate-card">
      <Card.Body>
        <h5 className="card-title">Case Statistics</h5>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <Row className="g-3">
            <Col md={6}>
              <div className="stat-card">
                <div className="stat-label">Total Completed Vaccines</div>
                <div className="stat-value text-success">
                  {stats?.totalCompleted ?? 0}
                  <span className="stat-suffix">cases</span>
                </div>
              </div>
            </Col>

            <Col md={6}>
              <div className="stat-card">
                <div className="stat-label">Total Vaccines</div>
                <div className="stat-value text-danger">
                  {stats?.totalVaccines ?? 0}
                  <span className="stat-suffix">vaccines</span>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  )
}