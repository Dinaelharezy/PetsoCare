'use client'

import useTheme from '../hooks/usetheme';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar as BSNavbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { usePath } from '../hooks/usePath'; 
import Image from "next/image";
// export default function Navbar() {
//   const { theme, toggleTheme } = useTheme();
//   const pathname = usePath();
  
//   return (
//     <BSNavbar expand="lg" className="bg-body">
//       <Container fluid>

// <BSNavbar.Brand as={Link} href="/main/Home" className="mx-0 logo-container">
//   <Image
//     src="/logo.png"
//     alt="PetsoCare"
//     width={120}
//     height={40}
//     className='logo'
//   />
// </BSNavbar.Brand>
  
//         <BSNavbar.Collapse id="navbarNav">
//           <Nav className="d-flex align-items-center gap-4">
//             <Nav.Link 
//               as={Link} 
//               href="/main/Home" 
//               active={pathname === '/main/Home'}
//               className="ms-4 me-4 fs-5"
//             >
//               Home
//             </Nav.Link>
            
//             <Nav.Link 
//               as={Link} 
//               href="/main/Articles" 
//               active={pathname === '/main/Articles'}
//               className="me-4 fs-5"
//             >
//               Articles
//             </Nav.Link>
            
//             <NavDropdown title="Reports" id="reports-dropdown" className="me-4 fs-5">
//               <NavDropdown.Item as={Link} href="/main/reports/EmergencyReport">
//                 Emergency Report
//               </NavDropdown.Item>
//               <NavDropdown.Item as={Link} href="/main/reports/DangerousAnimal">
//                 Dangerous Animal Report
//               </NavDropdown.Item>
//               <NavDropdown.Item as={Link} href="/main/reports/GeneralComplaint">
//                 General Complaint
//               </NavDropdown.Item>
//             </NavDropdown>
            
//             <Nav.Link 
//               as={Link} 
//               href="/main/VaccineSchedule" 
//               active={pathname === '/main/VaccineSchedule'}
//               className="me-4 fs-5"
//             >
//               Vaccines
//             </Nav.Link>
            
//             <Nav.Link 
//               as={Link} 
//               href="/main/Map" 
//               active={pathname === '/main/Map'}
//               className="me-4 fs-5 me-5"
//             >
//               Map
//             </Nav.Link>
//           </Nav>

//           {/* Search, Theme, Profile */}
//           <div className="d-none d-lg-flex align-items-center gap-2 ms-auto">
//             {/* Search Form */}
//             <form className="d-flex me-1" style={{marginRight:'250px'}} role="search">
//               <input 
//                 className="form-control  rounded-pill" 
//                 style={{width: '500px', height:'35px'}} 
//                 type="search" 
//                 placeholder="Search" 
//                 aria-label="Search"
//               />
//             </form>

//             {/* Theme Toggle */}
//             <button 
//               onClick={toggleTheme}
//               className="btn d-flex me-1 border-0 "
//               title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
//               id="themee"
//             >
//               {theme === 'light' ? (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
//                   <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
//                 </svg>
//               ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
//                   <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
//                 </svg>
//               )}
//             </button>

//             {/* Profile Dropdown */}
//             <NavDropdown 
//               title={
//                 <img 
//                   src="/woman 2.png" 
//                   alt="Profile" 
//                   width="35" 
//                   height="35" 
//                   className="rounded-circle"
//                   style={{objectFit: 'cover'}}
//                 />
//               }
//               id="profile-dropdown"
//               align="end"
//               // className='ms-2'
              
//             >
//               <NavDropdown.Item as={Link} href="/main/PersonProfile">
//                 <i className="bi bi-person me-2"></i>
//                 My Profile
//               </NavDropdown.Item>
//               <NavDropdown.Item as={Link} href="/main/Animalprofile">
//                 <i className="bi bi-heart me-2"></i>
//                 Pet Profile
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item as={Link} href="/admin/dashboard">
//                 <i className="bi bi-gear me-2"></i>
//                 Settings
//               </NavDropdown.Item>
//               <NavDropdown.Item as={Link} href="/logout" className="text-danger">
//                 <i className="bi bi-box-arrow-right me-2"></i>
//                 Logout
//               </NavDropdown.Item>
//             </NavDropdown>
//           </div>
//         </BSNavbar.Collapse>
//       </Container>
//     </BSNavbar>
//   );
// }

// 'use client'

// import useTheme from '../hooks/usetheme';
// import Link from 'next/link';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navbar as BSNavbar, Nav, NavDropdown, Container } from 'react-bootstrap'
// import { usePath } from '../hooks/usePath'; 
// import Image from "next/image";

// export default function Navbar() {
//   const { theme, toggleTheme } = useTheme();
//   const pathname = usePath();
  
//   return (
//     <BSNavbar expand="lg" className="bg-body">
//       <Container fluid>

//         {/* Logo */}
//         <BSNavbar.Brand as={Link} href="/main/Home" className="mx-0 logo-container">
//           <Image
//             src="/logo.png"
//             alt="PetsoCare"
//             width={120}
//             height={40}
//             className="logo"
//           />
//         </BSNavbar.Brand>

//         {/* Mobile Menu Button */}
//         <BSNavbar.Toggle aria-controls="navbarNav" />

//         <BSNavbar.Collapse id="navbarNav">

//           {/* Links */}
//           <Nav className="d-flex align-items-center gap-4">

