

// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// // import 'bootstrap/dist/css/bootstrap.min.css'

// // ── Types ──────────────────────────────────────────────────────────
// interface RegisterForm {
//   firstName:       string
//   lastName:        string
//   email:           string
//   phone:           string
//   password:        string
//   confirmPassword: string
// }

// type SaveStatus = 'idle' | 'saving' | 'success' | 'error'


// function getPasswordStrength(password: string): {
//   score: number
//   label: string
//   color: string
// } {
//   if (!password) return { score: 0, label: '', color: '#e0e0e0' }

//   let score = 0
//   if (password.length >= 8)           score++
//   if (/[A-Z]/.test(password))         score++
//   if (/[a-z]/.test(password))         score++
//   if (/[0-9]/.test(password))         score++
//   if (/[^A-Za-z0-9]/.test(password))  score++

//   if (score <= 2) return { score, label: 'Weak',   color: '#ff4444' }
//   if (score === 3) return { score, label: 'Fair',   color: '#ffaa00' }
//   if (score === 4) return { score, label: 'Good',   color: '#88cc00' }
//   return              { score, label: 'Strong', color: 'rgb(100,170,70)' }
// }

// // ── Step Indicator ─────────────────────────────────────────────────
// function StepIndicator({ current, total }: { current: number; total: number }) {
//   const labels = ['Your Info', 'Security', 'Review']
//   return (
//     <div className="mb-4">
//       <div className="d-flex align-items-center gap-2 mb-2">
//         {Array.from({ length: total }).map((_, i) => (
//           <div key={i} style={{
//             height: '6px', flex: 1, borderRadius: '3px',
//             backgroundColor: i < current ? 'rgb(100,170,70)' : '#e0e0e0',
//             transition: 'background-color 0.3s',
//           }} />
//         ))}
//         <span className="text-muted ms-1" style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
//           {current} / {total}
//         </span>
//       </div>
//       <p className="mb-0 fw-semibold" style={{ fontSize: '13px', color: 'rgb(100,170,70)' }}>
//         {labels[current - 1]}
//       </p>
//     </div>
//   )
// }

// // ── Avatar Initials ────────────────────────────────────────────────
// function Avatar({ name }: { name: string }) {
//   const letter = (name?.[0] || '?').toUpperCase()
//   return (
//     <div style={{
//       width: '72px', height: '72px', borderRadius: '50%',
//       backgroundColor: 'rgb(199,242,167)',
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//       fontSize: '26px', fontWeight: 700, color: 'rgb(60,120,30)',
//       flexShrink: 0,
//     }}>
//       {letter}
//     </div>
//   )
// }

// export default function SignUpCompletionClient() {
//   const router = useRouter()

//   const TOTAL_STEPS = 3
//   const [step, setStep]       = useState(1)
//   const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
//   const [errorMsg, setErrorMsg]     = useState('')

//   const [showPass,    setShowPass]    = useState(false)
//   const [showConfirm, setShowConfirm] = useState(false)

//   const [formData, setFormData] = useState<RegisterForm>({
//     firstName: '', lastName: '', email: '', phone: '',
//     password: '', confirmPassword: '',
//   })

//   const strength = getPasswordStrength(formData.password)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   // ── Validation per step ──────────────────────────────────────────
//   const validateStep = (): string => {
//     if (step === 1) {
//       if (!formData.firstName.trim()) return 'First name is required.'
//       if (!formData.email.trim())     return 'Email is required.'
//       if (!formData.phone.trim())     return 'Phone is required.'
//     }
//     if (step === 2) {
//       if (!formData.password)                          return 'Password is required.'
//       if (strength.score < 4)                          return 'Password is too weak.'
//       if (formData.password !== formData.confirmPassword) return 'Passwords do not match.'
//     }
//     return ''
//   }

//   const handleNext = () => {
//     const err = validateStep()
//     if (err) { setErrorMsg(err); return }
//     setErrorMsg('')
//     setStep(s => s + 1)
//   }

