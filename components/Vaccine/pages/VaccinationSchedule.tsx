

// 'use client'
// import { useVaccSchedule, EXPOSURE_CATEGORIES } from '../hooks/useVaccSchedule'
// import { ScheduleCard } from '../components/Cards/ScheduleCard'
// import Link from 'next/link'
// import { Container, Alert, Badge, Table } from 'react-bootstrap'
// // import NotificationBell from '../Notification/NotificationBell'

// export default function VaccinationSchedule() {
//   const {tab, setTab,visibleSchedules} = useVaccSchedule();
//   return ( 
//     <Container className="py-5" style={{ maxWidth: '860px' }}>

//       {/* Header */}
//       <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-2">
//         <h2 className="mb-0">Vaccination Schedule</h2>
//         <Link
//           href="/main/VaccineLocations"
//           style={{
//             background: '#8ee570',
//             color: '#fff',
//             borderRadius: 8,
//             padding: '9px 20px',
//             fontWeight: 600,
//             fontSize: '0.875rem',
//             textDecoration: 'none',
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: 6,
//             whiteSpace: 'nowrap',
        
//           }}
//         >
//           📍 Vaccination Locations
//         </Link>
//       </div>

//       <p className="text-muted mb-4 small">
//         Pre-Exposure & Post-Exposure Rabies Vaccination Plans · Follow the schedule precisely to ensure full protection.
//       </p>

//       {/* Critical Alert */}
//       <Alert variant="danger" className="mb-4 fw-semibold">
//         ⚠️ <strong>Important Alert:</strong> Once rabies symptoms appear, there is no effective treatment. Start vaccination immediately after exposure.
//       </Alert>

// <div
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
//     src="/shield2.svg"
//     alt="Vaccination awareness"
//     style={{
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//      objectPosition: '60% 30%',  
//       display: 'block',
//     }}
//   />
//   {/* Gradient overlay */}
//   <div
//     style={{
//       position: 'absolute',
//       inset: 0,
//       background: 'linear-gradient(to right, rgba(13,110,253,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
//     }}
//   />
//   {/* Text on image */}
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
//     <div style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700, marginBottom: 6 }}>
//       🛡️ Prevention Saves Lives
//     </div>
//     <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.82rem', maxWidth: 320, lineHeight: 1.6 }}>
//       Rabies is 100% preventable with timely vaccination. Act immediately after any animal bite.
//     </div>
//   </div>
// </div>


//       {/* Tab switcher */}
//       <div className="d-flex gap-3 mb-4">
//         <button
//           onClick={() => setTab('human')}
//           style={{
//             border: 'none',
//             borderRadius: '50px',
//             padding: '10px 24px',
//             fontWeight: 600,
//             cursor: 'pointer',
//             background: tab === 'human' ? '#0d6efd' : '#e9ecef',
//             color: tab === 'human' ? '#fff' : '#555',
//             display: 'flex',
//             alignItems: 'center',
//             gap: 8,
//             transition: 'all 0.2s',
//           }}
//         >
//           <span style={{ width: 10, height: 10, borderRadius: '50%', background: tab === 'human' ? '#fff' : '#0d6efd', display: 'inline-block' }} />
//           Prevention of Human Rabies
//         </button>
//         <button
//           onClick={() => setTab('animal')}
//           style={{
//             border: 'none',
//             borderRadius: '50px',
//             padding: '10px 24px',
//             fontWeight: 600,
//             cursor: 'pointer',
//             background: tab === 'animal' ? '#198754' : '#e9ecef',
//             color: tab === 'animal' ? '#fff' : '#555',
//             display: 'flex',
//             alignItems: 'center',
//             gap: 8,
//             transition: 'all 0.2s',
//           }}
//         >
//           <span style={{ width: 10, height: 10, borderRadius: '50%', background: tab === 'animal' ? '#fff' : '#198754', display: 'inline-block' }} />
//           Prevention of Animal Rabies
//         </button>
//       </div>

//       {/* Human tab */}
//       {tab === 'human' && (
//         <>
//           <div
//             style={{
//               background: '#fff8e1',
//               border: '1px solid #ffe082',
//               borderRadius: 10,
//               padding: '16px 20px',
//               marginBottom: 20,
//             }}
//           >
//             <div style={{ fontWeight: 700, marginBottom: 8 }}>🚨 Immediate Actions After a Bite</div>
//             <ol style={{ margin: 0, paddingLeft: 20, fontSize: '0.9rem' }}>
//               <li>Wash the wound immediately with soap and water for <strong>15 minutes</strong>.</li>
//               <li>Apply a disinfectant if available.</li>
//               <li><strong>Go immediately</strong> to the nearest hospital to start vaccination.</li>
//             </ol>
//           </div>
    
