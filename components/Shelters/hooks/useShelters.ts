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
'use client'

import { useEffect, useState } from 'react'
import { Shelter } from '../../../types/Shelter'

const SHELTERS_PER_PAGE = 4

export function useShelters() {
  const [shelters, setShelters] = useState<Shelter[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch('/api/shelters')
      .then(res => res.json())
      .then(data => {
        setShelters(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        console.error('Failed to load shelters:', err)
        setShelters([])
      })
      .finally(() => setLoading(false))
  }, [])

  // ✅ Pagination - خليها جوه الـ hook مش لازم هنا
  const totalPages = Math.ceil(shelters.length / SHELTERS_PER_PAGE)

  return {
    currentShelters: shelters,  // كل البيانات (الفلترة هتتم في الـ component)
    filteredShelters: shelters,  // كل البيانات
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
  }
}