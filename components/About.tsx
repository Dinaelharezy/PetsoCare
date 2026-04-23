// 'use client'

// import { useEffect, useRef } from 'react'

// export default function About() {
//   const observerRef = useRef<IntersectionObserver | null>(null)

//   useEffect(() => {
//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('visible')
//           }
//         })
//       },
//       { threshold: 0.1 }
//     )

//     document.querySelectorAll('.fade-up').forEach((el) => {
//       observerRef.current?.observe(el)
//     })

//     return () => observerRef.current?.disconnect()
//   }, [])

//   const references = [
//     {
//       num: 1,
//       text: 'Centers for Disease Control and Prevention, 2025. Rabies Prevention and Control.',
//       url: 'https://www.cdc.gov/rabies/prevention/index.html',
//     },
//     {
//       num: 2,
//       text: 'Centers for Disease Control and Prevention. (2024). ACIP Recommendations: Rabies Vaccine, National Center for Immunization and Respiratory Diseases. July 29, 2024.',
//       url: null,
//     },
//     {
//       num: 3,
//       text: 'Rupprecht, C. E., Briggs, D., Brown, C. M., Franka, R., Katz, S. L., Kerr, H. D., ... & Centers for Disease Control and Prevention (CDC). (2010). Use of a reduced (4-dose) vaccine schedule for postexposure prophylaxis to prevent human rabies: recommendations of the advisory committee on immunization practices. MMWR Recomm Rep, 59(RR-2), 1-9.',
//       url: null,
//     },
//     {
//       num: 4,
//       text: 'World Health Organization (2024). Rabies. 5 June 2024.',
//       url: 'https://www.who.int/news-room/fact-sheets/detail/rabies',
//     },
//     {
//       num: 5,
//       text: 'World Health Organization. (2010). Rabies vaccines. Weekly Epidemiological Record, 85(35), 337–348.',
//       url: null,
//     },
//     {
//       num: 6,
//       text: 'World Health Organization. (2018). Rabies vaccines: WHO position paper, April 2018 – Recommendations. Vaccine, 36(37), 5500–5503.',
//       url: null,
//     },
//     {
//       num: 7,
//       text: 'World Health Organization. (2018). Zero by 30: the global strategic plan to end human deaths from dog-mediated rabies by 2030.',
//       url: null,
//     },
//     {
//       num: 8,
//       text: 'World Health Organization, 2025. World Rabies Day 2025, 28 September 2025.',
//       url: 'https://www.who.int/news-room/events/detail/2025/09/28/default-calendar/world-rabies-day-2025',
//     },
//     {
//       num: 9,
//       text: 'World Organisation for Animal Health (2025). Rabies.',
//       url: 'https://www.woah.org/en/disease/rabies/',
//     },
//     {
//       num: 10,
//       text: 'Yewale, V. N., & Shenoy, B. (2025). World Rabies Day 2025 – You, Me, and Community. Pediatric Infectious Disease, 7(3), iv–v.',
//       url: null,
//     },
//     {
//       num: 11,
//       text: 'Ministry of Health Warning: 4 urgent steps when exposed to a bite or scratch from a rabid animal. Youm7 Newspaper, Wednesday, 27 August 2025.',
//       url: 'https://share.google/tPEYUHYMR1v1Xumfz',
//     },
//     {
//       num: 12,
//       text: 'Ministry of Health and Population – Preventive Medicine and Public Health Sector, Central Administration of Public Health, General Administration for Infectious Disease Control, Arab Republic of Egypt, 2025. Key updates in the rabies prevention guidelines – August 2025.',
//       url: 'https://media.gemini.media/img/original/2025/8/11/2025_8_11_12_56_11_63.webp',
//     },
//     {
//       num: 13,
//       text: 'Port Said Veterinary Medicine Directorate.',
//       url: null,
//     },
//     {
//       num: 14,
//       text: 'Port Said Health Affairs Directorate.',
//       url: null,
//     },
//   ]

//   return (
//     <>
//       <div className="about-page">

