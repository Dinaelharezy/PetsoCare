
// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";

// export default function GoogleSuccessPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get("token");

//     if (token) {
//       // خلي NextAuth يعرف بالتوكن عشان الـ session تشتغل
//       signIn("credentials", {
//         token,
//         redirect: false,
//       }).then(() => {
//         router.push("/main/Home");
//       });
//     }
//   }, [router]);

//   return <div>Loading...</div>;
// }

'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

function GoogleSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

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
        router.replace('/main/Home')
      } else {
        router.replace('/login?error=google_failed')
      }
    })
  }, [])

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div className="spinner-border text-success mb-3" role="status" />
        <p className="text-muted">Signing you in with Google...</p>
      </div>
    </div>
  )
}

export default function GoogleSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="spinner-border text-success mb-3" role="status" />
            <p className="text-muted">Signing you in with Google...</p>
          </div>
        </div>
      }
    >
      <GoogleSuccessContent />
    </Suspense>
  )
}