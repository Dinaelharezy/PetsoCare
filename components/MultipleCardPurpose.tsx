'use client'
import Image from 'next/image'
import { Card } from 'react-bootstrap';
export default function MultipleCardPurpose() {

    return (
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


    )

}