//   // ── Register ─────────────────────────────────────────────────────
//   const handleRegister = async () => {
//     setSaveStatus('saving')
//     setErrorMsg('')
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name:     `${formData.firstName} ${formData.lastName}`.trim(),
//           email:    formData.email,
//           phone:    formData.phone,
//           password: formData.password,
//         }),
//       })

//       if (res.ok) {
//         setSaveStatus('success')
//         // ✅ بعد register ناجح → روح login
//         setTimeout(() => router.push('/login'), 1500)
//       } else {
//         const err = await res.json()
//         const firstError = Object.values(err.errors ?? {})?.[0]
//         setErrorMsg(Array.isArray(firstError) ? firstError[0] : 'Registration failed.')
//         setSaveStatus('error')
//       }
//     } catch {
//       setErrorMsg('Network error. Please try again.')
//       setSaveStatus('error')
//     }
//   }

//   // ── Step Content ─────────────────────────────────────────────────
//   const renderStep = () => {
//     switch (step) {

//       // ── Step 1: Personal Info ────────────────────────────────────
//       case 1:
//         return (
//           <div className="d-flex flex-column gap-3">

//             <div className="row g-3">
//               <div className="col-md-6">
//                 <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>
//                   First Name <span className="text-danger">*</span>
//                 </label>
//                 <input type="text" className="form-control" name="firstName"
//                   value={formData.firstName} onChange={handleChange}
//                   placeholder="John" style={{ borderRadius: '10px' }} />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>Last Name</label>
//                 <input type="text" className="form-control" name="lastName"
//                   value={formData.lastName} onChange={handleChange}
//                   placeholder="Doe" style={{ borderRadius: '10px' }} />
//               </div>
//             </div>

//             <div>
//               <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>
//                 Email <span className="text-danger">*</span>
//               </label>
//               <div className="input-group">
//                 <span className="input-group-text bg-white"><i className="bi bi-envelope" /></span>
//                 <input type="email" className="form-control" name="email"
//                   value={formData.email} onChange={handleChange}
//                   placeholder="you@example.com" style={{ borderRadius: '0 10px 10px 0' }} />
//               </div>
//             </div>

//             <div>
//               <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>
//                 Phone <span className="text-danger">*</span>
//               </label>
//               <div className="input-group">
//                 <span className="input-group-text bg-white"><i className="bi bi-telephone" /></span>
//                 <input type="tel" className="form-control" name="phone"
//                   value={formData.phone} onChange={handleChange}
//                   placeholder="+20xxxxxxxxxx" style={{ borderRadius: '0 10px 10px 0' }} />
//               </div>
//             </div>

//           </div>
//         )

//       // ── Step 2: Password ─────────────────────────────────────────
//       case 2:
//         return (
//           <div className="d-flex flex-column gap-3">

//             <div>
//               <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>
//                 Password <span className="text-danger">*</span>
//               </label>
//               <div className="input-group">
//                 <span className="input-group-text bg-white">
//                   {/* ✅ Icon بيتغير حسب الـ strength */}
//                   <i className="bi bi-lock" style={{ color: strength.color || '#aaa' }} />
//                 </span>
//                 <input
//                   type={showPass ? 'text' : 'password'}
//                   className="form-control" name="password"
//                   value={formData.password} onChange={handleChange}
//                   placeholder="Create a strong password"
//                   style={{ borderRadius: '0', border: '1px solid #ddd', borderLeft: 'none', borderRight: 'none' }}
//                 />
//                 <button type="button" className="btn btn-outline-secondary"
//                   onClick={() => setShowPass(!showPass)}
//                   style={{ borderRadius: '0 10px 10px 0' }}>
//                   <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`} />
//                 </button>
//               </div>

