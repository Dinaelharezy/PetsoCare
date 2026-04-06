'use client'

import { useState, ChangeEvent } from 'react'

export interface EditProfileState {
  firstName: string
  lastName: string
  email: string
  phone: string
  imageFile: File | null
  imagePreviewUrl: string
  emailNotifications: boolean
}

export function useEdit(initial?: Partial<EditProfileState>) {
  const [firstName, setFirstName] = useState(initial?.firstName ?? 'Sarah')
  const [lastName,  setLastName]  = useState(initial?.lastName  ?? 'Johnson')
  const [email,     setEmail]     = useState(initial?.email     ?? 'sarah@email.com')
  const [phone,     setPhone]     = useState(initial?.phone     ?? '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    initial?.imagePreviewUrl ?? '/woman.png'
  )
  const [emailNotifications, setEmailNotifications] = useState(
    initial?.emailNotifications ?? true
  )

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreviewUrl(URL.createObjectURL(file))
  }

  const handleToggleNotifications = () => {
    setEmailNotifications((prev) => !prev)
  }

  const handleCancel = () => {
    // Reset to initial values
    setFirstName(initial?.firstName ?? 'Sarah')
    setLastName(initial?.lastName   ?? 'Johnson')
    setEmail(initial?.email         ?? 'sarah@email.com')
    setPhone(initial?.phone         ?? '')
    setEmailNotifications(initial?.emailNotifications ?? true)
    setImageFile(null)
    setImagePreviewUrl(initial?.imagePreviewUrl ?? '/woman.png')
  }

  const handleSave = async () => {
    // TODO: wire up to your API
    const payload = { firstName, lastName, email, phone, emailNotifications, imageFile }
    console.log('Saving profile:', payload)
    // await updateProfile(payload)
  }

  return {
    // State
    firstName,
    lastName,
    email,
    phone,
    imageFile,
    imagePreviewUrl,
    emailNotifications,
    // Setters
    setFirstName,
    setLastName,
    setEmail,
    setPhone,
    // Handlers
    handleImageChange,
    handleToggleNotifications,
    handleCancel,
    handleSave,
  }
}