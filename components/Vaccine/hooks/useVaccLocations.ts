
// 'use client'

// import { useState, useEffect, useCallback } from 'react'
// import { getAllLocations }                   from '../../../data/api/VaccLocations'
// import { VaccLocation, ServiceType }         from '../../../types/VaccLocation'

// type Tab = 'animal' | 'human' | 'area'

// // serviceTypes that belong to each tab
// const ANIMAL_SERVICE_TYPES = [ServiceType.StrayAnimalCampaign, ServiceType.AnimalRabiesVaccine]
// const HUMAN_SERVICE_TYPES  = [ServiceType.HumanPEP, ServiceType.InquiryOnly]

// export function useVaccLocations() {
//   const [activeTab,       setActiveTab]       = useState<Tab>('animal')
//   const [animalLocations, setAnimalLocations] = useState<VaccLocation[]>([])
//   const [humanLocations,  setHumanLocations]  = useState<VaccLocation[]>([])
//   const [loading,         setLoading]         = useState(true)
//   const [error,           setError]           = useState<string | null>(null)

//   const loadAll = useCallback(async () => {
//     try {
//       setLoading(true)
//       setError(null)

//       // Fetch all active locations in one call, then split client-side
//       const all = await getAllLocations({ isActive: true })

//       setAnimalLocations(all.filter(l => ANIMAL_SERVICE_TYPES.includes(l.serviceType)))
//       setHumanLocations(all.filter(l => HUMAN_SERVICE_TYPES.includes(l.serviceType)))
//     } catch (err) {
//       console.error(err)
//       setError('Failed to load locations. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }, [])

//   useEffect(() => { loadAll() }, [loadAll])

//   // Re-fetch when dashboard fires this event after a create/delete
//   useEffect(() => {
//     window.addEventListener('locationsUpdated', loadAll)
//     return () => window.removeEventListener('locationsUpdated', loadAll)
//   }, [loadAll])

//   return {
//     activeTab,
//     setActiveTab,
//     animalLocations,
//     humanLocations,
//     loading,
//     error,
//     reload: loadAll,
//   }
// }

// hooks/useVaccLocations.ts
'use client'

import { useState, useEffect, useCallback } from 'react'
import { getAllLocations } from '../../../data/api/VaccLocations'
import { VaccLocation, ServiceType } from '../../../types/VaccLocation'

type Tab = 'animal' | 'human' | 'area'

const ANIMAL_SERVICE_TYPES = [ServiceType.StrayAnimalCampaign, ServiceType.AnimalRabiesVaccine]
const HUMAN_SERVICE_TYPES  = [ServiceType.HumanPEP, ServiceType.InquiryOnly]

export function useVaccLocations() {
  const [activeTab,       setActiveTab]       = useState<Tab>('animal')
  const [animalLocations, setAnimalLocations] = useState<VaccLocation[]>([])
  const [humanLocations,  setHumanLocations]  = useState<VaccLocation[]>([])
  const [loading,         setLoading]         = useState(true)
  const [error,           setError]           = useState<string | null>(null)

  const loadAll = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // IMPORTANT: جيب اللي isActive = true بس دول اللي يظهروا في Locations
      const all = await getAllLocations({ isActive: true })

      setAnimalLocations(all.filter(l => ANIMAL_SERVICE_TYPES.includes(l.serviceType)))
      setHumanLocations(all.filter(l => HUMAN_SERVICE_TYPES.includes(l.serviceType)))
    } catch (err) {
      console.error(err)
      setError('Failed to load locations. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadAll() }, [loadAll])

  useEffect(() => {
    window.addEventListener('locationsUpdated', loadAll)
    return () => window.removeEventListener('locationsUpdated', loadAll)
  }, [loadAll])

  return {
    activeTab,
    setActiveTab,
    animalLocations,
    humanLocations,
    loading,
    error,
    reload: loadAll,
  }
}