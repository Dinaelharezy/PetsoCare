// 'use client'

// import { useParams, useRouter } from 'next/navigation'
// import { Container, Button } from 'react-bootstrap'
// import LoadingSpin from '../LoadingSpin'
// import { useShelterProfile } from './hooks/useShelterProfile'
// import ShelterProfileView from './ShelterProfileView'

// export default function SheltersProfile() {
//   const params = useParams()
//   const router = useRouter()

//   const { shelter, loading, notFound } = useShelterProfile(params.id as string)

//   if (loading) return <LoadingSpin />

//   if (notFound || !shelter) {
//     return (
//       <Container className="py-5 text-center">
//         <h4 className="text-muted">Shelter not found</h4>
//         <Button className="mt-3" onClick={() => router.back()}>
//           Go Back
//         </Button>
//       </Container>
//     )
//   }

//   return <ShelterProfileView shelter={shelter} onBack={() => router.back()} />
// }

'use client'

import { useParams, useRouter } from 'next/navigation'
import { Container, Button } from 'react-bootstrap'
import LoadingSpin from '../LoadingSpin'
import { useShelterProfile } from './hooks/useShelterProfile'
import ShelterProfileView from './ShelterProfileView'

export default function SheltersProfile() {
  const params = useParams()
  const router = useRouter()

  const { shelter, loading, notFound } = useShelterProfile(params.id as string)

  if (loading) return <LoadingSpin />

  if (notFound || !shelter) {
    return (
      <Container className="py-5 text-center">
        <h4 className="text-muted">Shelter not found</h4>
        <Button className="mt-3" onClick={() => router.back()}>
          Go Back
        </Button>
      </Container>
    )
  }

  return <ShelterProfileView shelter={shelter} onBack={() => router.back()} />
}