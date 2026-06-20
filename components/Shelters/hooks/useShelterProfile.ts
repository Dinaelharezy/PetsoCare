// 'use client'

// import { useState, useEffect } from 'react'
// import { useAppStore } from '../../../store/Appstore'
// import { apiUrl } from '@/lib/api'
// import { Shelter } from '../../../types/Shelter'

// export function useShelterProfile(id: string) {
//   const { getShelterProfile, setShelterProfile } = useAppStore()

//   const [shelter, setShelter] = useState<Shelter | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [notFound, setNotFound] = useState(false)

//   useEffect(() => {
//     if (!id) return

//     const cached = getShelterProfile(id)
//     if (cached) {
//       setShelter(cached)
//       setLoading(false)
//       return
//     }

//     setLoading(true)
//     setNotFound(false)

//     fetch(apiUrl(`shelters/${id}`))
//       .then((res) => {
//         if (res.status === 404) {
//           setNotFound(true)
//           return null
//         }
//         return res.json()
//       })
//       .then((data) => {
//         if (data) {
//           setShelter(data)
//           setShelterProfile(id, data)
//         }
//       })
//       .catch((err) => {
//         console.error('Failed to load shelter profile:', err)
//         setNotFound(true)
//       })
//       .finally(() => setLoading(false))
//   }, [id])

//   return { shelter, loading, notFound }
// }

'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '../../../store/Appstore'
import { apiUrl } from '@/lib/api'
import { Shelter } from '../../../types/Shelter'

export function useShelterProfile(id: string) {
  const { getShelterProfile, setShelterProfile } = useAppStore()

  const [shelter, setShelter] = useState<Shelter | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return

    const cached = getShelterProfile(id)
    if (cached) {
      setShelter(cached)
      setLoading(false)
      return
    }

    setLoading(true)
    setNotFound(false)

    fetch(apiUrl(`shelters/${id}`))
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true)
          return null
        }
        return res.json()
      })
      .then((data) => {
        if (data) {
          setShelter(data)
          setShelterProfile(id, data)
        }
      })
      .catch((err) => {
        console.error('Failed to load shelter profile:', err)
        setNotFound(true)
      })
      .finally(() => setLoading(false))
  }, [id])

  return { shelter, loading, notFound }
}