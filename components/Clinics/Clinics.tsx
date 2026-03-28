// 'use client'

// import { useState, useEffect, useCallback } from 'react'
// import { Container, Row, Col } from 'react-bootstrap'
// import SearchBar from './SearchBar'
// import CategoryFilters from './CategoryFilters'
// import PlaceCard from './PlaceCard'
// import Pagination from '../Pagination'

// const PLACES_PER_PAGE = 4

// export default function Clinics() {
//   const [places, setPlaces] = useState<Place[]>([])
//   const [loading, setLoading] = useState(true)
//   const [activeLocation, setActiveLocation] = useState('All')
//   const [activeType, setActiveType] = useState('All')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [locations, setLocations] = useState<string[]>(['All'])

//   const fetchPlaces = useCallback(async () => {
//     try {
//       setLoading(true)
//       const res = await fetch(`/api/Clinics?t=${Date.now()}`, { cache: 'no-store' })
//       if (!res.ok) throw new Error('API not working')
//       const data: Place[] = await res.json()
//       setPlaces(data)
//       console.log('Fetched places:', data)
//       // Extract unique locations from API ✅
//       const uniqueLocations = ['All', ...new Set(data.map((p) => p.location).filter(Boolean))]
//       setLocations(uniqueLocations)
//     } catch (error) {
//       console.error('Failed to fetch places:', error)
//     } finally {
//       setLoading(false)
//     }
//   }, [])

//   // Fetch on mount and listen for updates
//   useEffect(() => {
//     fetchPlaces()

//     // Listen for updates from admin panel
//     const handlePlacesUpdated = () => {
//       console.log('Places updated - refreshing...')
//       fetchPlaces()
//     }

//     window.addEventListener('clinicsUpdated', handlePlacesUpdated)

//     return () => {
//       window.removeEventListener('clinicsUpdated', handlePlacesUpdated)
//     }
//   }, [fetchPlaces])

//   // Sort: clinics first, then shelters — then apply filters
//   const filteredPlaces = [
//     ...places.filter((p) => p.type === 'clinic'),
//     ...places.filter((p) => p.type === 'shelter'),
//   ].filter((place) => {
//     const matchesLocation = activeLocation === 'All' || place.location === activeLocation
//     const matchesType = activeType === 'All' || place.type === activeType
//     const matchesSearch =
//       place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (place.description ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
//       place.location.toLowerCase().includes(searchQuery.toLowerCase())
//     return matchesLocation && matchesType && matchesSearch
//   })

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredPlaces.length / PLACES_PER_PAGE)
//   const startIndex = (currentPage - 1) * PLACES_PER_PAGE
//   const currentPlaces = filteredPlaces.slice(startIndex, startIndex + PLACES_PER_PAGE)

//   // Reset to page 1 when filters change
//   useEffect(() => {
//     setCurrentPage(1)
//   }, [activeLocation, activeType, searchQuery])

//   if (loading) {
//     return (
//       <Container className="py-5 text-center">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </Container>
//     )
//   }

//   return (
//     <>
//       {/* Header */}
//       <div className="header-section">
//         <Container>
//           <h1 className="main-title font-for-app">
//             Find Trusted Clinics &amp; Shelters Near You
//           </h1>
//           <p className="subtitle">
//             Discover verified veterinary clinics and pet shelters in your area. From routine
//             check-ups to finding a forever home — we help you find the right place for your pet.
//           </p>

//           <SearchBar value={searchQuery} onChange={setSearchQuery} />

//           {/* Location filter — same component as category filter */}
//           <CategoryFilters
//             categories={locations}
//             activeCategory={activeLocation}
//             onCategoryChange={setActiveLocation}
//           />

//           {/* Type filter */}
//           <CategoryFilters
//             categories={['All', 'clinic', 'shelter']}
//             activeCategory={activeType}
//             onCategoryChange={setActiveType}
//           />
//         </Container>
//       </div>

//       {/* Places Grid */}
//       <Container className="py-4">
//         {currentPlaces.length > 0 ? (
//           <>
//             <Row className="g-4">
//               {currentPlaces.map((place) => (
//                 <Col key={place.id} lg={3} md={6} sm={12}>
//                   <PlaceCard place={place} />
//                 </Col>
//               ))}
//             </Row>

//             {/* Pagination — only show if more than PLACES_PER_PAGE results */}
//             {filteredPlaces.length > PLACES_PER_PAGE && (
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 totalItems={filteredPlaces.length}
//                 itemsPerPage={PLACES_PER_PAGE}
//                 onPageChange={setCurrentPage}
//               />
//             )}
//           </>
//         ) : (
//           <div className="text-center py-5">
//             <h4 className="text-muted">No places found</h4>
//             <p className="text-muted">Try adjusting your search or filter</p>
//           </div>
//         )}
//       </Container>
//     </>
//   )
// }