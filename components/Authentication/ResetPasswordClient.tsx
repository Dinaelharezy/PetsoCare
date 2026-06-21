// 'use client'

// import { useState, FormEvent } from 'react'
// import { useSearchParams, useRouter } from 'next/navigation'
// import Link from 'next/link'
// import { apiUrl } from '@/lib/api';

// function getPasswordStrength(password: string): {
//   score: number; label: string; color: string
// } {
//   if (!password) return { score: 0, label: '', color: '#e0e0e0' }
//   let score = 0
//   if (password.length >= 8)          score++
//   if (/[A-Z]/.test(password))        score++
//   if (/[a-z]/.test(password))        score++
//   if (/[0-9]/.test(password))        score++
//   if (/[^A-Za-z0-9]/.test(password)) score++
//   if (score <= 2) return { score, label: 'Weak',   color: '#ff4444' }
//   if (score === 3) return { score, label: 'Fair',   color: '#ffaa00' }
//   if (score === 4) return { score, label: 'Good',   color: '#88cc00' }
//   return              { score, label: 'Strong', color: 'rgb(100,170,70)' }
// }

// type Status = 'idle' | 'saving' | 'success' | 'error'

// export default function ResetPasswordClient() {
//   const params = useSearchParams()
//   const router = useRouter()
//   const token  = params.get('token') ?? ''
//   const email  = params.get('email') ?? ''

//   const [password,        setPassword]        = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [showPass,        setShowPass]        = useState(false)
//   const [showConfirm,     setShowConfirm]     = useState(false)
//   const [status,          setStatus]          = useState<Status>('idle')
//   const [errorMsg,        setErrorMsg]        = useState('')

//   const strength = getPasswordStrength(password)

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault()
//     setErrorMsg('')

//     if (strength.score < 4) { setErrorMsg('Password is too weak.'); return }
//     if (password !== confirmPassword) { setErrorMsg('Passwords do not match.'); return }
//     if (!token) { setErrorMsg('Invalid or missing reset token.'); return }

//     setStatus('saving')
//     try {
//       const res = await fetch(
//         apiUrl(`auth/reset-password`),
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'ngrok-skip-browser-warning': 'true',
//           },
//           // body: JSON.stringify({ token, email, password, confirmPassword }),
//           body: JSON.stringify({
//   token,
//   newPassword: password,
//   confirmPassword,
// }),
//         }
//       )

//       if (res.ok) {
//         setStatus('success')
//         setTimeout(() => router.push('/login'), 3000)
//       } else {
//         const data = await res.json().catch(() => ({}))
//         setErrorMsg(data?.message ?? 'Reset failed. The link may have expired.')
//         setStatus('error')
//       }
//     } catch {
//       setErrorMsg('Network error. Please try again.')
//       setStatus('error')
//     }
//   }

//   if (status === 'success') {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f9fafb' }}>
//         <div className="w-100" style={{ maxWidth: '460px', padding: '1rem' }}>
//           <div className="card shadow-sm" style={{ borderRadius: '20px', border: 'none' }}>
//             <div className="card-body p-5 text-center">
//               <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
//               <h4 className="fw-bold mb-2">Password Reset!</h4>
//               <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
//                 Your password has been updated successfully.<br />
//                 Redirecting to login in 3 seconds…
//               </p>
//               <Link
//                 href="/login"
//                 className="btn fw-semibold w-100"
//                 style={{ backgroundColor: 'rgb(199,242,167)', border: 'none', borderRadius: '10px' }}
//               >
//                 Go to Login Now
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f9fafb' }}>
//       <div className="w-100" style={{ maxWidth: '460px', padding: '1rem' }}>
//         <div className="card shadow-sm" style={{ borderRadius: '20px', border: 'none' }}>
//           <div className="card-body p-5">

//             <div className="text-center mb-4">
//               <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔒</div>
//               <h4 className="fw-bold mb-1">Set New Password</h4>
//               <p className="text-muted" style={{ fontSize: '14px' }}>
//                 Choose a strong password for your account.
//               </p>
//             </div>

