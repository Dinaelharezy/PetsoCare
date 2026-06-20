
'use client'
import { Container, Row, Col, Button } from 'react-bootstrap'
import CategoryFilters from '../components/CategoryFilters'
import Card from '../components/Card'
import Pagination from '../../Pagination'
import { useClinics } from '../hooks/useClinics'
import LoadingSpin from '../../LoadingSpin'
import SheltersClient from '../../Shelters/SheltersClient'
import { useState } from 'react'

const CLINICS_PER_PAGE = 4

export default function ClinicsClient() {
  const [showClinics, setShowClinics] = useState(true)
  const [shelterActiveCategory, setShelterActiveCategory] = useState('Overview')

  const {
    currentClinics,
    filteredClinics,
    loading,
    categories,
    activeCategory,
    setActiveCategory,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useClinics()

  if (loading) return <LoadingSpin />

  return (
    <>
      {/* Header */}
      <div className="header-section">
        <Container>
          <h1 className="main-title font-for-app">
            Find Trusted Clinics & Safe Shelters for Your Pet
          </h1>
          <p className="subtitle">
            Discover reliable veterinary clinics and caring shelters dedicated to your pet's health, safety, and happiness. Everything you need in one place.
          </p>

          {/* Toggle Buttons */}
          <div className="d-flex justify-content-center gap-3 mb-4">
            <Button
              onClick={() => setShowClinics(true)}
              style={{
                backgroundColor: showClinics ? '#7CB342' : '#f0f0f0',
                color: showClinics ? 'white' : '#555',
                border: 'none',
                borderRadius: '30px',
                padding: '10px 30px',
                fontWeight: '600',
              }}
            >
              🏥 Clinics
            </Button>
            <Button
              onClick={() => setShowClinics(false)}
              style={{
                backgroundColor: !showClinics ? '#7CB342' : '#f0f0f0',
                color: !showClinics ? 'white' : '#555',
                border: 'none',
                borderRadius: '30px',
                padding: '10px 30px',
                fontWeight: '600',
              }}
            >
              🏠 Shelters
            </Button>
          </div>

          {/* Category Filters — same position for both */}
          {showClinics ? (
            <CategoryFilters
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          ) : (
            <ShelterCategoryFiltersSlot
              activeCategory={shelterActiveCategory}
              onCategoryChange={(cat) => {
                setShelterActiveCategory(cat)
              }}
            />
          )}
        </Container>
      </div>

      {/* Content */}
      <Container className="py-4">
        {showClinics ? (
          currentClinics.length > 0 ? (
            <>
              <Row className="g-4">
                {currentClinics.map((clinic) => (
                  <Col key={clinic.id} lg={3} md={6} sm={12}>
                    <Card Clinic={clinic} />
                  </Col>
                ))}
              </Row>

              {filteredClinics.length > CLINICS_PER_PAGE && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredClinics.length}
                  itemsPerPage={CLINICS_PER_PAGE}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="text-center py-5">
              <h4 className="text-muted">No Clinics found</h4>
              <p className="text-muted">Try adjusting your filter</p>
            </div>
          )
        ) : (
          <SheltersClient activeCategory={shelterActiveCategory} />
        )}
      </Container>
    </>
  )
}

// ── Placeholder slot عشان يجيب الـ categories من SheltersClient ──
// هنعمله بطريقة تانية — نجيب الـ shelters data هنا مباشرة
import { useShelters } from '../../Shelters/hooks/useShelters'

function ShelterCategoryFiltersSlot({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string
  onCategoryChange: (cat: string) => void
}) {
  const { filteredShelters } = useShelters()

  const shelterCategories = [
    'Overview',
    ...Array.from(new Set(filteredShelters.map((s) => s.governorate).filter(Boolean))),
  ]

  if (shelterCategories.length <= 1) return null

  return (
    <CategoryFilters
      categories={shelterCategories}
      activeCategory={activeCategory}
      onCategoryChange={onCategoryChange}
    />
  )
}