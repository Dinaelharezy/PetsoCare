// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import 'bootstrap/dist/css/bootstrap.min.css'

// export default function UserProfile() {
//   const [formData, setFormData] = useState({
//     firstName: 'Alice',
//     lastName: 'Smith',
//     email: 'alice.smith@example.com',
//     password: 'securepassword123',
//     phone: '555-123-4567',
//     hasPet: true,
//     dateOfBirth: '',
//     location: 'Cairo',
//     notifications: {
//       email: true,
//       push: true,
//       sms: false
//     },
//     socialLinks: {
//       facebook: 'https://facebook.com/alice',
//       twitter: 'https://twitter.com/alice',
//       linkedin: 'https://linkedin.com/in/alice',
//       github: 'https://github.com/alice'
//     }
//   })

//   const [showPassword, setShowPassword] = useState(false)

//   const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.')
//       setFormData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: type === 'checkbox' ? checked : value
//         }
//       }))
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }))
//     }
//   }

//   const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     console.log('Form submitted:', formData)
//     alert('Profile updated successfully!')
//   }

//   return (
//     <div className="container-fluid">
//       <div className="row">

//         {/* Main Content */}
//         <div className="col-md-10 p-4">
//           <div className="mx-auto" style={{maxWidth: '700px'}}>
//             {/* Header */}
//             <div className="d-flex align-items-center gap-3 mb-4">
//               <Image 
//                 src="/woman 2.png" 
//                 alt="User Avatar" 
//                 width={80} 
//                 height={80}
//                 className="rounded-circle"
//                 style={{objectFit: 'cover'}}
//               />
//               <div>
//                 <h4 className="mb-1">User Profile</h4>
//                 <p className="text-muted mb-1" style={{fontSize: '14px'}}>Manage your account settings.</p>
//                 <button className="btn btn-link p-0 text-decoration-none" style={{fontSize: '13px'}}>
//                   <i className="bi bi-upload me-1"></i>
//                   Upload Avatar
//                 </button>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit}>
//               {/* Name Fields */}
//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label className="form-label">First Name</label>
//                   <input 
//                     type="text" 
//                     className="form-control" 
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Last Name</label>
//                   <input 
//                     type="text" 
//                     className="form-control" 
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="mb-3">
//                 <label className="form-label">Email</label>
//                 <div className="input-group">
//                   <span className="input-group-text bg-white">
//                     <i className="bi bi-envelope"></i>
//                   </span>
//                   <input 
//                     type="email" 
//                     className="form-control" 
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                   <span className="input-group-text bg-white">
//                     <span className="badge bg-success">Verified</span>
//                   </span>
//                 </div>
//                 <small className="text-muted">Verification email sent.</small>
//               </div>

//               {/* Password */}
//               <div className="mb-3">
//                 <label className="form-label">Password</label>
//                 <div className="input-group">
//                   <input 
//                     type={showPassword ? "text" : "password"}
//                     className="form-control" 
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                   <button 
//                     className="btn btn-outline-secondary" 
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
//                   </button>
//                 </div>
//                 <small className="text-danger">Strength: Weak</small>
//                 <br />
//                 <small className="text-muted">Password must be at least 8 characters long.</small>
//               </div>

//               {/* Phone */}
//               <div className="mb-3">
//                 <label className="form-label">Phone (Optional)</label>
//                 <div className="input-group">
//                   <span className="input-group-text bg-white">
//                     <i className="bi bi-telephone"></i>
//                   </span>
//                   <input 
//                     type="tel" 
//                     className="form-control" 
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               {/* Do you own a pet */}
//               <div className="mb-3">
//                 <div className="form-check">
//                   <input 
//                     className="form-check-input" 
//                     type="checkbox" 
//                     name="hasPet"
//                     checked={formData.hasPet}
//                     onChange={handleChange}
//                     id="petCheck"
//                   />
//                   <label className="form-check-label" htmlFor="petCheck">
//                     <i className="bi bi-emoji-smile text-success me-1"></i>
//                     Do you own a pet?
//                   </label>
//                   <i className="bi bi-info-circle text-muted ms-2" title="Additional pet info"></i>
//                 </div>
//               </div>

