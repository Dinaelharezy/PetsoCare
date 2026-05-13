// app/forgot-password/page.tsx (أو ForgotPasswordClient.tsx)
'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'

export default function ForgotPassClient() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message ?? 'Something went wrong. Please try again.')
        return
      }

      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: '#f5f5dc' }}
    >
      <div
        className="position-absolute w-100 h-100"
        style={{ backgroundColor: 'rgba(245,245,220,0.7)', backdropFilter: 'blur(5px)' }}
      />

      <div
        className="card shadow-lg position-relative"
        style={{ maxWidth: '450px', width: '90%', borderRadius: '20px', border: 'none' }}
      >
        <div className="card-body p-5">

          {/* Icon */}
          <div className="text-center mb-4">
            <div
              style={{
                width: 64, height: 64, borderRadius: '50%',
                backgroundColor: 'rgb(240,250,230)',
                border: '2px solid rgb(199,242,167)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <i className="bi bi-lock" style={{ fontSize: '28px', color: 'rgb(100,170,70)' }} />
            </div>
            <h2 className="fw-bold mb-2">Forgot Password?</h2>
            <p className="text-muted" style={{ fontSize: '14px' }}>
              No worries! Enter your email and we'll send you a reset link.
            </p>
          </div>

          {/* Success state */}
          {success ? (
            <div className="text-center">
              <div
                style={{
                  width: 64, height: 64, borderRadius: '50%',
                  backgroundColor: 'rgb(240,250,230)',
                  border: '2px solid rgb(199,242,167)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <i className="bi bi-envelope-check" style={{ fontSize: '28px', color: 'rgb(100,170,70)' }} />
              </div>

              <h5 className="fw-bold mb-2">Check your email</h5>
              <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
                If an account exists for <strong>{email}</strong>, you'll receive a password reset link shortly.
              </p>

              <div
                className="p-3 mb-4"
                style={{
                  backgroundColor: 'rgb(240,250,230)', borderRadius: '12px',
                  border: '1px solid rgb(199,242,167)', fontSize: '13px',
                  color: 'rgb(60,120,30)',
                }}
              >
                <i className="bi bi-info-circle me-2" />
                Didn't receive the email? Check your spam folder or try again.
              </div>

              <button
                onClick={() => { setSuccess(false); setEmail('') }}
                className="btn w-100 py-2 fw-semibold mb-3"
                style={{
                  backgroundColor: 'rgb(199,242,167)', border: 'none',
                  borderRadius: '10px', fontSize: '15px',
                }}
              >
                <i className="bi bi-arrow-clockwise me-2" />
                Try another email
              </button>

              <Link
                href="/login"
                className="text-decoration-none d-block text-center"
                style={{ color: 'rgb(100,170,70)', fontSize: '14px' }}
              >
                <i className="bi bi-arrow-left me-1" />
                Back to Login
              </Link>
            </div>

          ) : (
            // Form state
            <form onSubmit={handleSubmit}>
              {error && (
                <div
                  className="alert mb-3 text-center py-2"
                  style={{
                    backgroundColor: '#fff0f0', border: '1px solid #ffcccc',
                    borderRadius: '10px', color: '#cc0000', fontSize: '14px',
                  }}
                >
                  <i className="bi bi-exclamation-circle me-2" />
                  {error}
                </div>
              )}

              <div className="mb-4">
                <label className="form-label fw-semibold">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-envelope text-muted" />
                  </span>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@example.com"
                    required
                    style={{
                      borderRadius: '0 10px 10px 0',
                      border: '1px solid #ddd',
                      borderLeft: 'none',
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn w-100 py-3 fw-semibold mb-3"
                style={{
                  backgroundColor: loading ? '#c7f2a780' : 'rgb(199,242,167)',
                  border: 'none', borderRadius: '10px',
                  fontSize: '16px', opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Sending…
                  </span>
                ) : (
                  <>
                    <i className="bi bi-send me-2" />
                    Send Reset Link
                  </>
                )}
              </button>

              <Link
                href="/login"
                className="text-decoration-none d-flex align-items-center justify-content-center gap-1"
                style={{ color: 'rgb(100,170,70)', fontSize: '14px' }}
              >
                <i className="bi bi-arrow-left" />
                Back to Login
              </Link>
            </form>
          )}

        </div>
      </div>
    </div>
  )
}