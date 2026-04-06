// "use client";

// import { useState, ChangeEvent } from "react";
// // import "bootstrap/dist/css/bootstrap.min.css";

// export default function EditProfileComponent() {
//   const [firstName, setFirstName] = useState<string>("Sarah");
//   const [lastName, setLastName] = useState<string>("Johnson");
//   const [email, setEmail] = useState<string>("sarah@email.com");
//   const [phone, setPhone] = useState<string>("");
//   const [imageUrl, setImageUrl] = useState<string>("");
//   const [emailNotifications, setEmailNotifications] = useState<boolean>(true);

//   return (
//     <div className="min-vh-100 py-5" style={{ backgroundColor: "#f0f4f0" }}>
//       <div className="container" style={{ maxWidth: 720 }}>
        
//         {/* Header */}
//         <div className="mb-4">
//           <h1 className="fw-bold text-dark">Account Settings</h1>
//           <p className="text-muted small">Manage your profile and preferences</p>
//         </div>

//         {/* Personal Information */}
//         <div className="card border-0 shadow-sm rounded-4 mb-4 py-2 px-2">
//           <div className="card-body p-4">
//             <SectionTitle>Personal Information</SectionTitle>

//             <div className="row g-3 mb-3">
//               <div className="col-sm-6">
//                 <label className="form-label text-muted small fw-semibold text-uppercase">First Name</label>
//                 <div className="input-group">
//                   <span className="input-group-text bg-light border-end-0">
//                     <UserIcon />
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control bg-light border-start-0 ps-0"
//                     value={firstName}
//                     onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
//                     placeholder="First name"
//                   />
//                 </div>
//               </div>

//               <div className="col-sm-6">
//                 <label className="form-label text-muted small fw-semibold text-uppercase">Last Name</label>
//                 <div className="input-group">
//                   <span className="input-group-text bg-light border-end-0">
//                     <UserIcon />
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control bg-light border-start-0 ps-0"
//                     value={lastName}
//                     onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
//                     placeholder="Last name"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="mb-3">
//               <label className="form-label text-muted small fw-semibold text-uppercase">Email Address</label>
//               <div className="input-group">
//                 <span className="input-group-text bg-light border-end-0">
//                   <EmailIcon />
//                 </span>
//                 <input
//                   type="email"
//                   className="form-control bg-light border-start-0 ps-0"
//                   value={email}
//                   onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
//                   placeholder="your@email.com"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="form-label text-muted small fw-semibold text-uppercase">Phone Number</label>
//               <div className="input-group">
//                 <span className="input-group-text bg-light border-end-0">
//                   <PhoneIcon />
//                 </span>
//                 <input
//                   type="tel"
//                   className="form-control bg-light border-start-0 ps-0"
//                   value={phone}
//                   onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
//                   placeholder="Enter your phone number"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Profile Settings */}
//         <div className="card border-0 shadow-sm rounded-4 mb-4">
//           <div className="card-body p-4">
//             <SectionTitle>Profile Settings</SectionTitle>

//             <div className="mb-4">
//               <label className="form-label text-muted small fw-semibold text-uppercase">Profile Photo</label>
//               <div className="d-flex align-items-center gap-3">
//                 <img
//                   src="https://i.pravatar.cc/150?img=47"
//                   alt="Profile"
//                   className="rounded-circle"
//                   style={{ width: 64, height: 64, objectFit: "cover", border: "2px solid #b2dfb2" }}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="form-label text-muted small fw-semibold text-uppercase">Profile Image</label>
//               <div className="input-group">
//                 <span className="input-group-text bg-light border-end-0">
//                   <ImageIcon />
//                 </span>
//                 <input
//                   type="file"
//                   className="form-control bg-light border-start-0 ps-0"
//                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                     if (e.target.files && e.target.files[0]) {
//                       setImageUrl(e.target.files[0].name);
//                     }
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Preferences */}
//         <div className="card border-0 shadow-sm rounded-4 mb-4">
//           <div className="card-body p-4">
//             <SectionTitle>Preferences</SectionTitle>

//             <ToggleRow
//               title="Email Notifications"
//               description="Receive email updates about your account activity"
//               enabled={emailNotifications}
//               onToggle={() => setEmailNotifications((v) => !v)}
//             />
//           </div>
//         </div>

//         {/* Footer Actions */}
//         <div className="d-flex justify-content-end gap-2">
//           <button className="btn btn-light border px-4">Cancel</button>
//           <button style={{ backgroundColor: "#8ae68d" }} className="btn px-4 fw-semibold">
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ── Sub-components ── */

// function SectionTitle({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="d-flex align-items-center gap-2 mb-4">
//       <span
//         className="rounded-circle bg-success"
//         style={{ width: 10, height: 10, display: "inline-block", flexShrink: 0 }}
//       />
//       <h5 className="fw-bold mb-0">{children}</h5>
//     </div>
//   );
// }

// interface ToggleRowProps {
//   title: string;
//   description: string;
//   enabled: boolean;
//   onToggle: () => void;
// }