//         {/* ===== HERO ===== */}
//         <div className="hero">
//           <div className="hero-icon">
//             <svg width="45" height="45" viewBox="0 0 24 24" fill="none">
//               <path
//                 d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"
//                 fill="white"
//                 opacity="0.9"
//               />
//               <ellipse cx="12" cy="16" rx="4" ry="2" fill="#0f7b6c" opacity="0.3" />
//               <circle cx="12" cy="12" r="3" fill="#0f7b6c" />
//               <path
//                 d="M12 7v2M12 15v2M7 12h2M15 12h2"
//                 stroke="#0f7b6c"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//               />
//             </svg>
//           </div>
//           <h1 className="hero-title " style={{ fontFamily: "'Quicksand', sans-serif" }}>PetsoCare</h1>
//           <p className="hero-subtitle">One Health – Towards a Safer Community</p>
//         </div>

//         {/* ===== MAIN CONTENT ===== */}
//         <div style={{ maxWidth: '900px', margin: '0 auto' }}>

//           {/* ===== CARD 1: About the Application ===== */}
//           <div className="section fade-up">
//             <h2 className="section-title"style={{ fontFamily: "'Quicksand', sans-serif" }}>
//               <span >🏥</span> About the Application
//             </h2>
//             <p style={{ color: '#555', lineHeight: 2, fontSize: '1rem', marginBottom: '16px' }}>
//               <strong>PetsCare</strong> is a platform that aims to spread health knowledge based on
//               scientific evidence, with a primary focus on{' '}
//               <strong style={{ color: 'var(--teal)' }}>Rabies</strong> — a viral disease transmitted
//               from animals to humans (zoonotic disease) that affects the nervous system and is usually
//               spread through the bite of an infected animal, especially dogs.
//             </p>
//             <p style={{ color: '#555', lineHeight: 2, fontSize: '1rem', marginBottom: '30px' }}>
//               The application provides information about vaccination schedules, a map of veterinarians,
//               shelter locations, as well as articles and videos explaining prevention methods and the
//               correct actions to take after exposure. It also includes data on areas where vaccinations
//               have been conducted, vaccine availability locations, and the number of reported cases to
//               help monitor the public health situation.
//             </p>

//             <div className="features-grid">
//               {[
//                 {
//                   icon: '📰',
//                   color: '#e8f4ff',
//                   title: 'Articles & Videos',
//                   desc: 'Reliable scientific content on prevention, vaccination, and handling exposures.',
//                 },
//                 {
//                   icon: '🗺️',
//                   color: '#f0fdf4',
//                   title: 'Interactive Map',
//                   desc: 'Vaccination sites, nearby vets, shelters, and affected areas.',
//                 },
//                 {
//                   icon: '💉',
//                   color: '#fff7ed',
//                   title: 'Vaccination Schedules',
//                   desc: 'Complete info on vaccination timings and centers for humans and animals.',
//                 },
//                 {
//                   icon: '🚨',
//                   color: '#fff1f2',
//                   title: 'Reporting System',
//                   desc: 'Report suspected cases and track the number of infections and vaccinations.',
//                 },
//               ].map((f, i) => (
//                 <div className="feature-card" key={i}>
//                   <div className="feature-icon" style={{ background: f.color }}>
//                     {f.icon}
//                   </div>
//                   <h5>{f.title}</h5>
//                   <p>{f.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="divider" />

//           {/* ===== CARD 2: Important Notice ===== */}
//           <div className="section fade-up">
//             <h2 className="section-title" style={{ fontFamily: "'Quicksand', sans-serif" }}>
//               <span>⚠️</span> Important Notice
//             </h2>
//             <div className="alert-box">
//               <h4>⚠️ Important Notice</h4>
//               <p>
//                 The information provided in this application is for{' '}
//                 <strong>awareness purposes only</strong> and does not replace consultation with a
//                 physician, veterinarian, or the relevant health authorities.
//               </p>
//               <p >
//                 <strong>
//                   If you are exposed to a suspected animal bite or scratch, you must immediately go
//                   to the nearest health center.
//                 </strong>
//               </p>
//             </div>
//           </div>

//           <div className="divider" />

