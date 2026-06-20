
'use client'

import { useState, useEffect, useCallback } from 'react'
import { article } from '../../../types/article'
import { apiUrl } from '@/lib/api'
import { useDashboard } from './shared/useDashboard'

// ─── Constants ────────────────────────────────────────────────────────────────

export const CATEGORIES = ['Prevention', 'Emergency Care', 'Awareness', 'Symptoms', 'Vaccination'] as const

export const EMPTY_FORM = {
  TitleEn: '', SummaryEn: '', ContentEn: '',
  Source: '', Category: '', PublishDate: '',
}

export type ArticleFormData = typeof EMPTY_FORM

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useDashboardArticle() {
  const [articles,       setArticles]       = useState<article[]>([])
  const [loading,        setLoading]        = useState(true)
  const [showModal,      setShowModal]      = useState(false)
  const [editingArticle, setEditingArticle] = useState<article | null>(null)
  const [imageFile,      setImageFile]      = useState<File | null>(null)
  const [formError,      setFormError]      = useState('')
  const [formData,       setFormData]       = useState<ArticleFormData>(EMPTY_FORM)

  const { flash, showFlash, clearFlash, deletingId, requestDelete, cancelDelete, confirmDelete } =
    useDashboard()

  // ─── Data ─────────────────────────────────────────────────────────────────

  const loadArticles = useCallback(async () => {
    try {
      setLoading(true)
      
      const res = await fetch(apiUrl(`dashboard/articles?lang=en&t=${Date.now()}`), {
        headers: { 'ngrok-skip-browser-warning': 'true' },
        cache: 'no-store',
      })
      if (!res.ok) { setArticles([]); return }
      const data = await res.json()
      setArticles(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to load articles:', err)
      setArticles([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadArticles() }, [loadArticles])

  // ─── Modal ────────────────────────────────────────────────────────────────

  const openModal = useCallback((article?: article) => {
    setEditingArticle(article ?? null)
    setFormData(article ? {
      TitleEn:     article.titleEn   ?? article.title,
      SummaryEn:   article.summaryEn ?? article.summary,
      ContentEn:   (article.contentEn ?? article.content ?? '').replace(/\\r\\n/g, '\n'),
      Source:      article.source,
      Category:    article.category,
      PublishDate: article.publishDate?.split('T')[0] || '',
    } : {
      ...EMPTY_FORM,
      PublishDate: new Date().toISOString().split('T')[0],
    })
    setImageFile(null)
    setFormError('')
    setShowModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setShowModal(false)
    setEditingArticle(null)
    setImageFile(null)
    setFormError('')
  }, [])

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleImageChange = useCallback((file: File) => {
    setImageFile(file)
  }, [])

  // ─── Submit ───────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!formData.TitleEn.trim())   { setFormError('Title is required');        return }
    if (!formData.SummaryEn.trim()) { setFormError('Summary is required');      return }
    if (!formData.ContentEn.trim()) { setFormError('Content is required');      return }
    if (!formData.Category.trim())  { setFormError('Category is required');     return }
    if (!formData.Source.trim())    { setFormError('Source is required');       return }
    if (!formData.PublishDate)      { setFormError('Publish date is required'); return }

    try {
      const publishDate = new Date(formData.PublishDate).toISOString()
if (editingArticle) {
  const fd = new FormData()
  fd.append('Title',       formData.TitleEn)
  fd.append('Summary',     formData.SummaryEn)
  fd.append('Content',     formData.ContentEn)
  fd.append('TitleEn',     formData.TitleEn)
  fd.append('SummaryEn',   formData.SummaryEn)
  fd.append('ContentEn',   formData.ContentEn)
  fd.append('Category',    formData.Category)
  fd.append('PublishDate', publishDate)
  fd.append('Source',      formData.Source)
  fd.append('Published',   'true')
  if (imageFile) fd.append('Image', imageFile)

  const res = await fetch(apiUrl(`/dashboard/articles/${editingArticle.id}`), {
    method: 'PUT',
    headers: { 'ngrok-skip-browser-warning': 'true' },
    body: fd,
  })
  if (!res.ok) { setFormError(`Failed to update: ${res.status}`); return }
      // if (editingArticle) {
      //   // ── UPDATE: JSON body ──────────────────────────────────────────
      //   console.log('PUT URL:', apiUrl(`/dashboard/articles/${editingArticle.id}`))
      //   const res = await fetch(apiUrl(`/dashboard/articles/${editingArticle.id}`), {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'ngrok-skip-browser-warning': 'true',
      //     },
      //     body: JSON.stringify({
      //       title:       formData.TitleEn,
      //       summary:     formData.SummaryEn,
      //       content:     formData.ContentEn,
      //       titleEn:     formData.TitleEn,
      //       summaryEn:   formData.SummaryEn,
      //       contentEn:   formData.ContentEn,
      //       category:    formData.Category,
      //       publishDate,
      //       source:      formData.Source,
      //       published:   true,
      //     }),
      //   })
      //   if (!res.ok) { setFormError(`Failed to update: ${res.status}`); return }

        // Upload image separately via PATCH if provided
        if (imageFile) {
          const imgFd = new FormData()
          imgFd.append('Image', imageFile)
          const imgRes = await fetch(apiUrl(`dashboard/articles/${editingArticle.id}`), {
            method: 'PATCH',
            headers: { 'ngrok-skip-browser-warning': 'true' },
            body: imgFd,
          })
          if (!imgRes.ok) console.warn('Image upload failed — article text was updated')
        }

        showFlash('✅ Article updated successfully!')
        window.dispatchEvent(new Event('articlesUpdated'))

      } else {
        // ── CREATE: FormData ───────────────────────────────────────────
        const fd = new FormData()
        fd.append('Title',       formData.TitleEn.trim())
        fd.append('Summary',     formData.SummaryEn.trim())
        fd.append('Content',     formData.ContentEn.trim())
        fd.append('TitleEn',     formData.TitleEn.trim())
        fd.append('SummaryEn',   formData.SummaryEn.trim())
        fd.append('ContentEn',   formData.ContentEn.trim())
        fd.append('Category',    formData.Category.trim())
        fd.append('PublishDate', publishDate)
        fd.append('Source',      formData.Source.trim())
        fd.append('Published',   'true')
        if (imageFile) fd.append('Image', imageFile)

        const res = await fetch(apiUrl('dashboard/articles'), {
          method: 'POST',
          headers: { 'ngrok-skip-browser-warning': 'true' },
          body: fd,
        })
        if (!res.ok) { setFormError(`Failed to create: ${res.status}`); return }

        showFlash('✅ Article created successfully!')
        window.dispatchEvent(new Event('articlesUpdated'))
      }

      await loadArticles()
      closeModal()
    } catch (err) {
      console.error('Error saving article:', err)
      setFormError('Failed to save article. Please try again.')
    }
  }, [formData, imageFile, editingArticle, loadArticles, closeModal, showFlash])

  // ─── Delete ───────────────────────────────────────────────────────────────

  const handleDelete = useCallback(async (id: number | string) => {
    const res = await fetch(apiUrl(`dashboard/articles/${id}`), {
      method:  'DELETE',
      headers: { 'ngrok-skip-browser-warning': 'true' },
    })
    if (!res.ok) { alert(`Failed to delete: ${res.status}`); return }
    showFlash('🗑️ Article deleted successfully!')
    await loadArticles()
  }, [loadArticles, showFlash])

  // ─── Derived ──────────────────────────────────────────────────────────────

  const deletingTitle = deletingId
    ? articles.find(a => a.id === Number(deletingId))?.title
    : undefined

  return {
    articles,
    loading,
    deletingTitle,
    showModal,
    editingArticle,
    formData,
    formError,
    imageFile,
    loadArticles,
    openModal,
    closeModal,
    handleInputChange,
    handleImageChange,
    handleSubmit,
    handleDelete,
    flash,
    clearFlash,
    deletingId,
    requestDelete,
    cancelDelete,
    confirmDelete,
  }
}