//               {/* ✅ Password Strength Bar */}
//               {formData.password && (
//                 <div className="mt-2">
//                   <div className="d-flex gap-1 mb-1">
//                     {[1, 2, 3, 4, 5].map(i => (
//                       <div key={i} style={{
//                         flex: 1, height: '4px', borderRadius: '2px',
//                         backgroundColor: i <= strength.score ? strength.color : '#e0e0e0',
//                         transition: 'background-color 0.3s',
//                       }} />
//                     ))}
//                   </div>
//                   <small style={{ color: strength.color, fontWeight: 600 }}>
//                     {strength.label}
//                   </small>
//                   <small className="text-muted ms-2">
//                     Min 8 chars · A-Z · a-z · 0-9 · @#$%
//                   </small>
//                 </div>
//               )}
//             </div>

//             <div>
//               <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>
//                 Confirm Password <span className="text-danger">*</span>
//               </label>
//               <div className="input-group">
//                 <span className="input-group-text bg-white">
//                   {/* ✅ Icon بيتغير حسب المطابقة */}
//                   <i className={`bi ${
//                     !formData.confirmPassword ? 'bi-lock text-muted' :
//                     formData.password === formData.confirmPassword
//                       ? 'bi-check-circle-fill text-success'
//                       : 'bi-x-circle-fill text-danger'
//                   }`} />
//                 </span>
//                 <input
//                   type={showConfirm ? 'text' : 'password'}
//                   className="form-control" name="confirmPassword"
//                   value={formData.confirmPassword} onChange={handleChange}
//                   placeholder="Repeat your password"
//                   style={{
//                     borderRadius: '0', border: '1px solid #ddd',
//                     borderLeft: 'none', borderRight: 'none',
//                     borderColor: formData.confirmPassword
//                       ? formData.password === formData.confirmPassword ? '#28a745' : '#dc3545'
//                       : '#ddd'
//                   }}
//                 />
//                 <button type="button" className="btn btn-outline-secondary"
//                   onClick={() => setShowConfirm(!showConfirm)}
//                   style={{ borderRadius: '0 10px 10px 0' }}>
//                   <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'}`} />
//                 </button>
//               </div>
//               {formData.confirmPassword && formData.password !== formData.confirmPassword && (
//                 <small className="text-danger mt-1 d-block">
//                   <i className="bi bi-exclamation-circle me-1" />Passwords do not match
//                 </small>
//               )}
//               {formData.confirmPassword && formData.password === formData.confirmPassword && (
//                 <small className="text-success mt-1 d-block">
//                   <i className="bi bi-check-circle me-1" />Passwords match
//                 </small>
//               )}
//             </div>

//           </div>
//         )

//       // ── Step 3: Review ───────────────────────────────────────────
//       case 3:
//         return (
//           <div>
//             <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
//               Review your info before creating your account.
//             </p>
//             <div className="d-flex flex-column gap-2">
//               {[
//                 { label: 'Full Name', value: `${formData.firstName} ${formData.lastName}`.trim() || '—', icon: 'bi-person' },
//                 { label: 'Email',     value: formData.email || '—',  icon: 'bi-envelope' },
//                 { label: 'Phone',     value: formData.phone || '—',  icon: 'bi-telephone' },
//                 { label: 'Password',  value: '••••••••',             icon: 'bi-lock' },
//               ].map(({ label, value, icon }) => (
//                 <div key={label} className="d-flex justify-content-between align-items-center py-2 px-3"
//                   style={{ borderRadius: '10px', backgroundColor: '#f9f9f9', fontSize: '14px' }}>
//                   <div className="d-flex align-items-center gap-2">
//                     <i className={`bi ${icon} text-muted`} />
//                     <span className="fw-semibold text-muted">{label}</span>
//                   </div>
//                   <span style={{ maxWidth: '60%', textAlign: 'right', wordBreak: 'break-all' }}>{value}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 p-3"
//               style={{ backgroundColor: 'rgb(240,250,230)', borderRadius: '12px', border: '1px solid rgb(199,242,167)' }}>
//               <p className="mb-0" style={{ fontSize: '13px', color: 'rgb(60,120,30)' }}>
//                 <i className="bi bi-info-circle me-2" />
//                 After registering you will be redirected to login.
//               </p>
//             </div>
//           </div>
//         )
//     }
//   }

