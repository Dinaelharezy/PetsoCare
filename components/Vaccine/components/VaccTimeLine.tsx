// 'use client'

// import { useState } from 'react'
// import { Modal, Button, Form, Alert } from 'react-bootstrap'
// import { VaccSchedule } from '../../../types/VaccSchedule'
// import { useVaccine, buildDoseDays } from '../hooks/useVaccine'

// export default function VaccTimeline({
//   schedule,
//   onSaved,                          // ← callback بعد الحفظ لتحديث الـ list
// }: {
//   schedule: VaccSchedule
//   onSaved?: () => void
// }) {
//   const [takenDoses, setTakenDoses] = useState<number[]>([])
//   const [startDate,  setStartDate]  = useState<string>('')
//   const [vaccineId,  setVaccineId]  = useState<string | null>(null)  // ← id بعد الحفظ

//   const [showModal, setShowModal]   = useState(false)
//   const [pet,       setPet]         = useState('')
//   const [saved,     setSaved]       = useState(false)

//   const { addVaccineFromSchedule, takeDose, submitting, error } = useVaccine()

//   if (schedule.id === 'animal-vaccine') return null

//   const nextDoseIndex = schedule.doses.findIndex((_, i) => !takenDoses.includes(i))

//   const getDoseDate = (dayNum: number | string): string | null => {
//     if (!startDate || typeof dayNum !== 'number') return null
//     const d = new Date(startDate)
//     d.setDate(d.getDate() + dayNum)
//     return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
//   }

//   // ← toggleDose: لو عندنا vaccineId نعمل POST take، لو لأ بس نحدث الـ state
//   const toggleDose = async (index: number) => {
//     const alreadyTaken = takenDoses.includes(index)

//     if (!alreadyTaken && vaccineId) {
//       // عمل POST /api/vaccine/take
//       const doseDate = schedule.doses[index].day
//       const dateISO = startDate
//         ? (() => {
//             const d = new Date(startDate)
//             if (typeof doseDate === 'number') d.setDate(d.getDate() + doseDate)
//             return d.toISOString()
//           })()
//         : new Date().toISOString()

//       const ok = await takeDose({ id: vaccineId, date: dateISO })
//       if (!ok) return  // لو فشل متحدثش الـ UI
//     }

//     setTakenDoses(prev =>
//       alreadyTaken ? prev.filter(i => i !== index) : [...prev, index],
//     )
//   }

//   const handleSave = async () => {
//     if (!pet.trim() || !startDate) return

//     const id = await addVaccineFromSchedule(schedule, {   // ← string | null
//       pet:       pet.trim(),
//       startDate: new Date(startDate).toISOString(),
//       reminder:  true,
//     })

//     if (id) {
//       setVaccineId(id)        // ← احفظ الـ id
//       setSaved(true)
//       setShowModal(false)

//       // mark dose 0 as taken locally (بدون POST تاني لأن الـ save نفسه بيسجل الدوز الأولى)
//       if (!takenDoses.includes(0)) {
//         setTakenDoses(prev => [...prev, 0])
//       }

//       onSaved?.()             // ← refresh الـ list في الـ parent
//     }
//   }

// }

//   return (
//     <div className="mt-3">
//       {/* Date picker */}
//       <div className="mb-3">
//         <label className="form-label small fw-semibold">
//           📅 Set Day 0 (Exposure / Start Date):
//         </label>
//         <input
//           type="date"
//           className="form-control"
//           style={{ maxWidth: 220 }}
//           value={startDate}
//           onChange={e => setStartDate(e.target.value)}
//         />
//       </div>

//       {/* Timeline */}
//       <div style={{ overflowX: 'auto' }}>
//         <div
//           style={{
//             display:   'flex',
//             alignItems: 'center',
//             gap:        0,
//             minWidth:   schedule.doses.length * 110,
//             padding:    '8px 0 16px',
//           }}
//         >
//           {schedule.doses.map((dose, i) => {
//             const taken     = takenDoses.includes(i)
//             const isCurrent = i === nextDoseIndex
//             const doseDate  = getDoseDate(dose.day)

