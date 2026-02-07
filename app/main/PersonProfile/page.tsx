'use client'

import { Container, Row, Col, Nav, Navbar, Button } from 'react-bootstrap'
import Image from 'next/image'

export default function PersonProfile() {
  const pets = [
    { id: 1, name: 'Moly', type: 'Cat', age: '3 years old', image: '/cat.png' },
    { id: 2, name: 'Whiskers', type: 'Dog', age: '5 years old', image: '/dog.png' },
    { id: 3, name: 'Flopsy', type: 'Dog', age: '5 months', image: '/dog 3.png' }
  ]

  const vaccines = [
    { name: 'Rabies Booster', pet: 'Moly', date: '2024-08-15' },
    { name: 'Feline Leukemia', pet: 'Whiskers', date: '2024-09-01' },
    { name: 'Distemper', pet: 'Flopsy', date: '2024-09-20' }
  ]

  return (
    <>
      {/* Main Content */}
      <Container className="py-5 px-5">
        <Row>
          {/* Left Sidebar */}
          <Col lg={3} md={12} className="mb-4">
            {/* Profile Card */}
            <div className="profile-card mb-4">
              <div className="position-relative d-inline-block">
              <div style={{
                     width: '120px',
                     height: '120px',
                    borderRadius: '50%',
                     overflow: 'hidden',
                    margin: '0 auto 1rem'
                                        }}>
              <Image 
                   src="/woman.png" 
                  alt="Profile Picture" 
                    width={120} 
                    height={120}
                    style={{ objectFit: 'cover' }}
                />
                </div>
              </div>
              <h5 className="mb-2 specializedFont fw-bold">Aisha Sayed</h5>
              <p className="text-muted small mb-3">aisha.sayed@example.com</p>
              <Button variant="outline-secondary edit-profile px-4 py-2" size="sm">Edit Profile</Button>
            </div>

            {/* My Pets Section */}
            <div className="mb-4">
              <h6 className="my-4 fw-bold fs-5 specializedFont">My Pets</h6>
              {pets.map(pet => (
                <div key={pet.id} className="pet-card">
               <div style={{
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  overflow: 'hidden',
  marginRight: '1rem',
  flexShrink: 0
}}>
  <Image 
    src={pet.image} 
    alt={pet.name} 
    width={60} 
    height={60}
    style={{ objectFit: 'cover' }}
  />
</div>
                  <div className="flex-grow-1">
                    <div className="fw-bold specializedFont">{pet.name}</div>
                    <div className="small text-muted">
                      <span className='specializedFont pet-type'>🐾 {pet.type}</span>
                      <span className="ms-2">{pet.age}</span>
                    </div>
                  </div>
                  <div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6L15 12L9 18" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              ))}
              <Button className="btn-register mt-3">Register New Pet</Button>
            </div>
          </Col>

          {/* Main Content Area */}
          <Col lg={9} md={12}>
            {/* Upcoming Vaccines */}
            <div className="vaccine-card">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0 fw-bold specializedFont">Upcoming Vaccines</h5>
              </div>
              {vaccines.map((vaccine, index) => (
                <div key={index} className="vaccine-item">
                  <div className="fw-semibold mb-1">{vaccine.name}</div>
                  <div className="text-muted small">For {vaccine.pet} on {vaccine.date}</div>
                </div>
              ))}
                <Button variant="link" className="text-decoration-none border specializedFont vacc-butt mt-3">View All Vaccines</Button>

            </div>

            {/* Pet Medical History */}
            <div className="vaccine-card">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="me-2">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H7V10H17V12ZM17 9H7V7H17V9ZM17 15H7V13H17V15Z" fill="#a8e6a3"/>
                  </svg>
                  <h5 className="mb-0 fw-bold specializedFont">Pet Medical History</h5>
                </div>
                <Button className="btn-view-history">View History</Button>
              </div>
            </div>

            {/* Account Settings */}
            <div className="settings-card">
              <h5 className="mb-4 fw-bold specializedFont">Account Settings</h5>
              <div className="settings-item">
                <div className="d-flex align-items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="me-3">
                    <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.75 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="#666"/>
                  </svg>
                  <span className='specializedFont'>General Preferences</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6L15 12L9 18" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <Button className="btn-logout mt-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="me-2" style={{display: 'inline'}}>
                  <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="white"/>
                </svg>
                Logout
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Chat Button */}
      <button className="chat-button">
        💬
      </button>
    </>
  )
}