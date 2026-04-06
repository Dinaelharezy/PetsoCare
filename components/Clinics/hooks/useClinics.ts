//code working
// import { useState, useEffect } from 'react'
// import { clinicsApi } from '@/data/api/Clinic'
// import { Clinic } from '@/types/Clinic'

// const CLINICS_PER_PAGE = 4

// export function useClinics() {
//   const [clinics, setClinics]               = useState<Clinic[]>([])
//   const [loading, setLoading]               = useState(true)
//   const [categories, setCategories]         = useState<string[]>(['Overview'])
//   const [activeCategory, setActiveCategory] = useState('Overview')
//   const [currentPage, setCurrentPage]       = useState(1)
//   const [searchQuery, setSearchQuery]       = useState('')

//   // ── Fetch ─────────────────────────────────────────────────────────────────
//   const fetchClinics = async () => {
//     try {
//       setLoading(true)
//       const data = await clinicsApi.getAll()
//       setClinics(data)
//       const uniqueCategories = ['Overview', ...new Set(data.map(c => c.governorate).filter(Boolean))]
//       setCategories(uniqueCategories)
//     } catch (error) {
//       console.error('Failed to fetch clinics:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchClinics()

//     const handleClinicsUpdated = () => fetchClinics()
//     window.addEventListener('clinicsUpdated', handleClinicsUpdated)
//     return () => window.removeEventListener('clinicsUpdated', handleClinicsUpdated)
//   }, [])

//   // ── Reset page on filter change ───────────────────────────────────────────
//   useEffect(() => {
//     setCurrentPage(1)
//   }, [activeCategory, searchQuery])

//   // ── Derived ───────────────────────────────────────────────────────────────
//   const filteredClinics = clinics.filter(clinic => {
//     const matchesCategory =
//       activeCategory === 'Overview' || clinic.governorate === activeCategory
//     const matchesSearch =
//       clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       clinic.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       clinic.governorate.toLowerCase().includes(searchQuery.toLowerCase())
//     return matchesCategory && matchesSearch
//   })

//   const totalPages    = Math.ceil(filteredClinics.length / CLINICS_PER_PAGE)
//   const startIndex    = (currentPage - 1) * CLINICS_PER_PAGE
//   const currentClinics = filteredClinics.slice(startIndex, startIndex + CLINICS_PER_PAGE)

//   return {
//     // data
//     currentClinics,
//     filteredClinics,
//     loading,
//     // categories
//     categories,
//     activeCategory,
//     setActiveCategory,
//     // search
//     searchQuery,
//     setSearchQuery,
//     // pagination
//     currentPage,
//     setCurrentPage,
//     totalPages,
//     CLINICS_PER_PAGE,
//   }
// }

import { useState, useEffect } from 'react'
import { clinicsApi } from '@/data/api/Clinic'
import { Clinic } from '@/types/Clinic'
import { FALLBACK_CLINICS } from '../../Home'

const CLINICS_PER_PAGE = 4

export function useClinics() {
  const [clinics, setClinics]               = useState<Clinic[]>([])
  const [loading, setLoading]               = useState(true)
  const [categories, setCategories]         = useState<string[]>(['Overview'])
  const [activeCategory, setActiveCategory] = useState('Overview')
  const [currentPage, setCurrentPage]       = useState(1)
  const [searchQuery, setSearchQuery]       = useState('')

  const fetchClinics = async () => {
    try {
      setLoading(true)
      const data = await clinicsApi.getAll()
      applyData(data)
    } catch {
      // API واقع → استخدم الـ fallback
      applyData(FALLBACK_CLINICS)
    } finally {
      setLoading(false)
    }
  }

  const applyData = (data: Clinic[]) => {
    setClinics(data)
    const uniqueCategories = [
      'Overview',
      ...new Set(data.map(c => c.governorate).filter(Boolean)),
    ]
    setCategories(uniqueCategories)
  }

  useEffect(() => {
    fetchClinics()
    window.addEventListener('clinicsUpdated', fetchClinics)
    return () => window.removeEventListener('clinicsUpdated', fetchClinics)
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, searchQuery])

  const filteredClinics = clinics.filter(clinic => {
    const matchesCategory =
      activeCategory === 'Overview' || clinic.governorate === activeCategory
    const matchesSearch =
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.governorate.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalPages     = Math.ceil(filteredClinics.length / CLINICS_PER_PAGE)
  const startIndex     = (currentPage - 1) * CLINICS_PER_PAGE
  const currentClinics = filteredClinics.slice(startIndex, startIndex + CLINICS_PER_PAGE)

  return {
    currentClinics,
    filteredClinics,
    loading,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    CLINICS_PER_PAGE,
  }
}