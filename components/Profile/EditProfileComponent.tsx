

// 'use client'

// import { ChangeEvent } from 'react'
// import { useEdit } from './hooks/useEdit'

// export default function EditProfileClient() {
//   const {
//     firstName, setFirstName,
//     lastName,  setLastName,
//     email,     setEmail,
//     phone,     setPhone,
//     imagePreviewUrl,
//     emailNotifications,
//     saving,
//     errorMsg,
//     successMsg,
//     handleImageChange,
//     handleToggleNotifications,
//     handleCancel,
//     handleSave,
//     handleUploadImage,
//   } = useEdit()

//   return (
//     <div className="min-vh-100 py-5" style={{ backgroundColor: '#f0f4f0' }}>
//       <div className="container" style={{ maxWidth: 720 }}>

//         {/* ── Header ── */}
//         <div className="mb-4">
//           <h1 className="fw-bold text-dark">Account Settings</h1>
//           <p className="text-muted small">Manage your profile and preferences</p>
//         </div>

//         {/* ── Personal Information ── */}
//         <div className="card border-0 shadow-sm rounded-4 mb-4 py-2 px-2">
//           <div className="card-body p-4">
//             <SectionTitle>Personal Information</SectionTitle>

//             <div className="row g-3 mb-3">
//               <div className="col-sm-6">
//                 <FieldLabel>First Name</FieldLabel>
//                 <IconInput icon={<UserIcon />}>
//                   <input
//                     type="text"
//                     className="form-control bg-light border-start-0 ps-0"
//                     value={firstName}
//                     onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
//                     placeholder="First name"
//                   />
//                 </IconInput>
//               </div>

//               <div className="col-sm-6">
//                 <FieldLabel>Last Name</FieldLabel>
//                 <IconInput icon={<UserIcon />}>
//                   <input
//                     type="text"
//                     className="form-control bg-light border-start-0 ps-0"
//                     value={lastName}
//                     onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
//                     placeholder="Last name"
//                   />
//                 </IconInput>
//               </div>
//             </div>

//             <div className="mb-3">
//               <FieldLabel>Email Address</FieldLabel>
//               <IconInput icon={<EmailIcon />}>
//                 <input
//                   type="email"
//                   className="form-control bg-light border-start-0 ps-0"
//                   value={email}
//                   onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
//                   placeholder="your@email.com"
//                 />
//               </IconInput>
//             </div>

//             <div>
//               <FieldLabel>Phone Number</FieldLabel>
//               <IconInput icon={<PhoneIcon />}>
//                 <input
//                   type="tel"
//                   className="form-control bg-light border-start-0 ps-0"
//                   value={phone}
//                   onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
//                   placeholder="Enter your phone number"
//                 />
//               </IconInput>
//             </div>
//           </div>
//         </div>

//         {/* ── Profile Settings ── */}
//         <div className="card border-0 shadow-sm rounded-4 mb-4">
//           <div className="card-body p-4">
//             <SectionTitle>Profile Settings</SectionTitle>

//             <div className="mb-4">
//               <FieldLabel>Profile Photo</FieldLabel>
//               <div className="d-flex align-items-center gap-3">
//                 <img
//                   src={imagePreviewUrl}
//                   alt="Profile"
//                   className="rounded-circle"
//                   style={{ width: 64, height: 64, objectFit: 'cover', border: '2px solid #b2dfb2' }}
//                 />
//               </div>
//             </div>

//             <div>
//               <FieldLabel>Upload New Photo</FieldLabel>
//               <IconInput icon={<ImageIcon />}>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="form-control bg-light border-start-0 ps-0"
//                   onChange={handleImageChange}
//                 />
//               </IconInput>
//             </div>
//           </div>
//         </div>

//         {/* ── Preferences ── */}
//         <div className="card border-0 shadow-sm rounded-4 mb-4">
//           <div className="card-body p-4">
//             <SectionTitle>Preferences</SectionTitle>
//             <ToggleRow
//               title="Email Notifications"
//               description="Receive email updates about your account activity"
//               enabled={emailNotifications}
//               onToggle={handleToggleNotifications}
//             />
//           </div>
//         </div>

//         {/* ── Messages ── */}
//         {errorMsg   && <div className="alert alert-danger  py-2">{errorMsg}</div>}
//         {successMsg && <div className="alert alert-success py-2">{successMsg}</div>}

