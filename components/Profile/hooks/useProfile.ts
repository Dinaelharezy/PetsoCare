'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export interface Pet {
  id: number
  name: string
  type: string
  age: string
  image: string
}

export interface Vaccine {
  name: string
  pet: string
  date: string
}

export function useProfile() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  const isLoading = status === 'loading'

  const userName  = session?.user?.name  ?? 'Mariam Ahmed'
  const userEmail = session?.user?.email ?? ''
  const userImage = session?.user?.image ?? '/woman.png'
  const userRole  = session?.user?.roles?.[0] ?? 'User'

  // Static data — replace with API calls as needed
  const pets: Pet[] = [
    { id: 1, name: 'Moly',     type: 'Cat', age: '3 years old', image: '/cat.png' },
    { id: 2, name: 'Whiskers', type: 'Dog', age: '5 years old', image: '/dog.png' },
    { id: 3, name: 'Flopsy',   type: 'Dog', age: '5 months',    image: '/dog 3.png' },
  ]

  const vaccines: Vaccine[] = [
    { name: 'Rabies Booster',  pet: 'Moly',     date: '2024-08-15' },
    { name: 'Feline Leukemia', pet: 'Whiskers', date: '2024-09-01' },
    { name: 'Distemper',       pet: 'Flopsy',   date: '2024-09-20' },
  ]

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  const handleEditProfile = () => {
    router.push('/main/EditProfile')
  }

  return {
    isLoading,
    userName,
    userEmail,
    userImage,
    userRole,
    pets,
    vaccines,
    handleLogout,
    handleEditProfile,
  }
}