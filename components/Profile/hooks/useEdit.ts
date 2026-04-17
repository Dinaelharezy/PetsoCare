

//workingg
// 'use client'

// import { useState, useEffect, ChangeEvent } from 'react'
// import { useRouter } from 'next/navigation'

// export function useEdit() {
//   const router = useRouter()

//   const [firstName,          setFirstName]          = useState('')
//   const [lastName,           setLastName]           = useState('')
//   const [email,              setEmail]              = useState('')
//   const [phone,              setPhone]              = useState('')
//   const [address,            setAddress]            = useState('')
//   const [dateOfBirth,        setDateOfBirth]        = useState('')
//   const [imageFile,          setImageFile]          = useState<File | null>(null)
//   const [imagePreviewUrl,    setImagePreviewUrl]    = useState('/woman.png')
//   const [emailNotifications, setEmailNotifications] = useState(true)

//   const [currentPassword, setCurrentPassword] = useState('')
//   const [newPassword,     setNewPassword]     = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [newEmail,        setNewEmail]        = useState('')

//   const [saving,     setSaving]     = useState(false)
//   const [errorMsg,   setErrorMsg]   = useState('')
//   const [successMsg, setSuccessMsg] = useState('')

//   // ✅ Always from API — /api/auth/me is the correct endpoint
//   const fetchProfile = async () => {
//     try {
//       const res = await fetch('/api/auth/me', { cache: 'no-store' })
//       if (!res.ok) throw new Error('Failed to load profile')
//       const data = await res.json()

//       console.log('✅ Profile from API:', data)

//       const parts = (data.name ?? '').split(' ')
//       setFirstName(parts[0] ?? '')
//       setLastName(parts.slice(1).join(' ') ?? '')
//       setEmail(data.email ?? '')
//       setPhone(data.phone ?? '')
//       setAddress(data.address ?? '')
//       setDateOfBirth(data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '')

//       const img = data.imageUrl ?? data.image
//       if (img) {
//         setImagePreviewUrl(
//           img.startsWith('http')
//             ? img
//             : `${process.env.NEXT_PUBLIC_API_URL}${img}`
//         )
//       } else {
//         setImagePreviewUrl('/woman.png')
//       }
//     } catch (err) {
//       console.error('Failed to load profile:', err)
//     }
//   }

//   useEffect(() => { fetchProfile() }, [])

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return
//     setImageFile(file)
//     setImagePreviewUrl(URL.createObjectURL(file)) // temp preview only
//   }

//   const handleToggleNotifications = () => setEmailNotifications(prev => !prev)

//   const handleSaveAll = async () => {
//     setSaving(true)
//     setErrorMsg('')
//     setSuccessMsg('')
//     try {
//       // 1. Save profile fields
//       const profileRes = await fetch('/api/user/profile', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: `${firstName} ${lastName}`.trim(),
//           phone,
//           address,
//           dateOfBirth: dateOfBirth || null,
//         }),
//       })
//       if (!profileRes.ok) throw new Error(await profileRes.text())

//       // 2. Upload image if selected
//       if (imageFile) {
//         const formData = new FormData()
//         formData.append('file', imageFile)

//         const imgRes = await fetch('/api/user/upload-image', {
//           method: 'POST',
//           body: formData,
//         })

//         const text = await imgRes.text()
//         let imgData: any
//         try { imgData = JSON.parse(text) } catch { imgData = { message: text } }

//         console.log('📸 Upload response:', imgData)
//         if (!imgRes.ok) throw new Error(imgData?.error ?? imgData?.message ?? 'Image upload failed')
//       }

//       // ✅ Re-fetch from API — single source of truth
//       await fetchProfile()
//       setImageFile(null)
//       setSuccessMsg('Changes saved successfully!')
//     } catch (e: any) {
//       setErrorMsg(e.message ?? 'Something went wrong')
//     } finally {
//       setSaving(false)
//     }
//   }