//           {/* ===== CARD 3: Main Focus: Rabies ===== */}
//           <div className="section fade-up">
//             <h2 className="section-title " style={{ fontFamily: "'Quicksand', sans-serif" }}>
//               <span>🦠</span> Main Focus: Rabies
//             </h2>
//             <p style={{ color: '#555', lineHeight: 2, fontSize: '1rem', marginBottom: '20px' }}>
//               Rabies is considered one of the most dangerous viral diseases affecting the nervous
//               system. It is usually transmitted through the bite of an infected animal, especially
//               dogs.
//             </p>

//             <div
//               style={{
//                 background: '#f0fdf4',
//                 border: '1px solid #bbf7d0',
//                 borderRadius: '12px',
//                 padding: '20px 24px',
//                 marginBottom: '16px',
//               }}
//             >
//               <h4 style={{ color: '#166534', marginBottom: '10px', fontWeight: 700 }}>
//                 🌍 According to the World Health Organization (WHO):
//               </h4>
//               <ul style={{ color: '#555', lineHeight: 2, paddingLeft: '20px', margin: 0 }}>
//                 <li>Rabies causes tens of thousands of deaths globally every year.</li>
//                 <li>
//                   It is almost <strong>100% preventable</strong> when vaccination is received
//                   immediately after exposure.
//                 </li>
//               </ul>
//             </div>

//             <div
//               style={{
//                 background: '#eff6ff',
//                 border: '1px solid #bfdbfe',
//                 borderRadius: '12px',
//                 padding: '20px 24px',
//                 marginBottom: '30px',
//               }}
//             >
//               <h4 style={{ color: '#1e40af', marginBottom: '10px', fontWeight: 700 }}>
//                 🏥 According to the Centers for Disease Control and Prevention (CDC):
//               </h4>
//               <ul style={{ color: '#555', lineHeight: 2, paddingLeft: '20px', margin: 0 }}>
//                 <li>
//                   Washing the wound immediately and getting vaccination{' '}
//                   <strong>significantly reduces the risk of infection</strong>.
//                 </li>
//               </ul>
//             </div>

//             <div
//               style={{
//                 background: 'linear-gradient(135deg, #0f7b6c, #0a5c50)',
//                 borderRadius: '24px',
//                 padding: '50px 30px',
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
//                 gap: '30px',
//                 textAlign: 'center',
//                 margin: '30px 0',
//               }}
//             >
//               {[
//                 { value: '100%', label: 'Preventable with immediate post-exposure vaccination' },
//                 { value: '59K+', label: 'Deaths annually worldwide due to rabies (WHO)' },
//                 { value: '2030', label: 'WHO target to eliminate human dog-mediated rabies (Zero by 30)' },
//               ].map((stat, i) => (
//                 <div key={i}>
//                   <h3
//                     style={{
//                  fontFamily: "'Quicksand', sans-serif",
//                       fontSize: '2.5rem',
//                       color: '#ffffff',
//                       marginBottom: '6px',
//                       fontWeight: 900,
//                     }}
//                   >
//                     {stat.value}
//                   </h3>
//                   <p
//                     style={{
//                       color: 'rgba(255,255,255,0.75)',
//                       fontSize: '0.85rem',
//                       margin: 0,
//                       lineHeight: 1.5,
//                     }}
//                   >
//                     {stat.label}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="divider" />

//           {/* ===== CARD 4: Application Objective ===== */}
//           <div className="section fade-up">
//             <h2 className="section-title" style={{ fontFamily: "'Quicksand', sans-serif" }}>
//               <span>🎯</span> Application Objective
//             </h2>
//             <ul className="goals-list">
//               {[
//                 'Promote health awareness based on scientific evidence.',
//                 'Raise community awareness about rabies prevention methods and the correct actions to take after exposure.',
//                 'Strengthen the culture of prevention and vaccination for humans and animals through articles and videos.',
//                 'Reduce infection rates resulting from lack of awareness.',
//                 'Support public health efforts in combating rabies through a reporting system for suspected cases and monitoring shelters / animal care centers.',
//                 'Provide simple and easy-to-understand information.',
//                 'Facilitate access to vaccination locations and emergency contact numbers.',
//               ].map((goal, i) => (
//                 <li key={i}>
//                   <div className="goal-dot" />
//                   <span>{goal}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="divider" />