//             <Nav.Link 
//               as={Link} 
//               href="/main/Home" 
//               active={pathname === '/main/Home'}
//               className="ms-4 me-4 fs-5"
//             >
//               Home
//             </Nav.Link>
            
//             <Nav.Link 
//               as={Link} 
//               href="/main/Articles" 
//               active={pathname === '/main/Articles'}
//               className="me-4 fs-5"
//             >
//               Articles
//             </Nav.Link>
            
//             <NavDropdown title="Reports" id="reports-dropdown" className="me-4 fs-5">
//               <NavDropdown.Item as={Link} href="/main/reports/EmergencyReport">
//                 Emergency Report
//               </NavDropdown.Item>
//               <NavDropdown.Item as={Link} href="/main/reports/DangerousAnimal">
//                 Dangerous Animal Report
//               </NavDropdown.Item>
//               <NavDropdown.Item as={Link} href="/main/reports/GeneralComplaint">
//                 General Complaint
//               </NavDropdown.Item>
//             </NavDropdown>
            
//             <Nav.Link 
//               as={Link} 
//               href="/main/VaccineSchedule" 
//               active={pathname === '/main/VaccineSchedule'}
//               className="me-4 fs-5"
//             >
//               Vaccines
//             </Nav.Link>
            
//             <Nav.Link 
//               as={Link} 
//               href="/main/Map" 
//               active={pathname === '/main/Map'}
//               className="me-4 fs-5"
//             >
//               Map
//             </Nav.Link>

//           </Nav>

//           {/* Right Side */}
//           <div className="d-lg-flex align-items-center gap-2 ms-auto mt-3 mt-lg-0">

//             {/* Search */}
//             <form className="d-flex me-3" role="search">
//               <input 
//                 className="form-control rounded-pill" 
//                 style={{width: '250px', height:'35px'}} 
//                 type="search" 
//                 placeholder="Search" 
//                 aria-label="Search"
//               />
//             </form>

//             {/* Theme Toggle */}
//             <button 
//               onClick={toggleTheme}
//               className="btn d-flex me-2 border-0"
//               title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
//               id="themee"
//             >
//               {theme === 'light' ? (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
//                   <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
//                 </svg>
//               ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
//                   <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
//                 </svg>
//               )}
//             </button>

//             {/* Profile */}
//             <NavDropdown 
//               title={
//                 <img 
//                   src="/woman 2.png" 
//                   alt="Profile" 
//                   width="35" 
//                   height="35" 
//                   className="rounded-circle"
//                   style={{objectFit: 'cover'}}
//                 />
//               }
//               id="profile-dropdown"
//               align="end"
//             >
//               <NavDropdown.Item as={Link} href="/main/PersonProfile">
//                 My Profile
//               </NavDropdown.Item>

//               <NavDropdown.Item as={Link} href="/main/Animalprofile">
//                 Pet Profile
//               </NavDropdown.Item>

//               <NavDropdown.Divider />

//               <NavDropdown.Item as={Link} href="/admin/dashboard">
//                 Settings
//               </NavDropdown.Item>

//               <NavDropdown.Item as={Link} href="/logout" className="text-danger">
//                 Logout
//               </NavDropdown.Item>

//             </NavDropdown>

//           </div>

//         </BSNavbar.Collapse>
//       </Container>
//     </BSNavbar>
//   );
// }

// 'use client'

// import useTheme from '../hooks/usetheme';
// import Link from 'next/link';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './navbar.css';
// import { Navbar as BSNavbar, Nav, NavDropdown, Container } from 'react-bootstrap'
// import { usePath } from '../hooks/usePath';
// import Image from "next/image";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePath();

  return (
    <BSNavbar expand="lg" className="bg-body">
      <Container fluid className="px-3 px-lg-4">

        {/* Logo */}
        <BSNavbar.Brand as={Link} href="/main/Home" className="logo-container">
          <Image
            src="/logo.png"
            alt="PetsoCare"
            width={120}
            height={40}
            className="logo"
          />
        </BSNavbar.Brand>

        {/* Mobile Toggle */}
        <BSNavbar.Toggle aria-controls="navbarNav" />

        <BSNavbar.Collapse id="navbarNav">

          {/* Nav Links */}
          <Nav className="d-flex align-items-lg-center gap-5">
            <Nav.Link
              as={Link}
              href="/main/Home"
              active={pathname === '/main/Home'}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              href="/main/Articles"
              active={pathname === '/main/Articles'}
            >
              Articles
            </Nav.Link>

            <NavDropdown title="Reports" id="reports-dropdown">
              <NavDropdown.Item as={Link} href="/main/reports/EmergencyReport">
                Emergency Report
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/main/reports/DangerousAnimal">
                Dangerous Animal Report
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/main/reports/GeneralComplaint">
                General Complaint
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link
              as={Link}
              href="/main/VaccineSchedule"
              active={pathname === '/main/VaccineSchedule'}
            >
              Vaccines
            </Nav.Link>

            <Nav.Link
              as={Link}
              href="/main/Map"
              active={pathname === '/main/Map'}
            >
              Map
            </Nav.Link>
          </Nav>

          {/* Right Side */}
          <div className="navbar-right">

            {/* Search */}
            <input
              className="navbar-search"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />

            {/* Icons: Theme + Profile */}
            <div className="navbar-right-icons ">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="theme-btn"
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
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
                    src="/woman 2.png"
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
                <NavDropdown.Item as={Link} href="/main/Animalprofile">
                  Pet Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} href="/admin/dashboard">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/logout" className="text-danger">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>

          </div>

        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}