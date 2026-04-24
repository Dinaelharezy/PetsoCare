
// // hooks/useVaccLocations.ts
// 'use client'

// import { useState, useEffect, useCallback } from 'react'
// import { getAllLocations } from '../../../data/api/VaccLocations'
// import { VaccLocation, ServiceType } from '../../../types/VaccLocation'

// type Tab = 'animal' | 'human' | 'area'

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

//       // IMPORTANT: جيب اللي isActive = true بس دول اللي يظهروا في Locations
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

type Tab = 'animal' | 'human'

// ✅ الخدمات الحيوانية (التي تظهر في Tab الحيوانات)
const ANIMAL_SERVICE_TYPES = [
  ServiceType.AnimalRabiesVaccine,  // Pet Animal Hospitals, Veterinary Directorates
]

// ✅ الخدمات البشرية (التي تظهر في Tab البشر)
const HUMAN_SERVICE_TYPES = [
  ServiceType.HumanPEP,      // مستشفيات الطوارئ
  ServiceType.InquiryOnly,   // مديرية الصحة (استفسارات)
]

export function useVaccLocations() {
  const [activeTab, setActiveTab] = useState<Tab>('animal')
  const [animalLocations, setAnimalLocations] = useState<VaccLocation[]>([])
  const [humanLocations, setHumanLocations] = useState<VaccLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadAll = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // جلب الأماكن النشطة فقط (isActive = true)
      const all = await getAllLocations({ isActive: true })

      console.log('All active locations:', all)

      // فصل الأماكن حسب نوع الخدمة
      const animals = all.filter(loc => 
        ANIMAL_SERVICE_TYPES.includes(loc.serviceType)
      )
      
      const humans = all.filter(loc => 
        HUMAN_SERVICE_TYPES.includes(loc.serviceType)
      )

      console.log('Animal locations:', animals)
      console.log('Human locations:', humans)

      setAnimalLocations(animals)
      setHumanLocations(humans)
    } catch (err) {
      console.error(err)
      setError('Failed to load locations. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  // تحديث عند إضافة/تعديل مكان جديد
  useEffect(() => {
    const handleUpdate = () => loadAll()
    window.addEventListener('locationsUpdated', handleUpdate)
    return () => window.removeEventListener('locationsUpdated', handleUpdate)
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