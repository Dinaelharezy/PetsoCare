// 'use client'

// import { useState, useEffect } from 'react'
// import { article } from '../../../types/article'

// export interface ArticleForm {
//   Title:       string
//   Summary:     string
//   Content:     string
//   Source:      string
//   Category:    string
//   PublishDate: string
// }

// export type SaveStatus = 'idle' | 'saving' | 'success' | 'error'

// const EMPTY_FORM: ArticleForm = {
//   Title: '', Summary: '', Content: '',
//   Source: '', Category: '',
//   PublishDate: new Date().toISOString().split('T')[0],
// }

// export const CATEGORIES = ['Prevention', 'Emergency Care', 'Awareness', 'Symptoms', 'Vaccination']

// export function useArticleManagement() {
//   const [articles,       setArticles]       = useState<article[]>([])
//   const [loading,        setLoading]        = useState(true)
//   const [showModal,      setShowModal]      = useState(false)
//   const [editingArticle, setEditingArticle] = useState<article | null>(null)
//   const [successMessage, setSuccessMessage] = useState('')
//   const [error,          setError]          = useState('')
//   const [imageFile,      setImageFile]      = useState<File | null>(null)
//   const [formData,       setFormData]       = useState<ArticleForm>(EMPTY_FORM)

//   useEffect(() => { loadArticles() }, [])

//   const loadArticles = async () => {
//     try {
//       setLoading(true)
//       const response = await fetch('/api/dashboard/articles', {
//         headers: { 'ngrok-skip-browser-warning': 'true' },
//       })
//       const data = await response.json()
//       setArticles(Array.isArray(data) ? data : [])
//     } catch (err) {
//       console.error('Failed to load articles:', err)
//       setArticles([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleShowModal = (article?: article) => {
//     if (article) {
//       setEditingArticle(article)
//       setFormData({
//         Title:       article.title,
//         Summary:     article.summary,
//         Content:     article.content,
//         Source:      article.source,
//         Category:    article.category,
//         PublishDate: article.publishDate?.split('T')[0] || '',
//       })
//     } else {
//       setEditingArticle(null)
//       setFormData(EMPTY_FORM)
//     }
//     setImageFile(null)
//     setError('')
//     setShowModal(true)
//   }

//   const handleCloseModal = () => {
//     setShowModal(false)
//     setEditingArticle(null)
//     setImageFile(null)
//     setError('')
//   }

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = (e.target as HTMLInputElement).files?.[0]
//     if (file) setImageFile(file)
//   }

//   const notifySuccess = (msg: string) => {
//     setSuccessMessage(msg)
//     setTimeout(() => setSuccessMessage(''), 3000)
//     window.dispatchEvent(new Event('articlesUpdated'))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')

//     try {
//       if (editingArticle) {
//         // Step 1 — update fields via JSON
//         const res = await fetch(`/api/dashboard/articles/${editingArticle.id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'ngrok-skip-browser-warning': 'true',
//           },
//           body: JSON.stringify({
//             title:       formData.Title,
//             summary:     formData.Summary,
//             content:     formData.Content,
//             category:    formData.Category,
//             publishDate: new Date(formData.PublishDate).toISOString(),
//             source:      formData.Source,
//             published:   true,
//           }),
//         })

//         if (!res.ok) {
//           const errData = await res.json().catch(() => ({}))
//           console.error('Update error:', errData)
//           setError(`Failed to update: ${res.status}`)
//           return
//         }

//         // Step 2 — upload new image separately if provided
//         if (imageFile) {
//           const imgForm = new FormData()
//           imgForm.append('Image', imageFile)
//           const imgRes = await fetch(`/api/dashboard/articles/${editingArticle.id}`, {
//             method:  'PATCH',
//             headers: { 'ngrok-skip-browser-warning': 'true' },
//             body:    imgForm,
//           })
//           if (!imgRes.ok) console.error('Image upload failed — article updated but image unchanged')
//         }

//         notifySuccess('Article updated successfully!')

//       } else {
//         // Create — send as FormData (supports IFormFile)
//         const fd = new FormData()
//         fd.append('Title',       formData.Title)
//         fd.append('Summary',     formData.Summary)
//         fd.append('Content',     formData.Content)
//         fd.append('Category',    formData.Category)
//         fd.append('PublishDate', new Date(formData.PublishDate).toISOString())
//         fd.append('Source',      formData.Source)
//         fd.append('Published',   'true')
//         if (imageFile) fd.append('Image', imageFile)

//         const res = await fetch('/api/dashboard/articles', {
//           method:  'POST',
//           headers: { 'ngrok-skip-browser-warning': 'true' },
//           body:    fd,
//         })

//         if (!res.ok) {
//           const errData = await res.json().catch(() => ({}))
//           console.error('Create error:', errData)
//           setError(`Failed to create: ${res.status}`)
//           return
//         }

//         notifySuccess('Article created successfully!')
//       }

//       setImageFile(null)
//       await loadArticles()
//       handleCloseModal()

//     } catch (err) {
//       console.error('Error saving article:', err)
//       setError('Failed to save article. Please try again.')
//     }
//   }

