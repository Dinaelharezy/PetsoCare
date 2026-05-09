
'use client'

import { useState, useEffect } from 'react'
import { article } from '../../../types/article'
import { ArticleForm } from '../../../types/article'

export type SaveStatus = 'idle' | 'saving' | 'success' | 'error'

const EMPTY_FORM: ArticleForm = {
  Title:       '',
  Summary:     '',
  Content:     '',
  TitleEn:     '',
  SummaryEn:   '',
  ContentEn:   '',
  Source:      '',
  Category:    '',
  PublishDate: new Date().toISOString().split('T')[0],
}

export const CATEGORIES = ['Prevention', 'Emergency Care', 'Awareness', 'Symptoms', 'Vaccination', 'First Aid', 'Vaccines', 'Pet Care']

export function useArticleManagement() {
  const [articles,       setArticles]       = useState<article[]>([])
  const [loading,        setLoading]        = useState(true)
  const [showModal,      setShowModal]      = useState(false)
  const [editingArticle, setEditingArticle] = useState<article | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [error,          setError]          = useState('')
  const [imageFile,      setImageFile]      = useState<File | null>(null)
  const [formData,       setFormData]       = useState<ArticleForm>(EMPTY_FORM)

 

  // ─── Load ────────────────────────────────────────────────────────────────
  const loadArticles = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/dashboard/articles?lang=en&t=${Date.now()}`, {
        headers: { 'ngrok-skip-browser-warning': 'true' },
        cache: 'no-store',
      })
      if (!response.ok) { setArticles([]); return }
      const data = await response.json()
      setArticles(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to load articles:', err)
      setArticles([])
    } finally {
      setLoading(false)
    }
  }
  
 useEffect(() => { loadArticles() }, [])
  // ─── Modal ───────────────────────────────────────────────────────────────
  const handleShowModal = (article?: article) => {
    if (article) {
      setEditingArticle(article)
      setFormData({
        Title:       article.title,
        Summary:     article.summary,
        Content:     article.content,
        TitleEn:     article.titleEn   ?? article.title,
        SummaryEn:   article.summaryEn ?? article.summary,
        // ContentEn:   article.contentEn ?? article.content,
        ContentEn: (article.contentEn ?? article.content ?? '').replace(/\\r\\n/g, '\n'),
        Source:      article.source,
        Category:    article.category,
        PublishDate: article.publishDate?.split('T')[0] || new Date().toISOString().split('T')[0],
      })
    } else {
      setEditingArticle(null)
      setFormData(EMPTY_FORM)
    }
    setImageFile(null)
    setError('')
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingArticle(null)
    setImageFile(null)
    setError('')
  }

  // ─── Handlers ────────────────────────────────────────────────────────────
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
     console.log(`Changing ${name}:`, value) 
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImageFile(file)
  }

  const notifySuccess = (msg: string) => {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(''), 3000)
    window.dispatchEvent(new Event('articlesUpdated'))
  }

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.TitleEn.trim())   { setError('Title is required');        return }
    if (!formData.SummaryEn.trim()) { setError('Summary is required');      return }
    if (!formData.ContentEn.trim()) { setError('Content is required');      return }
    if (!formData.Category.trim())  { setError('Category is required');     return }
    if (!formData.Source.trim())    { setError('Source is required');       return }
    if (!formData.PublishDate)      { setError('Publish date is required'); return }

    try {
      if (editingArticle) {
        // ── UPDATE ──────────────────────────────────────────────────────
        const res = await fetch(`/api/dashboard/articles/${editingArticle.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: JSON.stringify({
            title:       formData.TitleEn,
            summary:     formData.SummaryEn,
            content:     formData.ContentEn,
            titleEn:     formData.TitleEn,
            summaryEn:   formData.SummaryEn,
            contentEn:   formData.ContentEn,
            category:    formData.Category,
            publishDate: new Date(formData.PublishDate).toISOString(),
            source:      formData.Source,
            published:   true,
          }),
        })

        if (!res.ok) {
          setError(`Failed to update article (${res.status}). Please try again.`)
          return
        }

        if (imageFile) {
          const imgForm = new FormData()
          imgForm.append('Image', imageFile)
          const imgRes = await fetch(`/api/dashboard/articles/${editingArticle.id}`, {
            method:  'PATCH',
            headers: { 'ngrok-skip-browser-warning': 'true' },
            body:    imgForm,
          })
          if (!imgRes.ok) console.warn('Image upload failed — article text was updated')
        }

        notifySuccess('Article updated successfully!')

      } else {
        // ── CREATE ──────────────────────────────────────────────────────
        const fd = new FormData()
        fd.append('Title',       formData.TitleEn.trim())
        fd.append('Summary',     formData.SummaryEn.trim())
        fd.append('Content',     formData.ContentEn.trim())
        fd.append('TitleEn',     formData.TitleEn.trim())
        fd.append('SummaryEn',   formData.SummaryEn.trim())
        fd.append('ContentEn',   formData.ContentEn.trim())
        fd.append('Category',    formData.Category.trim())
        fd.append('Source',      formData.Source.trim())
        fd.append('Published',   'true')
        fd.append('PublishDate', new Date(formData.PublishDate).toISOString())
        if (imageFile) fd.append('Image', imageFile)

        const res = await fetch('/api/dashboard/articles', {
          method:  'POST',
          headers: { 'ngrok-skip-browser-warning': 'true' },
          body: fd,
        })

        if (!res.ok) {
          setError(`Failed to create article (${res.status}). Please check all fields.`)
          return
        }

        notifySuccess('Article created successfully!')
      }

      setImageFile(null)
      await loadArticles()
      handleCloseModal()

    } catch (err) {
      console.error('Error saving article:', err)
      setError('Network error. Please check your connection and try again.')
    }
  }

  // ─── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return
    try {
      const res = await fetch(`/api/dashboard/articles/${id}`, {
        method:  'DELETE',
        headers: { 'ngrok-skip-browser-warning': 'true' },
      })
      if (!res.ok) { alert(`Failed to delete article (${res.status})`); return }
      notifySuccess('Article deleted successfully!')
      await loadArticles()
    } catch (err) {
      console.error('Error deleting article:', err)
      alert('Network error. Failed to delete article.')
    }
  }

  return {
    articles, loading,
    showModal, editingArticle,
    successMessage, setSuccessMessage,
    error, formData, imageFile,
    handleShowModal, handleCloseModal,
    handleInputChange, handleImageChange,
    handleSubmit, handleDelete,
  }
}