//               {/* Date of Birth */}
//               <div className="mb-3">
//                 <label className="form-label">Date of Birth (Optional)</label>
//                 <div className="input-group">
//                   <span className="input-group-text bg-white">
//                     <i className="bi bi-calendar"></i>
//                   </span>
//                   <input 
//                     type="date" 
//                     className="form-control" 
//                     name="dateOfBirth"
//                     value={formData.dateOfBirth}
//                     onChange={handleChange}
//                     placeholder="Pick a date"
//                   />
//                 </div>
//               </div>

//               {/* Location */}
//               <div className="mb-4">
//                 <label className="form-label">Location (Optional)</label>
//                 <input 
//                   type="text" 
//                   className="form-control mb-2" 
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                 />
//                 <button type="button" className="btn btn-link p-0 text-decoration-none" style={{fontSize: '13px'}}>
//                   <i className="bi bi-geo-alt me-1"></i>
//                   Auto detect Location
//                 </button>
//               </div>

//               {/* Notification Preferences */}
//               <div className="mb-4">
//                 <h6 className="mb-3">Notification Preferences</h6>
                
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <div>
//                     <i className="bi bi-envelope me-2"></i>
//                     Email
//                   </div>
//                   <div className="form-check form-switch">
//                     <input 
//                       className="form-check-input" 
//                       type="checkbox" 
//                       name="notifications.email"
//                       checked={formData.notifications.email}
//                       onChange={handleChange}
//                       style={{width: '3em', height: '1.5em'}}
//                     />
//                   </div>
//                 </div>

//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <div>
//                     <i className="bi bi-bell me-2"></i>
//                     Push Notifications
//                   </div>
//                   <div className="form-check form-switch">
//                     <input 
//                       className="form-check-input" 
//                       type="checkbox" 
//                       name="notifications.push"
//                       checked={formData.notifications.push}
//                       onChange={handleChange}
//                       style={{width: '3em', height: '1.5em'}}
//                     />
//                   </div>
//                 </div>

//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <div>
//                     <i className="bi bi-chat-dots me-2"></i>
//                     SMS
//                   </div>
//                   <div className="form-check form-switch">
//                     <input 
//                       className="form-check-input" 
//                       type="checkbox" 
//                       name="notifications.sms"
//                       checked={formData.notifications.sms}
//                       onChange={handleChange}
//                       style={{width: '3em', height: '1.5em'}}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Linked Social Accounts */}
//               <div className="mb-4">
//                 <h6 className="mb-3">Linked Social Accounts</h6>
                
//                 <div className="input-group mb-2">
//                   <span className="input-group-text bg-white">
//                     <i className="bi bi-facebook"></i>
//                   </span>
//                   <input 
//                     type="url" 
//                     className="form-control" 
//                     name="socialLinks.facebook"
//                     value={formData.socialLinks.facebook}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="input-group mb-2">
//                   <span className="input-group-text bg-white">
//                     <i className="bi bi-twitter"></i>
//                   </span>
//                   <input 
//                     type="url" 
//                     className="form-control" 
//                     name="socialLinks.twitter"
//                     value={formData.socialLinks.twitter}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="input-group mb-2">
//                   <span className="input-group-text bg-white">
//                     <i className="bi bi-linkedin"></i>
//                   </span>
//                   <input 
//                     type="url" 
//                     className="form-control" 
//                     name="socialLinks.linkedin"
//                     value={formData.socialLinks.linkedin}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="input-group mb-2">
//                   <span className="input-group-text bg-white">
//                     <i className="bi bi-github"></i>
//                   </span>
//                   <input 
//                     type="url" 
//                     className="form-control" 
//                     name="socialLinks.github"
//                     value={formData.socialLinks.github}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="d-flex justify-content-end gap-2 mb-4">
//                 <button type="button" className="btn btn-outline-secondary">Cancel</button>
//                 <button type="submit" className="btn text-dark fw-semibold" style={{backgroundColor: 'rgb(199, 242, 167)'}}>
//                   Save/Update Profile
//                 </button>
//               </div>

