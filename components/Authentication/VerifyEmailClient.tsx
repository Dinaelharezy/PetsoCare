'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { apiUrl } from '@/lib/api'

type Status = 'verifying' | 'success' | 'error' | 'resending' | 'resent'

export default function VerifyEmailClient() {
  const params = useSearchParams()
  const router = useRouter()
  const token  = params.get('token')
  const email  = params.get('email') ?? ''

  const [status,  setStatus]  = useState<Status>('verifying')
  const [message, setMessage] = useState('')

  const verify = useCallback(async (t: string) => {
    setStatus('verifying')
    try {
      const res = await fetch(
        apiUrl(`auth/verify-email?token=${encodeURIComponent(t)}`),
        { method: 'GET', headers: { 'ngrok-skip-browser-warning': 'true' } }
      )
      if (res.ok) {
        setStatus('success')
        setTimeout(() => router.push('/login'), 3000)
      } else {
        const data = await res.json().catch(() => ({}))
        setMessage(data?.message ?? 'Verification failed. The link may have expired.')
        setStatus('error')
      }
    } catch {
      setMessage('Network error. Please try again.')
      setStatus('error')
    }
  }, [router])

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('No verification token found. Please check your email link.')
      return
    }
    verify(token)
  }, [token, verify])

  const resend = async () => {
    if (!email) return
    setStatus('resending')
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-verification`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
          body: JSON.stringify({ email }),
        }
      )
      setStatus(res.ok ? 'resent' : 'error')
      if (!res.ok) setMessage('Failed to resend. Please try again.')
    } catch {
      setStatus('error')
      setMessage('Network error.')
    }
  }

  const icons: Record<Status, string>  = { verifying: '⏳', success: '✅', error: '❌', resending: '📨', resent: '📬' }
  const titles: Record<Status, string> = { verifying: 'Verifying your email…', success: 'Email Verified!', error: 'Verification Failed', resending: 'Resending email…', resent: 'Email Sent!' }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f9fafb' }}>
      <div className="w-100" style={{ maxWidth: '460px', padding: '1rem' }}>
        <div className="card shadow-sm" style={{ borderRadius: '20px', border: 'none' }}>
          <div className="card-body p-5 text-center">

            <div style={{ fontSize: '56px', marginBottom: '16px' }}>{icons[status]}</div>
            <h4 className="fw-bold mb-2">{titles[status]}</h4>

            {status === 'verifying' && (
              <>
                <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
                  Please wait while we verify your email address.
                </p>
                <div className="spinner-border" style={{ color: 'rgb(100,170,70)' }} />
              </>
            )}

            {status === 'success' && (
              <>
                <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
                  Your email has been verified successfully!<br />
                  Redirecting to login in 3 seconds…
                </p>
                <Link href="/login" className="btn fw-semibold w-100" style={{ backgroundColor: 'rgb(199,242,167)', border: 'none', borderRadius: '10px' }}>
                  Go to Login Now
                </Link>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="alert py-2 mb-4" style={{ backgroundColor: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '10px', color: '#cc0000', fontSize: '14px' }}>
                  {message}
                </div>
                {email && (
                  <button onClick={resend} className="btn fw-semibold w-100 mb-3" style={{ backgroundColor: 'rgb(199,242,167)', border: 'none', borderRadius: '10px' }}>
                    Resend Verification Email
                  </button>
                )}
                <Link href="/login" className="text-decoration-none" style={{ color: 'rgb(100,170,70)', fontSize: '14px' }}>
                  Back to Login
                </Link>
              </>
            )}

            {status === 'resending' && (
              <div className="spinner-border mt-2" style={{ color: 'rgb(100,170,70)' }} />
            )}

            {status === 'resent' && (
              <>
                <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
                  A new verification email has been sent to <strong>{email}</strong>.<br />
                  Please check your inbox.
                </p>
                <Link href="/login" className="text-decoration-none" style={{ color: 'rgb(100,170,70)', fontSize: '14px' }}>
                  Back to Login
                </Link>
              </>
            )}

          </div>
        </div>

        <p className="text-center text-muted mt-3" style={{ fontSize: '13px' }}>
          Need help?{' '}
          <Link href="/login" className="text-decoration-none fw-semibold" style={{ color: 'rgb(100,170,70)' }}>
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  )
}