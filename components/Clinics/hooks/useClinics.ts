

// import { useState, useEffect } from 'react'
// import { clinicsApi } from '@/data/api/Clinic'
// import { Clinic } from '@/types/Clinic'
// import { FALLBACK_CLINICS } from '../../Home'

// const CLINICS_PER_PAGE = 4

// export function useClinics() {
//   const [clinics, setClinics]               = useState<Clinic[]>([])
//   const [loading, setLoading]               = useState(true)
//   const [categories, setCategories]         = useState<string[]>(['Overview'])
//   const [activeCategory, setActiveCategory] = useState('Overview')
//   const [currentPage, setCurrentPage]       = useState(1)
//   const [searchQuery, setSearchQuery]       = useState('')

//   const fetchClinics = async () => {
//     try {
//       setLoading(true)
//       const data = await clinicsApi.getAll()
//       applyData(data)
//     } catch {
//       // API واقع → استخدم الـ fallback
//       applyData(FALLBACK_CLINICS)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const applyData = (data: Clinic[]) => {
//     setClinics(data)
//     const uniqueCategories = [
//       'Overview',
//       ...new Set(data.map(c => c.governorate).filter(Boolean)),
//     ]
//     setCategories(uniqueCategories)
//   }

//   useEffect(() => {
//     fetchClinics()
//     window.addEventListener('clinicsUpdated', fetchClinics)
//     return () => window.removeEventListener('clinicsUpdated', fetchClinics)
//   }, [])

//   useEffect(() => {
//     setCurrentPage(1)
//   }, [activeCategory, searchQuery])

//   const filteredClinics = clinics.filter(clinic => {
//     const matchesCategory =
//       activeCategory === 'Overview' || clinic.governorate === activeCategory
//     const matchesSearch =
//       clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       clinic.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       clinic.governorate.toLowerCase().includes(searchQuery.toLowerCase())
//     return matchesCategory && matchesSearch
//   })

//   const totalPages     = Math.ceil(filteredClinics.length / CLINICS_PER_PAGE)
//   const startIndex     = (currentPage - 1) * CLINICS_PER_PAGE
//   const currentClinics = filteredClinics.slice(startIndex, startIndex + CLINICS_PER_PAGE)

//   return {
//     currentClinics,
//     filteredClinics,
//     loading,
//     categories,
//     activeCategory,
//     setActiveCategory,
//     searchQuery,
//     setSearchQuery,
//     currentPage,
//     setCurrentPage,
//     totalPages,
//     CLINICS_PER_PAGE,
//   }
// }

// hooks/useClinics.ts — OPTIMIZED: clinics cached in Zustand store
// بيعمل fetch بس في أول زيارة أو بعد 5 دقايق

// import { useState, useEffect } from 'react'
// import { clinicsApi } from '@/data/api/Clinic'
// import { Clinic } from '@/types/Clinic'
// import { FALLBACK_CLINICS } from '../../Home'
// import { useClinicsStore, CACHE_DURATION } from '../../../store/Clinicsstore'  // ← عدّل المسار

// const CLINICS_PER_PAGE = 4

// export function useClinics() {
//   const { clinics, categories, lastFetched, setClinics, clearClinics } = useClinicsStore()

//   // الـ loading بيبان بس لو مفيش cached data
//   const [loading, setLoading] = useState(clinics.length === 0)

//   const [activeCategory, setActiveCategory] = useState('Overview')
//   const [currentPage, setCurrentPage]       = useState(1)
//   const [searchQuery, setSearchQuery]       = useState('')

//   const applyData = (data: Clinic[]) => {
//     const uniqueCategories = [
//       'Overview',
//       ...new Set(data.map(c => c.governorate).filter(Boolean)),
//     ]
//     setClinics(data, uniqueCategories)   // ← يحفظ في الـ store
//   }

//   const fetchClinics = async () => {
//     try {
//       setLoading(true)
//       const data = await clinicsApi.getAll()
//       applyData(data)
//     } catch {
//       applyData(FALLBACK_CLINICS)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     const cacheExpired =
//       !lastFetched || Date.now() - lastFetched > CACHE_DURATION

//     // بيعمل fetch بس لو:
//     // 1. مفيش data cached خالص
//     // 2. الـ cache انتهت (أكتر من 5 دقايق)
//     if (clinics.length === 0 || cacheExpired) {
//       fetchClinics()
//     }

//     // لو في تحديث جديد من الـ admin
//     window.addEventListener('clinicsUpdated', fetchClinics)
//     return () => window.removeEventListener('clinicsUpdated', fetchClinics)
//   }, [])

//   useEffect(() => {
//     setCurrentPage(1)
//   }, [activeCategory, searchQuery])

//   const filteredClinics = clinics.filter(clinic => {
//     const matchesCategory =
//       activeCategory === 'Overview' || clinic.governorate === activeCategory
//     const matchesSearch =
//       clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       clinic.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       clinic.governorate.toLowerCase().includes(searchQuery.toLowerCase())
//     return matchesCategory && matchesSearch
//   })

//   const totalPages     = Math.ceil(filteredClinics.length / CLINICS_PER_PAGE)
//   const startIndex     = (currentPage - 1) * CLINICS_PER_PAGE
//   const currentClinics = filteredClinics.slice(startIndex, startIndex + CLINICS_PER_PAGE)

//   return {
//     currentClinics,
//     filteredClinics,
//     loading,
//     categories,
//     activeCategory,
//     setActiveCategory,
//     searchQuery,
//     setSearchQuery,
//     currentPage,
//     setCurrentPage,
//     totalPages,
//     CLINICS_PER_PAGE,
//   }
// }

'use client'
// hooks/useClinics.ts
import { useState, useEffect } from 'react'
import { clinicsApi } from '@/data/api/Clinic'
import { Clinic } from '@/types/Clinic'
import { FALLBACK_CLINICS } from '../../Home'
import { useAppStore } from '../../../store/Appstore'

const CLINICS_PER_PAGE = 4

export function useClinics() {
  const { clinics, clinicCategories, isClinicsStale, setClinics } = useAppStore()

  const [loading, setLoading]               = useState(clinics.length === 0)
  const [activeCategory, setActiveCategory] = useState('Overview')
  const [currentPage, setCurrentPage]       = useState(1)
  const [searchQuery, setSearchQuery]       = useState('')

  const applyData = (data: Clinic[]) => {
    const uniqueCategories = [
      'Overview',
      ...new Set(data.map(c => c.governorate).filter(Boolean)),
    ]
    setClinics(data, uniqueCategories)
  }

  const fetchClinics = async () => {
    try {
      setLoading(true)
      const data = await clinicsApi.getAll()
      applyData(data)
    } catch {
      applyData(FALLBACK_CLINICS)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (clinics.length === 0 || isClinicsStale()) {
      fetchClinics()
    }
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
    categories: clinicCategories,
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