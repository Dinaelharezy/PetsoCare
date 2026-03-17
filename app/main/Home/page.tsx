
'use client'

import { Container, Row, Col, Form, Card } from 'react-bootstrap'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import Chatbot from '@/components/chatbot'
import { Slide } from '@/types/Slide'
import Link from 'next/link'
import { clinicsApi } from '../../../data/api/Clinic'
import { Clinic } from '../../../types/Clinic'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

const getImageSrc = (src?: string): string | null => {
  if (!src) return null
  if (src.startsWith('http')) return src
  if (src.startsWith('/')) return `${BASE_URL}${src}`
  return null
}

export default function HomePage() {
  const [location, setLocation] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [Clinics, setClinics] = useState<Clinic[]>([])
  const [loading, setLoading] = useState(true)

  const slides: Slide[] = [
    {
      image: '/checkup-2.jpg',
      title: 'Awareness & Prevention',
      subtitle: 'توعية المجتمع بطرق الوقاية من مرض السعار والتصرف الصحيح عند التعرض'
    },
    {
      image: '/carousel 3.jpg',
      title: 'Science-Based Health Knowledge',
      subtitle: 'نشر المعرفة الصحية المبنية على الأدلة العلمية عبر المقالات والفيديوهات'
    },
    {
      image: '/Dog-5.jpg',
      title: 'Vaccination for All',
      subtitle: 'تعزيز ثقافة الوقاية والتطعيم للإنسان والحيوان'
    },
    {
      image: '/Dog-4.jpg',
      title: 'Reducing Infection Rates',
      subtitle: 'تقليل نسب الإصابات الناتجة عن نقص الوعي'
    },
    {
      image: '/checkup-1.jpg',
      title: 'Supporting Public Health Efforts',
      subtitle: 'دعم جهود الصحة العامة في مكافحة السعار من خلال نظام الإبلاغ والإيواء'
    },
    {
      image: '/Dog-1.jpg',
      title: 'Easy Access to Care & Emergency Info',
      subtitle: 'توفير معلومات مبسطة وسهلة الفهم وتسهيل الوصول إلى أماكن التحصينات وأرقام الطوارئ'
    }
  ]

//   const fetchClinics = useCallback(async () => {
//   try {
//     setLoading(true)
//     const res = await fetch(`/api/Clinics?t=${Date.now()}`, { cache: 'no-store' })
//     const data = await res.json()
//     setClinics(data)
//   } catch (error) {
//     console.error('Failed to fetch clinics:', error)
//   } finally {
//     setLoading(false)
//   }
// }, [])

const fetchClinics = useCallback(async () => {
  try {
    setLoading(true)

    const res = await fetch(`/api/Clinics?t=${Date.now()}`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('API not working')
    }

    const data = await res.json()
    setClinics(data)

  } catch (error) {
    console.error('Failed to fetch clinics:', error)

    // خلي الصفحة تفتح حتى لو مفيش API
    setClinics([])

  } finally {
    setLoading(false)
  }
}, [])

  useEffect(() => {
    fetchClinics()
    window.addEventListener('clinicsUpdated', fetchClinics)
    return () => {
      window.removeEventListener('clinicsUpdated', fetchClinics)
    }
  }, [fetchClinics])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const locations = ['All Locations', ...Array.from(new Set(Clinics.map(c => c.governorate)))]

  const filteredClinics = Clinics.filter(clinic => {
    const matchesLocation = !location || location === 'All Locations' || clinic.governorate === location
    return matchesLocation
  })

  return (
    <div className="vet-finder-page">
      {/* Hero Carousel */}
      <div className="hero-carousel-wrapper" style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <div className="position-relative" style={{ height: '400px', borderRadius: '20px', overflow: 'hidden', boxShadow: '40px 10px 30px 30px rgba(0,0,0,0.1)' }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className="position-absolute w-100 h-100"
              style={{ opacity: index === currentSlide ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
              />
              <div className="position-absolute w-100 h-100" style={{ top: 0, left: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))' }} />
              <div className="position-absolute w-100 text-center" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', padding: '0 40px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                  {slide.title}
                </h1>
                <p className="amiri-regular" style={{ fontSize: '1.5rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6', opacity: '0.95' }}>
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}

          {/* Prev Button */}
          <button onClick={prevSlide} className="position-absolute" style={{ left: '20px', top: '50%', transform: 'translateY(-50%)', width: '50px', height: '50px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Next Button */}
          <button onClick={nextSlide} className="position-absolute" style={{ right: '20px', top: '50%', transform: 'translateY(-50%)', width: '50px', height: '50px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 5l7 7-7 7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dots */}
          <div className="position-absolute d-flex gap-2" style={{ bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
            {slides.map((_, index) => (
              <button key={index} onClick={() => setCurrentSlide(index)} style={{ width: index === currentSlide ? '30px' : '10px', height: '10px', borderRadius: '5px', border: 'none', background: index === currentSlide ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Search Section */}
      <Container className="search-section" style={{ marginTop: '60px' }}>
        <h2 className="section-title text-center font-for-app" style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '40px', color: '#333' }}>
          Find Your Perfect Clinic & Educate Yourself with Our Articles
        </h2>
        <div className="search-bar-container mx-auto" style={{ maxWidth: '800px' }}>
          <div className="search-filters d-flex gap-3">
            <Form.Select className="filter-select flex-fill" value={location} onChange={(e) => setLocation(e.target.value)} style={{ padding: '12px 20px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem' }}>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </Form.Select>
          </div>
        </div>
      </Container>

      {/* Vets Section */}
      <Container className="vets-section" style={{ marginTop: '60px', marginBottom: '60px' }}>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredClinics.length > 0 ? (
          <Row className="g-5">
            {filteredClinics.map((clinic) => (
              <Col lg={4} md={6} sm={12} key={clinic.id}>
               <Card
                  className="vet-card"
                  style={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', transition: 'transform 0.3s, box-shadow 0.3s', overflow: 'hidden', height: '100%' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)' }}
                >
                  <div className="vet-image-wrapper" style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    {getImageSrc(clinic.imageUrl) ? (
                      <Image
                        src={getImageSrc(clinic.imageUrl)!}
                        alt={clinic.name}
                        fill
                        sizes="(max-width:768px) 100vw, 33vw"
                        style={{ objectFit: 'cover', objectPosition: 'center top' }}
                      />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center h-100 bg-light">
                        <i className="bi bi-building text-secondary" style={{ fontSize: '4rem' }}></i>
                      </div>
                    )}
                  </div>

                  <Card.Body style={{ padding: '20px' }}>
                    <h5 className="vet-name" style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                      {clinic.name}
                    </h5>
                    <p className="vet-specialty" style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px' }}>
                      {clinic.address}, {clinic.governorate}
                    </p>

                    <div className="vet-stats" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700" stroke="#FFD700" strokeWidth="2"/>
                        </svg>
                        <span style={{ color: '#666' }}>
                          <strong style={{ color: '#333' }}>{clinic.phone}</strong> &nbsp;|&nbsp; {clinic.bookingPrice} EGP
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#666' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4CAF50"/>
                          <circle cx="12" cy="9" r="2.5" fill="white"/>
                        </svg>
                        <span>{clinic.workingDays} , {clinic.workingHours}</span>
                      </div>
                    </div>

                    <Link
                      href={`/main/Home/${clinic.id}`}
                      passHref
                      className='font-for-app'
                      style={{ display: 'block', width: '100%', textAlign: 'center', textDecoration: 'none', padding: '10px', backgroundColor: 'rgb(189, 242, 149)', color: 'white', borderRadius: '8px', fontWeight: '500', transition: 'all 0.3s',marginTop: '1.5rem',boxShadow: '0 100px 100px rgba(0,0,0,0.1)' }}
                    >
                      View Clinic
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5">
            <h4 className="text-muted">No clinics found</h4>
            <p className="text-muted">Try adjusting your filters</p>
          </div>
        )}
      </Container>

      <Chatbot />
    </div>
  )
}