//         {/* ── Footer Actions ── */}
//         <div className="d-flex justify-content-end gap-2">
//           <button
//             className="btn btn-light border px-4"
//             onClick={handleCancel}
//             disabled={saving}
//           >
//             Cancel
//           </button>
//           <button
//             style={{ backgroundColor: '#8ae68d' }}
//             className="btn px-4 fw-semibold"
//             disabled={saving}
//             onClick={async () => {
//               await handleSave()
//               await handleUploadImage()
//             }}
//           >
//             {saving ? 'Saving...' : 'Save Changes'}
//           </button>
//         </div>

//       </div>
//     </div>
//   )
// }

// /* ─────────────────────────────────────────────
//    Shared UI primitives
// ───────────────────────────────────────────── */

// function SectionTitle({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="d-flex align-items-center gap-2 mb-4">
//       <span
//         className="rounded-circle bg-success"
//         style={{ width: 10, height: 10, display: 'inline-block', flexShrink: 0 }}
//       />
//       <h5 className="fw-bold mb-0">{children}</h5>
//     </div>
//   )
// }

// function FieldLabel({ children }: { children: React.ReactNode }) {
//   return (
//     <label className="form-label text-muted small fw-semibold text-uppercase">{children}</label>
//   )
// }

// function IconInput({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
//   return (
//     <div className="input-group">
//       <span className="input-group-text bg-light border-end-0">{icon}</span>
//       {children}
//     </div>
//   )
// }

// interface ToggleRowProps {
//   title: string
//   description: string
//   enabled: boolean
//   onToggle: () => void
// }

// function ToggleRow({ title, description, enabled, onToggle }: ToggleRowProps) {
//   return (
//     <div className="d-flex justify-content-between align-items-center py-3">
//       <div>
//         <p className="fw-semibold mb-0 small">{title}</p>
//         <p className="text-muted mb-0" style={{ fontSize: '0.78rem' }}>
//           {description}
//         </p>
//       </div>
//       <div className="form-check form-switch mb-0 ms-3">
//         <input
//           className="form-check-input"
//           type="checkbox"
//           role="switch"
//           checked={enabled}
//           onChange={onToggle}
//           style={{
//             width: '2.5rem',
//             height: '1.3rem',
//             cursor: 'pointer',
//             backgroundColor: enabled ? '#87f18a' : '',
//             borderColor:     enabled ? '#87f18a' : '',
//           }}
//         />
//       </div>
//     </div>
//   )
// }

// /* ─────────────────────────────────────────────
//    Icons
// ───────────────────────────────────────────── */

// function UserIcon() {
//   return (
//     <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//     </svg>
//   )
// }

// function EmailIcon() {
//   return (
//     <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//     </svg>
//   )
// }

// function PhoneIcon() {
//   return (
//     <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//     </svg>
//   )
// }

// function ImageIcon() {
//   return (
//     <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//     </svg>
//   )
// }

'use client'

import { ChangeEvent, useState } from 'react'
import { useEdit } from './hooks/useEdit'

