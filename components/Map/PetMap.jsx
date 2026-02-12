'use client';

import { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';


export default function PetMap() {
  const [activeFilter, setActiveFilter] = useState('clinics');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);


  const locations = {
    clinics: [
      {
        id: 1,
        name: 'Happy Paws Veterinary Clinic',
        address: '123 Pet Lane, Port Said, Egypt',
        lat: 31.2565,
        lng: 32.2841,
        hours: 'Mon-Fri: 9 AM - 6 PM, Sat: 10 AM - 4 PM',
        rating: 4.7,
        reviews: [
          { name: 'Ahmed Hassan', rating: 5, text: 'Excellent service! The staff are incredibly kind and knowledgeable. My cat always feels comfortable here.' },
          { name: 'Layla Mohamed', rating: 5, text: 'Very professional and caring. Dr. Emad saved my dog\'s life! Highly recommend this clinic.' },
          { name: 'Sara Tarek', rating: 4, text: 'Good clinic, but waiting times can be long sometimes. Overall a positive experience for my parrot.' }
        ]
      },
      {
        id: 2,
        name: 'Green Veterinary Clinic',
        address: '456 Animal St, Port Said, Egypt',
        lat: 31.2652,
        lng: 32.3015,
        hours: 'Mon-Sat: 8 AM - 8 PM',
        rating: 4.5,
        reviews: []
      }
    ],
    hospitals: [
      {
        id: 3,
        name: 'Ether Nabel',
        address: '789 Care Blvd, Port Said, Egypt',
        lat: 31.2689,
        lng: 32.2921,
        hours: '24/7 Emergency Services',
        rating: 4.8,
        reviews: []
      }
    ],
    shelters: [
      {
        id: 4,
        name: 'Port Shelter',
        address: '321 Rescue Ave, Port Said, Egypt',
        lat: 31.2521,
        lng: 32.3124,
        hours: 'Daily: 9 AM - 5 PM',
        rating: 4.6,
        reviews: []
      }
    ],
    dangerous: [
      {
        id: 5,
        name: 'National Snake',
        address: '654 Warning Rd, Port Said, Egypt',
        lat: 31.2758,
        lng: 32.2785,
        hours: 'Report immediately',
        rating: 0,
        reviews: []
      }
    ]
  };

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  const initMap = () => {
    if (typeof window !== 'undefined' && window.L && mapRef.current) {
      const L = window.L;
      
      // Fix default marker icon issue
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const mapInstance = L.map(mapRef.current).setView([31.2565, 32.2941], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance);

      setMap(mapInstance);
      updateMarkers(mapInstance, 'clinics');
    }
  };

  const updateMarkers = (mapInstance, filter) => {
    const L = window.L;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers based on filter
    const locationsToShow = locations[filter] || [];
    
    locationsToShow.forEach(location => {
      const marker = L.marker([location.lat, location.lng])
        .addTo(mapInstance)
        .on('click', () => {
          setSelectedLocation(location);
          mapInstance.setView([location.lat, location.lng], 15);
        });
      
      markersRef.current.push(marker);
    });
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setSelectedLocation(null);
    if (map) {
      updateMarkers(map, filter);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="d-inline-flex align-items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} style={{ color: star <= Math.floor(rating) ? '#fbbf24' : '#e5e7eb', fontSize: '18px' }}>★</span>
        ))}
        <span className="ms-1" style={{ color: '#6b7280', fontSize: '14px' }}>{rating}</span>
      </div>
    );
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '2rem 0',
      fontFamily: "'Quicksand', 'Comic Neue', sans-serif"
    }}>
    
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="main-title mb-3">
            <span className="paw-icon">🐾</span> Interactive Map: Find Your Nearest Pet Care
          </h1>
        </div>

        <div className="row g-4">
          <div className="col-12">
            <div className="map-container" style={{ height: '500px', position: 'relative' }}>
              <div ref={mapRef} style={{ height: '100%', width: '100%' }}></div>
            </div>
          </div>

          <div className="col-12">
            <div className="d-flex flex-wrap gap-3 justify-content-center mb-3">
              <button 
                className={`btn filter-btn ${activeFilter === 'clinics' ? 'active' : ''}`}
                style={{ 
                  background: activeFilter === 'clinics' ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)' : 'white',
                  color: activeFilter === 'clinics' ? 'white' : '#3b82f6',
                  borderColor: '#3b82f6'
                }}
                onClick={() => handleFilterChange('clinics')}
              >
                🏥 Clinics
              </button>
              <button 
                className={`btn filter-btn ${activeFilter === 'hospitals' ? 'active' : ''}`}
                style={{ 
                  background: activeFilter === 'hospitals' ? 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)' : 'white',
                  color: activeFilter === 'hospitals' ? 'white' : '#ec4899',
                  borderColor: '#ec4899'
                }}
                onClick={() => handleFilterChange('hospitals')}
              >
                🏨 Hospitals
              </button>
              <button 
                className={`btn filter-btn ${activeFilter === 'shelters' ? 'active' : ''}`}
                style={{ 
                  background: activeFilter === 'shelters' ? 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)' : 'white',
                  color: activeFilter === 'shelters' ? 'white' : '#8b5cf6',
                  borderColor: '#8b5cf6'
                }}
                onClick={() => handleFilterChange('shelters')}
              >
                🏠 Shelters
              </button>
              <button 
                className={`btn filter-btn ${activeFilter === 'dangerous' ? 'active' : ''}`}
                style={{ 
                  background: activeFilter === 'dangerous' ? 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)' : 'white',
                  color: activeFilter === 'dangerous' ? 'white' : '#ef4444',
                  borderColor: '#ef4444'
                }}
                onClick={() => handleFilterChange('dangerous')}
              >
                ⚠️ Dangerous Reports
              </button>
              <button 
                className="btn report-btn"
                onClick={() => alert('Report form would open here')}
              >
                🚨 Report Dangerous Animal
              </button>
            </div>
          </div>

          {selectedLocation && (
            <div className="col-12">
              <div className="card location-card border-0" style={{ borderRadius: '20px', background: 'white' }}>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h3 style={{ fontFamily: 'Fredoka', color: '#92400e', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                        {selectedLocation.name}
                      </h3>
                      <p className="text-muted mb-2" style={{ fontSize: '1rem' }}>
                        📍 {selectedLocation.address}
                      </p>
                      <p className="mb-2" style={{ color: '#059669', fontWeight: '600' }}>
                        🕐 {selectedLocation.hours}
                      </p>
                      {selectedLocation.rating > 0 && renderStars(selectedLocation.rating)}
                    </div>
                    <button 
                      className="btn btn-link text-muted"
                      onClick={() => setSelectedLocation(null)}
                      style={{ fontSize: '1.5rem', textDecoration: 'none' }}
                    >
                      ✕
                    </button>
                  </div>

                  {selectedLocation.reviews && selectedLocation.reviews.length > 0 && (
                    <div className="mt-4">
                      <h5 style={{ fontFamily: 'Fredoka', color: '#92400e', marginBottom: '1rem' }}>
                        Reviews ({selectedLocation.reviews.length})
                      </h5>
                      {selectedLocation.reviews.map((review, index) => (
                        <div key={index} className="review-card bg-light p-3 rounded mb-3">
                          <div className="d-flex align-items-center mb-2">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center me-3" 
                              style={{ 
                                width: '40px', 
                                height: '40px', 
                                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                color: 'white',
                                fontWeight: '700'
                              }}
                            >
                              {review.name.charAt(0)}
                            </div>
                            <div>
                              <div style={{ fontWeight: '600', color: '#1f2937' }}>{review.name}</div>
                              <div>{renderStars(review.rating)}</div>
                            </div>
                          </div>
                          <p className="mb-0" style={{ color: '#4b5563', lineHeight: '1.6' }}>{review.text}</p>
                        </div>
                      ))}
                      <button className="btn" style={{ 
                        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                        color: 'white',
                        borderRadius: '50px',
                        padding: '0.6rem 1.5rem',
                        fontWeight: '600',
                        border: 'none'
                      }}>
                        Add a Review
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <p style={{ 
            color: '#92400e', 
            fontSize: '0.9rem',
            background: 'rgba(255, 255, 255, 0.6)',
            display: 'inline-block',
            padding: '0.5rem 1rem',
            borderRadius: '50px'
          }}>
            👁️ You are a viewer | Made with ❤️ for pet lovers
          </p>
        </div>
      </div>
    </div>
  );
}