//working
// 'use client'
// // PersonProfileClient.tsx  — updated with real vaccine data + complete feature

// import { useState } from 'react'
// import { Container, Row, Col, Button } from 'react-bootstrap'
// import Image from 'next/image'
// import { useProfile } from './hooks/useProfile'
// import { useVaccines } from '../Vaccine/hooks/useVaccine'
// import AddVaccineModal from '../Vaccine/components/AddVaccModal'
// import LoadingSpin from '../LoadingSpin'

// export default function PersonProfileClient() {
//   const {
//     isLoading,
//     userName,
//     userEmail,
//     userImage,
//     userRole,
//     handleLogout,
//     handleEditProfile,
//   } = useProfile()

//   const {
//     upcomingVaccines,
//     completedVaccines,
//     loading: vaccLoading,
//     submitting,
//     createVaccine,
//     completeVaccine,
//   } = useVaccines()

//   const [showModal, setShowModal] = useState(false)

//   if (isLoading) return <LoadingSpin />

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
//           <UpcomingVaccines
//             vaccines={upcomingVaccines}
//             completedVaccines={completedVaccines}
//             loading={vaccLoading}
//             onComplete={completeVaccine}
//             onAdd={() => setShowModal(true)}
//           />
//           <AccountSettings onLogout={handleLogout} />
//         </Col>
//       </Row>

//       <AddVaccineModal
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         onSubmit={createVaccine}
//         submitting={submitting}
//       />

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
//       <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1rem' }}>
//         <Image src={userImage} alt="Profile Picture" width={120} height={120} style={{ objectFit: 'cover' }} />
//       </div>
//       <h5 className="mb-1 specializedFont fw-bold">{userName}</h5>
//       <p className="text-muted small mb-1">{userEmail}</p>
//       <span className="badge mb-3" style={{ backgroundColor: 'rgb(199,242,167)', color: '#333', fontSize: '12px' }}>
//         {userRole}
//       </span>
//       <br />
//       <Button variant="outline-secondary" size="sm" className="px-4 py-2" onClick={onEditProfile}>
//         Edit Profile
//       </Button>
//     </div>
//   )
// }

// interface VaccineItem {
//   id: string
//   name: string
//   pet: string
//   date: string
//   completed: boolean
// }

// interface UpcomingVaccinesProps {
//   vaccines: VaccineItem[]
//   completedVaccines: VaccineItem[]
//   loading: boolean
//   onComplete: (id: string) => void
//   onAdd: () => void
// }

// function UpcomingVaccines({ vaccines, completedVaccines, loading, onComplete, onAdd }: UpcomingVaccinesProps) {
//   const [showCompleted, setShowCompleted] = useState(false)

//   const formatDate = (iso: string) => {
//     if (!iso) return ''
//     try { return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) }
//     catch { return iso }
//   }

//   return (
//     <div className="vaccine-card">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h5 className="mb-0 fw-bold specializedFont">Upcoming Vaccines</h5>
//         <Button
//           size="sm"
//           className='background-for-app'
//           onClick={onAdd}
//         >
//           + Add Vaccine
//         </Button>
//       </div>

//       {loading ? (
//         <p className="text-muted small">Loading vaccines…</p>
//       ) : vaccines.length === 0 ? (
//         <p className="text-muted small">No upcoming vaccines. Add one above!</p>
//       ) : (
//         vaccines.map(vaccine => (
//           <div key={vaccine.id} className="vaccine-item d-flex justify-content-between align-items-center">
//             <div>
//               <div className="fw-semibold mb-1">{vaccine.name}</div>
//               <div className="text-muted small">For {vaccine.pet} on {formatDate(vaccine.date)}</div>
//             </div>
//             <button
//               onClick={() => onComplete(vaccine.id)}
//               title="Mark as completed"
//               style={{
//                 background: 'none',
//                 border: '2px solid #8ae68d',
//                 borderRadius: '50%',
//                 width: 28,
//                 height: 28,
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 flexShrink: 0,
//               }}
//             >
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
//                 <path d="M5 13l4 4L19 7" stroke="#8ae68d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </button>
//           </div>
//         ))
//       )}

//       {/* Completed section */}
//       {completedVaccines.length > 0 && (
//         <div className="mt-3">
//           <button
//             className="btn btn-link text-decoration-none p-0 small text-muted"
//             onClick={() => setShowCompleted(p => !p)}
//           >
//             {showCompleted ? '▲ Hide' : '▼ Show'} completed ({completedVaccines.length})
//           </button>
//           {showCompleted && (
//             <div className="mt-2">
//               {completedVaccines.map(vaccine => (
//                 <div key={vaccine.id} className="vaccine-item d-flex justify-content-between align-items-center" style={{ opacity: 0.6 }}>
//                   <div>
//                     <div className="fw-semibold mb-1 text-decoration-line-through">{vaccine.name}</div>
//                     <div className="text-muted small">For {vaccine.pet} on {formatDate(vaccine.date)}</div>
//                   </div>
//                   <span className="badge" style={{ backgroundColor: '#8ae68d', color: '#333', fontSize: '11px' }}>
//                     ✓ Done
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

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
//    Icon components (unchanged)
// ───────────────────────────────────────────── */

