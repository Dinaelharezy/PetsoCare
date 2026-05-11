// 'use client'

// import { useEffect } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { signIn } from 'next-auth/react'

// export default function GoogleCallbackPage() {
//   const searchParams = useSearchParams()
//   const router = useRouter()

//   useEffect(() => {
//     const token = searchParams.get('token')

//     if (!token) {
//       router.replace('/login?error=google_failed')
//       return
//     }

//     signIn('credentials', {
//       token,
//       redirect: false,
//     }).then((res) => {
//       if (res?.ok) {
//         router.replace('/dashboard')
//       } else {
//         router.replace('/login?error=google_failed')
//       }
//     })
//   }, [])

//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center">
//       <div className="text-center">
//         <div className="spinner-border text-success mb-3" />
//         <p className="text-muted">Signing you in with Google..</p>
//       </div>
//     </div>
//   )
// }

'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

function GoogleCallbackContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      router.replace('/login?error=google_failed')
      return
    }

    signIn('credentials', {
      token,
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        router.replace('/dashboard')
      } else {
        router.replace('/login?error=google_failed')
      }
    })
  }, [])

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div className="spinner-border text-success mb-3" />
        <p className="text-muted">Signing you in with Google..</p>
      </div>
    </div>
  )
}

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="spinner-border text-success mb-3" />
            <p className="text-muted">Signing you in with Google..</p>
          </div>
        </div>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  )
}