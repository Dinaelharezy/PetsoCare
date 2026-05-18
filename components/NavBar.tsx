
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import {
  Navbar as BSNavbar, Container, Nav, NavDropdown
} from 'react-bootstrap'
import useTheme from '../hooks/usetheme'
import NotificationBell from '../components/Vaccine/Notification/NotificationBell'
import { getImageSrc } from '@/utils/imageUtils'
export default function NavBar() {
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <>
      {/* Spacer div so content never hides under the navbar */}
      <div style={{ height: '64px' }} />

      <BSNavbar
        expand="lg"
        className="bg-body"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1050,
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          height: '64px',
        }}
      >
        <Container fluid className="px-3 px-lg-4">

          
         <BSNavbar.Brand as={Link} href="/main/Home" className="logo-container">
            <Image src="/Logo.png" alt="PetsoCare" width={120} height={40} className="logo" priority />
          </BSNavbar.Brand> 

          
          <BSNavbar.Toggle aria-controls="navbarNav" />

          <BSNavbar.Collapse id="navbarNav">

            {/* Nav Links */}
            <Nav className="d-flex align-items-lg-center gap-5">
              <Nav.Link as={Link} href="/main/Home" active={pathname === '/main/Home'}>Home</Nav.Link>
              <Nav.Link as={Link} href="/main/Clinics" active={pathname === '/main/Clinics'}>Clinics</Nav.Link>
              <Nav.Link as={Link} href="/main/Articles" active={pathname === '/main/Articles'}>Awareness</Nav.Link>
              <Nav.Link as={Link} href="/main/Rabies" active={pathname === '/main/Rabies'}>Diseases</Nav.Link>
              <Nav.Link as={Link} href="/main/VaccineSchedule" active={pathname === '/main/VaccineSchedule'}>Vaccines</Nav.Link>
              <Nav.Link as={Link} href="/main/Map" active={pathname === '/main/Map'}>Map</Nav.Link>
            </Nav>

            {/* Right Side */}
            <div className="navbar-right">
              <div className="navbar-right-icons">

                {/* Theme Toggle */}
                
                {/* <button
                  onClick={toggleTheme}
                  className="theme-btn"
                  title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                >
                  {theme === 'light' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8z" />
                    </svg>
                  )}
                </button>
 */}


<NotificationBell /> 
                {/* ✅ Only show profile dropdown when session exists AND status is authenticated */}
                {status === 'authenticated' && session ? (
                  <NavDropdown
                    title={
                      <img
                        src={session?.user?.image ?? '/woman.png'}
                        alt="Profile"
                        className="profile-avatar"
                      />
                    }
                    id="profile-dropdown"
                    align="end"
                  >
                    <NavDropdown.Item as={Link} href="/main/PersonProfile">
                      My Profile
                    </NavDropdown.Item>
                 
{session?.user?.role === 'Admin' && (
  <NavDropdown.Item as={Link} href="/admin/dashboard">
     Dashboard
  </NavDropdown.Item>
)}


{(session?.user?.role === 'Doctor') && (
  <NavDropdown.Item as={Link} href="/clinic/dashboard">
     Clinic Panel
  </NavDropdown.Item>
)}
                    <NavDropdown title="Reports" id="reports-dropdown" align="end">
                      <NavDropdown.Item as={Link} href="/main/reports/EmergencyReport">Exposure Report</NavDropdown.Item>
                      <NavDropdown.Item as={Link} href="/main/reports/DangerousAnimal">Dangerous Animal Report</NavDropdown.Item>
                      <NavDropdown.Item as={Link} href="/main/reports/GeneralComplainment">General Complainment</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown.Item as={Link} href="/main/About">About</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} href="/main/EditProfile">Settings</NavDropdown.Item>
                    <NavDropdown.Item as={Link} href="/main/Contacts">Contacts</NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={handleLogout}
                      className="text-danger"
                      style={{ cursor: 'pointer' }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : status === 'loading' ? (
                  // ✅ Show nothing while session is loading (prevents flicker)
                  <div style={{ width: '36px' }} />
                ) : (
                  // ✅ Show Login button only when definitely not authenticated
                  <Nav.Link as={Link} href="/login" className="login-btn">
                    Login
                  </Nav.Link>
                )}

              </div>
            </div>
          </BSNavbar.Collapse>
        </Container>
      </BSNavbar>
    </>
  )
}