//   // ── Render ────────────────────────────────────────────────────────
//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center"
//       style={{ backgroundColor: '#f9fafb' }}>
//       <div className="w-100" style={{ maxWidth: '520px', padding: '1rem' }}>

//         {/* Card */}
//         <div className="card shadow-sm" style={{ borderRadius: '20px', border: 'none' }}>
//           <div className="card-body p-5">

//             {/* Header */}
//             <div className="d-flex align-items-center gap-3 mb-4">
//               <Avatar name={formData.firstName || '?'} />
//               <div>
//                 <h4 className="mb-1 fw-bold">Create Account</h4>
//                 <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
//                   Join PetsoCare to manage your pet's health
//                 </p>
//               </div>
//             </div>

//             <StepIndicator current={step} total={TOTAL_STEPS} />

//             {/* Error */}
//             {errorMsg && (
//               <div className="alert py-2 mb-3" style={{
//                 backgroundColor: '#fff0f0', border: '1px solid #ffcccc',
//                 borderRadius: '10px', color: '#cc0000', fontSize: '14px'
//               }}>
//                 <i className="bi bi-exclamation-circle me-2" />{errorMsg}
//               </div>
//             )}

//             {/* Success */}
//             {saveStatus === 'success' && (
//               <div className="alert alert-success py-2 mb-3" style={{ borderRadius: '10px', fontSize: '14px' }}>
//                 <i className="bi bi-check-circle me-2" />Account created! Redirecting to login…
//               </div>
//             )}

//             {/* Step Content */}
//             <div style={{ minHeight: '220px' }}>
//               {renderStep()}
//             </div>

//             {/* Navigation */}
//             <div className="d-flex justify-content-between align-items-center mt-4 pt-3"
//               style={{ borderTop: '1px solid #f0f0f0' }}>

//               {step === 1 ? (
//                 <Link href="/login" className="btn btn-outline-secondary" style={{ borderRadius: '10px' }}>
//                   Back to Login
//                 </Link>
//               ) : (
//                 <button onClick={() => { setErrorMsg(''); setStep(s => s - 1) }}
//                   className="btn btn-outline-secondary" style={{ borderRadius: '10px' }}>
//                   <i className="bi bi-arrow-left me-1" />Back
//                 </button>
//               )}

//               {step < TOTAL_STEPS ? (
//                 <button onClick={handleNext} className="btn fw-semibold"
//                   style={{ backgroundColor: 'rgb(199,242,167)', border: 'none', borderRadius: '10px', minWidth: '120px' }}>
//                   Next <i className="bi bi-arrow-right ms-1" />
//                 </button>
//               ) : (
//                 <button onClick={handleRegister} disabled={saveStatus === 'saving'}
//                   className="btn fw-semibold"
//                   style={{ backgroundColor: 'rgb(199,242,167)', border: 'none', borderRadius: '10px', minWidth: '150px' }}>
//                   {saveStatus === 'saving'
//                     ? <><span className="spinner-border spinner-border-sm me-2" />Creating…</>
//                     : <><i className="bi bi-person-check me-1" />Create Account</>}
//                 </button>
//               )}
//             </div>

//           </div>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-muted mt-3" style={{ fontSize: '13px' }}>
//           Already have an account?{' '}
//           <Link href="/login" className="text-decoration-none fw-semibold" style={{ color: 'rgb(100,170,70)' }}>
//             Sign in
//           </Link>
//         </p>

//       </div>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// ── Types ──────────────────────────────────────────────────────────
interface RegisterForm {
  firstName:       string
  lastName:        string
  email:           string
  phone:           string
  password:        string
  confirmPassword: string
}

type SaveStatus = 'idle' | 'saving' | 'success' | 'error'

function getPasswordStrength(password: string): {
  score: number
  label: string
  color: string
} {
  if (!password) return { score: 0, label: '', color: '#e0e0e0' }

  let score = 0
  if (password.length >= 8)           score++
  if (/[A-Z]/.test(password))         score++
  if (/[a-z]/.test(password))         score++
  if (/[0-9]/.test(password))         score++
  if (/[^A-Za-z0-9]/.test(password))  score++

  if (score <= 2) return { score, label: 'Weak',   color: '#ff4444' }
  if (score === 3) return { score, label: 'Fair',   color: '#ffaa00' }
  if (score === 4) return { score, label: 'Good',   color: '#88cc00' }
  return              { score, label: 'Strong', color: 'rgb(100,170,70)' }
}