//             {errorMsg && (
//               <div
//                 className="alert py-2 mb-3"
//                 style={{ backgroundColor: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '10px', color: '#cc0000', fontSize: '14px' }}
//               >
//                 <i className="bi bi-exclamation-circle me-2" />{errorMsg}
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>
//                   New Password <span className="text-danger">*</span>
//                 </label>
//                 <div className="input-group">
//                   <span className="input-group-text bg-white">
//                     <i className="bi bi-lock" style={{ color: strength.color || '#aaa' }} />
//                   </span>
//                   <input
//                     type={showPass ? 'text' : 'password'}
//                     className="form-control"
//                     value={password}
//                     onChange={e => setPassword(e.target.value)}
//                     placeholder="Create a strong password"
//                     required
//                     style={{ borderRadius: 0, border: '1px solid #ddd', borderLeft: 'none', borderRight: 'none' }}
//                   />
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary"
//                     onClick={() => setShowPass(!showPass)}
//                     style={{ borderRadius: '0 10px 10px 0' }}
//                   >
//                     <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`} />
//                   </button>
//                 </div>

//                 {password && (
//                   <div className="mt-2">
//                     <div className="d-flex gap-1 mb-1">
//                       {[1,2,3,4,5].map(i => (
//                         <div key={i} style={{
//                           flex: 1, height: '4px', borderRadius: '2px',
//                           backgroundColor: i <= strength.score ? strength.color : '#e0e0e0',
//                           transition: 'background-color 0.3s',
//                         }} />
//                       ))}
//                     </div>
//                     <small style={{ color: strength.color, fontWeight: 600 }}>{strength.label}</small>
//                     <small className="text-muted ms-2">Min 8 chars · A-Z · a-z · 0-9 · @#$%</small>
//                   </div>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>
//                   Confirm Password <span className="text-danger">*</span>
//                 </label>
//                 <div className="input-group">
//                   <span className="input-group-text bg-white">
//                     <i className={`bi ${
//                       !confirmPassword ? 'bi-lock text-muted' :
//                       password === confirmPassword ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'
//                     }`} />
//                   </span>
//                   <input
//                     type={showConfirm ? 'text' : 'password'}
//                     className="form-control"
//                     value={confirmPassword}
//                     onChange={e => setConfirmPassword(e.target.value)}
//                     placeholder="Repeat your password"
//                     required
//                     style={{
//                       borderRadius: 0, border: '1px solid #ddd', borderLeft: 'none', borderRight: 'none',
//                       borderColor: confirmPassword
//                         ? password === confirmPassword ? '#28a745' : '#dc3545'
//                         : '#ddd'
//                     }}
//                   />
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary"
//                     onClick={() => setShowConfirm(!showConfirm)}
//                     style={{ borderRadius: '0 10px 10px 0' }}
//                   >
//                     <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'}`} />
//                   </button>
//                 </div>
//                 {confirmPassword && password !== confirmPassword && (
//                   <small className="text-danger mt-1 d-block">
//                     <i className="bi bi-exclamation-circle me-1" />Passwords do not match
//                   </small>
//                 )}
//                 {confirmPassword && password === confirmPassword && (
//                   <small className="text-success mt-1 d-block">
//                     <i className="bi bi-check-circle me-1" />Passwords match
//                   </small>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={status === 'saving'}
//                 className="btn w-100 py-3 fw-semibold mb-3"
//                 style={{ backgroundColor: 'rgb(199,242,167)', border: 'none', borderRadius: '10px', fontSize: '15px' }}
//               >
//                 {status === 'saving' ? (
//                   <><span className="spinner-border spinner-border-sm me-2" />Resetting…</>
//                 ) : (
//                   <><i className="bi bi-check-lg me-2" />Reset Password</>
//                 )}
//               </button>

//               <div className="text-center">
//                 <Link href="/login" className="text-decoration-none fw-semibold" style={{ color: 'rgb(100,170,70)', fontSize: '14px' }}>
//                   <i className="bi bi-arrow-left me-1" />Back to Login
//                 </Link>
//               </div>
//             </form>

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, FormEvent } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { apiUrl } from '@/lib/api';

function getPasswordStrength(password: string): {
  score: number; label: string; color: string
} {
  if (!password) return { score: 0, label: '', color: '#e0e0e0' }
  let score = 0
  if (password.length >= 8)          score++
  if (/[A-Z]/.test(password))        score++
  if (/[a-z]/.test(password))        score++
  if (/[0-9]/.test(password))        score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (score <= 2) return { score, label: 'Weak',   color: '#ff4444' }
  if (score === 3) return { score, label: 'Fair',   color: '#ffaa00' }
  if (score === 4) return { score, label: 'Good',   color: '#88cc00' }
  return              { score, label: 'Strong', color: 'rgb(100,170,70)' }
}

type Status = 'idle' | 'saving' | 'success' | 'error'