// function GearIcon() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="me-3">
//       <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.75 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="#666" />
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
//       <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="white" />
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
   vaccines,
    upcomingVaccines,
    completedVaccines,
    loading,
    error,
    submitting,
    createVaccine,
    completeVaccine,
    updateVaccine,
    deleteVaccine,
    refetch: fetchVaccines,
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
  loading={loading}
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

      <hr style={{ borderColor: 'rgba(0,0,0,0.08)', margin: '1rem 0' }} />

      <SmartTagTracker />
    </div>
  )
}

/* ── SmartTag Tracker ─────────────────────────────────────────────────── */

function SmartTagTracker() {
  const [status, setStatus] = useState('')

  const openSmartThings = () => {
    const isAndroid = /android/i.test(navigator.userAgent)
    const isIOS     = /iphone|ipad|ipod/i.test(navigator.userAgent)

    if (isAndroid) {
      setStatus('Opening SmartThings...')
      let opened = false

      const fallback = setTimeout(() => {
        if (!opened) {
          setStatus('Redirecting to Play Store...')
          window.location.href =
            'https://play.google.com/store/apps/details?id=com.samsung.android.oneconnect'
        }
      }, 2000)

      window.addEventListener('pagehide', () => {
        opened = true
        clearTimeout(fallback)
        setStatus('')
      }, { once: true })

      window.location.href =
        'intent://find#Intent;scheme=smartthings;package=com.samsung.android.oneconnect;end'

    } else if (isIOS) {
      setStatus('Redirecting to App Store...')
      window.location.href = 'https://apps.apple.com/app/smartthings/id1222822904'

    } else {
      setStatus('Opening SmartThings Find...')
      window.open('https://smartthingsfind.samsung.com', '_blank')
      setTimeout(() => setStatus(''), 2000)
    }
  }

  return (
    <div className="w-100">
      {/* Tag info box */}
      <div style={{
        background: 'rgba(199,242,167,0.25)',
        borderRadius: 10,
        padding: '10px 12px',
        marginBottom: 10,
        textAlign: 'left',
      }}>
        <div style={{ fontSize: 11, color: '#666', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#35c268', display: 'inline-block',
          }} />
          SmartTag2 connected
        </div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>My Dog's Collar</div>
        <div style={{ fontSize: 11, color: '#999' }}>Samsung SmartTag2</div>
      </div>

      {/* Track button */}
      <button
        onClick={openSmartThings}
        className='background-for-app'
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: 10,
          border: 'none',
          // background: '#1428A0',
          color: 'white',
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="12" cy="10" r="3" />
          <path d="M12 2C7.58 2 4 5.58 4 10c0 5.5 8 12 8 12s8-6.5 8-12c0-4.42-3.58-8-8-8z" />
        </svg>
        Track My Dog
      </button>

      {status && (
        <p style={{ fontSize: 11, color: '#888', textAlign: 'center', marginTop: 6, marginBottom: 0 }}>
          {status}
        </p>
      )}
    </div>
  )
}

/* ── rest of components unchanged ─────────────────────────────────────── */

interface VaccineItem {
  id: string
  name: string
  pet: string
  vaccineType: string
  exposureCategory: string
  startDate: string
  reminder: boolean
  completed: boolean
}

interface UpcomingVaccinesProps {
  vaccines: VaccineItem[]
  completedVaccines: VaccineItem[]
  loading: boolean
  onComplete: (id: string) => void
  onAdd: () => void
}


// function UpcomingVaccines({ vaccines, completedVaccines, loading, onComplete, onAdd }: UpcomingVaccinesProps) {
//   const [showCompleted, setShowCompleted] = useState(false)

//   const formatDate = (iso: string) => {
//     if (!iso) return ''
//     try { return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) }
//     catch { return iso }
//   }

function UpcomingVaccines({
  vaccines,
  completedVaccines,
  loading,
  onComplete,
  onAdd
}: UpcomingVaccinesProps) {

  const [showCompleted, setShowCompleted] = useState(false)

  const formatDate = (iso: string) => {
    if (!iso) return ''
    try {
      return new Date(iso).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    } catch {
      return iso
    }
  }

  return (
    <div className="vaccine-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0 fw-bold specializedFont">Upcoming Vaccines</h5>
        <Button size="sm" className='background-for-app' onClick={onAdd}>
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
              <div className="text-muted small">For {vaccine.pet} on {formatDate(vaccine.startDate)}</div>
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
                    <div className="text-muted small">For {vaccine.pet} on {formatDate(vaccine.startDate)}</div>
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