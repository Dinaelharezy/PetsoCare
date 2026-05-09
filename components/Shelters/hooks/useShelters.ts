
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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shelters`)
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