//           {/* ===== CARD 5: Sources ===== */}
//           <div className="section fade-up" >
//             <h2 className="section-title" style={{ fontFamily: "'Quicksand', sans-serif" }}>
//               <span>📚</span> Sources
//             </h2>
//             <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '16px' }}>
//               * Clicking on a reference number will redirect you to the corresponding source within
//               the application.
//             </p>
//             <div className="references">
//               {references.map((ref) => (
//                 <div className="ref-item" key={ref.num}>
//                   <span className="ref-num">[{ref.num}]</span>
//                   <span>
//                     {ref.text}{' '}
//                     {ref.url && (
//                       <a href={ref.url} target="_blank" rel="noopener noreferrer">
//                         {ref.url}
//                       </a>
//                     )}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   )
// }

'use client'

import { useEffect, useRef } from 'react'

export default function About() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.fade-up').forEach((el) => {
      observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  const references = [
    {
      num: 1,
      text: 'Centers for Disease Control and Prevention, 2025. Rabies Prevention and Control.',
      url: 'https://www.cdc.gov/rabies/prevention/index.html',
    },
    {
      num: 2,
      text: 'Centers for Disease Control and Prevention. (2024). ACIP Recommendations: Rabies Vaccine, National Center for Immunization and Respiratory Diseases. July 29, 2024.',
      url: null,
    },
    {
      num: 3,
      text: 'Rupprecht, C. E., Briggs, D., Brown, C. M., Franka, R., Katz, S. L., Kerr, H. D., ... & Centers for Disease Control and Prevention (CDC). (2010). Use of a reduced (4-dose) vaccine schedule for postexposure prophylaxis to prevent human rabies: recommendations of the advisory committee on immunization practices. MMWR Recomm Rep, 59(RR-2), 1-9.',
      url: null,
    },
    {
      num: 4,
      text: 'World Health Organization (2024). Rabies. 5 June 2024.',
      url: 'https://www.who.int/news-room/fact-sheets/detail/rabies',
    },
    {
      num: 5,
      text: 'World Health Organization. (2010). Rabies vaccines. Weekly Epidemiological Record, 85(35), 337–348.',
      url: null,
    },
    {
      num: 6,
      text: 'World Health Organization. (2018). Rabies vaccines: WHO position paper, April 2018 – Recommendations. Vaccine, 36(37), 5500–5503.',
      url: null,
    },
    {
      num: 7,
      text: 'World Health Organization. (2018). Zero by 30: the global strategic plan to end human deaths from dog-mediated rabies by 2030.',
      url: null,
    },
    {
      num: 8,
      text: 'World Health Organization, 2025. World Rabies Day 2025, 28 September 2025.',
      url: 'https://www.who.int/news-room/events/detail/2025/09/28/default-calendar/world-rabies-day-2025',
    },
    {
      num: 9,
      text: 'World Organisation for Animal Health (2025). Rabies.',
      url: 'https://www.woah.org/en/disease/rabies/',
    },
    {
      num: 10,
      text: 'Yewale, V. N., & Shenoy, B. (2025). World Rabies Day 2025 – You, Me, and Community. Pediatric Infectious Disease, 7(3), iv–v.',
      url: null,
    },
    {
      num: 11,
      text: 'Ministry of Health Warning: 4 urgent steps when exposed to a bite or scratch from a rabid animal. Youm7 Newspaper, Wednesday, 27 August 2025.',
      url: 'https://share.google/tPEYUHYMR1v1Xumfz',
    },
    {
      num: 12,
      text: 'Ministry of Health and Population – Preventive Medicine and Public Health Sector, Central Administration of Public Health, General Administration for Infectious Disease Control, Arab Republic of Egypt, 2025. Key updates in the rabies prevention guidelines – August 2025.',
      url: 'https://media.gemini.media/img/original/2025/8/11/2025_8_11_12_56_11_63.webp',
    },
    {
      num: 13,
      text: 'Port Said Veterinary Medicine Directorate.',
      url: null,
    },
    {
      num: 14,
      text: 'Port Said Health Affairs Directorate.',
      url: null,
    },
  ]

  const scrollToReference = (num: number) => {
    const element = document.getElementById(`ref-${num}`)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      // Add highlight effect
      element.style.transition = 'background-color 0.3s ease'
      element.style.backgroundColor = '#fef3c7'
      setTimeout(() => {
        element.style.backgroundColor = ''
      }, 2000)
    }
  }

  return (
    <>
      <div className="about-page">

        {/* ===== HERO ===== */}
        <div className="hero">
          <div className="hero-icon">
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z"
                fill="white"
                opacity="0.9"
              />
              <ellipse cx="12" cy="16" rx="4" ry="2" fill="#0f7b6c" opacity="0.3" />
              <circle cx="12" cy="12" r="3" fill="#0f7b6c" />
              <path
                d="M12 7v2M12 15v2M7 12h2M15 12h2"
                stroke="#0f7b6c"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="hero-title " style={{ fontFamily: "'Quicksand', sans-serif" }}>PetsoCare</h1>
          <p className="hero-subtitle">One Health – Towards a Safer Community</p>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* ===== CARD 1: About the Application ===== */}
          <div className="section fade-up">
            <h2 className="section-title"style={{ fontFamily: "'Quicksand', sans-serif" }}>
              <span >🏥</span> About the Application
            </h2>
            <p style={{ color: '#555', lineHeight: 2, fontSize: '1rem', marginBottom: '16px' }}>
              <strong>PetsCare</strong> is a platform that aims to spread health knowledge based on
              scientific evidence, with a primary focus on{' '}
              <strong style={{ color: 'var(--teal)' }}>Rabies</strong> — a viral disease transmitted
              from animals to humans (zoonotic disease) that affects the nervous system and is usually
              spread through the bite of an infected animal, especially dogs.
            </p>
            <p style={{ color: '#555', lineHeight: 2, fontSize: '1rem', marginBottom: '30px' }}>
              The application provides information about vaccination schedules, a map of veterinarians,
              shelter locations, as well as articles and videos explaining prevention methods and the
              correct actions to take after exposure. It also includes data on areas where vaccinations
              have been conducted, vaccine availability locations, and the number of reported cases to
              help monitor the public health situation.
            </p>

            <div className="features-grid">
              {[
                {
                  icon: '📰',
                  color: '#e8f4ff',
                  title: 'Articles & Videos',
                  desc: 'Reliable scientific content on prevention, vaccination, and handling exposures.',
                },
                {
                  icon: '🗺️',
                  color: '#f0fdf4',
                  title: 'Interactive Map',
                  desc: 'Vaccination sites, nearby vets, shelters, and affected areas.',
                },
                {
                  icon: '💉',
                  color: '#fff7ed',
                  title: 'Vaccination Schedules',
                  desc: 'Complete info on vaccination timings and centers for humans and animals.',
                },
                {
                  icon: '🚨',
                  color: '#fff1f2',
                  title: 'Reporting System',
                  desc: 'Report suspected cases and track the number of infections and vaccinations.',
                },
              ].map((f, i) => (
                <div className="feature-card" key={i}>
                  <div className="feature-icon" style={{ background: f.color }}>
                    {f.icon}
                  </div>
                  <h5>{f.title}</h5>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="divider" />

          {/* ===== CARD 2: Important Notice ===== */}
          <div className="section fade-up">
            <h2 className="section-title" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              <span>⚠️</span> Important Notice
            </h2>
            <div className="alert-box">
              <h4>⚠️ Important Notice</h4>
              <p>
                The information provided in this application is for{' '}
                <strong>awareness purposes only</strong> and does not replace consultation with a
                physician, veterinarian, or the relevant health authorities.
              </p>
              <p >
                <strong>
                  If you are exposed to a suspected animal bite or scratch, you must immediately go
                  to the nearest health center.
                </strong>
              </p>
            </div>
          </div>

          <div className="divider" />

          {/* ===== CARD 3: Main Focus: Rabies ===== */}
          <div className="section fade-up">
            <h2 className="section-title " style={{ fontFamily: "'Quicksand', sans-serif" }}>
              <span>🦠</span> Main Focus: Rabies
            </h2>
            <p style={{ color: '#555', lineHeight: 2, fontSize: '1rem', marginBottom: '20px' }}>
              Rabies is considered one of the most dangerous viral diseases affecting the nervous
              system. It is usually transmitted through the bite of an infected animal, especially
              dogs.
            </p>

            <div
              style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '12px',
                padding: '20px 24px',
                marginBottom: '16px',
              }}
            >
              <h4 style={{ color: '#166534', marginBottom: '10px', fontWeight: 700 }}>
                🌍 According to the World Health Organization (WHO):
              </h4>
              <ul style={{ color: '#555', lineHeight: 2, paddingLeft: '20px', margin: 0 }}>
                <li>Rabies causes tens of thousands of deaths globally every year.</li>
                <li>
                  It is almost <strong>100% preventable</strong> when vaccination is received
                  immediately after exposure.
                </li>
              </ul>
            </div>

            <div
              style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '12px',
                padding: '20px 24px',
                marginBottom: '30px',
              }}
            >
              <h4 style={{ color: '#1e40af', marginBottom: '10px', fontWeight: 700 }}>
                🏥 According to the Centers for Disease Control and Prevention (CDC):
              </h4>
              <ul style={{ color: '#555', lineHeight: 2, paddingLeft: '20px', margin: 0 }}>
                <li>
                  Washing the wound immediately and getting vaccination{' '}
                  <strong>significantly reduces the risk of infection</strong>.
                </li>
              </ul>
            </div>

            <div
              style={{
                background: 'linear-gradient(135deg, #0f7b6c, #0a5c50)',
                borderRadius: '24px',
                padding: '50px 30px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '30px',
                textAlign: 'center',
                margin: '30px 0',
              }}
            >
              {[
                { value: '100%', label: 'Preventable with immediate post-exposure vaccination' },
                { value: '59K+', label: 'Deaths annually worldwide due to rabies (WHO)' },
                { value: '2030', label: 'WHO target to eliminate human dog-mediated rabies (Zero by 30)' },
              ].map((stat, i) => (
                <div key={i}>
                  <h3
                    style={{
                 fontFamily: "'Quicksand', sans-serif",
                      fontSize: '2.5rem',
                      color: '#ffffff',
                      marginBottom: '6px',
                      fontWeight: 900,
                    }}
                  >
                    {stat.value}
                  </h3>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.75)',
                      fontSize: '0.85rem',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="divider" />

          {/* ===== CARD 4: Application Objective ===== */}
          <div className="section fade-up">
            <h2 className="section-title" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              <span>🎯</span> Application Objective
            </h2>
            <ul className="goals-list">
              {[
                'Promote health awareness based on scientific evidence.',
                'Raise community awareness about rabies prevention methods and the correct actions to take after exposure.',
                'Strengthen the culture of prevention and vaccination for humans and animals through articles and videos.',
                'Reduce infection rates resulting from lack of awareness.',
                'Support public health efforts in combating rabies through a reporting system for suspected cases and monitoring shelters / animal care centers.',
                'Provide simple and easy-to-understand information.',
                'Facilitate access to vaccination locations and emergency contact numbers.',
              ].map((goal, i) => (
                <li key={i}>
                  <div className="goal-dot" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="divider" />

          {/* ===== CARD 5: Sources ===== */}
          <div className="section fade-up" >
            <h2 className="section-title" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              <span>📚</span> Sources
            </h2>

            {/* Detailed references section */}
            <div className="references">
              {references.map((ref) => (
                <div 
                  id={`ref-${ref.num}`}
                  className="ref-item" 
                  key={ref.num}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span 
                    className="ref-num" 
                    style={{ 
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      color: '#0f7b6c',
                    }}
                    onClick={() => scrollToReference(ref.num)}
                  >
                    [{ref.num}]
                  </span>
                  <span>
                    {ref.text}{' '}
                    {ref.url && (
                      <a 
                        href={ref.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          color: '#0f7b6c',
                          textDecoration: 'none',
                          borderBottom: '1px solid #0f7b6c',
                        }}
                      >
                        {ref.url}
                      </a>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}