

'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { useSession } from 'next-auth/react'

const API = process.env.NEXT_PUBLIC_API_URL
const getHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'ngrok-skip-browser-warning': 'true',
})

export function useEdit() {
  const { data: session, update } = useSession()
  const token = (session?.user as any)?.accessToken ?? ''

  const [firstName,          setFirstName]          = useState('')
  const [lastName,           setLastName]           = useState('')
  const [email,              setEmail]              = useState('')
  const [phone,              setPhone]              = useState('')
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

  useEffect(() => {
    if (!token) return
    fetch(`${API}/api/user/profile`, {
      headers: getHeaders(token),
    })
      .then(res => res.json())
      .then(data => {
        const parts = (data.name ?? '').split(' ')
        setFirstName(parts[0] ?? '')
        setLastName(parts.slice(1).join(' ') ?? '')
        setEmail(data.email ?? '')
        setPhone(data.phone ?? '')
        setImagePreviewUrl(data.image ?? '/woman.png')

    const img = data.image ?? data.imageUrl
  if (img) {
    setImagePreviewUrl(img.startsWith('http') ? img : `${API}${img}`)
  } else {
    setImagePreviewUrl('/woman.png')
  }
      })
      .catch(err => console.error('Failed to load profile:', err))
  }, [token])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreviewUrl(URL.createObjectURL(file))
  }

  const handleToggleNotifications = () => setEmailNotifications(prev => !prev)

  const handleSave = async () => {
    setSaving(true)
    setErrorMsg('')
    setSuccessMsg('')
    try {
      const res = await fetch(`${API}/api/user/profile`, {
        method: 'PUT',
        headers: {
          ...getHeaders(token),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          phone,
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      setSuccessMsg('Profile updated successfully!')
    } catch (e: any) {
      setErrorMsg(e.message ?? 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }


// const handleUploadImage = async () => {
//   if (!imageFile) return
//   setSaving(true)
//   setErrorMsg('')
//   setSuccessMsg('')
//   try {
//     const formData = new FormData()
//     formData.append('file', imageFile)

//     const res = await fetch(`${API}/api/user/upload-image`, {
//       method: 'POST',
//       headers: getHeaders(token),
//       body: formData,
//     })

//     console.log('Upload status:', res.status)

//     // ← نقري الـ response كـ text مش JSON
//     const rawText = await res.text()
//     console.log('Raw response:', rawText)

//     if (!res.ok) throw new Error(rawText)

//     // لو وصلنا هنا يبقى نجح
//     setSuccessMsg('Image uploaded successfully!')
//     await update()

//   } catch (e: any) {
//     setErrorMsg(e.message ?? 'Image upload failed')
//   } finally {
//     setSaving(false)
//   }
// }

const handleUploadImage = async () => {
  if (!imageFile) return
  setSaving(true)
  setErrorMsg('')
  setSuccessMsg('')
  try {
    const formData = new FormData()
    formData.append('file', imageFile)

    const res = await fetch(`${API}/api/user/upload-image`, {
      method: 'POST',
      headers: getHeaders(token),
      body: formData,
    })

    const responseData = await res.json() // ← parse JSON مش text
    console.log('Upload response:', responseData)

    if (!res.ok) throw new Error(responseData?.message ?? 'Upload failed')

  const newImageUrl = responseData?.imageUrl
if (newImageUrl) {
  const fullUrl = newImageUrl.startsWith('http') 
    ? newImageUrl 
    : `${API}${newImageUrl}`
  setImagePreviewUrl(fullUrl)
}

    setSuccessMsg('Image uploaded successfully!')

    // ← حدّث الـ session بالـ image الجديدة
    await update({ image: newImageUrl })

  } catch (e: any) {
    setErrorMsg(e.message ?? 'Image upload failed')
  } finally {
    setSaving(false)
    setImageFile(null) // ← reset الملف
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
      const res = await fetch(`${API}/api/user/change-password`, {
        method: 'PUT',
        headers: {
          ...getHeaders(token),
          'Content-Type': 'application/json',
        },
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

  const handleChangeEmail = async () => {
    setSaving(true)
    setErrorMsg('')
    try {
      const res = await fetch(`${API}/api/user/change-email`, {
        method: 'PUT',
        headers: {
          ...getHeaders(token),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newEmail }),
      })
      if (!res.ok) throw new Error(await res.text())
      setSuccessMsg('Email changed successfully!')
      setEmail(newEmail)
      setNewEmail('')
      await update()
    } catch (e: any) {
      setErrorMsg(e.message ?? 'Email change failed')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setErrorMsg('')
    setSuccessMsg('')
  }

  return {
    firstName,    setFirstName,
    lastName,     setLastName,
    email,        setEmail,
    phone,        setPhone,
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
    handleImageChange,
    handleToggleNotifications,
    handleSave,
    handleUploadImage,
    handleChangePassword,
    handleChangeEmail,
    handleCancel,
  }
}

