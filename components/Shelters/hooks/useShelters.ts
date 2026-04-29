// 'use client'

// import { useEffect, useState } from 'react'
// import { Shelter } from '../../../types/Shelter'

// const SHELTERS_PER_PAGE = 4

// export function useShelters() {
//   const [shelters, setShelters] = useState<Shelter[]>([])
//   const [loading, setLoading] = useState(true)

//   const [currentPage, setCurrentPage] = useState(1)

//   useEffect(() => {
//     fetch('/api/shelters')
//       .then(res => res.json())
//       .then(data => {
//         setShelters(data ?? [])
//       })
//       .finally(() => setLoading(false))
//   }, [])

//   const indexOfLast = currentPage * SHELTERS_PER_PAGE
//   const indexOfFirst = indexOfLast - SHELTERS_PER_PAGE

//   const currentShelters = shelters.slice(indexOfFirst, indexOfLast)

//   const totalPages = Math.ceil(shelters.length / SHELTERS_PER_PAGE)

//   return {
//     currentShelters,
//     filteredShelters: shelters,
//     loading,
//     currentPage,
//     setCurrentPage,
//     totalPages,
//   }
// }
// 'use client'

// import { useEffect, useState } from 'react'
// import { Shelter } from '../../../types/Shelter'

// const SHELTERS_PER_PAGE = 4

// export function useShelters() {
//   const [shelters, setShelters] = useState<Shelter[]>([])
//   const [loading, setLoading] = useState(true)
//   const [currentPage, setCurrentPage] = useState(1)

//   useEffect(() => {
//     fetch('/api/shelters')
//       .then(res => res.json())
//       .then(data => {
//         setShelters(Array.isArray(data) ? data : [])
//       })
//       .catch(err => {
//         console.error('Failed to load shelters:', err)
//         setShelters([])
//       })
//       .finally(() => setLoading(false))
//   }, [])

//   // ✅ Pagination - خليها جوه الـ hook مش لازم هنا
//   const totalPages = Math.ceil(shelters.length / SHELTERS_PER_PAGE)

//   return {
//     currentShelters: shelters,  // كل البيانات (الفلترة هتتم في الـ component)
//     filteredShelters: shelters,  // كل البيانات
//     loading,
//     currentPage,
//     setCurrentPage,
//     totalPages,
//   }
// }
// hooks/useShelters.ts — OPTIMIZED: shelters cached in Zustand store
// import { useState, useEffect } from 'react'
// import { Shelter } from '../../../types/Shelter'
// import { useSheltersStore, CACHE_DURATION } from '../../../store/Sheltersstore'  // ← عدّل المسار
// import { useAppStore } from '../../../store/Appstore'
// const SHELTERS_PER_PAGE = 4

// export function useShelters() {
//   // const { shelters, lastFetched, setShelters } = useSheltersStore()

//   const [loading, setLoading]       = useState(shelters.length === 0)
//   const [currentPage, setCurrentPage] = useState(1)
// const { shelters, isSheltersStale, setShelters } = useAppStore()
//   useEffect(() => {
//     const cacheExpired = !lastFetched || Date.now() - lastFetched > CACHE_DURATION

//     if (shelters.length === 0 || cacheExpired) {
//       setLoading(true)
//       fetch('/api/shelters')
//         .then(res => res.json())
//         .then(data => setShelters(Array.isArray(data) ? data : []))
//         .catch(err => {
//           console.error('Failed to load shelters:', err)
//           setShelters([])
//         })
//         .finally(() => setLoading(false))
//     }
//   }, [])

//   const totalPages = Math.ceil(shelters.length / SHELTERS_PER_PAGE)

//   return {
//     currentShelters: shelters,
//     filteredShelters: shelters,
//     loading,
//     currentPage,
//     setCurrentPage,
//     totalPages,
//   }
// }
'use client'
// hooks/useShelters.ts
import { useState, useEffect } from 'react'
import { useAppStore } from '../../../store/Appstore'

const SHELTERS_PER_PAGE = 4

export function useShelters() {
  const { shelters, isSheltersStale, setShelters } = useAppStore()

  const [loading, setLoading]         = useState(shelters.length === 0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (shelters.length === 0 || isSheltersStale()) {
      setLoading(true)
      fetch('/api/shelters')
        .then(res => res.json())
        .then(data => setShelters(Array.isArray(data) ? data : []))
        .catch(err => {
          console.error('Failed to load shelters:', err)
          setShelters([])
        })
        .finally(() => setLoading(false))
    }
  }, [])

  const totalPages = Math.ceil(shelters.length / SHELTERS_PER_PAGE)

  return {
    currentShelters: shelters,
    filteredShelters: shelters,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
  }
}