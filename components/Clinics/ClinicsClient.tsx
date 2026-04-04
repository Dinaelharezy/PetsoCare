
'use client'
import { Container, Row, Col } from 'react-bootstrap'
import CategoryFilters from './CategoryFilters'
import Card from './Card'
import Pagination from '../Pagination'
import { useClinics } from './hooks/useClinics'


const ClINICS_PER_PAGE = 4

export default function ClinicsClient() {
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
    CLINICS_PER_PAGE,
  } = useClinics()

  return (
    <>
      {/* Header */}
      <div className="header-section">
        <Container>
        <h1 className="main-title font-for-app">
        Find Trusted Clinics & Safe Shelters for Your Pet
        </h1>
        <p className="subtitle">
         Discover reliable veterinary clinics and caring shelters dedicated to your pet’s health, safety, and happiness. Everything you need in one place.
        </p>

          {/* <SearchBar value={searchQuery} onChange={setSearchQuery} /> */}
          
          <CategoryFilters
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </Container>
      </div>

      {/* Clinics Grid */}
      <Container className="py-4">
        {currentClinics.length > 0 ? (
          <>
            <Row className="g-4">
              {currentClinics.map((Clinic) => (
                <Col key={Clinic.id} lg={3} md={6} sm={12}>
                  <Card Clinic={Clinic} />
                </Col>
              ))}
            </Row>

            {/* Pagination - only show if more than 8 articles */}
            {filteredClinics.length > ClINICS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredClinics.length}
                itemsPerPage={ClINICS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-5">
            <h4 className="text-muted">No Clinics found</h4>
            <p className="text-muted">Try adjusting your filter</p>
          </div>
        )}
      </Container>
    </>
  )
}
