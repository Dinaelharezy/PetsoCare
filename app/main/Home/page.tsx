
'use client'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Chatbot from '@/components/chatbot';
import {Slide} from '../../../types/Slide';


export default function VetFinder() {
  const [location, setLocation] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0);
  const articles = [
  {
    id: 1,
    title: "Caring for Your Dog's Health",
    subtitle: "Tips and advice for keeping your furry friend healthy and happy.",
    image: "/article-dog.png"
  },
  {
    id: 2,
    title: "Understanding Cat Behavior",
    subtitle: "Learn how to interpret your cat's actions and moods.",
    image: "/article-cat.png"
  },
  {
    id: 3,
    title: "Bird Care Essentials",
    subtitle: "Everything you need to know to keep your feathered friends safe and healthy.",
    image: "/article-bird.png"
  }
];

 
  const slides: Slide[] = [
    {
      image: '/carousel cute.png', // حطي صورة الكلب هنا
      title: 'Find the Best Care for Your Beloved Pet',
      subtitle: 'Being a vet has changed my perception of things. I see how fragile life is. You can\'t take anything for granted'
    },
    {
      image: '/carousel cute cat.png',
      title: 'Professional Pet Healthcare',
      subtitle: 'Expert veterinary care for your furry family members'
    },
    {
      image: '/bird.png',
      title: 'Trusted Veterinary Services',
      subtitle: 'Compassionate care when your pet needs it most'
    }
  ];

  // Auto play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const vets = [
    {
      id: 1,
      name: 'Dr. Omar Hassan',
      specialty: 'Veterinary Medicine',
      rating: 4.9,
      reviews: 234,
      image: '/vet-man.png',
      location: 'Ismalia, Egypt'
    },
    {
      id: 2,
      name: 'Dr. Rawda Mamdouh',
      specialty: 'Small Animal Surgery',
      rating: 5.0,
      reviews: 189,
      image: '/vet-woman 7.png',
      location: 'Portsaid, Egypt'
    },
    {
      id: 3,
      name: 'Dr. Marcus Hanna',
      specialty: 'Internal Medicine',
      rating: 4.8,
      reviews: 156,
      location: 'Ismalia, Egypt',
      image: '/vet-man2.jpg'
    },
    {
      id: 4,
      name: 'Dr. Moataz Sayed',
      specialty: 'Veterinary Internal Medicine',
      rating: 4.9,
      reviews: 203,
      location: 'Portsaid, Egypt',
      image: '/vet-man 3.JPG'
    },
    {
      id: 5,
      name: 'Dr. Sarah Waleed',
      specialty: 'Emergency & Critical Care',
      rating: 4.7,
      reviews: 178,
      image: '/vet-woman.png',
      location: 'Ismalia, Egypt'
    },
    {
      id: 6,
      name: 'Dr. Jessica Antinuous',
      specialty: 'Exotic Pets',
      rating: 5.0,
      reviews: 145,
      image: '/vet-woman3.jpg',
      location: 'Portsaid, Egypt'
    }
  ]

  return (
    <div className="vet-finder-page">
      {/* Hero Carousel - Simple like the screenshot */}
      <div className="hero-carousel-wrapper" style={{ 
        maxWidth: '1200px', 
        margin: '40px auto',
        padding: '0 20px'
      }}>
        <div className="position-relative" style={{ 
          height: '400px',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`position-absolute w-100 h-100 transition-opacity`}
              style={{
                opacity: index === currentSlide ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
              }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 30%' 
                }}
              />
              
              {/* Overlay */}
              <div 
                className="position-absolute w-100 h-100" 
                style={{
                  top: 0,
                  left: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))'
                }}
              />

              {/* Text Content */}
              <div 
                className="position-absolute w-100 text-center"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  padding: '0 40px'
                }}
              >
                <h1 style={{ 
                  fontSize: '2.5rem',
                  fontWeight: '600',
                  marginBottom: '20px',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                  {slide.title}
                </h1>
                <p style={{ 
                  fontSize: '1rem',
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: '1.6',
                  opacity: '0.95'
                }}>
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="position-absolute"
            style={{
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.9)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="position-absolute"
            style={{
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.9)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 5l7 7-7 7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dots Indicator */}
          <div 
            className="position-absolute d-flex gap-2"
            style={{
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10
            }}
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: index === currentSlide ? '30px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  border: 'none',
                  background: index === currentSlide 
                    ? 'rgba(255, 255, 255, 0.9)' 
                    : 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Search Section */}
      <Container className="search-section" style={{ marginTop: '60px' }}>
        <h2 className="section-title text-center" style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '40px',
          color: '#333'
        }}>
          Find Your Perfect Vet & Educate Yourself with Our Articles
        </h2>
        
        <div className="search-bar-container mx-auto" style={{ maxWidth: '800px' }}>
          <div className="search-filters d-flex gap-3">
            <Form.Select 
              className="filter-select flex-fill" 
              value={specialty} 
              onChange={(e) => setSpecialty(e.target.value)}
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                border: '1px solid #ddd',
                fontSize: '1rem'
              }}
            >
              <option value="">All Specialties</option>
              <option value="Internal Medicine">Internal Medicine</option>
              <option value="Emergency & Critical Care">Emergency & Critical Care</option>
              <option value="Exotic Pets">Exotic Pets</option>
              <option value="Small Animal Surgery">Small Animal Surgery</option>
              <option value="Veterinary Medicine">Veterinary Medicine</option>
            </Form.Select>

            <Form.Select 
              className="filter-select flex-fill"
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                border: '1px solid #ddd',
                fontSize: '1rem'
              }}
            >
              <option>All Locations</option>
              <option>Ismalia</option>
              <option>Portsaid</option>
            </Form.Select>
          </div>
        </div>
      </Container>





      <Container className="vets-section" style={{ marginTop: '60px', marginBottom: '60px' }}>
        <Row className='g-5'> 
          {vets.map((vet) => (
            <Col lg={4} md={6} sm={12} key={vet.id}>
              <Card className="vet-card" style={{
                borderRadius: '15px',
                border: 'none',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                overflow: 'hidden',
                height: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
              }}
              >
                <div className="vet-image-wrapper" style={{ 
                  height: '220px', // صغرت من 400px
                  overflow: 'hidden',
                  position: 'relative'

                }}>
                  <Image 
                    src={vet.image} 
                    alt={vet.name}
                    width={400}
                    height={400}
                    className="vet-profile-image"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top' 
                    }}
                  />
                </div>
                <Card.Body style={{ padding: '20px' }}> {/* صغرت الـ padding */}
                  <h5 className="vet-name" style={{
                    fontSize: '1.25rem', // صغرت من الحجم الافتراضي
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#333'
                  }}>
                    {vet.name}
                  </h5>
                  <p className="vet-specialty" style={{
                    color: '#666',
                    fontSize: '0.9rem',
                    marginBottom: '15px'
                  }}>
                    {vet.specialty}
                  </p>
                  
                  <div className="vet-stats" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    marginBottom: '15px'
                  }}>
                    <div className="stat-item" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.85rem'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                          fill="#FFD700" stroke="#FFD700" strokeWidth="2"/>
                      </svg>
                      <span style={{ color: '#666' }}>
                        <strong style={{ color: '#333' }}>{vet.rating}</strong> ({vet.reviews} reviews)
                      </span>
                    </div>
                    <div className="stat-item" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.85rem',
                      color: '#666'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
                          fill="#4CAF50"/>
                        <circle cx="12" cy="9" r="2.5" fill="white"/>
                      </svg>
                      <span>{vet.location}</span>
                    </div>
                  </div>

                  <Button 
                    className="view-profile-btn"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 179, 66, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    View Profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Chat Button */}
     <Chatbot />
    </div>
  )
}