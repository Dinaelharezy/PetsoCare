'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    hasPet: false
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Login data:', formData)
    // بعد Login ناجح، روح على صفحة Choose Role
    router.push('/choose-role')
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

      {/* Login Card */}
      <div 
        className="card shadow-lg position-relative" 
        style={{
          maxWidth: '450px',
          width: '90%',
          borderRadius: '20px',
          border: 'none'
        }}
      >
        <div className="card-body p-5">
          {/* Header */}
          <h2 className="text-center fw-bold mb-2">Welcome Back!</h2>
          <p className="text-center text-muted mb-4">
            Sign in to Pawsitive Health to manage your pet's well-being.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control form-control-lg" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@example.com"
                required
                style={{
                  borderRadius: '10px',
                  border: '1px solid #ddd'
                }}
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control form-control-lg" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                style={{
                  borderRadius: '10px',
                  border: '1px solid #ddd'
                }}
              />
            </div>

            {/* Do you own a pet */}
            <div className="mb-4">
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  name="hasPet"
                  checked={formData.hasPet}
                  onChange={handleChange}
                  id="hasPet"
                />
                <label className="form-check-label" htmlFor="hasPet">
                  Do you own a pet?
                </label>
              </div>
            </div>

            {/* Sign In Button */}
            <button 
              type="submit" 
              className="btn w-100 py-3 fw-semibold mb-3"
              style={{
                backgroundColor: 'rgb(199, 242, 167)',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px'
              }}
            >
              Sign In
            </button>

            {/* Create Account Link */}
            <p className="text-center mb-0">
              Don't have an account?{' '}
              <Link 
                href="/signup" 
                className="text-decoration-none"
                style={{ color: 'rgb(150, 200, 120)' }}
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}