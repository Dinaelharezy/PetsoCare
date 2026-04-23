

// 'use client'

// import { Card, Row, Col } from 'react-bootstrap'
// import { useEffect, useState } from 'react'

// export default function StatisticsCard() {
//   const [stats, setStats] = useState<any>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await fetch('/api/stats')
//         const data = await res.json()
//         setStats(data)
//       } catch (err) {
//         console.error('Error fetching stats:', err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchStats()
//   }, [])

//   return (
//     <Card className="h-100 animate-card">
//       <Card.Body>
//         <h5 className="card-title">Case Statistics</h5>

//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <Row className="g-3">
//             <Col md={6}>
//               <div className="stat-card">
//                 <div className="stat-label">Total Completed Vaccines</div>
//                 <div className="stat-value text-success">
//                   {stats?.totalCompleted ?? 0}
//                   <span className="stat-suffix">cases</span>
//                 </div>
//               </div>
//             </Col>

//             <Col md={6}>
//               <div className="stat-card">
//                 <div className="stat-label">Total Vaccines</div>
//                 <div className="stat-value text-danger">
//                   {stats?.totalVaccines ?? 0}
//                   <span className="stat-suffix">vaccines</span>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         )}
//       </Card.Body>
//     </Card>
//   )
// }

'use client'

import { Card, Row, Col, Table, Badge } from 'react-bootstrap'
import { useEffect, useState } from 'react'

interface UserVaccineData {
  userId: string
  taken: number
  pending: number
  risk: string | null
  needsRIG: boolean | null
}

interface GlobalStats {
  totalUsers: number
  totalDoses: number
  takenDoses: number
  highRisk: number
}

export default function StatisticsCard() {
  const [users, setUsers] = useState<UserVaccineData[]>([])
  const [stats, setStats] = useState<GlobalStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/vaccine/users')
        const data = await res.json()
        setUsers(data.users || [])
        setStats(data.stats || null)
      } catch (err) {
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Card className="h-100 animate-card">
        <Card.Body>
          <div className="text-center py-4">Loading statistics...</div>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card className="h-100 animate-card">
      <Card.Body>
        <h5 className="card-title mb-4">📊 Vaccine Statistics</h5>

        {/* الإحصائيات العامة */}
        <Row className="g-3 mb-4">
          <Col md={3} sm={6}>
            <div className="stat-card text-center p-3 rounded-3 bg-light">
              <div className="stat-label text-muted small">Total Users</div>
              <div className="stat-value fw-bold fs-2 text-primary">
                {stats?.totalUsers ?? 0}
              </div>
            </div>
          </Col>

          <Col md={3} sm={6}>
            <div className="stat-card text-center p-3 rounded-3 bg-light">
              <div className="stat-label text-muted small">Total Doses</div>
              <div className="stat-value fw-bold fs-2 text-info">
                {stats?.totalDoses ?? 0}
              </div>
            </div>
          </Col>

          <Col md={3} sm={6}>
            <div className="stat-card text-center p-3 rounded-3 bg-light">
              <div className="stat-label text-muted small">Taken Doses</div>
              <div className="stat-value fw-bold fs-2 text-success">
                {stats?.takenDoses ?? 0}
              </div>
            </div>
          </Col>

          <Col md={3} sm={6}>
            <div className="stat-card text-center p-3 rounded-3 bg-light">
              <div className="stat-label text-muted small">High Risk Users</div>
              <div className="stat-value fw-bold fs-2 text-danger">
                {stats?.highRisk ?? 0}
              </div>
            </div>
          </Col>
        </Row>

        {/* جدول المستخدمين */}
        <h6 className="mb-3 mt-4">📋 Users Vaccine Status</h6>
        <div className="table-responsive">
          <Table striped hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th>User ID</th>
                <th>Taken Doses</th>
                <th>Pending Doses</th>
                <th>Risk Status</th>
                <th>Needs RIG</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td className="fw-semibold">{user.userId}</td>
                  <td>
                    <Badge bg="success" className="px-3 py-2 rounded-pill">
                      ✓ {user.taken}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg="warning" className="px-3 py-2 rounded-pill">
                      ⏳ {user.pending}
                    </Badge>
                  </td>
                  <td>
                    {user.risk ? (
                      <Badge bg="danger" className="px-3 py-2 rounded-pill">
                        ⚠️ {user.risk}
                      </Badge>
                    ) : (
                      <Badge bg="secondary" className="px-3 py-2 rounded-pill">
                        Low Risk
                      </Badge>
                    )}
                  </td>
                  <td>
                    {user.needsRIG ? (
                      <Badge bg="danger" className="px-3 py-2 rounded-pill">
                        Needs RIG
                      </Badge>
                    ) : (
                      <Badge bg="secondary" className="px-3 py-2 rounded-pill">
                        No RIG
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Progress bar للإنجاز الكلي */}
        {stats && (
          <div className="mt-4">
            <div className="d-flex justify-content-between mb-1 small">
              <span>Overall Completion Rate</span>
              <span className="fw-bold">
                {Math.round((stats.takenDoses / stats.totalDoses) * 100)}%
              </span>
            </div>
            <div className="progress" style={{ height: '8px' }}>
              <div
                className="progress-bar bg-success"
                style={{
                  width: `${(stats.takenDoses / stats.totalDoses) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}