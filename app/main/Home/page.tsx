'use client'

import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { useState } from 'react'
import Image from 'next/image'

export default function VetFinder() {
  const [location, setLocation] = useState('')
  const [specialty, setSpecialty] = useState('')

  const vets = [
    {
      id: 1,
      name: 'Dr. Omar Hassan',
      specialty: 'Veterinary Medicine',
      rating: 4.9,
      reviews: 234,
      image: '/vet-man 3.JPG',
      location: 'Ismalia,Egypt'
    },
    {
      id: 2,
      name: 'Dr. Rawda Mamdouh',
      specialty: 'Small Animal Surgery',
      rating: 5.0,
      reviews: 189,
      image: '/vet-woman 7.png',
      location: 'Portsaid,Egypt'
    },
    {
      id: 3,
      name: 'Dr. Marcus Hanna',
      specialty: 'Internal Medicine',
      rating: 4.8,
      reviews: 156,
      location: 'Ismalia,Egypt',
      image: '/vet-man.jpg'
    },
    {
      id: 4,
      name: 'Dr. Moataz Sayed',
      specialty: 'Veterinary Internal Medicine',
      rating: 4.9,
      reviews: 203,
      location: 'Portsaid,Egypt',
      image: '/vet-man 3.JPG'
    },
    {
      id: 5,
      name: 'Dr. Sarah Waleed',
      specialty: 'Emergency & Critical Care',
      rating: 4.7,
      reviews: 178,
      image: '/vet-woamn.jpg',
      location: 'Ismalia,Egypt'
    },
    {
      id: 6,
      name: 'Dr. Jessica Antinuous',
      specialty: 'Exotic Pets',
      rating: 5.0,
      reviews: 145,
      image: '/vet-woman3.jpg',
      location: 'Portsaid,Egypt'
    }
  ]

  return (
    <div className="vet-finder-page">
      {/* Hero Section with Carousel */}
      <section className="hero-section mx-5 mt-3">
        <div className="hero-overlay"></div>
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <Image src="/carousel 6.jpg" className="d-block w-100" alt="Veterinary Services" width={800} height={400} />
            </div>
            <div className="carousel-item">
              <Image src="/carousel 2.jpg" className="d-block w-100" alt="Veterinary Services" width={800} height={400} />
            </div>
            <div className="carousel-item">
              <Image src="/carousel 1.jpg" className="d-block w-100" alt="Veterinary Services" width={800} height={400} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* Search Section */}

<Container className="search-section">
  <h2 className="section-title text-center">Find Your Perfect Vet</h2>
  
  <div className="search-bar-container mx-auto" style={{ maxWidth: '800px' }}>
  

    <div className="search-filters">
      <Form.Select 
        className="filter-select" 
        value={specialty} 
        onChange={(e) => setSpecialty(e.target.value)}
      >
        <option value="">All Specialties</option>
        <option value="Internal Medicine">Internal Medicine</option>
        <option value="Emergency & Critical Care">Emergency & Critical Care</option>
        <option value="Exotic Pets">Exotic Pets</option>
        <option value="Small Animal Surgery">Small Animal Surgery</option>
        <option value="Veterinary Medicine">Veterinary Medicine</option>
      </Form.Select>

      <Form.Select className="filter-select">
        <option>All Locations</option>
        <option>Ismalia</option>
        <option>Portsaid</option>
      </Form.Select>
    </div>
  </div>
</Container>

      {/* Vets Grid */}
      <Container className="vets-section">
        <Row className='g-5'>
          {vets.map((vet) => (
            // <Col lg={4} md={6} sm={12} key={vet.id} className="mb-4 ">
            <Col lg={4} md={6} sm={12} key={vet.id} className="mb-4 ">
              <Card className="vet-card">
                <div className="vet-image-wrapper">
                  <Image 
                    src={vet.image} 
                    alt={vet.name}
                    width={400}
                    height={400}
                    className="vet-profile-image"
                    
                  />
                </div>
                <Card.Body>
                  <h5 className="vet-name">{vet.name}</h5>
                  <p className="vet-specialty">{vet.specialty}</p>
                  
                  <div className="vet-stats">
                    <div className="stat-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="me-1">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFD700" stroke="#FFD700" strokeWidth="2"/>
                      </svg>
                      <span>{vet.rating} ({vet.reviews} reviews)</span>
                    </div>
                    <div className="stat-item">
                      <i className="bi bi-geo-alt #4CAF50"></i>
                      <span>{vet.location}</span>
                    </div>
                  </div>

                  <Button className="view-profile-btn">View Profile</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Chat Button */}
      <button className="chat-fab">
        💬
      </button>
    </div>
  )
}