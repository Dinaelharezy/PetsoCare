'use client'

import { useEffect, useState } from 'react'
import { UserVaccineData, GlobalStats } from '../../../types/Statistics'
import { apiUrl } from '@/lib/api'

export function useStatistics() {
  const [users,   setUsers]   = useState<UserVaccineData[]>([])
  const [stats,   setStats]   = useState<GlobalStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, statsRes] = await Promise.all([
          fetch(apiUrl('admin/vaccine/users')),
          fetch(apiUrl('admin/vaccine/stats')),
        ])
        const usersData = await usersRes.json()
        const statsData = await statsRes.json()
        setUsers(Array.isArray(usersData) ? usersData : (usersData.users ?? []))
        setStats(statsData ?? null)
      } catch (err) {
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const completion = stats && stats.totalDoses > 0
    ? Math.round((stats.takenDoses / stats.totalDoses) * 100)
    : 0

  return { users, stats, loading, completion }
}