// ── Step Indicator ─────────────────────────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
  const labels = ['Your Info', 'Security', 'Review']
  return (
    <div className="mb-4">
      <div className="d-flex align-items-center gap-2 mb-2">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            height: '6px', flex: 1, borderRadius: '3px',
            backgroundColor: i < current ? 'rgb(100,170,70)' : '#e0e0e0',
            transition: 'background-color 0.3s',
          }} />
        ))}
        <span className="text-muted ms-1" style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
          {current} / {total}
        </span>
      </div>
      <p className="mb-0 fw-semibold" style={{ fontSize: '13px', color: 'rgb(100,170,70)' }}>
        {labels[current - 1]}
      </p>
    </div>
  )
}

// ── Avatar Initials ────────────────────────────────────────────────
function Avatar({ name }: { name: string }) {
  const letter = (name?.[0] || '?').toUpperCase()
  return (
    <div style={{
      width: '72px', height: '72px', borderRadius: '50%',
      backgroundColor: 'rgb(199,242,167)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '26px', fontWeight: 700, color: 'rgb(60,120,30)',
      flexShrink: 0,
    }}>
      {letter}
    </div>
  )
}

export default function SignUpCompletionClient() {
  const router = useRouter()

  const TOTAL_STEPS = 3
  const [step,       setStep]       = useState(1)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [errorMsg,   setErrorMsg]   = useState('')

  const [showPass,    setShowPass]    = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [formData, setFormData] = useState<RegisterForm>({
    firstName: '', lastName: '', email: '', phone: '',
    password: '', confirmPassword: '',
  })

  const strength = getPasswordStrength(formData.password)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // ── Validation per step ──────────────────────────────────────────
  const validateStep = (): string => {
    if (step === 1) {
      if (!formData.firstName.trim()) return 'First name is required.'
      if (!formData.email.trim())     return 'Email is required.'
      if (!formData.phone.trim())     return 'Phone is required.'
    }
    if (step === 2) {
      if (!formData.password)                             return 'Password is required.'
      if (strength.score < 4)                             return 'Password is too weak.'
      if (formData.password !== formData.confirmPassword) return 'Passwords do not match.'
    }
    return ''
  }

  const handleNext = () => {
    const err = validateStep()
    if (err) { setErrorMsg(err); return }
    setErrorMsg('')
    setStep(s => s + 1)
  }

  // ── Register ─────────────────────────────────────────────────────
  const handleRegister = async () => {
    setSaveStatus('saving')
    setErrorMsg('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          name:     `${formData.firstName} ${formData.lastName}`.trim(),
          email:    formData.email,
          phone:    formData.phone,
          password: formData.password,
        }),
      })

      if (res.ok) {
        setSaveStatus('success')
        // ✅ بعد register ناجح → روح verify-email مع الـ email
        setTimeout(() => {
          router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`)
        }, 1500)
      } else {
        const err = await res.json()
        const firstError = Object.values(err.errors ?? {})?.[0]
        setErrorMsg(Array.isArray(firstError) ? firstError[0] : (err.message ?? 'Registration failed.'))
        setSaveStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setSaveStatus('error')
    }
  }

  // ── Step Content ─────────────────────────────────────────────────
  const renderStep = () => {
    switch (step) {

      // ── Step 1: Personal Info ────────────────────────────────────
      case 1:
        return (
          <div className="d-flex flex-column gap-3">

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>
                  First Name <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" name="firstName"
                  value={formData.firstName} onChange={handleChange}
                  placeholder="John" style={{ borderRadius: '10px' }} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>Last Name</label>
                <input type="text" className="form-control" name="lastName"
                  value={formData.lastName} onChange={handleChange}
                  placeholder="Doe" style={{ borderRadius: '10px' }} />
              </div>
            </div>

            <div>
              <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>
                Email <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white"><i className="bi bi-envelope" /></span>
                <input type="email" className="form-control" name="email"
                  value={formData.email} onChange={handleChange}
                  placeholder="you@example.com" style={{ borderRadius: '0 10px 10px 0' }} />
              </div>
            </div>

            <div>
              <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>
                Phone <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white"><i className="bi bi-telephone" /></span>
                <input type="tel" className="form-control" name="phone"
                  value={formData.phone} onChange={handleChange}
                  placeholder="+20xxxxxxxxxx" style={{ borderRadius: '0 10px 10px 0' }} />
              </div>
            </div>

          </div>
        )

      // ── Step 2: Password ─────────────────────────────────────────
      case 2:
        return (
          <div className="d-flex flex-column gap-3">

            <div>
              <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>
                Password <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className="bi bi-lock" style={{ color: strength.color || '#aaa' }} />
                </span>
                <input
                  type={showPass ? 'text' : 'password'}
                  className="form-control" name="password"
                  value={formData.password} onChange={handleChange}
                  placeholder="Create a strong password"
                  style={{ borderRadius: '0', border: '1px solid #ddd', borderLeft: 'none', borderRight: 'none' }}
                />
                <button type="button" className="btn btn-outline-secondary"
                  onClick={() => setShowPass(!showPass)}
                  style={{ borderRadius: '0 10px 10px 0' }}>
                  <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`} />
                </button>
              </div>

              {formData.password && (
                <div className="mt-2">
                  <div className="d-flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} style={{
                        flex: 1, height: '4px', borderRadius: '2px',
                        backgroundColor: i <= strength.score ? strength.color : '#e0e0e0',
                        transition: 'background-color 0.3s',
                      }} />
                    ))}
                  </div>
                  <small style={{ color: strength.color, fontWeight: 600 }}>
                    {strength.label}
                  </small>
                  <small className="text-muted ms-2">
                    Min 8 chars · A-Z · a-z · 0-9 · @#$%
                  </small>
                </div>
              )}
            </div>

            <div>
              <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>
                Confirm Password <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <i className={`bi ${
                    !formData.confirmPassword ? 'bi-lock text-muted' :
                    formData.password === formData.confirmPassword
                      ? 'bi-check-circle-fill text-success'
                      : 'bi-x-circle-fill text-danger'
                  }`} />
                </span>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  className="form-control" name="confirmPassword"
                  value={formData.confirmPassword} onChange={handleChange}
                  placeholder="Repeat your password"
                  style={{
                    borderRadius: '0', border: '1px solid #ddd',
                    borderLeft: 'none', borderRight: 'none',
                    borderColor: formData.confirmPassword
                      ? formData.password === formData.confirmPassword ? '#28a745' : '#dc3545'
                      : '#ddd'
                  }}
                />
                <button type="button" className="btn btn-outline-secondary"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{ borderRadius: '0 10px 10px 0' }}>
                  <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'}`} />
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <small className="text-danger mt-1 d-block">
                  <i className="bi bi-exclamation-circle me-1" />Passwords do not match
                </small>
              )}
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <small className="text-success mt-1 d-block">
                  <i className="bi bi-check-circle me-1" />Passwords match
                </small>
              )}
            </div>

          </div>
        )

      // ── Step 3: Review ───────────────────────────────────────────
      case 3:
        return (
          <div>
            <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
              Review your info before creating your account.
            </p>
            <div className="d-flex flex-column gap-2">
              {[
                { label: 'Full Name', value: `${formData.firstName} ${formData.lastName}`.trim() || '—', icon: 'bi-person' },
                { label: 'Email',     value: formData.email || '—',  icon: 'bi-envelope' },
                { label: 'Phone',     value: formData.phone || '—',  icon: 'bi-telephone' },
                { label: 'Password',  value: '••••••••',             icon: 'bi-lock' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="d-flex justify-content-between align-items-center py-2 px-3"
                  style={{ borderRadius: '10px', backgroundColor: '#f9f9f9', fontSize: '14px' }}>
                  <div className="d-flex align-items-center gap-2">
                    <i className={`bi ${icon} text-muted`} />
                    <span className="fw-semibold text-muted">{label}</span>
                  </div>
                  <span style={{ maxWidth: '60%', textAlign: 'right', wordBreak: 'break-all' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* ✅ Info box محدّث */}
            <div className="mt-4 p-3"
              style={{ backgroundColor: 'rgb(240,250,230)', borderRadius: '12px', border: '1px solid rgb(199,242,167)' }}>
              <p className="mb-0" style={{ fontSize: '13px', color: 'rgb(60,120,30)' }}>
                <i className="bi bi-envelope-check me-2" />
                After registering, check your email to verify your account before logging in.
              </p>
            </div>
          </div>
        )
    }
  }

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: '#f9fafb' }}>
      <div className="w-100" style={{ maxWidth: '520px', padding: '1rem' }}>

        {/* Card */}
        <div className="card shadow-sm" style={{ borderRadius: '20px', border: 'none' }}>
          <div className="card-body p-5">

            {/* Header */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <Avatar name={formData.firstName || '?'} />
              <div>
                <h4 className="mb-1 fw-bold">Create Account</h4>
                <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
                  Join PetsoCare to manage your pet's health
                </p>
              </div>
            </div>

            <StepIndicator current={step} total={TOTAL_STEPS} />

            {/* Error */}
            {errorMsg && (
              <div className="alert py-2 mb-3" style={{
                backgroundColor: '#fff0f0', border: '1px solid #ffcccc',
                borderRadius: '10px', color: '#cc0000', fontSize: '14px'
              }}>
                <i className="bi bi-exclamation-circle me-2" />{errorMsg}
              </div>
            )}

            {/* ✅ Success - محدّث */}
            {saveStatus === 'success' && (
              <div className="alert py-2 mb-3" style={{
                backgroundColor: 'rgb(240,250,230)', border: '1px solid rgb(199,242,167)',
                borderRadius: '10px', color: 'rgb(60,120,30)', fontSize: '14px'
              }}>
                <i className="bi bi-envelope-check me-2" />
                Account created! Please check your email to verify your account…
              </div>
            )}

            {/* Step Content */}
            <div style={{ minHeight: '220px' }}>
              {renderStep()}
            </div>

            {/* Navigation */}
            <div className="d-flex justify-content-between align-items-center mt-4 pt-3"
              style={{ borderTop: '1px solid #f0f0f0' }}>

              {step === 1 ? (
                <Link href="/login" className="btn btn-outline-secondary" style={{ borderRadius: '10px' }}>
                  Back to Login
                </Link>
              ) : (
                <button onClick={() => { setErrorMsg(''); setStep(s => s - 1) }}
                  className="btn btn-outline-secondary" style={{ borderRadius: '10px' }}>
                  <i className="bi bi-arrow-left me-1" />Back
                </button>
              )}

              {step < TOTAL_STEPS ? (
                <button onClick={handleNext} className="btn fw-semibold"
                  style={{ backgroundColor: 'rgb(199,242,167)', border: 'none', borderRadius: '10px', minWidth: '120px' }}>
                  Next <i className="bi bi-arrow-right ms-1" />
                </button>
              ) : (
                <button onClick={handleRegister} disabled={saveStatus === 'saving' || saveStatus === 'success'}
                  className="btn fw-semibold"
                  style={{ backgroundColor: 'rgb(199,242,167)', border: 'none', borderRadius: '10px', minWidth: '150px' }}>
                  {saveStatus === 'saving'
                    ? <><span className="spinner-border spinner-border-sm me-2" />Creating…</>
                    : <><i className="bi bi-person-check me-1" />Create Account</>}
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-muted mt-3" style={{ fontSize: '13px' }}>
          Already have an account?{' '}
          <Link href="/login" className="text-decoration-none fw-semibold" style={{ color: 'rgb(100,170,70)' }}>
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}