//               {/* Footer */}
//               <div className="d-flex justify-content-between text-muted" style={{fontSize: '12px'}}>
//                 <span>Created At: 1/1/2023, 10:00:00 AM</span>
//                 <span>Last Login At: 3/20/2024, 2:30:00 PM</span>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ProfileForm } from '../../types/ProfileForm'

type SaveStatus = 'idle' | 'saving' | 'success' | 'error'

// ── Confirm Modal ──────────────────────────────────────────────────
function ConfirmModal({
  show, title, message, confirmLabel = 'Confirm', danger = false, onConfirm, onCancel,
}: {
  show: boolean; title: string; message: string
  confirmLabel?: string; danger?: boolean
  onConfirm: () => void; onCancel: () => void
}) {
  if (!show) return null
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 9999 }}
    >
      <div className="card shadow-lg" style={{ maxWidth: '400px', width: '90%', borderRadius: '16px', border: 'none' }}>
        <div className="card-body p-4">
          <h5 className="fw-bold mb-2">{title}</h5>
          <p className="text-muted mb-4" style={{ fontSize: '14px' }}>{message}</p>
          <div className="d-flex gap-2 justify-content-end">
            <button onClick={onCancel} className="btn btn-outline-secondary px-4" style={{ borderRadius: '10px' }}>
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="btn px-4 fw-semibold"
              style={{
                borderRadius: '10px',
                backgroundColor: danger ? '#ff4444' : 'rgb(199, 242, 167)',
                border: 'none',
                color: danger ? 'white' : '#333',
              }}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Step Indicator ─────────────────────────────────────────────────
function StepIndicator({ current, total }: { current: number; total: number }) {
  const labels = ['Personal Info', 'Review & Save']
  return (
    <div className="mb-4">
      <div className="d-flex align-items-center gap-2 mb-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              height: '6px', flex: 1, borderRadius: '3px',
              backgroundColor: i < current ? 'rgb(100, 170, 70)' : '#e0e0e0',
              transition: 'background-color 0.3s',
            }}
          />
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

