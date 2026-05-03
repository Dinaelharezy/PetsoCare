
// 'use client';

// import { useState } from 'react';

// // ─── TYPES ────────────────────────────────────────────────────────────────────

// interface NavItem { id: string; icon: string; label: string; }
// interface Stat { number: string; label: string; }
// interface SymptomPhase { label: string; color: string; items: string[]; }
// interface AnimalSymptomType { label: string; items: string[]; }
// interface ExposureCategory { cat: string; color: string; exposure: string; action: string; }
// interface VaccineScheduleRow { protocol: string; days: string; booster: string; notes: string; }
// interface PillarItem { icon: string; text: string; }
// interface ImageItem { src: string; alt: string; caption: string; }

// // ─── DATA ─────────────────────────────────────────────────────────────────────

// const NAV_ITEMS: NavItem[] = [
//   { id: 'overview',         icon: 'bi-info-circle',         label: 'Disease Overview' },
//   { id: 'transmission',    icon: 'bi-arrow-left-right',    label: 'Transmission & Mechanism' },
//   { id: 'incubation',      icon: 'bi-clock-history',       label: 'Incubation Period' },
//   { id: 'symptoms-human',  icon: 'bi-person-exclamation',  label: 'Symptoms in Humans' },
//   { id: 'symptoms-animal', icon: 'bi-heart-pulse',         label: 'Symptoms in Animals' },
//   { id: 'dangerous',       icon: 'bi-exclamation-triangle',label: 'Dangerous Practices' },
//   { id: 'prevention',      icon: 'bi-shield-check',        label: 'Prevention & Control' },
// ];

// const STATS: Stat[] = [
//   { number: '59,000+', label: 'Annual human deaths worldwide' },
//   { number: '95%',     label: 'Deaths in Asia & Africa' },
//   { number: '99%',     label: 'Caused by dog bites' },
//   { number: '100%',    label: 'Preventable with timely vaccination' },
// ];

// const HUMAN_SYMPTOMS: Record<string, SymptomPhase> = {
//   prodromal:  { label: 'Phase 1 — Prodromal (Early)',   color: '#f39c12', items: ['Fever','Headache','Sore throat','Cough','General fatigue'] },
//   excitation: { label: 'Phase 2 — Excitation',          color: '#e67e22', items: ['Tingling or pain at bite site','Anxiety, confusion, behavioral changes','Extreme sensitivity to light, sound, and touch','Hydrophobia (fear of water) — hallmark symptom','Aerophobia (fear of air drafts)','Difficulty swallowing, drooling','Respiratory muscle spasms'] },
//   paralytic:  { label: 'Phase 3 — Paralytic Rabies',    color: '#e74c3c', items: ['Unusual quietness','Mild fever and headache','Gradual paralysis from bite site','Often misdiagnosed'] },
//   advanced:   { label: 'Phase 4 — Advanced Stage',      color: '#7d2a22', items: ['Coma within ~10 days','Respiratory failure','No effective treatment once advanced'] },
// };

// const ANIMAL_SYMPTOMS: Record<string, AnimalSymptomType> = {
//   furious: { label: 'Furious Rabies',          items: ['Behavioral changes & unprovoked aggression','Repeated biting','Pica (eating non-food items)','Random running','Vocalization changes','Excessive salivation'] },
//   dumb:    { label: 'Dumb (Paralytic) Rabies', items: ['Marked paralysis (primary symptom)','Lethargy','Unusual quietness'] },
// };

// const DANGEROUS_PRACTICES: string[] = [
//   'Not vaccinating animals against rabies',
//   'Direct contact with suspected rabid animals without protection',
//   'Failing to report bites or suspected rabies cases',
//   'Handling animal saliva with bare hands',
//   'Allowing children to play with unknown animals',
// ];

// const EXPOSURE_CATEGORIES: ExposureCategory[] = [
//   { cat: 'Category I',   color: 'badge-cat-1', exposure: 'Touching or feeding the animal, or the animal licking intact (unbroken) skin',                                                                   action: 'Wash the exposed skin thoroughly. No further prophylaxis required.' },
//   { cat: 'Category II',  color: 'badge-cat-2', exposure: 'Minor bites on exposed skin, or minor scratches / abrasions without bleeding',                                                                   action: 'Wash the wound thoroughly and administer the vaccine immediately.' },
//   { cat: 'Category III', color: 'badge-cat-3', exposure: 'Single or multiple bites/scratches penetrating skin, mucous membrane contamination, licking of broken skin, or direct bat exposure', action: 'Wash wound thoroughly, administer rabies vaccine immediately, AND give rabies immunoglobulin (RIG).' },
// ];

// const VACCINE_SCHEDULE: VaccineScheduleRow[] = [
//   { protocol: '5-dose (Standard)',    days: 'Day 0, 3, 7, 14, 28',  booster: 'Day 90 (if needed)', notes: 'Most common WHO protocol' },
//   { protocol: '4-dose (Alternative)', days: 'Day 0 (×2), 7, 21/28', booster: 'Day 90 (if needed)', notes: 'Used in some countries' },
//   { protocol: 'PrEP (Pre-exposure)',  days: 'Day 0, 7, 21 or 28',   booster: 'Every 1–3 years',    notes: 'For at-risk individuals' },
// ];

// const PILLARS: PillarItem[] = [
//   { icon: 'bi-syringe',   text: 'Regular vaccination of animals' },
//   { icon: 'bi-eye-slash', text: 'Minimize contact with wild or stray animals' },
//   { icon: 'bi-shield',    text: 'Safe handling of suspected animals' },
// ];

// const ONE_HEALTH_ITEMS: string[] = [
//   'Strengthening preventive healthcare systems',
//   'Supporting vaccination programs',
//   'Reducing economic burden on healthcare',
//   'Integrating health, agriculture, and environment sectors',
// ];

// // ─── IMAGE LIGHTBOX ────────────────────────────────────────────────────────────

// function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
//   return (
//     <div
//       onClick={onClose}
//       style={{
//         position: 'fixed', inset: 0, zIndex: 9999,
//         background: 'rgba(0,0,0,0.85)',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         backdropFilter: 'blur(6px)',
//         animation: 'fadeInLb 0.2s ease',
//       }}
//     >
//       <button
//         onClick={onClose}
//         style={{
//           position: 'absolute', top: 20, right: 24,
//           background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
//           borderRadius: '50%', width: 40, height: 40,
//           color: 'white', fontSize: 20, cursor: 'pointer',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//         }}
//       >✕</button>
//       <img
//         src={src} alt={alt}
//         onClick={(e) => e.stopPropagation()}
//         style={{
//           maxWidth: '90vw', maxHeight: '85vh',
//           borderRadius: 16, boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
//           animation: 'scaleInLb 0.25s cubic-bezier(.34,1.4,.64,1)',
//         }}
//       />
//     </div>
//   );
// }

// // ─── FANCY IMAGE CARD ──────────────────────────────────────────────────────────

// function ImgCard({ src, alt, caption }: ImageItem) {
//   const [hover, setHover] = useState(false);
//   const [open, setOpen]   = useState(false);

//   return (
//     <>
//       {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
//       <div
//         onClick={() => setOpen(true)}
//         onMouseEnter={() => setHover(true)}
//         onMouseLeave={() => setHover(false)}
//         style={{
//           position: 'relative', borderRadius: 16, overflow: 'hidden', cursor: 'zoom-in',
//           boxShadow: hover ? '0 16px 40px rgba(0,0,0,0.22)' : '0 4px 16px rgba(0,0,0,0.10)',
//           transition: 'box-shadow 0.3s ease, transform 0.3s ease',
//           transform: hover ? 'translateY(-4px)' : 'none',
//           background: '#f0f0f0',
//         }}
//       >
//         <img
//           src={src} alt={alt}
//           style={{
//             width: '100%', display: 'block',
//             transition: 'transform 0.4s ease',
//             transform: hover ? 'scale(1.04)' : 'scale(1)',
//           }}
//         />
//         {/* Overlay */}
//         <div style={{
//           position: 'absolute', inset: 0,
//           background: hover
//             ? 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)'
//             : 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
//           transition: 'background 0.3s ease',
//           display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
//           padding: '12px 14px',
//         }}>
//           <p style={{ color: 'white', margin: 0, fontSize: '0.82rem', fontWeight: 500, lineHeight: 1.3 }}>
//             {caption}
//           </p>
//           {hover && (
//             <p style={{ color: 'rgba(255,255,255,0.7)', margin: '4px 0 0', fontSize: '0.75rem' }}>
//               🔍 Click to enlarge
//             </p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// // ─── IMAGE GALLERY GRID ────────────────────────────────────────────────────────

