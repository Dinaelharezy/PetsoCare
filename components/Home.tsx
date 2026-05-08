
'use client'

import { Container, Row, Col, Form, Card } from 'react-bootstrap'
import { useState, useEffect, useCallback } from 'react'
import Chatbot from '@/components/chatbot'
import { Slide } from '@/types/Slide'
import Link from 'next/link'
import { Clinic } from '../types/Clinic'
import { article as Article } from '../types/article'
import { getImageSrc } from '../utils/imageUtils'
import { useCheckDanger } from './Vaccine/Notification/hook/useCheckDanger'
import { useAppStore } from '../store/Appstore'

// ──── Icon Components ──────────────────────────────────────
function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export const FALLBACK_CLINICS: Clinic[] = [
  {
    id: 1,
    name: 'Cairo Veterinary Center',
    address: '15 Tahrir Square',
    governorate: 'Cairo',
    phone: '01012345678',
    bookingPrice: 150,
    workingDays: 'Sat – Thu',
    workingHours: '9 AM – 6 PM',
    imageUrl: '/clinic1.jpg',
  },
  {
    id: 2,
    name: 'Alexandria Animal Clinic',
    address: '7 Stanley Bridge St',
    governorate: 'Alexandria',
    phone: '01098765432',
    bookingPrice: 120,
    workingDays: 'Sun – Thu',
    workingHours: '10 AM – 5 PM',
    imageUrl: '/clinic2.jpg',
  },
  {
    id: 3,
    name: 'Giza Pet Hospital',
    address: '22 Haram St',
    governorate: 'Giza',
    phone: '01123456789',
    bookingPrice: 200,
    workingDays: 'Sat – Fri',
    workingHours: '8 AM – 8 PM',
    imageUrl: '/clinic4.jpg',
  },
]

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
      <h3 className="font-for-app" style={{ fontSize: '1.6rem', fontWeight: '700', color: '#222', margin: 0 }}>
        {title}
      </h3>
      <Link
        href={href}
        style={{ fontSize: '0.95rem', fontWeight: '600', color: '#5cb85c', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', transition: 'gap 0.2s' }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.gap = '8px')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.gap = '4px')}
      >
        Show More
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M9 5l7 7-7 7" stroke="#5cb85c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  )
}

function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <div
      style={{
        borderRadius: '16px',
        border: '1px solid var(--card-border)',
        backgroundColor: 'var(--card-bg)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)'
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
      }}
    >
      {/* Image Section */}
      <div style={{ height: '200px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
        {getImageSrc(clinic.imageUrl) ? (
          <img
            src={getImageSrc(clinic.imageUrl)!}
            alt={clinic.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>{clinic.name}</h3>

        {/* Location */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem', alignItems: 'flex-start' }}>
          <MapPinIcon />
          <span>{clinic.address}, {clinic.governorate}</span>
        </div>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--text-secondary)' }}>
            <PhoneIcon />
            <span>{clinic.phone}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--text-secondary)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--accent-color)', backgroundColor: 'var(--primary-light)', padding: '4px 8px', borderRadius: '6px' }}>
              {clinic.bookingPrice} EGP
            </span>
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', color: 'var(--text-secondary)', gridColumn: '1 / -1' }}>
            <ClockIcon />
            <span style={{ fontSize: '0.85rem' }}>{clinic.workingDays}</span>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', gridColumn: '1 / -1' }}>
            {clinic.workingHours}
          </div>
        </div>

        {/* Button */}
        <Link
          href={`/main/Home/${clinic.id}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '12px 16px',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            borderRadius: '10px',
            fontWeight: '600',
            fontSize: '0.95rem',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            marginTop: 'auto',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'var(--primary-dark)'
            ;(e.target as HTMLElement).style.transform = 'translateX(2px)'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'var(--primary-color)'
            ;(e.target as HTMLElement).style.transform = 'translateX(0)'
          }}
        >
          View Details <ArrowRightIcon />
        </Link>
      </div>
    </div>
  )
}

export const FALLBACK_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'What to Do After an Animal Bite',
    summary: 'Immediate steps you should take if bitten by a dog or wild animal to prevent rabies infection.',
    content: `
If you are bitten or scratched by an animal, act immediately:

1. Wash the wound thoroughly with soap and running water for at least 15 minutes.
2. Apply an antiseptic such as iodine or alcohol.
3. Do not cover the wound tightly.
4. Seek medical care as soon as possible.
5. A doctor may recommend rabies vaccination depending on the risk.

Early action can prevent rabies, which is a life-threatening disease.
    `,
    imageUrl: '/Dog-2.jpg',
    source: 'World Health Organization (WHO)',
    category: 'First Aid',
    publishDate: '2025-03-01',
    createdAt: '2025-03-01',
  },
  {
    id: 2,
    title: 'Rabies Vaccination Schedule',
    summary: 'A complete guide to post-exposure prophylaxis (PEP) and when each dose should be administered.',
    content: `
Rabies post-exposure prophylaxis (PEP) is essential after a possible exposure:

- Day 0: First vaccine dose (as soon as possible)
- Day 3: Second dose
- Day 7: Third dose
- Day 14: Fourth dose

In some cases, rabies immunoglobulin (RIG) is also given.

Always follow your doctor's instructions and complete all doses for full protection.
    `,
    imageUrl: '/Dog-3.jpg',
    source: 'Centers for Disease Control and Prevention (CDC)',
    category: 'Vaccines',
    publishDate: '2025-02-01',
    createdAt: '2025-02-01',
  },
  {
    id: 3,
    title: 'Protecting Your Pets from Rabies',
    summary: 'How regular vaccination and responsible ownership keeps your pet and community safe.',
    content: `
Protecting your pets from rabies is crucial:

- Vaccinate your pets regularly as recommended by veterinarians.
- Avoid letting pets roam freely outside.
- Keep pets away from wild or stray animals.
- Report any unusual behavior in animals to authorities.

Responsible pet care protects both animals and humans from rabies infection.
    `,
    imageUrl: '/cat-checkup.jpg',
    source: 'American Veterinary Medical Association (AVMA)',
    category: 'Pet Care',
    publishDate: '2025-01-01',
    createdAt: '2025-01-01',
  },
]

function ArticleCard({ article }: { article: Article }) {
  return (
    <div
      style={{
        borderRadius: '16px',
        border: '1px solid var(--card-border)',
        backgroundColor: 'var(--card-bg)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)'
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
      }}
    >
      {/* Image Section */}
      <div style={{ height: '200px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
        {getImageSrc(article.imageUrl) ? (
          <img
            src={getImageSrc(article.imageUrl)!}
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6.5" />
            </svg>
          </div>
        )}
        {/* Category Badge */}
        <span
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'var(--primary-color)',
            color: 'white',
            fontSize: '0.7rem',
            fontWeight: '700',
            padding: '6px 12px',
            borderRadius: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {article.category}
        </span>
      </div>

      {/* Content Section */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Date */}
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '10px', fontWeight: '500' }}>
          {new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </span>

        {/* Title */}
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
          {article.title}
        </h3>

        {/* Summary */}
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px', flex: 1 }}>
          {article.summary}
        </p>

        {/* Button */}
        <Link
          href={`/main/Articles/${article.id}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '12px 16px',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            borderRadius: '10px',
            fontWeight: '600',
            fontSize: '0.95rem',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'var(--primary-dark)'
            ;(e.target as HTMLElement).style.transform = 'translateX(2px)'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = 'var(--primary-color)'
            ;(e.target as HTMLElement).style.transform = 'translateX(0)'
          }}
        >
          Read More <ArrowRightIcon />
        </Link>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [location, setLocation] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)

  // ─── Zustand store ───────────────────────────────────────
  const clinics        = useAppStore(s => s.clinics)
  const setClinics     = useAppStore(s => s.setClinics)
  const isClinicsStale = useAppStore(s => s.isClinicsStale)

  const slides: Slide[] = [
    { image: '/checkup-2.jpg', title: 'Awareness & Prevention', subtitle: 'Educating the community on how to prevent rabies and what to do when exposed' },
    { image: '/Dog-5.jpg', title: 'Vaccine Reminders — For You & Your Pet', subtitle: "Log your appointments and we'll remind you when your next vaccine is due — for you and your pet — based on your specific case" },
    { image: '/Dog-4.jpg', title: 'Find Clinics & Shelters On Map', subtitle: 'An interactive map showing all clinics, shelters, and dangerous animal locations — all in one place' },
    { image: '/checkup-3.jpg', title: 'Clinics & Shelters Across Egypt', subtitle: 'We have clinics and shelters in many governorates — search, compare, and book easily' },
    { image: '/checkup-1.jpg', title: 'Articles on Prevention & Health', subtitle: 'Science-based articles about rabies and how to prevent it — for you and your animals' },
    { image: '/Dog-3.jpg', title: 'AI Chatbot — First Response Guide', subtitle: 'A chatbot for initial assessment that tells you what to do immediately — not a substitute for a doctor, but the right first step' },
    { image: '/Dog-1.jpg', title: 'Everything About Rabies', subtitle: 'A comprehensive page on rabies — its symptoms, causes, treatment, and everything you need to know' },
    { image: '/Dog-2.jpg', title: 'Report a Dangerous Animal or Emergency', subtitle: 'You can report a dangerous animal in your area or an emergency — and track its referral to clinics instantly' },
  ]

  // ─── Fetch clinics only when cache is stale ──────────────
  const fetchClinics = useCallback(async () => {
    if (!isClinicsStale()) return   // ✅ cache still fresh → skip fetch

    try {
      setLoading(true)
      const res = await fetch(`/api/Clinics?t=${Date.now()}`, { cache: 'no-store' })
      if (!res.ok) throw new Error('API not working')
      const data: Clinic[] = await res.json()

      const categories = ['Overview', ...Array.from(new Set(data.map(c => c.governorate)))]
      setClinics(data, categories)  // ✅ write to store + stamp timestamp
    } catch (error) {
      console.error('Failed to fetch clinics:', error)
      if (clinics.length === 0) {
        // only fall back if store is completely empty (very first load)
        setClinics(FALLBACK_CLINICS, ['Overview', 'Cairo', 'Alexandria', 'Giza'])
      }
    } finally {
      setLoading(false)
    }
  }, [isClinicsStale, setClinics, clinics.length])

  const fetchArticles = useCallback(async () => {
    try {
      const res = await fetch(`/api/Articles?lang=en&t=${Date.now()}`, { cache: 'no-store' })
      if (!res.ok) throw new Error('Articles API not working')
      const data = await res.json()
      setArticles(data)
    } catch (error) {
      console.error('Failed to fetch articles:', error)
      setArticles(FALLBACK_ARTICLES)
    }
  }, [])

  useCheckDanger()

  useEffect(() => {
    fetchClinics()
    fetchArticles()

    // invalidate store cache + re-fetch when another tab/component fires this event
    const handleClinicsUpdated = () => {
      useAppStore.setState({ clinicsLastFetched: null })  // force stale
      fetchClinics()
    }

    window.addEventListener('clinicsUpdated', handleClinicsUpdated)
    return () => window.removeEventListener('clinicsUpdated', handleClinicsUpdated)
  }, [fetchClinics, fetchArticles])

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  // ─── Derive display data from store ─────────────────────
  const locations       = ['All Locations', ...Array.from(new Set(clinics.map((c) => c.governorate)))]
  const filteredClinics = clinics.filter((clinic) => !location || location === 'All Locations' || clinic.governorate === location)
  const previewClinics  = filteredClinics.slice(0, 3)
  const previewArticles = (articles.length > 0 ? articles : FALLBACK_ARTICLES).slice(0, 3)

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--primary-light) 0%, rgba(168, 230, 163, 0.2) 100%)',
          padding: '60px 20px',
          marginBottom: '60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Elements */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-100px',
            width: '300px',
            height: '300px',
            backgroundColor: 'var(--primary-color)',
            borderRadius: '50%',
            opacity: 0.1,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-100px',
            width: '250px',
            height: '250px',
            backgroundColor: 'var(--accent-color)',
            borderRadius: '50%',
            opacity: 0.08,
            zIndex: 0,
          }}
        />

        <Container style={{ maxWidth: '1200px', position: 'relative', zIndex: 1 }}>
          <Row alignItems="center" style={{ gap: '40px' }}>
            <Col lg={6}>
              <h1 style={{ fontSize: '2.8rem', fontWeight: '700', marginBottom: '20px', color: 'var(--text-primary)', lineHeight: '1.2' }}>
                Care for Your Pets with Confidence
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: '1.7' }}>
                Connect with trusted veterinary clinics, track vaccination schedules, and access expert pet care resources—all in one place.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link
                  href="/main/Clinics"
                  style={{
                    padding: '14px 32px',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '10px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'var(--primary-dark)'
                    ;(e.target as HTMLElement).style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'var(--primary-color)'
                    ;(e.target as HTMLElement).style.transform = 'translateY(0)'
                  }}
                >
                  Find a Clinic <ArrowRightIcon />
                </Link>
                <Link
                  href="/main/Articles"
                  style={{
                    padding: '14px 32px',
                    backgroundColor: 'white',
                    color: 'var(--primary-color)',
                    borderRadius: '10px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    border: '2px solid var(--primary-color)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'var(--primary-light)'
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'white'
                  }}
                >
                  Learn More
                </Link>
              </div>
            </Col>
            <Col lg={6} style={{ textAlign: 'center', display: 'none', on: 'lg' }}>
              <div
                style={{
                  background: 'var(--card-bg)',
                  borderRadius: '20px',
                  padding: '40px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
              >
                <CheckCircleIcon />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Grid Section */}
      <Container style={{ maxWidth: '1200px', marginBottom: '80px' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '700', textAlign: 'center', marginBottom: '50px', color: 'var(--text-primary)' }}>
          Why Choose PetsoCare?
        </h2>
        <Row style={{ gap: '20px' }}>
          {[
            { icon: '🏥', title: 'Find Clinics', desc: 'Discover verified veterinary clinics near you' },
            { icon: '🗺️', title: 'Location Map', desc: 'Interactive map for easy clinic discovery' },
            { icon: '💉', title: 'Vaccination Tracking', desc: 'Keep your pets vaccination schedules organized' },
            { icon: '📚', title: 'Expert Articles', desc: 'Science-based pet care guidance and tips' },
          ].map((feature, idx) => (
            <Col lg={3} md={6} key={idx}>
              <div
                style={{
                  textAlign: 'center',
                  padding: '30px 20px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--card-border)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '10px', color: 'var(--text-primary)' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{feature.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Location Filter */}
      <Container style={{ maxWidth: '1200px', marginBottom: '80px' }}>
        <div
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            marginBottom: '40px',
          }}
        >
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: 'var(--text-primary)' }}>
            Filter by Location
          </label>
          <Form.Select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid var(--card-border)',
              fontSize: '1rem',
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-primary)',
            }}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </Form.Select>
        </div>
      </Container>

      {/* Clinics Section */}
      <Container style={{ maxWidth: '1200px', marginBottom: '100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0' }}>Featured Clinics</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '1rem' }}>Top-rated veterinary clinics in your area</p>
          </div>
          <Link
            href="/main/Clinics"
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderRadius: '10px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: '1px solid var(--card-border)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'var(--primary-light)'
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)'
            }}
          >
            View All <ArrowRightIcon />
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '3px solid var(--card-border)', borderTop: '3px solid var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>Loading clinics...</p>
          </div>
        ) : previewClinics.length > 0 ? (
          <Row style={{ gap: '24px' }}>
            {previewClinics.map((clinic) => (
              <Col lg={4} md={6} sm={12} key={clinic.id} style={{ marginBottom: '0' }}>
                <ClinicCard clinic={clinic} />
              </Col>
            ))}
          </Row>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px' }}>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>No clinics found</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your location filter</p>
          </div>
        )}
      </Container>

      {/* Articles Section */}
      <Container style={{ maxWidth: '1200px', marginBottom: '100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--text-primary)', margin: '0' }}>Latest Articles</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '1rem' }}>Expert guidance on pet care and health</p>
          </div>
          <Link
            href="/main/Articles"
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderRadius: '10px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: '1px solid var(--card-border)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'var(--primary-light)'
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'var(--bg-secondary)'
            }}
          >
            View All <ArrowRightIcon />
          </Link>
        </div>

        <Row style={{ gap: '24px' }}>
          {previewArticles.map((article) => (
            <Col lg={4} md={6} sm={12} key={article.id} style={{ marginBottom: '0' }}>
              <ArticleCard article={article} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* CTA Section */}
      <div style={{ backgroundColor: 'var(--primary-color)', padding: '80px 20px', marginBottom: '60px', borderRadius: '20px', marginLeft: '20px', marginRight: '20px' }}>
        <Container style={{ maxWidth: '1200px', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: '700', marginBottom: '20px' }}>Need Emergency Help?</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: 0.9, maxWidth: '600px', margin: '0 auto 30px' }}>
            Our AI chatbot can provide immediate guidance. For serious cases, find the nearest clinic instantly.
          </p>
          <Link
            href="/main/Map"
            style={{
              padding: '14px 32px',
              backgroundColor: 'white',
              color: 'var(--primary-color)',
              borderRadius: '10px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = 'translateY(0)'
            }}
          >
            Find Nearby Clinic <ArrowRightIcon />
          </Link>
        </Container>
      </div>

      <Chatbot />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
