'use client'

import { useEffect, useState,useCallback } from 'react'
import { Video } from '@/types/Video'
import { apiUrl } from '@/lib/api'

type FormData = {
  titleAr: string
  titleEn: string
  url:     string
  source:  string
}

const EMPTY_FORM: FormData = { titleAr: '', titleEn: '', url: '', source: '' }

export function useVideoManagement() {
  const [videos,         setVideos]         = useState<Video[]>([])
  const [loading,        setLoading]        = useState(true)
  const [showModal,      setShowModal]      = useState(false)
  const [editingVideo,   setEditingVideo]   = useState<Video | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [error,          setError]          = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletingId,     setDeletingId]     = useState<number | null>(null)
  const [formData,       setFormData]       = useState<FormData>(EMPTY_FORM)

  useEffect(() => { loadVideos() }, [])

const loadVideos = useCallback(async () => {
  try {
    setLoading(true)
    const res = await fetch(apiUrl(`Videos?t=${Date.now()}`), {
      headers: { 'ngrok-skip-browser-warning': 'true' },
      cache: 'no-store',
    })
    const data = await res.json()
    setVideos(Array.isArray(data) ? data : [])
  } catch (err) {
    console.error('Failed to load videos:', err)
    setVideos([])
  } finally {
    setLoading(false)
  }
}, [])

useEffect(() => { loadVideos() }, [loadVideos])
  const notifySuccess = (msg: string) => {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(''), 3000)
    window.dispatchEvent(new Event('videosUpdated'))
  }

  const openModal = (video?: Video) => {
    setEditingVideo(video ?? null)
    setFormData(video
      ? { titleAr: video.titleAr, titleEn: video.titleEn, url: video.url, source: video.source }
      : EMPTY_FORM
    )
    setError('')
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingVideo(null)
    setError('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDeleteClick = (id: number) => {
    setDeletingId(id)
    setShowDeleteConfirm(true)
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setDeletingId(null)
  }

  const confirmDelete = async () => {
    if (!deletingId) return
    try {
      const res = await fetch(apiUrl(`Videos/${deletingId}`), {
        method: 'DELETE',
        headers: { 'ngrok-skip-browser-warning': 'true' },
      })
      if (!res.ok) { alert(`Failed to delete: ${res.status}`); return }
      notifySuccess('Video deleted successfully!')
      await loadVideos()
    } catch (err) {
      console.error('Error deleting video:', err)
      alert('Failed to delete video. Please try again.')
    } finally {
      setShowDeleteConfirm(false)
      setDeletingId(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.titleAr.trim()) { setError('Arabic title is required');  return }
    if (!formData.titleEn.trim()) { setError('English title is required'); return }
    if (!formData.url.trim())     { setError('Video URL is required');     return }
    if (!formData.source.trim())  { setError('Source is required');        return }

    try {
      if (editingVideo) {
        const res = await fetch(apiUrl(`Videos/${editingVideo.id}`), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) { setError(`Failed to update: ${res.status}`); return }
        notifySuccess('Video updated successfully!')
      } else {
        const res = await fetch(apiUrl(`Videos`), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) { setError(`Failed to create: ${res.status}`); return }
        notifySuccess('Video created successfully!')
      }
      await loadVideos()
      closeModal()
    } catch (err) {
      console.error('Error saving video:', err)
      setError('Failed to save video. Please try again.')
    }
  }

  return {
    // data
    videos, loading, successMessage, setSuccessMessage,
    // modal
    showModal, editingVideo, error, formData,
    openModal, closeModal, handleInputChange, handleSubmit,
    // delete
    showDeleteConfirm, cancelDelete, confirmDelete, handleDeleteClick,
  }
}