export default function EditProfileClient() {
  const {
    firstName,    setFirstName,
    lastName,     setLastName,
    email,
    phone,        setPhone,
    address,      setAddress,
    dateOfBirth,  setDateOfBirth,
    imagePreviewUrl,
    emailNotifications,
    saving,
    errorMsg,
    successMsg,
    handleImageChange,
    handleToggleNotifications,
    handleCancel,
    handleSaveAll,
    currentPassword, setCurrentPassword,
    newPassword,     setNewPassword,
    confirmPassword, setConfirmPassword,
    handleChangePassword,
  } = useEdit()

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew,     setShowNew]     = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const passwordStrength = (pwd: string) => {
    if (!pwd) return { label: '', color: '#e9ecef', width: '0%' }
    const score =
      (pwd.length >= 8 ? 1 : 0) +
      (/[A-Z]/.test(pwd) ? 1 : 0) +
      (/[0-9]/.test(pwd) ? 1 : 0) +
      (/[^A-Za-z0-9]/.test(pwd) ? 1 : 0)
    if (score <= 1) return { label: 'Weak',   color: '#dc3545', width: '25%'  }
    if (score === 2) return { label: 'Fair',   color: '#fd7e14', width: '50%'  }
    if (score === 3) return { label: 'Good',   color: '#ffc107', width: '75%'  }
    return              { label: 'Strong', color: '#87f18a', width: '100%' }
  }

  const strength = passwordStrength(newPassword)

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: '#f0f4f0' }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="mb-4">
          <h1 className="fw-bold text-dark">Account Settings</h1>
          <p className="text-muted small">Manage your profile and preferences</p>
        </div>

        {/* Personal Information */}
        <div className="card border-0 shadow-sm rounded-4 mb-4 py-2 px-2">
          <div className="card-body p-4">
            <SectionTitle>Personal Information</SectionTitle>

            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <FieldLabel>First Name</FieldLabel>
                <IconInput icon={<UserIcon />}>
                  <input type="text" className="form-control bg-light border-start-0 ps-0"
                    value={firstName} placeholder="First name"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} />
                </IconInput>
              </div>
              <div className="col-sm-6">
                <FieldLabel>Last Name</FieldLabel>
                <IconInput icon={<UserIcon />}>
                  <input type="text" className="form-control bg-light border-start-0 ps-0"
                    value={lastName} placeholder="Last name"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} />
                </IconInput>
              </div>
            </div>

            <div className="mb-3">
              <FieldLabel>Email Address</FieldLabel>
              <IconInput icon={<EmailIcon />}>
                <input type="email" className="form-control bg-light border-start-0 ps-0"
                  value={email} placeholder="your@email.com" readOnly
                  style={{ cursor: 'not-allowed', opacity: 0.7 }} />
              </IconInput>
              <small className="text-muted">To change email, use the Change Email section below.</small>
            </div>

            <div className="mb-3">
              <FieldLabel>Phone Number</FieldLabel>
              <IconInput icon={<PhoneIcon />}>
                <input type="tel" className="form-control bg-light border-start-0 ps-0"
                  value={phone} placeholder="Enter your phone number"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)} />
              </IconInput>
            </div>

            <div className="mb-3">
              <FieldLabel>Address</FieldLabel>
              <IconInput icon={<LocationIcon />}>
                <input type="text" className="form-control bg-light border-start-0 ps-0"
                  value={address} placeholder="Enter your address"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} />
              </IconInput>
            </div>

            <div>
              <FieldLabel>Date of Birth</FieldLabel>
              <IconInput icon={<CalendarIcon />}>
                <input type="date" className="form-control bg-light border-start-0 ps-0"
                  value={dateOfBirth}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setDateOfBirth(e.target.value)} />
              </IconInput>
            </div>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">
            <SectionTitle>Profile Photo</SectionTitle>
            <div className="d-flex align-items-center gap-3 mb-3">
              <img src={imagePreviewUrl} alt="Profile"
                className="rounded-circle"
                style={{ width: 80, height: 80, objectFit: 'cover', border: '3px solid #b2dfb2' }} />
              <div>
                <p className="mb-0 fw-semibold small">Current Photo</p>
                <p className="text-muted mb-0" style={{ fontSize: 12 }}>
                  JPG, PNG or GIF — max 10MB
                </p>
              </div>
            </div>
            <div>
              <FieldLabel>Upload New Photo</FieldLabel>
              <IconInput icon={<ImageIcon />}>
                <input type="file" accept="image/*"
                  className="form-control bg-light border-start-0 ps-0"
                  onChange={handleImageChange} />
              </IconInput>
            </div>
          </div>
        </div>

        {/* Reset Password */}
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">
            <SectionTitle>Reset Password</SectionTitle>

            <div className="mb-3">
              <FieldLabel>Current Password</FieldLabel>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0"><LockIcon /></span>
                <input type={showCurrent ? 'text' : 'password'}
                  className="form-control bg-light border-start-0 border-end-0 ps-0"
                  value={currentPassword} placeholder="Enter current password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)} />
                <button type="button" className="input-group-text bg-light border-start-0"
                  style={{ cursor: 'pointer' }} onClick={() => setShowCurrent(p => !p)}>
                  {showCurrent ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="mb-1">
              <FieldLabel>New Password</FieldLabel>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0"><LockIcon /></span>
                <input type={showNew ? 'text' : 'password'}
                  className="form-control bg-light border-start-0 border-end-0 ps-0"
                  value={newPassword} placeholder="Enter new password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)} />
                <button type="button" className="input-group-text bg-light border-start-0"
                  style={{ cursor: 'pointer' }} onClick={() => setShowNew(p => !p)}>
                  {showNew ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {newPassword && (
              <div className="mb-3 mt-2">
                <div className="rounded-pill overflow-hidden" style={{ height: 5, backgroundColor: '#e9ecef' }}>
                  <div style={{ width: strength.width, height: '100%', backgroundColor: strength.color, transition: 'width 0.4s ease' }} />
                </div>
                <p className="mb-0 mt-1" style={{ fontSize: '0.72rem', color: strength.color, fontWeight: 600 }}>
                  {strength.label}
                  <span className="text-muted fw-normal ms-2" style={{ fontSize: '0.70rem' }}>
                    Use 8+ chars, uppercase, number &amp; symbol.
                  </span>
                </p>
              </div>
            )}

            <div className="mb-4">
              <FieldLabel>Confirm New Password</FieldLabel>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0"><LockIcon /></span>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  className={`form-control bg-light border-start-0 border-end-0 ps-0
                    ${confirmPassword && confirmPassword !== newPassword ? 'is-invalid' : ''}
                    ${confirmPassword && confirmPassword === newPassword ? 'is-valid' : ''}`}
                  value={confirmPassword} placeholder="Re-enter new password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} />
                <button type="button"
                  className={`input-group-text bg-light border-start-0
                    ${confirmPassword && confirmPassword !== newPassword ? 'border-danger' : ''}
                    ${confirmPassword && confirmPassword === newPassword ? 'border-success' : ''}`}
                  style={{ cursor: 'pointer' }} onClick={() => setShowConfirm(p => !p)}>
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {confirmPassword && confirmPassword !== newPassword && (
                <p className="text-danger mb-0 mt-1" style={{ fontSize: '0.75rem' }}>Passwords do not match.</p>
              )}
            </div>

            <div className="d-flex justify-content-end">
              <button style={{ backgroundColor: '#8ae68d' }} className="btn px-4 fw-semibold"
                disabled={saving || !currentPassword || !newPassword || newPassword !== confirmPassword}
                onClick={handleChangePassword}>
                {saving ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">
            <SectionTitle>Preferences</SectionTitle>
            <ToggleRow
              title="Email Notifications"
              description="Receive email updates about your account activity"
              enabled={emailNotifications}
              onToggle={handleToggleNotifications}
            />
          </div>
        </div>

        {errorMsg   && <div className="alert alert-danger  py-2">{errorMsg}</div>}
        {successMsg && <div className="alert alert-success py-2">{successMsg}</div>}

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-light border px-4" onClick={handleCancel} disabled={saving}>
            Cancel
          </button>
          <button style={{ backgroundColor: '#8ae68d' }} className="btn px-4 fw-semibold"
            disabled={saving} onClick={handleSaveAll}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* UI Primitives */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex align-items-center gap-2 mb-4">
      <span className="rounded-circle bg-success" style={{ width: 10, height: 10, display: 'inline-block', flexShrink: 0 }} />
      <h5 className="fw-bold mb-0">{children}</h5>
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="form-label text-muted small fw-semibold text-uppercase">{children}</label>
}

function IconInput({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="input-group">
      <span className="input-group-text bg-light border-end-0">{icon}</span>
      {children}
    </div>
  )
}

function ToggleRow({ title, description, enabled, onToggle }: { title: string; description: string; enabled: boolean; onToggle: () => void }) {
  return (
    <div className="d-flex justify-content-between align-items-center py-3">
      <div>
        <p className="fw-semibold mb-0 small">{title}</p>
        <p className="text-muted mb-0" style={{ fontSize: '0.78rem' }}>{description}</p>
      </div>
      <div className="form-check form-switch mb-0 ms-3">
        <input className="form-check-input" type="checkbox" role="switch"
          checked={enabled} onChange={onToggle}
          style={{ width: '2.5rem', height: '1.3rem', cursor: 'pointer',
            backgroundColor: enabled ? '#87f18a' : '', borderColor: enabled ? '#87f18a' : '' }} />
      </div>
    </div>
  )
}

/* Icons */
function UserIcon() {
  return <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
}
function EmailIcon() {
  return <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
}
function PhoneIcon() {
  return <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
}
function LocationIcon() {
  return <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
}
function CalendarIcon() {
  return <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
}
function ImageIcon() {
  return <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
}
function LockIcon() {
  return <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
}
function EyeIcon() {
  return <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
}
function EyeOffIcon() {
  return <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
}