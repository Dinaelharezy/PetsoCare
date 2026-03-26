
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import {
  Navbar as BSNavbar, Container, Nav, NavDropdown
} from 'react-bootstrap'
import  useTheme from '../hooks/usetheme' 

export default function NavBar() {
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const { data: session } = useSession()

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <BSNavbar expand="lg" className="bg-body">
      <Container fluid className="px-3 px-lg-4">

        {/* Logo */}
        <BSNavbar.Brand as={Link} href="/main/Home" className="logo-container">
          <Image src="/logo.png" alt="PetsoCare" width={120} height={40} className="logo" />
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="navbarNav" />

        <BSNavbar.Collapse id="navbarNav">

          {/* Nav Links */}
          <Nav className="d-flex align-items-lg-center gap-5">
            <Nav.Link as={Link} href="/main/Home" active={pathname === '/main/Home'}>
              Home
            </Nav.Link>
             <Nav.Link as={Link} href="/main/Clinics" active={pathname === '/main/Clinics'}>
              Clinics
            </Nav.Link>
            <Nav.Link as={Link} href="/main/Articles" active={pathname === '/main/Articles'}>
              Articles
            </Nav.Link>
            <Nav.Link as={Link} href="/main/Rabies" active={pathname === '/main/Rabies'}>
              Rabies
            </Nav.Link>
            <NavDropdown title="Reports" id="reports-dropdown">
              <NavDropdown.Item as={Link} href="/main/reports/EmergencyReport">Emergency Report</NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/main/reports/DangerousAnimal">Dangerous Animal Report</NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/main/reports/GeneralComplaint">General Complaint</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} href="/main/VaccineSchedule" active={pathname === '/main/VaccineSchedule'}>
              Vaccines
            </Nav.Link>
            <Nav.Link as={Link} href="/main/Map" active={pathname === '/main/Map'}>
              Map
            </Nav.Link>
          </Nav>

          {/* Right Side */}
          <div className="navbar-right">

            {/* Search */}
            {/* <input className="navbar-search" type="search" placeholder="Search" aria-label="Search" /> */}

            <div className="navbar-right-icons ">

              {/* Theme Toggle */}
              <button onClick={toggleTheme} className="theme-btn"
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
                {theme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8z"/>
                  </svg>
                )}
              </button>

              {/* Profile Dropdown */}
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
                <NavDropdown.Item as={Link} href="/main/About">
                  About
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} href="/admin/dashboard">
                  Settings
                </NavDropdown.Item>
                {/* ✅ Logout يستخدم signOut مع next-auth */}
                <NavDropdown.Item
                  onClick={handleLogout}
                  className="text-danger"
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>

            </div>
          </div>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  )
}