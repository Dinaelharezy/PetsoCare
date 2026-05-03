

// 'use client'
// // hooks/useProfile.ts  — FIXED: image now persists after edit by combining
// // server-fetched profile with the session-updated image URL.

// import { useSession, signOut } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { useProfileStore } from '../../../store/profileStore'
// // import { useVaccine } from '../../Vaccine/hooks/useVaccine'

// const API = process.env.NEXT_PUBLIC_API_URL

// interface ProfileData {
//   id: string
//   name: string
//   email: string
//   image?: string
//   imageUrl?: string
//   role: string
//   phone?: string
// }

// export function useProfile() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const [profileData, setProfileData] = useState<ProfileData | null>(null)
//   const [loadingData, setLoadingData] = useState(true)

//   useEffect(() => {
//     if (status === 'unauthenticated') router.push('/login')
//   }, [status, router])

//   useEffect(() => {
//     if (status !== 'authenticated') return

//     setLoadingData(true)
//     fetch(`${API}/api/user/profile`, {
//       headers: {
//         Authorization: `Bearer ${(session?.user as any)?.accessToken ?? ''}`,
//         'ngrok-skip-browser-warning': 'true',
//       },
//       cache: 'no-store',
//     })
//       .then(res => res.json())
//       .then(data => setProfileData(data))
//       .catch(err => console.error('Failed to fetch profile:', err))
//       .finally(() => setLoadingData(false))
//   }, [status, session])

//   const isLoading = status === 'loading' || loadingData

//   const userName  = profileData?.name  ?? session?.user?.name  ?? ''
//   const userEmail = profileData?.email ?? session?.user?.email ?? ''
//   const userRole  = profileData?.role  ?? (session?.user as any)?.role ?? 'User'

//   /**
//    * Image priority (fixes the "resets to default after edit" bug):
//    * 1. Session image — updated immediately by `update()` in useEdit after save
//    * 2. Server profile image — from the backend fetch
//    * 3. Default fallback
//    *
//    * This ensures that when a user edits their photo and the session is updated,
//    * the new image is shown right away without needing a page reload.
//    */
//   const resolveImageUrl = (raw?: string) => {
//     if (!raw) return null
//     return raw.startsWith('http') ? raw : `${API}${raw}`
//   }

//   const userImage =
//     resolveImageUrl(session?.user?.image ?? undefined) ??
//     resolveImageUrl(profileData?.imageUrl ?? profileData?.image) ??
//     '/woman.png'

//   // const vaccines = [] // vaccines are now handled by useVaccines hook

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
//     // vaccines,
//     handleLogout,
//     handleEditProfile,
//   }
// }
'use client'


import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useProfileStore } from '../../../store/profileStore'   

const API = process.env.NEXT_PUBLIC_API_URL

export function useProfile() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const { profileData, lastFetchedFor, setProfile, clearProfile } = useProfileStore()

  // نعمل fetch بس لو:
  // 1. الـ session موجودة
  // 2. مفيش بيانات cached، أو البيانات الـ cached لـ user مختلف
  const currentUserId = (session?.user as any)?.id ?? session?.user?.email ?? null
  const needsFetch =
    status === 'authenticated' &&
    currentUserId &&
    lastFetchedFor !== currentUserId

  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      clearProfile()
      router.push('/login')
    }
  }, [status, router, clearProfile])

  useEffect(() => {
    if (!needsFetch || fetching) return

    setFetching(true)
    fetch(`${API}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${(session?.user as any)?.accessToken ?? ''}`,
        'ngrok-skip-browser-warning': 'true',
      },
    })
      .then(res => res.json())
      .then(data => setProfile(data, currentUserId))
      .catch(err => console.error('Failed to fetch profile:', err))
      .finally(() => setFetching(false))
  }, [needsFetch])   // ← مش بيشتغل غير لو فعلاً محتاج fetch

  // اللودينج بيحصل بس في أول زيارة أو لو اليوزر اتغير
  const isLoading = status === 'loading' || (needsFetch && !profileData)

  const userName  = profileData?.name  ?? session?.user?.name  ?? ''
  const userEmail = profileData?.email ?? session?.user?.email ?? ''
  const userRole  = profileData?.role  ?? (session?.user as any)?.role ?? 'User'

  const resolveImageUrl = (raw?: string) => {
    if (!raw) return null
    return raw.startsWith('http') ? raw : `${API}${raw}`
  }


const userImage =
  resolveImageUrl(profileData?.imageUrl ?? profileData?.image) ??  // ← profileData أحدث دايماً
  resolveImageUrl(session?.user?.image ?? undefined) ??
  '/woman.png'

  const handleLogout = async () => {
    clearProfile()                          // امسح الـ cache عند الـ logout
    await signOut({ callbackUrl: '/login' })
  }

  const handleEditProfile = () => {
    router.push('/main/EditProfile')
  }

  // دالة لإجبار الـ refetch بعد تعديل البيانات (مثلاً بعد EditProfile)
  const invalidateProfile = () => {
    clearProfile()
  }

  return {
    isLoading,
    userName,
    userEmail,
    userImage,
    userRole,
    handleLogout,
    handleEditProfile,
    invalidateProfile,   // استخدمها في useEdit بعد الحفظ
  }
}