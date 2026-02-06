'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet'
export default function PetCareFinder() {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Only load Leaflet on the client side
    if (typeof window !== 'undefined' && !mapLoaded) {
      const L = require('leaflet');
      
      // Fix for default marker icons in Leaflet with webpack
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      if (mapRef.current && !mapRef.current._leaflet_id) {
        const map = L.map(mapRef.current).setView([31.26, 32.30], 11);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(map);

        const locations = [
          { lat: 31.26, lng: 32.30, name: 'Port Said' },
          { lat: 31.20, lng: 32.28, name: 'Clinic 1' },
          { lat: 31.28, lng: 32.32, name: 'Clinic 2' },
          { lat: 31.24, lng: 32.26, name: 'Emergency Services' }
        ];

        locations.forEach(loc => {
          L.marker([loc.lat, loc.lng])
            .addTo(map)
            .bindPopup(loc.name);
        });

        setMapLoaded(true);
      }
    }
  }, [mapLoaded]);

  return (
    <>
      <style jsx global>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f8f9fa;
          margin: 0;
        }
        .navbar {
          background-color: white;
          border-bottom: 1px solid #e0e0e0;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-link {
          color: #333;
          text-decoration: none;
          font-weight: 500;
        }
        .search-bar {
          max-width: 300px;
          border-radius: 20px;
          border: 1px solid #ddd;
          padding: 0.4rem 1rem;
        }
        .user-avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background-color: #ff6b6b;
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .main-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 2rem;
        }
        .page-title {
          text-align: center;
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 2rem;
          color: #333;
        }
        .map-container {
          width: 100%;
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          background-color: #e0e0e0;
        }
        .filter-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
        }
        .filter-left {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .filter-btn {
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          border: 1px solid #ddd;
          background-color: white;
          color: #666;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        .filter-btn.active {
          background-color: #90ee90;
          border-color: #90ee90;
          color: #333;
        }
        .filter-btn:hover {
          border-color: #90ee90;
        }
        .report-btn {
          background-color: #90ee90;
          color: #333;
          font-weight: 500;
        }
        .clinic-card {
          background-color: white;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .clinic-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 1rem;
        }
        .clinic-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.3rem;
        }
        .clinic-address {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        .clinic-hours {
          color: #666;
          font-size: 0.9rem;
        }
        .rating-stars {
          color: #ffd700;
          font-size: 0.9rem;
        }
        .rating-stars.empty {
          color: #ddd;
        }
        .rating-number {
          color: #666;
          font-size: 0.85rem;
          margin-left: 0.3rem;
        }
        .availability-badge {
          display: inline-block;
          padding: 0.3rem 0.8rem;
          background-color: #90ee90;
          color: #2d5016;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          margin-top: 0.5rem;
        }
        .reviews-section {
          margin-top: 1.5rem;
        }
        .reviews-title {
          font-weight: 600;
          margin-bottom: 1rem;
          color: #333;
        }
        .review-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #f0f0f0;
        }
        .review-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
          margin-bottom: 0;
        }
        .review-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #ddd;
          flex-shrink: 0;
        }
        .review-content {
          flex: 1;
        }
        .review-author {
          font-weight: 600;
          margin-bottom: 0.3rem;
          color: #333;
        }
        .review-stars {
          color: #ffd700;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
        }
        .review-text {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        .add-review-btn {
          background-color: #90ee90;
          color: #333;
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 20px;
          font-weight: 500;
          cursor: pointer;
          font-size: 0.9rem;
        }
        .add-review-btn:hover {
          background-color: #7ed97e;
        }
        .footer {
          background-color: white;
          border-top: 1px solid #e0e0e0;
          padding: 3rem 0 2rem;
          margin-top: 4rem;
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .footer-section h6 {
          font-weight: 600;
          margin-bottom: 1rem;
          color: #333;
        }
        .footer-section a {
          display: block;
          color: #666;
          text-decoration: none;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        .footer-section a:hover {
          color: #333;
        }
        .social-icons {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .social-icon {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: 1px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          text-decoration: none;
        }
        .footer-bottom {
          text-align: center;
          color: #999;
          font-size: 0.85rem;
          padding-top: 2rem;
          border-top: 1px solid #e0e0e0;
        }
        .viewer-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #999;
        }
        .eye-icon {
          width: 20px;
          height: 20px;
        }
      `}</style>

      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      
      {/* Main Content */}
      <div className="main-container">
        <h1 className="page-title">Interactive Map: Find Your Nearest Pet Care</h1>

         <div className="map-container">
          <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
        </div> 
       

        {/* Filters */}
        <div className="filter-buttons">
          <div className="filter-left">
            <button className="filter-btn active">Clinics</button>
            <button className="filter-btn">Hospitals</button>
            <button className="filter-btn">Shelters</button>
            <button className="filter-btn">Emergency Services</button>
          </div>
          <button className="filter-btn report-btn">Report Emergency Animal</button>
        </div>

        {/* Clinic Card */}
        <div className="clinic-card">
          <div className="clinic-header">
            <div>
              <h2 className="clinic-title">Happy Paws Veterinary Clinic</h2>
              <div className="clinic-address">
                📍 28 Giza St, Port Said, Egypt
              </div>
              <div className="clinic-hours">
                Hours: Mon-Fri: 9 AM - 6 PM; Sat: 10 AM - 4 PM
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div>
                <span className="rating-stars">★★★★</span><span className="rating-stars empty">★</span>
                <span className="rating-number">4.2</span>
              </div>
              <div>
                <span className="availability-badge">Available Now</span>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="reviews-section">
            <h3 className="reviews-title">Reviews (3)</h3>
            
            <div className="review-item">
              <div className="review-avatar"></div>
              <div className="review-content">
                <div className="review-author">Ahmed Hassan</div>
                <div className="review-stars">★★★★★</div>
                <div className="review-text">Great service! My dog received very good and knowledgeable. My fur always feels comfortable here.</div>
              </div>
            </div>

            <div className="review-item">
              <div className="review-avatar"></div>
              <div className="review-content">
                <div className="review-author">Layla Mohamed</div>
                <div className="review-stars">★★★★★</div>
                <div className="review-text">Love this vet. Waiting time Dr. Emad saved my dog's life. Highly recommend this clinic.</div>
              </div>
            </div>

            <div className="review-item">
              <div className="review-avatar"></div>
              <div className="review-content">
                <div className="review-author">Sara Tarek</div>
                <div className="review-stars">★★★★</div>
                <div className="review-text">Very professional. My cat always comes out so very comfortable. Overall a positive experience for my pets.</div>
              </div>
            </div>

            <button className="add-review-btn">Add a Review</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section" style={{ maxWidth: '300px' }}>
            <h6>Company</h6>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
              Your trusted companion for pet health and well-being. Ensuring safe and nurturing care for every beloved animal.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon">f</a>
              <a href="#" className="social-icon">𝕏</a>
              <a href="#" className="social-icon">in</a>
            </div>
          </div>
          <div className="footer-section">
            <h6>Support</h6>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">FAQ</a>
            <a href="#">Blog</a>
            <a href="#">Help Center</a>
          </div>
          <div className="footer-section">
            <h6>Legal</h6>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Pawpal 
            <span className="viewer-badge">
              <svg className="eye-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              You are a viewer
            </span>
          </p>
        </div>
      </footer>
    </>
  );
}