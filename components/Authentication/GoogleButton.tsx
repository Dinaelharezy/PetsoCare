// export default function GoogleButton() {
// const handleGoogleLogin = () => {
//   const returnUrl = `${window.location.origin}/auth/google-success`
//   window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google-login?returnUrl=${encodeURIComponent(returnUrl)}`
// }

//   return (
//     <button onClick={handleGoogleLogin}>
//       Continue with Google
//     </button>
//   );
// }

export default function GoogleButton() {
  const handleGoogleLogin = () => {
    const returnUrl = `${window.location.origin}/auth/google-success`
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google-login?returnUrl=${encodeURIComponent(returnUrl)}`
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className="btn w-100 fw-semibold"
      style={{ borderRadius: '10px', border: '1px solid #ddd', background: 'white', fontSize: '14px' }}
    >
      <img src="https://www.google.com/favicon.ico" width={16} height={16} className="me-2" alt="Google" />
      Continue with Google
    </button>
  )
}