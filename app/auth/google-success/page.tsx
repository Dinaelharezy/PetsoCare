
'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

function GoogleSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
  const error = searchParams.get('error')
  
  // شوف كل الـ params اللي جت
  console.log('ALL PARAMS:', window.location.href)
  console.log('TOKEN:', token)
  console.log('ERROR:', error)
    if (!token) {
      router.replace('/login?error=no_token')
      return
    }

    // ✅ بيبعت الـ token للـ authorize function
    signIn('credentials', {
      token,
      redirect: false,
    }).then((result) => {
      if (result?.ok) {
        router.replace('/main/Home')
      } else {
        router.replace('/login?error=google_auth_failed')
      }
    })
  }, [router, searchParams])

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div
          className="spinner-border text-success mb-3"
          role="status"
          style={{ width: '3rem', height: '3rem' }}
        />
        <h4>Signing you in...</h4>
        <p className="text-muted">Please wait, you will be redirected shortly</p>
      </div>
    </div>
  )
}

export default function GoogleSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center mt-5">Loading..</div>}>
      <GoogleSuccessContent />
    </Suspense>
  )
}