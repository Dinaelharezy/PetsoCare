
// 'use client'

// import { Container, Row, Col } from 'react-bootstrap'
// import Pagination from '../Pagination'
// import LoadingSpin from '../LoadingSpin'
// import ShelterCard from './ShelterCard'
// import { useShelters } from './hooks/useShelters'
// import CategoryFilters from '../Clinics/CategoryFilters'  // ✅ أضف الـ import
// import { useState } from 'react'

// const SHELTERS_PER_PAGE = 4

// export default function SheltersClient() {
//   const {
//     currentShelters,
//     filteredShelters,
//     loading,
//     currentPage,
//     setCurrentPage,
//     totalPages,
//   } = useShelters()
  
//   const [activeCategory, setActiveCategory] = useState('Overview')
  
//   // ✅ استخراج المحافظات الفريدة
//   const shelterCategories = [
//     'Overview',
//     ...new Set(filteredShelters.map(s => s.governorate).filter(Boolean))
//   ]
  
//   // ✅ فلترة حسب المحافظة
//   const displayedShelters = activeCategory === 'Overview'
//     ? filteredShelters
//     : filteredShelters.filter(s => s.governorate === activeCategory)
  
//   // ✅ Pagination للشيلترز المفلترة
//   const paginatedShelters = displayedShelters.slice(
//     (currentPage - 1) * SHELTERS_PER_PAGE, 
//     currentPage * SHELTERS_PER_PAGE
//   )
  
//   // ✅ عدد الصفحات حسب البيانات المفلترة
//   const filteredTotalPages = Math.ceil(displayedShelters.length / SHELTERS_PER_PAGE)

//   if (loading) return <LoadingSpin />

//   return (
//     <Container className="py-4">
//       {displayedShelters.length > 0 ? (
//         <>
//           {/* ✅ Category Filters */}
//           {shelterCategories.length > 1 && (
//             <div className="mb-5">

//               <CategoryFilters
//                 categories={shelterCategories}
//                 activeCategory={activeCategory}
//                 onCategoryChange={(category) => {
//                   setActiveCategory(category)
//                   setCurrentPage(1)  // ✅ ارجع للصفحة الأولى عند تغيير الفلتر
//                 }}
//               />
//             </div>
//           )}
          
//           <Row className="g-4">
//             {paginatedShelters.map((shelter) => (
//               <Col key={shelter.id} lg={3} md={6} sm={12}>
//                 <ShelterCard shelter={shelter} />
//               </Col>
//             ))}
//           </Row>

//           {/* ✅ Pagination - استخدم filteredTotalPages */}
//           {displayedShelters.length > SHELTERS_PER_PAGE && (
//             <Pagination
//               currentPage={currentPage}
//               totalPages={filteredTotalPages}
//               totalItems={displayedShelters.length}
//               itemsPerPage={SHELTERS_PER_PAGE}
//               onPageChange={setCurrentPage}
//             />
//           )}
//         </>
//       ) : (
//         <div className="text-center py-5">
//           <h4 className="text-muted">No Shelters found</h4>
//           <p className="text-muted">Try adjusting your filter</p>
//         </div>
//       )}
//     </Container>
//   )
// }
'use client'

import { Container, Row, Col } from 'react-bootstrap'
import Pagination from '../Pagination'
import LoadingSpin from '../LoadingSpin'
import ShelterCard from './ShelterCard'
import { useShelters } from './hooks/useShelters'

const SHELTERS_PER_PAGE = 4

interface Props {
  activeCategory?: string
}

export default function SheltersClient({ activeCategory = 'Overview' }: Props) {
  const {
    filteredShelters,
    loading,
    currentPage,
    setCurrentPage,
  } = useShelters()

  // فلترة حسب المحافظة اللي جاية من ClinicsClient
  const displayedShelters = activeCategory === 'Overview'
    ? filteredShelters
    : filteredShelters.filter((s) => s.governorate === activeCategory)

  // Pagination
  const paginatedShelters = displayedShelters.slice(
    (currentPage - 1) * SHELTERS_PER_PAGE,
    currentPage * SHELTERS_PER_PAGE
  )

  const filteredTotalPages = Math.ceil(displayedShelters.length / SHELTERS_PER_PAGE)

  if (loading) return <LoadingSpin />

  return (
    <>
      {displayedShelters.length > 0 ? (
        <>
          <Row className="g-4">
            {paginatedShelters.map((shelter) => (
              <Col key={shelter.id} lg={3} md={6} sm={12}>
                <ShelterCard shelter={shelter} />
              </Col>
            ))}
          </Row>

          {displayedShelters.length > SHELTERS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={filteredTotalPages}
              totalItems={displayedShelters.length}
              itemsPerPage={SHELTERS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <div className="text-center py-5">
          <h4 className="text-muted">No Shelters found</h4>
          <p className="text-muted">Try adjusting your filter</p>
        </div>
      )}
    </>
  )
}