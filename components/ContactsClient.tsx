
// 'use client'
// import { useState } from 'react'
// import React from 'react'

// const PhoneIcon = () => (
//   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.15 1.18 2 2 0 012.12 0h3a2 2 0 012 1.72c.13 1.05.36 2.09.71 3.09a2 2 0 01-.45 2.11L6.09 8.17a16 16 0 006.72 6.72l1.25-1.25a2 2 0 012.11-.45c1 .35 2.04.58 3.09.71A2 2 0 0122 16.92z"/>
//   </svg>
// )

// const GlobeIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
//     <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
//   </svg>
// )

// const HomeIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#854F0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
//     <polyline points="9 22 9 12 15 12 15 22"/>
//   </svg>
// )

// const AlertIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#BA7517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//   </svg>
// )

// const HealthIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.15 1.18 2 2 0 012.12 0h3a2 2 0 012 1.72c.13 1.05.36 2.09.71 3.09a2 2 0 01-.45 2.11L6.09 8.17a16 16 0 006.72 6.72l1.25-1.25a2 2 0 012.11-.45c1 .35 2.04.58 3.09.71A2 2 0 0122 16.92z"/>
//   </svg>
// )

// const GOVERNORATE_CONTACTS: Record<string, {
//   human?: { name: string; sub?: string; number?: string; updating?: boolean }[]
//   vet?: { name: string; sub?: string; number?: string; updating?: boolean }[]
// }> = {
//   portsaid: {
//     human: [
//       { name: 'Fever Hospital — Port Said', sub: 'Calling 105 transfers to this hospital', number: '105' },
//       { name: 'Port Said local ambulance', sub: 'For bite/scratch from rabies-suspected animal', number: '123' },
//       { name: 'Port Said Directorate of Health Affairs' },
//     ],
//     vet: [
//       { name: 'Port Said Veterinary Center', sub: 'Local veterinary authority — number being updated', updating: true },
//       { name: 'Port Said Veterinary Medicine Directorate' },
//     ],
//   },
//   ismailia: {
//     human: [],
//     vet: [
//       { name: 'Ismailia Veterinary Medicine Directorate', number: '0643504020' },
//     ],
//   },
// }
// interface CallEntryProps {
//   name: string
//   sub?: string
//   number?: string
//   color: 'green' | 'amber' | 'blue'
//   updating?: boolean
// }

// function CallEntry({ name, sub, number, color, updating }: CallEntryProps) {
//   const styles = {
//     green: { background: '#e8f8f0', borderColor: '#0F6E56', color: '#085041' },
//     amber: { background: '#faeeda', borderColor: '#854F0B', color: '#633806' },
//     blue:  { background: '#e6f1fb', borderColor: '#185FA5', color: '#0C447C' },
//   }
//   const s = styles[color]

//   return (
//     <div style={{
//       display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//       padding: '13px 20px', borderBottom: '1px solid #e8e8e8', gap: 12,
//     }}>
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <p style={{ fontSize: 13, fontWeight: 500, margin: '0 0 3px', color: '#111' }}>{name}</p>
//         <p style={{ fontSize: 11, color: '#888', margin: 0 }}>{sub}</p>
//       </div>
//       {updating ? (
//         <span style={{ fontSize: 11, color: '#aaa', padding: '6px 12px', border: '1px solid #ddd', borderRadius: 20 }}>Updating</span>
//       ) : (
//         <a href={`tel:${number}`} style={{
//           display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px',
//           borderRadius: 20, border: `1px solid ${s.borderColor}`, background: s.background,
//           color: s.color, fontSize: 12, fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap',
//         }}>
//           <PhoneIcon />
//           Call {number}
//         </a>
//       )}
//     </div>
//   )
// }

// interface CardProps {
//   iconBg: string
//   icon: React.ReactNode
//   title: string
//   subtitle: string
//   children: React.ReactNode
// }