// {/* Critical Alert */}
//       <Alert variant="danger" className="mb-4 fw-semibold">
//         ⚠️ <strong>Important Alert:</strong> Once rabies symptoms appear, there is no effective treatment. Start vaccination immediately after exposure.
//       </Alert>

//       {/* ===== First Aid Section ===== */}
//       <div style={{ marginBottom: 28 }}>
//         <h5 className="fw-bold mb-3">🩹 First Aid Tips: How to Handle Animal Bites Before Reaching the Hospital</h5>

//         <div style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)', borderRadius: '14px', padding: '16px 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
//           <span style={{ fontSize: '1.6rem' }}>⚡</span>
//           <div>
//             <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>Act immediately — do not wait for symptoms to appear</p>
//             <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', margin: '3px 0 0' }}>Rabies is almost 100% fatal once symptoms appear. Every minute counts.</p>
//           </div>
//         </div>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
//           {[
//             { num: 1, color: '#0f7b6c', icon: '🚿', title: 'Wash the Wound Immediately and Thoroughly', body: 'Wash the bite area immediately with running water and soap for at least 15 minutes. The goal is to reduce the amount of virus that may be present in the saliva. Do not rely on a quick rinse — proper washing significantly reduces the risk of infection.' },
//             { num: 2, color: '#2563eb', icon: '🧴', title: 'Disinfect the Wound', body: 'After washing, use an antiseptic such as Povidone-iodine (Betadine) or 70% alcohol. Avoid applying traditional substances, herbs, or cauterizing the wound.' },
//             { num: 3, color: '#d97706', icon: '🩹', title: 'Do Not Close the Wound', body: 'Do not stitch the wound or tightly cover it, unless at the hospital. Leave it partially open to reduce the chance of trapping the virus inside the tissues.' },
//             { num: 4, color: '#16a34a', icon: '🏥', title: 'Go Immediately to the Nearest Hospital', body: 'Even if the bite appears minor or comes from a pet. The physician will assess the level of risk, administer RIG if necessary, start the rabies vaccination schedule, prescribe antibiotics if needed, and provide a tetanus vaccination if required.' },
//           ].map((step) => (
//             <div key={step.num} style={{ background: '#fff', border: '1px solid #e2e8f0', borderLeft: `4px solid ${step.color}`, borderRadius: '12px', padding: '14px 16px' }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
//                 <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: step.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800, flexShrink: 0 }}>
//                   {step.num}
//                 </div>
//                 <p style={{ fontWeight: 700, color: step.color, margin: 0, fontSize: '0.9rem' }}>{step.icon} {step.title}</p>
//               </div>
//               <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.7, margin: 0, paddingLeft: '36px' }}>{step.body}</p>
//             </div>
//           ))}
//         </div>

//         <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px', fontSize: '0.77rem', color: '#64748b' }}>
//           <strong style={{ color: '#475569' }}>Sources: </strong>
//           [1] CDC (2025). Rabies Prevention and Control · [4] WHO (2024). Rabies, 5 June 2024 · [11] Youm7 (2025). Ministry of Health — 4 urgent steps after animal bite
//         </div>
//       </div>


    
//           <div style={{ marginBottom: 24 }}>
//             <h5 className="fw-semibold mb-3">Exposure Categories & Recommended Actions</h5>
//             <div className="d-flex flex-column gap-3">
//               {EXPOSURE_CATEGORIES.map((cat, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     background: '#fff',
//                     border: `1.5px solid ${cat.color}22`,
//                     borderLeft: `4px solid ${cat.color}`,
//                     borderRadius: 10,
//                     padding: '14px 18px',
//                   }}
//                 >
//                   <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
//                     <Badge style={{ background: cat.color, fontSize: '0.8rem' }}>{cat.cat}</Badge>
//                     {cat.vaccine && <Badge bg="primary" style={{ fontSize: '0.75rem' }}>💉 Vaccine Required</Badge>}
//                     {cat.rig && <Badge bg="danger" style={{ fontSize: '0.75rem' }}>🩸 RIG Required</Badge>}
//                   </div>
//                   <div style={{ fontSize: '0.85rem', color: '#444', marginBottom: 6 }}>
//                     <strong>Exposure:</strong> {cat.exposure}
//                   </div>
//                   <div style={{ fontSize: '0.85rem', color: '#198754', fontWeight: 500 }}>
//                     ✅ {cat.action}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div
//               style={{
//                 background: '#fff0f0',
//                 border: '1px solid #ffc9c9',
//                 borderRadius: 8,
//                 padding: '12px 16px',
//                 marginTop: 12,
//                 fontSize: '0.83rem',
//                 color: '#555',
//               }}
//             >
//               <strong>Rabies Immunoglobulin (RIG):</strong> Administered once on Day 0 for unvaccinated individuals with Category III exposure. RIG should be infiltrated into and around the wound. If not given on Day 0, it can still be given up to Day 7. RIG is NOT given again even if a new bite occurs.
//             </div>
//           </div>
//         </>
//       )}

