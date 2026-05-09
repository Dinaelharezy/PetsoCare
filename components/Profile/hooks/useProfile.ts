
'use client'


import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useProfileStore } from '../../../store/profileStore'   



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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
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
    return raw.startsWith('http') ? raw : `${process.env.NEXT_PUBLIC_API_URL}${raw}`
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