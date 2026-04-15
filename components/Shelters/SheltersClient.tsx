

// 'use client'

// import { Container, Row, Col } from 'react-bootstrap'
// import Pagination from '../Pagination'
// import LoadingSpin from '../LoadingSpin'
// import ShelterCard from './ShelterCard'
// import { useShelters } from './hooks/useShelters'

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

//   if (loading) return <LoadingSpin />

//   return (
//     <Container className="py-4">
//       {currentShelters.length > 0 ? (
//         <>
//           <Row className="g-4">
//             {currentShelters.map((shelter) => (
//               <Col key={shelter.id} lg={3} md={6} sm={12}>
//                 <ShelterCard shelter={shelter} />
//               </Col>
//             ))}
//           </Row>

//           {filteredShelters.length > SHELTERS_PER_PAGE && (
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               totalItems={filteredShelters.length}
//               itemsPerPage={SHELTERS_PER_PAGE}
//               onPageChange={setCurrentPage}
//             />
//           )}
//         </>
//       ) : (
//         <div className="text-center py-5">
//           <h4 className="text-muted">No Shelters found</h4>
//           <p className="text-muted">Try again later</p>
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

export default function SheltersClient() {
  const {
    currentShelters,
    filteredShelters,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useShelters()

  // const [selectedShelterId, setSelectedShelterId] = useState<string | null>(null)

  if (loading) return <LoadingSpin />

  // const selectedShelter = filteredShelters.find(s => s.id === selectedShelterId)

  return (
    <Container className="py-4">
      {currentShelters.length > 0 ? (
        <>
         <Row className="g-4">
  {currentShelters.map((shelter) => (
    <Col key={shelter.id} lg={3} md={6} sm={12}>
      <ShelterCard shelter={shelter} />
    </Col>
  ))}
</Row>
      

          {/* ✅ عرض التفاصيل تحت
          {selectedShelter && (
            <div className="mt-5 p-4 border rounded bg-light">
              <h4>{selectedShelter.name}</h4>
              <p><b>Location:</b> {selectedShelter.address}</p>
              <p><b>Capacity:</b> {selectedShelter.capacity}</p>
              <p><b>Phone:</b> {selectedShelter.governorate}</p>
              <p><b>Working Hours:</b> {selectedShelter.workingHours}</p>
              <p><b>Working Hours:</b> {selectedShelter.phone}</p>
            </div>
          )} */}




          {filteredShelters.length > SHELTERS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredShelters.length}
              itemsPerPage={SHELTERS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <div className="text-center py-5">
          <h4 className="text-muted">No Shelters found</h4>
        </div>
      )}
    </Container>
  )
}