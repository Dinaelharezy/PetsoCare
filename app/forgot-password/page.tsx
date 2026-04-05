'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
// import 'bootstrap/dist/css/bootstrap.min.css'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ForgotPassword() {
  const [email,   setEmail]   = useState('')
  const [status,  setStatus]  = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('sending')
    setMessage('')

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: JSON.stringify({ email }),
        }
      )

      if (res.ok) {
        setStatus('sent')
      } else {
        const data = await res.json().catch(() => ({}))
        setMessage(data?.message ?? 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setMessage('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: '#f9fafb' }}
    >
      <div className="w-100" style={{ maxWidth: '460px', padding: '1rem' }}>
        <div className="card shadow-sm" style={{ borderRadius: '20px', border: 'none' }}>
          <div className="card-body p-5">

            {/* Header */}
            <div className="text-center mb-4">
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔑</div>
              <h4 className="fw-bold mb-1">Forgot Password?</h4>
              <p className="text-muted" style={{ fontSize: '14px' }}>
                Enter your email and we'll send you a reset link.
              </p>
            </div>

            {/* Success State */}
            {status === 'sent' ? (
              <div className="text-center">
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📬</div>
                <h5 className="fw-bold mb-2">Check your inbox!</h5>
                <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
                  We sent a password reset link to <strong>{email}</strong>.
                  <br />The link expires in 15 minutes.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setEmail('') }}
                  className="btn btn-outline-secondary w-100 mb-3"
                  style={{ borderRadius: '10px' }}
                >
                  Send again
                </button>
                <Link
                  href="/login"
                  className="text-decoration-none fw-semibold d-block"
                  style={{ color: 'rgb(100,170,70)', fontSize: '14px' }}
                >
                  Back to Login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Error */}
                {status === 'error' && (
                  <div
                    className="alert py-2 mb-3"
                    style={{
                      backgroundColor: '#fff0f0',
                      border: '1px solid #ffcccc',
                      borderRadius: '10px',
                      color: '#cc0000',
                      fontSize: '14px',
                    }}
                  >
                    <i className="bi bi-exclamation-circle me-2" />{message}
                  </div>
                )}

                {/* Email Input */}
                <div className="mb-4">
                  <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>
                    Email Address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-envelope" />
                    </span>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      style={{ borderRadius: '0 10px 10px 0', border: '1px solid #ddd', borderLeft: 'none' }}
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn w-100 py-3 fw-semibold mb-3"
                  style={{
                    backgroundColor: 'rgb(199,242,167)',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '15px',
                  }}
                >
                  {status === 'sending' ? (
                    <><span className="spinner-border spinner-border-sm me-2" />Sending…</>
                  ) : (
                    <><i className="bi bi-send me-2" />Send Reset Link</>
                  )}
                </button>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="text-decoration-none fw-semibold"
                    style={{ color: 'rgb(100,170,70)', fontSize: '14px' }}
                  >
                    <i className="bi bi-arrow-left me-1" />Back to Login
                  </Link>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}