// function ImgGallery({ images, cols = 2 }: { images: ImageItem[]; cols?: number }) {
//   return (
//     <div style={{
//       display: 'grid',
//       gridTemplateColumns: `repeat(${cols}, 1fr)`,
//       gap: 14,
//       margin: '20px 0',
//     }}>
//       {images.map((img, i) => <ImgCard key={i} {...img} />)}
//     </div>
//   );
// }

// // ─── SINGLE FEATURED IMAGE ─────────────────────────────────────────────────────

// function FeaturedImg({ src, alt, caption }: ImageItem) {
//   const [open, setOpen] = useState(false);
//   const [hover, setHover] = useState(false);
//   return (
//     <>
//       {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
//       <div
//         onClick={() => setOpen(true)}
//         onMouseEnter={() => setHover(true)}
//         onMouseLeave={() => setHover(false)}
//         style={{
//           position: 'relative', borderRadius: 18, overflow: 'hidden',
//           cursor: 'zoom-in', margin: '16px 0',
//           boxShadow: hover ? '0 20px 48px rgba(0,0,0,0.2)' : '0 6px 20px rgba(0,0,0,0.1)',
//           transition: 'box-shadow 0.3s, transform 0.3s',
//           transform: hover ? 'translateY(-3px)' : 'none',
//         }}
//       >
//         <img src={src} alt={alt} style={{ width: '100%', display: 'block', transition: 'transform 0.4s', transform: hover ? 'scale(1.03)' : 'scale(1)' }} />
//         <div style={{
//           position: 'absolute', inset: 0,
//           background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)',
//           display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
//           padding: '16px 20px',
//         }}>
//           <p style={{ color: 'white', margin: 0, fontSize: '0.88rem', fontWeight: 600 }}>{caption}</p>
//           {hover && <p style={{ color: 'rgba(255,255,255,0.65)', margin: '4px 0 0', fontSize: '0.75rem' }}>🔍 Click to enlarge</p>}
//         </div>
//       </div>
//     </>
//   );
// }

// // ─── SECTION CARD ─────────────────────────────────────────────────────────────

// function SectionCard({ id, icon, title, children }: { id: string; icon: string; title: string; children: React.ReactNode }) {
//   return (
//     <div className="section-card" id={id}>
//       <div className="section-card-header"><i className={`bi ${icon}`}></i> {title}</div>
//       <div className="section-card-body">{children}</div>
//     </div>
//   );
// }

// function StatRow() {
//   return (
//     <div className="row g-3 mb-4">
//       {STATS.map((s, i) => (
//         <div className="col-6 col-md-3" key={i}>
//           <div className="stat-box">
//             <div className="stat-number">{s.number}</div>
//             <div className="stat-label">{s.label}</div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function Collapsible({ title, color = '#27ae60', children }: { title: string; color?: string; children: React.ReactNode }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="mb-2 border rounded">
//       <div
//         className="collapsible-header d-flex align-items-center justify-content-between"
//         onClick={() => setOpen(!open)}
//         style={{ borderLeft: `4px solid ${color}` }}
//       >
//         <span className="fw-semibold" style={{ fontSize: '0.92rem' }}>{title}</span>
//         <i className={`bi ${open ? 'bi-chevron-up' : 'bi-chevron-down'} text-muted`}></i>
//       </div>
//       {open && <div className="p-3 border-top">{children}</div>}
//     </div>
//   );
// }

// // ─── PAGE ─────────────────────────────────────────────────────────────────────

// export default function RabiesClient() {
//   const [activeSection, setActiveSection] = useState('overview');

//   const scrollTo = (id: string) => {
//     setActiveSection(id);
//     document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes fadeInLb  { from { opacity:0 } to { opacity:1 } }
//         @keyframes scaleInLb { from { transform: scale(0.88); opacity:0 } to { transform: scale(1); opacity:1 } }
//       `}</style>

//       <div className="container-fluid p-0">
//         <div className="row g-0">

//           {/* ── Sidebar ── */}
//           <div className="col-12 col-md-3 col-lg-2 sidebar">
//             <div className="sidebar-header"><i className="bi bi-journal-medical"></i> Sections</div>
//             {NAV_ITEMS.map((item) => (
//               <div
//                 key={item.id}
//                 className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
//                 onClick={() => scrollTo(item.id)}
//               >
//                 <span className="icon"><i className={`bi ${item.icon}`}></i></span>
//                 <span>{item.label}</span>
//               </div>
//             ))}
//           </div>

//           {/* ── Main Content ── */}
//           <div className="col-12 col-md-9 col-lg-10 main-content">
//             <StatRow />

//             {/* 1. Overview */}
//             <SectionCard id="overview" icon="bi-info-circle-fill" title="Simplified Overview of the Disease">
//               <div className="row g-4 align-items-start">
//                 <div className="col-md-7">
//                   <h6 className="fw-bold text-success mb-2">What is Rabies?</h6>
//                   <p style={{ fontSize: '0.93rem' }}>
//                     Rabies is a <strong>fatal viral disease</strong> transmitted between animals and humans. It affects
//                     the nervous system, primarily targeting carnivorous animals. The disease causes acute encephalitis
//                     and is considered one of the most dangerous zoonotic diseases due to its extremely high mortality
//                     rate in the absence of vaccination. <span className="text-muted">(WHO, 2024)</span>
//                   </p>
//                   <div className="alert-red mb-3">
//                     <i className="bi bi-exclamation-triangle-fill me-2"></i>
//                     <strong>Once symptoms appear, rabies is nearly always fatal.</strong> However, it is 100%
//                     preventable if immediate action is taken after exposure.
//                   </div>
//                   <h6 className="fw-bold text-danger mb-2">Why is Rabies Highly Feared?</h6>
//                   <ul style={{ fontSize: '0.9rem' }}>
//                     <li>Extremely high mortality rate after symptom onset</li>
//                     <li>Long incubation period may mislead the exposed individual</li>
//                     <li>Initial symptoms resemble mild flu</li>
//                     <li>Progresses to respiratory failure and coma</li>
//                   </ul>
//                   <div className="p-3 rounded mt-3" style={{ background: '#f0faf4', border: '1px solid #b2dfdb' }}>
//                     <h6 className="fw-bold text-success mb-2">Causative Agent</h6>
//                     <p style={{ fontSize: '0.88rem' }}>RNA virus — genus <em>Lyssavirus</em>, family <em>Rhabdoviridae</em>.</p>
//                     <hr />
//                     <h6 className="fw-bold text-success mb-2">Reservoir Hosts</h6>
//                     {['Foxes','Wolves','Bats','Dogs','Cats'].map((h) => (
//                       <span key={h} className="badge bg-secondary me-1">{h}</span>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="col-md-5">
//                   <FeaturedImg src="/rabies.png" alt="Rabies overview" caption="Rabies — A Zoonotic Disease Overview" />
//                 </div>
//               </div>
//               <div className="alert-green mt-3">
//                 <i className="bi bi-shield-check me-2"></i>
//                 <strong>Early diagnosis and immediate vaccination are the only effective defenses.</strong>
//               </div>
//             </SectionCard>

//             {/* 2. Transmission */}
//             <SectionCard id="transmission" icon="bi-arrow-left-right" title="Transmission Between Animals and Humans">
//               <div className="row g-4">
//                 <div className="col-md-6">
//                   <h6 className="fw-bold mb-2">Main Routes of Transmission</h6>
//                   <ul style={{ fontSize: '0.9rem' }}>
//                     <li>Bites or scratches from stray/wild dogs, cats, bats, or foxes</li>
//                     <li>Contact of infected saliva with wounds or mucous membranes</li>
//                   </ul>
//                   <h6 className="fw-bold mb-2 mt-3">Rare Routes</h6>
//                   <ul style={{ fontSize: '0.9rem' }}>
//                     <li>Inhalation of aerosolized virus (labs or bat caves)</li>
//                     <li>Organ or corneal transplantation (human-to-human)</li>
//                   </ul>
//                   <h6 className="fw-bold mb-2 mt-3">Mechanism Within the Body</h6>
//                   <div className="timeline">
//                     {[
//                       { title: 'Entry',           text: 'Virus enters through bite wound via infected saliva.',              danger: false },
//                       { title: 'Neural Travel',   text: 'Travels via peripheral nerves toward the brain.',                  danger: false },
//                       { title: 'Encephalitis',    text: 'Causes acute encephalitis once it reaches the brain.',             danger: true },
//                       { title: 'Salivary Glands', text: 'Spreads to salivary glands — enabling transmission to new hosts.', danger: true },
//                     ].map((step) => (
//                       <div key={step.title} className={`timeline-item${step.danger ? ' danger' : ''}`}>
//                         <h6>{step.title}</h6>
//                         <p style={{ fontSize: '0.85rem', color: '#555' }}>{step.text}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <ImgGallery cols={1} images={[
//                     { src: '/symp 2.png', alt: 'Transmission routes', caption: 'How Rabies Spreads Between Hosts' },
//                     { src: '/pep.png',    alt: 'PEP protocol',        caption: 'Post-Exposure Prophylaxis (PEP) Steps' },
//                   ]} />
//                 </div>
//               </div>
//               <div className="alert-orange mt-3">
//                 <i className="bi bi-bandaid me-2"></i>
//                 <strong>Any suspected exposure requires immediate wound cleansing and post-exposure vaccination (PEP).</strong>
//               </div>
//             </SectionCard>

