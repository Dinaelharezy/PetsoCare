import ForgotPassClient from '../../../components/Authentication/ForgotPassClient'
import { Suspense } from 'react'


export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-vh-100 d-flex align-items-center justify-content-center">Loading...</div>}>
      <ForgotPassClient />
    </Suspense>
  )
}