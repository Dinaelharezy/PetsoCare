
// hooks/useVaccAreas.ts
'use client'

import { useState, useEffect } from 'react'
import { getAllLocations } from '../../../data/api/VaccLocations'
import { VaccLocation} from '../../../types/VaccLocation'

function normalizeGovernorate(value: string): string {
  const clean = value.trim().toLowerCase().replace(/\s/g, '')
  if (clean === 'portsaid') return 'Port Said'
  // ✅ capitalize أول حرف بس وباقيه lowercase
  const lower = value.trim().toLowerCase()
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}
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
        
        
        const allLocations = await getAllLocations()
        
        console.log('📊 All locations:', allLocations) // للتأكد
        
        // ✅ فلترة: خد بس اللي status = "false" أو isActive = false
        const inactiveOnly = allLocations.filter(loc => {
          // بعض APIs بترجع status بدل isActive
          const isInactive = loc.isActive === false || (loc as any).status === "false"
          return isInactive
        })
        
        console.log('✅ Inactive only:', inactiveOnly)
        
             const normalizedAreas = inactiveOnly.map(loc => ({
          ...loc,
          governorate: normalizeGovernorate(loc.governorate ?? ''),
        }))


       const unique = Array.from(new Set(normalizedAreas.map(l => l.governorate)))
  .filter(g => g && g.trim().length > 0)  // ✅ شيل الفاضي
  .map(g => ({ id: g, name: g }))

        setGovernorates(unique)
        if (unique.length > 0) {
          setSelectedGov(unique[0].id)
        }
        
        setAreas(normalizedAreas)
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