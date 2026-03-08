'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function AboutPage() {
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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --cream: #faf7f2;
          --dark: #1a1a2e;
          --teal: #0f7b6c;
          --teal-light: #14a88f;
          --gold: #c9973a;
          --red-soft: #d95f3b;
          --gray: #6b7280;
          --card-bg: #ffffff;
        }

        .about-page {
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
          color: var(--dark);
          min-height: 100vh;
          direction: rtl;
        }

        /* ===== HERO ===== */
        .hero {
          background: linear-gradient(135deg, #0f7b6c 0%, #1a1a2e 60%, #0f2027 100%);
          padding: 100px 20px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 50%, rgba(15,123,108,0.3) 0%, transparent 60%),
                      radial-gradient(ellipse at 70% 30%, rgba(201,151,58,0.15) 0%, transparent 50%);
        }

        .hero-icon {
          width: 90px;
          height: 90px;
          background: linear-gradient(135deg, var(--teal), var(--teal-light));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          box-shadow: 0 0 40px rgba(15,123,108,0.5);
          position: relative;
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(15,123,108,0.5); }
          50% { box-shadow: 0 0 70px rgba(15,123,108,0.8); }
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 12px;
          position: relative;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.7);
          font-weight: 300;
          letter-spacing: 0.05em;
          position: relative;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(201,151,58,0.2);
          border: 1px solid rgba(201,151,58,0.4);
          color: #e8b84b;
          padding: 6px 20px;
          border-radius: 50px;
          font-size: 0.85rem;
          margin-bottom: 20px;
          letter-spacing: 0.1em;
          position: relative;
        }

        /* ===== SECTIONS ===== */
        .section {
          padding: 70px 20px;
          max-width: 900px;
          margin: 0 auto;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.9rem;
          font-weight: 700;
          color: var(--teal);
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .section-title::after {
          content: '';
          flex: 1;
          height: 2px;
          background: linear-gradient(to left, transparent, var(--teal-light));
        }

        /* ===== ALERT BOX ===== */
        .alert-box {
          background: linear-gradient(135deg, #fff5f0, #fff);
          border: 1px solid #f0c4b0;
          border-right: 5px solid var(--red-soft);
          border-radius: 16px;
          padding: 28px 32px;
          margin-bottom: 40px;
        }

        .alert-box h4 {
          color: var(--red-soft);
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .alert-box p {
          color: #555;
          line-height: 1.8;
          margin: 0;
          font-size: 0.95rem;
        }

        /* ===== FEATURE CARDS ===== */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .feature-card {
          background: var(--card-bg);
          border-radius: 20px;
          padding: 28px 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(15,123,108,0.12);
        }

        .feature-icon {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          font-size: 1.4rem;
        }

        .feature-card h5 {
          font-weight: 600;
          font-size: 1rem;
          color: var(--dark);
          margin-bottom: 8px;
        }

        .feature-card p {
          color: var(--gray);
          font-size: 0.88rem;
          line-height: 1.7;
          margin: 0;
        }

        /* ===== GOALS ===== */
        .goals-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .goals-list li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: white;
          padding: 16px 20px;
          border-radius: 14px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          font-size: 0.95rem;
          color: #444;
          line-height: 1.6;
        }

        .goal-dot {
          width: 10px;
          height: 10px;
          min-width: 10px;
          border-radius: 50%;
          background: var(--teal);
          margin-top: 6px;
        }

        /* ===== STATS ===== */
        .stats-band {
          background: linear-gradient(135deg, var(--teal), #0a5c50);
          border-radius: 24px;
          padding: 50px 30px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 30px;
          text-align: center;
          margin: 60px 0;
        }

        .stat-item h3 {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          color: #fff;
          margin-bottom: 6px;
          font-weight: 900;
        }

        .stat-item p {
          color: rgba(255,255,255,0.7);
          font-size: 0.85rem;
          margin: 0;
        }

        /* ===== REFERENCES ===== */
        .references {
          background: white;
          border-radius: 20px;
          padding: 36px 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }

        .ref-item {
          display: flex;
          gap: 14px;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
          font-size: 0.85rem;
          color: #555;
          line-height: 1.6;
          direction: ltr;
        }

        .ref-item:last-child {
          border-bottom: none;
        }

        .ref-num {
          color: var(--teal);
          font-weight: 700;
          min-width: 28px;
          font-size: 0.8rem;
          padding-top: 2px;
        }

        .ref-item a {
          color: var(--teal-light);
          word-break: break-all;
        }

        /* ===== ANIMATION ===== */
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ===== DIVIDER ===== */
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #d1d5db, transparent);
          margin: 0 20px;
        }
      `}</style>

      <div className="about-page">

        {/* ===== HERO ===== */}
        <div className="hero">
          <div className="hero-icon">
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" fill="white" opacity="0.9"/>
              <circle cx="12" cy="12" r="3" fill="#0f7b6c"/>
              <path d="M12 7v2M12 15v2M7 12h2M15 12h2" stroke="#0f7b6c" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="hero-title">PetsoCare</h1>
          <p className="hero-subtitle">نحو مجتمع آمن</p>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* About Section */}
          <div className="section fade-up">
            <h2 className="section-title">
              <span>🏥</span> About Us
            </h2>
            <p style={{ color: '#555', lineHeight: 2, fontSize: '1rem', marginBottom: '30px' }}>
              PetsCare منصة تهدف إلى نشر المعرفة الصحية المبنية على الأدلة العلمية، مع التركيز الرئيسي على مرض
              <strong style={{ color: 'var(--teal)' }}> السعار (Rabies) </strong>
              — وهو مرض فيروسي ينتقل من الحيوانات إلى الإنسان (zoonotic disease)، يصيب الجهاز العصبي، وينتقل غالبًا عبر عضة حيوان مصاب خاصة الكلاب.
            </p>

            {/* Alert Box */}
            <div className="alert-box">
              <h4>⚠️ تنبيه هام</h4>
              <p>
                المعلومات الواردة في هذا التطبيق لأغراض التوعية فقط، ولا تُغني عن استشارة الطبيب أو البيطري أو الجهات الصحية المختصة.
                في حال التعرض لعضة أو خدش من حيوان مشتبه به، يجب التوجه فورًا إلى أقرب مركز صحي.
              </p>
            </div>

            {/* Features Grid */}
            <div className="features-grid">
              {[
                { icon: '📰', color: '#e8f4ff', title: 'مقالات وفيديوهات', desc: 'محتوى علمي موثوق حول الوقاية والتطعيم وطرق التعامل مع الإصابات' },
                { icon: '🗺️', color: '#f0fdf4', title: 'خريطة تفاعلية', desc: 'أماكن التطعيم، أقرب البيطريين، الشيلترات، والمناطق المتأثرة' },
                { icon: '💉', color: '#fff7ed', title: 'جداول التحصينات', desc: 'معلومات كاملة عن مواعيد ومراكز التطعيم للإنسان والحيوان' },
                { icon: '🚨', color: '#fff1f2', title: 'نظام الإبلاغ', desc: 'الإبلاغ عن الحالات المشتبه بها ومتابعة عدد الإصابات والتحصينات' },
              ].map((f, i) => (
                <div className="feature-card" key={i}>
                  <div className="feature-icon" style={{ background: f.color }}>{f.icon}</div>
                  <h5>{f.title}</h5>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="divider" />

          {/* Stats */}
          <div className="section fade-up">
            <div className="stats-band">
              <div className="stat-item">
                <h3>100%</h3>
                <p>نسبة الوقاية عند التطعيم الفوري بعد التعرض</p>
              </div>
              <div className="stat-item">
                <h3>59K+</h3>
                <p>وفاة سنويًا بسبب السعار عالميًا (WHO)</p>
              </div>
              <div className="stat-item">
                <h3>2030</h3>
                <p>هدف WHO للقضاء على السعار البشري</p>
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* Goals */}
          <div className="section fade-up">
            <h2 className="section-title">
              <span>🎯</span> Website Purpose
            </h2>
            <ul className="goals-list">
              {[
                'توعية المجتمع بطرق الوقاية من مرض السعار والتصرف الصحيح عند التعرض',
                'نشر المعرفة الصحية المبنية على الأدلة العلمية عبر المقالات والفيديوهات',
                'تعزيز ثقافة الوقاية والتطعيم للإنسان والحيوان',
                'تقليل نسب الإصابات الناتجة عن نقص الوعي',
                'دعم جهود الصحة العامة في مكافحة السعار من خلال نظام الإبلاغ والإيواء',
                'توفير معلومات مبسطة وسهلة الفهم وتسهيل الوصول إلى أماكن التحصينات وأرقام الطوارئ',
              ].map((goal, i) => (
                <li key={i}>
                  <div className="goal-dot" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="divider" />

          {/* References */}
          <div className="section fade-up">
            <h2 className="section-title">
              <span>📚</span> References
            </h2>
            <div className="references">
              {[
                { num: 1, text: 'Centers for Disease Control and Prevention 2025. Rabies Prevention and Control.', url: 'https://www.cdc.gov/rabies/prevention/index.html' },
                { num: 2, text: 'Centers for Disease Control and Prevention. (2024). ACIP Recommendations: Rabies Vaccine. July 29, 2024.' },
                { num: 3, text: 'Rupprecht, C. E., et al. (2010). Use of a reduced (4-dose) vaccine schedule for postexposure prophylaxis. MMWR Recomm Rep, 59(RR-2), 1-9.' },
                { num: 4, text: 'World Health Organization (2024). Rabies. 5 June 2024.', url: 'https://www.who.int/news-room/fact-sheets/detail/rabies' },
                { num: 5, text: 'World Health Organization. (2010). Rabies vaccines. Weekly Epidemiological Record, 85(35), 337-348.' },
                { num: 6, text: 'World Health Organization. (2018). Rabies vaccines: WHO position paper. Vaccine, 36(37), 5500-5503.' },
                { num: 7, text: 'World Health Organization. (2018). Zero by 30: the global strategic plan to end human deaths from dog-mediated rabies by 2030.' },
                { num: 8, text: 'World Health Organization 2025. World Rabies Day 2025, 28 September 2025.', url: 'https://www.who.int/news-room/events/detail/2025/09/28/default-calendar/world-rabies-day-2025' },
                { num: 9, text: 'World Organisation for Animal Health (2025). Rabies.', url: 'https://www.woah.org/en/disease/rabies/' },
                { num: 10, text: 'Yewale, V. N., & Shenoy, B. (2025). World Rabies Day 2025–You, Me, and Community. Pediatric Infectious Disease, 7(3), iv-v.' },
                { num: 11, text: 'وزارة الصحة. (27 أغسطس 2025). 4 خطوات عاجلة عند التعرض لعضة أو خدش من حيوان مسعور. جريدة السابع.' },
                { num: 12, text: 'وزارة الصحة والسكان — الإدارة العامة للطب الوقائي. أدلة إرشادية للوقاية من مرض السعار. مصر العربية 2025.' },
                { num: 13, text: 'مديرية الطب البيطري — بورسعيد.' },
                { num: 14, text: 'مديرية الشئون الصحية — بورسعيد.' },
              ].map((ref) => (
                <div className="ref-item" key={ref.num}>
                  <span className="ref-num">[{ref.num}]</span>
                  <span>
                    {ref.text}{' '}
                    {ref.url && <a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.url}</a>}
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