// function ContactCard({ iconBg, icon, title, subtitle, children }: CardProps) {
//   return (
//     <div style={{
//       background: '#fff', border: '1px solid #e0e0e0', borderRadius: 14,
//       marginBottom: 12, overflow: 'hidden',
//     }}>
//       <div style={{
//         display: 'flex', alignItems: 'center', gap: 12,
//         padding: '14px 20px', borderBottom: '1px solid #e8e8e8',
//       }}>
//         <div style={{
//           width: 38, height: 38, borderRadius: 10, background: iconBg,
//           display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
//         }}>
//           {icon}
//         </div>
//         <div>
//           <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 2px', color: '#111' }}>{title}</p>
//           <p style={{ fontSize: 11, color: '#888', margin: 0 }}>{subtitle}</p>
//         </div>
//       </div>
//       {children}
//     </div>
//   )
// }

// export default function ContactsClient() {
//   const [selectedGov, setSelectedGov] = useState('portsaid')
// const contacts = GOVERNORATE_CONTACTS[selectedGov] ?? {}
//   return (
//     <div style={{
//       padding: '1.5rem',
//       fontFamily: 'var(--font-sans, system-ui, sans-serif)',
//       maxWidth: 940,
//       margin: '0 auto',
//     }}>

//       {/* National Numbers */}
//       <p style={{
//         fontSize: 11, fontWeight: 600, letterSpacing: '0.09em',
//         textTransform: 'uppercase', color: '#aaa', margin: '0 0 12px 2px',
//       }}>
//         Egypt — national numbers
//       </p>

      
//       <div
//   style={{
//     position: 'relative',
//     borderRadius: 16,
//     overflow: 'hidden',
//     marginBottom: 28,
//     height: 200,
//     boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
//   }}
// >
//   <img
//     src="/phone.svg"
//     alt="Emergency bite report"
//     style={{ 
//     width: 870,     
//     height: 200,     
//     objectFit: 'contain',
  
//   }}
//   />
//   {/* Gradient overlay */}
//   <div
//     style={{
//       position: 'absolute',
//       inset: 0,
//       background: 'linear-gradient(to right, rgba(220,53,69,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
//     }}
//   />
//   {/* Text */}
//   <div
//     style={{
//       position: 'absolute',
//       inset: 0,
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       padding: '0 28px',
//     }}
//   >
//    {/* Contacts */}
// <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: 6 }}>
//   📞 Reach the Right Authority Fast
// </div>
// <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.82rem', maxWidth: 300, lineHeight: 1.6 }}>
//   National and local contacts for human & veterinary health.
// </div>
//   </div>
// </div>



//       <ContactCard iconBg="#e8f8f0" icon={<HealthIcon />} title="Human health" subtitle="Ministry of Health & Ambulance Authority">
//         <CallEntry name="Ministry of Health hotline" sub="Egyptian Ministry of Health and Population" number="105" color="green" />
//         <CallEntry name="Egyptian Ambulance Authority" sub="National emergency ambulance" number="123" color="green" />
       
//       </ContactCard>

//       <ContactCard iconBg="#faeeda" icon={<HomeIcon />} title="Veterinary health" subtitle="General Organization for Veterinary Services">
//         <CallEntry name="Ministry of Agriculture hotline" sub="Central Admin for Public Health & Slaughterhouses" number="19561" color="amber" />

//       </ContactCard>

//       <ContactCard iconBg="#e6f1fb" icon={<GlobeIcon />} title="International organizations" subtitle="Zoonotic diseases & infection control">
//         {[
//           { name: 'WHO',  sub: 'World Health Organization',              url: 'https://www.who.int' },
//           { name: 'WOAH', sub: 'World Organisation for Animal Health',   url: 'https://www.woah.org' },
//           { name: 'CDC',  sub: 'Centers for Disease Control and Prevention', url: 'https://www.cdc.gov' },
//         ].map((org, i, arr) => (
//           <div key={org.name} style={{
//             display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//             padding: '13px 20px', borderBottom: i < arr.length - 1 ? '1px solid #e8e8e8' : 'none', gap: 8,
//           }}>
//             <div>
//               <p style={{ fontSize: 13, fontWeight: 500, margin: '0 0 3px', color: '#111' }}>{org.name}</p>
//               <p style={{ fontSize: 11, color: '#888', margin: 0 }}>{org.sub}</p>
//             </div>
//             <a href={org.url} target="_blank" rel="noreferrer" style={{
//               fontSize: 12, color: '#0C447C', border: '1px solid #185FA5',
//               padding: '6px 14px', borderRadius: 20, background: '#e6f1fb',
//               textDecoration: 'none', whiteSpace: 'nowrap',
//             }}>
//               Visit site
//             </a>
//           </div>
//         ))}
//       </ContactCard>

