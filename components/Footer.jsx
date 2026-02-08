// components/Footer.tsx
'use client';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-light border-top">
      <Container className="py-5">
        <Row className="g-4">
          {/* Left Section - Brand & Social */}
          <Col lg={4} md={6}>
            <div className="mb-4">
              <p className="text-muted" style={{ 
                fontSize: '0.95rem',
                lineHeight: '1.6',
                maxWidth: '300px'
              }}>
                Your trusted companion for pet health and well-being. Keeping tails wagging and purrs rumbling.
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="d-flex gap-3">
              <Link 
                href="https://facebook.com" 
                target="_blank"
                className="text-muted"
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  border: '1px solid #ddd',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1877f2';
                  e.currentTarget.style.borderColor = '#1877f2';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = '#ddd';
                  e.currentTarget.style.color = '#6c757d';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Link>

              <Link 
                href="https://twitter.com" 
                target="_blank"
                className="text-muted"
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  border: '1px solid #ddd',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1da1f2';
                  e.currentTarget.style.borderColor = '#1da1f2';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = '#ddd';
                  e.currentTarget.style.color = '#6c757d';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>

              <Link 
                href="https://instagram.com" 
                target="_blank"
                className="text-muted"
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  border: '1px solid #ddd',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)';
                  e.currentTarget.style.borderColor = '#e1306c';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = '#ddd';
                  e.currentTarget.style.color = '#6c757d';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
            </div>
          </Col>

          {/* Company Section */}
          <Col lg={2} md={6} sm={6}>
            <h6 className="fw-semibold mb-3" style={{ fontSize: '1rem', color: '#333' }}>
              Company
            </h6>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <Link href="/about" className="text-muted text-decoration-none" style={{ fontSize: '0.9rem' }}>
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/careers" className="text-muted text-decoration-none" style={{ fontSize: '0.9rem' }}>
                  Careers
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/blog" className="text-muted text-decoration-none" style={{ fontSize: '0.9rem' }}>
                  Blog
                </Link>
              </li>
            </ul>
          </Col>

          {/* Support Section */}
          <Col lg={2} md={6} sm={6}>
            <h6 className="fw-semibold mb-3" style={{ fontSize: '1rem', color: '#333' }}>
              Support
            </h6>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <Link href="/contact" className="text-muted text-decoration-none" style={{ fontSize: '0.9rem' }}>
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/faq" className="text-muted text-decoration-none" style={{ fontSize: '0.9rem' }}>
                  FAQs
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/help" className="text-muted text-decoration-none" style={{ fontSize: '0.9rem' }}>
                  Help Center
                </Link>
              </li>
            </ul>
          </Col>

          {/* Legal Section */}
          <Col lg={2} md={6} sm={6}>
            <h6 className="fw-semibold mb-3" style={{ fontSize: '1rem', color: '#333' }}>
              Legal
            </h6>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <Link href="/privacy" className="text-muted text-decoration-none" style={{ fontSize: '0.9rem' }}>
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/terms" className="text-muted text-decoration-none" style={{ fontSize: '0.9rem' }}>
                  Terms of Service
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/cookies" className="text-muted text-decoration-none" style={{ fontSize: '0.9rem' }}>
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .footer-links a {
          transition: color 0.2s;
        }
        .footer-links a:hover {
          color: #7CB342 !important;
        }
      `}</style>
    </footer>
  );
}