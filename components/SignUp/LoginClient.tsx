// 'use client'

// import { useState, FormEvent, ChangeEvent } from 'react'
// import Link from 'next/link'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { signIn } from 'next-auth/react'

// export default function LoginClient() {
//   const router = useRouter()
//   const params = useSearchParams()
//   const rawCallback = params.get('callbackUrl') ?? '/main/Home'
//   const callbackUrl = rawCallback === '/login' ? '/main/Home' : rawCallback

//   const [formData, setFormData] = useState({ email: '', password: '' })
//   const [error,    setError]    = useState('')
//   const [loading,  setLoading]  = useState(false)
//   const [showPass, setShowPass] = useState(false)

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')

//     const result = await signIn('credentials', {
//       email:    formData.email,
//       password: formData.password,
//       redirect: false,
//     })

//     setLoading(false)

//     if (result?.error) {
//       setError('Invalid email or password. Please try again.')
//     } else {
//       router.push(callbackUrl)
//     }
//   }

//   const handleGoogle = () => signIn('google', { callbackUrl })

//   return (
//     <div
//       className="min-vh-100 d-flex align-items-center justify-content-center"
//       style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#f5f5dc' }}
//     >
//       <div
//         className="position-absolute w-100 h-100"
//         style={{ backgroundColor: 'rgba(245, 245, 220, 0.7)', backdropFilter: 'blur(5px)' }}
//       />

//       <div
//         className="card shadow-lg position-relative"
//         style={{ maxWidth: '450px', width: '90%', borderRadius: '20px', border: 'none' }}
//       >
//         <div className="card-body p-5">

//           <h2 className="text-center fw-bold mb-2">Welcome Back!</h2>
//           <p className="text-center text-muted mb-4">
//             Sign in to Pawsitive Health to manage your pet&apos;s well-being.
//           </p>

//           {error && (
//             <div
//               className="alert mb-3 text-center py-2"
//               style={{ backgroundColor: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '10px', color: '#cc0000', fontSize: '14px' }}
//             >
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>

//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 className="form-control form-control-lg"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="your@example.com"
//                 required
//                 style={{ borderRadius: '10px', border: '1px solid #ddd' }}
//               />
//             </div>

//             <div className="mb-4">
//               <label className="form-label">Password</label>
//               <div className="input-group">
//                 <input
//                   type={showPass ? 'text' : 'password'}
//                   className="form-control form-control-lg"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="••••••••"
//                   required
//                   style={{ borderRadius: '10px 0 0 10px', border: '1px solid #ddd', borderRight: 'none' }}
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary"
//                   onClick={() => setShowPass(!showPass)}
//                   style={{ borderRadius: '0 10px 10px 0', border: '1px solid #ddd', borderLeft: 'none', backgroundColor: 'white' }}
//                 >
//                   {showPass ? '🙈' : '👁️'}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="btn w-100 py-3 fw-semibold mb-3"
//               style={{ backgroundColor: loading ? '#c7f2a780' : 'rgb(199, 242, 167)', border: 'none', borderRadius: '10px', fontSize: '16px', opacity: loading ? 0.7 : 1 }}
//             >
//               {loading ? (
//                 <span>
//                   <span className="spinner-border spinner-border-sm me-2" role="status" />
//                   Signing in…
//                 </span>
//               ) : 'Sign In'}
//             </button>

//             {/* <div className="d-flex align-items-center gap-2 mb-3">
//               <hr className="flex-grow-1 m-0" style={{ borderColor: '#ddd' }} />
//               <span className="text-muted" style={{ fontSize: '13px' }}>or</span>
//               <hr className="flex-grow-1 m-0" style={{ borderColor: '#ddd' }} />
//             </div> */}

//             {/* <button
//               type="button"
//               onClick={handleGoogle}
//               className="btn w-100 py-2 mb-3 d-flex align-items-center justify-content-center gap-2"
//               style={{ border: '1px solid #ddd', borderRadius: '10px', backgroundColor: 'white', fontSize: '15px', fontWeight: 500 }}
//             >
//               <svg width="18" height="18" viewBox="0 0 48 48">
//                 <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
//                 <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
//                 <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
//                 <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
//               </svg>
//               Continue with Google
//             </button> */}