//             {/* 3. Incubation */}
//             <SectionCard id="incubation" icon="bi-clock-history" title="Incubation Period">
//               <div className="row g-3 align-items-center">
//                 <div className="col-md-5">
//                   <div className="stat-box" style={{ background: '#f0faf4' }}>
//                     <div className="stat-number" style={{ fontSize: '1.6rem' }}>10 days – 8 months</div>
//                     <div className="stat-label mt-1">Typical incubation range (can extend up to 1 year)</div>
//                   </div>
//                 </div>
//                 <div className="col-md-7">
//                   <h6 className="fw-bold mb-2">Factors Affecting Duration</h6>
//                   <div className="table-responsive">
//                     <table className="table table-sm table-bordered" style={{ fontSize: '0.88rem' }}>
//                       <thead className="table-success">
//                         <tr><th>Factor</th><th>Effect on Incubation</th></tr>
//                       </thead>
//                       <tbody>
//                         {[
//                           { factor: 'Bite near CNS (head, neck)',       effect: 'Shorter', variant: 'danger' },
//                           { factor: 'Nerve-rich areas (hands, face)',   effect: 'Shorter', variant: 'danger' },
//                           { factor: 'High viral load / multiple bites', effect: 'Shorter', variant: 'danger' },
//                           { factor: 'Bite far from CNS',                effect: 'Longer',  variant: 'success' },
//                         ].map((row) => (
//                           <tr key={row.factor}>
//                             <td>{row.factor}</td>
//                             <td><span className={`badge bg-${row.variant}`}>{row.effect}</span></td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </SectionCard>

//             {/* 4. Symptoms in Humans */}
//             <SectionCard id="symptoms-human" icon="bi-person-exclamation" title="Rabies Symptoms in Humans">
//               <div className="row g-3 mb-3">
//                 {Object.values(HUMAN_SYMPTOMS).map((phase, idx) => (
//                   <div className="col-md-6" key={idx}>
//                     <div className="p-3 rounded h-100" style={{ border: `2px solid ${phase.color}30`, background: `${phase.color}0d` }}>
//                       <h6 className="fw-bold mb-2" style={{ color: phase.color, fontSize: '0.9rem' }}>{phase.label}</h6>
//                       <ul className="mb-0" style={{ fontSize: '0.85rem' }}>
//                         {phase.items.map((s, i) => <li key={i}>{s}</li>)}
//                       </ul>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Symptom images in a nice grid */}
//               <ImgGallery cols={3} images={[
//                 { src: '/symp 3.png',        alt: 'Symptoms diagram',        caption: 'Clinical Symptom Progression' },
//                 { src: '/symptoms human.png', alt: 'Human symptoms',          caption: 'Rabies in Humans — Visual Guide' },
//                 { src: '/symp 2.png',         alt: 'Transmission & symptoms', caption: 'Symptom Phases Overview' },
//               ]} />

//               <div className="alert-red mt-2">
//                 <i className="bi bi-clock me-2"></i>
//                 <strong>Early intervention and vaccination are crucial for survival.</strong> No effective treatment exists once the advanced stage is reached.
//               </div>
//             </SectionCard>

//             {/* 5. Symptoms in Animals */}
//             <SectionCard id="symptoms-animal" icon="bi-heart-pulse" title="Rabies Symptoms in Animals">
//               <div className="row g-3 mb-3">
//                 {Object.values(ANIMAL_SYMPTOMS).map((type, idx) => (
//                   <div className="col-md-6" key={idx}>
//                     <div className="p-3 rounded h-100" style={{ background: idx === 0 ? '#fdf0ef' : '#f0f4fd', border: '1px solid #e0e0e0' }}>
//                       <h6 className="fw-bold mb-3" style={{ color: idx === 0 ? '#c0392b' : '#2c3e8c' }}>
//                         <i className={`bi ${idx === 0 ? 'bi-lightning-fill' : 'bi-moon-fill'} me-2`}></i>
//                         {type.label}
//                       </h6>
//                       {type.items.map((s, i) => (
//                         <div key={i} className="mb-2 d-flex align-items-start gap-2" style={{ fontSize: '0.88rem' }}>
//                           <span style={{ color: idx === 0 ? '#c0392b' : '#2c3e8c', marginTop: 2 }}><i className="bi bi-dot fs-5"></i></span>
//                           {s}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <FeaturedImg src="/firstAid.png" alt="First Aid steps" caption="First Aid After Rabies Exposure — What to Do Immediately" />
//             </SectionCard>

//             {/* 6. Dangerous Practices */}
//             <SectionCard id="dangerous" icon="bi-exclamation-triangle-fill" title="Dangerous Practices Related to Rabies Exposure">
//               <div className="row g-3 mb-3">
//                 {DANGEROUS_PRACTICES.map((p, i) => (
//                   <div className="col-md-6" key={i}>
//                     <div className="d-flex align-items-start gap-2 p-3 rounded" style={{ background: '#fdf0ef', border: '1px solid #f5c6cb', fontSize: '0.9rem' }}>
//                       <span style={{ color: '#e74c3c', fontWeight: 700, fontSize: '1.1rem' }}>{i + 1}.</span>
//                       <span>{p}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="p-3 rounded" style={{ background: '#eefaf3', border: '1px solid #b2dfdb' }}>
//                 <h6 className="fw-bold text-success mb-2">Prevention relies on three main pillars:</h6>
//                 <div className="row g-2">
//                   {PILLARS.map((p, i) => (
//                     <div className="col-md-4" key={i}>
//                       <div className="pillar-card" style={{ background: '#d4edda', color: '#155724' }}>
//                         <i className={`bi ${p.icon} fs-4 d-block mb-1`}></i>
//                         {p.text}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </SectionCard>

//             {/* 7. Prevention & Control */}
//             <SectionCard id="prevention" icon="bi-shield-check" title="Prevention & Control">

//               <Collapsible title="1 — Pre-Exposure Prophylaxis (PrEP)" color="#27ae60">
//                 <div className="row g-3">
//                   <div className="col-md-7">
//                     <h6 className="fw-bold mb-2">Who Should Receive PrEP?</h6>
//                     <ul style={{ fontSize: '0.9rem' }}>
//                       <li>Laboratory workers handling rabies virus</li>
//                       <li>Veterinarians</li>
//                       <li>Animal breeders and wildlife officers</li>
//                       <li>Children living in endemic areas</li>
//                       <li>Travelers to high-risk regions</li>
//                     </ul>
//                     <div className="alert-green mt-2">
//                       <strong>Schedule:</strong> 3 doses → Day 0, Day 7, Day 21 or 28<br /><br />
//                       <strong>Injection site:</strong><br />
//                       • Adults: deltoid muscle<br />
//                       • Young children: anterolateral thigh<br />
//                       • ❌ Avoid gluteal region
//                     </div>
//                   </div>
//                   <div className="col-md-5">
//                     <FeaturedImg src="/hospital.png" alt="Hospital vaccination" caption="Pre-Exposure Vaccination at a Clinic" />
//                   </div>
//                 </div>
//               </Collapsible>