//   const handleChangePassword = async () => {
//     if (newPassword !== confirmPassword) {
//       setErrorMsg('Passwords do not match')
//       return
//     }
//     setSaving(true)
//     setErrorMsg('')
//     try {
//       const res = await fetch('/api/user/change-password', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ currentPassword, newPassword }),
//       })
//       if (!res.ok) throw new Error(await res.text())
//       setSuccessMsg('Password changed successfully!')
//       setCurrentPassword('')
//       setNewPassword('')
//       setConfirmPassword('')
//     } catch (e: any) {
//       setErrorMsg(e.message ?? 'Password change failed')
//     } finally {
//       setSaving(false)
//     }
//   }

//   const handleChangeEmail = async () => {
//     setSaving(true)
//     setErrorMsg('')
//     try {
//       const res = await fetch('/api/user/change-email', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ newEmail }),
//       })
//       if (!res.ok) throw new Error(await res.text())
//       await fetchProfile()
//       setNewEmail('')
//       setSuccessMsg('Email changed successfully!')
//     } catch (e: any) {
//       setErrorMsg(e.message ?? 'Email change failed')
//     } finally {
//       setSaving(false)
//     }
//   }

//   const handleCancel = () => {
//     setErrorMsg('')
//     setSuccessMsg('')
//     router.back()
//   }

//   return {
//     firstName,    setFirstName,
//     lastName,     setLastName,
//     email,
//     phone,        setPhone,
//     address,      setAddress,
//     dateOfBirth,  setDateOfBirth,
//     imageFile,
//     imagePreviewUrl,
//     emailNotifications,
//     currentPassword, setCurrentPassword,
//     newPassword,     setNewPassword,
//     confirmPassword, setConfirmPassword,
//     newEmail,        setNewEmail,
//     saving,
//     errorMsg,
//     successMsg,
//     handleImageChange,
//     handleToggleNotifications,
//     handleSaveAll,
//     handleChangePassword,
//     handleChangeEmail,
//     handleCancel,
//   }
// }

'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export function useEdit() {
  const router = useRouter()
  const { update } = useSession()

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

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/auth/me', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to load profile')
      const data = await res.json()

      console.log('✅ Profile from API:', data)

      const parts = (data.name ?? '').split(' ')
      setFirstName(parts[0] ?? '')
      setLastName(parts.slice(1).join(' ') ?? '')
      setEmail(data.email ?? '')
      setPhone(data.phone ?? '')
      setAddress(data.address ?? '')
      setDateOfBirth(data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '')

      const img = data.imageUrl ?? data.image
      if (img) {
        setImagePreviewUrl(
          img.startsWith('http')
            ? img
            : `${process.env.NEXT_PUBLIC_API_URL}${img}`
        )
      } else {
        setImagePreviewUrl('/woman.png')
      }

      return data // ✅ return data so handleSaveAll can use it
    } catch (err) {
      console.error('Failed to load profile:', err)
      return null
    }
  }

  useEffect(() => { fetchProfile() }, [])

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
      // 1. Save profile fields
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

      // 2. Upload image if selected
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

        console.log('📸 Upload response:', imgData)
        if (!imgRes.ok) throw new Error(imgData?.error ?? imgData?.message ?? 'Image upload failed')

        // ✅ Grab the returned image URL from whichever field the API uses
        const rawUrl = imgData?.imageUrl ?? imgData?.url ?? imgData?.image ?? imgData?.filePath
        if (rawUrl) {
          newImageUrl = rawUrl.startsWith('http')
            ? rawUrl
            : `${process.env.NEXT_PUBLIC_API_URL}${rawUrl}`
        }
      }

      // 3. Re-fetch profile to sync local state
      const freshData = await fetchProfile()
      setImageFile(null)

      // 4. ✅ Update NextAuth session so Navbar + any useSession() consumer
      //    immediately reflects the new name & image — no page refresh needed
      const resolvedImage =
        newImageUrl ??
        (() => {
          const img = freshData?.imageUrl ?? freshData?.image
          if (!img) return undefined
          return img.startsWith('http') ? img : `${process.env.NEXT_PUBLIC_API_URL}${img}`
        })()

      await update({
        name:  `${firstName} ${lastName}`.trim(),
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
      body: JSON.stringify({ phone }),
    })

    if (!res.ok) throw new Error(await res.text())

    await fetchProfile() // refresh data
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

      // ✅ Sync session email too
      await update({ email: newEmail })

      await fetchProfile()
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