// function ToggleRow({ title, description, enabled, onToggle }: ToggleRowProps) {
//   return (
//     <div className="d-flex justify-content-between align-items-center py-3">
//       <div>
//         <p className="fw-semibold mb-0 small">{title}</p>
//         <p className="text-muted mb-0" style={{ fontSize: "0.78rem" }}>
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
//             width: "2.5rem",
//             height: "1.3rem",
//             cursor: "pointer",
//             backgroundColor: enabled ? "#87f18a" : "",
//             borderColor: enabled ? "#87f18a" : "",
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// /* ── Icons ── */

// function UserIcon() {
//   return (
//     <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//     </svg>
//   );
// }

// function EmailIcon() {
//   return (
//     <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//     </svg>
//   );
// }

// function PhoneIcon() {
//   return (
//     <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//     </svg>
//   );
// }

// function ImageIcon() {
//   return (
//     <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//     </svg>
//   );
// }

'use client'

import { ChangeEvent } from 'react'
import { useEdit } from './hooks/useEdit'

export default function EditProfileClient() {
  const {
    firstName, setFirstName,
    lastName,  setLastName,
    email,     setEmail,
    phone,     setPhone,
    imagePreviewUrl,
    emailNotifications,
    handleImageChange,
    handleToggleNotifications,
    handleCancel,
    handleSave,
  } = useEdit()

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: '#f0f4f0' }}>
      <div className="container" style={{ maxWidth: 720 }}>

        {/* ── Header ── */}
        <div className="mb-4">
          <h1 className="fw-bold text-dark">Account Settings</h1>
          <p className="text-muted small">Manage your profile and preferences</p>
        </div>

        {/* ── Personal Information ── */}
        <div className="card border-0 shadow-sm rounded-4 mb-4 py-2 px-2">
          <div className="card-body p-4">
            <SectionTitle>Personal Information</SectionTitle>

            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <FieldLabel>First Name</FieldLabel>
                <IconInput icon={<UserIcon />}>
                  <input
                    type="text"
                    className="form-control bg-light border-start-0 ps-0"
                    value={firstName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                    placeholder="First name"
                  />
                </IconInput>
              </div>

              <div className="col-sm-6">
                <FieldLabel>Last Name</FieldLabel>
                <IconInput icon={<UserIcon />}>
                  <input
                    type="text"
                    className="form-control bg-light border-start-0 ps-0"
                    value={lastName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                    placeholder="Last name"
                  />
                </IconInput>
              </div>
            </div>

            <div className="mb-3">
              <FieldLabel>Email Address</FieldLabel>
              <IconInput icon={<EmailIcon />}>
                <input
                  type="email"
                  className="form-control bg-light border-start-0 ps-0"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </IconInput>
            </div>

            <div>
              <FieldLabel>Phone Number</FieldLabel>
              <IconInput icon={<PhoneIcon />}>
                <input
                  type="tel"
                  className="form-control bg-light border-start-0 ps-0"
                  value={phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </IconInput>
            </div>
          </div>
        </div>

        {/* ── Profile Settings ── */}
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">
            <SectionTitle>Profile Settings</SectionTitle>

            <div className="mb-4">
              <FieldLabel>Profile Photo</FieldLabel>
              <div className="d-flex align-items-center gap-3">
                <img
                  src={imagePreviewUrl}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: 64, height: 64, objectFit: 'cover', border: '2px solid #b2dfb2' }}
                />
              </div>
            </div>

            <div>
              <FieldLabel>Upload New Photo</FieldLabel>
              <IconInput icon={<ImageIcon />}>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control bg-light border-start-0 ps-0"
                  onChange={handleImageChange}
                />
              </IconInput>
            </div>
          </div>
        </div>

        {/* ── Preferences ── */}
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

        {/* ── Footer Actions ── */}
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-light border px-4" onClick={handleCancel}>
            Cancel
          </button>
          <button
            style={{ backgroundColor: '#8ae68d' }}
            className="btn px-4 fw-semibold"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Shared UI primitives
───────────────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex align-items-center gap-2 mb-4">
      <span
        className="rounded-circle bg-success"
        style={{ width: 10, height: 10, display: 'inline-block', flexShrink: 0 }}
      />
      <h5 className="fw-bold mb-0">{children}</h5>
    </div>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="form-label text-muted small fw-semibold text-uppercase">{children}</label>
  )
}

function IconInput({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="input-group">
      <span className="input-group-text bg-light border-end-0">{icon}</span>
      {children}
    </div>
  )
}

interface ToggleRowProps {
  title: string
  description: string
  enabled: boolean
  onToggle: () => void
}

function ToggleRow({ title, description, enabled, onToggle }: ToggleRowProps) {
  return (
    <div className="d-flex justify-content-between align-items-center py-3">
      <div>
        <p className="fw-semibold mb-0 small">{title}</p>
        <p className="text-muted mb-0" style={{ fontSize: '0.78rem' }}>
          {description}
        </p>
      </div>
      <div className="form-check form-switch mb-0 ms-3">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          checked={enabled}
          onChange={onToggle}
          style={{
            width: '2.5rem',
            height: '1.3rem',
            cursor: 'pointer',
            backgroundColor: enabled ? '#87f18a' : '',
            borderColor: enabled ? '#87f18a' : '',
          }}
        />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */

function UserIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function ImageIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}