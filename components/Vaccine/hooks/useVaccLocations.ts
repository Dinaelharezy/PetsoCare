
'use client'

import { useState, useEffect, useCallback } from 'react'
import { getAllLocations } from '../../../data/api/VaccLocations'
import { VaccLocation, ServiceType } from '../../../types/VaccLocation'

type Tab = 'animal' | 'human'

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

      const all = await getAllLocations({ isActive: true })
      console.log('All active locations:', all)

      const animals = all.filter(loc => loc.serviceType === ServiceType.Animal &&  (loc as any).status === 'true' )
      const humans  = all.filter(loc => loc.serviceType === ServiceType.Human &&   (loc as any).status === 'true' )

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