//   const handleDelete = async (id: number) => {
//     if (!window.confirm('Are you sure you want to delete this article?')) return
//     try {
//       const res = await fetch(`/api/dashboard/articles/${id}`, {
//         method:  'DELETE',
//         headers: { 'ngrok-skip-browser-warning': 'true' },
//       })
//       if (!res.ok) { alert(`Failed to delete: ${res.status}`); return }
//       notifySuccess('Article deleted successfully!')
//       await loadArticles()
//     } catch (err) {
//       console.error('Error deleting article:', err)
//       alert('Failed to delete article.')
//     }
//   }

//   return {
//     articles, loading,
//     showModal, editingArticle,
//     successMessage, setSuccessMessage,
//     error, formData, imageFile,
//     handleShowModal, handleCloseModal,
//     handleInputChange, handleImageChange,
//     handleSubmit, handleDelete,
//   }
// }

'use client'

import { useState, useEffect } from 'react'
import { article } from '../../../types/article'

export interface ArticleForm {
  Title:       string
  Summary:     string
  Content:     string
  Source:      string
  Category:    string
  PublishDate: string
}

export type SaveStatus = 'idle' | 'saving' | 'success' | 'error'

const EMPTY_FORM: ArticleForm = {
  Title:       '',
  Summary:     '',
  Content:     '',
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

  useEffect(() => { loadArticles() }, [])

  // ─── Load all articles ────────────────────────────────────────────────────
  const loadArticles = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/dashboard/articles?lang=en&t=${Date.now()}`, {
        headers: { 'ngrok-skip-browser-warning': 'true' },
        cache: 'no-store',
      })

      if (!response.ok) {
        console.error('Failed to load articles:', response.status)
        setArticles([])
        return
      }

      const data = await response.json()
      setArticles(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to load articles:', err)
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  // ─── Modal open/close ─────────────────────────────────────────────────────
  const handleShowModal = (article?: article) => {
    if (article) {
      setEditingArticle(article)
      setFormData({
        Title:       article.title,
        Summary:     article.summary,
        Content:     article.content,
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

  // ─── Form field handlers ──────────────────────────────────────────────────
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImageFile(file)
  }

  // ─── Success notification ─────────────────────────────────────────────────
  const notifySuccess = (msg: string) => {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(''), 3000)
    window.dispatchEvent(new Event('articlesUpdated'))
  }

  // ─── Submit: create or update ─────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic client-side validation
    if (!formData.Title.trim())    { setError('Title is required');    return }
    if (!formData.Summary.trim())  { setError('Summary is required');  return }
    if (!formData.Content.trim())  { setError('Content is required');  return }
    if (!formData.Category.trim()) { setError('Category is required'); return }
    if (!formData.Source.trim())   { setError('Source is required');   return }
    if (!formData.PublishDate)     { setError('Publish date is required'); return }

    try {
      if (editingArticle) {
        // ── UPDATE: Step 1 — fields via JSON ──────────────────────────────
        const res = await fetch(`/api/dashboard/articles/${editingArticle.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
          body: JSON.stringify({
            title:       formData.Title,
            summary:     formData.Summary,
            content:     formData.Content,
            category:    formData.Category,
            publishDate: new Date(formData.PublishDate).toISOString(),
            source:      formData.Source,
            published:   true,
          }),
        })

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          console.error('Update error:', errData)
          setError(`Failed to update article (${res.status}). Please try again.`)
          return
        }

        // ── UPDATE: Step 2 — upload new image if provided ─────────────────
        if (imageFile) {
          const imgForm = new FormData()
          imgForm.append('Image', imageFile)
          const imgRes = await fetch(`/api/dashboard/articles/${editingArticle.id}`, {
            method:  'PATCH',
            headers: { 'ngrok-skip-browser-warning': 'true' },
            body:    imgForm,
          })
          if (!imgRes.ok) {
            console.warn('⚠️ Image upload failed — article text was updated but image unchanged')
          }
        }

        notifySuccess('Article updated successfully!')

      } else {
        // ── CREATE: send as FormData (supports IFormFile on .NET side) ────
        const fd = new FormData()
        fd.append('Title',       formData.Title.trim())
        fd.append('Summary',     formData.Summary.trim())
        fd.append('Content',     formData.Content.trim())
        fd.append('Category',    formData.Category.trim())
        fd.append('Source',      formData.Source.trim())
        fd.append('Published',   'true')
        fd.append('PublishDate', new Date(formData.PublishDate).toISOString())
        if (imageFile) fd.append('Image', imageFile)

        const res = await fetch('/api/dashboard/articles', {
          method:  'POST',
          headers: { 'ngrok-skip-browser-warning': 'true' },
          // ⚠️ Do NOT set Content-Type here — browser sets it with boundary for FormData
          body: fd,
        })

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          console.error('Create error:', errData)
          setError(`Failed to create article (${res.status}). Please check all fields and try again.`)
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
      if (!res.ok) {
        alert(`Failed to delete article (${res.status})`)
        return
      }
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