//             return (
//               <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
//                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90 }}>
//                   <button
//                     onClick={() => toggleDose(i)}
//                     title={taken ? 'Click to undo' : 'Click to mark as taken'}
//                     style={{
//                       width:      44,
//                       height:     44,
//                       borderRadius: '50%',
//                       border:     taken ? '3px solid #198754' : isCurrent ? '3px solid #0d6efd' : '2px solid #ccc',
//                       background: taken ? '#198754'           : isCurrent ? '#e7f1ff'           : '#f8f9fa',
//                       color:      taken ? '#fff'              : isCurrent ? '#0d6efd'           : '#999',
//                       fontWeight: 700,
//                       fontSize:   '1.1rem',
//                       cursor:     'pointer',
//                       display:    'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       boxShadow:  isCurrent ? '0 0 0 4px rgba(13,110,253,0.15)' : 'none',
//                       transition: 'all 0.2s',
//                     }}
//                   >
//                     {taken ? '✓' : i + 1}
//                   </button>

//                   <div style={{ fontSize: '0.72rem', fontWeight: 600, marginTop: 6, color: taken ? '#198754' : isCurrent ? '#0d6efd' : '#666' }}>
//                     {dose.label}
//                   </div>
//                   {doseDate && (
//                     <div style={{ fontSize: '0.65rem', color: '#888', marginTop: 2 }}>{doseDate}</div>
//                   )}
//                   <div style={{ fontSize: '0.62rem', color: '#aaa', marginTop: 2, textAlign: 'center', maxWidth: 88 }}>
//                     {dose.note}
//                   </div>
//                 </div>

//                 {i < schedule.doses.length - 1 && (
//                   <div style={{ flex: 1, height: 2, background: takenDoses.includes(i) ? '#198754' : '#dee2e6', minWidth: 16 }} />
//                 )}
//               </div>
//             )
//           })}
//         </div>
//       </div>

//       {/* Next dose banner */}
//       {nextDoseIndex >= 0 && startDate && typeof schedule.doses[nextDoseIndex].day === 'number' && (
//         <div style={{ background: '#e7f1ff', borderRadius: 8, padding: '10px 16px', display: 'inline-block', marginTop: 4, fontSize: '0.9rem', color: '#0d6efd', fontWeight: 500 }}>
//           🕐 Next dose ({schedule.doses[nextDoseIndex].label}){' '}
//           {getDoseDate(schedule.doses[nextDoseIndex].day)
//             ? `on ${getDoseDate(schedule.doses[nextDoseIndex].day)}`
//             : ''}
//         </div>
//       )}

//       {/* Complete banner */}
//       {takenDoses.length === schedule.doses.length && (
//         <div style={{ background: '#d1fae5', borderRadius: 8, padding: '10px 16px', marginTop: 8, color: '#065f46', fontWeight: 600 }}>
//           ✅ All doses recorded. Course complete!
//         </div>
//       )}

//       {/* Saved confirmation */}
//       {saved && (
//         <div style={{ background: '#d1fae5', borderRadius: 8, padding: '10px 16px', marginTop: 8, color: '#065f46', fontWeight: 600 }}>
//           ✅ Schedule saved to your vaccine tracker!
//         </div>
//       )}

//       {/* Record button — opens modal */}
//       {nextDoseIndex >= 0 && !saved && (
//         <button
//           onClick={() => setShowModal(true)}
//           disabled={!startDate}
//           title={!startDate ? 'Please set a start date first' : ''}
//           style={{
//             background:   !startDate ? '#adb5bd' : '#198754',
//             color:        '#fff',
//             border:       'none',
//             borderRadius: 8,
//             padding:      '9px 22px',
//             fontWeight:   600,
//             cursor:       !startDate ? 'not-allowed' : 'pointer',
//             marginTop:    12,
//             display:      'block',
//             transition:   'background 0.2s',
//           }}
//         >
//           💉 Record My Dose Now (Dose {nextDoseIndex + 1})
//         </button>
//       )}

//       {/* ── Modal ── */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered size="sm">
//         <Modal.Header closeButton>
//           <Modal.Title style={{ fontSize: '1rem', fontWeight: 700 }}>
//             💉 Save Vaccination Schedule
//           </Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

//           <div style={{ fontSize: '0.85rem', color: '#555', marginBottom: 12 }}>
//             <strong>{schedule.title}</strong><br />
//             <span style={{ color: '#888' }}>
//               {buildDoseDays(schedule).length} doses starting {startDate ? new Date(startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
//             </span>
//           </div>