export default function ResetPasswordClient() {
  const params = useSearchParams()
  const router = useRouter()
  const token  = params.get('token') ?? ''
  const email  = params.get('email') ?? ''

  const [password,        setPassword]        = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass,        setShowPass]        = useState(false)
  const [showConfirm,     setShowConfirm]     = useState(false)
  const [status,          setStatus]          = useState<Status>('idle')
  const [errorMsg,        setErrorMsg]        = useState('')

  const strength = getPasswordStrength(password)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (strength.score < 4) { setErrorMsg('Password is too weak.'); return }
    if (password !== confirmPassword) { setErrorMsg('Passwords do not match.'); return }
    if (!token) { setErrorMsg('Invalid or missing reset token.'); return }

    setStatus('saving')
    try {
      const res = await fetch(
        apiUrl(`auth/reset-password`),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: JSON.stringify({
            token,
            newPassword: password,
            confirmPassword,
          }),
        }
      )

      if (res.ok) {
        setStatus('success')
        setTimeout(() => router.push('/login'), 3000)
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data?.message ?? 'Reset failed. The link may have expired.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f9fafb' }}>
        <div className="w-100" style={{ maxWidth: '460px', padding: '1rem' }}>
          <div className="card shadow-sm" style={{ borderRadius: '20px', border: 'none' }}>
            <div className="card-body p-5 text-center">
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
              <h4 className="fw-bold mb-2">Password Reset!</h4>
              <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
                Your password has been updated successfully.<br />
                Redirecting to login in 3 seconds…
              </p>
              <Link
                href="/login"
                className="btn fw-semibold w-100"
                style={{ backgroundColor: 'rgb(199,242,167)', border: 'none', borderRadius: '10px' }}
              >
                Go to Login Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f9fafb' }}>
      <div className="w-100" style={{ maxWidth: '460px', padding: '1rem' }}>
        <div className="card shadow-sm" style={{ borderRadius: '20px', border: 'none' }}>
          <div className="card-body p-5">

            <div className="text-center mb-4">
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔒</div>
              <h4 className="fw-bold mb-1">Set New Password</h4>
              <p className="text-muted" style={{ fontSize: '14px' }}>
                Choose a strong password for your account.
              </p>
            </div>

            {errorMsg && (
              <div
                className="alert py-2 mb-3"
                style={{ backgroundColor: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '10px', color: '#cc0000', fontSize: '14px' }}
              >
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>
                  New Password <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    🔒
                  </span>
                  <input
                    type={showPass ? 'text' : 'password'}
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    required
                    style={{ borderRadius: 0, border: '1px solid #ddd', borderLeft: 'none', borderRight: 'none' }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPass(!showPass)}
                    style={{ borderRadius: '0 10px 10px 0' }}
                  >
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>

                {password && (
                  <div className="mt-2">
                    <div className="d-flex gap-1 mb-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} style={{
                          flex: 1, height: '4px', borderRadius: '2px',
                          backgroundColor: i <= strength.score ? strength.color : '#e0e0e0',
                          transition: 'background-color 0.3s',
                        }} />
                      ))}
                    </div>
                    <small style={{ color: strength.color, fontWeight: 600 }}>{strength.label}</small>
                    <small className="text-muted ms-2">Min 8 chars · A-Z · a-z · 0-9 · @#$%</small>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    {!confirmPassword ? '🔒' : password === confirmPassword ? '✅' : '❌'}
                  </span>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    className="form-control"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    required
                    style={{
                      borderRadius: 0, border: '1px solid #ddd', borderLeft: 'none', borderRight: 'none',
                      borderColor: confirmPassword
                        ? password === confirmPassword ? '#28a745' : '#dc3545'
                        : '#ddd'
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowConfirm(!showConfirm)}
                    style={{ borderRadius: '0 10px 10px 0' }}
                  >
                    {showConfirm ? '🙈' : '👁️'}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <small className="text-danger mt-1 d-block">
                    ⚠️ Passwords do not match
                  </small>
                )}
                {confirmPassword && password === confirmPassword && (
                  <small className="text-success mt-1 d-block">
                    ✅ Passwords match
                  </small>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'saving'}
                className="btn w-100 py-3 fw-semibold mb-3"
                style={{ backgroundColor: 'rgb(199,242,167)', border: 'none', borderRadius: '10px', fontSize: '15px' }}
              >
                {status === 'saving' ? (
                  <><span className="spinner-border spinner-border-sm me-2" />Resetting…</>
                ) : (
                  <>✔ Reset Password</>
                )}
              </button>

              <div className="text-center">
                <Link href="/login" className="text-decoration-none fw-semibold" style={{ color: 'rgb(100,170,70)', fontSize: '14px' }}>
                  ← Back to Login
                </Link>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}