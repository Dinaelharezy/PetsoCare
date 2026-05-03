

'use client'
// hooks/useEdit.ts — OPTIMIZED: بياخد البيانات من Zustand store بدل fetch جديد
// بيعمل fetch بس لو الـ store فاضي

import { useState, useEffect, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useProfileStore } from '@/store/profileStore'  // ← عدّل المسار

const API = process.env.NEXT_PUBLIC_API_URL

export function useEdit() {
  const router = useRouter()
  const { update } = useSession()
  const { profileData, setProfile, clearProfile, lastFetchedFor } = useProfileStore()

  const [firstName,          setFirstName]          = useState('')
  const [lastName,           setLastName]           = useState('')
  const [email,              setEmail]              = useState('')
  const [phone,              setPhone]              = useState('')
  const [address,            setAddress]            = useState('')
  const [dateOfBirth,        setDateOfBirth]        = useState('')
  const [imageFile,          setImageFile]          = useState<File | null>(null)
  const [imagePreviewUrl,    setImagePreviewUrl]    = useState('/woman.png')
  const [emailNotifications, setEmailNotifications] = useState(true)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword,     setNewPassword]     = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newEmail,        setNewEmail]        = useState('')

  const [saving,     setSaving]     = useState(false)
  const [errorMsg,   setErrorMsg]   = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // ─── اجيب البيانات من الـ store لو موجودة، لو لأ اعمل fetch ───
  const populateForm = (data: any) => {
    const parts = (data.name ?? '').split(' ')
    setFirstName(parts[0] ?? '')
    setLastName(parts.slice(1).join(' ') ?? '')
    setEmail(data.email ?? '')
    setPhone(data.phone ?? '')
    setAddress(data.address ?? '')
    setDateOfBirth(data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '')

    const img = data.imageUrl ?? data.image
    if (img) {
      setImagePreviewUrl(img.startsWith('http') ? img : `${API}${img}`)
    } else {
      setImagePreviewUrl('/woman.png')
    }
  }

  useEffect(() => {
    // لو البيانات موجودة في الـ store، هيملي الـ form فوراً بدون loading
    if (profileData) {
      populateForm(profileData)
      return
    }

    // لو مفيش store، اعمل fetch مرة واحدة
    fetch('/api/auth/me', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        populateForm(data)
        // خزّنه في الـ store عشان المرة الجاية ميعملش fetch
        setProfile(data, data.id ?? data.email)
      })
      .catch(err => console.error('Failed to load profile:', err))
  }, []) // ← بيشتغل مرة واحدة بس


const refreshAndSyncStore = async () => {
  const res = await fetch('/api/auth/me', { cache: 'no-store' })
  const data = await res.json()
  populateForm(data)
  setProfile(data, data.id ?? data.email)  // ← بيحدث الـ store بالصورة الجديدة
  return data
}


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreviewUrl(URL.createObjectURL(file))
  }

  const handleToggleNotifications = () => setEmailNotifications(prev => !prev)

  const handleSaveAll = async () => {
    setSaving(true)
    setErrorMsg('')
    setSuccessMsg('')
    try {
      const profileRes = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          phone,
          address,
          dateOfBirth: dateOfBirth || null,
        }),
      })
      if (!profileRes.ok) throw new Error(await profileRes.text())

      let newImageUrl: string | undefined
      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)

        const imgRes = await fetch('/api/user/upload-image', {
          method: 'POST',
          body: formData,
        })

        const text = await imgRes.text()
        let imgData: any
        try { imgData = JSON.parse(text) } catch { imgData = { message: text } }

        if (!imgRes.ok) throw new Error(imgData?.error ?? imgData?.message ?? 'Image upload failed')

        const rawUrl = imgData?.imageUrl ?? imgData?.url ?? imgData?.image ?? imgData?.filePath
        if (rawUrl) {
          newImageUrl = rawUrl.startsWith('http') ? rawUrl : `${API}${rawUrl}`
        }
      }

      // حدّث الـ store بالبيانات الجديدة
      const freshData = await refreshAndSyncStore()
      setImageFile(null)
        clearProfile()
      const resolvedImage =
        newImageUrl ??
        (() => {
          const img = freshData?.imageUrl ?? freshData?.image
          if (!img) return undefined
          return img.startsWith('http') ? img : `${API}${img}`
        })()

      await update({
        name: `${firstName} ${lastName}`.trim(),
        ...(resolvedImage ? { image: resolvedImage } : {}),
      })

      setSuccessMsg('Changes saved successfully!')
    } catch (e: any) {
      setErrorMsg(e.message ?? 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match')
      return
    }
    setSaving(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/user/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      if (!res.ok) throw new Error(await res.text())
      setSuccessMsg('Password changed successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (e: any) {
      setErrorMsg(e.message ?? 'Password change failed')
    } finally {
      setSaving(false)
    }
  }


  const handleChangePhone = async () => {
  setSaving(true)
  setErrorMsg('')
  setSuccessMsg('')
  try {
    const res = await fetch('/api/auth/update-phone', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),   // 👈 ده كان صح من الأول
    })
    if (!res.ok) throw new Error(await res.text())
    await refreshAndSyncStore()
    setSuccessMsg('Phone updated successfully!')
  } catch (e: any) {
    setErrorMsg(e.message ?? 'Phone update failed')
  } finally {
    setSaving(false)
  }
}

 
  const handleChangeEmail = async () => {
    setSaving(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/user/change-email', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newEmail }),
      })
      if (!res.ok) throw new Error(await res.text())

      await update({ email: newEmail })
      await refreshAndSyncStore()
      setNewEmail('')
      setSuccessMsg('Email changed successfully!')
    } catch (e: any) {
      setErrorMsg(e.message ?? 'Email change failed')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setErrorMsg('')
    setSuccessMsg('')
    router.back()
  }

  return {
    firstName,    setFirstName,
    lastName,     setLastName,
    email,
    phone,        setPhone,
    address,      setAddress,
    dateOfBirth,  setDateOfBirth,
    imageFile,
    imagePreviewUrl,
    emailNotifications,
    currentPassword, setCurrentPassword,
    newPassword,     setNewPassword,
    confirmPassword, setConfirmPassword,
    newEmail,        setNewEmail,
    saving,
    errorMsg,
    successMsg,
    handleChangePhone,
    handleImageChange,
    handleToggleNotifications,
    handleSaveAll,
    handleChangePassword,
    handleChangeEmail,
    handleCancel,
  }
}