//               <Collapsible title="2 — Post-Exposure Prophylaxis (PEP)" color="#e67e22">
//                 <div className="mb-3">
//                   <h6 className="fw-bold mb-2">Immediate Wound Management</h6>
//                   <ol style={{ fontSize: '0.9rem' }}>
//                     <li>Wash the wound with water and soap for <strong>15 minutes</strong></li>
//                     <li>Apply disinfectant (70% ethyl alcohol, iodine, virucidal solution)</li>
//                     <li>Go immediately to the nearest healthcare facility</li>
//                     <li>Receive post-exposure vaccine series + RIG if indicated</li>
//                   </ol>
//                 </div>
//                 <h6 className="fw-bold mb-2">Exposure Categories &amp; Recommended Actions</h6>
//                 <div className="table-responsive mb-3">
//                   <table className="table table-sm table-bordered schedule-table" style={{ fontSize: '0.87rem' }}>
//                     <thead>
//                       <tr><th>Category</th><th>Type of Exposure</th><th>Recommended Action</th></tr>
//                     </thead>
//                     <tbody>
//                       {EXPOSURE_CATEGORIES.map((row, i) => (
//                         <tr key={i}>
//                           <td><span className={`category-badge ${row.color}`}>{row.cat}</span></td>
//                           <td>{row.exposure}</td>
//                           <td>{row.action}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="row g-3">
//                   <div className="col-md-6">
//                     <div className="p-3 rounded" style={{ background: '#f0f4fd', border: '1px solid #c5cae9' }}>
//                       <h6 className="fw-bold mb-2" style={{ color: '#3949ab' }}><i className="bi bi-droplet-fill me-1"></i> Rabies Immunoglobulin (RIG)</h6>
//                       <ul style={{ fontSize: '0.85rem' }}>
//                         <li><strong>HRIG (Human):</strong> 20 IU/kg — Day 0 with PEP</li>
//                         <li><strong>ERIG (Equine):</strong> 40 IU/kg — can give up to Day 7</li>
//                         <li>Inject around wound; remainder IM distant from vaccine site</li>
//                       </ul>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="p-3 rounded" style={{ background: '#fff9f0', border: '1px solid #ffe0b2' }}>
//                       <h6 className="fw-bold mb-2" style={{ color: '#e65100' }}><i className="bi bi-syringe me-1"></i> Vaccine Types</h6>
//                       <ul style={{ fontSize: '0.85rem' }}>
//                         <li><strong>HDCV</strong> — Human Diploid Cell Vaccine</li>
//                         <li><strong>PCECV</strong> — Purified Chick Embryo Cell Vaccine</li>
//                         <li>WHO recommends modern cell culture vaccines</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </Collapsible>

//               <Collapsible title="Vaccination Schedule Summary" color="#8e44ad">
//                 <div className="table-responsive mb-3">
//                   <table className="table table-sm table-bordered schedule-table">
//                     <thead>
//                       <tr><th>Protocol</th><th>Days</th><th>Booster</th><th>Notes</th></tr>
//                     </thead>
//                     <tbody>
//                       {VACCINE_SCHEDULE.map((row, i) => (
//                         <tr key={i} style={{ fontSize: '0.87rem' }}>
//                           <td className="fw-bold">{row.protocol}</td>
//                           <td>{row.days}</td>
//                           <td>{row.booster}</td>
//                           <td className="text-muted">{row.notes}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//                 <div className="alert-green mb-3" style={{ fontSize: '0.85rem' }}>
//                   Inject into the <strong>deltoid muscle</strong> for adults. <strong>Anterolateral thigh</strong> for young children. Gluteal region is <strong>not recommended</strong>.
//                 </div>
//                 <ImgGallery cols={2} images={[
//                   { src: '/whatToDo.png',    alt: 'What to do after bite', caption: 'Step-by-Step: What To Do After a Bite' },
//                   { src: '/vaccLocations.png', alt: 'Vaccine injection sites', caption: 'Correct Vaccine Injection Sites' },
//                 ]} />
//               </Collapsible>

//               <Collapsible title="3 — Urban Rabies Control" color="#16a085">
//                 <ul style={{ fontSize: '0.9rem' }}>
//                   <li>Vaccinate dogs and cats <strong>annually</strong></li>
//                   <li>Re-vaccinate every 1–3 years</li>
//                   <li>Recommended vaccination age: 3 months to 1 year</li>
//                   <li>Mandatory muzzling and leashing of dogs</li>
//                 </ul>
//                 <div className="alert-green">
//                   <strong>Vaccinating at least 70% of dogs</strong> in high-risk areas effectively breaks the transmission cycle.
//                 </div>
//               </Collapsible>

//               <Collapsible title="4 — Wildlife Rabies Control" color="#2980b9">
//                 <div className="row g-3 align-items-center">
//                   <div className="col-md-7">
//                     <ul style={{ fontSize: '0.9rem' }}>
//                       <li>Reduce or vaccinate stray dogs</li>
//                       <li>Avoid handling bats</li>
//                       <li>Oral baits containing vaccine for foxes</li>
//                       <li>Vaccine distribution by air-dropping in remote areas</li>
//                       <li>Investing in dog-source control is most cost-effective</li>
//                     </ul>
//                   </div>
//                   <div className="col-md-5">
//                     <FeaturedImg src="/vaccLocations.png" alt="Vaccine locations" caption="Wildlife Vaccination Strategies" />
//                   </div>
//                 </div>
//               </Collapsible>

//               <Collapsible title="5 — International Rabies Control" color="#8e44ad">
//                 <div className="row g-3 align-items-center">
//                   <div className="col-md-7">
//                     <ul style={{ fontSize: '0.9rem' }}>
//                       <li>Vaccinate animals before international travel</li>
//                       <li>Animal must be at least 12 weeks old before vaccination</li>
//                       <li>Wait 21 days after first dose before traveling to certain countries</li>
//                       <li>Animals must be microchipped before or at vaccination time</li>
//                       <li>Vaccines must be inactivated or recombinant and officially approved</li>
//                     </ul>
//                   </div>
//                   <div className="col-md-5">
//                     <FeaturedImg src="/vacc.png" alt="International vaccine" caption="International Pet Travel Requirements" />
//                   </div>
//                 </div>
//               </Collapsible>

//               <div className="mt-4 p-3 rounded" style={{ background: 'linear-gradient(135deg,#eefaf3,#e8f4fd)', border: '1px solid #b2dfdb' }}>
//                 <h6 className="fw-bold text-success mb-2">
//                   <i className="bi bi-globe me-2"></i>Rabies &amp; Egypt Vision 2030 — One Health Approach
//                 </h6>
//                 <p style={{ fontSize: '0.88rem', marginBottom: '0.5rem' }}>
//                   WHO, FAO, and OIE launched a global initiative to <strong>eliminate human rabies deaths by 2030</strong>.
//                   Egypt Vision 2030 supports this through:
//                 </p>
//                 <div className="row g-2">
//                   {ONE_HEALTH_ITEMS.map((item, i) => (
//                     <div className="col-md-6" key={i}>
//                       <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.87rem' }}>
//                         <i className="bi bi-check-circle-fill text-success"></i> {item}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//             </SectionCard>

//             <p className="text-center text-muted" style={{ fontSize: '0.8rem', marginTop: '2rem' }}>
//               Sources: WHO (2018, 2024) · Built for PetCare Health Portal
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

'use client';

import { useState } from 'react';

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface NavItem { id: string; icon: string; label: string; }
interface Stat { number: string; label: string; }
interface SymptomPhase { label: string; color: string; items: string[]; }
interface AnimalSymptomType { label: string; items: string[]; }
interface ExposureCategory { cat: string; color: string; exposure: string; action: string; }
interface VaccineScheduleRow { protocol: string; days: string; booster: string; notes: string; }
interface PillarItem { icon: string; text: string; }
interface ImageItem { src: string; alt: string; caption: string; }

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { id: 'overview',         icon: 'bi-info-circle',          label: 'Disease Overview' },
  { id: 'transmission',    icon: 'bi-arrow-left-right',     label: 'Transmission & Mechanism' },
  { id: 'incubation',      icon: 'bi-clock-history',        label: 'Incubation Period' },
  { id: 'symptoms-human',  icon: 'bi-person-exclamation',   label: 'Symptoms in Humans' },
  { id: 'symptoms-animal', icon: 'bi-heart-pulse',          label: 'Symptoms in Animals' },
  { id: 'dangerous',       icon: 'bi-exclamation-triangle', label: 'Dangerous Practices' },
  { id: 'prevention',      icon: 'bi-shield-check',         label: 'Prevention & Control' },
];

const STATS: Stat[] = [
  { number: '59,000+', label: 'Annual human deaths worldwide' },
  { number: '95%',     label: 'Deaths in Asia & Africa' },
  { number: '99%',     label: 'Caused by dog bites' },
  { number: '100%',    label: 'Preventable with timely vaccination' },
];