// <div
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
//     src="/mastertux-syringe-5904302.jpg"
//     alt="Vaccination awareness"
//     style={{
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//      objectPosition: '50% 50%',  
//       display: 'block',
//     }}
//   />
//   {/* Gradient overlay */}
//   <div
//     style={{
//       position: 'absolute',
//       inset: 0,
//       background: 'linear-gradient(to right, rgba(13,110,253,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
//     }}
//   />
//   {/* Text on image */}
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
//     <div style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700, marginBottom: 6 }}>
//       🛡️ Prevention Saves Lives
//     </div>
//     <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.82rem', maxWidth: 320, lineHeight: 1.6 }}>
//       Rabies is 100% preventable with timely vaccination. Act immediately after any animal bite.
//     </div>
//   </div>
// </div>


//       {/* Animal tab */}
//       {tab === 'animal' && (
//         <div
//           style={{
//             background: '#f0fff4',
//             border: '1px solid #b2dfdb',
//             borderRadius: 10,
//             padding: '16px 20px',
//             marginBottom: 20,
//           }}
//         >
//           <div style={{ fontWeight: 700, marginBottom: 8 }}>🐾 Pet Vaccination Guidelines</div>
//           <Table bordered size="sm" style={{ fontSize: '0.875rem', background: '#fff' }}>
//             <thead style={{ background: '#d1fae5' }}>
//               <tr>
//                 <th>Animal</th>
//                 <th>Recommended Age for First Dose</th>
//                 <th>Vaccination Frequency</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>🐕 Dog</td>
//                 <td>From 3 months to 1 year</td>
//                 <td>Every 1–3 years</td>
//               </tr>
//               <tr>
//                 <td>🐈 Cat</td>
//                 <td>From 3 months to 1 year</td>
//                 <td>Every 1–3 years</td>
//               </tr>
//             </tbody>
//           </Table>
//           <div style={{ fontSize: '0.82rem', color: '#555', marginTop: 8 }}>
//             <strong>If your pet is bitten by a suspected rabid animal:</strong>
//             <ul style={{ marginTop: 4, marginBottom: 0 }}>
//               <li><em>Unvaccinated:</em> Humane euthanasia may be recommended if rabies is confirmed. Otherwise quarantine and observe for 6 months.</li>
//               <li><em>Vaccinated (within immunity period):</em> Administer a booster dose and quarantine/observe for approximately 60 days.</li>
//             </ul>
//           </div>
//         </div>
//       )}

//       {/* Schedule Cards */}
//       <h5 className="fw-semibold mb-3">
//         {tab === 'human' ? 'Vaccination Schedules' : 'Animal Vaccination Schedule'}
//       </h5>
//       <div className="d-flex flex-column gap-3">
//         {visibleSchedules.map(schedule => (
//           <ScheduleCard key={schedule.id} schedule={schedule} />
//         ))}
//       </div>

