

// 'use client'

// import { Container, Row, Col, Button } from 'react-bootstrap'
// import Image from 'next/image'
// import { useProfile } from './hooks/useProfile'
// import LoadingSpin from '../LoadingSpin'
// export default function PersonProfileClient() {
//   const {
//     isLoading,
//     userName,
//     userEmail,
//     userImage,
//     userRole,
//     vaccines,
//     handleLogout,
//     handleEditProfile,
//   } = useProfile()

//   if (isLoading) {
//     return <LoadingSpin />
//   }

//   return (
//     <Container className="py-5 px-5">
//       <Row>
//         {/* ── Left Sidebar ── */}
//         <Col lg={3} md={12} className="mb-4">
//           <ProfileCard
//             userName={userName}
//             userEmail={userEmail}
//             userImage={userImage}
//             userRole={userRole}
//             onEditProfile={handleEditProfile}
//           />
//         </Col>

//         {/* ── Main Content ── */}
//         <Col lg={9} md={12}>
//           <UpcomingVaccines vaccines={vaccines} />
//           <AccountSettings onLogout={handleLogout} />
//         </Col>
//       </Row>

//       <button className="chat-button">💬</button>
//     </Container>
//   )
// }

// /* ─────────────────────────────────────────────
//    Sub-components
// ───────────────────────────────────────────── */

// interface ProfileCardProps {
//   userName: string
//   userEmail: string
//   userImage: string
//   userRole: string
//   onEditProfile: () => void
// }

// function ProfileCard({ userName, userEmail, userImage, userRole, onEditProfile }: ProfileCardProps) {
//   return (
//     <div className="profile-card mb-4">
//       <div
//         style={{
//           width: '120px',
//           height: '120px',
//           borderRadius: '50%',
//           overflow: 'hidden',
//           margin: '0 auto 1rem',
//         }}
//       >
//         <Image src={userImage} alt="Profile Picture" width={120} height={120} style={{ objectFit: 'cover' }} />
//       </div>

//       <h5 className="mb-1 specializedFont fw-bold">{userName}</h5>
//       <p className="text-muted small mb-1">{userEmail}</p>

//       <span
//         className="badge mb-3"
//         style={{ backgroundColor: 'rgb(199,242,167)', color: '#333', fontSize: '12px' }}
//       >
//         {userRole}
//       </span>

//       <br />
//       <Button variant="outline-secondary" size="sm" className="px-4 py-2" onClick={onEditProfile}>
//         Edit Profile
//       </Button>
//     </div>
//   )
// }

// interface Vaccine {
//   name: string
//   pet: string
//   date: string
// }

// function UpcomingVaccines({ vaccines }: { vaccines: Vaccine[] }) {
//   return (
//     <div className="vaccine-card">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h5 className="mb-0 fw-bold specializedFont">Upcoming Vaccines</h5>
//       </div>

//       {vaccines.map((vaccine, index) => (
//         <div key={index} className="vaccine-item">
//           <div className="fw-semibold mb-1">{vaccine.name}</div>
//           <div className="text-muted small">
//             For {vaccine.pet} on {vaccine.date}
//           </div>
//         </div>
//       ))}

//       <Button variant="link" className="text-decoration-none border specializedFont vacc-butt mt-3">
//         View All Vaccines
//       </Button>
//     </div>
//   )
// }

// function AccountSettings({ onLogout }: { onLogout: () => void }) {
//   return (
//     <div className="settings-card">
//       <h5 className="mb-4 fw-bold specializedFont">Account Settings</h5>

//       <div className="settings-item">
//         <div className="d-flex align-items-center">
//           <GearIcon />
//           <span className="specializedFont">General Preferences</span>
//         </div>
//         <ChevronIcon />
//       </div>

//       <Button className="btn-logout mt-3" onClick={onLogout}>
//         <LogoutIcon />
//         Logout
//       </Button>
//     </div>
//   )
// }

// /* ─────────────────────────────────────────────
//    Icon components
// ───────────────────────────────────────────── */

// function GearIcon() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="me-3">
//       <path
//         d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.75 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z"
//         fill="#666"
//       />
//     </svg>
//   )
// }

// function ChevronIcon() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//       <path d="M9 6L15 12L9 18" stroke="#999" strokeWidth="2" strokeLinecap="round" />
//     </svg>
//   )
// }

// function LogoutIcon() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="me-2" style={{ display: 'inline' }}>
//       <path
//         d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
//         fill="white"
//       />
//     </svg>
//   )
// }

'use client'
// PersonProfileClient.tsx  — updated with real vaccine data + complete feature

import { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Image from 'next/image'
import { useProfile } from './hooks/useProfile'
import { useVaccines } from '../Vaccine/hooks/useVaccine'
import AddVaccineModal from '../Vaccine/components/AddVaccModal'
import LoadingSpin from '../LoadingSpin'

export default function PersonProfileClient() {
  const {
    isLoading,
    userName,
    userEmail,
    userImage,
    userRole,
    handleLogout,
    handleEditProfile,
  } = useProfile()

  const {
    upcomingVaccines,
    completedVaccines,
    loading: vaccLoading,
    submitting,
    createVaccine,
    completeVaccine,
  } = useVaccines()

  const [showModal, setShowModal] = useState(false)

  if (isLoading) return <LoadingSpin />

  return (
    <Container className="py-5 px-5">
      <Row>
        {/* ── Left Sidebar ── */}
        <Col lg={3} md={12} className="mb-4">
          <ProfileCard
            userName={userName}
            userEmail={userEmail}
            userImage={userImage}
            userRole={userRole}
            onEditProfile={handleEditProfile}
          />
        </Col>

        {/* ── Main Content ── */}
        <Col lg={9} md={12}>
          <UpcomingVaccines
            vaccines={upcomingVaccines}
            completedVaccines={completedVaccines}
            loading={vaccLoading}
            onComplete={completeVaccine}
            onAdd={() => setShowModal(true)}
          />
          <AccountSettings onLogout={handleLogout} />
        </Col>
      </Row>

      <AddVaccineModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={createVaccine}
        submitting={submitting}
      />

      <button className="chat-button">💬</button>
    </Container>
  )
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

interface ProfileCardProps {
  userName: string
  userEmail: string
  userImage: string
  userRole: string
  onEditProfile: () => void
}

function ProfileCard({ userName, userEmail, userImage, userRole, onEditProfile }: ProfileCardProps) {
  return (
    <div className="profile-card mb-4">
      <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1rem' }}>
        <Image src={userImage} alt="Profile Picture" width={120} height={120} style={{ objectFit: 'cover' }} />
      </div>
      <h5 className="mb-1 specializedFont fw-bold">{userName}</h5>
      <p className="text-muted small mb-1">{userEmail}</p>
      <span className="badge mb-3" style={{ backgroundColor: 'rgb(199,242,167)', color: '#333', fontSize: '12px' }}>
        {userRole}
      </span>
      <br />
      <Button variant="outline-secondary" size="sm" className="px-4 py-2" onClick={onEditProfile}>
        Edit Profile
      </Button>
    </div>
  )
}

interface VaccineItem {
  id: string
  name: string
  pet: string
  date: string
  completed: boolean
}

interface UpcomingVaccinesProps {
  vaccines: VaccineItem[]
  completedVaccines: VaccineItem[]
  loading: boolean
  onComplete: (id: string) => void
  onAdd: () => void
}

function UpcomingVaccines({ vaccines, completedVaccines, loading, onComplete, onAdd }: UpcomingVaccinesProps) {
  const [showCompleted, setShowCompleted] = useState(false)

  const formatDate = (iso: string) => {
    if (!iso) return ''
    try { return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) }
    catch { return iso }
  }

  return (
    <div className="vaccine-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0 fw-bold specializedFont">Upcoming Vaccines</h5>
        <Button
          size="sm"
          style={{ backgroundColor: '#8ae68d', border: 'none', color: '#333', fontWeight: 600 }}
          onClick={onAdd}
        >
          + Add Vaccine
        </Button>
      </div>

      {loading ? (
        <p className="text-muted small">Loading vaccines…</p>
      ) : vaccines.length === 0 ? (
        <p className="text-muted small">No upcoming vaccines. Add one above!</p>
      ) : (
        vaccines.map(vaccine => (
          <div key={vaccine.id} className="vaccine-item d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-semibold mb-1">{vaccine.name}</div>
              <div className="text-muted small">For {vaccine.pet} on {formatDate(vaccine.date)}</div>
            </div>
            <button
              onClick={() => onComplete(vaccine.id)}
              title="Mark as completed"
              style={{
                background: 'none',
                border: '2px solid #8ae68d',
                borderRadius: '50%',
                width: 28,
                height: 28,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="#8ae68d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ))
      )}

      {/* Completed section */}
      {completedVaccines.length > 0 && (
        <div className="mt-3">
          <button
            className="btn btn-link text-decoration-none p-0 small text-muted"
            onClick={() => setShowCompleted(p => !p)}
          >
            {showCompleted ? '▲ Hide' : '▼ Show'} completed ({completedVaccines.length})
          </button>
          {showCompleted && (
            <div className="mt-2">
              {completedVaccines.map(vaccine => (
                <div key={vaccine.id} className="vaccine-item d-flex justify-content-between align-items-center" style={{ opacity: 0.6 }}>
                  <div>
                    <div className="fw-semibold mb-1 text-decoration-line-through">{vaccine.name}</div>
                    <div className="text-muted small">For {vaccine.pet} on {formatDate(vaccine.date)}</div>
                  </div>
                  <span className="badge" style={{ backgroundColor: '#8ae68d', color: '#333', fontSize: '11px' }}>
                    ✓ Done
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Button variant="link" className="text-decoration-none border specializedFont vacc-butt mt-3">
        View All Vaccines
      </Button>
    </div>
  )
}

function AccountSettings({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="settings-card">
      <h5 className="mb-4 fw-bold specializedFont">Account Settings</h5>
      <div className="settings-item">
        <div className="d-flex align-items-center">
          <GearIcon />
          <span className="specializedFont">General Preferences</span>
        </div>
        <ChevronIcon />
      </div>
      <Button className="btn-logout mt-3" onClick={onLogout}>
        <LogoutIcon />
        Logout
      </Button>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Icon components (unchanged)
───────────────────────────────────────────── */

function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="me-3">
      <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.75 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="#666" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M9 6L15 12L9 18" stroke="#999" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="me-2" style={{ display: 'inline' }}>
      <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="white" />
    </svg>
  )
}