//       {/* Governorate Numbers */}
//       <div style={{ marginTop: 28 }}>
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
//           <p style={{
//             fontSize: 11, fontWeight: 600, letterSpacing: '0.09em',
//             textTransform: 'uppercase', color: '#aaa', margin: 0,
//           }}>
//             Governorate numbers
//           </p>
//           <span style={{
//             display: 'inline-flex', alignItems: 'center', padding: '3px 12px',
//             borderRadius: 20, fontSize: 11, fontWeight: 500,
//             background: '#e8f8f0', color: '#085041', border: '1px solid #0F6E56',
//           }}>
//             Port Said
//           </span>
//         </div>

//         <div style={{ marginBottom: 14 }}>
//           <select style={{
//             width: '100%', padding: '10px 14px', borderRadius: 10,
//             border: '1px solid #ddd', background: '#fff', color: '#111', fontSize: 13,
//           }}>
//             <option value="portsaid">Port Said</option>
//             <option value="isamilia">Isamilia</option>
//             <option disabled>Cairo (coming soon)</option>
//             <option disabled>Alexandria (coming soon)</option>
//           </select>
//         </div>

//         <ContactCard iconBg="#e8f8f0" icon={<HealthIcon />} title="Human health — Port Said" subtitle="Port Said Directorate of Health Affairs">
//           <CallEntry name="Fever Hospital — Port Said" sub="Calling 105 transfers to this hospital" number="105" color="green" />
//           <CallEntry name="Port Said local ambulance" sub="For bite/scratch from rabies-suspected animal" number="123" color="green" />
//            <CallEntry name="Port Said Directorate of Health Affairs" color="green" />
//         </ContactCard>

//         <ContactCard iconBg="#faeeda" icon={<HomeIcon />} title="Veterinary — Port Said" subtitle="Port Said Veterinary Medicine Directorate">
//           <CallEntry name="Port Said Veterinary Center" sub="Local veterinary authority — number being updated" color="amber" updating />
//           <CallEntry name="Port Said Veterinary Medicine Directorate" color="amber" />
//         </ContactCard>

//         <div style={{
//           display: 'flex', gap: 10, padding: '13px 16px',
//           background: '#faeeda', borderLeft: '3px solid #BA7517',
//           borderRadius: '0 10px 10px 0', marginTop: 16,
//         }}>
//           <div style={{ marginTop: 1, flexShrink: 0 }}><AlertIcon /></div>
//           <p style={{ fontSize: 12, color: '#633806', margin: 0, lineHeight: 1.6 }}>
//             Contact information for some local authorities is currently being updated (2025/2026).
//             Please verify numbers before use. This app is for awareness only and does not replace
//             direct medical or veterinary consultation.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import React, { useState } from 'react'

const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.15 1.18 2 2 0 012.12 0h3a2 2 0 012 1.72c.13 1.05.36 2.09.71 3.09a2 2 0 01-.45 2.11L6.09 8.17a16 16 0 006.72 6.72l1.25-1.25a2 2 0 012.11-.45c1 .35 2.04.58 3.09.71A2 2 0 0122 16.92z"/>
  </svg>
)

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
)

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#854F0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

const AlertIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#BA7517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)

const HealthIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.15 1.18 2 2 0 012.12 0h3a2 2 0 012 1.72c.13 1.05.36 2.09.71 3.09a2 2 0 01-.45 2.11L6.09 8.17a16 16 0 006.72 6.72l1.25-1.25a2 2 0 012.11-.45c1 .35 2.04.58 3.09.71A2 2 0 0122 16.92z"/>
  </svg>
)

interface CallEntryProps {
  name: string
  sub?: string
  number?: string
  color?: 'green' | 'amber' | 'blue'
  updating?: boolean
}