//       {/* Previously vaccinated */}
//       {tab === 'human' && (
//         <div
//           style={{
//             background: '#f8f9fa',
//             border: '1px solid #dee2e6',
//             borderRadius: 10,
//             padding: '16px 20px',
//             marginTop: 20,
//             fontSize: '0.85rem',
//           }}
//         >
//           <div style={{ fontWeight: 700, marginBottom: 8 }}>🔄 Previously Vaccinated?</div>
//           <p className="mb-1"><strong>If full course was within last 3 months:</strong> Clean and disinfect the wound. Usually no new course required (physician evaluation).</p>
//           <p className="mb-1"><strong>If more than 3 months since last full course:</strong> Clean the wound + 2 IM doses on Day 0 and Day 3. RIG is NOT given in this case.</p>
//           <p className="mb-0 text-muted small">* Full PEP course may be needed again for individuals who received vaccines of uncertain efficacy, or those with immunodeficiency (HIV/AIDS), per physician evaluation.</p>
//         </div>
//       )}

//       {/* August 2025 updates */}
//       {tab === 'human' && (
//         <div
//           style={{
//             background: '#fff3cd',
//             border: '1px solid #ffc107',
//             borderRadius: 10,
//             padding: '16px 20px',
//             marginTop: 16,
//             fontSize: '0.83rem',
//           }}
//         >
//           <div style={{ fontWeight: 700, marginBottom: 8 }}>📢 Key Updates — August 2025 (Egypt Ministry of Health)</div>
//           <ol style={{ paddingLeft: 18, margin: 0, color: '#555' }}>
//             <li>Saliva samples for suspected cases: collected 3 times within 24 hours.</li>
//             <li>Mass bite incidents must be reported from 3 cases or more.</li>
//             <li>PEP updated to <strong>4 doses</strong> (0, 3, 7, 14 days) instead of 5.</li>
//             <li>If a dose is missed, complete remaining doses regardless of delay.</li>
//             <li>Immunocompromised patients require a 5th dose on Day 28 with proof of condition.</li>
//           </ol>
//         </div>
//       )}

//     </Container>
//   )
// }

'use client'
import { useVaccSchedule, EXPOSURE_CATEGORIES } from '../hooks/useVaccSchedule'
import { ScheduleCard } from '../components/Cards/ScheduleCard'
import Link from 'next/link'
import { Container, Alert, Badge, Table } from 'react-bootstrap'

