// 'use client'

// import { useSession, signOut } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { useEffect,useState } from 'react'

// export interface Pet {
//   id: number
//   name: string
//   type: string
//   age: string
//   image: string
// }

// export interface Vaccine {
//   name: string
//   pet: string
//   date: string
// }

// export function useProfile() {
//   const { data: session, status } = useSession()
//   const router = useRouter()

//   // Redirect unauthenticated users
//   useEffect(() => {
//     if (status === 'unauthenticated') router.push('/login')
//   }, [status, router])
// //  const [vaccines, setVaccines] = useState<Vaccine[]>([])
//   const [loadingData, setLoadingData] = useState(true)
// // في useEffect بتاع fetch profile، خزّن البيانات:
// const [profileData, setProfileData] = useState<any>(null)

// useEffect(() => {
//   if (status === 'authenticated') {
//     fetch('/api/user/profile')
//       .then(res => res.json())
//       .then(data => setProfileData(data))  // ✅ خزّن البيانات
//       .catch(err => console.error('Failed to fetch profile:', err))
//   }
// }, [status])

// // واستخدمها هنا:
// const userName  = profileData?.name  ?? session?.user?.name  ?? ''
// const userEmail = profileData?.email ?? session?.user?.email ?? ''
// const userImage = profileData?.image ?? session?.user?.image ?? '/woman.png'
// const userRole  = profileData?.role  ?? session?.user?.role  ?? 'User'
//   const isLoading = status === 'loading'

//     // Fetch profile data from API
//   useEffect(() => {
//     if (status === 'authenticated') {
//       setLoadingData(true)
//       fetch('/api/user/profile')
//         .then(res => res.json())
//         .catch(err => console.error('Failed to fetch profile:', err))
//         .finally(() => setLoadingData(false))
//     }
//   }, [status])

//   // Static data — replace with API calls as needed
//   const pets: Pet[] = [
//     { id: 1, name: 'Moly',     type: 'Cat', age: '3 years old', image: '/cat.png' },
//     { id: 2, name: 'Whiskers', type: 'Dog', age: '5 years old', image: '/dog.png' },
//     { id: 3, name: 'Flopsy',   type: 'Dog', age: '5 months',    image: '/dog 3.png' },
//   ]

//   const vaccines: Vaccine[] = [
//     { name: 'Rabies Booster',  pet: 'Moly',     date: '2024-08-15' },
//     { name: 'Feline Leukemia', pet: 'Whiskers', date: '2024-09-01' },
//     { name: 'Distemper',       pet: 'Flopsy',   date: '2024-09-20' },
//   ]

//   const handleLogout = async () => {
//     await signOut({ callbackUrl: '/login' })
//   }

//   const handleEditProfile = () => {
//     router.push('/main/EditProfile')
//   }

//   return {
//     isLoading,
//     userName,
//     userEmail,
//     userImage,
//     userRole,
//     pets,
//     vaccines,
//     handleLogout,
//     handleEditProfile,
//   }
// }

// hooks/useProfile.ts
'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
const API = process.env.NEXT_PUBLIC_API_URL
export interface Vaccine {
  name: string
  pet: string
  date: string
}

interface ProfileData {
  id: string
  name: string
  email: string
  image: string
  role: string
  phone?: string
}

export function useProfile() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  // ✅ GET /api/user/profile
  useEffect(() => {
    if (status === 'authenticated') {
      setLoadingData(true)
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${(session?.user as any)?.accessToken ?? ''}`,
          'ngrok-skip-browser-warning': 'true',
        },
      })
        .then(res => res.json())
        // .then(data => setProfileData(data))
        .then(data => {
  console.log('Full profile keys:', Object.keys(data))
  console.log('image value:', data.image)
  console.log('imageUrl value:', data.imageUrl)
  console.log('ALL DATA:', JSON.stringify(data))
  setProfileData(data)
})
        .catch(err => console.error('Failed to fetch profile:', err))
        .finally(() => setLoadingData(false))
    }
  }, [status, session])

  const isLoading = status === 'loading' || loadingData

  const userName  = profileData?.name  ?? session?.user?.name  ?? ''
  const userEmail = profileData?.email ?? session?.user?.email ?? ''
  // const userImage = profileData?.image ?? session?.user?.image ?? '/woman.png'
  const userImage = profileData?.image
  ? profileData.image.startsWith('http')
    ? profileData.image                   
    : `${API}${profileData.image}`         
  : session?.user?.image ?? '/woman.png'
  const userRole  = profileData?.role  ?? (session?.user as any)?.role ?? 'User'

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
    vaccines,
    handleLogout,
    handleEditProfile,
  }
}