function CallEntry({ name, sub, number, color = 'green', updating }: CallEntryProps) {
  const styles = {
    green: { background: '#e8f8f0', borderColor: '#0F6E56', color: '#085041' },
    amber: { background: '#faeeda', borderColor: '#854F0B', color: '#633806' },
    blue:  { background: '#e6f1fb', borderColor: '#185FA5', color: '#0C447C' },
  }
  const s = styles[color]

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '13px 20px', borderBottom: '1px solid #e8e8e8', gap: 12,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 500, margin: '0 0 3px', color: '#111' }}>{name}</p>
        {sub && <p style={{ fontSize: 11, color: '#888', margin: 0 }}>{sub}</p>}
      </div>
      {updating ? (
        <span style={{ fontSize: 11, color: '#aaa', padding: '6px 12px', border: '1px solid #ddd', borderRadius: 20 }}>Updating</span>
      ) : number ? (
        <a href={`tel:${number}`} style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px',
          borderRadius: 20, border: `1px solid ${s.borderColor}`, background: s.background,
          color: s.color, fontSize: 12, fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap',
        }}>
          <PhoneIcon />
          Call {number}
        </a>
      ) : null}
    </div>
  )
}

interface CardProps {
  iconBg: string
  icon: React.ReactNode
  title: string
  subtitle: string
  children: React.ReactNode
}