export default function VaccinationSchedule() {
  const { tab, setTab, visibleSchedules } = useVaccSchedule()

  return (
    <Container className="py-5" style={{ maxWidth: '860px' }}>

      {/* Header */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-2">
        <h2 className="mb-0">Vaccination Schedule</h2>
        <Link
          href="/main/VaccineLocations"
          style={{
            background: '#8ee570',
            color: '#fff',
            borderRadius: 8,
            padding: '9px 20px',
            fontWeight: 600,
            fontSize: '0.875rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap',
          }}
        >
          📍 Vaccination Locations
        </Link>
      </div>

      <p className="text-muted mb-4 small">
        Pre-Exposure &amp; Post-Exposure Rabies Vaccination Plans · Follow the schedule precisely to ensure full protection.
      </p>

      {/* Critical Alert */}
      <Alert variant="danger" className="mb-4 fw-semibold">
        ⚠️ <strong>Important Alert:</strong> Once rabies symptoms appear, there is no effective treatment. Start vaccination immediately after exposure.
      </Alert>

      {/* Hero banner */}
      <div
        style={{
          position: 'relative',
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: 28,
          height: 200,
          boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        }}
      >
        <img
          src="/shield2.svg"
          alt="Vaccination awareness"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '60% 30%', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,110,253,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px' }}>
          <div style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700, marginBottom: 6 }}>🛡️ Prevention Saves Lives</div>
          <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.82rem', maxWidth: 320, lineHeight: 1.6 }}>
            Rabies is 100% preventable with timely vaccination. Act immediately after any animal bite.
          </div>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="d-flex gap-3 mb-4">
        <button
          onClick={() => setTab('human')}
          style={{
            border: 'none', borderRadius: '50px', padding: '10px 24px', fontWeight: 600, cursor: 'pointer',
            background: tab === 'human' ? '#0d6efd' : '#e9ecef',
            color: tab === 'human' ? '#fff' : '#555',
            display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s',
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: tab === 'human' ? '#fff' : '#0d6efd', display: 'inline-block' }} />
          Prevention of Human Rabies
        </button>
        <button
          onClick={() => setTab('animal')}
          style={{
            border: 'none', borderRadius: '50px', padding: '10px 24px', fontWeight: 600, cursor: 'pointer',
            background: tab === 'animal' ? '#198754' : '#e9ecef',
            color: tab === 'animal' ? '#fff' : '#555',
            display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s',
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: tab === 'animal' ? '#fff' : '#198754', display: 'inline-block' }} />
          Prevention of Animal Rabies
        </button>
      </div>

      {/* ══════════════ HUMAN TAB ══════════════ */}
      {tab === 'human' && (
        <>
          {/* Immediate Actions */}
          <div style={{ background: '#fff8e1', border: '1px solid #ffe082', borderRadius: 10, padding: '16px 20px', marginBottom: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>🚨 Immediate Actions After a Bite</div>
            <ol style={{ margin: 0, paddingLeft: 20, fontSize: '0.9rem' }}>
              <li>Wash the wound immediately with soap and water for <strong>15 minutes</strong>.</li>
              <li>Apply a disinfectant if available.</li>
              <li><strong>Go immediately</strong> to the nearest hospital to start vaccination.</li>
            </ol>
          </div>

          {/* Duplicate critical alert (inside human tab as per original) */}
          <Alert variant="danger" className="mb-4 fw-semibold">
            ⚠️ <strong>Important Alert:</strong> Once rabies symptoms appear, there is no effective treatment. Start vaccination immediately after exposure.
          </Alert>

          {/* ── First Aid Section ── */}
          <div style={{ marginBottom: 28 }}>
            <h5 className="fw-bold mb-3">🩹 First Aid Tips: How to Handle Animal Bites Before Reaching the Hospital</h5>

            <div style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)', borderRadius: '14px', padding: '16px 20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.6rem' }}>⚡</span>
              <div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>Act immediately — do not wait for symptoms to appear</p>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.82rem', margin: '3px 0 0' }}>Rabies is almost 100% fatal once symptoms appear. Every minute counts.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {[
                { num: 1, color: '#0f7b6c', icon: '🚿', title: 'Wash the Wound Immediately and Thoroughly', body: 'Wash the bite area immediately with running water and soap for at least 15 minutes. The goal is to reduce the amount of virus that may be present in the saliva. Do not rely on a quick rinse — proper washing significantly reduces the risk of infection.' },
                { num: 2, color: '#2563eb', icon: '🧴', title: 'Disinfect the Wound', body: 'After washing, use an antiseptic such as Povidone-iodine (Betadine) or 70% alcohol. Avoid applying traditional substances, herbs, or cauterizing the wound.' },
                { num: 3, color: '#d97706', icon: '🩹', title: 'Do Not Close the Wound', body: 'Do not stitch the wound or tightly cover it, unless at the hospital. Leave it partially open to reduce the chance of trapping the virus inside the tissues.' },
                { num: 4, color: '#16a34a', icon: '🏥', title: 'Go Immediately to the Nearest Hospital', body: 'Even if the bite appears minor or comes from a pet. The physician will assess the level of risk, administer RIG if necessary, start the rabies vaccination schedule, prescribe antibiotics if needed, and provide a tetanus vaccination if required.' },
              ].map((step) => (
                <div key={step.num} style={{ background: '#fff', border: '1px solid #e2e8f0', borderLeft: `4px solid ${step.color}`, borderRadius: '12px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: step.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 800, flexShrink: 0 }}>
                      {step.num}
                    </div>
                    <p style={{ fontWeight: 700, color: step.color, margin: 0, fontSize: '0.9rem' }}>{step.icon} {step.title}</p>
                  </div>
                  <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.7, margin: 0, paddingLeft: '36px' }}>{step.body}</p>
                </div>
              ))}
            </div>

            {/* Sources box for First Aid */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px', fontSize: '0.77rem', color: '#64748b' }}>
              <strong style={{ color: '#475569' }}>Sources: </strong>
              [1] CDC (2025). Rabies Prevention and Control · [4] WHO (2024). Rabies, 5 June 2024 · [11] Youm7 (2025). Ministry of Health — 4 urgent steps after animal bite
            </div>
          </div>

          {/* ── Exposure Categories ── */}
          <div style={{ marginBottom: 24 }}>
            <h5 className="fw-semibold mb-3">Exposure Categories &amp; Recommended Actions</h5>
            <div className="d-flex flex-column gap-3">
              {EXPOSURE_CATEGORIES.map((cat, i) => (
                <div
                  key={i}
                  style={{ background: '#fff', border: `1.5px solid ${cat.color}22`, borderLeft: `4px solid ${cat.color}`, borderRadius: 10, padding: '14px 18px' }}
                >
                  <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                    <Badge style={{ background: cat.color, fontSize: '0.8rem' }}>{cat.cat}</Badge>
                    {cat.vaccine && <Badge bg="primary" style={{ fontSize: '0.75rem' }}>💉 Vaccine Required</Badge>}
                    {cat.rig && <Badge bg="danger" style={{ fontSize: '0.75rem' }}>🩸 RIG Required</Badge>}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#444', marginBottom: 6 }}>
                    <strong>Exposure:</strong> {cat.exposure}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#198754', fontWeight: 500 }}>
                    ✅ {cat.action}
                  </div>
                </div>
              ))}
            </div>

            {/* RIG Info box */}
            <div style={{ background: '#fff0f0', border: '1px solid #ffc9c9', borderRadius: 8, padding: '12px 16px', marginTop: 12, fontSize: '0.83rem', color: '#555' }}>
              <strong>Rabies Immunoglobulin (RIG):</strong>
              <ul style={{ marginTop: 6, marginBottom: 6, paddingLeft: 18 }}>
                <li>Administered <strong>once</strong> on Day 0 for unvaccinated individuals with Category III exposure.</li>
                <li>RIG should be infiltrated into and around the wound as much as possible. If part of the dose remains, administer it intramuscularly at a site distant from the vaccine injection site.</li>
                <li>If not given on Day 0, it can still be given <strong>up to Day 7</strong>.</li>
                <li>RIG is <strong>NOT</strong> given again even if a new bite occurs.</li>
                <li>⚠️ <strong>If RIG administration coincides with Measles–Rubella vaccination</strong>, postpone MR vaccine for at least <strong>4 months</strong>.</li>
                <li>⚠️ <strong>If RIG coincides with Varicella vaccination</strong>, postpone Varicella for at least <strong>3 months</strong>. Priority is always given to RIG as it is life-saving.</li>
              </ul>
              <span style={{ fontSize: '0.78rem', color: '#888' }}>Source: [6] WHO (2018). Rabies vaccines: WHO position paper · [12] Ministry of Health Egypt (2025).</span>
            </div>
          </div>
        </>
      )}

      {/* Second hero banner */}
      <div
        style={{
          position: 'relative', borderRadius: 16, overflow: 'hidden', marginBottom: 28, height: 200,
          boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        }}
      >
        <img
          src="/mastertux-syringe-5904302.jpg"
          alt="Vaccination awareness"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 50%', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,110,253,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px' }}>
          <div style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700, marginBottom: 6 }}>🛡️ Prevention Saves Lives</div>
          <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.82rem', maxWidth: 320, lineHeight: 1.6 }}>
            Rabies is 100% preventable with timely vaccination. Act immediately after any animal bite.
          </div>
        </div>
      </div>

      {/* ══════════════ ANIMAL TAB ══════════════ */}
      {tab === 'animal' && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ background: '#f0fff4', border: '1px solid #b2dfdb', borderRadius: 10, padding: '16px 20px', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>🐾 Pet Vaccination Guidelines</div>
            <Table bordered size="sm" style={{ fontSize: '0.875rem', background: '#fff' }}>
              <thead style={{ background: '#d1fae5' }}>
                <tr>
                  <th>Animal</th>
                  <th>Recommended Age for First Dose</th>
                  <th>Vaccination Frequency</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>🐕 Dog</td>
                  <td>From 3 months to 1 year</td>
                  <td>Every 1–3 years</td>
                </tr>
                <tr>
                  <td>🐈 Cat</td>
                  <td>From 3 months to 1 year</td>
                  <td>Every 1–3 years</td>
                </tr>
              </tbody>
            </Table>
            <div style={{ fontSize: '0.82rem', color: '#555', marginTop: 4 }}>
              <strong>Regulatory Measures:</strong>
              <ul style={{ marginTop: 4, marginBottom: 0 }}>
                <li>Vaccination according to regulations and laws.</li>
                <li>Dogs must be <strong>muzzled and kept on a leash</strong> per regulatory requirements.</li>
              </ul>
            </div>
          </div>

          {/* Pet bitten by rabid animal */}
          <div style={{ background: '#fff8e1', border: '1px solid #ffe082', borderRadius: 10, padding: '16px 20px', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>🐾 What if your pet is bitten by a suspected rabid animal?</div>
            <div style={{ fontSize: '0.85rem', color: '#555' }}>
              <div style={{ marginBottom: 8 }}>
                <strong>🔴 If the animal has NOT been previously vaccinated:</strong>
                <ul style={{ marginTop: 4, marginBottom: 0 }}>
                  <li>Humane euthanasia is recommended for animals <em>confirmed</em> to have rabies.</li>
                  <li>Otherwise, quarantine and observe the exposed pet for <strong>6 months</strong> to monitor for rabies signs.</li>
                </ul>
              </div>
              <div>
                <strong>🟢 If the animal WAS vaccinated and within the expected immunity period:</strong>
                <ul style={{ marginTop: 4, marginBottom: 0 }}>
                  <li>Administer a <strong>booster dose</strong>.</li>
                  <li>Quarantine and observe the animal for approximately <strong>60 days</strong>.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sources for animal tab */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px', fontSize: '0.77rem', color: '#64748b' }}>
            <strong style={{ color: '#475569' }}>Sources: </strong>
            [9] World Organisation for Animal Health (2025). Rabies. https://www.woah.org/en/disease/rabies/
          </div>
        </div>
      )}

      {/* ── Schedule Cards ── */}
      <h5 className="fw-semibold mb-3">
        {tab === 'human' ? 'Vaccination Schedules' : 'Animal Vaccination Schedule'}
      </h5>
      <div className="d-flex flex-column gap-3">
        {visibleSchedules.map(schedule => (
          <ScheduleCard key={schedule.id} schedule={schedule} />
        ))}
      </div>

      {/* ── Previously Vaccinated (human only) ── */}
      {tab === 'human' && (
        <div style={{ background: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: 10, padding: '16px 20px', marginTop: 20, fontSize: '0.85rem' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🔄 Previously Vaccinated?</div>
          <p className="mb-1"><strong>If full course was within the last 3 months:</strong> Clean and disinfect the wound. Usually no new course required (physician evaluation).</p>
          <p className="mb-1"><strong>If more than 3 months since the last full vaccination course:</strong> Clean the wound + 2 IM doses on Day 0 and Day 3. RIG is NOT given in this case.</p>
          <p className="mb-0 text-muted small">* Full PEP course may be needed again for individuals who received vaccines of uncertain efficacy, or those with immunodeficiency (HIV/AIDS), per physician evaluation.</p>
          <div style={{ marginTop: 10, fontSize: '0.78rem', color: '#888' }}>
            Sources: [1] CDC (2025) · [3] ACIP/CDC (2010) · [5] WHO Weekly Epidemiological Record (2010)
          </div>
        </div>
      )}

      {/* ── August 2025 Updates (human only) ── */}
      {tab === 'human' && (
        <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 10, padding: '16px 20px', marginTop: 16, fontSize: '0.83rem' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>📢 Key Updates — August 2025 (Egypt Ministry of Health)</div>
          <ol style={{ paddingLeft: 18, margin: 0, color: '#555' }}>
            <li>Saliva samples for suspected cases: collected <strong>3 times within 24 hours</strong>.</li>
            <li>Mass bite incidents must be reported from <strong>3 cases or more</strong>.</li>
            <li>PEP updated to <strong>4 doses</strong> (Days 0, 3, 7, 14) instead of 5.</li>
            <li>If a dose is missed, complete remaining doses <strong>regardless of delay</strong>.</li>
            <li>Immunocompromised patients require a 5th dose on <strong>Day 28</strong> with proof of condition.</li>
            <li>
              <strong>If the biting animal can be observed:</strong>
              <ul style={{ marginTop: 4, marginBottom: 4 }}>
                <li><em>Patient presents immediately after bite:</em> Give the first dose, instruct patient to observe animal for 10 days. If no behavioral changes, discontinue vaccination at end of Day 10.</li>
                <li><em>Patient presents after 10 days from exposure:</em> Ask whether any behavioral changes occurred. If none reported, do not administer the vaccine.</li>
              </ul>
            </li>
            <li>
              <strong>Booster doses:</strong>
              <ul style={{ marginTop: 4, marginBottom: 4 }}>
                <li>For stray animal bites, if patient previously completed full vaccination and at least <strong>3 months</strong> have passed since the 4th dose: give 2 booster doses on Day 0 and Day 3.</li>
                <li>Booster doses should be postponed until the 10-day observation period of the biting animal is completed. If no behavioral changes, vaccination should not be given.</li>
              </ul>
            </li>
            <li>
              <strong>New bites in previously vaccinated patients:</strong>
              <ul style={{ marginTop: 4, marginBottom: 4 }}>
                <li>Received 4 doses &amp; returned <em>before</em> 3 months since 4th dose: <strong>No vaccination given.</strong></li>
                <li>Received 4 doses &amp; returned <em>after</em> 3 months since 4th dose: <strong>Administer booster doses.</strong></li>
                <li>Received 3 doses &amp; returned before 3 months since 3rd dose: <strong>Administer the 4th dose</strong> (complete the schedule).</li>
                <li>Received 3 doses &amp; returned after 3 months since 3rd dose: <strong>Administer booster doses.</strong></li>
                <li>Received 1 or 2 doses: <strong>Complete the remaining doses.</strong></li>
              </ul>
            </li>
          </ol>
          <div style={{ marginTop: 10, fontSize: '0.78rem', color: '#888' }}>
            Source: [12] Ministry of Health and Population, Arab Republic of Egypt (2025). Key updates in the rabies prevention guidelines – August 2025.
            <br />
            <a href="https://media.gemini.media/img/original/2025/8/11/2025_8_11_12_56_11_63.webp" target="_blank" rel="noopener noreferrer" style={{ color: '#0d6efd', wordBreak: 'break-all' }}>
              https://media.gemini.media/img/original/2025/8/11/2025_8_11_12_56_11_63.webp
            </a>
          </div>
        </div>
      )}

      {/* ══════════════ SOURCES SECTION ══════════════ */}
      <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 12, padding: '20px 24px', marginTop: 28 }}>
        <h6 style={{ fontWeight: 700, color: '#334155', marginBottom: 12 }}>📚 References &amp; Sources</h6>
        <ol style={{ paddingLeft: 20, margin: 0, fontSize: '0.8rem', color: '#475569', lineHeight: 1.8 }}>
          <li>Centers for Disease Control and Prevention (2025). <em>Rabies Prevention and Control.</em> <a href="https://www.cdc.gov/rabies/prevention/index.html" target="_blank" rel="noopener noreferrer">https://www.cdc.gov/rabies/prevention/index.html</a></li>
          <li>Centers for Disease Control and Prevention (2024). <em>ACIP Recommendations: Rabies Vaccine.</em> National Center for Immunization and Respiratory Diseases. July 29, 2024.</li>
          <li>Rupprecht, C. E., et al. &amp; CDC (2010). Use of a reduced (4-dose) vaccine schedule for postexposure prophylaxis to prevent human rabies. <em>MMWR Recomm Rep, 59</em>(RR-2), 1–9.</li>
          <li>World Health Organization (2024). <em>Rabies.</em> 5 June 2024.</li>
          <li>World Health Organization (2010). Rabies vaccines. <em>Weekly Epidemiological Record, 85</em>(35), 337–348.</li>
          <li>World Health Organization (2018). Rabies vaccines: WHO position paper, April 2018 – Recommendations. <em>Vaccine, 36</em>(37), 5500–5503.</li>
          <li id="src7">Ministry of Health and Population, Egypt (2025). <em>Surveillance and control protocols.</em></li>
          <li id="src8">Ministry of Health and Population, Egypt (2025). <em>Internal circular on mass bite reporting.</em></li>
          <li>World Organisation for Animal Health (2025). <em>Rabies.</em> <a href="https://www.woah.org/en/disease/rabies/" target="_blank" rel="noopener noreferrer">https://www.woah.org/en/disease/rabies/</a></li>
          <li id="src10">Egyptian Veterinary Medical Association (2025). <em>Animal vaccination guidelines.</em></li>
          <li>Youm7 (2025). Ministry of Health — 4 urgent steps after animal bite.</li>
          <li>Ministry of Health and Population. Preventive Medicine and Public Health Sector. Central Administration of Public Health. General Directorate for Infectious Disease Control. Arab Republic of Egypt (2025). <em>Key updates in the rabies prevention guidelines – August 2025.</em> <a href="https://media.gemini.media/img/original/2025/8/11/2025_8_11_12_56_11_63.webp" target="_blank" rel="noopener noreferrer" style={{ wordBreak: 'break-all' }}>https://media.gemini.media/img/original/2025/8/11/2025_8_11_12_56_11_63.webp</a></li>
        </ol>
      </div>

    </Container>
  )
}