const HUMAN_SYMPTOMS: Record<string, SymptomPhase> = {
  prodromal:  { label: 'Phase 1 — Prodromal (Early)',   color: '#f39c12', items: ['Fever','Headache','Sore throat','Cough','General fatigue'] },
  excitation: { label: 'Phase 2 — Excitation',          color: '#e67e22', items: ['Tingling or pain at bite site','Anxiety, confusion, behavioral changes','Extreme sensitivity to light, sound, and touch','Hydrophobia (fear of water) — hallmark symptom','Aerophobia (fear of air drafts)','Difficulty swallowing, drooling','Respiratory muscle spasms'] },
  paralytic:  { label: 'Phase 3 — Paralytic Rabies',    color: '#e74c3c', items: ['Unusual quietness','Mild fever and headache','Gradual paralysis from bite site','Often misdiagnosed'] },
  advanced:   { label: 'Phase 4 — Advanced Stage',      color: '#7d2a22', items: ['Coma within ~10 days','Respiratory failure','No effective treatment once advanced'] },
};

const ANIMAL_SYMPTOMS: Record<string, AnimalSymptomType> = {
  furious: { label: 'Furious Rabies',          items: ['Behavioral changes & unprovoked aggression','Repeated biting','Pica (eating non-food items)','Random running','Vocalization changes','Excessive salivation'] },
  dumb:    { label: 'Dumb (Paralytic) Rabies', items: ['Marked paralysis (primary symptom)','Lethargy','Unusual quietness'] },
};

const DANGEROUS_PRACTICES: string[] = [
  'Not vaccinating animals against rabies',
  'Direct contact with suspected rabid animals without protection',
  'Failing to report bites or suspected rabies cases',
  'Handling animal saliva with bare hands',
  'Allowing children to play with unknown animals',
];

const EXPOSURE_CATEGORIES: ExposureCategory[] = [
  { cat: 'Category I',   color: 'badge-cat-1', exposure: 'Touching or feeding the animal, or the animal licking intact (unbroken) skin',                                                                   action: 'Wash the exposed skin thoroughly. No further prophylaxis required.' },
  { cat: 'Category II',  color: 'badge-cat-2', exposure: 'Minor bites on exposed skin, or minor scratches / abrasions without bleeding',                                                                   action: 'Wash the wound thoroughly and administer the vaccine immediately.' },
  { cat: 'Category III', color: 'badge-cat-3', exposure: 'Single or multiple bites/scratches penetrating skin, mucous membrane contamination, licking of broken skin, or direct bat exposure',             action: 'Wash wound thoroughly, administer rabies vaccine immediately, AND give rabies immunoglobulin (RIG).' },
];

const VACCINE_SCHEDULE: VaccineScheduleRow[] = [
  { protocol: '5-dose (Standard)',    days: 'Day 0, 3, 7, 14, 28',  booster: 'Day 90 (if needed)', notes: 'Most common WHO protocol' },
  { protocol: '4-dose (Alternative)', days: 'Day 0 (×2), 7, 21/28', booster: 'Day 90 (if needed)', notes: 'Used in some countries' },
  { protocol: 'PrEP (Pre-exposure)',  days: 'Day 0, 7, 21 or 28',   booster: 'Every 1–3 years',    notes: 'For at-risk individuals' },
];

const PILLARS: PillarItem[] = [
  { icon: 'bi-syringe',   text: 'Regular vaccination of animals' },
  { icon: 'bi-eye-slash', text: 'Minimize contact with wild or stray animals' },
  { icon: 'bi-shield',    text: 'Safe handling of suspected animals' },
];

const ONE_HEALTH_ITEMS: string[] = [
  'Strengthening preventive healthcare systems',
  'Supporting vaccination programs',
  'Reducing economic burden on healthcare',
  'Integrating health, agriculture, and environment sectors',
];

// ─── IMAGE LIGHTBOX ────────────────────────────────────────────────────────────

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(8px)',
        animation: 'fadeInLb 0.2s ease',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 24,
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '50%', width: 44, height: 44,
          color: 'white', fontSize: 20, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
      >✕</button>
      <img
        src={src} alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw', maxHeight: '85vh',
          borderRadius: 20,
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
          animation: 'scaleInLb 0.25s cubic-bezier(.34,1.4,.64,1)',
        }}
      />
    </div>
  );
}
function TransmissionPanel({
  src, alt, label, title, sub, accent, flex,
}: {
  src: string; alt: string; label: string;
  title: string; sub: string; accent: string; flex?: number;
}) {
  const [hover, setHover] = useState(false);
  const [open, setOpen]   = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
      <div
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          flex: flex ?? 1,
          position: 'relative',
          borderRadius: 14,
          overflow: 'hidden',
          cursor: 'zoom-in',
          minHeight: 140,
          boxShadow: hover
            ? '0 16px 40px rgba(0,0,0,0.28)'
            : '0 4px 14px rgba(0,0,0,0.12)',
          transition: 'box-shadow 0.3s, transform 0.3s',
          transform: hover ? 'translateY(-3px)' : 'none',
          background: '#111',
        }}
      >
        {/* Shimmer */}
        {!loaded && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg,#1a1a1a 25%,#2a2a2a 50%,#1a1a1a 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s infinite',
          }} />
        )}

        {/* Image */}
        <img
          src={src} alt={alt}
          onLoad={() => setLoaded(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: loaded ? (hover ? 0.55 : 0.4) : 0,
            transition: 'opacity 0.4s, transform 0.4s',
            transform: hover ? 'scale(1.06)' : 'scale(1)',
          }}
        />

        {/* Gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg, ${accent}cc 0%, rgba(0,0,0,0.7) 100%)`,
          opacity: hover ? 0.85 : 1,
          transition: 'opacity 0.3s',
        }} />

        {/* Content */}
        <div style={{
          position: 'absolute', inset: 0,
          padding: '14px 16px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          {/* Top: number badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 28, height: 28, borderRadius: 8,
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,255,255,0.2)',
            fontSize: '0.7rem', fontWeight: 700, color: '#fff',
          }}>
            {label}
          </div>

          {/* Bottom: title + sub */}
          <div>
            <div style={{
              fontSize: '0.85rem', fontWeight: 700, color: '#fff',
              textShadow: '0 1px 6px rgba(0,0,0,0.5)',
              transform: hover ? 'translateY(-2px)' : 'none',
              transition: 'transform 0.3s',
            }}>
              {title}
            </div>
            <div style={{
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.7)',
              marginTop: 3,
              opacity: hover ? 1 : 0.8,
              transition: 'opacity 0.3s',
            }}>
              {sub}
            </div>
            {/* Accent line */}
            <div style={{
              height: 2, borderRadius: 2,
              background: accent,
              marginTop: 8,
              width: hover ? '100%' : '30%',
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>

        {/* Zoom hint */}
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: 'rgba(0,0,0,0.4)',
          borderRadius: 6, padding: '3px 8px',
          fontSize: '0.65rem', color: '#fff',
          backdropFilter: 'blur(4px)',
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.25s',
        }}>
          ⤡ Zoom
        </div>
      </div>
    </>
  );
}
// ─── FANCY IMAGE CARD ──────────────────────────────────────────────────────────

function ImgCard({ src, alt, caption }: ImageItem) {
  const [hover, setHover]   = useState(false);
  const [open, setOpen]     = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
      <div
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: 'relative',
          borderRadius: 14,
          overflow: 'hidden',
          cursor: 'zoom-in',
          aspectRatio: '4/3',
          boxShadow: hover
            ? '0 20px 50px rgba(0,0,0,0.25)'
            : '0 4px 16px rgba(0,0,0,0.10)',
          transition: 'box-shadow 0.35s ease, transform 0.35s ease',
          transform: hover ? 'translateY(-5px) scale(1.01)' : 'none',
          background: '#e8e8e8',
        }}
      >
        {/* Shimmer while loading */}
        {!loaded && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s infinite',
          }} />
        )}
        <img
          src={src} alt={alt}
          onLoad={() => setLoaded(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.45s ease',
            transform: hover ? 'scale(1.06)' : 'scale(1)',
            opacity: loaded ? 1 : 0,
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hover
            ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)'
            : 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
          transition: 'background 0.35s ease',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '14px 16px',
        }}>
          <p style={{
            color: 'white', margin: 0,
            fontSize: '0.82rem', fontWeight: 600,
            lineHeight: 1.35,
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
          }}>
            {caption}
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5, marginTop: 5,
            opacity: hover ? 1 : 0,
            transform: hover ? 'translateY(0)' : 'translateY(4px)',
            transition: 'opacity 0.25s, transform 0.25s',
          }}>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)' }}>
              🔍 Click to enlarge
            </span>
          </div>
        </div>

        {/* Top-right zoom badge */}
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: 'rgba(0,0,0,0.45)',
          borderRadius: 8, padding: '4px 8px',
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.25s',
          fontSize: '0.7rem', color: '#fff',
          backdropFilter: 'blur(4px)',
        }}>
          ⤡ Zoom
        </div>
      </div>
    </>
  );
}

