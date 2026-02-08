'use client'

import { useState } from 'react'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function UserProfile() {
  const [formData, setFormData] = useState({
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@example.com',
    password: 'securepassword123',
    phone: '555-123-4567',
    hasPet: true,
    dateOfBirth: '',
    location: 'Cairo',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    socialLinks: {
      facebook: 'https://facebook.com/alice',
      twitter: 'https://twitter.com/alice',
      linkedin: 'https://linkedin.com/in/alice',
      github: 'https://github.com/alice'
    }
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Profile updated successfully!')
  }

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Main Content */}
        <div className="col-md-10 p-4">
          <div className="mx-auto" style={{maxWidth: '700px'}}>
            {/* Header */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <Image 
                src="/woman 2.png" 
                alt="User Avatar" 
                width={80} 
                height={80}
                className="rounded-circle"
                style={{objectFit: 'cover'}}
              />
              <div>
                <h4 className="mb-1">User Profile</h4>
                <p className="text-muted mb-1" style={{fontSize: '14px'}}>Manage your account settings.</p>
                <button className="btn btn-link p-0 text-decoration-none" style={{fontSize: '13px'}}>
                  <i className="bi bi-upload me-1"></i>
                  Upload Avatar
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <span className="input-group-text bg-white">
                    <span className="badge bg-success">Verified</span>
                  </span>
                </div>
                <small className="text-muted">Verification email sent.</small>
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input 
                    type={showPassword ? "text" : "password"}
                    className="form-control" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                  </button>
                </div>
                <small className="text-danger">Strength: Weak</small>
                <br />
                <small className="text-muted">Password must be at least 8 characters long.</small>
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label">Phone (Optional)</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-telephone"></i>
                  </span>
                  <input 
                    type="tel" 
                    className="form-control" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Do you own a pet */}
              <div className="mb-3">
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    name="hasPet"
                    checked={formData.hasPet}
                    onChange={handleChange}
                    id="petCheck"
                  />
                  <label className="form-check-label" htmlFor="petCheck">
                    <i className="bi bi-emoji-smile text-success me-1"></i>
                    Do you own a pet?
                  </label>
                  <i className="bi bi-info-circle text-muted ms-2" title="Additional pet info"></i>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="mb-3">
                <label className="form-label">Date of Birth (Optional)</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-calendar"></i>
                  </span>
                  <input 
                    type="date" 
                    className="form-control" 
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    placeholder="Pick a date"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="form-label">Location (Optional)</label>
                <input 
                  type="text" 
                  className="form-control mb-2" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
                <button type="button" className="btn btn-link p-0 text-decoration-none" style={{fontSize: '13px'}}>
                  <i className="bi bi-geo-alt me-1"></i>
                  Auto detect Location
                </button>
              </div>

              {/* Notification Preferences */}
              <div className="mb-4">
                <h6 className="mb-3">Notification Preferences</h6>
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <i className="bi bi-envelope me-2"></i>
                    Email
                  </div>
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      name="notifications.email"
                      checked={formData.notifications.email}
                      onChange={handleChange}
                      style={{width: '3em', height: '1.5em'}}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <i className="bi bi-bell me-2"></i>
                    Push Notifications
                  </div>
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      name="notifications.push"
                      checked={formData.notifications.push}
                      onChange={handleChange}
                      style={{width: '3em', height: '1.5em'}}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <i className="bi bi-chat-dots me-2"></i>
                    SMS
                  </div>
                  <div className="form-check form-switch">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      name="notifications.sms"
                      checked={formData.notifications.sms}
                      onChange={handleChange}
                      style={{width: '3em', height: '1.5em'}}
                    />
                  </div>
                </div>
              </div>

              {/* Linked Social Accounts */}
              <div className="mb-4">
                <h6 className="mb-3">Linked Social Accounts</h6>
                
                <div className="input-group mb-2">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-facebook"></i>
                  </span>
                  <input 
                    type="url" 
                    className="form-control" 
                    name="socialLinks.facebook"
                    value={formData.socialLinks.facebook}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group mb-2">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-twitter"></i>
                  </span>
                  <input 
                    type="url" 
                    className="form-control" 
                    name="socialLinks.twitter"
                    value={formData.socialLinks.twitter}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group mb-2">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-linkedin"></i>
                  </span>
                  <input 
                    type="url" 
                    className="form-control" 
                    name="socialLinks.linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group mb-2">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-github"></i>
                  </span>
                  <input 
                    type="url" 
                    className="form-control" 
                    name="socialLinks.github"
                    value={formData.socialLinks.github}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-end gap-2 mb-4">
                <button type="button" className="btn btn-outline-secondary">Cancel</button>
                <button type="submit" className="btn text-dark fw-semibold" style={{backgroundColor: 'rgb(199, 242, 167)'}}>
                  Save/Update Profile
                </button>
              </div>

              {/* Footer */}
              <div className="d-flex justify-content-between text-muted" style={{fontSize: '12px'}}>
                <span>Created At: 1/1/2023, 10:00:00 AM</span>
                <span>Last Login At: 3/20/2024, 2:30:00 PM</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}