'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ChooseRole() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<'owner' | 'admin' | null>(null)
  const [hasPet, setHasPet] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<'cat' | 'other'>('cat')

  const handleProceed = () => {
    if (!selectedRole) {
      alert('Please select a role')
      return
    }
    console.log('Selected:', { selectedRole, hasPet, selectedTheme })
    router.push('/')
  }

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: 'url(/dog-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#f5f5dc'
      }}
    >
      {/* Overlay */}
      <div 
        className="position-absolute w-100 h-100" 
        style={{
          backgroundColor: 'rgba(245, 245, 220, 0.7)',
          backdropFilter: 'blur(5px)'
        }}
      ></div>

      {/* Choose Role Card */}
      <div 
        className="card shadow-lg position-relative" 
        style={{
          maxWidth: '600px',
          width: '90%',
          borderRadius: '20px',
          border: 'none'
        }}
      >
        <div className="card-body p-5">
          {/* Header */}
          <h2 className="text-center fw-bold mb-2">Choose Your Role</h2>
          <p className="text-center text-muted mb-4">
            Select whether you are a pet owner or an administrator to access the appropriate features.
          </p>

          {/* Role Selection */}
          <div className="row mb-4">
            {/* Pet Owner */}
            <div className="col-md-6 mb-3 mb-md-0">
              <div 
                className={`card h-100 cursor-pointer ${selectedRole === 'owner' ? 'border-success' : ''}`}
                onClick={() => setSelectedRole('owner')}
                style={{
                  cursor: 'pointer',
                  borderRadius: '15px',
                  border: selectedRole === 'owner' ? '3px solid rgb(199, 242, 167)' : '2px solid #e0e0e0',
                  transition: 'all 0.3s'
                }}
              >
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i 
                      className="bi bi-person" 
                      style={{
                        fontSize: '48px',
                        color: selectedRole === 'owner' ? 'rgb(150, 200, 120)' : '#ccc'
                      }}
                    ></i>
                  </div>
                  <h5 className="fw-bold mb-2">Pet Owner</h5>
                  <p className="text-muted small mb-0">
                    Manage your pets, vaccines, and medical history.
                  </p>
                </div>
              </div>
            </div>

            {/* Administrator */}
            <div className="col-md-6">
              <div 
                className={`card h-100 cursor-pointer ${selectedRole === 'admin' ? 'border-success' : ''}`}
                onClick={() => setSelectedRole('admin')}
                style={{
                  cursor: 'pointer',
                  borderRadius: '15px',
                  border: selectedRole === 'admin' ? '3px solid rgb(199, 242, 167)' : '2px solid #e0e0e0',
                  transition: 'all 0.3s'
                }}
              >
                <div className="card-body text-center p-4">
                  <div className="mb-3">
                    <i 
                      className="bi bi-shield-check" 
                      style={{
                        fontSize: '48px',
                        color: selectedRole === 'admin' ? 'rgb(150, 200, 120)' : '#ccc'
                      }}
                    ></i>
                  </div>
                  <h5 className="fw-bold mb-2">Administrator</h5>
                  <p className="text-muted small mb-0">
                    Access dashboard, manage content, and monitor activities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Do you own a pet */}
          <div className="mb-4">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={hasPet}
                onChange={(e) => setHasPet(e.target.checked)}
                id="hasPetRole"
              />
              <label className="form-check-label" htmlFor="hasPetRole">
                Do you own a pet?
              </label>
            </div>
          </div>

          {/* Choose Theme */}
          <div className="mb-4">
            <h5 className="mb-3">Choose Your Theme</h5>
            <div className="d-flex gap-3 justify-content-center">
              <button
                type="button"
                className={`btn px-4 py-2 ${selectedTheme === 'cat' ? 'btn-success' : 'btn-outline-secondary'}`}
                onClick={() => setSelectedTheme('cat')}
                style={{
                  borderRadius: '25px',
                  backgroundColor: selectedTheme === 'cat' ? 'rgb(199, 242, 167)' : 'transparent',
                  borderColor: selectedTheme === 'cat' ? 'rgb(199, 242, 167)' : '#6c757d',
                  color: selectedTheme === 'cat' ? '#000' : '#6c757d'
                }}
              >
                <i className="bi bi-emoji-smile me-2"></i>
                Cat Theme
              </button>
              <button
                type="button"
                className={`btn px-4 py-2 ${selectedTheme === 'other' ? 'btn-success' : 'btn-outline-secondary'}`}
                onClick={() => setSelectedTheme('other')}
                style={{
                  borderRadius: '25px',
                  backgroundColor: selectedTheme === 'other' ? 'rgb(199, 242, 167)' : 'transparent',
                  borderColor: selectedTheme === 'other' ? 'rgb(199, 242, 167)' : '#6c757d',
                  color: selectedTheme === 'other' ? '#000' : '#6c757d'
                }}
              >
                <i className="bi bi-heart me-2"></i>
                Other Animals
              </button>
            </div>
          </div>

          {/* Proceed Button */}
          <button 
            onClick={handleProceed}
            className="btn w-100 py-3 fw-semibold"
            style={{
              backgroundColor: 'rgb(199, 242, 167)',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px'
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  )
}