// ─── IMAGE GALLERY GRID ────────────────────────────────────────────────────────

function ImgGallery({ images, cols = 2 }: { images: ImageItem[]; cols?: number }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 16,
      margin: '20px 0',
    }}>
      {images.map((img, i) => <ImgCard key={i} {...img} />)}
    </div>
  );
}

// ─── SINGLE FEATURED IMAGE ─────────────────────────────────────────────────────

function FeaturedImg({ src, alt, caption }: ImageItem) {
  const [open, setOpen]     = useState(false);
  const [hover, setHover]   = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
      <div
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: 'relative',
          borderRadius: 18,
          overflow: 'hidden',
          cursor: 'zoom-in',
          margin: '16px 0',
          aspectRatio: '16/7',
          boxShadow: hover
            ? '0 24px 56px rgba(0,0,0,0.22)'
            : '0 6px 24px rgba(0,0,0,0.10)',
          transition: 'box-shadow 0.35s, transform 0.35s',
          transform: hover ? 'translateY(-3px)' : 'none',
          background: '#e8e8e8',
        }}
      >
        {/* Shimmer */}
        {!loaded && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s infinite',
          }} />
        )}
        <img
          src={src} alt={alt}
          onLoad={() => setLoaded(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.45s ease',
            transform: hover ? 'scale(1.04)' : 'scale(1)',
            opacity: loaded ? 1 : 0,
          }}
        />
        {/* Gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '18px 22px',
        }}>
          <p style={{
            color: 'white', margin: 0,
            fontSize: '0.9rem', fontWeight: 700,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            letterSpacing: '0.01em',
          }}>
            {caption}
          </p>
          <p style={{
            color: 'rgba(255,255,255,0.65)',
            margin: '5px 0 0', fontSize: '0.76rem',
            opacity: hover ? 1 : 0,
            transform: hover ? 'translateY(0)' : 'translateY(4px)',
            transition: 'opacity 0.25s, transform 0.25s',
          }}>
            🔍 Click to enlarge
          </p>
        </div>

        {/* Corner badge */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(0,0,0,0.4)',
          borderRadius: 10, padding: '5px 10px',
          fontSize: '0.72rem', color: '#fff',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.15)',
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.25s',
        }}>
          ⤡ Zoom
        </div>
      </div>
    </>
  );
}

// ─── SECTION CARD ─────────────────────────────────────────────────────────────

function SectionCard({ id, icon, title, children }: { id: string; icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="section-card" id={id}>
      <div className="section-card-header"><i className={`bi ${icon}`}></i> {title}</div>
      <div className="section-card-body">{children}</div>
    </div>
  );
}