//             <div className="text-center my-3">
//   <div className="d-flex align-items-center gap-2 mb-3">
//     <hr style={{ flex: 1 }} />
//     <span className="text-muted" style={{ fontSize: '13px' }}>or</span>
//     <hr style={{ flex: 1 }} />
//   </div>
//   <button
//     onClick={() => {
//       window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google-login`
//     }}
//     className="btn w-100 fw-semibold"
//     style={{
//       borderRadius: '10px',
//       border: '1px solid #ddd',
//       background: 'white',
//       fontSize: '14px',
//     }}
//   >
//     <img
//       src="https://www.google.com/favicon.ico"
//       width={16} height={16}
//       className="me-2"
//       alt="Google"
//     />
//     Continue with Google
//   </button>
// </div>

//             <p className="text-center mb-2">
//               Don&apos;t have an account?{' '}
//               <Link href="/SignUpCompletion" className="text-decoration-none fw-semibold" style={{ color: 'rgb(100, 170, 70)' }}>
//                 Create an Account
//               </Link>
//             </p>

//             <p className="text-center mb-0">
//               <Link href="/forgot-password" className="text-decoration-none" style={{ color: 'rgb(100, 170, 70)', fontSize: '14px' }}>
//                 Forgot your password?
//               </Link>
//             </p>

//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginClient() {
  const router = useRouter()
  const params = useSearchParams()
  const rawCallback = params.get('callbackUrl') ?? '/main/Home'
  const callbackUrl = rawCallback === '/login' ? '/main/Home' : rawCallback

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email:    formData.email,
      password: formData.password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('Invalid email or password. Please try again.')
    } else {
      router.push(callbackUrl)
    }
  }

const handleGoogleLogin = () => {
  signIn('google', { callbackUrl: '/main/Home' })
}
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#f5f5dc' }}
    >
      <div
        className="position-absolute w-100 h-100"
        style={{ backgroundColor: 'rgba(245, 245, 220, 0.7)', backdropFilter: 'blur(5px)' }}
      />

      <div
        className="card shadow-lg position-relative"
        style={{ maxWidth: '450px', width: '90%', borderRadius: '20px', border: 'none' }}
      >
        <div className="card-body p-5">

          <h2 className="text-center fw-bold mb-2">Welcome Back!</h2>
          <p className="text-center text-muted mb-4">
            Sign in to Pawsitive Health to manage your pet&apos;s well-being.
          </p>

          {error && (
            <div
              className="alert mb-3 text-center py-2"
              style={{ backgroundColor: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '10px', color: '#cc0000', fontSize: '14px' }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@example.com"
                required
                style={{ borderRadius: '10px', border: '1px solid #ddd' }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="form-control form-control-lg"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  style={{ borderRadius: '10px 0 0 10px', border: '1px solid #ddd', borderRight: 'none' }}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPass(!showPass)}
                  style={{ borderRadius: '0 10px 10px 0', border: '1px solid #ddd', borderLeft: 'none', backgroundColor: 'white' }}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-100 py-3 fw-semibold mb-3"
              style={{ backgroundColor: loading ? '#c7f2a780' : 'rgb(199, 242, 167)', border: 'none', borderRadius: '10px', fontSize: '16px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <span>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Signing in…
                </span>
              ) : 'Sign In'}
            </button>

            <div className="text-center my-3">
              <div className="d-flex align-items-center gap-2 mb-3">
                <hr style={{ flex: 1 }} />
                <span className="text-muted" style={{ fontSize: '13px' }}>or</span>
                <hr style={{ flex: 1 }} />
              </div>
              
              {/* ✅ زر جوجل المعدل */}
              <button
                onClick={handleGoogleLogin}
                className="btn w-100 fw-semibold"
                style={{
                  borderRadius: '10px',
                  border: '1px solid #ddd',
                  background: 'white',
                  fontSize: '14px',
                }}
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  width={16} height={16}
                  className="me-2"
                  alt="Google"
                />
                Continue with Google
              </button>
            </div>

            <p className="text-center mb-2">
              Don&apos;t have an account?{' '}
              <Link href="/SignUpCompletion" className="text-decoration-none fw-semibold" style={{ color: 'rgb(100, 170, 70)' }}>
                Create an Account
              </Link>
            </p>

            <p className="text-center mb-0">
              <Link href="/forgot-password" className="text-decoration-none" style={{ color: 'rgb(100, 170, 70)', fontSize: '14px' }}>
                Forgot your password?
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}