function ContactCard({ iconBg, icon, title, subtitle, children }: CardProps) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #e0e0e0', borderRadius: 14,
      marginBottom: 12, overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 20px', borderBottom: '1px solid #e8e8e8',
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10, background: iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {icon}
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 2px', color: '#111' }}>{title}</p>
          <p style={{ fontSize: 11, color: '#888', margin: 0 }}>{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

// ══════════════ GOVERNORATE DATA ══════════════
const GOVERNORATES = [
  { id: 'portsaid',  label: 'Port Said' },
  { id: 'ismailia',  label: 'Ismailia' },
]

const GOVERNORATE_CONTACTS: Record<string, {
  label: string
  human?: CallEntryProps[]
  vet?: CallEntryProps[]
}> = {
  portsaid: {
    label: 'Port Said',
    human: [
      { name: 'Fever Hospital — Port Said', sub: 'Calling 105 transfers to this hospital', number: '105' },
      { name: 'Port Said local ambulance', sub: 'For bite/scratch from rabies-suspected animal', number: '123' },
      { name: 'Port Said Directorate of Health Affairs' },
    ],
    vet: [
      { name: 'Port Said Veterinary Center', sub: 'Local veterinary authority — number being updated', updating: true },
      { name: 'Port Said Veterinary Medicine Directorate' },
    ],
  },
  ismailia: {
    label: 'Ismailia',
    human: [],
    vet: [
      { name: 'Ismailia Veterinary Medicine Directorate', number: '0643504020' },
    ],
  },
}

export default function ContactsClient() {
  const [selectedGov, setSelectedGov] = useState('portsaid')
  const contacts = GOVERNORATE_CONTACTS[selectedGov] ?? {}

  return (
    <div style={{
      padding: '1.5rem',
      fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      maxWidth: 940,
      margin: '0 auto',
    }}>

      {/* National Numbers */}
      <p style={{
        fontSize: 11, fontWeight: 600, letterSpacing: '0.09em',
        textTransform: 'uppercase', color: '#aaa', margin: '0 0 12px 2px',
      }}>
        Egypt — national numbers
      </p>

      {/* Hero Banner */}
      <div style={{
        position: 'relative', borderRadius: 16, overflow: 'hidden',
        marginBottom: 28, height: 200, boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
      }}>
        <img
          src="/phone.svg"
          alt="Emergency bite report"
          style={{ width: 870, height: 200, objectFit: 'contain' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(220,53,69,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          flexDirection: 'column', justifyContent: 'center', padding: '0 28px',
        }}>
          <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: 6 }}>
            📞 Reach the Right Authority Fast
          </div>
          <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.82rem', maxWidth: 300, lineHeight: 1.6 }}>
            National and local contacts for human & veterinary health.
          </div>
        </div>
      </div>

      {/* Human Health */}
      <ContactCard iconBg="#e8f8f0" icon={<HealthIcon />} title="Human health" subtitle="Ministry of Health & Ambulance Authority">
        <CallEntry name="Ministry of Health hotline" sub="Egyptian Ministry of Health and Population" number="105" color="green" />
        <CallEntry name="Egyptian Ambulance Authority" sub="National emergency ambulance" number="123" color="green" />
      </ContactCard>

      {/* Veterinary Health */}
      <ContactCard iconBg="#faeeda" icon={<HomeIcon />} title="Veterinary health" subtitle="General Organization for Veterinary Services">
        <CallEntry name="Ministry of Agriculture hotline" sub="Central Admin for Public Health & Slaughterhouses" number="19561" color="amber" />
      </ContactCard>

      {/* International */}
      <ContactCard iconBg="#e6f1fb" icon={<GlobeIcon />} title="International organizations" subtitle="Zoonotic diseases & infection control">
        {[
          { name: 'WHO',  sub: 'World Health Organization',                   url: 'https://www.who.int' },
          { name: 'WOAH', sub: 'World Organisation for Animal Health',        url: 'https://www.woah.org' },
          { name: 'CDC',  sub: 'Centers for Disease Control and Prevention',  url: 'https://www.cdc.gov' },
        ].map((org, i, arr) => (
          <div key={org.name} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '13px 20px', borderBottom: i < arr.length - 1 ? '1px solid #e8e8e8' : 'none', gap: 8,
          }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 500, margin: '0 0 3px', color: '#111' }}>{org.name}</p>
              <p style={{ fontSize: 11, color: '#888', margin: 0 }}>{org.sub}</p>
            </div>
            <a href={org.url} target="_blank" rel="noreferrer" style={{
              fontSize: 12, color: '#0C447C', border: '1px solid #185FA5',
              padding: '6px 14px', borderRadius: 20, background: '#e6f1fb',
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}>
              Visit site
            </a>
          </div>
        ))}
      </ContactCard>

      {/* Governorate Numbers */}
      <div style={{ marginTop: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <p style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.09em',
            textTransform: 'uppercase', color: '#aaa', margin: 0,
          }}>
            Governorate numbers
          </p>
          <span style={{
            display: 'inline-flex', alignItems: 'center', padding: '3px 12px',
            borderRadius: 20, fontSize: 11, fontWeight: 500,
            background: '#e8f8f0', color: '#085041', border: '1px solid #0F6E56',
          }}>
            {contacts.label}
          </span>
        </div>

        {/* Select */}
        <div style={{ marginBottom: 14 }}>
          <select
            value={selectedGov}
            onChange={e => setSelectedGov(e.target.value)}
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 10,
              border: '1px solid #ddd', background: '#fff', color: '#111', fontSize: 13,
            }}
          >
            {GOVERNORATES.map(g => (
              <option key={g.id} value={g.id}>{g.label}</option>
            ))}
            <option disabled>Cairo (coming soon)</option>
            <option disabled>Alexandria (coming soon)</option>
          </select>
        </div>

        {/* Human Cards */}
        {contacts.human && contacts.human.length > 0 && (
          <ContactCard
            iconBg="#e8f8f0" icon={<HealthIcon />}
            title={`Human health — ${contacts.label}`}
            subtitle="Directorate of Health Affairs"
          >
            {contacts.human.map((entry, i) => (
              <CallEntry key={i} {...entry} color="green" />
            ))}
          </ContactCard>
        )}

        {/* Vet Cards */}
        {contacts.vet && contacts.vet.length > 0 && (
          <ContactCard
            iconBg="#faeeda" icon={<HomeIcon />}
            title={`Veterinary — ${contacts.label}`}
            subtitle="Veterinary Medicine Directorate"
          >
            {contacts.vet.map((entry, i) => (
              <CallEntry key={i} {...entry} color="amber" />
            ))}
          </ContactCard>
        )}

        {/* Alert */}
        <div style={{
          display: 'flex', gap: 10, padding: '13px 16px',
          background: '#faeeda', borderLeft: '3px solid #BA7517',
          borderRadius: '0 10px 10px 0', marginTop: 16,
        }}>
          <div style={{ marginTop: 1, flexShrink: 0 }}><AlertIcon /></div>
          <p style={{ fontSize: 12, color: '#633806', margin: 0, lineHeight: 1.6 }}>
            Contact information for some local authorities is currently being updated (2025/2026).
            Please verify numbers before use. This app is for awareness only and does not replace
            direct medical or veterinary consultation.
          </p>
        </div>
      </div>
    </div>
  )
}