//           <Form.Group>
//             <Form.Label className="small fw-semibold text-muted text-uppercase">
//               Patient / Pet Name *
//             </Form.Label>
//             <Form.Control
//               placeholder="e.g. Ahmed / Moly"
//               value={pet}
//               onChange={e => setPet(e.target.value)}
//               autoFocus
//             />
//           </Form.Group>
//         </Modal.Body>

//         <Modal.Footer style={{ gap: 8 }}>
//           <Button variant="light" className="border" onClick={() => setShowModal(false)} disabled={submitting}>
//             Cancel
//           </Button>
//           <Button
//             style={{ background: '#198754', border: 'none' }}
//             onClick={handleSave}
//             disabled={submitting || !pet.trim()}
//           >
//             {submitting ? 'Saving…' : 'Save Schedule'}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   )
'use client'

import { useState } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { VaccSchedule } from '../../../types/VaccSchedule'
import { useVaccine, buildDoseDays } from '../hooks/useVaccine'

export default function VaccTimeline({
  schedule,
  onSaved,
}: {
  schedule: VaccSchedule
  onSaved?: () => void
}) {
  const [takenDoses, setTakenDoses] = useState<number[]>([])
  const [startDate,  setStartDate]  = useState<string>('')
  // const [vaccineId,  setVaccineId]  = useState<string | null>(null)

  const [showModal, setShowModal] = useState(false)
  const [pet,       setPet]       = useState('')
  const [saved,     setSaved]     = useState(false)

  const { addVaccineFromSchedule, takeDose, submitting, error } = useVaccine()

  if (schedule.id === 'animal-vaccine') return null

  const nextDoseIndex = schedule.doses.findIndex((_, i) => !takenDoses.includes(i))

  const getDoseDate = (dayNum: number | string): string | null => {
    if (!startDate || typeof dayNum !== 'number') return null
    const d = new Date(startDate)
    d.setDate(d.getDate() + dayNum)
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  // const toggleDose = async (index: number) => {
  //   const alreadyTaken = takenDoses.includes(index)

  //   if (!alreadyTaken && vaccineId) {
  //     const doseDate = schedule.doses[index].day
  //     const dateISO = startDate
  //       ? (() => {
  //           const d = new Date(startDate)
  //           if (typeof doseDate === 'number') d.setDate(d.getDate() + doseDate)
  //           return d.toISOString()
  //         })()
  //       : new Date().toISOString()

  //     const ok = await takeDose({ id: vaccineId, date: dateISO })
  //     if (!ok) return
  //   }

  //   setTakenDoses(prev =>
  //     alreadyTaken ? prev.filter(i => i !== index) : [...prev, index],
  //   )
  // }

  const toggleDose = (index: number) => {
  // local only — مفيش vaccineId
  setTakenDoses(prev =>
    prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
  )
}

const handleSave = async () => {
  if (!pet.trim() || !startDate) return

  const ok = await addVaccineFromSchedule(schedule, {
    pet:       pet.trim(),
    startDate: new Date(startDate).toISOString(),
    reminder:  true,
  })

  if (ok) {
    setSaved(true)
    setShowModal(false)
    if (!takenDoses.includes(0)) {
      setTakenDoses(prev => [...prev, 0])
    }
    onSaved?.()
  }
}

  // ✅ الـ return جوه الـ function صح
  return (
    <div className="mt-3">
      {/* Date picker */}
      <div className="mb-3">
        <label className="form-label small fw-semibold">
          📅 Set Day 0 (Exposure / Start Date):
        </label>
        <input
          type="date"
          className="form-control"
          style={{ maxWidth: 220 }}
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
      </div>

      {/* Timeline */}
      <div style={{ overflowX: 'auto' }}>
        <div
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        0,
            minWidth:   schedule.doses.length * 110,
            padding:    '8px 0 16px',
          }}
        >
          {schedule.doses.map((dose, i) => {
            const taken     = takenDoses.includes(i)
            const isCurrent = i === nextDoseIndex
            const doseDate  = getDoseDate(dose.day)

            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90 }}>
                  <button
                    onClick={() => toggleDose(i)}
                    title={taken ? 'Click to undo' : 'Click to mark as taken'}
                    style={{
                      width:        44,
                      height:       44,
                      borderRadius: '50%',
                      border:     taken ? '3px solid #198754' : isCurrent ? '3px solid #0d6efd' : '2px solid #ccc',
                      background: taken ? '#198754'           : isCurrent ? '#e7f1ff'           : '#f8f9fa',
                      color:      taken ? '#fff'              : isCurrent ? '#0d6efd'           : '#999',
                      fontWeight: 700,
                      fontSize:   '1.1rem',
                      cursor:     'pointer',
                      display:    'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow:  isCurrent ? '0 0 0 4px rgba(13,110,253,0.15)' : 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    {taken ? '✓' : i + 1}
                  </button>

                  <div style={{ fontSize: '0.72rem', fontWeight: 600, marginTop: 6, color: taken ? '#198754' : isCurrent ? '#0d6efd' : '#666' }}>
                    {dose.label}
                  </div>
                  {doseDate && (
                    <div style={{ fontSize: '0.65rem', color: '#888', marginTop: 2 }}>{doseDate}</div>
                  )}
                  <div style={{ fontSize: '0.62rem', color: '#aaa', marginTop: 2, textAlign: 'center', maxWidth: 88 }}>
                    {dose.note}
                  </div>
                </div>

                {i < schedule.doses.length - 1 && (
                  <div style={{ flex: 1, height: 2, background: takenDoses.includes(i) ? '#198754' : '#dee2e6', minWidth: 16 }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Next dose banner */}
      {nextDoseIndex >= 0 && startDate && typeof schedule.doses[nextDoseIndex].day === 'number' && (
        <div style={{ background: '#e7f1ff', borderRadius: 8, padding: '10px 16px', display: 'inline-block', marginTop: 4, fontSize: '0.9rem', color: '#0d6efd', fontWeight: 500 }}>
          🕐 Next dose ({schedule.doses[nextDoseIndex].label}){' '}
          {getDoseDate(schedule.doses[nextDoseIndex].day)
            ? `on ${getDoseDate(schedule.doses[nextDoseIndex].day)}`
            : ''}
        </div>
      )}

      {/* Complete banner */}
      {takenDoses.length === schedule.doses.length && (
        <div style={{ background: '#d1fae5', borderRadius: 8, padding: '10px 16px', marginTop: 8, color: '#065f46', fontWeight: 600 }}>
          ✅ All doses recorded. Course complete!
        </div>
      )}

      {/* Saved confirmation */}
      {saved && (
        <div style={{ background: '#d1fae5', borderRadius: 8, padding: '10px 16px', marginTop: 8, color: '#065f46', fontWeight: 600 }}>
          ✅ Schedule saved to your vaccine tracker!
        </div>
      )}

      {/* Record button */}
      {nextDoseIndex >= 0 && !saved && (
        <button
          onClick={() => setShowModal(true)}
          disabled={!startDate}
          title={!startDate ? 'Please set a start date first' : ''}
          style={{
            background:   !startDate ? '#adb5bd' : '#198754',
            color:        '#fff',
            border:       'none',
            borderRadius: 8,
            padding:      '9px 22px',
            fontWeight:   600,
            cursor:       !startDate ? 'not-allowed' : 'pointer',
            marginTop:    12,
            display:      'block',
            transition:   'background 0.2s',
          }}
        >
          💉 Record My Dose Now (Dose {nextDoseIndex + 1})
        </button>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1rem', fontWeight: 700 }}>
            💉 Save Vaccination Schedule
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

          <div style={{ fontSize: '0.85rem', color: '#555', marginBottom: 12 }}>
            <strong>{schedule.title}</strong><br />
            <span style={{ color: '#888' }}>
              {buildDoseDays(schedule).length} doses starting{' '}
              {startDate
                ? new Date(startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                : '—'}
            </span>
          </div>

          <Form.Group>
            <Form.Label className="small fw-semibold text-muted text-uppercase">
              Patient / Pet Name *
            </Form.Label>
            <Form.Control
              placeholder="e.g. Ahmed / Moly"
              value={pet}
              onChange={e => setPet(e.target.value)}
              autoFocus
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer style={{ gap: 8 }}>
          <Button variant="light" className="border" onClick={() => setShowModal(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button
            style={{ background: '#198754', border: 'none' }}
            onClick={handleSave}
            disabled={submitting || !pet.trim()}
          >
            {submitting ? 'Saving…' : 'Save Schedule'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
} 