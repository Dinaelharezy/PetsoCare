'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// ── Types ──────────────────────────────────────────────────────────

export interface RegisterForm {
  firstName:       string
  lastName:        string
  email:           string
  phone:           string
  password:        string
  confirmPassword: string
}


export type SaveStatus = 'idle' | 'saving' | 'success' | 'error'

export interface PasswordStrength {
  score: number
  label: string
  color: string
}

// ── Helpers ────────────────────────────────────────────────────────

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: '', color: '#e0e0e0' }

  let score = 0
  if (password.length >= 8)          score++
  if (/[A-Z]/.test(password))        score++
  if (/[a-z]/.test(password))        score++
  if (/[0-9]/.test(password))        score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 2)  return { score, label: 'Weak',   color: '#ff4444' }
  if (score === 3) return { score, label: 'Fair',   color: '#ffaa00' }
  if (score === 4) return { score, label: 'Good',   color: '#88cc00' }
  return                  { score, label: 'Strong', color: 'rgb(100,170,70)' }
}

const INITIAL_FORM: RegisterForm = {
  firstName: '', lastName: '', email: '',
  phone: '', password: '', confirmPassword: '',
}

export const TOTAL_STEPS = 3

// ── Hook ───────────────────────────────────────────────────────────

export function useCompletion() {
  const router = useRouter()

  const [step,       setStep]       = useState(1)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [errorMsg,   setErrorMsg]   = useState('')
  const [showPass,    setShowPass]    = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [formData,   setFormData]   = useState<RegisterForm>(INITIAL_FORM)

  const strength = getPasswordStrength(formData.password)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateStep = (): string => {
    if (step === 1) {
      if (!formData.firstName.trim()) return 'First name is required.'
      if (!formData.email.trim())     return 'Email is required.'
      if (!formData.phone.trim())     return 'Phone is required.'
    }
    if (step === 2) {
      if (!formData.password)                             return 'Password is required.'
      if (strength.score < 4)                             return 'Password is too weak.'
      if (formData.password !== formData.confirmPassword) return 'Passwords do not match.'
    }
    return ''
  }

  const handleNext = () => {
    const err = validateStep()
    if (err) { setErrorMsg(err); return }
    setErrorMsg('')
    setStep(s => s + 1)
  }

  const handleBack = () => {
    setErrorMsg('')
    setStep(s => s - 1)
  }

  const handleRegister = async () => {
    setSaveStatus('saving')
    setErrorMsg('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          name:     `${formData.firstName} ${formData.lastName}`.trim(),
          email:    formData.email,
          phone:    formData.phone,
          password: formData.password,
        }),
      })

      if (res.ok) {
        setSaveStatus('success')
        setTimeout(() => {
          router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`)
        }, 1500)
      } else {
        const err = await res.json()
        const firstError = Object.values(err.errors ?? {})?.[0]
        setErrorMsg(Array.isArray(firstError) ? firstError[0] : (err.message ?? 'Registration failed.'))
        setSaveStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setSaveStatus('error')
    }
  }

  const passwordsMatch =
    !!formData.confirmPassword && formData.password === formData.confirmPassword

  const passwordsMismatch =
    !!formData.confirmPassword && formData.password !== formData.confirmPassword

  return {
    // State
    step,
    saveStatus,
    errorMsg,
    showPass,
    showConfirm,
    formData,
    strength,
    passwordsMatch,
    passwordsMismatch,
    // Handlers
    handleChange,
    handleNext,
    handleBack,
    handleRegister,
    setShowPass,
    setShowConfirm,
  }
}