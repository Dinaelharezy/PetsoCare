
'use client'

import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import CategoryFilters from './CategoryFilters'
import Card from './Card'
import Pagination from './Pagination'
import { clinicsApi } from '@/data/api/Clinic'
import { Clinic } from '@/types/Clinic'



const ClINICS_PER_PAGE = 4

export default function ClinicsClient() {
  const [Clinic, setClinic] = useState<Clinic[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Overview')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

const [categories, setCategories] = useState<string[]>(['Overview'])

const fetchClinics = async () => {
  try {
    setLoading(true)
    const data = await clinicsApi.getAll()
    setClinic(data)
    console.log('Fetched Clinic:', data)
    // استخرجي الـ categories من الـ API ✅
    const uniqueCategories = ['Overview', ...new Set(data.map(a => a.governorate).filter(Boolean))]
    setCategories(uniqueCategories)
    
  } catch (error) {
    console.error('Failed to fetch Clinic:', error)
  } finally {
    setLoading(false)
  }
}

  // Fetch articles on mount and listen for updates
  useEffect(() => {
    fetchClinics()

    // Listen for article updates from admin panel
    const handleClinicsUpdated = () => {
      console.log('Articles updated - refreshing...')
      fetchClinics()
    }

    window.addEventListener('Clinics Updated', handleClinicsUpdated)

    return () => {
      window.removeEventListener('Clinics Updated', handleClinicsUpdated)
    }
  }, [])



  // Filter articles based on category and search
 const filteredClinics = Clinic.filter(Clinic => {
  const matchesCategory = activeCategory === 'Overview' || Clinic.category === activeCategory
  const matchesSearch =
    Clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    Clinic.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    Clinic.governorate.toLowerCase().includes(searchQuery.toLowerCase()) // 
  return matchesCategory && matchesSearch
})

  // Calculate pagination
  const totalPages = Math.ceil(filteredClinics.length / ClINICS_PER_PAGE)
  const startIndex = (currentPage - 1) * ClINICS_PER_PAGE
  const endIndex = startIndex + ClINICS_PER_PAGE
  const currentClinics = filteredClinics.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, searchQuery])

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    )
  }

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