function StatRow() {
  return (
    <div className="row g-3 mb-4">
      {STATS.map((s, i) => (
        <div className="col-6 col-md-3" key={i}>
          <div className="stat-box">
            <div className="stat-number">{s.number}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Collapsible({ title, color = '#27ae60', children }: { title: string; color?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-2 border rounded">
      <div
        className="collapsible-header d-flex align-items-center justify-content-between"
        onClick={() => setOpen(!open)}
        style={{ borderLeft: `4px solid ${color}` }}
      >
        <span className="fw-semibold" style={{ fontSize: '0.92rem' }}>{title}</span>
        <i className={`bi ${open ? 'bi-chevron-up' : 'bi-chevron-down'} text-muted`}></i>
      </div>
      {open && <div className="p-3 border-top">{children}</div>}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function RabiesClient() {
  const [activeSection, setActiveSection] = useState('overview');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <style>{`
        @keyframes fadeInLb  { from { opacity:0 } to { opacity:1 } }
        @keyframes scaleInLb { from { transform: scale(0.88); opacity:0 } to { transform: scale(1); opacity:1 } }
        @keyframes shimmer   { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
      `}</style>

      <div className="container-fluid p-0">
        <div className="row g-0">

          {/* ── Sidebar ── */}
          <div className="col-12 col-md-3 col-lg-2 sidebar">
            <div className="sidebar-header"><i className="bi bi-journal-medical"></i> Sections</div>
            {NAV_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                <span className="icon"><i className={`bi ${item.icon}`}></i></span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* ── Main Content ── */}
          <div className="col-12 col-md-9 col-lg-10 main-content">
            <StatRow />

            {/* 1. Overview */}
            <SectionCard id="overview" icon="bi-info-circle-fill" title="Simplified Overview of the Disease">
              <div className="row g-4 align-items-start">
                <div className="col-md-7">
                  <h6 className="fw-bold text-success mb-2">What is Rabies?</h6>
                  <p style={{ fontSize: '0.93rem' }}>
                    Rabies is a <strong>fatal viral disease</strong> transmitted between animals and humans. It affects
                    the nervous system, primarily targeting carnivorous animals. The disease causes acute encephalitis
                    and is considered one of the most dangerous zoonotic diseases due to its extremely high mortality
                    rate in the absence of vaccination. <span className="text-muted">(WHO, 2024)</span>
                  </p>
                  <div className="alert-red mb-3">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <strong>Once symptoms appear, rabies is nearly always fatal.</strong> However, it is 100%
                    preventable if immediate action is taken after exposure.
                  </div>
                  <h6 className="fw-bold text-danger mb-2">Why is Rabies Highly Feared?</h6>
                  <ul style={{ fontSize: '0.9rem' }}>
                    <li>Extremely high mortality rate after symptom onset</li>
                    <li>Long incubation period may mislead the exposed individual</li>
                    <li>Initial symptoms resemble mild flu</li>
                    <li>Progresses to respiratory failure and coma</li>
                  </ul>
                  <div className="p-3 rounded mt-3" style={{ background: '#f0faf4', border: '1px solid #b2dfdb' }}>
                    <h6 className="fw-bold text-success mb-2">Causative Agent</h6>
                    <p style={{ fontSize: '0.88rem' }}>RNA virus — genus <em>Lyssavirus</em>, family <em>Rhabdoviridae</em>.</p>
                    <hr />
                    <h6 className="fw-bold text-success mb-2">Reservoir Hosts</h6>
                    {['Foxes','Wolves','Bats','Dogs','Cats'].map((h) => (
                      <span key={h} className="badge bg-secondary me-1">{h}</span>
                    ))}
                  </div>
                </div>
                <div className="col-md-5">
                  <FeaturedImg src="/rabies.png" alt="Rabies overview" caption="Rabies — A Zoonotic Disease Overview" />
                </div>
              </div>
              <div className="alert-green mt-3">
                <i className="bi bi-shield-check me-2"></i>
                <strong>Early diagnosis and immediate vaccination are the only effective defenses.</strong>
              </div>
            </SectionCard>

            {/* 2. Transmission */}
            {/* <SectionCard id="transmission" icon="bi-arrow-left-right" title="Transmission Between Animals and Humans">
              <div className="row g-4">
                <div className="col-md-6">
                  <h6 className="fw-bold mb-2">Main Routes of Transmission</h6>
                  <ul style={{ fontSize: '0.9rem' }}>
                    <li>Bites or scratches from stray/wild dogs, cats, bats, or foxes</li>
                    <li>Contact of infected saliva with wounds or mucous membranes</li>
                  </ul>
                  <h6 className="fw-bold mb-2 mt-3">Rare Routes</h6>
                  <ul style={{ fontSize: '0.9rem' }}>
                    <li>Inhalation of aerosolized virus (labs or bat caves)</li>
                    <li>Organ or corneal transplantation (human-to-human)</li>
                  </ul>
                  <h6 className="fw-bold mb-2 mt-3">Mechanism Within the Body</h6>
                  <div className="timeline">
                    {[
                      { title: 'Entry',           text: 'Virus enters through bite wound via infected saliva.',              danger: false },
                      { title: 'Neural Travel',   text: 'Travels via peripheral nerves toward the brain.',                  danger: false },
                      { title: 'Encephalitis',    text: 'Causes acute encephalitis once it reaches the brain.',             danger: true },
                      { title: 'Salivary Glands', text: 'Spreads to salivary glands — enabling transmission to new hosts.', danger: true },
                    ].map((step) => (
                      <div key={step.title} className={`timeline-item${step.danger ? ' danger' : ''}`}>
                        <h6>{step.title}</h6>
                        <p style={{ fontSize: '0.85rem', color: '#555' }}>{step.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-md-6">
                  <ImgGallery cols={1} images={[
                    { src: '/symp 2.png', alt: 'Transmission routes', caption: 'How Rabies Spreads Between Hosts' },
                    { src: '/pep.png',    alt: 'PEP protocol',        caption: 'Post-Exposure Prophylaxis (PEP) Steps' },
                  ]} />
                </div>
              </div>
              <div className="alert-orange mt-3">
                <i className="bi bi-bandaid me-2"></i>
                <strong>Any suspected exposure requires immediate wound cleansing and post-exposure vaccination (PEP).</strong>
              </div>
            </SectionCard> */}

            {/* 2. Transmission */}
<SectionCard id="transmission" icon="bi-arrow-left-right" title="Transmission Between Animals and Humans">
  <div className="row g-4">
    <div className="col-md-6">
      <h6 className="fw-bold mb-2">Main Routes of Transmission</h6>
      <ul style={{ fontSize: '0.9rem' }}>
        <li>Bites or scratches from stray/wild dogs, cats, bats, or foxes</li>
        <li>Contact of infected saliva with wounds or mucous membranes</li>
      </ul>
      <h6 className="fw-bold mb-2 mt-3">Rare Routes</h6>
      <ul style={{ fontSize: '0.9rem' }}>
        <li>Inhalation of aerosolized virus (labs or bat caves)</li>
        <li>Organ or corneal transplantation (human-to-human)</li>
      </ul>
      <h6 className="fw-bold mb-2 mt-3">Mechanism Within the Body</h6>
      <div className="timeline">
        {[
          { title: 'Entry',           text: 'Virus enters through bite wound via infected saliva.',               danger: false },
          { title: 'Neural Travel',   text: 'Travels via peripheral nerves toward the brain.',                   danger: false },
          { title: 'Encephalitis',    text: 'Causes acute encephalitis once it reaches the brain.',              danger: true  },
          { title: 'Salivary Glands', text: 'Spreads to salivary glands — enabling transmission to new hosts.',  danger: true  },
        ].map((step) => (
          <div key={step.title} className={`timeline-item${step.danger ? ' danger' : ''}`}>
            <h6>{step.title}</h6>
            <p style={{ fontSize: '0.85rem', color: '#555' }}>{step.text}</p>
          </div>
        ))}
      </div>
    </div>

    {/* ── Stacked cinematic panels ── */}
    <div className="col-md-6 d-flex flex-column gap-3">

      {/* Panel 1 — full-width tall */}
      <TransmissionPanel
        src="/symp 2.png"
        alt="Transmission routes"
        label="01"
        title="How Rabies Spreads"
        sub="Bite → Saliva → Nervous System"
        accent="#e74c3c"
      />

      {/* Panel 2 — split: image left + stats right */}
      <div style={{ display: 'flex', gap: 12, height: 140 }}>
        <TransmissionPanel
          src="/pep.png"
          alt="PEP protocol"
          label="02"
          title="PEP Steps"
          sub="Post-Exposure Protocol"
          accent="#e67e22"
          flex={1.4}
        />
        {/* Mini stat card */}
        <div style={{
          flex: 1,
          borderRadius: 14,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 16, gap: 6,
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#e74c3c', lineHeight: 1 }}>99%</div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)', textAlign: 'center', lineHeight: 1.4 }}>
            of human rabies cases caused by dog bites
          </div>
          <div style={{ width: 32, height: 2, background: '#e74c3c', borderRadius: 2, marginTop: 4 }} />
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>WHO</div>
          <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)' }}>2024</div>
        </div>
      </div>

    </div>
  </div>

  <div className="alert-orange mt-3">
    <i className="bi bi-bandaid me-2"></i>
    <strong>Any suspected exposure requires immediate wound cleansing and post-exposure vaccination (PEP).</strong>
  </div>
</SectionCard>

            {/* 3. Incubation */}
            <SectionCard id="incubation" icon="bi-clock-history" title="Incubation Period">
              <div className="row g-3 align-items-center">
                <div className="col-md-5">
                  <div className="stat-box" style={{ background: '#f0faf4' }}>
                    <div className="stat-number" style={{ fontSize: '1.6rem' }}>10 days – 8 months</div>
                    <div className="stat-label mt-1">Typical incubation range (can extend up to 1 year)</div>
                  </div>
                </div>
                <div className="col-md-7">
                  <h6 className="fw-bold mb-2">Factors Affecting Duration</h6>
                  <div className="table-responsive">
                    <table className="table table-sm table-bordered" style={{ fontSize: '0.88rem' }}>
                      <thead className="table-success">
                        <tr><th>Factor</th><th>Effect on Incubation</th></tr>
                      </thead>
                      <tbody>
                        {[
                          { factor: 'Bite near CNS (head, neck)',       effect: 'Shorter', variant: 'danger' },
                          { factor: 'Nerve-rich areas (hands, face)',   effect: 'Shorter', variant: 'danger' },
                          { factor: 'High viral load / multiple bites', effect: 'Shorter', variant: 'danger' },
                          { factor: 'Bite far from CNS',                effect: 'Longer',  variant: 'success' },
                        ].map((row) => (
                          <tr key={row.factor}>
                            <td>{row.factor}</td>
                            <td><span className={`badge bg-${row.variant}`}>{row.effect}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* 4. Symptoms in Humans */}
            <SectionCard id="symptoms-human" icon="bi-person-exclamation" title="Rabies Symptoms in Humans">
              <div className="row g-3 mb-3">
                {Object.values(HUMAN_SYMPTOMS).map((phase, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="p-3 rounded h-100" style={{ border: `2px solid ${phase.color}30`, background: `${phase.color}0d` }}>
                      <h6 className="fw-bold mb-2" style={{ color: phase.color, fontSize: '0.9rem' }}>{phase.label}</h6>
                      <ul className="mb-0" style={{ fontSize: '0.85rem' }}>
                        {phase.items.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              <ImgGallery cols={3} images={[
                { src: '/symp 3.png',         alt: 'Symptoms diagram',        caption: 'Clinical Symptom Progression' },
                { src: '/symptoms human.png', alt: 'Human symptoms',          caption: 'Rabies in Humans — Visual Guide' },
                { src: '/symp 2.png',         alt: 'Transmission & symptoms', caption: 'Symptom Phases Overview' },
              ]} />
              <div className="alert-red mt-2">
                <i className="bi bi-clock me-2"></i>
                <strong>Early intervention and vaccination are crucial for survival.</strong> No effective treatment exists once the advanced stage is reached.
              </div>
            </SectionCard>

            {/* 5. Symptoms in Animals */}
            <SectionCard id="symptoms-animal" icon="bi-heart-pulse" title="Rabies Symptoms in Animals">
              <div className="row g-3 mb-3">
                {Object.values(ANIMAL_SYMPTOMS).map((type, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="p-3 rounded h-100" style={{ background: idx === 0 ? '#fdf0ef' : '#f0f4fd', border: '1px solid #e0e0e0' }}>
                      <h6 className="fw-bold mb-3" style={{ color: idx === 0 ? '#c0392b' : '#2c3e8c' }}>
                        <i className={`bi ${idx === 0 ? 'bi-lightning-fill' : 'bi-moon-fill'} me-2`}></i>
                        {type.label}
                      </h6>
                      {type.items.map((s, i) => (
                        <div key={i} className="mb-2 d-flex align-items-start gap-2" style={{ fontSize: '0.88rem' }}>
                          <span style={{ color: idx === 0 ? '#c0392b' : '#2c3e8c', marginTop: 2 }}><i className="bi bi-dot fs-5"></i></span>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <FeaturedImg src="/firstAid.png" alt="First Aid steps" caption="First Aid After Rabies Exposure — What to Do Immediately" />
            </SectionCard>

            {/* 6. Dangerous Practices */}
            <SectionCard id="dangerous" icon="bi-exclamation-triangle-fill" title="Dangerous Practices Related to Rabies Exposure">
              <div className="row g-3 mb-3">
                {DANGEROUS_PRACTICES.map((p, i) => (
                  <div className="col-md-6" key={i}>
                    <div className="d-flex align-items-start gap-2 p-3 rounded" style={{ background: '#fdf0ef', border: '1px solid #f5c6cb', fontSize: '0.9rem' }}>
                      <span style={{ color: '#e74c3c', fontWeight: 700, fontSize: '1.1rem' }}>{i + 1}.</span>
                      <span>{p}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded" style={{ background: '#eefaf3', border: '1px solid #b2dfdb' }}>
                <h6 className="fw-bold text-success mb-2">Prevention relies on three main pillars:</h6>
                <div className="row g-2">
                  {PILLARS.map((p, i) => (
                    <div className="col-md-4" key={i}>
                      <div className="pillar-card" style={{ background: '#d4edda', color: '#155724' }}>
                        <i className={`bi ${p.icon} fs-4 d-block mb-1`}></i>
                        {p.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* 7. Prevention & Control */}
            <SectionCard id="prevention" icon="bi-shield-check" title="Prevention & Control">

              <Collapsible title="1 — Pre-Exposure Prophylaxis (PrEP)" color="#27ae60">
                <div className="row g-3">
                  <div className="col-md-7">
                    <h6 className="fw-bold mb-2">Who Should Receive PrEP?</h6>
                    <ul style={{ fontSize: '0.9rem' }}>
                      <li>Laboratory workers handling rabies virus</li>
                      <li>Veterinarians</li>
                      <li>Animal breeders and wildlife officers</li>
                      <li>Children living in endemic areas</li>
                      <li>Travelers to high-risk regions</li>
                    </ul>
                    <div className="alert-green mt-2">
                      <strong>Schedule:</strong> 3 doses → Day 0, Day 7, Day 21 or 28<br /><br />
                      <strong>Injection site:</strong><br />
                      • Adults: deltoid muscle<br />
                      • Young children: anterolateral thigh<br />
                      • ❌ Avoid gluteal region
                    </div>
                  </div>
               
                </div>
              </Collapsible>

              <Collapsible title="2 — Post-Exposure Prophylaxis (PEP)" color="#e67e22">
                <div className="mb-3">
                  <h6 className="fw-bold mb-2">Immediate Wound Management</h6>
                  <ol style={{ fontSize: '0.9rem' }}>
                    <li>Wash the wound with water and soap for <strong>15 minutes</strong></li>
                    <li>Apply disinfectant (70% ethyl alcohol, iodine, virucidal solution)</li>
                    <li>Go immediately to the nearest healthcare facility</li>
                    <li>Receive post-exposure vaccine series + RIG if indicated</li>
                  </ol>
                </div>
                <h6 className="fw-bold mb-2">Exposure Categories &amp; Recommended Actions</h6>
                <div className="table-responsive mb-3">
                  <table className="table table-sm table-bordered schedule-table" style={{ fontSize: '0.87rem' }}>
                    <thead>
                      <tr><th>Category</th><th>Type of Exposure</th><th>Recommended Action</th></tr>
                    </thead>
                    <tbody>
                      {EXPOSURE_CATEGORIES.map((row, i) => (
                        <tr key={i}>
                          <td><span className={`category-badge ${row.color}`}>{row.cat}</span></td>
                          <td>{row.exposure}</td>
                          <td>{row.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="p-3 rounded" style={{ background: '#f0f4fd', border: '1px solid #c5cae9' }}>
                      <h6 className="fw-bold mb-2" style={{ color: '#3949ab' }}><i className="bi bi-droplet-fill me-1"></i> Rabies Immunoglobulin (RIG)</h6>
                      <ul style={{ fontSize: '0.85rem' }}>
                        <li><strong>HRIG (Human):</strong> 20 IU/kg — Day 0 with PEP</li>
                        <li><strong>ERIG (Equine):</strong> 40 IU/kg — can give up to Day 7</li>
                        <li>Inject around wound; remainder IM distant from vaccine site</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 rounded" style={{ background: '#fff9f0', border: '1px solid #ffe0b2' }}>
                      <h6 className="fw-bold mb-2" style={{ color: '#e65100' }}><i className="bi bi-syringe me-1"></i> Vaccine Types</h6>
                      <ul style={{ fontSize: '0.85rem' }}>
                        <li><strong>HDCV</strong> — Human Diploid Cell Vaccine</li>
                        <li><strong>PCECV</strong> — Purified Chick Embryo Cell Vaccine</li>
                        <li>WHO recommends modern cell culture vaccines</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Collapsible>

              <Collapsible title="Vaccination Schedule Summary" color="#8e44ad">
                <div className="table-responsive mb-3">
                  <table className="table table-sm table-bordered schedule-table">
                    <thead>
                      <tr><th>Protocol</th><th>Days</th><th>Booster</th><th>Notes</th></tr>
                    </thead>
                    <tbody>
                      {VACCINE_SCHEDULE.map((row, i) => (
                        <tr key={i} style={{ fontSize: '0.87rem' }}>
                          <td className="fw-bold">{row.protocol}</td>
                          <td>{row.days}</td>
                          <td>{row.booster}</td>
                          <td className="text-muted">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="alert-green mb-3" style={{ fontSize: '0.85rem' }}>
                  Inject into the <strong>deltoid muscle</strong> for adults. <strong>Anterolateral thigh</strong> for young children. Gluteal region is <strong>not recommended</strong>.
                </div>
                <ImgGallery cols={2} images={[
                  { src: '/whatToDo.png',      alt: 'What to do after bite',  caption: 'Step-by-Step: What To Do After a Bite' },
                  { src: '/vaccLocations.png', alt: 'Vaccine injection sites', caption: 'Correct Vaccine Injection Sites' },
                ]} />
              </Collapsible>

              <Collapsible title="3 — Urban Rabies Control" color="#16a085">
                <ul style={{ fontSize: '0.9rem' }}>
                  <li>Vaccinate dogs and cats <strong>annually</strong></li>
                  <li>Re-vaccinate every 1–3 years</li>
                  <li>Recommended vaccination age: 3 months to 1 year</li>
                  <li>Mandatory muzzling and leashing of dogs</li>
                </ul>
                <div className="alert-green">
                  <strong>Vaccinating at least 70% of dogs</strong> in high-risk areas effectively breaks the transmission cycle.
                </div>
              </Collapsible>

              <Collapsible title="4 — Wildlife Rabies Control" color="#2980b9">
                <div className="row g-3 align-items-center">
                  <div className="col-md-7">
                    <ul style={{ fontSize: '0.9rem' }}>
                      <li>Reduce or vaccinate stray dogs</li>
                      <li>Avoid handling bats</li>
                      <li>Oral baits containing vaccine for foxes</li>
                      <li>Vaccine distribution by air-dropping in remote areas</li>
                      <li>Investing in dog-source control is most cost-effective</li>
                    </ul>
                  </div>
                  <div className="col-md-5">
                    <FeaturedImg src="/vaccLocations.png" alt="Vaccine locations" caption="Wildlife Vaccination Strategies" />
                  </div>
                </div>
              </Collapsible>

              <Collapsible title="5 — International Rabies Control" color="#8e44ad">
                <div className="row g-3 align-items-center">
                  <div className="col-md-7">
                    <ul style={{ fontSize: '0.9rem' }}>
                      <li>Vaccinate animals before international travel</li>
                      <li>Animal must be at least 12 weeks old before vaccination</li>
                      <li>Wait 21 days after first dose before traveling to certain countries</li>
                      <li>Animals must be microchipped before or at vaccination time</li>
                      <li>Vaccines must be inactivated or recombinant and officially approved</li>
                    </ul>
                  </div>
                  <div className="col-md-5">
                    <FeaturedImg src="/vacc.png" alt="International vaccine" caption="International Pet Travel Requirements" />
                  </div>
                </div>
              </Collapsible>

              <div className="mt-4 p-3 rounded" style={{ background: 'linear-gradient(135deg,#eefaf3,#e8f4fd)', border: '1px solid #b2dfdb' }}>
                <h6 className="fw-bold text-success mb-2">
                  <i className="bi bi-globe me-2"></i>Rabies &amp; Egypt Vision 2030 — One Health Approach
                </h6>
                <p style={{ fontSize: '0.88rem', marginBottom: '0.5rem' }}>
                  WHO, FAO, and OIE launched a global initiative to <strong>eliminate human rabies deaths by 2030</strong>.
                  Egypt Vision 2030 supports this through:
                </p>
                <div className="row g-2">
                  {ONE_HEALTH_ITEMS.map((item, i) => (
                    <div className="col-md-6" key={i}>
                      <div className="d-flex align-items-center gap-2" style={{ fontSize: '0.87rem' }}>
                        <i className="bi bi-check-circle-fill text-success"></i> {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </SectionCard>

            <p className="text-center text-muted" style={{ fontSize: '0.8rem', marginTop: '2rem' }}>
              Sources: WHO (2018, 2024) · Built for PetCare Health Portal
            </p>
          </div>
        </div>
      </div>
    </>
  );
}