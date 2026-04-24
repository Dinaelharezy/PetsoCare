

// ════════════════════════════════════════════════════════════════════════════
// hooks/useVaccAreas.ts
// ════════════════════════════════════════════════════════════════════════════
// 'use client'

// import { useState, useEffect, useCallback } from 'react'
// import { getAllLocations }                   from '../../../data/api/VaccLocations'
// import { VaccLocation, ServiceType }         from '../../../types/VaccLocation'

// export interface GovernorateOption {
//   id:   string   // the string passed to the API  e.g. "Port Said"
//   name: string   // display label
// }

// export function useVaccAreas() {
//   // ── governorate list (built dynamically from backend data) ────────────────
//   const [governorates,   setGovernorates]   = useState<GovernorateOption[]>([])
//   const [selectedGov,    setSelectedGov]    = useState<string>('')
//   const [districts,      setDistricts]      = useState<VaccLocation[]>([])
//   const [loading,        setLoading]        = useState(true)
//   const [districtLoading,setDistrictLoading]= useState(false)
//   const [error,          setError]          = useState<string | null>(null)

//   // ── Step 1: load all unique governorates on mount ─────────────────────────
//   useEffect(() => {
//     async function loadGovernorates() {
//       try {
//         setLoading(true)
//         // fetch all campaign-type locations
//         const all = await getAllLocations({
//           serviceType: ServiceType.StrayAnimalCampaign,
//         })

//         // Deduplicate governorates
//         const unique = Array.from(new Set(all.map(l => l.governorate)))
//           .filter(Boolean)
//           .map(g => ({ id: g, name: g }))

//         setGovernorates(unique)

//         // auto-select first
//         if (unique.length > 0) setSelectedGov(unique[0].id)
//       } catch (err) {
//         console.error(err)
//         setError('Failed to load governorates.')
//       } finally {
//         setLoading(false)
//       }
//     }
//     loadGovernorates()
//   }, [])

//   // ── Step 2: load districts for selected governorate ───────────────────────
//   const loadDistricts = useCallback(async (gov: string) => {
//     if (!gov) return
//     try {
//       setDistrictLoading(true)
//       const data = await getAllLocations({
//         governorate: gov,
//         serviceType: ServiceType.StrayAnimalCampaign,
//       })
//       setDistricts(data)
//     } catch (err) {
//       console.error(err)
//       setDistricts([])
//     } finally {
//       setDistrictLoading(false)
//     }
//   }, [])

//   useEffect(() => {
//     if (selectedGov) loadDistricts(selectedGov)
//   }, [selectedGov, loadDistricts])

//   const handleSelectGov = (id: string) => setSelectedGov(id)

//   return {
//     governorates,
//     selectedGov,
//     setSelectedGov: handleSelectGov,
//     districts,
//     loading,
//     districtLoading,
//     error,
//   }
// }

// hooks/useVaccAreas.ts
'use client'

import { useState, useEffect, useCallback } from 'react'
import { getAllLocations } from '../../../data/api/VaccLocations'
import { VaccLocation, ServiceType } from '../../../types/VaccLocation'

export interface GovernorateOption {
  id: string
  name: string
}

export function useVaccAreas() {
  const [governorates, setGovernorates] = useState<GovernorateOption[]>([])
  const [selectedGov, setSelectedGov] = useState<string>('')
  const [inactiveLocations, setInactiveLocations] = useState<VaccLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [areaLoading, setAreaLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Step 1: load all INACTIVE campaign locations
  useEffect(() => {
    async function loadGovernorates() {
      try {
        setLoading(true)
        // IMPORTANT: جيب اللي isActive = false دول اللي رايحين للـ Areas
        const all = await getAllLocations({ 
          serviceType: ServiceType.StrayAnimalCampaign,
          isActive: false  // <----- هنا الفلتر المهم
        })

        // استخراج المحافظات من الـ inactive locations
        const unique = Array.from(new Set(all.map(l => l.governorate)))
          .filter(Boolean)
          .map(g => ({ id: g, name: g }))

        setGovernorates(unique)
        if (unique.length > 0) setSelectedGov(unique[0].id)
        
        // خزني كل الـ inactive locations
        setInactiveLocations(all)
      } catch (err) {
        console.error(err)
        setError('Failed to load campaign areas.')
      } finally {
        setLoading(false)
      }
    }
    loadGovernorates()
  }, [])

  // Step 2: filter by selected governorate from the stored inactive locations
  const getFilteredAreas = useCallback((gov: string) => {
    if (!gov) return []
    return inactiveLocations.filter(loc => loc.governorate === gov)
  }, [inactiveLocations])

  const filteredAreas = getFilteredAreas(selectedGov)

  const handleSelectGov = (id: string) => setSelectedGov(id)

  return {
    governorates,
    selectedGov,
    setSelectedGov: handleSelectGov,
    areas: filteredAreas,  // دي اللي isActive = false
    loading,
    areaLoading: false, // مفيش loading منفصل دلوقتي عشان الداتا موجودة
    error,
  }
}