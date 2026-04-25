

// // hooks/useVaccAreas.ts
// 'use client'

// import { useState, useEffect, useCallback } from 'react'
// import { getAllLocations } from '../../../data/api/VaccLocations'
// import { VaccLocation, ServiceType } from '../../../types/VaccLocation'

// export interface GovernorateOption {
//   id: string
//   name: string
// }

// export function useVaccAreas() {
//   const [governorates, setGovernorates] = useState<GovernorateOption[]>([])
//   const [selectedGov, setSelectedGov] = useState<string>('')
//   const [inactiveLocations, setInactiveLocations] = useState<VaccLocation[]>([])
//   const [loading, setLoading] = useState(true)
//   const [areaLoading, setAreaLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   // Step 1: load all INACTIVE campaign locations
//   useEffect(() => {
//     async function loadGovernorates() {
//       try {
//         setLoading(true)
//         // IMPORTANT: جيب اللي isActive = false دول اللي رايحين للـ Areas
//         const all = await getAllLocations({ 
//           isActive: false  
//         })

//         // استخراج المحافظات من الـ inactive locations
//         const unique = Array.from(new Set(all.map(l => l.governorate)))
//           .filter(Boolean)
//           .map(g => ({ id: g, name: g }))

//         setGovernorates(unique)
//         if (unique.length > 0) setSelectedGov(unique[0].id)
        
//         // خزني كل الـ inactive locations
//         setInactiveLocations(all)
//       } catch (err) {
//         console.error(err)
//         setError('Failed to load campaign areas.')
//       } finally {
//         setLoading(false)
//       }
//     }
//     loadGovernorates()
//   }, [])

//   // Step 2: filter by selected governorate from the stored inactive locations
//   const getFilteredAreas = useCallback((gov: string) => {
//     if (!gov) return []
//     return inactiveLocations.filter(loc => loc.governorate === gov)
//   }, [inactiveLocations])

//   const filteredAreas = getFilteredAreas(selectedGov)

//   const handleSelectGov = (id: string) => setSelectedGov(id)

//   return {
//     governorates,
//     selectedGov,
//     setSelectedGov: handleSelectGov,
//     areas: filteredAreas,  // دي اللي isActive = false
//     loading,
//     areaLoading: false, // مفيش loading منفصل دلوقتي عشان الداتا موجودة
//     error,
//   }
// }
// hooks/useVaccAreas.ts
'use client'

import { useState, useEffect } from 'react'
import { getAllLocations } from '../../../data/api/VaccLocations'
import { VaccLocation, ServiceType } from '../../../types/VaccLocation'

export function useVaccAreas() {
  const [governorates, setGovernorates] = useState<{id: string, name: string}[]>([])
  const [selectedGov, setSelectedGov] = useState<string>('')
  const [areas, setAreas] = useState<VaccLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCompletedCampaigns() {
      try {
        setLoading(true)
        
        // ✅ جلب جميع الأماكن (بدون فلتر serviceType)
        const allLocations = await getAllLocations()
        
        console.log('📊 All locations:', allLocations) // للتأكد
        
        // ✅ فلترة: خد بس اللي status = "false" أو isActive = false
        const inactiveOnly = allLocations.filter(loc => {
          // بعض APIs بترجع status بدل isActive
          const isInactive = loc.isActive === false || (loc as any).status === "false"
          return isInactive
        })
        
        console.log('✅ Inactive only:', inactiveOnly)
        
        // استخراج المحافظات
        const unique = Array.from(new Set(inactiveOnly.map(l => l.governorate)))
          .filter(Boolean)
          .map(g => ({ id: g, name: g }))

        setGovernorates(unique)
        if (unique.length > 0) {
          setSelectedGov(unique[0].id)
        }
        
        setAreas(inactiveOnly)
      } catch (err) {
        console.error(err)
        setError('Failed to load campaign areas.')
      } finally {
        setLoading(false)
      }
    }
    
    loadCompletedCampaigns()
  }, [])

  const filteredAreas = areas.filter(loc => loc.governorate === selectedGov)

  return {
    governorates,
    selectedGov,
    setSelectedGov,
    areas: filteredAreas,
    loading,
    error,
  }
}