// ── Main Component ─────────────────────────────────────────────────
export default function SignUpCompletion() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const TOTAL_STEPS = 2
  const [step, setStep]                 = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [saveStatus, setSaveStatus]     = useState<SaveStatus>('idle')

  const [showSaveModal,    setShowSaveModal]    = useState(false)
  const [showCancelModal,  setShowCancelModal]  = useState(false)
  const [showSignOutModal, setShowSignOutModal] = useState(false)

  const [formData, setFormData] = useState<ProfileForm>({
    firstName:   '',
    lastName:    '',
    email:       '',
    phone:       '',
    imageUrl:    '',
    newPassword: '',
  })

  // Pre-fill from session
  useEffect(() => {
    if (session?.user) {
      const parts = (session.user.name ?? '').split(' ')
      setFormData(prev => ({
        ...prev,
        firstName: parts[0] ?? '',
        lastName:  parts.slice(1).join(' ') ?? '',
        email:     session.user.email ?? '',
        imageUrl:  session.user.image ?? '',
      }))
    }
  }, [session])

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border" style={{ color: 'rgb(100,170,70)' }} />
      </div>
    )
  }

  // ── Handlers ─────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveConfirm = async () => {
    setShowSaveModal(false)
    setSaveStatus('saving')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        body: JSON.stringify({
          name:     `${formData.firstName} ${formData.lastName}`.trim(),
          email:    formData.email,
          phone:    formData.phone,
          imageUrl: formData.imageUrl,
          // only send password if user typed a new one
          ...(formData.newPassword ? { password: formData.newPassword } : {}),
        }),
      })
      setSaveStatus(res.ok ? 'success' : 'error')
    } catch {
      setSaveStatus('error')
    }
    setTimeout(() => setSaveStatus('idle'), 3000)
  }

  // ── Step Content ─────────────────────────────────────────────────
  const renderStep = () => {
    switch (step) {

      // ── Step 1: Personal Info — mirrors .NET User entity ──────
      case 1:
        return (
          <div className="d-flex flex-column gap-3">

            {/* Name → maps to User.Name */}
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>First Name</label>
                <input
                  type="text" className="form-control" name="firstName"
                  value={formData.firstName} onChange={handleChange}
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>Last Name</label>
                <input
                  type="text" className="form-control" name="lastName"
                  value={formData.lastName} onChange={handleChange}
                  style={{ borderRadius: '10px' }}
                />
              </div>
            </div>

            {/* Email → maps to User.Email */}
            <div>
              <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>Email</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><i className="bi bi-envelope" /></span>
                <input
                  type="email" className="form-control" name="email"
                  value={formData.email} onChange={handleChange}
                  style={{ borderRadius: '0 10px 10px 0' }}
                />
                <span className="input-group-text bg-white">
                  <span className="badge bg-success" style={{ fontSize: '11px' }}>Verified</span>
                </span>
              </div>
            </div>

            {/* Phone → maps to User.Phone */}
            <div>
              <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>Phone</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><i className="bi bi-telephone" /></span>
                <input
                  type="tel" className="form-control" name="phone"
                  value={formData.phone} onChange={handleChange}
                  placeholder="+20xxxxxxxxxx"
                  style={{ borderRadius: '0 10px 10px 0' }}
                />
              </div>
            </div>

            {/* New Password → maps to User.PasswordHash (hashed in backend) */}
            <div>
              <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>New Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control" name="newPassword"
                  value={formData.newPassword} onChange={handleChange}
                  placeholder="Leave blank to keep current"
                  style={{ borderRadius: '10px 0 0 10px' }}
                />
                <button
                  type="button" className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ borderRadius: '0 10px 10px 0' }}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
                </button>
              </div>
              <small className="text-muted">Min 8 chars, uppercase, lowercase, number & special character.</small>
            </div>

            {/* ImageUrl → maps to User.ImageUrl */}
            <div>
              <label className="form-label fw-semibold" style={{ fontSize: '14px' }}>Profile Image URL</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><i className="bi bi-image" /></span>
                <input
                  type="url" className="form-control" name="imageUrl"
                  value={formData.imageUrl} onChange={handleChange}
                  placeholder="https://..."
                  style={{ borderRadius: '0 10px 10px 0' }}
                />
              </div>
            </div>

          </div>
        )

      // ── Step 2: Review — shows exactly what gets sent ─────────
      case 2:
        return (
          <div>
            <p className="text-muted mb-4" style={{ fontSize: '14px' }}>
              Review your info before saving. This is exactly what will be sent to the server.
            </p>

            <div className="d-flex flex-column gap-2">
              {[
                { label: 'Full Name',  value: `${formData.firstName} ${formData.lastName}`.trim() || '—', field: 'User.Name' },
                { label: 'Email',      value: formData.email    || '—', field: 'User.Email' },
                { label: 'Phone',      value: formData.phone    || '—', field: 'User.Phone' },
                { label: 'Password',   value: formData.newPassword ? '••••••••  (will be updated)' : 'Unchanged', field: 'User.PasswordHash' },
                { label: 'Image URL',  value: formData.imageUrl || '—', field: 'User.ImageUrl' },
                { label: 'Role',       value: session?.user?.roles?.[0] ?? 'User', field: 'User.Role (read-only)' },
              ].map(({ label, value, field }) => (
                <div
                  key={label}
                  className="d-flex justify-content-between align-items-center py-2 px-3"
                  style={{ borderRadius: '10px', backgroundColor: '#f9f9f9', fontSize: '14px' }}
                >
                  <div>
                    <p className="mb-0 fw-semibold">{label}</p>
                    <p className="mb-0 text-muted" style={{ fontSize: '11px' }}>{field}</p>
                  </div>
                  <span style={{ maxWidth: '55%', textAlign: 'right', wordBreak: 'break-all', color: '#333' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="mt-4 p-3"
              style={{ backgroundColor: 'rgb(240,250,230)', borderRadius: '12px', border: '1px solid rgb(199,242,167)' }}
            >
              <p className="mb-0" style={{ fontSize: '13px', color: 'rgb(60,120,30)' }}>
                <i className="bi bi-info-circle me-2" />
                Only the fields above are sent — matching your .NET <strong>User</strong> entity exactly.
              </p>
            </div>
          </div>
        )
    }
  }

  // ── Render ────────────────────────────────────────────────────────
  return (
    <>
      <ConfirmModal
        show={showSaveModal}
        title="Save changes?"
        message="Are you sure you want to update your profile?"
        confirmLabel="Yes, Save"
        onConfirm={handleSaveConfirm}
        onCancel={() => setShowSaveModal(false)}
      />
      <ConfirmModal
        show={showCancelModal}
        title="Discard changes?"
        message="Any unsaved changes will be lost."
        confirmLabel="Discard"
        danger
        onConfirm={() => { setShowCancelModal(false); router.back() }}
        onCancel={() => setShowCancelModal(false)}
      />
      <ConfirmModal
        show={showSignOutModal}
        title="Sign out?"
        message="You will be redirected to the login page."
        confirmLabel="Sign Out"
        danger
        onConfirm={async () => { setShowSignOutModal(false); await signOut({ callbackUrl: '/login' }) }}
        onCancel={() => setShowSignOutModal(false)}
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 p-4">
            <div className="mx-auto" style={{ maxWidth: '700px' }}>

              {/* Header */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-3">
                  <Image
                    src={formData.imageUrl || session?.user?.image || '/woman 2.png'}
                    alt="Avatar"
                    width={80} height={80}
                    className="rounded-circle"
                    style={{ objectFit: 'cover' }}
                  />
                  <div>
                    <h4 className="mb-1">
                      {formData.firstName || session?.user?.name || 'User'} Profile
                    </h4>
                    <span
                      className="badge"
                      style={{ backgroundColor: 'rgb(199,242,167)', color: '#333', fontSize: '12px' }}
                    >
                      {session?.user?.roles?.[0] ?? 'User'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowSignOutModal(true)}
                  className="btn btn-outline-danger btn-sm"
                  style={{ borderRadius: '8px', fontSize: '13px' }}
                >
                  <i className="bi bi-box-arrow-right me-1" />Sign Out
                </button>
              </div>

              {/* Step Indicator */}
              <StepIndicator current={step} total={TOTAL_STEPS} />

              {/* Status Banner */}
              {saveStatus === 'success' && (
                <div className="alert alert-success py-2 mb-3" style={{ borderRadius: '10px', fontSize: '14px' }}>
                  <i className="bi bi-check-circle me-2" />Profile updated successfully!
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="alert alert-danger py-2 mb-3" style={{ borderRadius: '10px', fontSize: '14px' }}>
                  <i className="bi bi-x-circle me-2" />Something went wrong. Please try again.
                </div>
              )}

              {/* Step Content */}
              <div style={{ minHeight: '280px' }}>
                {renderStep()}
              </div>

              {/* Navigation */}
              <div
                className="d-flex justify-content-between align-items-center mt-4 pt-3"
                style={{ borderTop: '1px solid #f0f0f0' }}
              >
                {step === 1 ? (
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="btn btn-outline-secondary"
                    style={{ borderRadius: '10px' }}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => setStep(s => s - 1)}
                    className="btn btn-outline-secondary"
                    style={{ borderRadius: '10px' }}
                  >
                    <i className="bi bi-arrow-left me-1" />Back
                  </button>
                )}

                {step < TOTAL_STEPS ? (
                  <button
                    onClick={() => setStep(s => s + 1)}
                    className="btn fw-semibold"
                    style={{ backgroundColor: 'rgb(199,242,167)', border: 'none', borderRadius: '10px', minWidth: '120px' }}
                  >
                    Review <i className="bi bi-arrow-right ms-1" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSaveModal(true)}
                    disabled={saveStatus === 'saving'}
                    className="btn fw-semibold"
                    style={{ backgroundColor: 'rgb(199,242,167)', border: 'none', borderRadius: '10px', minWidth: '150px' }}
                  >
                    {saveStatus === 'saving' ? (
                      <><span className="spinner-border spinner-border-sm me-2" />Saving…</>
                    ) : (
                      <><i className="bi bi-check2 me-1" />Save Profile</>
                    )}
                  </button>
                )}
              </div>

              {/* Footer */}
              <div className="d-flex justify-content-between text-muted mt-4" style={{ fontSize: '12px' }}>
                <span>Email confirmed: {session?.user ? 'Yes' : 'No'}</span>
                <span>Role: {session?.user?.roles?.[0] ?? 'User'}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}