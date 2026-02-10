'use client'

import useTheme from '../hooks/usetheme';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand me-5" href="/">Navbar</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item me-4">
              <Link className="nav-link active" aria-current="page" href="/main/Home">Home</Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" href="/main/Articles">Articles</Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" href="../dashboard">Reports</Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" href="../main/VaccineSchedule">Vaccines</Link>
            </li>
            <li className="nav-item me-4">
              <Link className="nav-link" href="/map">Map</Link>
            </li>
          </ul>
        </div>

        {/* Search, Theme, Profile */}
        <div className="d-none d-lg-flex align-items-center gap-3 ms-auto">
          {/* Search Form */}
          <form className="d-flex" style={{marginRight:'250px'}} role="search">
            <input 
              className="form-control me-2" 
              style={{width: '500px', height:'35px'}} 
              type="search" 
              placeholder="Search" 
              aria-label="Search"
            />
          </form>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="btn d-flex gap-4 border-0"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            id='themee'
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
              </svg>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="dropdown">
            <img 
              src="/woman 2.png" 
              alt="Profile" 
              width="35" 
              height="35" 
              className="rounded-circle dropdown-toggle me-4"
              style={{objectFit: 'cover', cursor: 'pointer'}}
              data-bs-toggle="dropdown"
              aria-expanded="false"
              role="button"
            />
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" href="/main/PersonProfile">
                  <i className="bi bi-person me-2"></i>
                  My Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="/main/Animalprofile">
                  <i className="bi bi-heart me-2"></i>
                  Pet Profile
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <Link className="dropdown-item" href="/main/signup">
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </Link>
              </li>
              <li>
                <Link className="dropdown-item text-danger" href="/logout">
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}