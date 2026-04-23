

// 'use client'

// import { useState } from 'react'
// import { Table } from 'react-bootstrap'
// import { VaccSchedule } from '../../../../types/VaccSchedule'
// import  VaccTimeline from '../VaccTimeLine'

// export function ScheduleCard({ schedule }: { schedule: VaccSchedule }) {
//   const [open, setOpen] = useState(false)
//   const accentColor = schedule.type === 'human' ? '#0d6efd' : '#198754'
//   const lightBg     = schedule.type === 'human' ? '#f0f4ff' : '#f0fff4'

//   return (
//     <div
//       style={{
//         background: '#fff',
//         border: '1px solid #e9ecef',
//         borderLeft: `4px solid ${accentColor}`,
//         borderRadius: 10,
//         boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
//         overflow: 'hidden',
//       }}
//     >
//       <button
//         onClick={() => setOpen(!open)}
//         style={{
//           width: '100%',
//           background: open ? lightBg : '#fff',
//           border: 'none',
//           padding: '16px 20px',
//           textAlign: 'left',
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           gap: 12,
//         }}
//       >
//         <div>
//           <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a' }}>
//             <span
//               style={{
//                 display: 'inline-block',
//                 width: 10,
//                 height: 10,
//                 borderRadius: '50%',
//                 background: accentColor,
//                 marginRight: 8,
//               }}
//             />
//             {schedule.title}
//           </div>
//           {schedule.subtitle && (
//             <div style={{ fontSize: '0.78rem', color: '#6c757d', marginTop: 3 }}>
//               {schedule.subtitle}
//             </div>
//           )}
//         </div>
//         <span style={{ color: accentColor, fontSize: '1.2rem', flexShrink: 0 }}>
//           {open ? '▲' : '▼'}
//         </span>
//       </button>

//       {open && (
//         <div style={{ padding: '0 20px 20px' }}>
//           {schedule.doses.length > 0 && (
//             <Table bordered size="sm" className="mt-3" style={{ fontSize: '0.875rem' }}>
//               <thead style={{ background: lightBg }}>
//                 <tr>
//                   <th>Day</th>
//                   <th>Dose</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {schedule.doses.map((d: VaccSchedule['doses'][number], i: number) => (
//                   <tr key={i}>
//                     <td style={{ fontWeight: 600 }}>{d.label}</td>
//                     <td>{d.note ?? 'Dose'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           )}

//              <VaccTimeline schedule={schedule} onSaved={onSaved} />

//           {schedule.notes && schedule.notes.length > 0 && (
//             <div className="mt-3">
//               <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: 4 }}>
//                 Notes:
//               </div>
//               <ul style={{ fontSize: '0.82rem', color: '#6c757d', paddingLeft: 18, margin: 0 }}>
//                 {schedule.notes.map((n: string, i: number) => (
//                   <li key={i}>{n}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { VaccSchedule } from '../../../../types/VaccSchedule'
import VaccTimeline from '../VaccTimeLine'

export function ScheduleCard({
  schedule,
  onSaved,           // ✅ أضفناها هنا
}: {
  schedule: VaccSchedule
  onSaved?: () => void
}) {
  const [open, setOpen] = useState(false)
  const accentColor = schedule.type === 'human' ? '#0d6efd' : '#198754'
  const lightBg     = schedule.type === 'human' ? '#f0f4ff' : '#f0fff4'

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e9ecef',
        borderLeft: `4px solid ${accentColor}`,
        borderRadius: 10,
        boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: open ? lightBg : '#fff',
          border: 'none',
          padding: '16px 20px',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a1a1a' }}>
            <span
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: accentColor,
                marginRight: 8,
              }}
            />
            {schedule.title}
          </div>
          {schedule.subtitle && (
            <div style={{ fontSize: '0.78rem', color: '#6c757d', marginTop: 3 }}>
              {schedule.subtitle}
            </div>
          )}
        </div>
        <span style={{ color: accentColor, fontSize: '1.2rem', flexShrink: 0 }}>
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div style={{ padding: '0 20px 20px' }}>
          {schedule.doses.length > 0 && (
            <Table bordered size="sm" className="mt-3" style={{ fontSize: '0.875rem' }}>
              <thead style={{ background: lightBg }}>
                <tr>
                  <th>Day</th>
                  <th>Dose</th>
                </tr>
              </thead>
              <tbody>
                {schedule.doses.map((d: VaccSchedule['doses'][number], i: number) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{d.label}</td>
                    <td>{d.note ?? 'Dose'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <VaccTimeline schedule={schedule} onSaved={onSaved} /> {/* ✅ */}

          {schedule.notes && schedule.notes.length > 0 && (
            <div className="mt-3">
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#555', marginBottom: 4 }}>
                Notes:
              </div>
              <ul style={{ fontSize: '0.82rem', color: '#6c757d', paddingLeft: 18, margin: 0 }}>
                {schedule.notes.map((n: string, i: number) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}